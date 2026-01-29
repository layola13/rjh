function clearHashData<T>(): void {
  this.__data__ = Object.create(null);
  this.size = 0;
}

export default clearHashData;