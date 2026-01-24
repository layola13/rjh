import React from 'react';
import { OverflowContext } from './overflow-context';

/**
 * Props for the RawItem component
 */
export interface RawItemProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The component to render as. Defaults to 'div'
   * @default 'div'
   */
  component?: React.ElementType;
  
  /**
   * Additional CSS class name(s)
   */
  className?: string;
  
  /**
   * Reference to the DOM element
   */
  ref?: React.Ref<HTMLElement>;
}

/**
 * RawItem component that conditionally renders based on OverflowContext.
 * 
 * When used within an OverflowContext:
 * - Merges className from context and props
 * - Wraps children in a nested OverflowContext.Provider with null value
 * 
 * When used outside an OverflowContext:
 * - Renders as the specified component (default: 'div')
 * - Passes through all props directly
 * 
 * @param props - Component props
 * @param ref - Forwarded ref to the rendered element
 * @returns Rendered React element
 */
declare const RawItem: React.ForwardRefExoticComponent<
  RawItemProps & React.RefAttributes<HTMLElement>
>;

export default RawItem;