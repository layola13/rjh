export const RequestType = Object.freeze({
  Composite: "HSCore.Transaction.Common.CompositeRequest",
  CompositeState: "HSCore.Transaction.Common.CompositeStateRequest",
  Data: "HSCore.Transaction.Common.DataRequest",
  ChangeFlag: "HSCore.Transaction.Entity.ChangeFlagRequest",
  Batch: "HSCore.Transaction.BatchRequest"
} as const);

export type RequestType = typeof RequestType[keyof typeof RequestType];