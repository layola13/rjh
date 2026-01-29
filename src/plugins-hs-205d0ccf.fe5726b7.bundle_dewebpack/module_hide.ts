function destroyAndHideResizableWidgets(this: {
  destroyResizableWidgets: () => void;
  _$: (selector: string) => { hide: () => void };
  windowResizeHandler: (...args: unknown[]) => void;
}): void {
  this.destroyResizableWidgets();
  this._$(".snapshotresizable").hide();
  this._$(".decorateline").hide();
  
  if (typeof site !== 'undefined' && site.signalWindowResizeEnd) {
    site.signalWindowResizeEnd.unlisten(this.windowResizeHandler, this);
  }
  
  a.default.hide();
}

declare const site: {
  signalWindowResizeEnd: {
    unlisten: (handler: (...args: unknown[]) => void, context: unknown) => void;
  };
};

declare const a: {
  default: {
    hide: () => void;
  };
};