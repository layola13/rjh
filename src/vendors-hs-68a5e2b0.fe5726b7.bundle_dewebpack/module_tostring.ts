function moduleToString(): string {
  return typeof XMLSerializer !== 'undefined' 
    ? new XMLSerializer().serializeToString(this.domDocument) 
    : '';
}