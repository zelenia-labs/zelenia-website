export type CategoryId = 'vitals' | 'responsive' | 'design-system' | 'rebuild';
export type PaceId = 'standard' | 'accelerated';

export interface DivisionOfLabor {
  engineering: number;
  design: number;
  label: string;
}

export interface Turnaround {
  standard: string;
  accelerated: string;
}

export interface Deliverables {
  standard: string[];
  accelerated: string[];
}

export interface Benchmark {
  metric: string;
  label: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface DiagnosticCategory {
  id: CategoryId;
  label: string;
  shortLabel: string;
  tagline: string;
  division: DivisionOfLabor;
  turnaround: Turnaround;
  deliverables: Deliverables;
  benchmarks: Benchmark[];
  faqs: FaqItem[];
}

export interface PaceModel {
  id: PaceId;
  label: string;
  badge: string;
  description: string;
}
