/**
 * Image cropper component for selecting and cropping regions from an image
 * @module ImageCropper
 */

import { CSSProperties, RefObject } from 'react';
import Cropper from 'cropperjs';

/**
 * Supported output image formats
 */
export type ImageOutputType = 'png' | 'jpeg' | 'webp';

/**
 * MIME type mapping for image formats
 */
export type ImageMimeType = 'image/png' | 'image/jpeg' | 'image/webp';

/**
 * Crop region data
 */
export interface CropData {
  /** X coordinate of the crop region */
  x: number;
  /** Y coordinate of the crop region */
  y: number;
  /** Width of the crop region */
  width: number;
  /** Height of the crop region */
  height: number;
}

/**
 * Result returned when cropping is complete
 */
export interface CropResult {
  /** Base64 encoded image data */
  base64Data: string;
  /** Blob object of the cropped image */
  blob: Blob | null;
  /** Crop region coordinates and dimensions */
  cropData: CropData;
  /** MIME type of the output image */
  mimeType: ImageMimeType;
}

/**
 * Props for the ImageCropper component
 */
export interface ImageCropperProps {
  /** Source URL or data URI of the image to crop */
  imageSrc: string;
  
  /** CSS class name of the parent container for positioning */
  parentContainerClass?: string;
  
  /** Callback invoked when cropping is complete */
  onCropComplete?: (result: CropResult) => void;
  
  /** Callback invoked when the cropper is closed */
  onClose?: () => void;
  
  /** Output image quality (0-1), defaults to 0.95 */
  quality?: number;
  
  /** Output image format, defaults to 'png' */
  outputType?: ImageOutputType;
  
  /** Whether the cropper is visible, defaults to false */
  showCropper?: boolean;
  
  /** Whether running in mobile mode, defaults to false */
  isMobile?: boolean;
}

/**
 * Cropper component reference interface
 */
export interface CropperRef {
  /** Cropper.js instance */
  cropper: Cropper | null;
}

/**
 * Positioning style state for the cropper container
 */
export interface CropperPositionStyle extends CSSProperties {
  position: 'fixed' | 'absolute';
  top?: string | number;
  left?: string | number;
  zIndex: number;
  transform?: string;
}

/**
 * Image cropper component for selecting and cropping image regions
 * Supports desktop and mobile layouts with different positioning strategies
 * 
 * @param props - Component props
 * @returns React component for image cropping
 */
declare function ImageCropper(props: ImageCropperProps): JSX.Element;

export default ImageCropper;