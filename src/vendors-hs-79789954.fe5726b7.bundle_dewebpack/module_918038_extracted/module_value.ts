function removeAllChildren(destroyChildren: boolean = false): void {
  this._children.forEach((child: unknown, index: number) => {
    this.removeChild(child, destroyChildren);
  });
}