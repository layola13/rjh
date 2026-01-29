set value(e: unknown) {
    this.__value = e;
    this.compute();
}