interface LogQueueConfig {
  sendData: (items: LogItem[]) => Promise<void>;
  sendingQueueSize?: number;
  maxSendTimeThreshold?: number;
  storageType?: string;
}

interface LogItem {
  [key: string]: unknown;
}

interface LogCacheInterface {
  queue: LogItem[];
  addItems(items: LogItem[]): void;
  moveItemsToSend(count: number): Promise<LogItem[]>;
  clearSendingQueue(): Promise<void>;
}

const DEFAULT_SENDING_QUEUE_SIZE = 10;
const DEFAULT_MAX_SEND_TIME_THRESHOLD = 5000;
const MIN_SEND_BATCH_SIZE = 5;
const MAX_SEND_ERROR_COUNT = 5;
const RETRY_DELAY_MS = 3000;

class LogQueue {
  private sendErrorCount: number = 0;
  private readonly MaxSendErrorCount: number = MAX_SEND_ERROR_COUNT;
  private isPause: boolean = false;
  private sending: boolean = false;
  private sendNow: boolean = false;
  private sendTimer?: number;
  private readonly sendData: (items: LogItem[]) => Promise<void>;
  private readonly name: string;
  private readonly sendingQueueSize: number;
  private readonly maxSendTimeThreshold: number;
  private readonly logCache: LogCacheInterface;

  constructor(name: string, config: LogQueueConfig) {
    this.sendData = config.sendData;
    this.name = name;
    this.sendingQueueSize = config.sendingQueueSize ?? DEFAULT_SENDING_QUEUE_SIZE;
    this.maxSendTimeThreshold = config.maxSendTimeThreshold !== 0 
      ? (config.maxSendTimeThreshold ?? DEFAULT_MAX_SEND_TIME_THRESHOLD) 
      : config.maxSendTimeThreshold;
    this.logCache = new LogCache(this.name, config.storageType);
  }

  pause(): void {
    this.isPause = true;
  }

  start(): void {
    this.isPause = false;
  }

  push(item: LogItem, immediate: boolean = false): void {
    this.logCache.addItems([item]);
    this.startSend(this.sendNow || immediate);
  }

  private startSend(immediate: boolean = false): void {
    if (this.sending) {
      this.sendNow = immediate;
      return;
    }

    const shouldSendImmediately = immediate || this.logCache.queue.length >= this.sendingQueueSize;

    if (shouldSendImmediately) {
      this.clearTimer();
      this.send();
      return;
    }

    if (!this.sendTimer) {
      this.sendTimer = window.setTimeout(() => {
        this.send();
      }, this.maxSendTimeThreshold);
    }
  }

  private clearTimer(): void {
    if (this.sendTimer) {
      window.clearTimeout(this.sendTimer);
      this.sendTimer = undefined;
    }
  }

  private async send(): Promise<void> {
    if (this.sending || this.isPause) {
      return;
    }

    this.sending = true;
    this.sendNow = false;
    this.clearTimer();

    const batchSize = Math.max(MIN_SEND_BATCH_SIZE, this.sendingQueueSize);

    try {
      const itemsToSend = await this.logCache.moveItemsToSend(batchSize);
      await this.sendTask(itemsToSend);
      this.sendErrorCount = 0;
      await this.logCache.clearSendingQueue().catch(() => {});
    } catch (error) {
      console.error('send-log-data-error', error);
      this.sendErrorCount++;

      if (this.sendErrorCount >= this.MaxSendErrorCount) {
        await this.logCache.clearSendingQueue().catch(() => {});
      }
    } finally {
      this.sending = false;
      const shouldSendAgain = this.sendNow;
      this.sendNow = false;

      if (shouldSendAgain || this.sendErrorCount === 0) {
        this.startSend(shouldSendAgain);
      } else if (this.sendErrorCount < this.MaxSendErrorCount) {
        setTimeout(() => {
          this.startSend(shouldSendAgain);
        }, RETRY_DELAY_MS);
      }
    }
  }

  private sendTask(items: LogItem[]): Promise<void> {
    return items.length ? this.sendData(items) : Promise.resolve();
  }
}

class LogCache implements LogCacheInterface {
  queue: LogItem[] = [];

  constructor(name: string, storageType?: string) {
    // Implementation depends on external module
  }

  addItems(items: LogItem[]): void {
    // Implementation depends on external module
  }

  moveItemsToSend(count: number): Promise<LogItem[]> {
    // Implementation depends on external module
    return Promise.resolve([]);
  }

  clearSendingQueue(): Promise<void> {
    // Implementation depends on external module
    return Promise.resolve();
  }
}

export default LogQueue;