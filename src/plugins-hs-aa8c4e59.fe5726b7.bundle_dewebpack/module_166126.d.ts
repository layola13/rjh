/**
 * React component for a picture change button with hover effects and mask states.
 * Provides functionality to change pictures and display an edit icon on hover.
 * @module ChangePictureButton
 */

import React from 'react';

/**
 * Enum representing different states of the picture mask overlay
 */
declare enum PictureMaskEnum {
  /** No mask displayed */
  None = 0,
  /** Empty/transparent mask */
  Empty = 1,
  /** Error state mask */
  Error = 2,
}

/**
 * Information about the current picture being displayed
 */
interface PictureInfo {
  /** URL or path to the picture */
  url?: string;
  /** Width of the picture in pixels */
  width?: number;
  /** Height of the picture in pixels */
  height?: number;
  /** Additional metadata for the picture */
  [key: string]: unknown;
}

/**
 * Props for the ChangePictureButton component
 */
interface ChangePictureButtonProps {
  /** Initial picture information to display */
  initialPictureInfo?: PictureInfo;
  /** Callback function triggered when the picture is clicked */
  onPictureClick?: () => void;
}

/**
 * Internal state for the ChangePictureButton component
 */
interface ChangePictureButtonState {
  /** Whether the mouse is currently hovering over the picture */
  mouseEnterPicture: boolean;
}

/**
 * Reference type for the internal PictureView component
 */
interface PictureViewRef {
  /** Get the current picture mask state */
  getPictureMaskEnum_(): PictureMaskEnum;
  /** Change the picture mask to a new state */
  changePictureMask_(mask: PictureMaskEnum): void;
  /** Get information about the currently displayed picture */
  getCurrentPicInfo_(): PictureInfo;
  /** Change the displayed picture */
  changePicture_(pictureInfo: PictureInfo, options?: unknown): void;
}

/**
 * Component refs interface
 */
interface ChangePictureButtonRefs {
  /** Reference to the picture view component */
  picView: PictureViewRef;
  /** Reference to the icon SVG element */
  iconSvg: HTMLElement;
}

/**
 * A button component that displays a picture and shows an edit icon on hover.
 * Manages picture mask states and provides methods to change the picture programmatically.
 * 
 * @example
 *