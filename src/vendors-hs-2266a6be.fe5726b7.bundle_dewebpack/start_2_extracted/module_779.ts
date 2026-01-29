interface FpsConfig {
  fpsDuration?: number;
}

interface FpsResult {
  avg: number;
  min: number;
  max: number;
}

/**
 * FPS utility class for managing multiple FPS counters
 */
export class FpsUtil {
  private fpsMap: Map<string, FpsCounter>;
  private fpsDuration: number;

  constructor(config?: FpsConfig) {
    this.fpsMap = new Map();
    this.fpsDuration = config?.fpsDuration ?? 500;
  }

  /**
   * Start FPS counting for a specific key
   */
  start(key: string): void {
    if (!this.fpsMap.has(key)) {
      const counter = new FpsCounter({
        fpsDuration: this.fpsDuration
      });
      counter.start();
      this.fpsMap.set(key, counter);
    }
  }

  /**
   * End FPS counting for a specific key and return results
   */
  end(key: string): FpsResult | undefined {
    if (this.fpsMap.has(key)) {
      const counter = this.fpsMap.get(key);
      if (counter) {
        this.fpsMap.delete(key);
        return counter.end();
      }
    }
    return undefined;
  }
}

/**
 * Internal FPS counter class
 */
class FpsCounter {
  private isCounting: boolean;
  private fpsList: number[];
  private fpsDuration: number;
  private frame: number;
  private lastTime: number;

  constructor(config?: FpsConfig) {
    this.isCounting = false;
    this.fpsList = [];
    this.fpsDuration = config?.fpsDuration ?? 500;
    this.frame = 0;
    this.lastTime = 0;

    this.loop = this.loop.bind(this);
    this.start = this.start.bind(this);
    this.end = this.end.bind(this);
  }

  private loop(): void {
    const currentTime = performance.now();
    
    if (this.isCounting) {
      this.frame++;
      
      if (currentTime > this.fpsDuration + this.lastTime) {
        this.fpsPush(currentTime);
      }
      
      window.requestAnimationFrame(this.loop);
    }
  }

  private fpsPush(timestamp: number): void {
    const time = timestamp || performance.now();
    
    if (this.frame) {
      const fps = Math.round(1000 * this.frame / (time - this.lastTime));
      this.fpsList.push(fps);
    }
    
    this.frame = 0;
    this.lastTime = time;
  }

  private avg(values: number[]): number {
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }

  /**
   * Start counting FPS
   */
  start(): void {
    if (!this.isCounting) {
      this.isCounting = true;
      const currentTime = performance.now();
      this.lastTime = currentTime;
      this.frame = 0;
      this.fpsList = [];
      window.requestAnimationFrame(this.loop);
    }
  }

  /**
   * End counting and return FPS statistics
   */
  end(): FpsResult | undefined {
    this.isCounting = false;
    const fpsData = this.fpsList || [];
    
    if (fpsData.length) {
      return {
        avg: Math.round(this.avg(fpsData)),
        min: Math.min(...fpsData),
        max: Math.max(...fpsData)
      };
    }
    
    return undefined;
  }
}