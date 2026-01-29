type ReactElement = {
  $$typeof: symbol;
  type: symbol;
  [key: string]: unknown;
};

/**
 * Checks if the given value is a React Fragment element.
 * @param element - The value to check
 * @returns True if the value is a React Fragment, false otherwise
 */
export default function isReactFragment(element: unknown): element is ReactElement {
  const REACT_ELEMENT_TYPE = Symbol.for("react.element");
  const REACT_TRANSITIONAL_ELEMENT_TYPE = Symbol.for("react.transitional.element");
  const REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");

  return (
    element !== null &&
    typeof element === "object" &&
    ((element as ReactElement).$$typeof === REACT_ELEMENT_TYPE ||
      (element as ReactElement).$$typeof === REACT_TRANSITIONAL_ELEMENT_TYPE) &&
    (element as ReactElement).type === REACT_FRAGMENT_TYPE
  );
}