const REACT_ELEMENT_TYPE = Symbol.for("react.element");
const REACT_TRANSITIONAL_ELEMENT_TYPE = Symbol.for("react.transitional.element");
const REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");

/**
 * Checks if the given value is a React Fragment element.
 * 
 * @param element - The value to check
 * @returns True if the element is a React Fragment, false otherwise
 */
export default function isReactFragment(element: unknown): boolean {
  return (
    element !== null &&
    element !== undefined &&
    typeof element === "object" &&
    (element as any).$$typeof === REACT_ELEMENT_TYPE ||
    (element as any).$$typeof === REACT_TRANSITIONAL_ELEMENT_TYPE) &&
    (element as any).type === REACT_FRAGMENT_TYPE
  );
}