/**
 * Molding customization panel component for 3D modeling application
 * Provides UI controls for adjusting molding profile dimensions, position, and orientation
 */

import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Molding profile data structure
 */
interface ProfileData {
  /** Unique identifier for the profile */
  seekId: string;
  /** Current width of the profile in meters */
  profileWidth: number;
  /** Current height of the profile in meters */
  profileHeight: number;
  /** Original width of the profile in meters */
  profileSizeX: number;
  /** Original height of the profile in meters */
  profileSizeY: number;
  /** Thumbnail image URL for the profile */
  thumbnail: string;
  /** SVG path data for low-resolution preview */
  profile: string;
  /** SVG path data for high-resolution preview */
  profileHigh?: string;
  /** Horizontal offset in meters */
  offsetX?: number;
  /** Vertical offset in meters */
  offsetY?: number;
  /** Content type classification */
  contentType: HSCatalog.ContentType | { _types: unknown };
}

/**
 * Props for molding preview panel initialization
 */
interface MoldingPreviewData {
  /** Whether profile is horizontally flipped */
  flip?: boolean;
  /** Whether profile normal direction is flipped */
  flipNormal: boolean;
  /** Profile configuration data */
  profileData: ProfileData;
}

/**
 * Internal state for molding preview component
 */
interface MoldingPreviewState {
  /** Current width in meters */
  width: number;
  /** Current height in meters */
  height: number;
  /** Thumbnail image URL */
  profileThumbnail: string;
  /** SVG path string for rendering */
  moldingPath: string;
  /** Horizontal offset in millimeters (UI scale) */
  offsetX: number;
  /** Vertical offset in millimeters (UI scale) */
  offsetY: number;
  /** Original profile width in meters */
  profileSizeX: number;
  /** Original profile height in meters */
  profileSizeY: number;
}

/**
 * Props for MoldingPreviewPanel component
 */
interface MoldingPreviewPanelProps {
  data: MoldingPreviewData & {
    profileWidth: number;
    profileHeight: number;
    profileThumbnail: string;
    profile: string;
    profileSizeX: number;
    profileSizeY: number;
    offsetX: number;
    offsetY: number;
  };
}

/**
 * Props for profile size update message
 */
interface ProfileSizeUpdate {
  width: number;
  height: number;
  isPreview: boolean;
}

/**
 * Props for offset update message
 */
interface OffsetUpdate {
  offsetX: number;
  offsetY: number;
  isPreview: boolean;
}

/**
 * Catalog query options
 */
interface CatalogQueryOptions {
  types: HSCatalog.CategoryTypeEnum[];
  customerCategories: unknown[];
  query?: {
    categoryId: string;
  };
  popOptions?: {
    style: Record<string, string>;
  };
}

/**
 * Internal component for rendering molding preview with edit controls
 */
declare class MoldingPreviewPanel extends React.Component<MoldingPreviewPanelProps, MoldingPreviewState> {
  /** Reference to original profile data */
  profileData: ProfileData;
  /** Selected direction index (0: normal, 1: flipped) */
  dirSelectedItem: number;
  /** Selected mirror index (0: normal, 1: mirrored) */
  mirSelectedUtem: number;

  constructor(props: MoldingPreviewPanelProps);

  componentDidMount(): void;

  /**
   * Opens catalog browser filtered to molding categories
   */
  showMoldingInCatalog(): void;

  /**
   * Updates profile width
   * @param width - New width in meters
   * @param isPreview - Whether this is a preview update (not final)
   */
  _setProfileWidth(width: number, isPreview: boolean): void;

  /**
   * Updates profile height
   * @param height - New height in meters
   * @param isPreview - Whether this is a preview update (not final)
   */
  _setProfileHeight(height: number, isPreview: boolean): void;

  /**
   * Renders coordinate system axes for position reference
   * @returns React element with SVG paths for X/Y axes
   */
  _renderMoldingLocation(): React.ReactElement;

  /**
   * Renders the molding profile icon with current transformations
   * @returns React element with transformed profile path
   */
  _renderMoldingIcon(): React.ReactElement;

  /**
   * Applies offset to molding position
   * @param isPreview - Whether this is a preview update (not final)
   */
  _offsetMolding(isPreview: boolean): void;

  /**
   * Resets all properties to original values
   */
  _resetAllProperty(): void;

  /**
   * Determines appropriate material type for the molding
   * @param productData - Product data containing content type
   * @returns Material type enumeration value
   */
  _getMoldingMaterialType(productData: { contentType: HSCatalog.ContentType }): HSCatalog.DefaultItemTypeEnum;

  /**
   * Applies current molding configuration to all applicable elements
   */
  _applyAllMolding(): void;

  render(): React.ReactElement;
}

/**
 * Public API for molding preview panel
 * Manages lifecycle of the preview panel overlay
 */
export default class MoldingPreviewPanelController extends React.Component {
  /** Singleton instance of the preview panel */
  static instance: MoldingPreviewPanel | null;

  /**
   * Creates and displays the molding preview panel
   * @param data - Configuration data for the molding to preview
   */
  static show(data: MoldingPreviewData): void;

  /**
   * Updates the preview panel state with new profile data
   * @param data - Updated molding configuration
   */
  static updateState(data: MoldingPreviewData): void;

  /**
   * Destroys the preview panel and cleans up DOM
   */
  static destroy(): void;
}

/**
 * Global namespace declarations for external dependencies
 */
declare namespace HSApp {
  namespace Util {
    namespace Core {
      function define(namespace: string): unknown;
    }
  }

  namespace App {
    function getApp(): {
      pluginManager: {
        getPlugin(type: HSFPConstants.PluginType): unknown;
        plugins: Record<HSFPConstants.PluginType, { hideStatusBar(): void }>;
      };
      catalogManager: {
        getProductBySeekId(seekId: string): Promise<unknown>;
        getDefaultItem(type: HSCatalog.DefaultItemTypeEnum): Promise<unknown>;
      };
    };
  }

  namespace Config {
    const TENANT: string;
  }
}

declare namespace HSFPConstants {
  enum PluginType {
    Catalog = 'catalog',
    ContextualTools = 'contextualTools'
  }
}

declare namespace HSCatalog {
  enum CategoryTypeEnum {
    SC_Cornice = 'cornice',
    SC_Baseboard = 'baseboard',
    SC_Top_Rail = 'topRail'
  }

  enum ContentTypeEnum {
    Baseboard = 'baseboard',
    Decoline = 'decoline'
  }

  enum DefaultItemTypeEnum {
    CorniceMaterial = 'corniceMaterial',
    BaseboardMaterial = 'baseboardMaterial'
  }

  class ContentType {
    constructor(types: unknown);
    isTypeOf(type: ContentTypeEnum): boolean;
  }
}

declare namespace HSConstants {
  namespace Constants {
    const DEFAULT_MOLDING_PARAM: {
      MIN_HEIGHT: number;
      MAX_HEIGHT: number;
    };
  }
}

declare namespace ResourceManager {
  function getString(key: string): string;
}

declare const T: {
  UI: {
    postUIMessage(channel: string, action: string, data?: unknown): void;
    focusEditFrame(): void;
  };
  ModelingMsgHandler: {
    _onCatalogHidden(): void;
    _createMoldingMsgData(profileData: ProfileData, materials: unknown[]): unknown;
  };
};