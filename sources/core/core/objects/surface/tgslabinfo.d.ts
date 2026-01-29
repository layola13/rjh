/**
 * Represents information about a slab (floor/ceiling) structure in a building model.
 * Provides access to slab geometry, topology, structural elements, and related face information.
 */
export declare class TgSlabInfo {
    /**
     * Raw slab information data
     */
    private readonly _rawSlabInfo: RawSlabInfo;

    /**
     * Reference to the parent slab object
     */
    readonly slab: Slab;

    /**
     * Collection of structural elements within this slab
     */
    readonly structures: Structure[];

    /**
     * Subset of structures that are contained within the slab boundaries
     */
    readonly structuresInSlab: Structure[];

    /**
     * Face elements associated with this slab
     */
    readonly faces: Face[];

    /**
     * Raw path data defining the slab outline
     */
    readonly rawPath: RawPath;

    /**
     * Raw geometry data for the slab
     */
    readonly rawGeometry: RawGeometry;

    /**
     * Creates a new TgSlabInfo instance
     * @param slab - The slab object this info describes
     * @param rawSlabInfo - Raw data containing slab structure and geometry information
     */
    constructor(slab: Slab, rawSlabInfo: RawSlabInfo);

    /**
     * Retrieves face information for a given structure face
     * @param structureFace - The structure face to query
     * @returns Optional array of face information objects
     */
    private _getFaceInfo(structureFace: StructureFace): Optional<FaceInfo[]>;

    /**
     * Gets the path defining the slab outline.
     * Falls back to computing the path from raw data if not cached on the slab.
     */
    get path(): SlabPath;

    /**
     * Gets the geometric representation of the slab
     * @returns Geometry object with outer boundary and holes
     */
    get geometry(): SlabGeometry;

    /**
     * Gets face information for all structural elements in the slab
     * @returns Flattened array of all face information objects
     */
    get structureFaceInfos(): FaceInfo[];
}

/**
 * Raw slab data structure
 */
interface RawSlabInfo {
    structures: Structure[];
    structuresInSlab: Structure[];
    faces: Face[];
    path: RawPath;
    geometry: RawGeometry;
    structureFaceInfos: StructureFace[];
}

/**
 * Represents a structure face with topology information
 */
interface StructureFace {
    topoKey: string;
}

/**
 * Slab path with outer boundary and optional holes
 */
interface SlabPath {
    outer: Curve[];
    holes?: Curve[][];
}

/**
 * Geometric representation of a slab
 */
interface SlabGeometry {
    outer: Vector[];
    holes: Vector[][];
}

/**
 * Represents a slab object in the building model
 */
interface Slab {
    path?: SlabPath;
    getUniqueParent(): UniqueParent;
}

/**
 * Parent object containing the room builder
 */
interface UniqueParent {
    roomBuilder: RoomBuilder;
}

/**
 * Room builder for managing faces and topology
 */
interface RoomBuilder {
    getFaceByTopoKey(topoKey: string): Optional<RoomFace[]>;
}

/**
 * Room face with associated face information
 */
interface RoomFace {
    faceInfo: FaceInfo;
}

/**
 * Generic optional type (may be null or undefined)
 */
type Optional<T> = T | null | undefined;

/**
 * Placeholder types (define based on actual implementation)
 */
type Structure = unknown;
type Face = unknown;
type RawPath = unknown;
type RawGeometry = unknown;
type FaceInfo = unknown;
type Curve = unknown;
type Vector = unknown;