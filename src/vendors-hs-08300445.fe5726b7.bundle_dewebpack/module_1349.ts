type BatchFunction = (callback: () => void) => void;

let batchExecutor: BatchFunction = (callback: () => void): void => {
  callback();
};

export function setBatch(fn: BatchFunction): BatchFunction {
  return batchExecutor = fn;
}

export function getBatch(): BatchFunction {
  return batchExecutor;
}