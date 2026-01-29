interface SetModule {
  _leftCount: number;
}

function setLeftCount(this: SetModule, count: number): void {
  this._leftCount = count;
}