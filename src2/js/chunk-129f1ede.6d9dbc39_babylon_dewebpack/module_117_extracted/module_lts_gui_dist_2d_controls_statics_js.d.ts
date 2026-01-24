/**
 * GUI 2D controls static utilities module
 * Provides utility functions for creating labeled controls with headers
 */

import { Control } from './control';
import { StackPanel } from './stackPanel';
import { TextBlock } from './textBlock';

/**
 * Module identifier name
 */
export const name: string;

/**
 * Configuration options for AddHeader method
 */
export interface AddHeaderOptions {
  /**
   * Whether the layout should be horizontal (true) or vertical (false)
   * @default true
   */
  isHorizontal?: boolean;

  /**
   * Whether the control should be placed before the header (true) or after (false)
   * @default true
   */
  controlFirst?: boolean;
}

declare module './control' {
  interface Control {
    /**
     * Creates a panel containing a control with a text header label
     * 
     * @param control - The control to be labeled
     * @param headerText - Text content for the header label
     * @param size - Width (if horizontal) or height (if vertical) of the header in CSS units
     * @param options - Layout configuration options
     * @returns A StackPanel containing both the control and its header
     * 
     * @example
     *