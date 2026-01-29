function cy(e?: number): number | this {
  return e == null 
    ? this.gbox().cy 
    : this.y(e - this.gbox().height / 2);
}