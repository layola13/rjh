function setCurrentWallWidth(width: number): void {
  this._currentWallWidth = width;
  
  if (this.context?.document) {
    this.context.document.lastWallWidth = width;
  }
}