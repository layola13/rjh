/**
 * React element type symbols
 */
const REACT_ELEMENT_TYPE = Symbol.for("react.element");
const REACT_PORTAL_TYPE = Symbol.for("react.portal");
const REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
const REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
const REACT_PROFILER_TYPE = Symbol.for("react.profiler");
const REACT_PROVIDER_TYPE = Symbol.for("react.provider");
const REACT_CONTEXT_TYPE = Symbol.for("react.context");
const REACT_SERVER_CONTEXT_TYPE = Symbol.for("react.server_context");
const REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
const REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
const REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
const REACT_MEMO_TYPE = Symbol.for("react.memo");
const REACT_LAZY_TYPE = Symbol.for("react.lazy");
const REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
const REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");

/**
 * Type definitions
 */
interface ReactElement {
  $$typeof: symbol;
  type: unknown;
}

interface ReactElementWithType extends ReactElement {
  type: {
    $$typeof?: symbol;
  };
}

interface ModuleReference {
  $$typeof: symbol;
  getModuleId?: () => string;
}

type ReactType = symbol | string | Function | ReactElement | ModuleReference;

/**
 * Get the type of a React element
 */
function typeOf(element: unknown): symbol | undefined {
  if (typeof element === "object" && element !== null) {
    const reactElement = element as ReactElement;
    const elementType = reactElement.$$typeof;

    switch (elementType) {
      case REACT_ELEMENT_TYPE:
        const type = reactElement.type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
          case REACT_SUSPENSE_LIST_TYPE:
            return type as symbol;
          default:
            const typeElement = type as { $$typeof?: symbol };
            const typeType = typeElement?.$$typeof;
            switch (typeType) {
              case REACT_SERVER_CONTEXT_TYPE:
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return typeType;
              default:
                return elementType;
            }
        }
      case REACT_PORTAL_TYPE:
        return elementType;
    }
  }
  return undefined;
}

/**
 * Check if element is a context consumer
 */
export function isContextConsumer(element: unknown): boolean {
  return typeOf(element) === REACT_CONTEXT_TYPE;
}

/**
 * Check if element is a context provider
 */
export function isContextProvider(element: unknown): boolean {
  return typeOf(element) === REACT_PROVIDER_TYPE;
}

/**
 * Check if value is a React element
 */
export function isElement(element: unknown): boolean {
  return (
    typeof element === "object" &&
    element !== null &&
    (element as ReactElement).$$typeof === REACT_ELEMENT_TYPE
  );
}

/**
 * Check if element is a forward ref
 */
export function isForwardRef(element: unknown): boolean {
  return typeOf(element) === REACT_FORWARD_REF_TYPE;
}

/**
 * Check if element is a fragment
 */
export function isFragment(element: unknown): boolean {
  return typeOf(element) === REACT_FRAGMENT_TYPE;
}

/**
 * Check if element is lazy
 */
export function isLazy(element: unknown): boolean {
  return typeOf(element) === REACT_LAZY_TYPE;
}

/**
 * Check if element is memo
 */
export function isMemo(element: unknown): boolean {
  return typeOf(element) === REACT_MEMO_TYPE;
}

/**
 * Check if element is a portal
 */
export function isPortal(element: unknown): boolean {
  return typeOf(element) === REACT_PORTAL_TYPE;
}

/**
 * Check if element is a profiler
 */
export function isProfiler(element: unknown): boolean {
  return typeOf(element) === REACT_PROFILER_TYPE;
}

/**
 * Check if element is strict mode
 */
export function isStrictMode(element: unknown): boolean {
  return typeOf(element) === REACT_STRICT_MODE_TYPE;
}

/**
 * Check if element is suspense
 */
export function isSuspense(element: unknown): boolean {
  return typeOf(element) === REACT_SUSPENSE_TYPE;
}

/**
 * Check if element is suspense list
 */
export function isSuspenseList(element: unknown): boolean {
  return typeOf(element) === REACT_SUSPENSE_LIST_TYPE;
}

/**
 * Check if element type is valid
 */
export function isValidElementType(element: unknown): boolean {
  return (
    typeof element === "string" ||
    typeof element === "function" ||
    element === REACT_FRAGMENT_TYPE ||
    element === REACT_PROFILER_TYPE ||
    element === REACT_STRICT_MODE_TYPE ||
    element === REACT_SUSPENSE_TYPE ||
    element === REACT_SUSPENSE_LIST_TYPE ||
    element === REACT_OFFSCREEN_TYPE ||
    (typeof element === "object" &&
      element !== null &&
      ((element as ReactElement).$$typeof === REACT_LAZY_TYPE ||
        (element as ReactElement).$$typeof === REACT_MEMO_TYPE ||
        (element as ReactElement).$$typeof === REACT_PROVIDER_TYPE ||
        (element as ReactElement).$$typeof === REACT_CONTEXT_TYPE ||
        (element as ReactElement).$$typeof === REACT_FORWARD_REF_TYPE ||
        (element as ReactElement).$$typeof === REACT_MODULE_REFERENCE ||
        (element as ModuleReference).getModuleId !== undefined))
  );
}

/**
 * Deprecated: Always returns false
 */
export function isAsyncMode(): boolean {
  return false;
}

/**
 * Deprecated: Always returns false
 */
export function isConcurrentMode(): boolean {
  return false;
}

/**
 * Exported constants
 */
export const ContextConsumer = REACT_CONTEXT_TYPE;
export const ContextProvider = REACT_PROVIDER_TYPE;
export const Element = REACT_ELEMENT_TYPE;
export const ForwardRef = REACT_FORWARD_REF_TYPE;
export const Fragment = REACT_FRAGMENT_TYPE;
export const Lazy = REACT_LAZY_TYPE;
export const Memo = REACT_MEMO_TYPE;
export const Portal = REACT_PORTAL_TYPE;
export const Profiler = REACT_PROFILER_TYPE;
export const StrictMode = REACT_STRICT_MODE_TYPE;
export const Suspense = REACT_SUSPENSE_TYPE;
export const SuspenseList = REACT_SUSPENSE_LIST_TYPE;

export { typeOf };