import BaseCollector from './BaseCollector';

interface LogParams {
  traceId: string;
  lastTraceId: string;
}

function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * TraceId collector for tracking request traces
 */
export default class TraceIdCollector extends BaseCollector {
  static readonly collecterName = "traceId";
  static readonly dataExtend = true;

  private lastTraceId: string = "";

  constructor(config: unknown) {
    super(config);
  }

  /**
   * Generate log parameters with current and previous trace IDs
   */
  getLogParams(): LogParams {
    const currentTraceId = uuid();
    const previousTraceId = this.lastTraceId;
    
    this.lastTraceId = currentTraceId;
    
    return {
      traceId: currentTraceId,
      lastTraceId: previousTraceId
    };
  }
}