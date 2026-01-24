/**
 * Drawer component type definitions
 * A drawer panel that slides in from the edge of the screen
 */

/**
 * Touch position coordinates
 */
interface TouchPosition {
  x: number;
  y: number;
}

/**
 * Horizontal orientation and placement transform info
 */
interface HorizontalBoolAndPlacement {
  /** Whether the drawer slides horizontally (left/right) */
  isHorizontal: boolean;
  /** CSS transform function name: 'translateX' or 'translateY' */
  placementName: 'translateX' | 'translateY';
}

/**
 * Level move transformation arguments
 */
interface LevelMoveContext {
  /** The DOM element being transformed */
  target: HTMLElement;
  /** Whether the drawer is opening */
  open: boolean;
}

/**
 * Level move callback function type
 */
type LevelMoveFunction = (context: LevelMoveContext) => [number | string, number | string];

/**
 * Drawer placement position
 */
type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

/**
 * Level selector - DOM elements to shift when drawer opens
 */
type LevelSelector = 'all' | string | string[];

/**
 * Scroll locker interface for managing body scroll
 */
interface ScrollLocker {
  /** Lock scrolling */
  lock(): void;
  /** Unlock scrolling */
  unLock(): void;
}

/**
 * Drawer component props
 */
export interface DrawerProps {
  /** Additional CSS class name */
  className?: string;
  
  /** Drawer content */
  children?: React.ReactNode;
  
  /** Inline styles for drawer wrapper */
  style?: React.CSSProperties;
  
  /** Drawer width (for left/right placement) */
  width?: number | string;
  
  /** Drawer height (for top/bottom placement) */
  height?: number | string;
  
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  
  /** Controlled open state */
  open?: boolean;
  
  /** CSS class prefix */
  prefixCls?: string;
  
  /** Drawer slide-in position */
  placement?: DrawerPlacement;
  
  /** Elements to shift when drawer opens */
  level?: LevelSelector;
  
  /** Custom movement offset for level elements */
  levelMove?: number | string | LevelMoveFunction;
  
  /** CSS transition easing function */
  ease?: string;
  
  /** Transition duration (e.g., '0.3s') */
  duration?: string;
  
  /** Function returning the container element for the drawer */
  getContainer?: () => HTMLElement | null;
  
  /** Custom handle element for opening drawer */
  handler?: React.ReactElement;
  
  /** Callback when open state changes */
  onChange?: (open: boolean) => void;
  
  /** Callback after open/close transition completes */
  afterVisibleChange?: (visible: boolean) => void;
  
  /** Whether to show backdrop mask */
  showMask?: boolean;
  
  /** Whether clicking mask closes drawer */
  maskClosable?: boolean;
  
  /** Inline styles for mask */
  maskStyle?: React.CSSProperties;
  
  /** Callback when drawer close is requested */
  onClose?: (event: React.KeyboardEvent | React.MouseEvent) => void;
  
  /** Callback when handle is clicked */
  onHandleClick?: (event: React.MouseEvent) => void;
  
  /** Whether ESC key closes drawer */
  keyboard?: boolean;
  
  /** Function returning count of open drawers */
  getOpenCount?: () => number;
  
  /** Scroll locking utility instance */
  scrollLocker?: ScrollLocker;
  
  /** Whether to apply scrolling effects on body */
  switchScrollingEffect?: boolean;
}

/**
 * Drawer component state
 */
interface DrawerState {
  /** Previous props for comparison in getDerivedStateFromProps */
  prevProps?: DrawerProps;
  
  /** Reference to component instance */
  _self: Drawer;
}

/**
 * Drawer component class
 * 
 * A slide-out panel component that can appear from any edge of the screen.
 * Supports:
 * - Four placement directions (left, right, top, bottom)
 * - Optional backdrop mask
 * - Pushing/shifting page content when opening
 * - Touch gesture support with scroll locking
 * - Keyboard (ESC) dismissal
 * - Customizable animations
 */
export default class Drawer extends React.Component<DrawerProps, DrawerState> {
  /**
   * Derives state from props during updates
   * Detects changes to placement and level props to trigger DOM updates
   */
  static getDerivedStateFromProps(
    nextProps: DrawerProps,
    prevState: DrawerState
  ): Partial<DrawerState> | null;

  /** Root DOM element reference */
  dom: HTMLElement | null;
  
  /** Mask backdrop DOM element */
  maskDom: HTMLElement | null;
  
  /** Custom handler DOM element */
  handlerDom: HTMLElement | null;
  
  /** Content wrapper DOM element (animated container) */
  contentWrapper: HTMLElement | null;
  
  /** Content DOM element (scrollable area) */
  contentDom: HTMLElement | null;
  
  /** Array of page elements to shift when drawer opens */
  levelDom: HTMLElement[];
  
  /** Initial touch position for gesture handling */
  startPos: TouchPosition;
  
  /** Unique identifier for this drawer instance */
  drawerId: string;
  
  /** Timeout handle for transition delays */
  timeout: number | NodeJS.Timeout | null;
  
  /** Passive event listener options (for performance) */
  passive: { passive: boolean } | boolean;

  /**
   * Focus the drawer container (for keyboard accessibility)
   */
  domFocus(): void;

  /**
   * Touch start handler - records initial touch position
   */
  removeStartHandler(event: TouchEvent): void;

  /**
   * Touch move handler - prevents scroll on mask/handler/content
   */
  removeMoveHandler(event: TouchEvent): void;

  /**
   * Cleans up transition styles after animation completes
   */
  transitionEnd(event: TransitionEvent): void;

  /**
   * Handles ESC key to close drawer
   */
  onKeyDown(event: React.KeyboardEvent): void;

  /**
   * Handles drawer wrapper transition end
   * Calls afterVisibleChange callback and cleans up body styles
   */
  onWrapperTransitionEnd(event: TransitionEvent): void;

  /**
   * Initiates level element transitions when drawer opens/closes
   */
  openLevelTransition(): void;

  /**
   * Applies transform to level elements during open/close
   */
  setLevelTransform(
    open: boolean,
    placementName: string,
    drawerWidth: number,
    scrollbarWidth?: number
  ): void;

  /**
   * Sets level transforms and manages body scrolling
   */
  setLevelAndScrolling(
    open: boolean,
    placementName: string,
    drawerWidth: number
  ): void;

  /**
   * Toggles touch event listeners and body scroll lock
   */
  toggleScrollingToDrawerAndBody(scrollbarWidth: number): void;

  /**
   * Applies styles to compensate for scrollbar width when locking scroll
   */
  addScrollingEffect(scrollbarWidth: number): void;

  /**
   * Removes scrollbar compensation styles when unlocking scroll
   */
  remScrollingEffect(scrollbarWidth: number): void;

  /**
   * Checks if no other drawer instances are currently open
   */
  getCurrentDrawerSome(): boolean;

  /**
   * Populates levelDom array based on level prop
   */
  getLevelDom(props: DrawerProps): void;

  /**
   * Determines if drawer slides horizontally and the transform function name
   */
  getHorizontalBoolAndPlacementName(): HorizontalBoolAndPlacement;

  /**
   * Renders the drawer component
   */
  render(): React.ReactElement;
}