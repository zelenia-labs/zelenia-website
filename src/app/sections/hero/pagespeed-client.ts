import { Injectable, signal } from '@angular/core';

export interface AuditMetricScore {
  score: number;
  status: 'good' | 'average' | 'poor';
}

export interface VitalMetric {
  value: string;
  status: 'good' | 'average' | 'poor';
  label: string;
}

export interface AuditResults {
  url: string;
  isSimulation: boolean;
  failureReason: string;
  scores: {
    perf: AuditMetricScore;
    a11y: AuditMetricScore;
    seo: AuditMetricScore;
    agentic: AuditMetricScore;
  };
  vitals: {
    lcp: VitalMetric;
    inp: VitalMetric;
    cls: VitalMetric;
  };
}

@Injectable({
  providedIn: 'root'
})
export class PagespeedClient {
  readonly targetUrl = signal('');
  readonly isScanning = signal(false);
  readonly scanLog = signal('Connecting to Google PageSpeed Insights API...');
  readonly auditResult = signal<AuditResults | null>(null);

  normalizeUrl(input: string): string {
    let url = input.trim();
    if (!url) return '';
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }
    return url;
  }

  isLocalOrigin(url: string): boolean {
    try {
      const parsed = new URL(url);
      const host = parsed.hostname.toLowerCase();
      return (
        host === 'localhost' ||
        host === '127.0.0.1' ||
        host === '0.0.0.0' ||
        host.endsWith('.local') ||
        host.endsWith('.internal') ||
        host.endsWith('.test') ||
        host.startsWith('192.168.') ||
        host.startsWith('10.') ||
        host.startsWith('172.16.')
      );
    } catch {
      return false;
    }
  }

  async runAudit(rawUrl: string): Promise<AuditResults | null> {
    const targetUrl = this.normalizeUrl(rawUrl);
    if (!targetUrl) return null;

    this.targetUrl.set(rawUrl.trim());
    this.isScanning.set(true);
    this.scanLog.set('Connecting to Google PageSpeed Insights API...');

    try {
      if (this.isLocalOrigin(targetUrl)) {
        await new Promise((r) => setTimeout(r, 800));
        const res = this.generateSyntheticAudit(
          targetUrl,
          true,
          "Localhost and private development origins cannot be reached by Google's public crawler."
        );
        this.auditResult.set(res);
        return res;
      }

      this.scanLog.set('Evaluating Core Web Vitals (LCP, INP, CLS) & Lighthouse...');

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6500);

      const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
        targetUrl
      )}&strategy=mobile&category=PERFORMANCE&category=ACCESSIBILITY&category=SEO`;

      try {
        const response = await fetch(apiUrl, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`API responded with status ${response.status}`);
        }

        const data = (await response.json()) as Record<string, unknown>;
        const parsed = this.parseLiveApiResponse(targetUrl, data);
        this.auditResult.set(parsed);
        return parsed;
      } catch (err: unknown) {
        clearTimeout(timeoutId);
        const isAbort = err instanceof Error && err.name === 'AbortError';
        const reason = isAbort
          ? 'Query timed out (6.5s limit reached).'
          : 'Origin could not be resolved or reached by PageSpeed service.';
        const res = this.generateSyntheticAudit(targetUrl, true, reason);
        this.auditResult.set(res);
        return res;
      }
    } finally {
      this.isScanning.set(false);
    }
  }

  private parseLiveApiResponse(targetUrl: string, data: Record<string, unknown>): AuditResults {
    const lighthouse = (data?.['lighthouseResult'] ?? {}) as Record<string, unknown>;
    const categories = (lighthouse['categories'] ?? {}) as Record<
      string,
      { score?: number | null } | undefined
    >;
    const audits = (lighthouse['audits'] ?? {}) as Record<
      string,
      { displayValue?: string | null; numericValue?: number | null } | undefined
    >;

    const perfRaw = Math.round((categories['performance']?.score ?? 0.5) * 100);
    const a11yRaw = Math.round((categories['accessibility']?.score ?? 0.75) * 100);
    const seoRaw = Math.round((categories['seo']?.score ?? 0.7) * 100);

    const agenticRaw = Math.min(
      99,
      Math.max(35, Math.round(a11yRaw * 0.45 + seoRaw * 0.35 + (perfRaw > 80 ? 15 : 5)))
    );

    const lcpDisplay = audits['largest-contentful-paint']?.displayValue || '3.2 s';
    const lcpSec = parseFloat(lcpDisplay.replace(/[^0-9.]/g, '')) || 3.2;

    const inpDisplay = audits['interaction-to-next-paint']?.displayValue || '280 ms';
    const inpMs = parseInt(inpDisplay.replace(/[^0-9]/g, ''), 10) || 280;

    const clsVal = audits['cumulative-layout-shift']?.numericValue ?? 0.18;
    const clsFormatted = clsVal.toFixed(2);

    return {
      url: targetUrl,
      isSimulation: false,
      failureReason: '',
      scores: {
        perf: { score: perfRaw, status: this.getScoreStatus(perfRaw) },
        a11y: { score: a11yRaw, status: this.getScoreStatus(a11yRaw) },
        seo: { score: seoRaw, status: this.getScoreStatus(seoRaw) },
        agentic: { score: agenticRaw, status: this.getScoreStatus(agenticRaw) }
      },
      vitals: {
        lcp: {
          value: `${lcpSec.toFixed(1)}s`,
          status: lcpSec <= 2.5 ? 'good' : lcpSec <= 4.0 ? 'average' : 'poor',
          label: lcpSec <= 2.5 ? 'Optimal' : lcpSec <= 4.0 ? 'Needs Work' : 'Poor'
        },
        inp: {
          value: `${inpMs}ms`,
          status: inpMs <= 200 ? 'good' : inpMs <= 500 ? 'average' : 'poor',
          label: inpMs <= 200 ? 'Optimal' : inpMs <= 500 ? 'Needs Work' : 'Poor'
        },
        cls: {
          value: clsFormatted,
          status: clsVal <= 0.1 ? 'good' : clsVal <= 0.25 ? 'average' : 'poor',
          label: clsVal <= 0.1 ? 'Optimal' : clsVal <= 0.25 ? 'Needs Work' : 'Poor'
        }
      }
    };
  }

  private generateSyntheticAudit(
    targetUrl: string,
    isSimulation = true,
    failureReason = ''
  ): AuditResults {
    let seed = 0;
    for (let i = 0; i < targetUrl.length; i++) {
      seed = (seed + targetUrl.charCodeAt(i) * (i + 1)) % 1000;
    }

    const perf = 42 + (seed % 36);
    const a11y = 70 + (seed % 22);
    const seo = 65 + (seed % 23);
    const agentic = 38 + (seed % 27);

    const lcpSeconds = (2.2 + (seed % 24) * 0.1).toFixed(1);
    const inpMs = 220 + (seed % 26) * 10;
    const clsVal = (0.08 + (seed % 20) * 0.01).toFixed(2);

    return {
      url: targetUrl,
      isSimulation,
      failureReason,
      scores: {
        perf: { score: perf, status: this.getScoreStatus(perf) },
        a11y: { score: a11y, status: this.getScoreStatus(a11y) },
        seo: { score: seo, status: this.getScoreStatus(seo) },
        agentic: { score: agentic, status: this.getScoreStatus(agentic) }
      },
      vitals: {
        lcp: {
          value: `${lcpSeconds}s`,
          status: parseFloat(lcpSeconds) <= 2.5 ? 'good' : 'average',
          label: parseFloat(lcpSeconds) <= 2.5 ? 'Optimal' : 'Needs Work'
        },
        inp: {
          value: `${inpMs}ms`,
          status: inpMs <= 200 ? 'good' : 'average',
          label: inpMs <= 200 ? 'Optimal' : 'Needs Work'
        },
        cls: {
          value: clsVal,
          status: parseFloat(clsVal) <= 0.1 ? 'good' : 'average',
          label: parseFloat(clsVal) <= 0.1 ? 'Optimal' : 'Needs Work'
        }
      }
    };
  }

  private getScoreStatus(score: number): 'good' | 'average' | 'poor' {
    if (score >= 90) return 'good';
    if (score >= 50) return 'average';
    return 'poor';
  }
}
