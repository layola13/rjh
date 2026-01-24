/**
 * VMessages Component Type Definitions
 * 
 * A component for displaying multiple messages with transition animations.
 * Supports colorable and themeable mixins for styling.
 */

import Vue, { VNode, VNodeData, CreateElement } from 'vue';

/**
 * Slot scope data passed to the default slot
 */
interface VMessagesSlotScope {
  /** The message content */
  message: string;
  /** The index key of the message */
  key: number;
}

/**
 * Props interface for VMessages component
 */
interface VMessagesProps {
  /**
   * Array of messages to display
   * @default []
   */
  value: string[];
  
  /**
   * Text color from Material Design palette
   * Inherited from colorable mixin
   */
  color?: string;
  
  /**
   * Applies the dark theme variant
   * Inherited from themeable mixin
   */
  dark?: boolean;
  
  /**
   * Applies the light theme variant
   * Inherited from themeable mixin
   */
  light?: boolean;
}

/**
 * Scoped slots for VMessages component
 */
interface VMessagesSlots {
  /**
   * Default slot for customizing message rendering
   * @param scope - Contains message content and key
   */
  default?: (scope: VMessagesSlotScope) => VNode[];
}

/**
 * VMessages Component Instance
 * 
 * Displays a list of messages with smooth transitions.
 * Each message can be customized via the default scoped slot.
 */
declare class VMessages extends Vue {
  /** Array of messages to display */
  value: string[];
  
  /** Text color from Material Design palette */
  color?: string;
  
  /** Applies the dark theme variant */
  dark?: boolean;
  
  /** Applies the light theme variant */
  light?: boolean;
  
  /** Computed theme classes from themeable mixin */
  readonly themeClasses: Record<string, boolean>;
  
  /**
   * Generates the wrapper element with transition group
   * @returns VNode containing all messages wrapped in transition-group
   */
  genChildren(): VNode;
  
  /**
   * Generates a single message element
   * @param message - The message text content
   * @param index - The index of the message in the array
   * @returns VNode for the individual message
   */
  genMessage(message: string, index: number): VNode;
  
  /**
   * Sets the text color on the given VNodeData
   * Inherited from colorable mixin
   * @param color - The color to apply
   * @param data - VNode data object to modify
   * @returns Modified VNodeData with color classes/styles
   */
  setTextColor(color: string | undefined, data: VNodeData): VNodeData;
  
  /**
   * Render function
   * @param h - CreateElement function
   * @returns Root VNode
   */
  render(h: CreateElement): VNode;
  
  /** Scoped slots */
  $scopedSlots: VMessagesSlots;
}

export default VMessages;

/**
 * Component options type for use in Vue.extend()
 */
export type VMessagesComponent = typeof VMessages;