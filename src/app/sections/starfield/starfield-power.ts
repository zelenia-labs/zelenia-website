import { DestroyRef, ElementRef } from '@angular/core';

import { StarfieldNotice } from './starfield.types';

export interface PowerStateChangeCallback {
  onPowerModeChanged: (isLowPower: boolean) => void;
  onNoticeTriggered?: (notice: StarfieldNotice) => void;
  onNoticeCleared?: (reason: StarfieldNotice['reason']) => void;
}

/**
 * Manages device power, Battery Status API, low-data modes, and frame governor logic.
 */
export class StarfieldPowerManager {
  private isLowPower = false;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly destroyRef: DestroyRef,
    private readonly callback: PowerStateChangeCallback
  ) {}

  get lowPowerActive(): boolean {
    return this.isLowPower;
  }

  /**
   * Adaptive DPR clamping: 1.2 on mobile to save ~50% GPU fillrate; 1.5 on desktop.
   */
  getOptimalPixelRatio(width: number): number {
    if (typeof window === 'undefined') return 1;
    const isMobile = width < 768;
    const maxDpr = isMobile ? 1.2 : 1.5;
    return Math.min(window.devicePixelRatio || 1, maxDpr);
  }

  /**
   * Adaptive Frame Budgeting:
   * When interacting, black hole active, or meteor streaking -> 60 FPS (16ms).
   * When reading / idle or on low battery -> 30 FPS (33ms) to reduce CPU & GPU energy drain by 50%.
   */
  getTargetFrameInterval(isInteracting: boolean): number {
    if (this.isLowPower) return 33.3;
    return isInteracting ? 16.0 : 33.3;
  }

  checkConnection(): StarfieldNotice | null {
    if (typeof navigator === 'undefined') return null;
    const conn = (navigator as unknown as {
      connection?: {
        saveData?: boolean;
        effectiveType?: string;
        addEventListener?: (type: string, listener: () => void) => void;
        removeEventListener?: (type: string, listener: () => void) => void;
      };
    }).connection;
    if (!conn) return null;

    if (conn.saveData) {
      return {
        reason: 'data-saver',
        message: 'Static Starfield',
        instruction: 'Data saver enabled',
        actionText: 'Ignite'
      };
    }

    if (conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g' || conn.effectiveType === '3g') {
      return {
        reason: 'slow-connection',
        message: 'Static Starfield',
        instruction: 'Slow connection detected',
        actionText: 'Ignite'
      };
    }

    return null;
  }

  async setupPowerMonitoring(): Promise<boolean> {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;

    let hasConstraint = false;

    // 1. Connection / Data-Saver / Low-Data / Slow network check
    const connNotice = this.checkConnection();
    if (connNotice) {
      this.activateLowPowerMode();
      this.callback.onNoticeTriggered?.(connNotice);
      hasConstraint = true;
    }

    const conn = (navigator as unknown as {
      connection?: {
        addEventListener?: (type: string, listener: () => void) => void;
        removeEventListener?: (type: string, listener: () => void) => void;
      };
    }).connection;

    if (conn?.addEventListener) {
      const onConnChange = () => {
        const notice = this.checkConnection();
        if (notice) {
          this.activateLowPowerMode();
          this.callback.onNoticeTriggered?.(notice);
        } else if (this.isLowPower) {
          this.deactivateLowPowerMode();
          this.callback.onNoticeCleared?.('slow-connection');
          this.callback.onNoticeCleared?.('data-saver');
        }
      };
      conn.addEventListener('change', onConnChange);
      this.destroyRef.onDestroy(() => conn.removeEventListener?.('change', onConnChange));
    }

    // 2. Battery Status API check
    if ('getBattery' in navigator && typeof (navigator as unknown as { getBattery: () => Promise<unknown> }).getBattery === 'function') {
      try {
        const battery = await (navigator as unknown as {
          getBattery: () => Promise<{
            charging: boolean;
            level: number;
            addEventListener: (type: string, listener: () => void) => void;
            removeEventListener: (type: string, listener: () => void) => void;
          }>;
        }).getBattery();

        const checkBattery = (): boolean => {
          // Low battery threshold: Unplugged and critically low battery level <= 8%
          const isBatteryLow = !battery.charging && battery.level <= 0.08;
          if (isBatteryLow) {
            this.activateLowPowerMode();
            this.callback.onNoticeTriggered?.({
              reason: 'battery-saver',
              message: 'Static Starfield',
              instruction: 'Battery below 8%',
              actionText: 'Ignite'
            });
            return true;
          } else if (this.isLowPower && !this.checkConnection()) {
            this.deactivateLowPowerMode();
            this.callback.onNoticeCleared?.('battery-saver');
            return false;
          }
          return false;
        };

        if (checkBattery()) {
          hasConstraint = true;
        }

        const onLevelChange = () => checkBattery();
        const onChargingChange = () => checkBattery();

        battery.addEventListener('levelchange', onLevelChange);
        battery.addEventListener('chargingchange', onChargingChange);

        this.destroyRef.onDestroy(() => {
          battery.removeEventListener('levelchange', onLevelChange);
          battery.removeEventListener('chargingchange', onChargingChange);
        });
      } catch {
        // Battery API blocked or restricted
      }
    }

    return hasConstraint;
  }

  activateLowPowerMode(): void {
    if (this.isLowPower) return;
    this.isLowPower = true;
    this.callback.onPowerModeChanged(true);
  }

  deactivateLowPowerMode(): void {
    if (!this.isLowPower) return;
    this.isLowPower = false;
    this.callback.onPowerModeChanged(false);
  }
}

/**
 * Utility checking if low-data or slow connection constraint exists on the device.
 */
export function hasNetworkOrBatteryConstraint(): boolean {
  if (typeof navigator === 'undefined') return false;
  const conn = (navigator as unknown as {
    connection?: {
      saveData?: boolean;
      effectiveType?: string;
    };
  }).connection;
  if (conn) {
    if (conn.saveData) return true;
    if (conn.effectiveType === 'slow-2g' || conn.effectiveType === '2g' || conn.effectiveType === '3g') {
      return true;
    }
  }
  return false;
}

/**
 * Utility checking if battery is critically low (<= 8% and unplugged).
 */
export async function hasBatteryConstraint(): Promise<boolean> {
  if (typeof navigator === 'undefined') return false;
  if ('getBattery' in navigator && typeof (navigator as unknown as { getBattery: () => Promise<{ charging: boolean; level: number }> }).getBattery === 'function') {
    try {
      const battery = await (navigator as unknown as { getBattery: () => Promise<{ charging: boolean; level: number }> }).getBattery();
      return !battery.charging && battery.level <= 0.08;
    } catch {
      return false;
    }
  }
  return false;
}

/**
 * Utility checking if reduced motion is preferred by user system settings.
 */
export function hasReducedMotion(): boolean {
  return typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
