export interface ListenEvent<T = unknown> {
  getListenSignal: T;
  listen: T;
}

export interface LogData {
  name: string;
  params: unknown;
  sendNow: boolean;
  triggerType: string;
  enableNotes: boolean;
  endParamsCallback: (() => void) | null;
  currentTime: number;
  performanceCurrentTime: number;
}

export function createListenEvent<T = unknown>(
  getListenSignal: T,
  listen: T
): ListenEvent<T> {
  return {
    getListenSignal,
    listen
  };
}

export function createLogData(
  name: string,
  params: unknown,
  sendNow: boolean,
  triggerType: string,
  enableNotes: boolean,
  endParamsCallback: (() => void) | null,
  currentTime: number,
  performanceCurrentTime: number
): LogData {
  return {
    name,
    params,
    sendNow,
    triggerType,
    enableNotes,
    endParamsCallback,
    currentTime,
    performanceCurrentTime
  };
}