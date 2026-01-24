import { FeedbackBlock } from './FeedbackBlock';
import { ReactNode } from 'react';

/**
 * Props for FeedbackSwitchBlock component
 */
export interface FeedbackSwitchBlockProps {
  /** Label text displayed for the switch */
  label: string;
  
  /** Whether the field is required */
  required?: boolean;
  
  /** Configuration data for the switch */
  data: {
    /** Text label displayed next to the checkbox */
    text: string;
    
    /** Whether the switch is disabled */
    disabled?: boolean;
  };
}

/**
 * State for FeedbackSwitchBlock component
 */
export interface FeedbackSwitchBlockState {
  /** Whether the switch is checked */
  checked: boolean;
}

/**
 * A feedback block component that renders a switch/checkbox control.
 * Extends the base FeedbackBlock to provide switch functionality for collecting boolean feedback.
 * 
 * @example
 *