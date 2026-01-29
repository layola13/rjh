interface StoreLoggerOptions {
  storeCount?: number;
}

interface LogEntry {
  [key: string]: unknown;
}

export class StoreLogger<T extends LogEntry = LogEntry> extends Logger<T> {
  private readonly storeCount?: number;
  private logStoreList: T[];

  constructor(name: string, options?: StoreLoggerOptions) {
    super(name, options);
    this.storeCount = options?.storeCount;
    this.logStoreList = [];
  }

  push(level: string, message: string, data?: unknown): T | null {
    const logEntry = super.push(level, message, data);
    
    if (logEntry) {
      this.storeLog(logEntry);
    }
    
    return logEntry;
  }

  private storeLog(entry: T): void {
    if (!this.storeCount) {
      return;
    }

    this.logStoreList.push(entry);

    if (this.storeCount < this.logStoreList.length) {
      const removeCount = this.logStoreList.length - this.storeCount;
      this.logStoreList.splice(0, removeCount);
    }
  }

  getStoreLog(count?: number): T[] {
    const requestedCount = count ?? this.logStoreList.length;
    const startIndex = Math.max(0, this.logStoreList.length - requestedCount);
    
    return this.logStoreList.slice(startIndex, this.logStoreList.length);
  }
}

abstract class Logger<T extends LogEntry = LogEntry> {
  constructor(protected name: string, protected options?: unknown) {}
  
  abstract push(level: string, message: string, data?: unknown): T | null;
}