import React from 'react';

/**
 * Enum representing different picture mask states
 */
export enum PictureMaskEnum {
  /** No mask displayed */
  None = 'None',
  /** Empty/placeholder mask */
  Empty = 'Empty',
  /** Error state mask */
  Error = 'Error',
  /** Loading state mask */
  Loading = 'Loading'
}

/**
 * Picture information object containing URL and optional metadata
 */
export interface PictureInfo {
  /** URL of the picture */
  url?: string;
  /** Optional width of the picture */
  width?: number;
  /** Optional height of the picture */
  height?: number;
  /** Optional alternative text for accessibility */
  alt?: string;
}

/**
 * Reference to PictureView component with internal methods
 */
export interface PictureViewRef {
  /** Get current picture mask state */
  getPictureMaskEnum_(): PictureMaskEnum;
  /** Change the picture mask state */
  changePictureMask_(mask: PictureMaskEnum): void;
  /** Get current picture information */
  getCurrentPicInfo_(): PictureInfo | undefined;
  /** Update the picture with new information */
  changePicture_(pictureInfo: PictureInfo, animate?: boolean): void;
}

/**
 * Props for AddPictureButton component
 */
export interface AddPictureButtonProps {
  /** Initial picture information to display */
  initialPictureInfo?: PictureInfo;
  
  /** Optional CSS class for picture validation/error state */
  pictureRedLine?: string;
  
  /** Callback fired when the picture area is clicked */
  onPictureClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /** Callback fired when the add picture icon is clicked */
  onIconClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * Internal state for AddPictureButton component
 */
export interface AddPictureButtonState {
  /** Indicates if mouse cursor is currently over the picture area */
  mouseEnterPicture: boolean;
}

/**
 * Component that displays a picture with an add/change picture button overlay.
 * Shows the picture when available, and displays an "add picture" interface when empty.
 * 
 * @remarks
 * This component manages hover states to show/hide the add picture button,
 * and provides methods to programmatically change the picture and mask state.
 * 
 * @example
 *