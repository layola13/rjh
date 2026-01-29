function build(enabled: boolean): this {
  this._build = !!enabled;
  return this;
}