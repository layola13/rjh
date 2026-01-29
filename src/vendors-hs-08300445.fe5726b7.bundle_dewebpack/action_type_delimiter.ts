export const ACTION_TYPE_DELIMITER = " || ";

interface ActionTypeResult {
  toString: () => string;
}

type ActionTypeInput = string | symbol | { toString: () => string };

function isValidActionType(input: ActionTypeInput): boolean {
  return (
    typeof input === 'string' ||
    typeof input === 'symbol' ||
    (typeof input === 'object' && input !== null && typeof input.toString === 'function')
  );
}

function convertToString(input: ActionTypeInput): string {
  if (typeof input === 'string') {
    return input;
  }
  if (typeof input === 'symbol') {
    return input.toString();
  }
  return input.toString();
}

function areAllValidActionTypes(inputs: ActionTypeInput[]): boolean {
  if (inputs.length === 0) {
    return false;
  }
  return inputs.every(isValidActionType);
}

function invariant(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

export default function(...actionTypes: ActionTypeInput[]): ActionTypeResult {
  invariant(
    areAllValidActionTypes(actionTypes),
    "Expected action types to be strings, symbols, or action creators"
  );

  const combinedString = actionTypes.map(convertToString).join(ACTION_TYPE_DELIMITER);

  return {
    toString(): string {
      return combinedString;
    }
  };
}