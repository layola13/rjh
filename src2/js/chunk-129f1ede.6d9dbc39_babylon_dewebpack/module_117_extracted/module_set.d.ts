/**
 * Sets the capture render time flag and manages render time monitoring observers.
 * 
 * @param enabled - Whether to enable render time capture monitoring
 * @remarks
 * When enabled, attaches observers to texture render observables to monitor render time.
 * When disabled, removes the observers and cleans up references.
 */
function setCaptureRenderTime(enabled: boolean): void {
  if (enabled === this._captureRenderTime) {
    return;
  }

  this._captureRenderTime = enabled;

  if (enabled) {
    // Begin monitoring when render starts
    this._onBeginRenderObserver = this.texture.onBeginRenderObservable.add(() => {
      this._renderTime.beginMonitoring();
    });

    // End monitoring when render completes
    this._onEndRenderObserver = this.texture.onEndRenderObservable.add(() => {
      this._renderTime.endMonitoring(true);
    });
  } else {
    // Remove observers and clean up
    this.texture.onBeginRenderObservable.remove(this._onBeginRenderObserver);
    this._onBeginRenderObserver = null;

    this.texture.onEndRenderObservable.remove(this._onEndRenderObserver);
    this._onEndRenderObserver = null;
  }
}