interface PerformanceData {
  t1?: number;
  t2?: number;
  t3?: number;
  t4?: number;
  t5?: number;
  t6?: number;
  t7?: number;
  t8?: number;
  t9?: number;
  t10?: number;
  ctti?: number;
  cfpt?: number;
  autoSend?: boolean;
  [key: string]: unknown;
}

interface LoggerContext {
  hasSendPerf: boolean;
  perfData?: PerformanceData;
  getConfig(key: string): unknown;
  _lg(type: string, data: PerformanceData, sample?: unknown): void;
}

const TIMING_PATTERN = /^t([1-9]|1[0])$/;
const CUSTOM_TIMING_KEYS = ['ctti', 'cfpt'] as const;

function handlePerformance(this: LoggerContext, eventData: unknown): void {
  if (!eventData || typeof eventData !== 'object' || this.hasSendPerf) {
    return;
  }

  const filteredData: PerformanceData = {};
  let mergedData: PerformanceData = {};
  const autoSendPerf = this.getConfig('autoSendPerf') as boolean;
  const data = eventData as PerformanceData;

  if (data.autoSend && autoSendPerf) {
    mergedData = { ...(this.perfData ?? {}), ...data };
    this.hasSendPerf = true;
    this._lg('perf', mergedData, this.getConfig('sample'));
    return;
  }

  if (data.autoSend && !autoSendPerf) {
    delete data.autoSend;
    if (this.perfData) {
      mergedData = { ...(this.perfData ?? {}), ...data };
      this.hasSendPerf = true;
      this._lg('perf', mergedData, this.getConfig('sample'));
    } else {
      this.perfData = data;
    }
    return;
  }

  for (const key in data) {
    if (TIMING_PATTERN.test(key) || key === 'ctti' || key === 'cfpt') {
      filteredData[key] = data[key];
    }
  }

  if (data.autoSend === true || (!autoSendPerf && (autoSendPerf || this.perfData))) {
    if (data.autoSend !== true && autoSendPerf === false && this.perfData) {
      const combinedData = { ...(this.perfData ?? {}), ...filteredData };
      this.hasSendPerf = true;
      this._lg('perf', combinedData, this.getConfig('sample'));
    }
    return;
  }

  this.perfData = { ...(this.perfData ?? {}), ...filteredData };
}