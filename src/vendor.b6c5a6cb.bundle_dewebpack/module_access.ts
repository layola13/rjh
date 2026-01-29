function access<T>(t: string, r?: string | T, e?: T): T | string | undefined {
  return r === undefined || (r && typeof r === "string" && e === undefined)
    ? this.get(t, r)
    : (this.set(t, r, e), e !== undefined ? e : r);
}