function use(element: string | Element, file?: string): Use {
  return this.put(new Use()).element(element, file);
}