/**
 * Input/Output handler for CustomizedFeatureModel serialization
 */
export declare class CustomizedFeatureModel_IO extends CustomizedModel_IO {
    /**
     * Serializes a CustomizedFeatureModel to a dump format
     * @param entity - The entity to serialize
     * @param callback - Optional callback invoked after dump with the result and entity
     * @param includeChildren - Whether to include child entities in the dump
     * @param options - Additional serialization options
     * @returns The serialized dump data
     */
    dump(
        entity: CustomizedFeatureModel,
        callback?: (dump: unknown[], entity: CustomizedFeatureModel) => void,
        includeChildren?: boolean,
        options?: Record<string, unknown>
    ): unknown[];

    /**
     * Deserializes dump data into a CustomizedFeatureModel
     * @param entity - The target entity to populate
     * @param dumpData - The serialized data containing sketch reference
     * @param options - Deserialization options including version and restore flags
     */
    load(
        entity: CustomizedFeatureModel,
        dumpData: { sketch?: string; _sketch?: string },
        options?: { version?: string; duringRestore?: boolean }
    ): void;

    /**
     * Gets the singleton instance of the IO handler
     */
    static instance(): CustomizedFeatureModel_IO;
}

/**
 * Represents a customizable 3D feature model with 2D sketch extrusion capabilities
 * Manages WebCAD document generation, material mapping, and sketch-to-3D conversion
 */
export declare class CustomizedFeatureModel extends CustomizedModel {
    /** Signal emitted when the sketch becomes dirty */
    readonly signalDirty: Signal<CustomizedFeatureModel>;
    
    /** Signal emitted when the WebCAD document changes */
    readonly signalWebCADDocChanged: Signal<void>;
    
    /** Signal emitted when the sketch geometry is modified */
    readonly signalSketchDirty: Signal<CustomizedFeatureModel>;

    /** The internal WebCAD document representation */
    protected _webCADDocument?: unknown;
    
    /** The 2D sketch that defines the extrusion profile */
    protected _sketch?: DecorateSketch2d;
    
    /** Hook for managing sketch signal subscriptions */
    protected readonly _sketchSignalHook: SignalHook;
    
    /** Map of face IDs to material data */
    protected _matMap: Map<string, unknown>;
    
    /** API version for WebCAD operations */
    protected _apiVersion?: string;
    
    /** Content type identifier for the model */
    protected contentType: { getTypeString(): string };

    /**
     * Creates a new CustomizedFeatureModel
     * @param name - Optional name for the model
     * @param host - Optional parent host entity
     */
    constructor(name?: string, host?: unknown);

    /**
     * Gets or lazily creates the 2D sketch
     */
    get sketch(): DecorateSketch2d;

    /**
     * Gets the WebCAD document representation
     */
    get webCADDocument(): unknown;

    /**
     * Sets the WebCAD document and marks geometry as dirty
     */
    set webCADDocument(value: unknown);

    /**
     * Gets all face IDs from the graphics data
     */
    get faceIds(): string[];

    /**
     * Gets the model's X dimension
     */
    x: number;
    
    /** Gets the model's Y dimension */
    y: number;
    
    /** Gets the model's Z dimension */
    z: number;
    
    /** Gets the length along the X axis */
    XLength: number;
    
    /** Gets the length along the Y axis */
    YLength: number;
    
    /** Gets the length along the Z axis */
    ZLength: number;

    /**
     * Sets the parent host entity with validation
     * @param host - The new host entity
     */
    protected _setHost(host: unknown): void;

    /**
     * Rebuilds the model after deserialization
     * Regenerates WebCAD document and applies light slots, moldings, and materials
     */
    rebuildAfterLoad(): void;

    /**
     * Handles 2D face copy events
     * @param event - Event containing source and copied face information
     */
    protected _onCopyFace2d(event: {
        data?: {
            sourceId?: string;
            copyId?: string;
            sourceAffectedFaceInfo?: { outerFaceId: string; innerWireIndex: number };
            copiedAffectedFaceInfo?: { outerFaceId: string; innerWireIndex: number };
        };
    }): void;

    /**
     * Handles child entity dirty events
     * @param child - The child entity that became dirty
     * @param event - The event data with type information
     */
    onChildDirty(child: unknown, event?: { type?: string }): void;

    /**
     * Handles new 2D face addition events
     * Reapplies light slots and moldings
     */
    protected _onAddFace2d(event: unknown): void;

