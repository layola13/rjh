import React, { Component, ReactNode, RefObject } from 'react';

/**
 * Autoplay state type
 */
type AutoplayState = 'playing' | 'paused' | 'hovered' | 'focused';

/**
 * Slide change message type
 */
type SlideMessage = 'previous' | 'next' | 'index' | string;

/**
 * Slide change event
 */
interface SlideChangeEvent {
  message: SlideMessage;
  index?: number;
  currentSlide?: number;
}

/**
 * Track style configuration
 */
interface TrackStyle {
  width?: string;
  left?: string;
  [key: string]: unknown;
}

/**
 * InnerSlider component props
 */
export interface InnerSliderProps {
  /** Class name for the slider */
  className?: string;
  
  /** Enable vertical sliding mode */
  vertical?: boolean;
  
  /** Auto-adjust height based on current slide */
  adaptiveHeight?: boolean;
  
  /** Callback fired after initialization */
  onInit?(): void;
  
  /** Callback fired after re-initialization */
  onReInit?(): void;
  
  /** Enable lazy loading of slides */
  lazyLoad?: boolean | 'progressive';
  
  /** Callback fired when slides are lazy loaded */
  onLazyLoad?(slidesLoaded: number[]): void;
  
  /** Callback fired when lazy load fails */
  onLazyLoadError?(): void;
  
  /** Enable autoplay */
  autoplay?: boolean;
  
  /** Autoplay interval in milliseconds */
  autoplaySpeed?: number;
  
  /** Animation speed in milliseconds */
  speed?: number;
  
  /** Callback fired before slide change */
  beforeChange?(currentSlide: number, nextSlide: number): void;
  
  /** Callback fired after slide change */
  afterChange?(currentSlide: number): void;
  
  /** Pause autoplay on hover */
  pauseOnHover?: boolean;
  
  /** Pause autoplay on focus */
  pauseOnFocus?: boolean;
  
  /** Enable swipe gesture */
  swipe?: boolean;
  
  /** Enable dragging */
  draggable?: boolean;
  
  /** Enable vertical swiping */
  verticalSwiping?: boolean;
  
  /** Enable touch move */
  touchMove?: boolean;
  
  /** Show navigation dots */
  dots?: boolean;
  
  /** Dots container class name */
  dotsClass?: string;
  
  /** Pause on dots hover */
  pauseOnDotsHover?: boolean;
  
  /** Custom paging function for dots */
  customPaging?(index: number): ReactNode;
  
  /** Append dots to custom element */
  appendDots?(dots: ReactNode): ReactNode;
  
  /** Show navigation arrows */
  arrows?: boolean;
  
  /** Custom previous arrow component */
  prevArrow?: ReactNode;
  
  /** Custom next arrow component */
  nextArrow?: ReactNode;
  
  /** Number of slides to show */
  slidesToShow?: number;
  
  /** Number of slides to scroll */
  slidesToScroll?: number;
  
  /** Enable infinite loop */
  infinite?: boolean;
  
  /** Enable center mode */
  centerMode?: boolean;
  
  /** Center mode padding */
  centerPadding?: string;
  
  /** Enable focus on select */
  focusOnSelect?: boolean;
  
  /** Enable accessibility features */
  accessibility?: boolean;
  
  /** Right-to-left mode */
  rtl?: boolean;
  
  /** Use CSS transitions */
  useCSS?: boolean;
  
  /** CSS animation easing */
  cssEase?: string;
  
  /** Enable fade effect */
  fade?: boolean;
  
  /** Enable variable width slides */
  variableWidth?: boolean;
  
  /** Disable slick functionality */
  unslick?: boolean;
  
  /** Initial slide index */
  initialSlide?: number;
  
  /** Wait for animation to complete before next action */
  waitForAnimate?: boolean;
  
  /** Sync with another slider (as navigation) */
  asNavFor?: InnerSlider;
  
  /** Custom inline styles */
  style?: React.CSSProperties;
  
  /** Child elements (slides) */
  children?: ReactNode;
}

/**
 * InnerSlider component state
 */
export interface InnerSliderState {
  /** Current active slide index */
  currentSlide: number;
  
  /** Total number of slides */
  slideCount: number;
  
  /** Whether animation is in progress */
  animating: boolean;
  
  /** Current autoplay state */
  autoplaying: AutoplayState;
  
  /** Whether user is dragging */
  dragging: boolean;
  
  /** Whether user is swiping */
  swiping: boolean;
  
  /** List of lazy loaded slide indices */
  lazyLoadedList: number[];
  
  /** Track element styles */
  trackStyle: TrackStyle;
  
  /** Individual slide width (percentage or px) */
  slideWidth?: string;
  
  /** List container height */
  listHeight?: number;
  
  /** Target slide for animation */
  targetSlide?: number;
  
  /** Left position offset */
  left?: number;
  
  /** Slide index for rendering */
  slideIndex?: number;
}

/**
 * InnerSlider - Core carousel/slider component
 * Handles slide navigation, autoplay, lazy loading, and responsive behavior
 */
export declare class InnerSlider extends Component<InnerSliderProps, InnerSliderState> {
  /** Reference to the list DOM element */
  list: HTMLElement | null;
  
