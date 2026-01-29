interface BehaviorData {
  behavior: unknown;
  [key: string]: unknown;
}

interface BehaviorContext {
  beforeSend?: (type: string, data: BehaviorData) => void;
  _lg: (type: string, data: BehaviorData, flag: number) => unknown;
}

function logBehavior(this: BehaviorContext, data: unknown): unknown {
  if (data) {
    const behaviorData: BehaviorData =
      typeof data === "object" && data !== null && "behavior" in data
        ? (data as BehaviorData)
        : { behavior: data };

    this.beforeSend?.("behavior", behaviorData);
    return this._lg("behavior", behaviorData, 1);
  }

  return undefined;
}