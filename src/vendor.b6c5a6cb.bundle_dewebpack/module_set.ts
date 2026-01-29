function resizeHandler(target: HTMLElement | null): void {
  window.removeEventListener("resize", this.resize);
  this._resizeTo = target;
  
  if (target) {
    window.addEventListener("resize", this.resize);
    this.resize();
  }
}