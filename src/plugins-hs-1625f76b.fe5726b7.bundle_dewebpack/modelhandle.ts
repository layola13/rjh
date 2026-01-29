export interface ChangeToParams {
  to: string;
  [key: string]: unknown;
}

export interface ChangeToResult {
  state: string;
  [key: string]: unknown;
}

export interface InitResult {
  cancel: boolean;
  [key: string]: unknown;
}

type ChangeToHandler = (params: ChangeToParams) => Promise<ChangeToResult>;

export class ModelHandle {
  isHeartbeat: boolean;
  lock: boolean;
  map: Record<string, ChangeToHandler>;
  ignoreHeartbeat: boolean;

  constructor() {
    this.isHeartbeat = false;
    this.lock = false;
    this.ignoreHeartbeat = false;
    this.map = this.initChangeToMap();
  }

  initChangeToMap(): Record<string, ChangeToHandler> {
    return {};
  }

  changeTo(params: ChangeToParams): Promise<ChangeToResult> {
    const handler = this.map[params.to];
    return handler 
      ? handler(params) 
      : Promise.resolve({ state: "keep" });
  }

  onUserChange(data: unknown): void {}

  init(param1: unknown, param2: unknown): InitResult {
    return { cancel: false };
  }
}