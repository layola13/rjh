import type { VNode, PropType, CreateElement } from 'vue';
import type VSheet from '../VSheet/VSheet';
import type VImg from '../VImg/VImg';

/**
 * VToolbar Component Type Definitions
 * A versatile toolbar component that extends VSheet with advanced layout capabilities
 */

/**
 * Extension height type - can be a number or numeric string
 */
type ExtensionHeight = number | string;

/**
 * Source type for background image - accepts URL string or image configuration object
 */
type ImageSource = string | Record<string, any>;

/**
 * Tag name type for the root element
 */
type HtmlTag = string;

/**
 * Component data structure
 */
interface VToolbarData {
  /** Tracks whether the toolbar is currently in extended state */
  isExtended: boolean;
}

/**
 * Computed property return types
 */
interface VToolbarComputed {
  /** Total height including extension if present */
  computedHeight: number;
  
  /** Height of the main content area */
  computedContentHeight: number;
  
  /** CSS classes applied to the toolbar */
  classes: Record<string, boolean>;
  
  /** Whether the toolbar is in collapsed state */
  isCollapsed: boolean;
  
  /** Whether the toolbar is in prominent (tall) mode */
  isProminent: boolean;
  
  /** Inline styles for the toolbar */
  styles: Record<string, string>;
}

/**
 * Scoped slot props for image slot
 */
interface ImageSlotProps {
  props: {
    /** Computed height of the toolbar */
    height: string | number;
    /** Image source URL or object */
    src: ImageSource;
  };
}

/**
 * VToolbar component props
 */
export interface VToolbarProps {
  /** Positions toolbar absolutely */
  absolute?: boolean;
  
  /** Positions toolbar at the bottom */
  bottom?: boolean;
  
  /** Enables collapse behavior */
  collapse?: boolean;
  
  /** Reduces toolbar height for compact layouts */
  dense?: boolean;
  
  /** Extends toolbar with additional content area below */
  extended?: boolean;
  
  /** 
   * Height of the extension area in pixels
   * @default 48
   */
  extensionHeight?: ExtensionHeight;
  
  /** Removes box shadow */
  flat?: boolean;
  
  /** Applies floating style */
  floating?: boolean;
  
  /** Increases toolbar height for emphasis */
  prominent?: boolean;
  
  /** Reduces height on small screens */
  short?: boolean;
  
  /** 
   * Background image source
   * @default ""
   */
  src?: ImageSource;
  
  /** 
   * HTML tag for the root element
   * @default "header"
   */
  tag?: HtmlTag;
  
  /** Custom height override (inherited from VSheet) */
  height?: number | string;
  
  /** Background color (inherited from VSheet) */
  color?: string;
}

/**
 * VToolbar component slots
 */
export interface VToolbarSlots {
  /** Default slot for toolbar content */
  default?: VNode[];
  
  /** Slot for extension content area */
  extension?: VNode[];
  
  /** 
   * Scoped slot for custom background image rendering
   * @param props - Image configuration props
   */
  img?: (props: ImageSlotProps) => VNode | VNode[];
}

/**
 * VToolbar component methods
 */
interface VToolbarMethods {
  /**
   * Generates the background image element
   * @returns VNode containing the background image
   */
  genBackground(): VNode;
  
  /**
   * Generates the main content area
   * @returns VNode containing the toolbar content
   */
  genContent(): VNode;
  
  /**
   * Generates the extension area
   * @returns VNode containing the extension content
   */
  genExtension(): VNode;
  
  /**
   * Render function for the component
   * @param h - Vue's createElement function
   * @returns Root VNode
   */
  render(h: CreateElement): VNode;
  
  /**
   * Sets background color with additional attributes (inherited from VSheet)
   * @param color - Color value
   * @param data - Additional VNode data
   */
  setBackgroundColor(color: string | undefined, data: Record<string, any>): Record<string, any>;
}

/**
 * VToolbar Vue component instance type
 * Extends VSheet with toolbar-specific functionality
 */
export type VToolbar = InstanceType<typeof VSheet> & {
  /** Component name identifier */
  readonly name: 'v-toolbar';
  
  /** Component props */
  $props: VToolbarProps;
  
  /** Component data */
  $data: VToolbarData;
  
  /** Computed properties */
  readonly computedHeight: number;
  readonly computedContentHeight: number;
  readonly classes: Record<string, boolean>;
  readonly isCollapsed: boolean;
  readonly isProminent: boolean;
  readonly styles: Record<string, string>;
  
  /** Component methods */
  genBackground(): VNode;
  genContent(): VNode;
  genExtension(): VNode;
};

/**
 * VToolbar component constructor
 */
declare const VToolbarComponent: {
  new (): VToolbar;
  
  /** Component options */
  options: {
    name: 'v-toolbar';
    props: VToolbarProps;
  };
  
  /** Extends VSheet component */
  extend: typeof VSheet.extend;
};

export default VToolbarComponent;