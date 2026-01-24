/**
 * Icons service module
 * Manages icon configuration and presets for the application
 */

import { Service } from '../service/index';
import { mergeDeep } from '../../util/helpers';
import defaultPresets from './presets/index';

/**
 * Icon font type identifier
 */
type IconFont = string;

/**
 * Icon values configuration object
 * Maps icon names to their corresponding values or configurations
 */
interface IconValues {
  [iconName: string]: unknown;
}

/**
 * Icons service configuration options
 */
interface IconsConfig {
  /**
   * The icon font to use (e.g., 'mdi', 'fa', 'material')
   */
  iconfont: IconFont;
  
  /**
   * Custom icon values to merge with preset defaults
   */
  values: IconValues;
}

/**
 * Application configuration object containing service properties
 */
interface ApplicationConfig {
  /**
   * Icons service configuration
   */
  icons: IconsConfig;
  
  [key: string]: unknown;
}

/**
 * Icons service class
 * Manages icon font selection and icon value configuration
 * 
 * @extends Service
 * 
 * @example
 *