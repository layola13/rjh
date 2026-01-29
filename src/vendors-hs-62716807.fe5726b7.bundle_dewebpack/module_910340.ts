interface PerformanceMetrics {
  begin?: number;
  dom?: number;
  load?: number;
  res?: string;
}

interface TimingConfig {
  dom: [number, number];
  load: [number, number];
}

interface WindowWithPerformance extends Window {
  performance?: Performance;
  PerformanceNavigationTiming?: typeof PerformanceNavigationTiming;
}

interface UtilityModule {
  win?: WindowWithPerformance;
  each: (obj: Record<string, [number, number]>, callback: (value: [number, number], key: string) => void) => void;
}

interface TimingModule {
  TIMING_KEYS: string[];
}

import { win, each } from './utility-module';
import { TIMING_KEYS } from './timing-keys';

export default function collectPerformanceMetrics(): PerformanceMetrics | null {
  const window = win ?? {} as WindowWithPerformance;
  const performance = window.performance;

  if (!performance || typeof performance !== 'object' || typeof performance.getEntriesByType !== 'function') {
    return null;
  }

  const metrics: PerformanceMetrics = {};
  let timing: PerformanceTiming | PerformanceNavigationTiming = performance.timing ?? {};
  const resourceEntries: PerformanceResourceTiming[] = performance.getEntriesByType('resource') as PerformanceResourceTiming[] ?? [];

  metrics.begin = (timing as any)[TIMING_KEYS[1]] ?? Date.now();

  if (typeof window.PerformanceNavigationTiming === 'function') {
    const navigationEntries = performance.getEntriesByType('navigation');
    const navigationEntry = navigationEntries[0];
    
    if (navigationEntry) {
      timing = navigationEntry as PerformanceNavigationTiming;
    }
  }

  const timingConfig: TimingConfig = {
    dom: [10, 8],
    load: [14, 1]
  };

  const MAX_VALID_DURATION = 600000; // 10 minutes in milliseconds

  each(timingConfig, (indices: [number, number], metricName: string) => {
    const startTime = (timing as any)[TIMING_KEYS[indices[1]]];
    const endTime = (timing as any)[TIMING_KEYS[indices[0]]];

    if (startTime > 0 && endTime > 0) {
      const duration = Math.round(endTime - startTime);
      
      if (duration >= 0 && duration < MAX_VALID_DURATION) {
        (metrics as any)[metricName] = duration;
      }
    }
  });

  metrics.res = JSON.stringify(resourceEntries);

  return metrics;
}