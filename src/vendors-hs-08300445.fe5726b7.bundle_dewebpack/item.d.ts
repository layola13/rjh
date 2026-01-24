/**
 * Module: Item
 * Original ID: 679791
 * Exports: Item
 */

import type { ReactElement, ReactNode, RefCallback } from 'react';

/**
 * Props for the Item component
 */
export interface ItemProps {
  /**
   * The child element to be rendered with a ref attached
   */
  children: ReactElement;
  
  /**
   * Callback to set the ref of the child element
   * @param element - The DOM element or component instance
   */
  setRef: RefCallback<unknown>;
}

/**
 * Item component that clones a child element and attaches a ref to it
 * @param props - The component props
 * @returns A cloned React element with the ref attached
 */
export declare function Item(props: ItemProps): ReactElement;