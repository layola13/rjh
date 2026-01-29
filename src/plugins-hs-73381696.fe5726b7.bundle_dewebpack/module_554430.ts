interface SignalHook {
  listen(signal: any, callback: () => void): void;
  dispose(): void;
}

interface FPSMetrics {
  enable(): void;
  disable(): void;
  destroy(): void;
  bind(callback: (fps: number) => void): void;
}

interface Logger {
  log(fps: number): void;
}

interface PerformanceMonitorConfig {
  signalDocumentOpening: any;
}

declare global {
  namespace HSCore {
    namespace Util {
      class SignalHook {
        constructor(context: any);
        listen(signal: any, callback: () => void): void;
        dispose(): void;
      }
    }
  }
}

class FPSMetricsImpl implements FPSMetrics {
  constructor(config: PerformanceMonitorConfig) {}
  enable(): void {}
  disable(): void {}
  destroy(): void {}
  bind(callback: (fps: number) => void): void {}
}

class LoggerImpl implements Logger {
  constructor(config: PerformanceMonitorConfig) {}
  log(fps: number): void {}
}

const METRICS_TOGGLE_INTERVAL = 301000;

class PerformanceMonitor {
  private _started: boolean;
  private _isReady: boolean;
  private _signalHook: SignalHook;
  private _timer?: NodeJS.Timeout;
  private fpsMetrics: FPSMetrics;
  private logger: Logger;
  private _metricsEnabled: boolean = true;

  constructor(config: PerformanceMonitorConfig) {
    this._started = false;
    this._isReady = false;
    this._signalHook = new HSCore.Util.SignalHook(this);
    this._signalHook.listen(
      config.signalDocumentOpening,
      this._onDocumentOpening.bind(this)
    );
    this.fpsMetrics = new FPSMetricsImpl(config);
    this.fpsMetrics.bind(this._onFPSChanged.bind(this));
    this.logger = new LoggerImpl(config);
  }

  destroy(): void {
    this.stop();
    this.fpsMetrics.destroy();
    this._signalHook.dispose();
  }

  start(): void {
    if (this._started) {
      return;
    }

    this._started = true;
    this._timer = setInterval(() => {
      if (this._isReady) {
        if (this._metricsEnabled) {
          this.fpsMetrics.enable();
        } else {
          this.fpsMetrics.disable();
        }
        this._metricsEnabled = !this._metricsEnabled;
      }
    }, METRICS_TOGGLE_INTERVAL);
  }

  documentReady(): void {
    if (this._started) {
      this._isReady = true;
      this.fpsMetrics.enable();
    }
  }

  stop(): void {
    if (this._timer) {
      clearInterval(this._timer);
    }
    this.fpsMetrics.disable();
  }

  private _onDocumentOpening(): void {
    this._isReady = false;
    this.fpsMetrics.disable();
  }

  private _onFPSChanged(fps: number): void {
    if (this._isReady || this._started) {
      this.logger.log(fps);
    }
  }
}

export default PerformanceMonitor;