    /**
     * Binds signal listeners to the sketch
     */
    bindSketchSignal(): void;

    /**
     * Handles sketch dirty events and triggers rebuild
     * @param event - Event with type and geometry change information
     */
    onSketchDirty(event?: { data?: { type?: string } }): void;

    /**
     * Rebuilds the WebCAD document from the sketch
     * @param event - Optional event with face copy information
     */
    rebuildDoc(event?: { data?: { copyFacePropsPairs?: Array<{ srcId: string; destId: string }> } }): void;

    /**
     * Updates materials for newly created faces based on copy pairs
     * @param materialMap - Map of face IDs to materials
     * @param copyPairs - Pairs of source and destination face IDs
     */
    protected _updateNewFaceMaterials(
        materialMap: Map<string, unknown>,
        copyPairs?: Array<{ srcId: string; destId: string }>
    ): void;

    /**
     * Converts 2D point array to 3D coordinates
     * @param points - Array of 2D points
     * @param offset - Offset vector to subtract
     * @returns Array of 3D points
     */
    protected _to3dPointArray(points: Array<{ x: number; y: number }>, offset: { x: number; y: number; z: number }): THREE.Vector3[];

    /**
     * Converts a single 2D point to 3D coordinates
     * @param point - The 2D point
     * @param offset - Offset vector to subtract
     * @returns The 3D point
     */
    protected _to3dPoint(point: { x: number; y: number }, offset: { x: number; y: number; z: number }): THREE.Vector3;

    /**
     * Calculates the extrusion plane from the sketch background
     * @param offset - Center offset for plane calculation
     * @returns The extrusion plane
     */
    protected _getExtrudePlane(offset: { x: number; y: number; z: number }): THREE.Plane | undefined;

    /**
     * Connects arc points to form closed paths
     * @param points - Array of points to connect
     * @param face - The face containing arc curves
     */
    protected _connectArcPoints(points: unknown[], face: { outerLoop: unknown; innerLoops: unknown[] }): void;

    /**
     * Splits points into multiple paths based on shared IDs
     * @param points - Array of points with optional IDs
     * @returns Array of point arrays representing separate paths
     */
    protected _splitPoints(points: Array<{ id?: string }>): unknown[][];

    /**
     * Generates extrusion paths from a face
     * @param face - The face to extract paths from
     * @param offset - Center offset for coordinate conversion
     * @returns Array of 3D point arrays representing extrusion paths
     */
    protected _getExtrudePaths(face: { outerLoop: unknown; innerLoops: unknown[] }, offset: { x: number; y: number; z: number }): THREE.Vector3[][];

    /**
     * Gets the updated clockwise direction for a curve
     * @param curve - The curve to check
     * @returns True if clockwise
     */
    protected _getUpdatedClockWise(curve: { clockwise: boolean }): boolean;

    /**
     * Extracts arc information from a face
     * @param face - The face containing arcs
     * @param offset - Center offset for coordinate conversion
     * @param normal - Normal vector of the extrusion plane
     * @returns Array of arc metadata
     */
    protected _getArcInfo(
        face: { outerLoop: unknown; innerLoops: unknown[] },
        offset: { x: number; y: number; z: number },
        normal: THREE.Vector3
    ): Array<{
        start: THREE.Vector3;
        end: THREE.Vector3;
        id?: string;
        center: THREE.Vector3;
        radius: number;
        segments: number;
    }>;

    /**
     * Gets the extrusion direction multiplier (1 or -1)
     */
    protected _getExtrudeDirection(): number;

    /**
     * Gets the Z-offset scaling factor
     */
    protected _getZOffsetScale(): number;

    /**
     * Calculates bounding information for all sketch faces
     * @returns Bounding box and maximum extrusion value
     */
    protected _getSketchFacesBoundInfo(): { sketchBound: number[]; maxValue: number } | undefined;

    /**
     * Initializes model dimensions from sketch bounds
     * @returns Center point and relative center
     */
    protected _initModelParameters(): { center: THREE.Vector3; relativeCenter: THREE.Vector3 } | undefined;

    /**
     * Gets the front projection plane in local coordinates
     */
    getFrontProjectionPlane(): THREE.Plane | undefined;

    /**
     * Generates the WebCAD document from the sketch
     * @param skipChildRemoval - If true, skip removing invalid children
     * @returns The generated document and updated face IDs
     */
    protected _generateWebDoc(skipChildRemoval?: boolean): { webCADDocument?: unknown; updatedSketchFaceIds: string[] };

