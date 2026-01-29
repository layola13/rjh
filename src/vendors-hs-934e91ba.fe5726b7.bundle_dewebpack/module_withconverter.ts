function withConverter<T>(converter: T): T {
  return Object.assign({}, this.converter, converter, this.attributes);
}