  /** Reference to the track DOM element */
  track: HTMLElement | null;
  
  /** Timers for callbacks */
  callbackTimers: NodeJS.Timeout[];
  
  /** Whether slides are clickable */
  clickable: boolean;
  
  /** Debounced resize handler */
  debouncedResize: (() => void) & { cancel(): void } | null;
  
  /** Animation end callback timer */
  animationEndCallback?: NodeJS.Timeout;
  
  /** Lazy load interval timer */
  lazyLoadTimer?: NodeJS.Timeout;
  
  /** Autoplay interval timer */
  autoplayTimer?: NodeJS.Timeout;
  
  /** ResizeObserver instance */
  ro: ResizeObserver;
  
  /** Synchronized slider index (for asNavFor) */
  asNavForIndex?: number;
  
  constructor(props: InnerSliderProps);
  
  /**
   * Ref handler for list element
   */
  listRefHandler(element: HTMLElement | null): void;
  
  /**
   * Ref handler for track element
   */
  trackRefHandler(element: HTMLElement | null): void;
  
  /**
   * Adjust list height to match current slide height
   */
  adaptHeight(): void;
  
  /**
   * Component did mount lifecycle
   */
  componentDidMount(): void;
  
  /**
   * Component will unmount lifecycle - cleanup timers and listeners
   */
  componentWillUnmount(): void;
  
  /**
   * Component did update lifecycle
   */
  componentDidUpdate(prevProps: InnerSliderProps): void;
  
  /**
   * Window resize event handler
   * @param resize - Whether to trigger resize updates
   */
  onWindowResized(resize?: boolean): void;
  
  /**
   * Resize window handler with debouncing
   * @param resize - Whether to trigger resize updates
   */
  resizeWindow(resize?: boolean): void;
  
  /**
   * Update component state with new configuration
   * @param spec - Configuration object
   * @param setTrackStyle - Whether to update track styles
   * @param callback - Callback after state update
   */
  updateState(spec: Record<string, unknown>, setTrackStyle: boolean, callback?: () => void): void;
  
  /**
   * Initialize state for server-side rendering
   */
  ssrInit(): Partial<InnerSliderState>;
  
  /**
   * Check if images in slides are loaded
   */
  checkImagesLoad(): void;
  
  /**
   * Progressive lazy load handler
   */
  progressiveLazyLoad(): void;
  
  /**
   * Handle slide change
   * @param index - Target slide index
   * @param dontAnimate - Skip animation if true
   */
  slideHandler(index: number, dontAnimate?: boolean): void;
  
  /**
   * Change to a specific slide
   * @param options - Slide change event options
   * @param dontAnimate - Skip animation if true
   */
  changeSlide(options: SlideChangeEvent, dontAnimate?: boolean): void;
  
  /**
   * Click event handler
   */
  clickHandler(event: React.MouseEvent): void;
  
  /**
   * Keyboard event handler
   */
  keyHandler(event: React.KeyboardEvent): void;
  
  /**
   * Select slide handler
   */
  selectHandler(options: SlideChangeEvent): void;
  
  /**
   * Disable body scrolling
   */
  disableBodyScroll(): void;
  
  /**
   * Enable body scrolling
   */
  enableBodyScroll(): void;
  
  /**
   * Swipe start event handler
   */
  swipeStart(event: React.TouchEvent | React.MouseEvent): void;
  
  /**
   * Swipe move event handler
   */
  swipeMove(event: React.TouchEvent | React.MouseEvent): void;
  
  /**
   * Swipe end event handler
   */
  swipeEnd(event: React.TouchEvent | React.MouseEvent): void;
  
  /**
   * Touch end event handler
   */
  touchEnd(event: React.TouchEvent): void;
  
  /**
   * Go to previous slide
   */
  slickPrev(): void;
  
  /**
   * Go to next slide
   */
  slickNext(): void;
  
  /**
   * Go to specific slide index
   * @param index - Target slide index
   * @param dontAnimate - Skip animation if true
   */
  slickGoTo(index: number, dontAnimate?: boolean): void;
  
  /**
   * Play next slide (used for autoplay)
   */
  play(): void | false;
  
  /**
   * Start or update autoplay
   * @param playType - Type of autoplay action
   */
  autoPlay(playType: 'update' | 'leave' | 'blur' | 'playing'): void;
  
  /**
   * Pause autoplay
   * @param pauseType - Type of pause action
   */
  pause(pauseType: 'paused' | 'focused' | 'hovered'): void;
  
  /**
   * Mouse over handler for dots
   */
  onDotsOver(): void;
  
  /**
   * Mouse leave handler for dots
   */
  onDotsLeave(): void;
  
  /**
   * Mouse over handler for track
   */
  onTrackOver(): void;
  
  /**
   * Mouse leave handler for track
   */
  onTrackLeave(): void;
  
  /**
   * Focus handler for slide
   */
  onSlideFocus(): void;
  
  /**
   * Blur handler for slide
   */
  onSlideBlur(): void;
  
  /**
   * Check if props have changed
   * @param prevProps - Previous props
   */
  didPropsChange(prevProps: InnerSliderProps): boolean;
  
  /**
   * Render the slider component
   */
  render(): JSX.Element;
}