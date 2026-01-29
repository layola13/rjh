import { BaseObject } from './BaseObject';
import { GeometryMolding } from './GeometryMolding';
import { WebCadDocument } from './WebCadDocument';
import { Logger } from './Logger';
import { Util } from '../utils/Util';
import { PocketSideType } from './PocketSideType';
import { ContentUtil } from './ContentUtil';
import { OpeningHelper } from './OpeningHelper';
import { FaceUtil } from './FaceUtil';
import { Loop } from './Loop';
import { RoomUtil } from './RoomUtil';
import { NCustomizedParametricRoof } from './NCustomizedParametricRoof';
import { Wall } from './Wall';
import { Line2d, Arc2d, Vector2, Vector3, MathAlg } from './MathTypes';
import * as THREE from 'three';
import * as ClipperLib from 'clipper-lib';

/**
 * Material direction type for pocket moldings
 */
interface MaterialDirection {
    /** Vertical reference line for UV mapping */
    verticalLine: THREE.Vector3;
    /** Direction identifier (left/right/inner/outer) */
    dir: string;
}

/**
 * Graphics data structure for rendering
 */
interface GraphicsData {
    /** Renderable 3D objects */
    objects: GraphicsObject[];
    /** Mesh geometry definitions */
    meshDefs: MeshDefinition[];
}

/**
 * Individual graphics object with transform and material
 */
interface GraphicsObject {
    /** Associated entity identifier */
    entityId: string;
    /** Custom rendering attributes */
    customAttrs: {
        /** Material seek identifiers sorted by area */
        seekIds?: string[];
        /** Object type classification */
        type: string;
        /** Room type context */
        roomType: string;
        /** Parent opening seek identifier */
        openingSeekId?: string;
    };
    /** Path to graphics resource */
    graphicsPath: string;
    /** Graphics object type enum */
    type: number;
    /** Axis-aligned bounding box */
    bounding: Float32Array;
    /** World space position [x, y, z] */
    position: Float32Array;
    /** Quaternion rotation [x, y, z, w] */
    rotation: Float32Array;
    /** Scale factors [x, y, z] */
    scale: Float32Array;
    /** Mesh identifier reference */
    mesh: string;
    /** Material properties and textures */
    material: MaterialObject;
    /** Visibility flag */
    visible?: boolean;
}

/**
 * Material object with texture and mapping properties
 */
interface MaterialObject {
    /** Molding material rotation in radians */
    moldingMaterialRotation?: number;
    /** Reference node name for material lookup */
    refNodeName?: string;
    /** UV transform for diffuse texture */
    diffuseMapUvTransform?: number[];
    /** UV transform for normal map */
    normalMapUvTransform?: number[];
}

/**
 * Mesh geometry definition
 */
interface MeshDefinition {
    /** Unique mesh identifier */
    key: string;
    /** Vertex positions */
    vertices: Float32Array;
    /** Triangle indices */
    indices: Uint32Array;
    /** Vertex normals */
    normals?: Float32Array;
    /** UV coordinates */
    uvs?: Float32Array;
}

/**
 * 2D point structure
 */
interface Point2D {
    x: number;
    y: number;
}

/**
 * 3D point structure
 */
interface Point3D {
    x: number;
    y: number;
    z: number;
}

/**
 * Path data with geometry and material information
 */
interface PathData {
    /** Ray direction along path */
    xRay: THREE.Vector3;
    /** Coplanar plane definition */
    plane: THREE.Plane;
    /** Array of 3D point paths */
    paths: THREE.Vector3[][];
    /** Plane processing options */
    planeOption: {
        /** Skip geometry simplification */
        noSimplify: boolean;
    };
    /** Custom metadata */
    customData: {
        /** UV mapping origin point */
        uvBasePoint: THREE.Vector3;
        /** Material properties */
        material: any;
    };
}

/**
 * Entity interface representing 3D model objects
 */
interface Entity {
    /** Unique entity identifier */
    ID: string;
    /** Display tag/name */
    tag: string;
    /** 2D profile outline */
    profile?: Point2D[];
    /** Material assignment */
    material?: Material;
    /** Pocket side configuration */
    side?: string;
    /** X-axis scale factor */
    XScale: number;
    /** Y-axis scale factor */
    YScale: number;
    /** Z-axis scale factor */
    ZScale: number;
    /** Z-position offset */
    z: number;
    /** Indentation/offset distance */
    indent?: number;
    /** Y-axis length */
    YLength?: number;
    /** Z-axis length */
    ZLength?: number;
    /** Z-axis rotation in degrees */
    ZRotation?: number;
    /** Outline points */
    outline: Point2D[];
    /** Opening swing direction */
    swing?: number;
    /** Content type classification */
    contentType: ContentType;
    /** Entity metadata */
    metadata?: EntityMetadata;
    /** Outer frame thickness */
    outerThickness?: number;
    /** Outer frame height */
    outerHeight?: number;
    
    /**
     * Get first parent not matching specified types
     * @param types Array of type identifiers to skip
     * @returns Parent entity or undefined
     */
    getFirstParentOfNonTypes(types: any[]): Entity | undefined;
    
