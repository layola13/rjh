import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

/**
 * Position coordinates for popover placement
 */
interface PopoverPosition {
  top: number;
  left: number;
}

/**
 * Element position information including dimensions
 */
interface ElementPosition extends PopoverPosition {
  height: number;
  width: number;
}

/**
 * Offset configuration for popover positioning
 */
interface PopoverOffset {
  x: number;
  y: number;
}

/**
 * Popover placement options
 */
type PopoverPlacement = 
  | 'top' | 'bottom' | 'left' | 'right'
  | 'topL' | 'topR' | 'bottomL' | 'bottomR'
  | 'leftT' | 'leftB' | 'rightT' | 'rightB';

/**
 * Trigger type for popover display
 */
type TriggerType = 'click' | 'hover' | 'manual' | 'new' | 'focus';

/**
 * Popover component props
 */
interface PopoverComponentProps {
  placement: PopoverPlacement;
  onMediaLoaded?: () => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  ref?: (node: PopoverComponent | null) => void;
}

/**
 * Popover component interface
 */
interface PopoverComponent {
  props: PopoverComponentProps;
  setPosition(left: number, top: number): void;
}

/**
 * Props for PopoverWrapper component
 */
interface PopoverWrapperProps {
  /** Trigger mechanism for showing/hiding popover */
  trigger?: TriggerType;
  /** Base delay for both open and close (milliseconds) */
  delay?: number;
  /** Specific delay before opening popover (milliseconds) */
  delayOpen?: number | null;
  /** Specific delay before closing popover (milliseconds) */
  delayClose?: number | null;
  /** The popover element to display */
  popover: React.ReactElement<PopoverComponentProps>;
  /** Callback when popover opens */
  onOpen?: () => void;
  /** Callback when popover closes */
  onClose?: () => void;
  /** Click handler for the trigger element */
  onClick?: (event: React.MouseEvent) => void;
  /** Mouse over handler for the trigger element */
  onMouseOver?: (event: React.MouseEvent) => void;
  /** Mouse out handler for the trigger element */
  onMouseOut?: (event: React.MouseEvent) => void;
  /** Focus handler for the trigger element */
  onFocus?: (event: React.FocusEvent) => void;
  /** Blur handler for the trigger element */
  onBlur?: (event: React.FocusEvent) => void;
  /** Position offset for popover */
  offset?: PopoverOffset;
  /** Keep popover open on hover */
  keepOpen?: boolean;
  /** Use parent element for position calculation */
  isParentLocation?: boolean;
  /** Single child element that triggers the popover */
  children: React.ReactElement;
}

/**
 * State for PopoverWrapper component
 */
interface PopoverWrapperState {
  isPopoverActive: boolean;
}

/**
 * A wrapper component that manages popover positioning and interaction.
 * Supports multiple trigger types (click, hover, focus) with configurable delays.
 */
export default class PopoverWrapper extends React.Component<PopoverWrapperProps, PopoverWrapperState> {
  static propTypes: {
    trigger: PropTypes.Requireable<string>;
    delay: PropTypes.Requireable<number>;
    delayOpen: PropTypes.Requireable<number>;
    delayClose: PropTypes.Requireable<number>;
    popover: PropTypes.Validator<PropTypes.ReactNodeLike>;
    onOpen: PropTypes.Requireable<(...args: any[]) => any>;
    onClose: PropTypes.Requireable<(...args: any[]) => any>;
    offset: PropTypes.Requireable<object>;
    keepOpen: PropTypes.Requireable<boolean>;
    isParentLocation: PropTypes.Requireable<boolean>;
  };

  static defaultProps: {
    trigger: 'click';
    delay: 200;
    offset: { x: 0; y: 0 };
    delayOpen: null;
    delayClose: null;
    keepOpen: false;
    isParentLocation: false;
  };

  state: PopoverWrapperState;
  
  /** Tracks if component is mounted */
  isMounted: boolean;
  
  /** Root DOM element for popover portal */
  private _popoverRoot: HTMLDivElement | null;
  
  /** Reference to popover component instance */
  private _popoverNode: PopoverComponent | null;
  
  /** Timeout ID for delayed open/close */
  private _hoverDelay: number | null;
  
  /** Tracks open state */
  private _isOpened: boolean;

  constructor(props: PopoverWrapperProps);

  componentDidMount(): void;
  componentWillUnmount(): void;

  /**
   * Get position and dimensions of trigger element
   */
  getPosition(): ElementPosition;

  /**
   * Check if popover is currently opened
   */
  isOpened(): boolean;

  /**
   * Open the popover
   */
  open(): void;

  /**
   * Close the popover
   * @param force - Force close even if keepOpen is true
   */
  close(force?: boolean): void;

  /**
   * Toggle popover open/close state
   */
  toggle(): void;

  /**
   * Handle mouse over on trigger element
   */
  handleMouseOver(): void;

  /**
   * Handle mouse out on trigger element
   */
  handleMouseOut(): void;

  /**
   * Handle click on trigger element
   */
  handleClick(): void;

  /**
   * Open popover with configured delay
   */
  handleDelayedOpen(): void;

  /**
   * Close popover with configured delay
   */
  handleDelayedClose(): void;

  /**
   * Update popover position in DOM
   */
  updatePopoverPosition(): void;

  /**
   * Calculate popover position based on placement and offset
   */
  calcPopoverPosition(): PopoverPosition;

  /**
   * Handle media loaded event from popover
   */
  handleMediaLoaded(): void;

  /**
   * Handle mouse over on popover itself
   */
  handlePopoverMouseOver(): void;

  /**
   * Handle mouse out on popover itself
   */
  handlePopoverMouseOut(): void;

  /**
   * Render popover into portal
   */
  renderPopover(): void;

  render(): React.ReactElement;
}