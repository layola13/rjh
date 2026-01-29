interface FpsCountedData {
  fpsArray: number[];
}

class FpsCounter {
  private _app: any;
  private _count: number;
  private _signalHook: any;
  private prevTime: number = 0;
  private frames: number = 0;
  private allFps: number[] = [];
  
  public signalFpsCounted: any;

  constructor(app: any, count: number) {
    this._app = app;
    this._count = count;
    this.signalFpsCounted = new HSCore.Util.Signal(this);
    this._signalHook = new HSCore.Util.SignalHook(this);
  }

  public start(): void {
    this.prevTime = (performance || Date).now();
    this.frames = 0;
    this.allFps = [];
    this._signalHook.listen(
      this._app.signalNewAnimationFrame,
      this.onNewAnimationFrame
    );
  }

  public stop(): void {
    this.frames = 0;
    this.allFps = [];
    this._app.signalNewAnimationFrame.unlisten(this.onNewAnimationFrame, this);
  }

  public onNewAnimationFrame(): void {
    if (!this._app.is3DViewActive()) {
      if (this.allFps.length > 0) {
        this.frames = 0;
        this.allFps = [];
      }
      this.prevTime = (performance || Date).now();
      return;
    }

    this.frames++;
    const currentTime = (performance || Date).now();
    const ONE_SECOND_MS = 1000;

    if (currentTime >= this.prevTime + ONE_SECOND_MS) {
      const fps = (ONE_SECOND_MS * this.frames) / (currentTime - this.prevTime);
      this.allFps.push(fps);
      this.prevTime = currentTime;
      this.frames = 0;

      if (this.allFps.length >= this._count) {
        this.signalFpsCounted.dispatch({
          fpsArray: this.allFps.slice()
        });
        this.allFps = [];
      }
    }
  }
}

export default FpsCounter;