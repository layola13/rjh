function avg(e: unknown, n: unknown, t: unknown): unknown {
  try {
    const params = this.dealParam(e, n, 0);
    return this._lg("avg", parseData(params), t);
  } catch (error) {
    this.warn(`[retcode] can not get parseStatData: ${error}`);
    return undefined;
  }
}

function parseData(data: unknown): unknown {
  return data;
}