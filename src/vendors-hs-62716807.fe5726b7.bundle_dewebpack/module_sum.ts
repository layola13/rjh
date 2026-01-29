function sum(e: unknown, n: unknown, t: unknown): unknown {
  try {
    const parsedData = this.dealParam(e, n, 1);
    return this._lg("sum", parsedData, t);
  } catch (error) {
    this.warn("[retcode] can not get parseStatData: " + error);
  }
}