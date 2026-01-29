import Storage, { StorageTypes } from './storage';
import { config } from './config';

interface LogItem {
  [key: string]: unknown;
}

interface AliveInfo {
  time: number;
}

export class LogCache {
  private readonly name: string;
  private readonly pageId: string;
  private readonly aliveTime: number = 600000; // 10 minutes
  private readonly storage: Storage;
  
  private queue: LogItem[] = [];
  private sendQueue: LogItem[] = [];
  private storageIng: boolean = false;
  private isReSetStore: boolean = false;
  private isInitialized: boolean = false;

  constructor(name: string, storageType?: StorageTypes) {
    this.name = name;
    this.pageId = config.pageId;
    this.storage = new Storage('logger', {
      storageType: storageType || StorageTypes.localforageStorage
    });

    this.unload = this.unload.bind(this);
    this.startLive();

    setTimeout(() => {
      this.initLasterQueue();
    }, 1000);
  }

  private get key(): string {
    return `${this.name}-${this.pageId}`;
  }

  private get sendingKey(): string {
    return `${this.name}-sending-${this.pageId}`;
  }

  /**
   * Start alive heartbeat to track page session
   */
  private startLive(): void {
    window.addEventListener('beforeunload', this.unload);
    
    this.updateAliveTime();
    
    setInterval(() => {
      this.updateAliveTime();
    }, this.aliveTime);
  }

  private updateAliveTime(): void {
    window.localStorage.setItem(
      `logger.${config.pageId}`,
      JSON.stringify({ time: Date.now() })
    );
  }

  private unload(): void {
    window.localStorage.setItem(
      `logger.${config.pageId}`,
      JSON.stringify({ time: 0 })
    );
    window.removeEventListener('beforeunload', this.unload);
  }

  private async getLasterQuery(key: string): Promise<LogItem[]> {
    try {
      const data = await this.storage.get<LogItem[]>(key);
      try {
        await this.storage.clear(key);
        return data;
      } catch {
        return [];
      }
    } catch {
      return [];
    }
  }

  private async initLasterQueue(): Promise<void> {
    const currentTime = Date.now();

    try {
      const keys = await this.storage.keys();
      const promises: Promise<LogItem[]>[] = [];

      keys.forEach((key) => {
        const prePageKey = `${this.name}-${config.prePageId}`;
        const preSendingKey = `${this.name}-sending-${config.prePageId}`;

        if (key !== prePageKey && key !== preSendingKey) {
          const prefixes = [this.name, `${this.name}-sending`];

          for (const prefix of prefixes) {
            if (key.startsWith(prefix)) {
              const pageId = key.replace(`${prefix}-`, '');
              const aliveData = window.localStorage.getItem(`logger.${pageId}`);
              const aliveTime = aliveData ? (JSON.parse(aliveData) as AliveInfo).time : 0;

              if (currentTime - aliveTime > 2 * this.aliveTime) {
                promises.push(this.getLasterQuery(key));
                localStorage.removeItem(`logger.${pageId}`);
              }
              break;
            }
          }
        } else {
          promises.push(this.getLasterQuery(key));
        }
      });

      this.clearLasterAlive(currentTime);

      const results = await Promise.all(promises);
      const mergedQueue: LogItem[] = results.flatMap((items) => items || []);
      this.addItems(mergedQueue, true);
    } finally {
      this.isInitialized = true;
    }
  }

  private clearLasterAlive(currentTime: number): void {
    const storageLength = window.localStorage.length;

    for (let i = 0; i < storageLength; i++) {
      const key = window.localStorage.key(i);

      if (key?.startsWith('logger.')) {
        const dataStr = window.localStorage.getItem(key);
        if (dataStr) {
          const aliveInfo = JSON.parse(dataStr) as AliveInfo;
          if (currentTime - aliveInfo.time > 2 * this.aliveTime) {
            window.localStorage.removeItem(key);
          }
        }
      }
    }
  }

  /**
   * Add log items to queue
   */
  addItems(items: LogItem[], prepend: boolean = false): void {
    this.queue = prepend ? [...items, ...this.queue] : [...this.queue, ...items];
    this.storageQueue();
  }

  setItems(items: LogItem[]): void {
    this.queue = items;
    this.storageQueue();
  }

  clearItems(): void {
    this.queue = [];
    this.storageQueue();
  }

  async moveItemsToSend(count: number): Promise<LogItem[]> {
    if (this.sendQueue.length >= count) {
      return Promise.resolve(this.sendQueue);
    }

    const neededCount = count - this.sendQueue.length;
    const itemsToMove = this.queue.splice(0, neededCount);
    this.sendQueue = [...this.sendQueue, ...itemsToMove];

    this.storageQueue();

    try {
      await this.storage.set(this.sendingKey, this.sendQueue);
    } catch {
      // Ignore storage errors
    }

    return this.sendQueue;
  }

  async clearSendingQueue(): Promise<void> {
    this.sendQueue = [];
    return this.storage.clear(this.sendingKey);
  }

  private storageQueue(): void {
    if (this.storageIng) {
      this.isReSetStore = true;
      return;
    }

    this.storageIng = true;

    const storagePromise = this.queue.length
      ? this.storage.set(this.key, this.queue)
      : this.storage.clear(this.key);

    storagePromise
      .catch(() => {
        // Ignore storage errors
      })
      .finally(() => {
        this.storageIng = false;
        if (this.isReSetStore) {
          this.isReSetStore = false;
          this.storageQueue();
        }
      });
  }
}