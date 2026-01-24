/**
 * AI Modeler Action Module
 * Handles AI-related actions for modeler, moodboard, and material uploads
 */

import { Action } from './Action';
import { HSCore } from './HSCore';

/**
 * Custom attribute ID enumeration for AI-related features
 */
interface CustomAttributeIdEnum {
  /** AI Modeler attribute ID */
  aiModeler: string | number;
  /** AI Moodboard attribute ID */
  aiMoodboard: string | number;
  /** AI Material attribute ID */
  aiMaterial: string | number;
  /** AI Result attribute ID */
  aiResult: string | number;
}

/**
 * Data configuration for catalog operations
 */
interface DataConfig {
  CustomAttributeIdEnum: CustomAttributeIdEnum;
  MenuIdEnum: {
    myModelLibrary: string | number;
    [key: string]: string | number;
  };
}

/**
 * Parameters for action execution
 */
interface ActionExecuteParams {
  /** Type of action to execute: 'aiModelerUpload' | 'aiMoodboardUpload' | 'aiMaterial' */
  actionType: 'aiModelerUpload' | 'aiMoodboardUpload' | 'aiMaterial';
}

/**
 * Parameters for showing catalog page by category
 */
interface ShowPageByCategoryParams {
  /** Custom attribute identifier */
  custAttr: string | number;
  /** Menu identifier */
  menuId: string | number;
  /** Sub-page identifier */
  subPageId: string | number;
}

/**
 * Catalog manager interface
 */
interface CatalogManager {
  /**
   * Show catalog page by category ID
   * @param params - Parameters including custom attribute, menu ID, and sub-page ID
   */
  showPageByCategoryId(params: ShowPageByCategoryParams): void;
}

/**
 * Catalog signal manager interface
 */
interface CatalogSignalManager {
  /** Signal emitted when catalog rendering ends */
  signalCatalogRenderEnd: symbol | string;
  /**
   * Get singleton instance of catalog signal manager
   */
  getInstance(): CatalogSignalManager;
}

/**
 * URL utility interface
 */
interface UrlUtil {
  /**
   * Replace parameters in URL
   * @param params - Key-value pairs of parameters to replace
   * @returns Updated URL string
   */
  replaceParamsInUrl(params: Record<string, string>): string;
  
  /**
   * Add state to browser history
   * @param key - Parameter key
   * @param value - Parameter value
   * @param url - Target URL
   */
  addWindowHistoryState(key: string, value: string, url: string): void;
}

/**
 * Global HSApp namespace
 */
declare global {
  interface HSApp {
    Catalog: {
      DataConfig: DataConfig;
      Manager: CatalogManager;
      CatalogSignalManager: CatalogSignalManager;
    };
    Util: {
      Url: UrlUtil;
    };
  }

  interface AdskUser {
    /** Whether the user is an enterprise user */
    isEnterprise: boolean;
  }

  const HSApp: HSApp;
  const adskUser: AdskUser;
}

/**
 * AI Modeler Action class
 * Manages AI-related catalog actions including modeler, moodboard, and material uploads
 * 
 * @remarks
 * This action listens to catalog render completion and navigates to appropriate pages
 * based on the action type and user's enterprise status.
 * 
 * @example
 *