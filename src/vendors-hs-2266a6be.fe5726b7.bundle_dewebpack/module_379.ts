import Storage, { StorageTypes } from './Storage';
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
   * Start alive heartbeat tracking
   */
  private startLive(): void {
    window.addEventListener('beforeunload', this.unload);
    
    const aliveKey = `logger.${config.pageId}`;
    window.localStorage.setItem(aliveKey, JSON.stringify({ time: Date.now() }));

    setInterval(() => {
      window.localStorage.setItem(aliveKey, JSON.stringify({ time: Date.now() }));
    }, this.aliveTime);
  }

  /**
   * Handle page unload event
   */
  private unload(): void {
    const aliveKey = `logger.${config.pageId}`;
    window.localStorage.setItem(aliveKey, JSON.stringify({ time: 0 }));
    window.removeEventListener('beforeunload', this.unload);
  }

  /**
   * Get last queue data from storage
   */
  private getLasterQuery(key: string): Promise<LogItem[]> {
    return this.storage.get<LogItem[]>(key)
      .then((data) => {
        return this.storage.clear(key)
          .then(() => data)
          .catch(() => []);
      })
      .catch(() => []);
  }

  /**
   * Initialize and recover queues from previous sessions
   */
  private initLasterQueue(): void {
    const now = Date.now();
    
    this.storage.keys()
      .then((keys) => {
        const promises: Promise<LogItem[]>[] = [];
        
        keys.forEach((key) => {
          const prePageKey = `${this.name}-${config.prePageId}`;
          const preSendingKey = `${this.name}-sending-${config.prePageId}`;
          
          if (key !== prePageKey && key !== preSendingKey) {
            const prefixes = [this.name, `${this.name}-sending`];
            
            for (const prefix of prefixes) {
              if (key.startsWith(prefix)) {
                const pageId = key.replace(`${prefix}-`, '');
                const aliveKey = `logger.${pageId}`;
                const aliveData = window.localStorage.getItem(aliveKey);
                const lastAliveTime = aliveData ? (JSON.parse(aliveData) as AliveInfo).time : 0;
                
                if (now - lastAliveTime > 2 * this.aliveTime) {
                  promises.push(this.getLasterQuery(key));
                  localStorage.removeItem(aliveKey);
                }
                break;
              }
            }
          } else {
            promises.push(this.getLasterQuery(key));
          }
        });

        this.clearLasterAlive(now);
        
        return Promise.all(promises).then((results) => {
          const allItems: LogItem[] = [];
          results.forEach((items) => {
            if (items) {
              allItems.push(...items);
            }
          });
          this.addItems(allItems, true);
        });
      })
      .finally(() => {
        this.isInitialized = true;
      });
  }

  /**
   * Clear expired alive records from localStorage
   */
  private clearLasterAlive(currentTime: number): void {
    const length = window.localStorage.length;
    
    for (let i = 0; i < length; i++) {
      const key = window.localStorage.key(i);
      
      if (key?.startsWith('logger.')) {
        const data = window.localStorage.getItem(key);
        
        if (data) {
          const aliveInfo = JSON.parse(data) as AliveInfo;
          if (currentTime - aliveInfo.time > 2 * this.aliveTime) {
            window.localStorage.removeItem(key);
          }
        }
      }
    }
  }

  /**
   * Add items to queue
   */
  public addItems(items: LogItem[], prepend: boolean = false): void {
    this.queue = prepend ? [...items, ...this.queue] : [...this.queue, ...items];
    this.storageQueue();
  }

  /**
   * Set queue items
   */
  public setItems(items: LogItem[]): void {
    this.queue = items;
    this.storageQueue();
  }

  /**
   * Clear all queue items
   */
  public clearItems(): void {
    this.queue = [];
    this.storageQueue();
  }

  /**
   * Move items from queue to send queue
   */
  public moveItemsToSend(count: number): Promise<LogItem[]> {
    if (this.sendQueue.length >= count) {
      return Promise.resolve(this.sendQueue);
    }

    const itemsToMove = count - this.sendQueue.length;
    this.sendQueue = [...this.sendQueue, ...this.queue.splice(0, itemsToMove)];
    this.storageQueue();

    return this.storage.set(this.sendingKey, this.sendQueue)
      .catch(() => {})
      .then(() => this.sendQueue);
  }

  /**
   * Clear sending queue
   */
  public clearSendingQueue(): Promise<void> {
    this.sendQueue = [];
    return this.storage.clear(this.sendingKey);
  }

  /**
   * Persist queue to storage
   */
  private storageQueue(): void {
    if (this.storageIng) {
      this.isReSetStore = true;
      return;
    }

    this.storageIng = true;
    
    const operation = this.queue.length > 0
      ? this.storage.set(this.key, this.queue)
      : this.storage.clear(this.key);

    operation
      .catch(() => {})
      .finally(() => {
        this.storageIng = false;
        if (this.isReSetStore) {
          this.isReSetStore = false;
          this.storageQueue();
        }
      });
  }
}