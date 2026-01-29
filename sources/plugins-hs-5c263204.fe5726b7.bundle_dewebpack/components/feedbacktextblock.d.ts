import { FeedbackBlock, FeedbackBlockProps } from './FeedbackBlock';
import { FeedbackBlockWrapper } from './FeedbackBlockWrapper';
import { FeedbackBlockLabel } from './FeedbackBlockLabel';
import * as React from 'react';

/**
 * Data structure for FeedbackTextBlock component
 */
interface FeedbackTextBlockData {
  /** The current value of the text block */
  value?: string;
  /** The display text content */
  text: string;
}

/**
 * Props for FeedbackTextBlock component
 */
interface FeedbackTextBlockProps extends FeedbackBlockProps {
  /** Label text displayed above the text block */
  label: string;
  /** Whether this field is required for validation */
  required?: boolean;
  /** Data object containing value and display text */
  data: FeedbackTextBlockData;
}

/**
 * FeedbackTextBlock Component
 * 
 * A feedback form block that displays static text content with an optional label.
 * Supports validation when marked as required.
 * 
 * @extends FeedbackBlock
 */
export declare class FeedbackTextBlock extends FeedbackBlock<FeedbackTextBlockProps> {
  /**
   * Constructs a new FeedbackTextBlock instance
   * @param props - Component properties
   */
  constructor(props: FeedbackTextBlockProps);

  /**
   * Gets the current value of the text block
   * @returns The text value or undefined if not set
   */
  getValue(): string | undefined;

  /**
   * Checks if the text block is empty when required
   * @returns True if the field is required and has no value, false otherwise
   */
  isEmpty(): boolean;

  /**
   * Renders the feedback text block component
   * @returns React element containing the labeled text block
   */
  render(): React.ReactElement;
}