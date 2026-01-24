/**
 * ImageModal Component Type Definitions
 * @module ImageModal
 * @description Type definitions for image modal component with teaching features
 */

import React from 'react';

/**
 * Awakening/Reminder modal type enumeration
 */
export enum AwakeTypeEnum {
  /** Image modal with full content display */
  ImageModal = 'ImageModal',
  /** Title-only modal with compact layout */
  TitleModal = 'TitleModal'
}

/**
 * File type for media content
 */
export type FileType = 'image' | 'video' | 'gif';

/**
 * Theme options for the modal
 */
export type ThemeType = 'teaching-light' | 'teaching-dark' | 'default';

/**
 * Content item structure for modal display
 */
export interface ModalContentItem {
  /** URL of the picture/media resource */
  picUrl: string;
  
  /** Type of the media file */
  fileType: FileType;
  
  /** Introduction/description text for the content */
  introduction: string;
  
  /** Title of the content item */
  title: string;
  
  /** Optional URL to related article */
  articleUrl?: string;
  
  /** Optional URL to marketplace/resource */
  marketUrl?: string;
}

/**
 * Modal dimension configuration
 */
export interface ModalDimensions {
  /** Modal width in pixels */
  width: number;
  
  /** Modal height in pixels */
  height: number;
}

/**
 * Type-specific modal configuration map
 */
export type ModalTypeConfig = {
  [K in AwakeTypeEnum]: ModalDimensions;
};

/**
 * Props for ImageModal component
 */
export interface ImageModalProps {
  /** Modal type determining layout and behavior */
  type: AwakeTypeEnum;
  
  /** Array of content items to display */
  data: ModalContentItem[];
}

/**
 * Context value for remind modal management
 */
export interface RemindModalContextValue {
  /** Function to close the modal */
  close: () => void;
}

/**
 * Props for internal ImageModalItem component
 */
export interface ImageModalItemProps {
  /** Content item to render */
  content: ModalContentItem;
  
  /** Modal type for conditional rendering */
  type: AwakeTypeEnum;
  
  /** Optional callback when mouse enters "Go to Teaching" button */
  onGotoTeachingMouseEnter?: () => void;
  
  /** Optional callback when mouse leaves "Go to Teaching" button */
  onGotoTeachingMouseLeaver?: () => void;
}

/**
 * Props for StarDecoration component
 */
export interface StarDecorationProps {
  /** Number of stars to display, defaults to 3 */
  count?: number;
}

/**
 * Props for PicRender component
 */
export interface PicRenderProps {
  /** Type of file to render */
  fileType: FileType;
  
  /** URL of the picture resource */
  picUrl: string;
}

/**
 * Props for GotoTeaching component
 */
export interface GotoTeachingProps {
  /** Additional CSS class names */
  className?: string;
  
  /** Content containing navigation URLs */
  content: ModalContentItem;
}

/**
 * Props for Slider component
 */
export interface SliderProps {
  /** Theme variant for slider styling */
  theme: 'light' | 'black';
  
  /** Slider container width in pixels */
  width: number;
  
  /** Slider container height in pixels */
  height: number;
  
  /** Enable/disable automatic sliding */
  autoSlider: boolean;
  
  /** Child elements to display in slider */
  children: React.ReactNode;
}

/**
 * Main ImageModal component
 * @description Displays a modal with image content and optional navigation
 * @param props - Component props
 * @returns React element or null if invalid type
 * 
 * @example
 *