    /**
     * Called when face materials change
     * @param faceIds - Array of affected face IDs
     */
    onFaceMaterialChanged(faceIds: string[]): void;

    /**
     * Clones a material, clearing mixpaint face groups
     * @param material - The material to clone
     * @returns The cloned material
     */
    cloneMaterial(material: unknown): unknown;

    /**
     * Gets the bottom face ID for a specific sketch face
     * @param sketchFaceId - Optional sketch face ID filter
     * @returns The bottom face ID or null
     */
    getBottomFaceId(sketchFaceId?: string): string | null;

    /**
     * Sets the material for the bottom face
     * @param material - The material to apply
     */
    setBottomFaceMaterial(material: unknown): void;

    /**
     * Gets the current bottom face material
     */
    getBottomFaceMaterial(): unknown;

    /**
     * Gets the IO handler for this model type
     */
    getIO(): CustomizedFeatureModel_IO;

    /**
     * Gets metadata filter keys for serialization
     */
    getMetadataFilterKeys(): string[] | null;

    /**
     * Called when a child entity is added
     * @param child - The added child entity
     */
    onChildAdded(child: unknown): void;

    /**
     * Gets all light slot child entities
     */
    getLightSlotEntities(): unknown[];

    /**
     * Gets all molding child entities
     */
    getMoldingEntities(): unknown[];

    /**
     * Gets all light band child entities
     */
    getLightBandEntities(): unknown[];

    /**
     * Gets a child by its WebCAD document ID
     */
    getChildByWebDocId(webDocId: string): unknown;

    /**
     * Gets the current material data map
     */
    getMaterialData(): Map<string, unknown>;

    /**
     * Sets material data for the model
     * @param materialMap - Map of face IDs to materials
     * @param updateGraphics - Whether to update graphics
     * @param notifyChange - Whether to notify listeners
     */
    setMaterialData(materialMap: Map<string, unknown>, updateGraphics?: boolean, notifyChange?: boolean): void;

    /**
     * Gets material for a specific face
     */
    getFaceMaterial(faceId: string): unknown;

    /**
     * Sets material for a specific face
     */
    setFaceMaterial(faceId: string, material: unknown): void;

    /**
     * Gets material data for a specific face
     */
    getFaceMaterialData(faceId: string): unknown;

    /**
     * Sets material data for a specific face
     */
    setFaceMaterialData(faceId: string, materialData: unknown): void;

    /**
     * Refreshes all face materials
     */
    refreshFaceMaterial(): void;

    /**
     * Gets graphics data containing faces
     */
    getGraphicsData(): { faces?: Map<string, unknown> } | undefined;

    /**
     * Migrates mixpaint background for version 0.13 compatibility
     */
    migrateMixPaintBackground(): void;

    /**
     * Migrates mixpaint RCP for version 0.14 compatibility
     */
    migrateMixpaintRCP(): void;
}

/**
 * 2D Sketch entity for defining extrusion profiles
 */
export declare class DecorateSketch2d {
    /** Signal emitted when the sketch becomes dirty */
    readonly signalDirty: Signal<unknown>;
    
    /** Signal emitted when a 2D face is copied */
    readonly face2dCopied: Signal<unknown>;
    
    /** Signal emitted when a 2D face is added */
    readonly face2dAdded: Signal<unknown>;
    
    /** Signal emitted when sketch build completes */
    readonly signalBuildComplete: Signal<unknown>;

    /** Transformation matrix from 2D sketch space to 3D world space */
    convert3dMatrix: THREE.Matrix4;
    
    /** Array of 2D faces in the sketch */
    faces: unknown[];

    /**
     * Gets the outer boundary of the sketch background
     */
    getBackgroundOuter(): Array<{ x: number; y: number }> | undefined;

    /**
     * Gets the extrusion value for a specific face
     */
    getExtrusionValue(faceId: string): number;

    /**
     * Marks the sketch material as dirty
     */
    dirtyMaterial(options: { faceIds: string[] }): void;
}

/**
 * Generic signal class for event dispatching
 */
export declare class Signal<T = unknown> {
    constructor(owner: unknown);
    dispatch(data?: T): void;
}

/**
 * Manages signal listener subscriptions
 */
export declare class SignalHook {
    constructor(owner: unknown);
    listen(signal: Signal, handler: (event?: unknown) => void): void;
    unlistenAll(): void;
}