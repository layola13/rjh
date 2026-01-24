/**
 * Wall molding module providing IO and entity classes for wall-based moldings.
 * Handles baseboards, cornices, and wall board moldings with thickness and height properties.
 */

import { Molding_IO, Molding, MoldingTypeEnum } from './Molding';
import { Entity } from './Entity';

/**
 * IO handler for wall molding serialization and deserialization.
 * Extends the base Molding_IO to provide specific handling for wall moldings.
 */
export class WallMolding_IO extends Molding_IO {
    // Inherits all base IO functionality
}

/**
 * Wall molding entity representing architectural moldings attached to wall faces.
 * Supports baseboards, cornices, and wall board moldings with configurable dimensions.
 */
export class WallMolding extends Molding {
    /**
     * Creates a new wall molding instance.
     * @param id - Unique identifier for the molding entity (defaults to empty string)
     * @param params - Optional initialization parameters for the molding
     */
    constructor(id?: string, params?: unknown);

    /**
     * Gets the thickness (X dimension) of the wall molding.
     * Represents how far the molding protrudes from the wall.
     */
    get thickness(): number;

    /**
     * Sets the thickness (X dimension) of the wall molding.
     * @param value - The thickness value in scene units
     */
    set thickness(value: number);

    /**
     * Gets the height (Y dimension) of the wall molding.
     * Represents the vertical size of the molding profile.
     */
    get height(): number;

    /**
     * Sets the height (Y dimension) of the wall molding.
     * @param value - The height value in scene units
     */
    set height(value: number);

    /**
     * Gets the default thickness value for this molding type.
     * Based on the XLength property from the molding definition.
     */
    get defaultThickness(): number;

    /**
     * Gets the default height value for this molding type.
     * Based on the YLength property from the molding definition.
     */
    get defaultHeight(): number;

    /**
     * Gets the sweep path for the molding geometry generation.
     * Currently returns an empty array as wall moldings use face-based paths.
     */
    get sweepPath(): unknown[];

    /**
     * Returns the IO handler instance for serialization.
     * @returns Singleton instance of WallMolding_IO
     */
    getIO(): WallMolding_IO;

    /**
     * Gets the set of metadata keys that should be filtered during serialization.
     * Adds "heightOffset" to the base molding filter keys.
     * @returns Set of metadata keys to exclude from serialization
     */
    getMetadataFilterKeys(): Set<string>;

    /**
     * Marks neighboring moldings on adjacent wall faces as dirty to trigger regeneration.
     * Updates moldings on the previous and next wall faces when this molding changes.
     * Ensures visual continuity across wall corners and junctions.
     */
    dirtyNeighborMoldingsByFacetype(): void;

    /**
     * Validates whether a molding type is applicable to wall moldings.
     * @param moldingType - The molding type enum to validate
     * @returns True if the type is Baseboard, Cornice, WallBoardBaseboard, or WallBoardWaistLine
     */
    static isValidMoldingType(moldingType: MoldingTypeEnum): boolean;
}

// Register the WallMolding class with the entity system
Entity.registerClass(HSConstants.ModelClass.NgWallMolding, WallMolding);