import React from 'react';

/**
 * Props for arrow navigation components in a carousel/slider
 */
interface ArrowComponentProps {
  /** Current active slide index */
  currentSlide: number;
  /** Total number of slides */
  slideCount: number;
  /** Number of slides visible at once */
  slidesToShow: number;
  /** Whether the carousel loops infinitely */
  infinite: boolean;
  /** Callback function triggered when arrow is clicked */
  clickHandler: (options: { message: string }, event?: React.MouseEvent) => void;
  /** Custom React element to render as the previous arrow */
  prevArrow?: React.ReactElement;
  /** Custom React element to render as the next arrow */
  nextArrow?: React.ReactElement;
}

/**
 * Props passed to custom arrow elements
 */
interface ArrowElementProps {
  /** Data attribute for accessibility */
  'data-role': string;
  /** CSS classes for styling */
  className: string;
  /** Inline styles */
  style: React.CSSProperties;
  /** Click event handler */
  onClick: ((event: React.MouseEvent) => void) | null;
  /** Current active slide index */
  currentSlide: number;
  /** Total number of slides */
  slideCount: number;
  /** Unique key for React reconciliation */
  key: string;
}

/**
 * Previous arrow button component for carousel navigation
 * Handles backward navigation with disabled state management
 */
export declare class PrevArrow extends React.PureComponent<ArrowComponentProps> {
  /**
   * Handles click events on the previous arrow
   * @param options - Navigation options containing direction message
   * @param event - React mouse event, will be prevented if exists
   */
  clickHandler(options: { message: string }, event?: React.MouseEvent): void;

  /**
   * Renders the previous arrow button or custom element
   * Automatically disables when at the first slide (non-infinite mode)
   */
  render(): React.ReactElement;
}

/**
 * Next arrow button component for carousel navigation
 * Handles forward navigation with disabled state management
 */
export declare class NextArrow extends React.PureComponent<ArrowComponentProps> {
  /**
   * Handles click events on the next arrow
   * @param options - Navigation options containing direction message
   * @param event - React mouse event, will be prevented if exists
   */
  clickHandler(options: { message: string }, event?: React.MouseEvent): void;

  /**
   * Renders the next arrow button or custom element
   * Automatically disables when navigation forward is not possible
   */
  render(): React.ReactElement;
}