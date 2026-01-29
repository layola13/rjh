function includes(this: string, searchString: string, position?: number): boolean {
  const str = String(this);
  const search = String(searchString);
  const pos = position !== undefined ? position : 0;
  
  return str.indexOf(search, pos) !== -1;
}

export { includes };