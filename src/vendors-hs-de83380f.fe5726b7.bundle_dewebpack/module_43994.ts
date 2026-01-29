function assertThisInitialized<T>(value: T | undefined): T {
  if (value === undefined) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return value;
}

export default assertThisInitialized;