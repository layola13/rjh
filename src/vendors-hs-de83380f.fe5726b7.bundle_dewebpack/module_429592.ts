function assertThisInitialized<T>(instance: T): T {
  if (instance === undefined) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return instance;
}

export default assertThisInitialized;