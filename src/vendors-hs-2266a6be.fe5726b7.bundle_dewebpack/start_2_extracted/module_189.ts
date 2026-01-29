export interface StoreLoggerOptions {
  storeCount?: number;
}

export interface LogEntry {
  level: string;
  message: string;
  timestamp: number;
  [key: string]: unknown;
}

export class StoreLogger extends Logger {
  private readonly storeCount?: number;
  private logStoreList: LogEntry[] = [];

  constructor(name: string, options?: StoreLoggerOptions) {
    super(name, options);
    this.storeCount = options?.storeCount;
  }

  push(level: string, message: string, metadata?: unknown): LogEntry | null {
    const logEntry = super.push(level, message, metadata);
    
    if (logEntry) {
      this.storeLog(logEntry);
    }
    
    return logEntry;
  }

  private storeLog(logEntry: LogEntry): void {
    if (!this.storeCount) {
      return;
    }

    this.logStoreList.push(logEntry);

    if (this.storeCount < this.logStoreList.length) {
      const removeCount = this.logStoreList.length - this.storeCount;
      this.logStoreList.splice(0, removeCount);
    }
  }

  getStoreLog(count?: number): LogEntry[] {
    const requestedCount = count ?? this.logStoreList.length;
    const startIndex = Math.max(0, this.logStoreList.length - requestedCount);
    
    return this.logStoreList.slice(startIndex, this.logStoreList.length);
  }
}

class Logger {
  constructor(protected name: string, protected options?: unknown) {}

  push(level: string, message: string, metadata?: unknown): LogEntry | null {
    return null;
  }
}