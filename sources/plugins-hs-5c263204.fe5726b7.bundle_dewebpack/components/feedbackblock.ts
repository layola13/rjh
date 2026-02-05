// @ts-nocheck
import React from 'react';
import { ThemeContext } from './ThemeContext';

/**
 * FeedbackBlock component that extends React.Component
 * Provides empty value, no data extension, and is always empty
 */
export class FeedbackBlock extends React.Component {
  static contextType = ThemeContext;

  /**
   * Returns the current value of the feedback block
   * @returns Empty string as the feedback block has no value
   */
  getValue(): string {
    return '';
  }

  /**
   * Determines if the component extends data
   * @returns Always returns false as this component does not extend data
   */
  dataExtend(): boolean {
    return false;
  }

  /**
   * Checks if the feedback block is empty
   * @returns Always returns true as this component is always considered empty
   */
  isEmpty(): boolean {
    return true;
  }
}