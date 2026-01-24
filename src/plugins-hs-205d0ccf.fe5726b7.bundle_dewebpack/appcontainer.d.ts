/**
 * AppContainer Module
 * Provides the main application container component for the Spark Picture plugin
 */

import { Component, ReactNode, RefObject, ComponentType, ForwardRefExoticComponent, RefAttributes } from 'react';
import { Layout, Modal } from 'antd';

/**
 * Room type information from camera
 */
export interface RoomCameraInfo {
  roomType: string;
  [key: string]: unknown;
}

/**
 * Proportion dimensions
 */
export interface Proportion {
  width: number;
  height: number;
}

/**
 * Room type option
 */
export interface RoomTypeOption {
  code: string;
  name?: string;
  [key: string]: unknown;
}

/**
 * Style option
 */
export interface StyleOption {
  code: string;
  name?: string;
  [key: string]: unknown;
}

/**
 * Resolution ratio option
 */
export interface ResolutionRatioOption {
  code: string;
  privilegeCount: number;
  [key: string]: unknown;
}

/**
 * Proportion option
 */
export interface ProportionOption {
  code: string;
  proportionWidth: number;
  proportionHeight: number;
  [key: string]: unknown;
}

/**
 * Page information containing configuration options
 */
export interface PageInfo {
  roomTypeList?: RoomTypeOption[];
  proportionList?: ProportionOption[];
  resolutionRatioList?: ResolutionRatioOption[];
  styleDisableRoomList?: Record<string, string[]>;
  [key: string]: unknown;
}

/**
 * Customized data from left panel
 */
export interface CustomizedData {
  proportionSelect: ProportionOption | null;
  resolutionRatioSelect: ResolutionRatioOption;
  imageCountSelect: number;
  imageReferenceStrengthSelect: number;
  stylerSelect: StyleOption;
  roomTypeSelect: RoomTypeOption;
}

/**
 * Left panel component reference methods
 */
export interface LeftPanelRef {
  getCustomizedData(): CustomizedData;
  setSelectedRoomType(roomType: RoomTypeOption): void;
  showWarnModel(resolutionRatio: ResolutionRatioOption): void;
}

/**
 * Frame component reference methods
 */
export interface FrameRef {
  state: {
    style: {
      top: number;
      width: number;
      height: number;
      [key: string]: unknown;
    };
  };
}

/**
 * Right panel component reference methods
 */
export interface RightPanelRef {
  [key: string]: unknown;
}

/**
 * Render data for display
 */
export interface RenderData {
  renderNumber?: number;
  mockImage?: string;
  [key: string]: unknown;
}

/**
 * Bounding rectangle
 */
export interface Bound {
  top: number;
  left: number;
  width: number;
  height: number;
}

/**
 * Render image parameters
 */
export interface RenderImageParams {
  proportion: string;
  resolutionRatio: string;
  imageCount: number;
  imageReferenceStrength: number;
  styler: string;
  roomType: string;
  originImageUrl: string;
  designId: string;
  roomInfoUrl: string;
}

/**
 * API response structure
 */
export interface ApiResponse<T = unknown> {
  code?: number;
  msg?: string;
  result?: T;
  [key: string]: unknown;
}

/**
 * Room type mapping
 */
export type RoomTypeMapping = Record<string, string[]>;

/**
 * AppContainer component props
 */
export interface AppContainerProps {
  /** Callback to exit the environment */
  quitEnv: () => void;
  [key: string]: unknown;
}

/**
 * AppContainer component state
 */
export interface AppContainerState {
  /** Whether the container is visible */
  visible: boolean;
  /** Whether submission is in progress */
  isSubmit: boolean;
  /** Page configuration information */
  pageInfo?: PageInfo;
  /** Whether to keep current selection */
  keepSelect: boolean;
  /** Render data */
  data: RenderData;
  /** Mapping of room types */
  roomTypeMapping: RoomTypeMapping;
  /** Current proportion settings */
  proportion: Proportion;
  /** Frame bounding box */
  frameBound?: Bound;
}

/**
 * AppContainer component exposed methods
 */
export interface AppContainerHandle {
  /**
   * Update the view visibility
   * @param visible - Whether to show the view
   * @param shouldFetch - Whether to fetch page info (default: true)
   */
  updateView(visible: boolean, shouldFetch?: boolean): void;
  
  /**
   * Update the selected room type based on current camera
   */
  updateSelectedRoomType(): void;
}

/**
 * Main application container component for Spark Picture plugin
 * Manages the layout, state, and interactions for AI image rendering
 */
export declare const AppContainer: ForwardRefExoticComponent<
  AppContainerProps & RefAttributes<AppContainerHandle>
>;

/**
 * Authorization manager interface
 */
export interface AuthorizeManager {
  authorize(data: unknown): void;
}

/**
 * Proportion change event data
 */
export interface ProportionChangeData {
  proportionWidth: number;
  proportionHeight: number;
}