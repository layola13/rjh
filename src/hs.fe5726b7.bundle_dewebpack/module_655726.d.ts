/**
 * HelpTip Component - Displays a help icon with tooltip/popover functionality
 * Supports both legacy widget mode and modern popover implementations
 */

import React from 'react';

/**
 * Popover trigger types
 */
type PopoverTrigger = 'click' | 'hover' | 'manual';

/**
 * Popover placement positions
 */
type PopoverPlacement = 'top' | 'right' | 'bottom' | 'left';

/**
 * Component props interface
 */
export interface HelpTipProps {
  /** Trigger event type for popover */
  trigger?: PopoverTrigger;
  
  /** Delay before showing popover (in milliseconds) */
  delay?: number;
  
  /** Placement position of the popover */
  placement?: PopoverPlacement;
  
  /** Image URL to display in popover */
  imageUrl?: string;
  
  /** Video URL to display in popover */
  videoUrl?: string;
  
  /** Text content for tooltip/popover */
  text?: string;
  
  /** Whether to show action button in popover */
  showBtn?: boolean;
  
  /** Button click handler */
  onBtnClick?: () => void;
  
  /** Button label text */
  btnText?: string;
  
  /** Link text for popover link */
  linkText?: string;
  
  /** Link URL for popover link */
  linkUrl?: string;
  
  /** Additional CSS class name */
  className?: string;
  
  /** Image source for help icon */
  src?: string;
  
  /** Whether to use heavy popover variant */
  isHeavy?: boolean;
  
  /** Legacy widget support mode */
  support_oldWidget?: boolean;
  
  /** Additional data object */
  data?: {
    /** Fallback image URL from data object */
    imageUrl?: string;
  };
}

/**
 * Component state interface
 */
export interface HelpTipState {
  /** Whether mouse is hovering over the component */
  hover: boolean;
}

/**
 * HelpTip Component
 * Renders a help icon that displays additional information in a tooltip or popover
 */
export default class HelpTip extends React.Component<HelpTipProps, HelpTipState> {
  /**
   * Default prop values
   */
  static defaultProps: Partial<HelpTipProps>;
  
  /**
   * Component state
   */
  state: HelpTipState;
  
  /**
   * Constructor
   * @param props - Component properties
   */
  constructor(props: HelpTipProps);
  
  /**
   * Creates a popover component based on props configuration
   * @param element - Child element to wrap with popover
   * @returns React element with popover wrapper
   */
  createPopover(element: React.ReactElement): React.ReactElement;
  
  /**
   * Mouse over event handler
   * Sets hover state to true
   */
  onMouseover(): void;
  
  /**
   * Mouse out event handler
   * Sets hover state to false
   */
  onMouseOut(): void;
  
  /**
   * Renders the component
   * @returns Rendered React element
   */
  render(): React.ReactElement;
}