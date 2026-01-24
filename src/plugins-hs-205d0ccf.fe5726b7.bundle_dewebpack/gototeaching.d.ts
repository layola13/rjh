/**
 * Module: GotoTeaching
 * Component for navigating to teaching content with a clickable link style
 */

import { Icons } from './Icons';
import { useTheme } from './theme';
import { useRemindModalContext } from './RemindModalContext';
import React from 'react';

/**
 * Props for the GotoTeaching component
 */
export interface GotoTeachingProps {
  /**
   * Additional CSS class name for styling
   */
  className?: string;
  
  /**
   * Content data to be passed to the teaching modal
   */
  content: unknown;
}

/**
 * GotoTeaching Component
 * 
 * Renders a clickable element that triggers a teaching modal when clicked.
 * Displays a separator, title text, and an arrow icon.
 * 
 * @param props - Component props
 * @returns React element representing the goto teaching link
 */
export declare function GotoTeaching(props: GotoTeachingProps): React.ReactElement;