interface SenderConfig {
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

class LogSender {
  private sendErrorCount: number = 0;
  private readonly MaxSendErrorCount: number = MAX_SEND_ERROR_COUNT;
  private isPause: boolean = false;
  private readonly sendData: (items: LogItem[]) => Promise<void>;
  private readonly name: string;
  private readonly sendingQueueSize: number;
  private readonly maxSendTimeThreshold: number;
  private sending: boolean = false;
  private sendNow: boolean = false;
  private readonly logCache: LogCacheInterface;
  private sendTimer?: number;

  constructor(name: string, config: SenderConfig) {
    this.sendData = config.sendData;
    this.name = name;
    this.sendingQueueSize = config.sendingQueueSize ?? DEFAULT_SENDING_QUEUE_SIZE;
    this.maxSendTimeThreshold = config.maxSendTimeThreshold !== 0 
      ? (config.maxSendTimeThreshold ?? DEFAULT_MAX_SEND_TIME_THRESHOLD) 
      : config.maxSendTimeThreshold;
    this.logCache = new LogCache(this.name, config.storageType);
  }

  public pause(): void {
    this.isPause = true;
  }

  public start(): void {
    this.isPause = false;
  }

  public push(item: LogItem, sendImmediately: boolean = false): void {
    this.logCache.addItems([item]);
    this.startSend(this.sendNow || sendImmediately);
  }

  private startSend(immediate: boolean = false): void {
    if (this.sending) {
      this.sendNow = immediate;
      return;
    }

    if (immediate || this.logCache.queue.length >= this.sendingQueueSize) {
      this.clearTimer();
      this.send();
      return;
    }

    if (!this.sendTimer) {
      this.sendTimer = globalThis.setTimeout(() => {
        this.send();
      }, this.maxSendTimeThreshold);
    }
  }

  private clearTimer(): void {
    if (this.sendTimer) {
      globalThis.clearTimeout(this.sendTimer);
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
      const shouldSendImmediately = this.sendNow;
      this.sendNow = false;

      if (shouldSendImmediately || this.sendErrorCount === 0) {
        this.startSend(shouldSendImmediately);
      } else if (this.sendErrorCount < this.MaxSendErrorCount) {
        setTimeout(() => {
          this.startSend(shouldSendImmediately);
        }, RETRY_DELAY_MS);
      }
    }
  }

  private async sendTask(items: LogItem[]): Promise<void> {
    if (items.length === 0) {
      return Promise.resolve();
    }
    return this.sendData(items);
  }
}

class LogCache implements LogCacheInterface {
  public queue: LogItem[] = [];

  constructor(private name: string, private storageType?: string) {}

  public addItems(items: LogItem[]): void {
    this.queue.push(...items);
  }

  public async moveItemsToSend(count: number): Promise<LogItem[]> {
    const items = this.queue.splice(0, count);
    return Promise.resolve(items);
  }

  public async clearSendingQueue(): Promise<void> {
    return Promise.resolve();
  }
}

export default LogSender;