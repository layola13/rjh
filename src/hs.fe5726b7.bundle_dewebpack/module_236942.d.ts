/**
 * Image button component with optional tooltip, labels, and popover support.
 * Supports hover states, click handlers, and disabled states.
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Popover configuration options
 */
interface PopoverConfig {
  /** Placement of the popover relative to the trigger element */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Event that triggers the popover */
  trigger?: 'click' | 'hover' | 'focus';
  /** General delay for popover appearance */
  delay?: number;
  /** Delay before opening the popover (ms) */
  delayOpen?: number;
  /** Delay before closing the popover (ms) */
  delayClose?: number;
  /** URL of image to display in popover */
  imageUrl?: string;
  /** URL of video to display in popover */
  videoUrl?: string;
  /** Text content for the popover */
  text?: string;
  /** Whether to show a button in the popover */
  showBtn?: boolean;
  /** Click handler for the popover button */
  onBtnClick?: () => void;
  /** Text for the popover button */
  btnText?: string;
  /** Text for the popover link */
  linkText?: string;
  /** URL for the popover link */
  linkUrl?: string;
}

/**
 * Props for the ImageButton component
 */
interface ImageButtonData {
  /** Tooltip text to display above the icon */
  tooltip?: string;
  /** Label to display at the bottom of the icon */
  bottomlabel?: string;
  /** Label to display to the right of the icon */
  rightlabel?: string;
  /** Popover configuration object */
  popover?: PopoverConfig;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Additional CSS class name */
  className?: string;
  /** Title attribute for the container */
  title?: string;
  /** Icon component or icon name */
  icon: string | React.ReactNode;
  /** Click handler */
  onclick?: () => void;
  /** Mouse over handler */
  onmouseover?: () => void;
  /** Mouse out handler */
  onmouseout?: () => void;
}

interface ImageButtonProps {
  /** Configuration data for the image button */
  data: ImageButtonData;
}

/**
 * Image button component that displays an icon with optional tooltip,
 * labels, and popover functionality.
 */
export default class ImageButton extends React.Component<ImageButtonProps> {
  static propTypes: {
    data: PropTypes.Validator<object>;
  };

  /**
   * Renders the image button with all configured features
   */
  render(): React.ReactNode;
}

/**
 * PropTypes validation
 */
export const propTypes: {
  data: PropTypes.Validator<object>;
};