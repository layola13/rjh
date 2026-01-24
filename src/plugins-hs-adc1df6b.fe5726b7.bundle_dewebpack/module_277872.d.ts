/**
 * Module: module_277872
 * Original ID: 277872
 */

import React from 'react';
import { TabsSelect, Tooltip, SmartText } from './ui-components';

/**
 * Tab configuration item
 */
export interface TabItem {
  /** Tab label text */
  label: string;
  /** Tab value */
  value: string | number;
  /** Tooltip content */
  tooltip?: string;
  /** Image URL for tooltip */
  imgUrl?: string;
  /** Custom CSS class name */
  className?: string;
}

/**
 * TabsSelect component props
 */
export interface TabsSelectProps {
  /** Change event handler - receives index, tab item, and value */
  onChange?: (index: number, tab: TabItem, value: string | number) => void;
  /** Custom CSS class name */
  className?: string;
  /** Default selected value */
  defaultValue?: string | number;
  /** Default selected index */
  defaultIndex?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Array of tab items */
  tabs?: TabItem[];
  /** Additional props */
  [key: string]: any;
}

/**
 * Component data wrapper
 */
export interface ComponentData {
  /** Component ID */
  id?: string;
  /** Component data */
  data: TabsSelectProps;
}

/**
 * Property bar tabs select component
 * Renders a tabbed selection interface with optional disabled state and tooltips
 * 
 * @param props - Component properties
 * @returns React element
 */
declare function PropertyBarTabsSelect(props: ComponentData): React.ReactElement;

export default PropertyBarTabsSelect;