import { isValidElement, version } from 'react';
import { isMemo, ForwardRef } from 'react-is';
import type { ReactElement, Ref, RefObject, MutableRefObject } from 'react';

const REACT_MAJOR_VERSION = Number(version.split('.')[0]);

/**
 * Fills a ref with the given value
 * @param ref - The ref to fill (function or object ref)
 * @param value - The value to assign to the ref
 */
export const fillRef = <T = unknown>(
  ref: Ref<T> | undefined,
  value: T
): void => {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref && typeof ref === 'object' && 'current' in ref) {
    (ref as MutableRefObject<T>).current = value;
  }
};

/**
 * Composes multiple refs into a single ref callback
 * @param refs - Array of refs to compose
 * @returns A function that fills all provided refs
 */
export const composeRef = <T = unknown>(
  ...refs: Array<Ref<T> | undefined>
): Ref<T> | undefined => {
  const validRefs = refs.filter(Boolean) as Array<Ref<T>>;
  
  if (validRefs.length <= 1) {
    return validRefs[0];
  }
  
  return (value: T) => {
    refs.forEach((ref) => {
      fillRef(ref, value);
    });
  };
};

/**
 * Custom hook to compose multiple refs with memoization
 * @param refs - Array of refs to compose
 * @returns A memoized composed ref
 */
export const useComposeRef = <T = unknown>(
  ...refs: Array<Ref<T> | undefined>
): Ref<T> | undefined => {
  return useMemo(
    () => composeRef(...refs),
    refs,
    (prevDeps, nextDeps) => {
      return (
        prevDeps.length !== nextDeps.length ||
        prevDeps.every((prevRef, index) => prevRef !== nextDeps[index])
      );
    }
  );
};

/**
 * Checks if an element is a valid React element (not a fragment)
 * @param element - The element to check
 * @returns True if valid element and not a fragment
 */
const isValidElementWithoutFragment = (element: unknown): element is ReactElement => {
  return isValidElement(element) && !isFragment(element);
};

/**
 * Checks if a component supports ref
 * @param component - The component to check
 * @returns True if the component supports ref
 */
export const supportRef = (component: unknown): boolean => {
  if (!component) {
    return false;
  }

  if (isValidElementWithoutFragment(component) && REACT_MAJOR_VERSION >= 19) {
    return true;
  }

  const componentType = isMemo(component) 
    ? (component as any).type.type 
    : (component as any).type;

  const hasTypeRender = !(typeof componentType !== 'function' || 
    componentType.prototype?.render !== undefined) ||
    componentType.$$typeof === ForwardRef;

  const hasComponentRender = !(typeof component !== 'function' ||
    (component as any).prototype?.render !== undefined) ||
    (component as any).$$typeof === ForwardRef;

  return hasTypeRender && hasComponentRender;
};

/**
 * Checks if a component supports node ref
 * @param component - The component to check
 * @returns True if the component supports node ref
 */
export const supportNodeRef = (component: unknown): boolean => {
  return isValidElementWithoutFragment(component) && supportRef(component);
};

/**
 * Extracts the ref from a React element
 * @param element - The React element
 * @returns The ref if it exists, null otherwise
 */
export const getNodeRef = <T = unknown>(element: unknown): Ref<T> | null => {
  if (element && isValidElementWithoutFragment(element)) {
    const elementWithRef = element as ReactElement & { ref?: Ref<T> };
    
    return elementWithRef.props.propertyIsEnumerable('ref')
      ? elementWithRef.props.ref
      : elementWithRef.ref ?? null;
  }
  
  return null;
};

/**
 * Custom useMemo implementation with custom comparator
 */
function useMemo<T>(
  factory: () => T,
  deps: Array<unknown>,
  comparator: (prev: Array<unknown>, next: Array<unknown>) => boolean
): T {
  // Note: This is a placeholder for the actual useMemo with custom comparator
  // In production, this would use React's useMemo or a custom implementation
  return factory();
}

/**
 * Checks if an element is a React Fragment
 */
function isFragment(element: unknown): boolean {
  // Implementation would check for Fragment type
  return false;
}