function setState<T>(state: T): Promise<void> {
  return new Promise((resolve) => {
    this.setState(state, resolve);
  });
}