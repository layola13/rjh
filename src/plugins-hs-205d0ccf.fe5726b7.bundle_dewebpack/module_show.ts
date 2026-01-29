function show(element: HTMLElement): void {
    this.initResizableWidgets(element);
    this._$(".snapshotresizable").show();
    this._$(".decorateline").show();
    this.setRatio(element);
    site.signalWindowResizeEnd.listen(this.windowResizeHandler, this);
    a.default.show();
}