interface PercentLogData {
  key: string;
  subkey: string;
  val: number;
  begin: number;
}

function logPercent(
  key: string,
  subkey: string,
  value?: number,
  options?: unknown
): unknown {
  try {
    const logData: PercentLogData = {
      key,
      subkey,
      val: value ?? 0,
      begin: Date.now()
    };

    return this._lg("percent", logData, options);
  } catch (error) {
    console.warn(`[retcode] can not get parseStatData: ${error}`);
    return undefined;
  }
}