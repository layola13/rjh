enum PerformanceLogLevel {
  PerformanceUserMarkLogLevel = 1,
  PerformanceConsoleLogLevel = 2,
}

interface PerformanceCounters {
  StartPerformanceCounter: () => void;
  EndPerformanceCounter: () => void;
  _StartUserMark: () => void;
  _EndUserMark: () => void;
  _StartPerformanceConsole: () => void;
  _EndPerformanceConsole: () => void;
  _StartPerformanceCounterDisabled: () => void;
  _EndPerformanceCounterDisabled: () => void;
}

function configurePerformanceCounters(
  level: number,
  counters: PerformanceCounters
): void {
  if ((level & PerformanceLogLevel.PerformanceUserMarkLogLevel) === PerformanceLogLevel.PerformanceUserMarkLogLevel) {
    counters.StartPerformanceCounter = counters._StartUserMark;
    counters.EndPerformanceCounter = counters._EndUserMark;
  } else if ((level & PerformanceLogLevel.PerformanceConsoleLogLevel) === PerformanceLogLevel.PerformanceConsoleLogLevel) {
    counters.StartPerformanceCounter = counters._StartPerformanceConsole;
    counters.EndPerformanceCounter = counters._EndPerformanceConsole;
  } else {
    counters.StartPerformanceCounter = counters._StartPerformanceCounterDisabled;
    counters.EndPerformanceCounter = counters._EndPerformanceCounterDisabled;
  }
}

export { configurePerformanceCounters, PerformanceLogLevel, type PerformanceCounters };