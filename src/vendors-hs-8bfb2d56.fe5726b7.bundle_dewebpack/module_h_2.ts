interface ErrorTracker {
  uncaught_exceptions?: number;
}

declare const bt: ErrorTracker;

function handleUncaughtException(error: unknown, t: unknown, r: unknown): never {
  if ("uncaught_exceptions" in bt) {
    bt.uncaught_exceptions!++;
  } else {
    bt.uncaught_exceptions = 1;
  }
  
  throw error;
}