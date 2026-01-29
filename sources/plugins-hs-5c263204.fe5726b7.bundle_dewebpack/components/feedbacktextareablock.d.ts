import { ReactElement } from 'react';
import { FeedbackBlock } from './FeedbackBlock';

/**
 * Props for FeedbackTextareaBlock component
 */
export interface FeedbackTextareaBlockProps {
  /** Label text displayed above the textarea */
  label: string;
  
  /** Whether the textarea is required */
  required?: boolean;
  
  /** Initial data for the textarea */
  data?: {
    /** Pre-filled content */
    content?: string;
  };
}

/**
 * State for FeedbackTextareaBlock component
 */
interface FeedbackTextareaBlockState {
  /** Current textarea value */
  value: string;
}

/**
 * A feedback textarea block component that extends FeedbackBlock.
 * Renders a labeled textarea input for collecting user feedback.
 */
export class FeedbackTextareaBlock extends FeedbackBlock<FeedbackTextareaBlockProps, FeedbackTextareaBlockState> {
  /**
   * Creates an instance of FeedbackTextareaBlock
   * @param props - Component props
   */
  constructor(props: FeedbackTextareaBlockProps);
  
  /**
   * Gets the current value of the textarea
   * @returns The current textarea value
   */
  getValue(): string;
  
  /**
   * Checks if the textarea is empty when required
   * @returns True if the field is required and empty, false otherwise
   */
  isEmpty(): boolean;
  
  /**
   * Handles textarea value changes
   * @param event - Change event from the textarea
   */
  onValueChange(event: React.ChangeEvent<HTMLTextAreaElement>): void;
  
  /**
   * Renders the feedback textarea block
   * @returns The rendered component
   */
  render(): ReactElement;
}