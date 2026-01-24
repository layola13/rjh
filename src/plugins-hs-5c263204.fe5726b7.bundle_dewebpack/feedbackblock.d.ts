import { Component, Context } from 'react';
import { ThemeContext } from './ThemeContext';

/**
 * FeedbackBlock component for collecting user feedback
 * This component extends React Component but doesn't render editable content
 */
export declare class FeedbackBlock extends Component {
  /**
   * Theme context type for accessing theme configuration
   */
  static contextType: Context<unknown>;

  /**
   * Returns the current value of the feedback block
   * @returns Empty string as feedback blocks don't store editable values
   */
  getValue(): string;

  /**
   * Indicates whether this block supports data extension
   * @returns False, indicating this block type doesn't extend data structures
   */
  dataExtend(): boolean;

  /**
   * Checks if the feedback block is empty
   * @returns True, as feedback blocks are always considered empty for validation purposes
   */
  isEmpty(): boolean;
}