type FPSListener = (fps: number) => void;

interface AnimationFrameSignal {
  signalNewAnimationFrame?: unknown;
}

interface SignalHook {
  listen(signal: unknown, callback: () => void): void;
  dispose(): void;
}

declare namespace HSCore {
  namespace Util {
    class SignalHook {
      constructor(context: unknown);
      listen(signal: unknown, callback: () => void): void;
      dispose(): void;
    }
  }
}

const FPS_THRESHOLD_VALUE = 25;
const FPS_DANGER_VALUE = 10;
const FPS_MAX_VALUE = 60;
const FPS_INITIAL_VALUE = 60;
const FPS_CHECK_INTERVAL = 1000;
const FPS_HISTORY_LENGTH = 3;
const FPS_HISTORY_INITIAL = [25, 25, 25];
const LOW_FPS_MAX_COUNT = 3;
const FPS_RECOVERY_THRESHOLD = 15;
const FPS_VARIANCE_LOW = 0.8;
const FPS_VARIANCE_HIGH = 1.2;

class FPSMonitor {
  private _signalHook: SignalHook;
  private _frames: number;
  private _prevTime: number;
  private _listeners: FPSListener[];
  private _enable: boolean;
  private _fpsThresholdValue: number;
  private _fpsDangerValue: number;
  private _fpsHistoryList: number[];
  private _lowFpsCount: number;
  public fps: number;

  constructor(config: AnimationFrameSignal) {
    this._signalHook = new HSCore.Util.SignalHook(this);
    
    if (config.signalNewAnimationFrame) {
      this._signalHook.listen(
        config.signalNewAnimationFrame,
        this._onNewAnimationFrame.bind(this)
      );
    }

    this._frames = 0;
    this._prevTime = Date.now();
    this._listeners = [];
    this._enable = false;
    this.fps = FPS_INITIAL_VALUE;
    this._fpsThresholdValue = FPS_THRESHOLD_VALUE;
    this._fpsDangerValue = FPS_DANGER_VALUE;
    this._fpsHistoryList = [...FPS_HISTORY_INITIAL];
    this._lowFpsCount = 0;
  }

  private _onNewAnimationFrame(): void {
    if (!this._enable) {
      return;
    }

    const currentTime = Date.now();
    this._frames += 1;

    if (currentTime > this._prevTime + FPS_CHECK_INTERVAL) {
      const rawFps = (FPS_CHECK_INTERVAL * this._frames) / (currentTime - this._prevTime);
      const clampedFps = Math.min(Math.max(0, Math.round(rawFps)), FPS_MAX_VALUE);
      
      this.fps = clampedFps;
      this._trigger();
      this._prevTime = currentTime;
      this._frames = 0;
    }
  }

  public bind(listener: FPSListener): void {
    if (!this._listeners.includes(listener)) {
      this._listeners.push(listener);
    }
  }

  private _trigger(): void {
    if (this._checkIsNeedAppear()) {
      this._listeners.forEach((listener) => {
        listener(this.fps);
      });
    }
  }

  private _checkIsNeedAppear(): boolean {
    let shouldAppear = false;
    
    const averageFps = this._fpsHistoryList.reduce((sum, fps) => sum + fps, 0) / FPS_HISTORY_LENGTH;

    if (averageFps <= this._fpsThresholdValue && averageFps > this._fpsDangerValue) {
      this._lowFpsCount = 0;
      const lowerBound = FPS_VARIANCE_LOW * averageFps;
      const upperBound = FPS_VARIANCE_HIGH * averageFps;
      
      if (this.fps < lowerBound || this.fps > upperBound) {
        shouldAppear = true;
      }
    } else if (averageFps <= this._fpsDangerValue) {
      if (this._lowFpsCount < LOW_FPS_MAX_COUNT) {
        this._lowFpsCount++;
        shouldAppear = true;
      } else if (this.fps >= FPS_RECOVERY_THRESHOLD) {
        this._lowFpsCount = 0;
        shouldAppear = true;
      }
    } else if (this.fps < FPS_THRESHOLD_VALUE) {
      this._lowFpsCount = 0;
      shouldAppear = true;
    }

    this._fpsHistoryList.unshift(this.fps);
    this._fpsHistoryList.length = FPS_HISTORY_LENGTH;

    return shouldAppear;
  }

  public destroy(): void {
    this._signalHook.dispose();
  }

  public enable(): void {
    this._enable = true;
    this.reset();
  }

  public disable(): void {
    this._enable = false;
    this.reset();
  }

  public reset(): void {
    this.fps = FPS_MAX_VALUE;
    this._frames = 0;
    this._prevTime = Date.now();
  }
}

export default FPSMonitor;