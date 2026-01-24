/**
 * Action type delimiter used to join multiple action types
 */
export const ACTION_TYPE_DELIMITER = " || ";

/**
 * Action type that can be a string, symbol, or action creator function
 */
type ActionType = string | symbol | ActionCreator;

/**
 * Action creator function that returns an action type
 */
interface ActionCreator {
  (...args: unknown[]): { type: string | symbol };
}

/**
 * Result object containing the combined action types as a string
 */
interface ActionTypeResult {
  /**
   * Returns the combined action types separated by delimiter
   */
  toString(): string;
}

/**
 * Validates if a value is a valid action type (string, symbol, or action creator)
 * @param value - The value to validate
 * @returns True if the value is a valid action type
 */
function isValidActionType(value: unknown): value is ActionType {
  return (
    typeof value === "string" ||
    typeof value === "symbol" ||
    isActionCreator(value)
  );
}

/**
 * Checks if a value is an action creator function
 * @param value - The value to check
 * @returns True if the value is an action creator
 */
function isActionCreator(value: unknown): value is ActionCreator {
  return typeof value === "function";
}

/**
 * Converts an action type to its string representation
 * @param actionType - The action type to convert
 * @returns String representation of the action type
 */
function actionTypeToString(actionType: ActionType): string {
  if (typeof actionType === "string") {
    return actionType;
  }
  if (typeof actionType === "symbol") {
    return actionType.toString();
  }
  return actionType.toString();
}

/**
 * Combines multiple action types into a single result object
 * Validates that all provided arguments are valid action types (strings, symbols, or action creators)
 * 
 * @param actionTypes - Variable number of action types to combine
 * @returns An object with a toString method that returns the combined action types
 * @throws Error if any argument is not a valid action type
 * 
 * @example
 *