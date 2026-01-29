import * as React from 'react';

export const isValidElement = React.isValidElement;

export function replaceElement<P = any>(
  element: React.ReactElement<P> | null | undefined,
  fallback: React.ReactElement<P>,
  props?: Partial<P> | ((originalProps: P) => Partial<P>)
): React.ReactElement<P> {
  if (!isValidElement(element)) {
    return fallback;
  }

  const originalProps = element.props || {};
  const mergedProps = typeof props === 'function' 
    ? props(originalProps) 
    : props;

  return React.cloneElement(element, mergedProps);
}

export function cloneElement<P = any>(
  element: React.ReactElement<P> | null | undefined,
  props?: Partial<P> | ((originalProps: P) => Partial<P>)
): React.ReactElement<P> {
  return replaceElement(element, element, props);
}