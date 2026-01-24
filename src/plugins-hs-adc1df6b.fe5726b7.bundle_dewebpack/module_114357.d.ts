/**
 * Pocket utility module for door/window configurations and material management
 */

/**
 * Products recommendation based on current floorplan usage
 */
export interface GuessYourFavoriteProducts {
  /** Array of profile seek IDs used in the floorplan */
  profiles: string[];
  /** Array of material seek IDs used in the floorplan */
  materials: string[];
}

/**
 * Metadata for pocket material configuration
 */
export interface PocketMaterialMeta {
  /** Tile size in X direction */
  tileSize_x: number;
  /** Tile size in Y direction */
  tileSize_y: number;
  /** URL to the texture resource */
  textureUrl: string;
  /** Material ID from the material system */
  id: HSCore.Material.MaterialIdEnum;
}

/**
 * Pocket object with seek ID and optional material
 */
export interface Pocket {
  seekId: string;
  material?: {
    seekId: string;
  };
}

/**
 * Extended metadata for objects with pocket material information
 */
export interface ExtendedObjectMetadata {
  defaultPocketMaterialUrl?: string;
  extension?: {
    objInfo?: {
      pocketMaterial?: {
        tileSize?: {
          x: number;
          y: number;
        };
      };
    };
  };
}

/**
 * Object with extended metadata
 */
export interface ObjectWithMetadata {
  metadata: ExtendedObjectMetadata;
}

/**
 * Door/window host element with directional properties and face collections
 */
export interface PocketHost {
  /** Primary direction vector of the host element */
  direction: unknown;
  /** Transformed/secondary direction vector */
  transDirection: unknown;
  /** Collection of faces on the left side */
  leftFaces: Record<string, unknown>;
  /** Collection of faces on the right side */
  rightFaces: Record<string, unknown>;
}

/**
 * Door/window pocket element with host and face information
 */
export interface DoorPocket {
  /** The host element (wall/structure) containing this pocket */
  host?: PocketHost;
  /** Collection of side faces of the pocket */
  sideFaces: unknown[];
  /** Get the bottom face of the pocket */
  getBottomFace(): unknown;
}

/**
 * Get recommended products based on floorplan usage, excluding a specific pocket
 * @param excludePocket - The pocket to exclude from recommendations (typically the current selection)
 * @returns Object containing arrays of recommended profile and material IDs
 */
export declare function getGuessYourFavoriteProducts(
  excludePocket?: Pocket
): GuessYourFavoriteProducts;

/**
 * Extract pocket material metadata from an object's metadata
 * @param obj - Object containing material metadata
 * @returns Material metadata if all required properties exist, null otherwise
 */
export declare function getPocketMaterialMeta(
  obj: ObjectWithMetadata
): PocketMaterialMeta | null;

/**
 * Update door side face materials based on pocket side type and host direction
 * Aligns hole faces to the appropriate host face (left or right) depending on
 * the side type and direction vectors
 * @param pocket - The door pocket element to update
 * @param sideType - Which side(s) of the pocket to update (Inner/Outer/Both)
 */
export declare function updateDoorSideFaceMaterial(
  pocket: DoorPocket,
  sideType: HSCore.Model.PocketSideType
): void;