function last<T>(array: T[] | null | undefined): T | undefined {
  const length = array?.length ?? 0;
  return length ? array[length - 1] : undefined;
}

export default last;