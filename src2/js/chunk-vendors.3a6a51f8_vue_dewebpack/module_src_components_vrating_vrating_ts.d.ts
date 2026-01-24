/**
 * VRating Component Type Definitions
 * A rating component that allows users to provide a rating using icons (stars, hearts, etc.)
 * Supports half increments, hover effects, and customizable icons
 */

import Vue, { VNode, VNodeData } from 'vue';
import { PropType } from 'vue';

/**
 * Props for individual rating item in scoped slot
 */
export interface VRatingItemProps {
  /** Current index of the rating item (0-based) */
  index: number;
  /** Current rating value */
  value: number;
  /** Click handler for this item */
  click: (event: MouseEvent) => void;
  /** Whether this item should be displayed as filled */
  isFilled: boolean;
  /** Whether this item is currently being hovered */
  isHovered: boolean;
  /** Whether half of this item should be displayed as hovered (only with halfIncrements) */
  isHalfHovered?: boolean;
  /** Whether half of this item should be displayed as filled (only with halfIncrements) */
  isHalfFilled?: boolean;
}

/**
 * Icon-related props passed to VIcon component
 */
export interface VRatingIconProps {
  dark: boolean;
  large: boolean;
  light: boolean;
  medium: boolean;
  size: number | string | undefined;
  small: boolean;
  xLarge: boolean;
  xSmall: boolean;
}

/**
 * Ripple directive configuration
 */
export interface RippleDirective {
  name: 'ripple';
  value: {
    circle: boolean;
  };
}

/**
 * Component data structure
 */
export interface VRatingData {
  /** Index of the item currently being hovered (-1 if none) */
  hoverIndex: number;
  /** Internal copy of the rating value */
  internalValue: number;
}

/**
 * VRating Component
 * 
 * A customizable rating component with support for:
 * - Full and half-star increments
 * - Hover preview
 * - Custom icons
 * - Clearable ratings
 * - RTL support
 * - Material Design ripple effects
 */
export default class VRating extends Vue {
  // Props
  
  /** Background color for empty icons (Vuetify color name) */
  backgroundColor: string;
  
  /** Color for filled icons (Vuetify color name) */
  color: string;
  
  /** Whether clicking the same rating value clears it */
  clearable: boolean;
  
  /** Reduces spacing between icons */
  dense: boolean;
  
  /** Icon to display for empty rating items */
  emptyIcon: string;
  
  /** Icon to display for filled rating items */
  fullIcon: string;
  
  /** Icon to display for half-filled rating items */
  halfIcon: string;
  
  /** Enable half-star increments */
  halfIncrements: boolean;
  
  /** Enable hover preview effect */
  hover: boolean;
  
  /** Total number of rating items to display */
  length: number | string;
  
  /** Disable interaction (display only) */
  readonly: boolean;
  
  /** Manual size override for icons */
  size: number | string | undefined;
  
  /** Current rating value (v-model) */
  value: number;
  
  /** Aria-label translation key for individual icons */
  iconLabel: string;
  
  // Inherited props from mixins
  dark: boolean;
  light: boolean;
  small: boolean;
  medium: boolean;
  large: boolean;
  xSmall: boolean;
  xLarge: boolean;
  ripple: boolean | object;

  // Data
  hoverIndex: number;
  internalValue: number;

  // Computed Properties
  
  /**
   * Returns ripple directive configuration if enabled
   * Empty array if readonly or ripple is disabled
   */
  readonly directives: RippleDirective[];
  
  /**
   * Extracts size-related props to pass to VIcon components
   */
  readonly iconProps: VRatingIconProps;
  
  /**
   * Whether user is currently hovering over a rating item
   */
  readonly isHovering: boolean;

  // Methods
  
  /**
   * Creates a click handler for a specific rating item
   * @param index - The 0-based index of the rating item
   * @returns Click event handler
   */
  createClickFn(index: number): (event: MouseEvent) => void;
  
  /**
   * Creates props object for a rating item (used in scoped slot)
   * @param index - The 0-based index of the rating item
   * @returns Props object containing state and handlers
   */
  createProps(index: number): VRatingItemProps;
  
  /**
   * Calculates the rating value based on mouse event and item index
   * Accounts for half-increments and RTL direction
   * @param event - Mouse event
   * @param index - The 0-based index of the rating item
   * @returns Calculated rating value
   */
  genHoverIndex(event: MouseEvent, index: number): number;
  
  /**
   * Determines which icon to display for a rating item
   * @param props - Rating item props
   * @returns Icon name (Material Design Icons or custom)
   */
  getIconName(props: VRatingItemProps): string;
  
  /**
   * Determines the color for a rating item
   * @param props - Rating item props
   * @returns Color name (Vuetify color)
   */
  getColor(props: VRatingItemProps): string;
  
  /**
   * Checks if mouse event occurred on the left half of an icon
   * Used for half-increment calculation
   * @param event - Mouse event
   * @returns True if event is on left half
   */
  isHalfEvent(event: MouseEvent): boolean;
  
  /**
   * Handles mouse enter event with delay
   * @param event - Mouse event
   * @param index - The 0-based index of the rating item
   */
  onMouseEnter(event: MouseEvent, index: number): void;
  
  /**
   * Handles mouse leave event with delay
   */
  onMouseLeave(): void;
  
  /**
   * Generates VNode for a single rating item
   * @param index - The 0-based index of the rating item
   * @returns VNode for the rating item
   */
  genItem(index: number): VNode;
  
  /**
   * Render function
   * @param createElement - Vue's createElement function
   * @returns Root VNode
   */
  render(createElement: typeof Vue.prototype.$createElement): VNode;

  // Events
  
  /**
   * Emitted when rating value changes
   * @event input
   * @param value - New rating value
   */
  $emit(event: 'input', value: number): this;

  // Scoped Slots
  
  /**
   * Scoped slot for custom rating item rendering
   * @slot item
   * @param props - Rating item props and state
   */
  $scopedSlots: {
    item?: (props: VRatingItemProps) => VNode | VNode[];
  };
}

/**
 * Component options for use with Vue.extend() or as mixin
 */
export interface VRatingOptions {
  name: 'v-rating';
  props: {
    backgroundColor: { type: PropType<string>; default: string };
    color: { type: PropType<string>; default: string };
    clearable: PropType<boolean>;
    dense: PropType<boolean>;
    emptyIcon: { type: PropType<string>; default: string };
    fullIcon: { type: PropType<string>; default: string };
    halfIcon: { type: PropType<string>; default: string };
    halfIncrements: PropType<boolean>;
    hover: PropType<boolean>;
    length: { type: PropType<number | string>; default: number };
    readonly: PropType<boolean>;
    size: PropType<number | string>;
    value: { type: PropType<number>; default: number };
    iconLabel: { type: PropType<string>; default: string };
  };
}