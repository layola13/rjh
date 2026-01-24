/**
 * PropTypes utilities for CSS transition components
 * Provides validation helpers for transition-related props
 */

import PropTypes from 'prop-types';

/**
 * Shape definition for transition class names
 * Supports both simple string format and detailed object format with enter/leave/appear states
 */
export const nameShape: PropTypes.Requireable<
  | string
  | {
      enter?: string;
      leave?: string;
      active?: string;
    }
  | {
      enter?: string;
      enterActive?: string;
      leave?: string;
      leaveActive?: string;
      appear?: string;
      appearActive?: string;
    }
>;

/**
 * Creates a custom PropTypes validator for transition timeout values
 * Ensures that when a transition is enabled, its corresponding timeout is provided and valid
 * 
 * @param transitionType - The type of transition ('Enter' or 'Leave')
 * @returns A PropTypes validator function
 * 
 * @example
 *