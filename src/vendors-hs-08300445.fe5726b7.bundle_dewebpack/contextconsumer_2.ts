/**
 * React element type constants and utilities
 * Based on React v17.0.2 react-is
 */

const REACT_ELEMENT_TYPE = 0xeac7;
const REACT_PORTAL_TYPE = 0xeaca;
const REACT_FRAGMENT_TYPE = 0xeacb;
const REACT_STRICT_MODE_TYPE = 0xeacc;
const REACT_PROFILER_TYPE = 0xead2;
const REACT_PROVIDER_TYPE = 0xeacd;
const REACT_CONTEXT_TYPE = 0xeace;
const REACT_FORWARD_REF_TYPE = 0xead0;
const REACT_SUSPENSE_TYPE = 0xead1;
const REACT_SUSPENSE_LIST_TYPE = 0xead8;
const REACT_MEMO_TYPE = 0xead3;
const REACT_LAZY_TYPE = 0xead4;
const REACT_BLOCK_TYPE = 0xead9;
const REACT_SERVER_BLOCK_TYPE = 0xeada;
const REACT_FUNDAMENTAL_TYPE = 0xead5;
const REACT_DEBUG_TRACE_MODE_TYPE = 0xeae1;
const REACT_LEGACY_HIDDEN_TYPE = 0xeae3;

interface ReactElement {
  $$typeof: symbol | number;
  type?: unknown;
}

let elementType = REACT_ELEMENT_TYPE;
let portalType = REACT_PORTAL_TYPE;
let fragmentType = REACT_FRAGMENT_TYPE;
let strictModeType = REACT_STRICT_MODE_TYPE;
let profilerType = REACT_PROFILER_TYPE;
let providerType = REACT_PROVIDER_TYPE;
let contextType = REACT_CONTEXT_TYPE;
let forwardRefType = REACT_FORWARD_REF_TYPE;
let suspenseType = REACT_SUSPENSE_TYPE;
let suspenseListType = REACT_SUSPENSE_LIST_TYPE;
let memoType = REACT_MEMO_TYPE;
let lazyType = REACT_LAZY_TYPE;
let blockType = REACT_BLOCK_TYPE;
let serverBlockType = REACT_SERVER_BLOCK_TYPE;
let fundamentalType = REACT_FUNDAMENTAL_TYPE;
let debugTraceModeType = REACT_DEBUG_TRACE_MODE_TYPE;
let legacyHiddenType = REACT_LEGACY_HIDDEN_TYPE;

if (typeof Symbol === "function" && Symbol.for) {
  const symbolFor = Symbol.for;
  elementType = symbolFor("react.element");
  portalType = symbolFor("react.portal");
  fragmentType = symbolFor("react.fragment");
  strictModeType = symbolFor("react.strict_mode");
  profilerType = symbolFor("react.profiler");
  providerType = symbolFor("react.provider");
  contextType = symbolFor("react.context");
  forwardRefType = symbolFor("react.forward_ref");
  suspenseType = symbolFor("react.suspense");
  suspenseListType = symbolFor("react.suspense_list");
  memoType = symbolFor("react.memo");
  lazyType = symbolFor("react.lazy");
  blockType = symbolFor("react.block");
  serverBlockType = symbolFor("react.server.block");
  fundamentalType = symbolFor("react.fundamental");
  debugTraceModeType = symbolFor("react.debug_trace_mode");
  legacyHiddenType = symbolFor("react.legacy_hidden");
}

function typeOf(element: unknown): symbol | number | undefined {
  if (typeof element === "object" && element !== null) {
    const reactElement = element as ReactElement;
    const elementTypeSymbol = reactElement.$$typeof;

    switch (elementTypeSymbol) {
      case elementType:
        const type = reactElement.type as ReactElement | undefined;
        switch (type) {
          case fragmentType:
          case profilerType:
          case strictModeType:
          case suspenseType:
          case suspenseListType:
            return type;
          default:
            const nestedType = type?.$$typeof;
            switch (nestedType) {
              case contextType:
              case forwardRefType:
              case lazyType:
              case memoType:
              case providerType:
                return nestedType;
              default:
                return elementTypeSymbol;
            }
        }
      case portalType:
        return elementTypeSymbol;
    }
  }
  return undefined;
}

export const ContextConsumer = contextType;
export const ContextProvider = providerType;
export const Element = elementType;
export const ForwardRef = forwardRefType;
export const Fragment = fragmentType;
export const Lazy = lazyType;
export const Memo = memoType;
export const Portal = portalType;
export const Profiler = profilerType;
export const StrictMode = strictModeType;
export const Suspense = suspenseType;

export function isAsyncMode(): boolean {
  return false;
}

export function isConcurrentMode(): boolean {
  return false;
}

export function isContextConsumer(element: unknown): boolean {
  return typeOf(element) === contextType;
}

export function isContextProvider(element: unknown): boolean {
  return typeOf(element) === providerType;
}

export function isElement(element: unknown): boolean {
  return typeof element === "object" && element !== null && (element as ReactElement).$$typeof === elementType;
}

export function isForwardRef(element: unknown): boolean {
  return typeOf(element) === forwardRefType;
}

export function isFragment(element: unknown): boolean {
  return typeOf(element) === fragmentType;
}

export function isLazy(element: unknown): boolean {
  return typeOf(element) === lazyType;
}

export function isMemo(element: unknown): boolean {
  return typeOf(element) === memoType;
}

export function isPortal(element: unknown): boolean {
  return typeOf(element) === portalType;
}

export function isProfiler(element: unknown): boolean {
  return typeOf(element) === profilerType;
}

export function isStrictMode(element: unknown): boolean {
  return typeOf(element) === strictModeType;
}

export function isSuspense(element: unknown): boolean {
  return typeOf(element) === suspenseType;
}

export function isValidElementType(element: unknown): boolean {
  return (
    typeof element === "string" ||
    typeof element === "function" ||
    element === fragmentType ||
    element === profilerType ||
    element === debugTraceModeType ||
    element === strictModeType ||
    element === suspenseType ||
    element === suspenseListType ||
    element === legacyHiddenType ||
    (typeof element === "object" &&
      element !== null &&
      ((element as ReactElement).$$typeof === lazyType ||
        (element as ReactElement).$$typeof === memoType ||
        (element as ReactElement).$$typeof === providerType ||
        (element as ReactElement).$$typeof === contextType ||
        (element as ReactElement).$$typeof === forwardRefType ||
        (element as ReactElement).$$typeof === fundamentalType ||
        (element as ReactElement).$$typeof === blockType ||
        (element as any)[0] === serverBlockType))
  );
}

export { typeOf };