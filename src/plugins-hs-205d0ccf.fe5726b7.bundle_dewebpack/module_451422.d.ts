/**
 * Status bar component that displays various controls and widgets
 * Supports left-aligned, right-aligned, and floating items
 */

import React from 'react';

/**
 * Available status bar item types
 */
export enum StatusBarItemTypeEnum {
  /** Vertical divider */
  Vdivider = 'Vdivider',
  /** Underlay image settings control */
  UnderlayimgSetting = 'UnderlayimgSetting',
  /** Image button control */
  ImageButton = 'ImageButton',
  /** Zoom view control */
  ZoomView = 'ZoomView',
  /** Dropdown menu control */
  DropDown = 'DropDown',
  /** Render preview widget */
  RenderPreviewWidget = 'RenderPreviewWidget',
  /** Size limit widget */
  SizeLimitWidget = 'SizeLimitWidget',
  /** Material dropdown list */
  MaterialDropdownList = 'MaterialDropdownList',
  /** 3D performance monitor widget */
  Performance3dWidget = 'Performance3dWidget'
}

/**
 * Property bar control types (extended types supported by status bar)
 */
export enum PropertyBarControlTypeEnum {
  subdivider = 'subdivider',
  ImageButtonWithPopup = 'ImageButtonWithPopup',
  imageButton = 'imageButton',
  image = 'image',
  linkButton = 'linkButton',
  label = 'label',
  numberinput = 'numberinput',
  areaInput = 'areaInput',
  lengthInput = 'lengthInput',
  space = 'space',
  dropDownListEx = 'dropDownListEx',
  cameraSwitchWidget = 'cameraSwitchWidget',
  button = 'button',
  slider = 'slider',
  sliderscale = 'sliderscale',
  radioButton = 'radioButton',
  checkbox = 'checkbox',
  colorCheckbox = 'colorCheckbox',
  toggleBtn = 'toggleBtn',
  toggleBtnNew = 'toggleBtnNew',
  statusBtn = 'statusBtn',
  ninePatch = 'ninePatch',
  CImageButton = 'CImageButton'
}

/**
 * Position of status bar item
 */
export type StatusBarItemPosition = 'left' | 'right' | 'rightFloat';

/**
 * Base data structure for status bar items
 */
export interface StatusBarItemData {
  /** Width of the item (optional) */
  width?: number;
  [key: string]: unknown;
}

/**
 * Status bar item configuration
 */
export interface StatusBarItem {
  /** Type of the status bar item */
  type: StatusBarItemTypeEnum | PropertyBarControlTypeEnum;
  /** Position where item should be rendered */
  position?: StatusBarItemPosition;
  /** Data/configuration for the item */
  data: StatusBarItemData;
}

/**
 * Props for StatusBar component
 */
export interface StatusBarProps {
  /** Map of status bar items to render */
  itemsMap?: Map<string, StatusBarItem>;
  /** Whether to show left section */
  showLeft?: boolean;
  /** Whether to show right section */
  showRight?: boolean;
  /** Whether to disable left section */
  disableLeft?: boolean;
  /** Whether to disable right section */
  disableRight?: boolean;
}

/**
 * State for StatusBar component
 */
export interface StatusBarState {
  [key: string]: unknown;
}

/**
 * StatusBar component
 * Renders a status bar with configurable left, right, and floating items
 * Integrates with HSApp plugin system and layout manager
 */
export default class StatusBar extends React.Component<StatusBarProps, StatusBarState> {
  static propTypes: {
    itemsMap: unknown;
  };

  static defaultProps: {
    itemsMap: Map<string, StatusBarItem>;
    disableLeft: boolean;
    disableRight: boolean;
  };

  /**
   * Creates a new StatusBar instance
   * @param props - Component properties
   */
  constructor(props: StatusBarProps);

  /**
   * Component state
   */
  state: StatusBarState;

  /**
   * Lifecycle: Called after component updates
   * Shows ViewSwitch plugin if not in SlabEdit environment
   */
  componentDidUpdate(): void;

  /**
   * Renders a single status bar item based on its type
   * @param item - The status bar item to render
   * @returns Array of React elements
   */
  renderItem(item: StatusBarItem): React.ReactElement[];

  /**
   * Lifecycle: Called before component is unmounted
   * Unregisters the StatusBar from the layout manager
   */
  componentWillUnmount(): void;

  /**
   * Renders the complete status bar with left, right, and floating sections
   * @returns The rendered status bar component
   */
  render(): React.ReactElement;
}