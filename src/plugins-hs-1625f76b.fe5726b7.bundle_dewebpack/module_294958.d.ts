import React from 'react';

/**
 * Props for the CeilingImageButton component
 */
export interface CeilingImageButtonProps {
  /** Item data containing icon images and label */
  item: {
    /** Default icon image URL */
    icon: string;
    /** Hover state icon image URL */
    iconHover: string;
    /** Label text for the button */
    label: string;
    /** Large view image URL to display on hover */
    largeViewImg: string;
  };
  /** Optional mouse down event handler */
  onMouseDown?: () => void;
}

/**
 * State for the CeilingImageButton component
 */
interface CeilingImageButtonState {
  /** Whether the button is currently being hovered */
  hover: boolean;
}

/**
 * Reference to the large view component instance
 */
interface CeilingLargeViewInstance {
  /** Immediately hide the large view without animation */
  hideLargeViewImmediately(): void;
  /** Hide the large view with animation */
  hideLargeView(): void;
}

/**
 * A ceiling-mounted image button component with hover effects and large view dialog
 * 
 * Features:
 * - Hover state with icon swap
 * - Large preview dialog on hover
 * - Mouse event handling
 */
export default class CeilingImageButton extends React.Component<
  CeilingImageButtonProps,
  CeilingImageButtonState
> {
  /** Reference to the ceiling large view dialog container element */
  private ceilingLargeViewDialog?: HTMLDivElement;
  
  /** Reference to the rendered large view component instance */
  private ceilingLargeView?: CeilingLargeViewInstance;

  constructor(props: CeilingImageButtonProps);

  /**
   * Handle mouse enter event - sets hover state to true
   */
  onMouseEnter(): void;

  /**
   * Handle mouse leave event - sets hover state to false if currently hovering
   */
  onMouseLeave(): void;

  /**
   * Handle mouse down event - hides large view and triggers props callback
   */
  onMouseDown(): void;

  /**
   * Show the large view dialog at the specified position
   * @param event - Mouse event containing cursor position
   */
  showLargeView(event: React.MouseEvent): void;

  /**
   * Immediately hide the large view dialog without animation
   */
  hideLargeViewImmediately(): void;

  /**
   * Hide the large view dialog with animation
   */
  hideLargeView(): void;

  /**
   * Render the ceiling image button component
   */
  render(): React.ReactElement;
}