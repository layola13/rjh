/**
 * Column configuration utilities for rendering table column titles
 * Provides a React hook for processing column definitions with custom title rendering
 */

import { ReactNode } from 'react';

/**
 * Base column definition interface
 */
export interface ColumnDefinition<T = any> {
  /**
   * Column title - can be a string, React node, or render function
   */
  title?: ReactNode | ((props: any) => ReactNode);
  
  /**
   * Nested child columns for grouped column headers
   */
  children?: ColumnDefinition<T>[];
  
  /**
   * Additional column properties (dataIndex, key, render, etc.)
   */
  [key: string]: any;
}

/**
 * Rendering context type for column titles
 * Contains locale, formatting options, or other contextual data
 */
export type RenderContext = Record<string, any>;

/**
 * Recursively processes column definitions and renders column titles
 * 
 * @param columns - Array of column definitions to process
 * @param context - Rendering context passed to title render functions
 * @returns Processed column definitions with rendered titles
 * 
 * @example
 *