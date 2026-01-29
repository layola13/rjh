interface SpeedCache {
  begin: number;
  page?: string;
  [key: string]: number | string | undefined;
}

interface Config {
  startTime?: number;
}

class SpeedModule {
  private speedCache: SpeedCache | null = null;
  private speedTimmer: ReturnType<typeof setTimeout> | null = null;
  private _startTime: number = Date.now();

  private getConfig(key: string): number | undefined {
    // Implementation depends on actual config system
    return undefined;
  }

  private getPage(flag: boolean): string {
    // Implementation depends on actual page tracking logic
    return '';
  }

  private _lg(type: string, data: SpeedCache | null): void {
    // Implementation depends on actual logging logic
  }

  private warn(message: string): void {
    console.warn(message);
  }

  public recordSpeed(point: string, timestamp?: number, skipPageTracking?: boolean): this {
    const SPEED_FLUSH_DELAY = 5000;
    const SPEED_POINT_PATTERN = /^s(\d|1[0])$/;

    const startTime: number = this.getConfig('startTime') ?? this._startTime;

    if (!SPEED_POINT_PATTERN.test(point)) {
      this.warn(`[retcode] invalid point: ${point}`);
      return this;
    }

    let normalizedTimestamp: number;
    if (typeof timestamp !== 'number') {
      normalizedTimestamp = Date.now() - startTime;
    } else {
      normalizedTimestamp = timestamp >= startTime ? timestamp - startTime : timestamp;
    }

    this.speedCache = this.speedCache ?? {};
    this.speedCache[point] = normalizedTimestamp;
    this.speedCache.begin = startTime;

    if (this.speedTimmer !== null) {
      clearTimeout(this.speedTimmer);
    }

    this.speedTimmer = setTimeout(() => {
      if (!skipPageTracking) {
        this.speedCache!.page = this.getPage(true);
      }
      this._lg('speed', this.speedCache);
      this.speedCache = null;
    }, SPEED_FLUSH_DELAY);

    return this;
  }
}