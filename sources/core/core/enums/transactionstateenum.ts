export enum TransactionStateEnum {
  default = 0,
  undo = 1,
  redo = 2
}

Object.freeze(TransactionStateEnum);