import type { ReactElement, ReactNode, Ref, RefObject, MutableRefObject } from 'react';
import { version, isValidElement } from 'react';
import { isMemo, ForwardRef } from 'react-is';
import useMemo from './useMemo';
import isFragment from './isFragment';

const REACT_MAJOR_VERSION = Number(version.split('.')[0]);

export const fillRef = <T = unknown>(ref: Ref<T> | undefined, node: T): void => {
  if (typeof ref === 'function') {
    ref(node);
  } else if (ref && typeof ref === 'object' && 'current' in ref) {
    (ref as MutableRefObject<T>).current = node;
  }
};

export const composeRef = <T = unknown>(...refs: Array<Ref<T> | undefined>): Ref<T> | null => {
  const validRefs = refs.filter(Boolean) as Array<Ref<T>>;
  
  if (validRefs.length <= 1) {
    return validRefs[0] ?? null;
  }
  
  return (node: T) => {
    refs.forEach((ref) => {
      fillRef(ref, node);
    });
  };
};

export const useComposeRef = <T = unknown>(...refs: Array<Ref<T> | undefined>): Ref<T> | null => {
  return useMemo<Ref<T> | null>(
    () => composeRef(...refs),
    refs,
    (prevDeps, currentDeps) => {
      return prevDeps.length !== currentDeps.length || 
             prevDeps.every((dep, index) => dep !== currentDeps[index]);
    }
  );
};

const isValidReactElement = (element: unknown): element is ReactElement => {
  return isValidElement(element) && !isFragment(element);
};

export const supportRef = (element: ReactNode): boolean => {
  if (!element) {
    return false;
  }
  
  if (isValidReactElement(element) && REACT_MAJOR_VERSION >= 19) {
    return true;
  }
  
  const elementType = isMemo(element) 
    ? (element.type as any).type 
    : (element as ReactElement).type;
  
  const hasRefInType = typeof elementType !== 'function' || 
                       elementType.prototype?.render !== undefined ||
                       elementType.$$typeof === ForwardRef;
  
  const hasRefInElement = typeof element !== 'function' ||
                          (element as any).prototype?.render !== undefined ||
                          (element as any).$$typeof === ForwardRef;
  
  return hasRefInType && hasRefInElement;
};

export const supportNodeRef = (element: ReactNode): boolean => {
  return isValidReactElement(element) && supportRef(element);
};

export const getNodeRef = (element: ReactNode): Ref<unknown> | null => {
  if (element && isValidReactElement(element)) {
    const reactElement = element as ReactElement;
    
    return reactElement.props.propertyIsEnumerable('ref')
      ? reactElement.props.ref
      : (reactElement as any).ref;
  }
  
  return null;
};