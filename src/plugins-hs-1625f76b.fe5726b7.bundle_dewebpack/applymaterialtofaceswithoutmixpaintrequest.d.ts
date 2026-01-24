import { HSCore } from './path/to/HSCore';

/**
 * Request to apply material to faces without mixpaint functionality.
 * Extends the base StateRequest to provide transactional material application.
 */
export declare class ApplyMaterialToFacesWithoutMixpaintRequest extends HSCore.Transaction.Common.StateRequest {
    /**
     * The material to be applied to the faces.
     * @private
     */
    private _material: Material;

    /**
     * The collection of faces to which the material will be applied.
     * @private
     */
    private _faces: Face[];

    /**
     * Creates a new instance of ApplyMaterialToFacesWithoutMixpaintRequest.
     * 
     * @param material - The material to apply to the faces
     * @param faces - The array of faces that will receive the material
     */
    constructor(material: Material, faces: Face[]);

    /**
     * Executes the material application when the transaction is committed.
     * Clones the material for each face and refreshes the material unique polygon.
     * 
     * @returns The array of faces that had materials applied
     */
    onCommit(): Face[];

    /**
     * Indicates whether this request can participate in field-level transactions.
     * 
     * @returns Always returns true, indicating this request supports field transactions
     */
    canTransactField(): boolean;
}

/**
 * Represents a material that can be applied to faces.
 * Should be defined based on your material system implementation.
 */
interface Material {
    /**
     * Creates a deep copy of the material.
     * @returns A new Material instance with the same properties
     */
    clone(): Material;
}

/**
 * Represents a geometric face that can have materials applied to it.
 * Should be defined based on your geometry system implementation.
 */
interface Face {
    /**
     * The material currently assigned to this face.
     */
    material: Material;

    /**
     * Refreshes the unique polygon data associated with the material.
     * Called after material assignment to update rendering state.
     */
    refreshMaterialUniquePolygon(): void;
}