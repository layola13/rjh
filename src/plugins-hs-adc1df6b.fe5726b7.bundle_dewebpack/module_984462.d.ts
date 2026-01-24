/**
 * Wall molding transaction request module
 * Handles adding, modifying and managing wall moldings (baseboards, waist lines, etc.)
 */

/**
 * Content information for creating molding entities
 */
export interface MoldingContentInfo {
  /** User-defined custom data */
  userFreeData: {
    /** Material metadata for the molding */
    materialMeta?: MaterialMetadata;
  };
  /** Profile width dimension */
  profileSizeX?: number;
  /** Profile height dimension */
  profileSizeY?: number;
}

/**
 * Metadata describing material properties
 */
export interface MaterialMetadata {
  [key: string]: unknown;
}

/**
 * Face entity that moldings can be attached to
 */
export interface Face {
  /**
   * Get existing molding(s) of a specific type on this face
   * @param moldingType - Type of molding to retrieve
   * @returns Array of molding entities or undefined
   */
  getMolding(moldingType: MoldingTypeEnum): MoldingEntity[] | undefined;
  
  /**
   * Add a molding entity to this face
   * @param entity - Molding entity to add
   */
  addMolding(entity: MoldingEntity): void;
  
  /**
   * Remove a molding entity from this face
   * @param entity - Molding entity to remove
   */
  removeMolding(entity: MoldingEntity): void;
}

/**
 * Base molding entity interface
 */
export interface MoldingEntity {
  /** Type of molding (baseboard, waist line, etc.) */
  type: MoldingTypeEnum;
  
  /** Material applied to this molding */
  material: Material;
  
  /** Metadata containing dimensions and other properties */
  metadata: {
    profileSizeX: number;
    profileSizeY: number;
  };
  
  /**
   * Assign this molding to a specific face
   * @param face - Target face to attach to
   */
  assignTo(face: Face): void;
  
  /**
   * Initialize molding from metadata
   * @param meta - Content information for initialization
   */
  initByMeta(meta: MoldingContentInfo): void;
  
  /**
   * Mark neighboring moldings as needing updates based on face type
   */
  dirtyNeighborMoldingsByFacetype(): void;
}

/**
 * Wall board baseboard molding entity
 */
export interface WallBoardBaseboard extends MoldingEntity {
  type: MoldingTypeEnum.WallBoardBaseboard;
}

/**
 * Wall board waist line molding entity
 */
export interface WallBoardWaistLine extends MoldingEntity {
  type: MoldingTypeEnum.WallBoardWaistLine;
}

/**
 * Enumeration of molding types
 */
export enum MoldingTypeEnum {
  WallBoardBaseboard = 'WallBoardBaseboard',
  WallBoardWaistLine = 'WallBoardWaistLine',
  // ... other molding types
}

/**
 * Material class for molding appearance
 */
export interface Material {
  /**
   * Create a material from metadata
   * @param metadata - Material configuration
   * @returns Created material instance
   */
  create(metadata: MaterialMetadata): Material;
}

/**
 * Base transaction request class
 */
export declare class TransactionRequest {
  /**
   * Called when transaction is committed
   */
  onCommit(): void;
  
  /**
   * Called when transaction is undone
   */
  onUndo(): void;
  
  /**
   * Called when transaction is redone
   */
  onRedo(): void;
}

/**
 * Transaction request for adding/modifying wall moldings
 * Supports undo/redo operations and validates molding types
 */
export default class WallMoldingTransactionRequest extends TransactionRequest {
  /** Content information for the molding */
  readonly contentInfo: MoldingContentInfo;
  
  /** Face to attach the molding to */
  readonly face: Face;
  
  /** Type of molding to add */
  readonly moldingType: MoldingTypeEnum;
  
  /** Previously saved entity for undo operations */
  private savedEntity?: MoldingEntity;
  
  /**
   * Create a new wall molding transaction request
   * @param contentInfo - Molding configuration and metadata
   * @param face - Target face to attach molding to
   * @param moldingType - Type of molding to create
   */
  constructor(
    contentInfo: MoldingContentInfo,
    face: Face,
    moldingType: MoldingTypeEnum
  );
  
  /**
   * Commit the transaction - create and add molding to face
   * Validates molding type before execution
   */
  onCommit(): void;
  
  /**
   * Undo the transaction - restore previous molding state
   */
  onUndo(): void;
  
  /**
   * Redo the transaction - reapply molding changes
   */
  onRedo(): void;
  
  /**
   * Change the molding type on the face
   * @param entity - Molding entity to apply
   * @private
   */
  private _changeMoldingType(entity: MoldingEntity): void;
  
  /**
   * Add molding entity to wall face
   * Removes existing moldings of same type for baseboards/waist lines
   * @param entity - Molding entity to add
   * @private
   */
  private _addToWall(entity: MoldingEntity): void;
  
  /**
   * Create molding entity from content information
   * Handles material creation and entity initialization
   * @param contentInfo - Configuration for the molding
   * @returns Created molding entity or undefined if validation fails
   * @private
   */
  private _createEntity(contentInfo: MoldingContentInfo): MoldingEntity | undefined;
}

/**
 * Global namespace declarations for HSCore framework
 */
declare global {
  namespace HSCore {
    namespace Model {
      const WallBoardBaseboard: typeof WallBoardBaseboard;
      const WallBoardWaistLine: typeof WallBoardWaistLine;
      
      namespace WallMolding {
        /**
         * Validate if a molding type is supported
         * @param type - Molding type to validate
         * @returns True if valid, false otherwise
         */
        function isValidMoldingType(type: MoldingTypeEnum): boolean;
      }
    }
    
    namespace Material {
      const Material: Material;
    }
    
    namespace Util {
      namespace Molding {
        /**
         * Factory method to create molding from type
         * @param type - Type of molding to create
         * @returns New molding entity
         */
        function createFromType(type: MoldingTypeEnum): MoldingEntity;
      }
    }
    
    namespace Transaction {
      const Request: typeof TransactionRequest;
    }
  }
  
  namespace HSApp {
    namespace App {
      interface PluginManager {
        /**
         * Get plugin by type
         * @param type - Plugin type identifier
         */
        getPlugin(type: string): CustomizedFeatureModelPlugin;
      }
      
      interface AppInstance {
        pluginManager: PluginManager;
      }
      
      /**
       * Get application singleton instance
       */
      function getApp(): AppInstance;
    }
  }
  
  namespace HSFPConstants {
    enum PluginType {
      CustomizedFeatureModel = 'CustomizedFeatureModel'
    }
  }
  
  interface CustomizedFeatureModelPlugin {
    /**
     * Get parametric ceiling presets configuration
     */
    getParametricCeilingPresets(): ParametricCeilingPresets;
  }
  
  interface ParametricCeilingPresets {
    /**
     * Get default material for moldings
     * @returns Material metadata
     */
    getDefaultMoldingMaterial(): MaterialMetadata;
  }
}

export {};