function findIndex(element?: string | { jquery?: boolean; [key: number]: HTMLElement } | HTMLElement): number {
  if (!element) {
    return this[0] && this[0].parentNode 
      ? this.first().prevAll().length 
      : -1;
  }

  if (typeof element === "string") {
    return d.call(b(element), this[0]);
  }

  const targetElement = (element as { jquery?: boolean; [key: number]: HTMLElement }).jquery 
    ? (element as { [key: number]: HTMLElement })[0] 
    : element as HTMLElement;
    
  return d.call(this, targetElement);
}