/**
 * GUI 2D controls static utilities module
 * Provides static helper methods for GUI controls
 */

import type { Control } from './control';
import type { StackPanel } from './stackPanel';
import type { TextBlock } from './textBlock';

/**
 * Module name identifier
 */
export const name: string;

/**
 * Configuration options for adding a header to a control
 */
export interface AddHeaderOptions {
  /**
   * Whether the layout should be horizontal
   * @default true
   */
  isHorizontal?: boolean;
  
  /**
   * Whether the control should be placed before the header text
   * @default true
   */
  controlFirst?: boolean;
}

declare module './control' {
  interface Control {
    /**
     * Adds a header label to a control within a stack panel container
     * 
     * @param control - The control to add a header to
     * @param headerText - The text content of the header
     * @param size - The width (horizontal layout) or height (vertical layout) of the header
     * @param options - Layout configuration options
     * @returns A StackPanel containing the control and header with applied styling
     * 
     * @remarks
     * - In horizontal layout: header width is set to `size`, controls are arranged side-by-side
     * - In vertical layout: header height is set to `size`, controls are stacked
     * - Shadow properties from the original control are copied to the header
     * - Header text is left-aligned by default
     */
    AddHeader(
      control: Control,
      headerText: string,
      size: string,
      options?: AddHeaderOptions
    ): StackPanel;
  }
}