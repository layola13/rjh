/**
 * Type guard to check if a value is a React Fragment element.
 * 
 * @param value - The value to check
 * @returns True if the value is a React Fragment element, false otherwise
 * 
 * @remarks
 * This function verifies that:
 * - The value is an object
 * - The value has a $$typeof property matching either react.element or react.transitional.element
 * - The type property equals the react.fragment symbol
 */
export default function isReactFragment(value: unknown): value is ReactFragmentElement;

/**
 * Represents a React Fragment element structure
 */
interface ReactFragmentElement {
  /**
   * The internal React element type identifier
   * Can be either 'react.element' or 'react.transitional.element'
   */
  $$typeof: symbol;
  
  /**
   * The type of the React element, should be the Fragment symbol
   */
  type: symbol;
  
  /**
   * Additional properties that may exist on a React element
   */
  [key: string]: unknown;
}

/**
 * Symbol identifier for standard React elements
 */
declare const REACT_ELEMENT_TYPE: unique symbol;

/**
 * Symbol identifier for transitional React elements
 */
declare const REACT_TRANSITIONAL_ELEMENT_TYPE: unique symbol;

/**
 * Symbol identifier for React Fragment type
 */
declare const REACT_FRAGMENT_TYPE: unique symbol;