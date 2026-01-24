/**
 * Module: AwakeTypeEnum
 * Original ID: 573714
 * Exports: PageComponent, Magic, ConfigTypeEnum, AwakeTypeEnum
 */

import React from 'react';

/**
 * Modal context for sharing modal state across components
 */
export const modalContext: React.Context<unknown | undefined>;

/**
 * Enum defining different types of awake/modal interactions
 */
export enum AwakeTypeEnum {
  /** Image modal display type */
  ImageModal = 1,
  /** Title modal display type */
  TitleModal = 2,
  /** Card tips display type */
  CardTips = 3,
  /** Balloon tips display type */
  BallonTips = 4,
  /** Teaching modal display type */
  TeachingModal = 5
}

/**
 * Enum defining configuration types
 */
export enum ConfigTypeEnum {
  /** Labels configuration */
  labels = 1,
  /** Functions configuration */
  functions = 2
}

/**
 * Magic string constants for versioning
 */
export enum Magic {
  /** New version identifier */
  new = 'u6tklt3u60yg',
  /** Old version identifier */
  old = '61cd47b78148'
}

/**
 * Page information metadata
 */
export interface PageInfo {
  /** Component name */
  name: string;
  /** Human-readable text description */
  text: string;
}

/**
 * Base page component class
 * Serves as the foundation for all page components in the application
 */
export class PageComponent extends React.Component {
  /**
   * Static metadata describing the page component
   */
  static pageInfo: PageInfo;
  
  /**
   * Drag model configuration (optional)
   */
  static dragModel?: unknown;
}

export { PageComponent as default };