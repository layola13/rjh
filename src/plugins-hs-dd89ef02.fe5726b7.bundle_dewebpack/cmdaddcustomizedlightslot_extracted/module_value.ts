function removePreviewAndCleanup(callback: () => void): void {
  this._removeLastPreviewLightSlot();
  this.onCleanup(callback);
}