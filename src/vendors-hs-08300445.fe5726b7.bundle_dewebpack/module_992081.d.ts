/**
 * rc-image - React Image Component with Preview Support
 * 
 * A production-ready image component that provides:
 * - Lazy loading and error fallback
 * - Image preview functionality with zoom/rotate controls
 * - Preview group support for gallery navigation
 * - Placeholder during loading
 * - Configurable prefix for CSS class names
 */

import * as React from 'react';

/**
 * Mouse position coordinates
 */
export interface MousePosition {
  /** X coordinate in pixels */
  x: number;
  /** Y coordinate in pixels */
  y: number;
}

/**
 * Preview configuration icons
 */
export interface PreviewIcons {
  /** Custom rotate left icon */
  rotateLeft?: React.ReactNode;
  /** Custom rotate right icon */
  rotateRight?: React.ReactNode;
  /** Custom zoom in icon */
  zoomIn?: React.ReactNode;
  /** Custom zoom out icon */
  zoomOut?: React.ReactNode;
  /** Custom close icon */
  close?: React.ReactNode;
  /** Custom flip X icon */
  flipX?: React.ReactNode;
  /** Custom flip Y icon */
  flipY?: React.ReactNode;
}

/**
 * Preview configuration object
 */
export interface PreviewConfig {
  /** 
   * Source URL for preview (defaults to main image src if not specified)
   */
  src?: string;
  
  /** 
   * Controlled visibility state of preview modal
   */
  visible?: boolean;
  
  /** 
   * Callback when preview visibility changes
   * @param visible - New visibility state
   * @param prevVisible - Previous visibility state
   */
  onVisibleChange?: (visible: boolean, prevVisible: boolean) => void;
  
  /** 
   * Custom container for preview modal
   * @returns Container element or null for document.body
   */
  getContainer?: () => HTMLElement | null;
  
  /** 
   * Custom mask overlay content
   */
  mask?: React.ReactNode;
  
  /** 
   * Custom preview control icons
   */
  icons?: PreviewIcons;
}

/**
 * Image component props
 * Extends native HTML img attributes
 */
export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'onClick' | 'placeholder'> {
  /** 
   * Image source URL
   */
  src?: string;
  
  /** 
   * Alternative text for accessibility
   */
  alt?: string;
  
  /** 
   * Width of image container (number in pixels or CSS string)
   */
  width?: number | string;
  
  /** 
   * Height of image container (number in pixels or CSS string)
   */
  height?: number | string;
  
  /** 
   * CSS class prefix for customization
   * @default "rc-image"
   */
  prefixCls?: string;
  
  /** 
   * CSS class prefix for preview modal
   * @default "{prefixCls}-preview"
   */
  previewPrefixCls?: string;
  
  /** 
   * Placeholder content shown during loading
   * - `true`: shows default loading placeholder
   * - `ReactNode`: custom placeholder content
   * - `false`: no placeholder
   * @default false
   */
  placeholder?: boolean | React.ReactNode;
  
  /** 
   * Fallback image URL shown on load error
   */
  fallback?: string;
  
  /** 
   * Enable image preview functionality
   * - `false`: disable preview
   * - `true`: enable with default config
   * - `PreviewConfig`: enable with custom config
   * @default true
   */
  preview?: boolean | PreviewConfig;
  
  /** 
   * Custom CSS class name for image element
   */
  className?: string;
  
  /** 
   * Custom CSS class name for wrapper div
   */
  wrapperClassName?: string;
  
  /** 
   * Custom inline styles for wrapper div
   */
  wrapperStyle?: React.CSSProperties;
  
  /** 
   * Click event handler
   * @param event - Mouse event
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  /** 
   * Callback when preview closes (legacy, use preview.onVisibleChange instead)
   * @param event - Mouse event
   * @deprecated Use preview.onVisibleChange instead
   */
  onPreviewClose?: (event: React.MouseEvent<HTMLElement>) => void;
  
  /** 
   * CORS setting for image fetching
   */
  crossOrigin?: 'anonymous' | 'use-credentials' | '';
  
  /** 
   * Decoding hint for browser
   */
  decoding?: 'sync' | 'async' | 'auto';
  
  /** 
   * Loading strategy for image
   */
  loading?: 'eager' | 'lazy';
  
  /** 
   * Referrer policy for image requests
   */
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  
  /** 
   * Responsive image sizes attribute
   */
  sizes?: string;
  
  /** 
   * Source set for responsive images
   */
  srcSet?: string;
  
  /** 
   * Image map name reference
   */
  useMap?: string;
}

/**
 * Preview group context configuration
 */
export interface PreviewGroupProps {
  /** 
   * CSS class prefix for preview
   * @default "rc-image-preview"
   */
  previewPrefixCls?: string;
  
  /** 
   * Custom preview control icons
   */
  icons?: PreviewIcons;
  
  /** 
   * Preview configuration items
   */
  items?: string[];
  
  /** 
   * Fallback image URL for all images in group
   */
  fallback?: string;
  
  /** 
   * Custom container for preview modal
   */
  getContainer?: () => HTMLElement | null;
  
  /** 
   * Current preview image index (controlled)
   */
  current?: number;
  
  /** 
   * Callback when current index changes
   */
  onCurrentChange?: (current: number) => void;
  
  /** 
   * Children images to be grouped
   */
  children?: React.ReactNode;
}

/**
 * Preview Group component for creating image galleries
 * Groups multiple Image components to enable navigation between previews
 */
export interface PreviewGroupType extends React.FC<PreviewGroupProps> {
  displayName?: string;
}

/**
 * Main Image component with preview capabilities
 * 
 * @example
 *