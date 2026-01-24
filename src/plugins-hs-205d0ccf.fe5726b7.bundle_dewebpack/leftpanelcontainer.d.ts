/**
 * LeftPanelContainer Module
 * Provides UI components for AI image generation configuration panel
 * @module LeftPanelContainer
 */

import React from 'react';
import { Modal, Popover, Slider } from 'antd';
import { IconfontView, SmartText } from './components';

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Resolution ratio configuration
 */
export interface ResolutionRatio {
  /** Unique code identifier */
  code: string;
  /** Display label */
  label?: string;
  /** Available privilege count for this resolution */
  privilegeCount?: number;
  /** Width in pixels */
  width?: number;
  /** Height in pixels */
  height?: number;
}

/**
 * Image proportion configuration
 */
export interface Proportion {
  /** Unique code identifier */
  code: string;
  /** Proportion width value */
  proportionWidth: number;
  /** Proportion height value */
  proportionHeight: number;
  /** Available resolution ratios for this proportion */
  resolutionRatioList: ResolutionRatio[];
}

/**
 * Room type configuration
 */
export interface RoomType {
  /** Unique code identifier */
  code: string;
  /** Display name */
  name: string;
}

/**
 * Style configuration
 */
export interface Styler {
  /** Unique code identifier */
  code: string;
  /** Display name */
  name: string;
  /** Preview image URL */
  imageUrl: string;
  /** Optional tag label */
  tagValue?: string;
}

/**
 * Authorization settings for options
 */
export interface OptionAuth {
  /** Authorized resolution ratio codes */
  resolutionRatio?: string[];
  /** Authorized image count values */
  imageCount?: number[];
}

/**
 * Style-room compatibility mapping
 * Maps style codes to disabled room type codes
 */
export type StyleDisableRoomList = Record<string, string[]>;

/**
 * Page configuration data
 */
export interface PageInfo {
  /** Available proportion options */
  proportionList?: Proportion[];
  /** Available image count options */
  imageCountList?: number[];
  /** Available room type options */
  roomTypeList?: RoomType[];
  /** Available style options */
  stylerList?: Styler[];
  /** Default image reference strength (0-100) */
  imageReferenceStrength?: number;
  /** Authorization configuration */
  optionAuth?: OptionAuth;
  /** Style-room compatibility rules */
  styleDisableRoomList?: StyleDisableRoomList;
}

/**
 * Component state
 */
interface LeftPanelState {
  /** Current page configuration */
  pageInfo: PageInfo;
  /** Selected proportion */
  proportionSelect?: Proportion;
  /** Selected resolution ratio */
  resolutionRatioSelect?: ResolutionRatio;
  /** Selected image count */
  imageCountSelect?: number;
  /** Image reference strength value (0-100) */
  imageReferenceStrengthSelect?: number;
  /** Selected room type */
  roomTypeSelect?: RoomType;
  /** Selected style */
  stylerSelect?: Styler;
}

/**
 * Component props
 */
export interface LeftPanelContainerProps {
  /** Page configuration data */
  pageInfo: PageInfo;
  /** Whether to keep previous selections when pageInfo updates */
  keepSelect?: boolean;
  /** Callback when proportion changes */
  proportionOnChange: (proportion: Proportion) => void;
  /** Authorization handler for premium features */
  authorize: (feature: 'count' | 'aigc') => void;
}

/**
 * Customized data returned by the component
 */
export interface CustomizedData {
  proportionSelect?: Proportion;
  resolutionRatioSelect?: ResolutionRatio;
  imageCountSelect?: number;
  imageReferenceStrengthSelect?: number;
  roomTypeSelect?: RoomType;
  stylerSelect?: Styler;
}

/**
 * Exposed component methods via ref
 */
export interface LeftPanelContainerHandle {
  /** Get current selection data */
  getCustomizedData: () => CustomizedData;
  /** Show resolution ratio warning modal */
  showWarnModel: (ratio: ResolutionRatio) => void;
  /** Programmatically set room type */
  setSelectedRoomType: (roomType: RoomType) => void;
}

/**
 * Main LeftPanelContainer component
 * Manages AI image generation configuration UI
 */
export const LeftPanelContainer: React.ForwardRefExoticComponent<
  LeftPanelContainerProps & React.RefAttributes<LeftPanelContainerHandle>
>;

// ============================================================================
// Internal Component Type Definitions
// ============================================================================

/**
 * Resolution and proportion selector props
 */
interface ResolutionSelectorProps {
  proportionList?: Proportion[];
  resolutionRatioAuth?: string[];
  proportionSelect?: Proportion;
  resolutionRatioSelect?: ResolutionRatio;
  proportionOnChange: (proportion: Proportion) => void;
  moreCreditsClick: () => void;
}

/**
 * Image count selector props
 */
interface ImageCountSelectorProps {
  imageCountList?: number[];
  imageCountAuth?: number[];
  imageCountSelect?: number;
  imageCountOnChange: (count: number, requiresAuth: boolean) => void;
}

/**
 * Image reference strength slider props
 */
interface ImageReferenceStrengthProps {
  imageReferenceStrength?: number;
  onChange: (value: number) => void;
}

/**
 * Room type selector props
 */
interface RoomTypeSelectorProps {
  roomTypeList?: RoomType[];
  roomTypeSelect?: RoomType;
  stylerSelect?: Styler;
  onChange: (roomType: RoomType) => void;
  styleDisableRoomList?: StyleDisableRoomList;
}

/**
 * Style selector props
 */
interface StyleSelectorProps {
  stylerList?: Styler[];
  stylerSelect?: Styler;
  roomTypeSelect?: RoomType;
  onChange: (styler: Styler) => void;
  styleDisableRoomList?: StyleDisableRoomList;
}

/**
 * Label item component props
 */
interface LabelItemProps {
  label: string | number;
  customClass?: string;
  itemClick: () => void;
  isShowTip?: boolean;
}

/**
 * Image item component props
 */
interface ImageItemProps {
  label: string;
  imageUrl: string;
  customClass?: string;
  itemClick: () => void;
  tagValue?: string;
}