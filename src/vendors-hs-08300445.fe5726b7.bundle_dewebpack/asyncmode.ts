/**
 * React element type symbols and utilities for identifying React element types.
 * Based on React v16.13.1 react-is implementation.
 */

// Check if Symbol.for is available for creating well-known symbols
const hasSymbol = typeof Symbol === "function" && Symbol.for;

// React element type symbols
export const Element = hasSymbol ? Symbol.for("react.element") : 60103;
export const Portal = hasSymbol ? Symbol.for("react.portal") : 60106;
export const Fragment = hasSymbol ? Symbol.for("react.fragment") : 60107;
export const StrictMode = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
export const Profiler = hasSymbol ? Symbol.for("react.profiler") : 60114;
export const ContextProvider = hasSymbol ? Symbol.for("react.provider") : 60109;
export const ContextConsumer = hasSymbol ? Symbol.for("react.context") : 60110;
export const AsyncMode = hasSymbol ? Symbol.for("react.async_mode") : 60111;
export const ConcurrentMode = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111;
export const ForwardRef = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
export const Suspense = hasSymbol ? Symbol.for("react.suspense") : 60113;
export const SuspenseList = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
export const Memo = hasSymbol ? Symbol.for("react.memo") : 60115;
export const Lazy = hasSymbol ? Symbol.for("react.lazy") : 60116;
export const Block = hasSymbol ? Symbol.for("react.block") : 60121;
export const Fundamental = hasSymbol ? Symbol.for("react.fundamental") : 60117;
export const Responder = hasSymbol ? Symbol.for("react.responder") : 60118;
export const Scope = hasSymbol ? Symbol.for("react.scope") : 60119;

type ReactElementType = symbol | number;

interface ReactElement {
  $$typeof: ReactElementType;
  type?: unknown;
}

/**
 * Get the type of a React element
 */
export function typeOf(element: unknown): ReactElementType | undefined {
  if (typeof element === "object" && element !== null) {
    const reactElement = element as ReactElement;
    const elementType = reactElement.$$typeof;

    switch (elementType) {
      case Element:
        const type = reactElement.type as ReactElement | undefined;
        switch (type) {
          case AsyncMode:
          case ConcurrentMode:
          case Fragment:
          case Profiler:
          case StrictMode:
          case Suspense:
            return type;
          default:
            const nestedType = type?.$$typeof;
            switch (nestedType) {
              case ContextConsumer:
              case ForwardRef:
              case Lazy:
              case Memo:
              case ContextProvider:
                return nestedType;
              default:
                return elementType;
            }
        }
      case Portal:
        return elementType;
    }
  }
  return undefined;
}

/**
 * Check if element is in concurrent mode
 */
export function isConcurrentMode(element: unknown): boolean {
  return typeOf(element) === ConcurrentMode;
}

/**
 * Check if element is in async mode
 */
export function isAsyncMode(element: unknown): boolean {
  return isConcurrentMode(element) || typeOf(element) === AsyncMode;
}

/**
 * Check if element is a context consumer
 */
export function isContextConsumer(element: unknown): boolean {
  return typeOf(element) === ContextConsumer;
}

/**
 * Check if element is a context provider
 */
export function isContextProvider(element: unknown): boolean {
  return typeOf(element) === ContextProvider;
}

/**
 * Check if value is a React element
 */
export function isElement(element: unknown): boolean {
  return typeof element === "object" && element !== null && (element as ReactElement).$$typeof === Element;
}

/**
 * Check if element is a forward ref
 */
export function isForwardRef(element: unknown): boolean {
  return typeOf(element) === ForwardRef;
}

/**
 * Check if element is a fragment
 */
export function isFragment(element: unknown): boolean {
  return typeOf(element) === Fragment;
}

/**
 * Check if element is lazy-loaded
 */
export function isLazy(element: unknown): boolean {
  return typeOf(element) === Lazy;
}

/**
 * Check if element is memoized
 */
export function isMemo(element: unknown): boolean {
  return typeOf(element) === Memo;
}

/**
 * Check if element is a portal
 */
export function isPortal(element: unknown): boolean {
  return typeOf(element) === Portal;
}

/**
 * Check if element is a profiler
 */
export function isProfiler(element: unknown): boolean {
  return typeOf(element) === Profiler;
}

/**
 * Check if element is in strict mode
 */
export function isStrictMode(element: unknown): boolean {
  return typeOf(element) === StrictMode;
}

/**
 * Check if element is suspense
 */
export function isSuspense(element: unknown): boolean {
  return typeOf(element) === Suspense;
}

/**
 * Validate if a value is a valid React element type
 */
export function isValidElementType(element: unknown): boolean {
  return (
    typeof element === "string" ||
    typeof element === "function" ||
    element === Fragment ||
    element === ConcurrentMode ||
    element === Profiler ||
    element === StrictMode ||
    element === Suspense ||
    element === SuspenseList ||
    (typeof element === "object" &&
      element !== null &&
      ((element as ReactElement).$$typeof === Lazy ||
        (element as ReactElement).$$typeof === Memo ||
        (element as ReactElement).$$typeof === ContextProvider ||
        (element as ReactElement).$$typeof === ContextConsumer ||
        (element as ReactElement).$$typeof === ForwardRef ||
        (element as ReactElement).$$typeof === Fundamental ||
        (element as ReactElement).$$typeof === Responder ||
        (element as ReactElement).$$typeof === Scope ||
        (element as ReactElement).$$typeof === Block))
  );
}