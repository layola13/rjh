interface Disposable {
  xReset(): void;
  xAddRef(): this;
  xIsDisposed: boolean;
  xDebugInfo?: string;
}

type Constructor<T = any> = new (...args: any[]) => T;
type CreatorFunction<T = any> = () => T;

/**
 * Object pool implementation for managing reusable object instances
 */
class ObjectPool {
  private static instance?: ObjectPool;
  
  private readonly poolByType: Map<string, Disposable[]>;
  private readonly customCreatorByType: Map<string, CreatorFunction>;

  constructor() {
    this.poolByType = new Map();
    this.customCreatorByType = new Map();
  }

  /**
   * Get singleton instance of ObjectPool
   */
  static getInstance(): ObjectPool {
    if (!ObjectPool.instance) {
      ObjectPool.instance = new ObjectPool();
    }
    return ObjectPool.instance;
  }

  /**
   * Get an object from the pool or create a new one
   */
  get<T extends Disposable>(type: string): T {
    let obj = this.findAvailableObjectFromPool<T>(type);
    
    if (obj) {
      obj.xReset();
    } else {
      const creator = this.customCreatorByType.get(type);
      obj = creator ? creator() : new (eval(type) as Constructor<T>)();
      
      HSCore.Util.Object.makeDisposable(obj);
      HSCore.Util.Object.makeRefCounted(obj);
      this.addObjectToPool(type, obj);
    }
    
    return obj.xAddRef() as T;
  }

  /**
   * Register a custom creator function for a specific type
   */
  registerCreator<T>(type: string, creator: CreatorFunction<T>): void {
    this.customCreatorByType.set(type, creator);
  }

  /**
   * Find an available (disposed) object from the pool
   */
  private findAvailableObjectFromPool<T extends Disposable>(type: string): T | undefined {
    const pool = this.poolByType.get(type);
    return pool?.find((obj) => obj.xIsDisposed) as T | undefined;
  }

  /**
   * Add an object to the pool
   */
  private addObjectToPool(type: string, obj: Disposable): void {
    let pool = this.poolByType.get(type);
    
    if (!pool) {
      pool = [];
      this.poolByType.set(type, pool);
    }
    
    pool.push(obj);
  }

  /**
   * Log the current status of all object pools
   */
  logPoolStatus(): void {
    Logger.console.log("HSCore.Util.ObjectPool Status:");
    
    this.poolByType.forEach((pool, type) => {
      const activeCount = pool.reduce((count, obj) => {
        if (!obj.xIsDisposed) {
          count++;
        }
        return count;
      }, 0);
      
      Logger.console.log(`- ${type}: ${activeCount}/${pool.length}`);
      
      pool.forEach((obj) => {
        if (!obj.xIsDisposed) {
          Logger.console.log(obj);
          Logger.console.log(`> ${obj.xDebugInfo ?? ''}`);
        }
      });
    });
  }
}

export { ObjectPool };