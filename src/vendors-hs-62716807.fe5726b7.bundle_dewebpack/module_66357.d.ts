/**
 * Dropdown Button Component
 * A button group with a primary action button and a dropdown menu trigger button.
 */

import React from 'react';
import { ButtonProps } from '../button';
import { DropdownProps } from '../dropdown';

/**
 * Render function for customizing the two buttons in the dropdown button group
 * @param buttons - Array containing [mainButton, dropdownButton] elements
 * @returns Customized button elements
 */
export type ButtonsRenderFunction = (buttons: [React.ReactElement, React.ReactElement]) => React.ReactNode[];

/**
 * Props for the DropdownButton component
 */
export interface DropdownButtonProps extends Omit<ButtonProps, 'overlay'> {
  /**
   * Custom CSS class prefix
   */
  prefixCls?: string;

  /**
   * Button type
   * @default 'default'
   */
  type?: 'default' | 'primary' | 'ghost' | 'dashed' | 'link' | 'text';

  /**
   * Whether the button is disabled
   */
  disabled?: boolean;

  /**
   * Click event handler for the main button
   */
  onClick?: React.MouseEventHandler<HTMLElement>;

  /**
   * HTML button type attribute
   */
  htmlType?: 'button' | 'submit' | 'reset';

  /**
   * Button content
   */
  children?: React.ReactNode;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * Dropdown menu content
   */
  overlay: React.ReactElement | (() => React.ReactElement);

  /**
   * Trigger mode for dropdown
   * @default ['hover']
   */
  trigger?: Array<'click' | 'hover' | 'contextMenu'>;

  /**
   * Alignment configuration for dropdown popup
   */
  align?: object;

  /**
   * Whether the dropdown is visible (controlled mode)
   */
  visible?: boolean;

  /**
   * Callback when dropdown visibility changes
   */
  onVisibleChange?: (visible: boolean) => void;

  /**
   * Placement of the dropdown menu
   * @default 'bottomRight' (LTR) or 'bottomLeft' (RTL)
   */
  placement?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';

  /**
   * Parent container for the dropdown popup
   */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;

  /**
   * Hyperlink URL for the main button
   */
  href?: string;

  /**
   * Icon for the dropdown trigger button
   * @default <DownOutlined />
   */
  icon?: React.ReactNode;

  /**
   * Title attribute for the main button
   */
  title?: string;

  /**
   * Custom render function for the button group
   * @default (buttons) => buttons
   */
  buttonsRender?: ButtonsRenderFunction;
}

/**
 * Dropdown Button component
 * Combines a button and a dropdown menu for split button functionality
 */
declare const DropdownButton: React.FC<DropdownButtonProps> & {
  __ANT_BUTTON: boolean;
  defaultProps: {
    type: 'default';
    buttonsRender: (buttons: [React.ReactElement, React.ReactElement]) => [React.ReactElement, React.ReactElement];
  };
};

export default DropdownButton;