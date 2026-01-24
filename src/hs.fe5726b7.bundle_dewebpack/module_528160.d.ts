/**
 * Popover component that displays contextual content with positioning
 * Supports multiple placements, triggers, and interactive behaviors
 */

import * as React from 'react';
import * as PropTypes from 'prop-types';

/**
 * Supported popover placement positions
 */
export type PopoverPlacement = 'top' | 'right' | 'bottom' | 'left';

/**
 * Supported trigger modes for showing/hiding the popover
 */
export type PopoverTrigger = 'click' | 'hover' | 'manual' | 'new';

/**
 * Props for the Popover component
 */
export interface PopoverProps {
  /** Additional CSS class name */
  className?: string;
  
  /** Placement position relative to target element */
  placement?: PopoverPlacement;
  
  /** Initial left position in pixels */
  positionLeft?: number;
  
  /** Initial top position in pixels */
  positionTop?: number;
  
  /** Callback fired when mouse enters the popover */
  onMouseEnter?: () => void;
  
  /** Callback fired when mouse leaves the popover */
  onMouseLeave?: () => void;
  
  /** Function to control keeping the popover open */
  setKeepOpen?: (keepOpen: boolean) => void;
  
  /** Callback fired when remove button is clicked */
  onRemove?: () => void;
  
  /** Whether the popover can be removed/dismissed */
  canRemove?: boolean;
  
  /** Trigger mode for the popover */
  trigger?: PopoverTrigger;
  
  /** Whether to show a dot indicator */
  showDot?: boolean;
  
  /** Popover type for styling variants */
  type?: string;
  
  /** Reference to popover wrapper component */
  popover?: React.ReactElement<PopoverProps>;
  
  /** Content to display inside the popover */
  children?: React.ReactNode;
}

/**
 * Internal state for the Popover component
 */
export interface PopoverState {
  /** Current left position */
  left: number;
  
  /** Current top position */
  top: number;
}

/**
 * Popover component for displaying floating contextual content
 * Provides positioning, mouse interaction, and dismissal functionality
 */
export default class Popover extends React.Component<PopoverProps, PopoverState> {
  static propTypes: {
    className: PropTypes.Requireable<string>;
    placement: PropTypes.Requireable<PopoverPlacement>;
    positionLeft: PropTypes.Requireable<number>;
    positionTop: PropTypes.Requireable<number>;
    onMouseEnter: PropTypes.Requireable<(...args: any[]) => any>;
    onMouseLeave: PropTypes.Requireable<(...args: any[]) => any>;
    setKeepOpen: PropTypes.Requireable<(...args: any[]) => any>;
    onRemove: PropTypes.Requireable<(...args: any[]) => any>;
    canRemove: PropTypes.Requireable<boolean>;
    trigger: PropTypes.Requireable<PopoverTrigger>;
  };

  static defaultProps: {
    className: string;
    placement: PopoverPlacement;
    positionLeft: number;
    positionTop: number;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };

  constructor(props: PopoverProps);

  /**
   * Updates the popover position
   * @param left - New left position in pixels
   * @param top - New top position in pixels
   */
  setPosition(left: number, top: number): void;

  /**
   * Handler for mouse enter events
   * Sets keep-open state and calls onMouseEnter callback
   */
  onMouseEnter(): void;

  /**
   * Handler for mouse leave events
   * Clears keep-open state and triggers removal for hover trigger
   */
  onMouseLeave(): void;

  render(): React.ReactElement;
}