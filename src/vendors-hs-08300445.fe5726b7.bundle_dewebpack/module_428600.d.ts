/**
 * Image preview component for viewing and manipulating images
 * Supports zoom, rotate, drag, and navigation through multiple images
 */

import React from 'react';

/**
 * Position coordinates
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * Icon configuration for preview operations
 */
export interface PreviewIcons {
  /** Icon for rotating image left */
  rotateLeft?: React.ReactNode;
  /** Icon for rotating image right */
  rotateRight?: React.ReactNode;
  /** Icon for zooming in */
  zoomIn?: React.ReactNode;
  /** Icon for zooming out */
  zoomOut?: React.ReactNode;
  /** Icon for closing preview */
  close?: React.ReactNode;
  /** Icon for navigating to previous image */
  left?: React.ReactNode;
  /** Icon for navigating to next image */
  right?: React.ReactNode;
}

/**
 * Mouse drag state tracking
 */
export interface DragState {
  /** Original X position before drag */
  originX: number;
  /** Original Y position before drag */
  originY: number;
  /** Delta X during drag */
  deltaX: number;
  /** Delta Y during drag */
  deltaY: number;
}

/**
 * Wheel event state
 */
export interface WheelState {
  /** Direction of wheel scroll: positive (down), negative (up), or 0 */
  wheelDirection: number;
}

/**
 * Preview group context value
 */
export interface PreviewGroupContext {
  /** Map of preview URLs */
  previewUrls: Map<number, string>;
  /** Current preview index */
  current: number;
  /** Whether this is a preview group */
  isPreviewGroup: boolean;
  /** Function to set current preview index */
  setCurrent: (index: number) => void;
}

/**
 * Image preview component props
 */
export interface ImagePreviewProps {
  /** CSS class prefix for styling */
  prefixCls: string;
  /** Image source URL */
  src?: string;
  /** Image alt text */
  alt?: string;
  /** Callback when preview is closed */
  onClose: () => void;
  /** Callback after preview close animation completes */
  afterClose?: () => void;
  /** Whether preview is visible */
  visible: boolean;
  /** Custom icons for operations */
  icons?: PreviewIcons;
  /** Transition name for preview animation */
  transitionName?: string;
  /** Transition name for mask animation */
  maskTransitionName?: string;
  /** Whether preview is closable */
  closable?: boolean;
  /** Whether keyboard shortcuts are enabled */
  keyboard?: boolean;
  /** Custom wrapper class name */
  wrapClassName?: string;
}

/**
 * Operation configuration
 */
export interface Operation {
  /** Icon element */
  icon?: React.ReactNode;
  /** Click handler */
  onClick: () => void;
  /** Operation type identifier */
  type: 'close' | 'zoomIn' | 'zoomOut' | 'rotateRight' | 'rotateLeft';
  /** Whether operation is disabled */
  disabled?: boolean;
}

/**
 * Image preview component
 * 
 * Features:
 * - Zoom in/out with mouse wheel or buttons
 * - Rotate image left/right
 * - Drag to reposition image
 * - Navigate through image gallery (when in preview group)
 * - Keyboard shortcuts support
 * 
 * @param props - Component props
 * @returns Image preview modal component
 */
declare const ImagePreview: React.FC<ImagePreviewProps>;

export default ImagePreview;

/**
 * React hooks used by the component
 */
export declare const useState: typeof React.useState;
export declare const useEffect: typeof React.useEffect;
export declare const useRef: typeof React.useRef;
export declare const useContext: typeof React.useContext;

/**
 * Default initial position
 */
export declare const INITIAL_POSITION: Readonly<Position>;

/**
 * Minimum zoom scale
 */
export declare const MIN_SCALE: 1;

/**
 * Rotation step in degrees
 */
export declare const ROTATION_STEP: 90;