    /**
     * Check if entity flag is disabled
     * @param flag Flag enum value
     * @returns True if flag is off
     */
    isFlagOff(flag: number): boolean;
    
    /**
     * Check if entity is instance of given class
     * @param className Model class identifier
     * @returns True if instance matches
     */
    instanceOf(className: string): boolean;
    
    /**
     * Get parent host entity
     * @returns Host entity or undefined
     */
    getHost(): Entity | undefined;
    
    /**
     * Get host roof face identifier
     * @returns Face ID or undefined
     */
    getHostRoofFaceId(): string | undefined;
    
    /**
     * Check if sill should be displayed (windows only)
     * @returns True if sill is visible
     */
    isShowSill?(): boolean;
    
    /**
     * Get door offset distance (doors only)
     * @returns Offset in meters
     */
    getDoorOffset?(): number;
}

/**
 * Material properties
 */
interface Material {
    /** Material rotation angle */
    rotation: number;
    
    /**
     * Serialize material to data array
     * @returns Array of material data
     */
    dump(): any[];
}

/**
 * Content type classification
 */
interface ContentType {
    /**
     * Check if content matches type enum
     * @param typeEnum Content type identifier
     * @returns True if type matches
     */
    isTypeOf(typeEnum: string): boolean;
}

/**
 * Entity metadata structure
 */
interface EntityMetadata {
    extension?: {
        objInfo?: {
            pocketMaterial?: {
                /** Reference node name for material */
                refNodeName: string;
            };
        };
    };
}

/**
 * Direction type constants for pocket orientation
 */
const DIRECTION_TYPES = Object.freeze({
    left: 'left',
    right: 'right',
    inner: 'inner',
    outer: 'outer'
} as const);

type DirectionType = typeof DIRECTION_TYPES[keyof typeof DIRECTION_TYPES];

/** Standard pocket frame thickness in meters */
const POCKET_FRAME_THICKNESS = 0.05; // HSConstants.Constants.POCKET_FRAME_THICKNESS

/** Clipper scaling factor for precision */
const CLIPPER_SCALE_FACTOR = 15000;

/** Geometric tolerance for floating point comparisons */
const GEOMETRIC_TOLERANCE = 1e-6; // HSConstants.Constants.TOLERANCE

/**
 * Pocket class for generating 3D geometry of wall/slab recesses.
 * Handles frame molding, material application, and UV mapping for architectural pockets.
 * 
 * @extends BaseObject
 */
export declare class Pocket extends BaseObject {
    /** Frame thickness around pocket perimeter */
    private _frameThickness: number;
    
    /** WebCAD document containing geometry data */
    private _webCadDocument: WebCadDocument;
    
    /** Front/inner side molding geometry */
    private _moldingfront?: GeometryMolding;
    
    /** Back/outer side molding geometry */
    private _moldingouter?: GeometryMolding;
    
    /** Cached local transformation matrix */
    private _matrixLocal?: THREE.Matrix4;

    /**
     * Constructs a Pocket instance
     * @param entity The pocket entity from the model
     * @param webCadDocument Optional pre-existing WebCAD document
     * @param param2 Additional construction parameter (type unknown)
     * @param param3 Additional construction parameter (type unknown)
     */
    constructor(
        entity: Entity,
        webCadDocument?: WebCadDocument,
        param2?: unknown,
        param3?: unknown
    );

    /**
     * Updates room custom attributes based on parent layer
     * @returns Object containing room type classification
     */
    updateRoomCustomAttrs(): { roomType: string };

    /**
     * Converts pocket geometry to graphics data for rendering
     * @returns Graphics data with mesh definitions and render objects
     */
    toGraphicsData(): GraphicsData;

    /**
     * Update hook called when entity changes
     */
    onUpdate(): void;

    /**
     * Offsets a 2D path inward or outward using Clipper library
     * @param path Original 2D point array
     * @param offset Offset distance (positive=outward, negative=inward)
     * @param zPosition Z-coordinate for height calculations
     * @param skipBottomFix Skip bottom boundary adjustment
     * @returns Offset path as 2D points
     */
    private _offsetPath(
        path: Point2D[],
        offset: number,
        zPosition: number,
        skipBottomFix?: boolean
    ): Point2D[];

    /**
     * Builds the internal WebCAD document with pocket geometry
     */
    private _buildWebCadDocument(): void;

    /**
     * Ensures path vertices are ordered counter-clockwise with optional bottom alignment
     * @param path Input 2D path
     * @param alignBottom Whether to align bottom edge
     * @param bottomOffset Additional offset for bottom edge
     * @returns Reordered path
     */
    private _setPathCounerClockWise(
        path: Point2D[],
        alignBottom: boolean,
        bottomOffset: number
    ): Point2D[];

    /**
     * Cleanup hook called when object is destroyed
     */
    onCleanup(): void;

    /**
     * Update position/transform when entity moves
     */
    onUpdatePosition(): void;

    /**
     * Event handler for entity dirty state changes
     */
    private onEntityDirty(): void;
}