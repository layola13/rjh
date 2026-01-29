import BaseCollector from './BaseCollector';

interface LogParams {
  traceId: string;
  lastTraceId: string;
}

function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

class TraceIdCollector extends BaseCollector {
  static readonly collecterName: string = 'traceId';
  static readonly dataExtend: boolean = true;

  private lastTraceId: string = '';

  constructor(options: unknown) {
    super(options);
  }

  getLogParams(): LogParams {
    const traceId = uuid();
    const lastTraceId = this.lastTraceId;
    this.lastTraceId = traceId;

    return {
      traceId,
      lastTraceId
    };
  }
}

export default TraceIdCollector;