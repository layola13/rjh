export default class PerformanceMonitor {
  private _svgView: any;
  private _webGLView: any;

  constructor(t: any) {
    this._svgView = t.getActive2DView();
    this._webGLView = t.getActive3DView();
  }

  memory(): { used?: number; limit?: number } {
    if (performance?.memory) {
      const BYTES_TO_MB = 1048576;
      return {
        used: Math.round(performance.memory.usedJSHeapSize / BYTES_TO_MB),
        limit: Math.round(performance.memory.jsHeapSizeLimit / BYTES_TO_MB)
      };
    }
    return {};
  }

  graphics(): { memory: number; render: number } {
    return {
      memory: NaN,
      render: NaN
    };
  }
}