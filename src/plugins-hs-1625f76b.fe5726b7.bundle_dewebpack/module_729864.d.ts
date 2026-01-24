/**
 * Action creator for changing the start index
 * @module ChangeStartIndex
 */

/**
 * Payload type for the change start index action
 */
export interface ChangeStartIndexPayload {
  /** The new start index value */
  startIndex: number;
}

/**
 * Redux action type for changing start index
 */
export interface ChangeStartIndexAction {
  type: string;
  payload: ChangeStartIndexPayload;
}

/**
 * Redux dispatch function type
 */
export type Dispatch = (action: ChangeStartIndexAction) => void;

/**
 * Thunk function type that accepts a dispatch function
 */
export type ChangeStartIndexThunk = (dispatch: Dispatch) => void;

/**
 * Creates a thunk action to change the start index
 * 
 * @param startIndex - The new start index to set
 * @returns A thunk function that dispatches the change start index action
 * 
 * @example
 *