function onSelect<T, R>(
  items: T[],
  transformFn: (item: T, index: number) => R,
  callback: (results: R[]) => void
): void {
  callback(
    items.map((item, index) => transformFn(item, index))
  );
}