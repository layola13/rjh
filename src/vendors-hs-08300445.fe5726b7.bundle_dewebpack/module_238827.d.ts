/**
 * React component that conditionally prevents re-renders based on shouldUpdate prop.
 * This is a memoized component wrapper that only updates when shouldUpdate is true.
 * 
 * @module ConditionalMemo
 */

import type { ReactNode, MemoExoticComponent, ComponentType } from 'react';

/**
 * Props for the ConditionalMemo component
 */
interface ConditionalMemoProps {
  /** Child elements to render */
  children: ReactNode;
  
  /** Flag to control whether the component should update */
  shouldUpdate?: boolean;
}

/**
 * A memoized component that renders its children and only re-renders
 * when the shouldUpdate prop is explicitly set to true.
 * 
 * @param props - Component props
 * @returns The children elements unchanged
 * 
 * @example
 *