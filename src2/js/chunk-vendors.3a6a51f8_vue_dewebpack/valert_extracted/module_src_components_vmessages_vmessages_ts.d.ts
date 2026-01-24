/**
 * VMessages Component Type Definitions
 * A component for displaying multiple message items with transition animations
 */

import Vue, { VNode, CreateElement } from 'vue';
import { VueConstructor } from 'vue/types/vue';

/**
 * Slot scope data passed to the default slot
 */
export interface VMessagesSlotScope {
  /** The message content to display */
  message: string;
  /** The index/key of the message in the array */
  key: number;
}

/**
 * Props for the VMessages component
 */
export interface VMessagesProps {
  /** Array of message strings to display */
  value: string[];
  /** Color theme for the messages (from colorable mixin) */
  color?: string;
  /** Whether to use dark theme (from themeable mixin) */
  dark?: boolean;
  /** Whether to use light theme (from themeable mixin) */
  light?: boolean;
}

/**
 * VMessages component interface
 * Displays a list of messages with animated transitions
 */
export interface VMessages extends Vue {
  /** Current array of message values */
  value: string[];
  /** Optional color theme */
  color?: string;
  /** CSS classes for theme styling */
  themeClasses: Record<string, boolean>;

  /**
   * Generates the wrapper container with transition-group for messages
   * @returns VNode containing the transition-group with all messages
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
   * Sets text color on an element (from colorable mixin)
   * @param color - Color value to apply
   * @param data - VNode data object to modify
   * @returns Modified VNode data with color classes/styles
   */
  setTextColor(color: string | undefined, data: Record<string, any>): Record<string, any>;

  /**
   * Render function for the component
   * @param h - Vue's createElement function
   * @returns Root VNode for the component
   */
  render(h: CreateElement): VNode;
}

/**
 * VMessages component constructor
 */
declare const VMessages: VueConstructor<VMessages>;

export default VMessages;