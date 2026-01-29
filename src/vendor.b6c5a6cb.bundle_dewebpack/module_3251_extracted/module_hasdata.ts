function hasData(element: Element | Document | Window): boolean {
  const data = (element as any)[this.expando];
  return data !== undefined && !isEmptyObject(data);
}

function isEmptyObject(obj: any): boolean {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}