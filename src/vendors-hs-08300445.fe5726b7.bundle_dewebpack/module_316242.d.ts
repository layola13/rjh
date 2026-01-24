/**
 * Dropdown trigger component for date picker
 * Provides positioning and visibility control for picker popups
 */

import type { CSSProperties, ReactElement, ReactNode } from 'react';
import type { AlignType } from 'rc-trigger';

/**
 * Alignment point configuration
 */
interface AlignPoint {
  /** Alignment reference points [target, popup] */
  points: [string, string];
  /** Offset [x, y] in pixels */
  offset: [number, number];
  /** Overflow adjustment behavior */
  overflow: {
    /** Adjust horizontally when overflow: 0 = false, 1 = true */
    adjustX: 0 | 1;
    /** Adjust vertically when overflow: 0 = false, 1 = true */
    adjustY: 0 | 1;
  };
}

/**
 * Built-in placement configurations
 */
interface BuiltinPlacements {
  bottomLeft: AlignPoint;
  bottomRight: AlignPoint;
  topLeft: AlignPoint;
  topRight: AlignPoint;
}

/**
 * Direction type for RTL/LTR layout
 */
type Direction = 'ltr' | 'rtl';

/**
 * Popup placement options
 */
type PopupPlacement = 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';

/**
 * Props for the PickerTrigger component
 */
export interface PickerTriggerProps {
  /** CSS class prefix for styling */
  prefixCls: string;
  /** The popup content element to be rendered */
  popupElement: ReactElement;
  /** Custom styles for the popup */
  popupStyle?: CSSProperties;
  /** Controls popup visibility */
  visible: boolean;
  /** Additional CSS class names for dropdown */
  dropdownClassName?: string;
  /** Custom alignment configuration */
  dropdownAlign?: AlignType;
  /** CSS transition name for popup animations */
  transitionName?: string;
  /** Function to determine popup container element */
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  /** Child element that triggers the popup */
  children: ReactNode;
  /** Whether this is a range picker */
  range?: boolean;
  /** Preferred popup placement position */
  popupPlacement?: PopupPlacement;
  /** Text direction for internationalization */
  direction?: Direction;
}

/**
 * Default picker trigger component
 * Wraps rc-trigger to provide consistent dropdown behavior for date pickers
 * 
 * @param props - Component properties
 * @returns Configured Trigger component with picker-specific settings
 */
declare function PickerTrigger(props: PickerTriggerProps): ReactElement;

export default PickerTrigger;