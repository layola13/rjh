type OperationType = "add" | "remove" | "replace";

interface Patch {
  op: OperationType;
  path: (string | number)[];
  value?: any;
}

interface State {
  t: number;
  u: any;
  i: any;
  N: any;
}

const ADD_OPERATION = "add";
const REMOVE_OPERATION = "remove";
const REPLACE_OPERATION = "replace";

function processState(
  state: State,
  path: (string | number)[],
  forwardPatches: Patch[],
  reversePatches: Patch[]
): void {
  switch (state.t) {
    case 0:
    case 4:
    case 2:
      handleObjectLikeState(state, path, forwardPatches, reversePatches);
      break;

    case 5:
    case 1:
      handleArrayState(state, path, forwardPatches, reversePatches);
      break;

    case 3:
      handleSetState(state, path, forwardPatches, reversePatches);
      break;
  }
}

function handleObjectLikeState(
  state: State,
  path: (string | number)[],
  forwardPatches: Patch[],
  reversePatches: Patch[]
): void {
  const oldValue = state.u;
  const newValue = state.i;

  g(state.N, (key: string | number, hasValue: boolean) => {
    const oldPropValue = u(oldValue, key);
    const newPropValue = u(newValue, key);
    const operation: OperationType = hasValue
      ? s(oldValue, key)
        ? REPLACE_OPERATION
        : ADD_OPERATION
      : REMOVE_OPERATION;

    if (oldPropValue !== newPropValue || operation !== REPLACE_OPERATION) {
      const propPath = path.concat(key);

      forwardPatches.push(
        operation === REMOVE_OPERATION
          ? { op: operation, path: propPath }
          : { op: operation, path: propPath, value: newPropValue }
      );

      reversePatches.push(
        operation === ADD_OPERATION
          ? { op: REMOVE_OPERATION, path: propPath }
          : operation === REMOVE_OPERATION
          ? { op: ADD_OPERATION, path: propPath, value: t(oldPropValue) }
          : { op: REPLACE_OPERATION, path: propPath, value: t(oldPropValue) }
      );
    }
  });
}

function handleArrayState(
  state: State,
  path: (string | number)[],
  forwardPatches: Patch[],
  reversePatches: Patch[]
): void {
  let oldArray = state.u;
  const modifiedKeys = state.N;
  let newArray = state.i;

  let localForwardPatches = forwardPatches;
  let localReversePatches = reversePatches;

  if (newArray.length < oldArray.length) {
    [oldArray, newArray] = [newArray, oldArray];
    [localForwardPatches, localReversePatches] = [
      localReversePatches,
      localForwardPatches,
    ];
  }

  for (let index = 0; index < oldArray.length; index++) {
    if (modifiedKeys[index] && newArray[index] !== oldArray[index]) {
      const itemPath = path.concat([index]);

      localForwardPatches.push({
        op: REPLACE_OPERATION,
        path: itemPath,
        value: t(newArray[index]),
      });

      localReversePatches.push({
        op: REPLACE_OPERATION,
        path: itemPath,
        value: t(oldArray[index]),
      });
    }
  }

  for (let index = oldArray.length; index < newArray.length; index++) {
    const itemPath = path.concat([index]);

    localForwardPatches.push({
      op: ADD_OPERATION,
      path: itemPath,
      value: t(newArray[index]),
    });
  }

  if (oldArray.length < newArray.length) {
    localReversePatches.push({
      op: REPLACE_OPERATION,
      path: path.concat(["length"]),
      value: oldArray.length,
    });
  }
}

function handleSetState(
  state: State,
  path: (string | number)[],
  forwardPatches: Patch[],
  reversePatches: Patch[]
): void {
  const oldSet = state.u;
  const newSet = state.i;
  let arrayIndex = 0;

  oldSet.forEach((item: any) => {
    if (!newSet.has(item)) {
      const itemPath = path.concat([arrayIndex]);

      forwardPatches.push({
        op: REMOVE_OPERATION,
        path: itemPath,
        value: item,
      });

      reversePatches.unshift({
        op: ADD_OPERATION,
        path: itemPath,
        value: item,
      });
    }
    arrayIndex++;
  });

  arrayIndex = 0;

  newSet.forEach((item: any) => {
    if (!oldSet.has(item)) {
      const itemPath = path.concat([arrayIndex]);

      forwardPatches.push({
        op: ADD_OPERATION,
        path: itemPath,
        value: item,
      });

      reversePatches.unshift({
        op: REMOVE_OPERATION,
        path: itemPath,
        value: item,
      });
    }
    arrayIndex++;
  });
}

declare function g(obj: any, callback: (key: any, value: any) => void): void;
declare function u(obj: any, key: any): any;
declare function s(obj: any, key: any): boolean;
declare function t(value: any): any;
declare const e: "add";