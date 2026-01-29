function getIndex(target?: string | { jquery?: boolean; [key: number]: Element }): number {
  if (!target) {
    return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
  }
  
  if (typeof target === "string") {
    return d.call(b(target), this[0]);
  }
  
  const element = target.jquery ? target[0] : target;
  return d.call(this, element);
}