/**
 * VResponsive component module
 * 
 * Provides a responsive container component that maintains aspect ratio
 * and adapts to different viewport sizes.
 * 
 * @module VResponsive
 */

import { Component } from 'vue';

/**
 * VResponsive component interface
 * 
 * A container component that provides responsive behavior with aspect ratio support.
 * Typically used as a wrapper for images, videos, or other media elements to ensure
 * they scale properly across different screen sizes while maintaining their proportions.
 */
export interface VResponsiveComponent extends Component {
  /**
   * Component name identifier
   */
  name: string;
}

/**
 * VResponsive component
 * 
 * Main export of the responsive container component.
 * Can be used to wrap content that needs to maintain aspect ratio
 * and respond to viewport changes.
 */
export declare const VResponsive: VResponsiveComponent;

/**
 * Default export of VResponsive component
 * 
 * Allows for default import syntax:
 * import VResponsive from '@/components/VResponsive'
 */
export default VResponsive;