/**
 * Popover component for displaying tooltips, guides, and confirmation dialogs
 * Supports images, videos, text content, links, and action buttons
 */

import React from 'react';

/**
 * Placement position for the popover relative to its target element
 */
export type PopoverPlacement = 'top' | 'right' | 'bottom' | 'left';

/**
 * Props for the Popover component
 */
export interface PopoverProps {
  /**
   * Additional CSS class name for custom styling
   * @default ""
   */
  className?: string;

  /**
   * Placement position of the popover relative to the target
   * @default "top"
   */
  placement?: PopoverPlacement;

  /**
   * Left position in pixels for absolute positioning
   * @default 0
   */
  positionLeft?: number;

  /**
   * Top position in pixels for absolute positioning
   * @default 0
   */
  positionTop?: number;

  /**
   * Whether to show the primary action button
   * @default false
   */
  showBtn?: boolean;

  /**
   * Callback when the primary action button is clicked
   */
  onBtnClick?: () => void;

  /**
   * Text displayed on the primary action button
   * @default ResourceManager.getString("toolBar_tip_I_know")
   */
  btnText?: string;

  /**
   * Text for the optional link
   * @default "视频教程"
   */
  linkText?: string;

  /**
   * URL for the optional link
   */
  linkUrl?: string;

  /**
   * URL of an image to display in the popover
   */
  imageUrl?: string;

  /**
   * URL of a video to display in the popover (autoplays with controls)
   */
  videoUrl?: string;

  /**
   * HTML content to display as text (rendered using dangerouslySetInnerHTML)
   */
  text?: string;

  /**
   * Callback when media (image or video) has finished loading
   */
  onMediaLoaded?: () => void;

  /**
   * Callback when mouse enters the popover area
   */
  onMouseEnter?: (event: React.MouseEvent) => void;

  /**
   * Callback when mouse leaves the popover area
   */
  onMouseLeave?: (event: React.MouseEvent) => void;

  /**
   * Whether to show confirmation dialog buttons (OK/Cancel)
   * @default false
   */
  showConfirm?: boolean;

  /**
   * Text for the cancel button in confirmation mode
   * @default ResourceManager.getString("cancel")
   */
  cancelText?: string;

  /**
   * Text for the OK button in confirmation mode
   * @default ResourceManager.getString("confirm")
   */
  okText?: string;

  /**
   * Callback when the OK button is clicked in confirmation mode
   */
  onOk?: (event: React.MouseEvent) => void;

  /**
   * Callback when the Cancel button is clicked in confirmation mode
   */
  onCancel?: (event: React.MouseEvent) => void;

  /**
   * Internal prop: Reference to a popover instance for nested props access
   */
  popover?: {
    props: PopoverProps;
  };
}

/**
 * Internal state for the Popover component
 */
export interface PopoverState {
  /**
   * Current left position in pixels
   */
  left: number;

  /**
   * Current top position in pixels
   */
  top: number;
}

/**
 * Heavy-styled popover component with support for rich media content,
 * action buttons, links, and confirmation dialogs.
 * 
 * Features:
 * - Image/video media display
 * - HTML text content
 * - External links with icons
 * - Primary action button
 * - Confirmation dialog mode
 * - Customizable placement (top/right/bottom/left)
 * - Mouse event handling
 */
export default class Popover extends React.Component<PopoverProps, PopoverState> {
  static propTypes: unknown;
  static defaultProps: Partial<PopoverProps>;

  constructor(props: PopoverProps);

  /**
   * Renders the popover with all configured content and controls
   */
  render(): React.ReactElement;
}