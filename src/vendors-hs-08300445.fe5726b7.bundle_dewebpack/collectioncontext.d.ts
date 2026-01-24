/**
 * Module: CollectionContext
 * Original ID: 55219
 * Exports: Collection, CollectionContext
 */

import { ReactNode, ReactElement } from 'react';

/**
 * Data structure for a single collection item
 */
export interface CollectionItem<T = unknown> {
  /** The size measurement of the element */
  size: number;
  /** Reference to the DOM element */
  element: HTMLElement;
  /** Associated data payload */
  data: T;
}

/**
 * Callback signature for batch resize notifications
 * @param items - Array of all items that were resized in this batch
 */
export type BatchResizeCallback<T = unknown> = (items: CollectionItem<T>[]) => void;

/**
 * Callback signature for individual resize events
 * @param size - The size measurement
 * @param element - The DOM element
 * @param data - Associated data
 */
export type ResizeCallback<T = unknown> = (
  size: number,
  element: HTMLElement,
  data: T
) => void;

/**
 * Props for the Collection component
 */
export interface CollectionProps<T = unknown> {
  /** Child elements to render */
  children: ReactNode;
  /** Optional callback fired when a batch of resize operations completes */
  onBatchResize?: BatchResizeCallback<T>;
}

/**
 * Context for propagating resize callbacks down the component tree
 */
export const CollectionContext: React.Context<ResizeCallback | null>;

/**
 * Collection component that batches resize events from child elements
 * 
 * Accumulates resize notifications and batches them together using microtask timing.
 * When multiple children report size changes, they are collected and reported once
 * via the onBatchResize callback.
 * 
 * @example
 *