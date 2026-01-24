/**
 * Module: Popup
 * Original ID: 259142
 * Exports: Popup component for displaying guided tour steps with media content
 */

import React from 'react';
import { Button, IconfontView } from './components';

/**
 * Supported media types for popup content
 */
type MediaType = 'image' | 'video';

/**
 * Props for the Popup component
 */
export interface PopupProps {
  /** Type of media to display (image or video) */
  mediaType: MediaType;
  
  /** Source URL for the media content */
  src: string;
  
  /** Current step number (0-indexed) */
  stepNumber: number;
  
  /** Total number of steps in the guide */
  stepTotal: number;
  
  /** URL for the "Learn More" link */
  moreUrl: string;
  
  /** Title text for the current step */
  title: string;
  
  /** Description text for the current step */
  desc: string;
  
  /** Callback when "Next" button is clicked */
  onNext: () => void;
  
  /** Callback when "Skip All" button is clicked */
  onSkipAll: () => void;
  
  /** Callback when "Finish" button is clicked on the last step */
  onFinish: () => void;
  
  /** Optional callback when "Learn More" is clicked */
  onLearnMore?: () => void;
}

/**
 * Props for media renderer components
 */
interface MediaRendererProps {
  /** Source URL for the media */
  src: string;
  
  /** CSS class name for styling */
  className: string;
  
  /** Unique key for React rendering */
  key?: number;
}

/**
 * Map of media type to renderer component
 */
type MediaRendererMap = {
  [K in MediaType]: (props: MediaRendererProps) => React.ReactElement;
};

/**
 * Popup component for displaying guided tour steps with interactive media
 * 
 * @param props - Component properties
 * @returns React element representing the popup overlay
 */
export declare function Popup(props: PopupProps): React.ReactElement;

/**
 * Button component with various styles
 */
export interface Button {
  className?: string;
  type?: 'text' | 'primary';
  onClick?: () => void;
  children?: React.ReactNode;
}

/**
 * Icon font view component for displaying icons
 */
export interface IconfontView {
  showType: string;
  customStyle?: React.CSSProperties;
  bgExtendSize?: number;
}

/**
 * Global HSApp configuration
 */
declare global {
  interface HSAppConfig {
    TENANT: string;
  }
  
  interface HSApp {
    Config: HSAppConfig;
  }
  
  const HSApp: HSApp;
  
  /**
   * Resource manager for i18n strings
   */
  interface ResourceManager {
    getString(key: string): string;
  }
  
  const ResourceManager: ResourceManager;
}

export {};