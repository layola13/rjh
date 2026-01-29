interface PerformanceTiming {
  navigationStart?: number;
  fetchStart?: number;
  domainLookupStart?: number;
  domainLookupEnd?: number;
  connectStart?: number;
  connectEnd?: number;
  requestStart?: number;
  responseStart?: number;
  responseEnd?: number;
  domInteractive?: number;
  domContentLoadedEventEnd?: number;
  loadEventStart?: number;
  loadEventEnd?: number;
  secureConnectionStart?: number;
  [key: string]: number | undefined;
}

interface NavigationTiming {
  type?: number;
}

interface NetworkInformation {
  effectiveType?: string;
  type?: string;
  downlink?: number;
  downlinkMax?: number;
  bandwidth?: number;
}

interface PerformanceNavigationTiming extends PerformanceTiming {
  // Extends timing with navigation-specific properties
}

interface WindowPerformance {
  timing?: PerformanceTiming;
  navigation?: NavigationTiming;
  getEntriesByType?: (type: string) => PerformanceNavigationTiming[];
}

interface ExtendedNavigator extends Navigator {
  connection?: NetworkInformation;
}

interface ExtendedWindow extends Window {
  performance?: WindowPerformance;
  navigator: ExtendedNavigator;
  PerformanceNavigationTiming?: unknown;
}

interface PerformanceMetrics {
  dns?: number;
  tcp?: number;
  ssl?: number;
  ttfb?: number;
  trans?: number;
  dom?: number;
  res?: number;
  firstbyte?: number;
  fpt?: number;
  tti?: number;
  ready?: number;
  load?: number;
  ct?: string;
  bandwidth?: number;
  navtype?: string;
  begin?: number;
}

interface UtilityModule {
  win?: ExtendedWindow;
  each: <T>(obj: Record<string, T>, callback: (value: T, key: string) => void) => void;
}

interface TimingModule {
  TIMING_KEYS: string[];
}

const TIMING_KEY_MAP: Record<string, [number, number]> = {
  dns: [3, 2],
  tcp: [5, 4],
  ssl: [5, 17],
  ttfb: [7, 6],
  trans: [8, 7],
  dom: [10, 8],
  res: [14, 12],
  firstbyte: [7, 2],
  fpt: [8, 1],
  tti: [10, 1],
  ready: [12, 1],
  load: [14, 1]
};

const MAX_VALID_DURATION = 600000; // 6e5 milliseconds (10 minutes)
const MAX_BANDWIDTH = 999;
const MAX_FPT_DURATION = 3600000; // 36e5 milliseconds (1 hour)

const NAVIGATION_TYPE_RELOAD = 1;
const TIMING_API_VERSION_1 = 1;
const TIMING_API_VERSION_2 = 2;

export function getPerformanceMetrics(
  utilityModule: UtilityModule,
  timingModule: TimingModule
): PerformanceMetrics | null {
  const win = utilityModule.win ?? {};
  const performance = win.performance;

  if (!performance || typeof performance !== "object") {
    return null;
  }

  const metrics: PerformanceMetrics = {};
  let timing: PerformanceTiming = performance.timing ?? {};
  const now = Date.now();
  let apiVersion = TIMING_API_VERSION_1;

  if (typeof win.PerformanceNavigationTiming === "function") {
    const navigationEntries = performance.getEntriesByType?.("navigation") ?? [];
    const navigationEntry = navigationEntries[0];
    
    if (navigationEntry) {
      timing = navigationEntry;
      apiVersion = TIMING_API_VERSION_2;
    }
  }

  utilityModule.each(TIMING_KEY_MAP, (indices: [number, number], metricName: string) => {
    const startIndex = indices[1];
    const endIndex = indices[0];
    const startTime = timing[timingModule.TIMING_KEYS[startIndex]];
    const endTime = timing[timingModule.TIMING_KEYS[endIndex]];

    if (apiVersion === TIMING_API_VERSION_2 || (startTime !== undefined && startTime > 0 && endTime !== undefined && endTime > 0)) {
      const duration = Math.round(endTime - startTime);
      
      if (duration >= 0 && duration < MAX_VALID_DURATION) {
        (metrics as Record<string, number>)[metricName] = duration;
      }
    }
  });

  const connection = win.navigator.connection;
  const navigation = performance.navigation ?? {};

  metrics.ct = connection ? (connection.effectiveType ?? connection.type ?? "") : "";

  let bandwidth = connection?.downlink ?? connection?.downlinkMax ?? connection?.bandwidth ?? null;
  
  if (bandwidth !== null) {
    bandwidth = bandwidth > MAX_BANDWIDTH ? MAX_BANDWIDTH : bandwidth;
    metrics.bandwidth = bandwidth;
  }

  metrics.navtype = navigation.type === NAVIGATION_TYPE_RELOAD ? "Reload" : "Other";

  const fptStartKey = timingModule.TIMING_KEYS[16];
  const fptEndKey = timingModule.TIMING_KEYS[1];
  const fptStartTime = timing[fptStartKey];
  const fptEndTime = timing[fptEndKey];

  if (apiVersion === TIMING_API_VERSION_1 && fptStartTime !== undefined && fptStartTime > 0 && fptEndTime !== undefined && fptEndTime > 0) {
    const fptDuration = fptStartTime - fptEndTime;
    
    if (fptDuration >= 0 && fptDuration < MAX_FPT_DURATION) {
      metrics.fpt = fptDuration;
    }
  }

  const navigationStartKey = timingModule.TIMING_KEYS[1];
  const navigationStartTime = timing[navigationStartKey];

  if (apiVersion === TIMING_API_VERSION_1 && navigationStartTime !== undefined && navigationStartTime > 0) {
    metrics.begin = navigationStartTime;
  } else if (apiVersion === TIMING_API_VERSION_2 && metrics.load !== undefined && metrics.load > 0) {
    metrics.begin = now - metrics.load;
  } else {
    metrics.begin = now;
  }

  return metrics;
}

export default getPerformanceMetrics;