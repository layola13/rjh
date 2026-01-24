import type { VNode } from 'vue';
import type { DirectiveOptions } from 'vue/types/options';
import type VToolbar from '../VToolbar/VToolbar';

/**
 * Application bar component that extends VToolbar with additional scrolling and positioning features.
 * Typically used as the main navigation bar at the top of an application.
 */
export default interface VAppBar extends VToolbar {
  /** Component name */
  name: 'v-app-bar';

  /** Registered directives */
  directives: {
    /** Scroll directive for handling scroll events */
    Scroll: DirectiveOptions;
  };

  /** Component props */
  props: {
    /** Designates that the app-bar should shrink the v-navigation-drawer on the left */
    clippedLeft: boolean;
    
    /** Designates that the app-bar should shrink the v-navigation-drawer on the right */
    clippedRight: boolean;
    
    /** Collapses the app bar when scrolling */
    collapseOnScroll: boolean;
    
    /** Elevates the app bar when scrolling */
    elevateOnScroll: boolean;
    
    /** Fades the background image on scroll */
    fadeImgOnScroll: boolean;
    
    /** Hides the app bar when scrolling down */
    hideOnScroll: boolean;
    
    /** Uses inverted scrolling behavior (shows when scrolling down, hides when scrolling up) */
    invertedScroll: boolean;
    
    /** Hides the app bar when scrolling, regardless of direction */
    scrollOffScreen: boolean;
    
    /** Shrinks the app bar content height when scrolling */
    shrinkOnScroll: boolean;
    
    /** Controls the visibility of the app bar */
    value: {
      type: boolean;
      default: true;
    };
  };

  /** Component data */
  data(): {
    /** Current active/visible state of the app bar */
    isActive: boolean;
  };

  /** Computed properties */
  computed: {
    /** 
     * Determines which application property to update (top or bottom).
     * @returns 'bottom' if bottom prop is true, otherwise 'top'
     */
    applicationProperty(): 'top' | 'bottom';

    /**
     * Determines if the component can handle scroll events.
     * @returns true if scrolling functionality is enabled
     */
    canScroll(): boolean;

    /**
     * CSS classes to apply to the app bar.
     * @returns Object with class names as keys and boolean activation as values
     */
    classes(): Record<string, boolean>;

    /**
     * Computed content height based on scroll position and shrink behavior.
     * @returns Height in pixels
     */
    computedContentHeight(): number;

    /**
     * Computed font size for prominent app bars.
     * @returns Font size multiplier or undefined
     */
    computedFontSize(): number | undefined;

    /**
     * Computed left offset for app positioning.
     * @returns Left offset in pixels
     */
    computedLeft(): number;

    /**
     * Computed top margin for app positioning.
     * @returns Top margin in pixels
     */
    computedMarginTop(): number;

    /**
     * Computed opacity for fade-on-scroll effect.
     * @returns Opacity value between 0 and 1, or undefined
     */
    computedOpacity(): number | undefined;

    /**
     * Original height of the app bar before any scroll transformations.
     * @returns Height in pixels
     */
    computedOriginalHeight(): number;

    /**
     * Computed right offset for app positioning.
     * @returns Right offset in pixels
     */
    computedRight(): number;

    /**
     * Scroll threshold at which scroll effects activate.
     * @returns Threshold in pixels
     */
    computedScrollThreshold(): number;

    /**
     * Computed transform value for hiding/showing the app bar.
     * @returns Transform value in pixels
     */
    computedTransform(): number;

    /**
     * Determines if shadow should be hidden.
     * @returns true if shadow should be hidden
     */
    hideShadow(): boolean;

    /**
     * Determines if the app bar is in collapsed state.
     * @returns true if collapsed
     */
    isCollapsed(): boolean;

    /**
     * Determines if the app bar is in prominent mode.
     * @returns true if prominent
     */
    isProminent(): boolean;

    /**
     * Inline styles to apply to the app bar.
     * @returns Style object with CSS properties
     */
    styles(): Record<string, string>;
  };

  /** Watchers */
  watch: {
    /** Triggers scroll handling when canScroll changes */
    canScroll: 'onScroll';
    
    /** 
     * Triggers layout update when transform changes 
     */
    computedTransform(): void;
    
    /**
     * Updates active state when invertedScroll changes.
     * @param isInverted - New inverted scroll value
     */
    invertedScroll(isInverted: boolean): void;
  };

  /**
   * Lifecycle hook called when component is created.
   * Initializes inverted scroll state.
   */
  created(): void;

  /** Component methods */
  methods: {
    /**
     * Generates the background VNode with opacity applied.
     * @returns VNode for the background element
     */
    genBackground(): VNode;

    /**
     * Calculates the height value to update the application layout.
     * @returns Height value in pixels
     */
    updateApplication(): number;

    /**
     * Handles threshold met logic for scroll behavior.
     * Updates active state based on scroll position and direction.
     */
    thresholdMet(): void;
  };

  /**
   * Render function that generates the app bar VNode.
   * @param h - Vue's createElement function
   * @returns VNode representing the app bar
   */
  render(h: typeof import('vue').createElement): VNode;
}