import { Color3 } from 'core/Maths/math.color';
import { Vector3, Vector4 } from 'core/Maths/math.vector';
import { MaterialDefines } from 'core/Materials/materialDefines';
import { PushMaterial } from 'core/Materials/pushMaterial';
import { BaseTexture } from 'core/Materials/Textures/baseTexture';
import { Scene } from 'core/scene';
import { AbstractMesh } from 'core/Meshes/abstractMesh';
import { SubMesh } from 'core/Meshes/subMesh';
import { Nullable } from 'core/types';

/**
 * Material defines for the Grid Material
 * Contains preprocessor flags for shader compilation
 */
export declare class GridMaterialDefines extends MaterialDefines {
    /** Whether opacity texture is enabled */
    OPACITY: boolean;
    
    /** Whether material uses transparency */
    TRANSPARENT: boolean;
    
    /** Whether fog is enabled */
    FOG: boolean;
    
    /** Whether alpha should be premultiplied */
    PREMULTIPLYALPHA: boolean;
    
    /** Whether to use maximum line rendering */
    MAX_LINE: boolean;
    
    /** Whether UV1 coordinates are used */
    UV1: boolean;
    
    /** Whether UV2 coordinates are used */
    UV2: boolean;
    
    /** Whether instancing is enabled */
    INSTANCES: boolean;
    
    /** Whether thin instancing is enabled */
    THIN_INSTANCES: boolean;
    
    /** Whether image processing is applied by post-process */
    IMAGEPROCESSINGPOSTPROCESS: boolean;
    
    /** Whether to skip final color clamping */
    SKIPFINALCOLORCLAMP: boolean;

    constructor();
}

/**
 * Grid Material for rendering grid patterns on meshes
 * Useful for ground planes, coordinate systems, and measurement grids
 */
export declare class GridMaterial extends PushMaterial {
    /**
     * Main color of the grid (background color)
     * @default Color3.Black()
     */
    mainColor: Color3;

    /**
     * Color of the grid lines
     * @default Color3.Teal()
     */
    lineColor: Color3;

    /**
     * Ratio of grid spacing (controls grid density)
     * @default 1
     */
    gridRatio: number;

    /**
     * Offset of the grid in world space
     * @default Vector3.Zero()
     */
    gridOffset: Vector3;

    /**
     * Frequency of major grid lines (every N lines is a major line)
     * @default 10
     */
    majorUnitFrequency: number;

    /**
     * Visibility factor for minor grid lines (0-1 range)
     * @default 0.33
     */
    minorUnitVisibility: number;

    /**
     * Overall opacity of the material (0-1 range)
     * @default 1
     */
    opacity: number;

    /**
     * Whether to premultiply alpha values
     * @default false
     */
    preMultiplyAlpha: boolean;

    /**
     * Whether to use maximum line rendering mode
     * @default false
     */
    useMaxLine: boolean;

    /**
     * Opacity texture for controlling transparency per-pixel
     */
    opacityTexture: Nullable<BaseTexture>;

    /**
     * Internal opacity texture reference (backing field)
     * @internal
     */
    _opacityTexture: Nullable<BaseTexture>;

    /**
     * Internal grid control vector storing grid parameters
     * @internal
     */
    _gridControl: Vector4;

    /**
     * Creates a new Grid Material instance
     * @param name - Name of the material
     * @param scene - Scene to attach the material to
     */
    constructor(name: string, scene: Scene);

    /**
     * Checks if the material needs alpha blending
     * @returns True if alpha blending is required
     */
    needAlphaBlending(): boolean;

    /**
     * Checks if the material needs alpha blending for a specific mesh
     * @param mesh - Mesh to check
     * @returns True if alpha blending is required for this mesh
     */
    needAlphaBlendingForMesh(mesh: AbstractMesh): boolean;

    /**
     * Checks if the material is ready to be rendered for a submesh
     * @param mesh - Mesh containing the submesh
     * @param subMesh - Submesh to check readiness for
     * @param useInstances - Whether instancing is used
     * @returns True if the material is ready
     */
    isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;

    /**
     * Binds the material properties to the effect for rendering a submesh
     * @param world - World transformation matrix
     * @param mesh - Mesh being rendered
     * @param subMesh - Submesh being rendered
     */
    bindForSubMesh(world: Matrix, mesh: AbstractMesh, subMesh: SubMesh): void;

    /**
     * Disposes the material and releases its resources
     * @param forceDisposeEffect - Whether to force dispose the effect
     * @param forceDisposeTextures - Whether to force dispose textures
     */
    dispose(forceDisposeEffect?: boolean, forceDisposeTextures?: boolean): void;

    /**
     * Clones the material
     * @param name - Name for the cloned material
     * @returns Cloned material instance
     */
    clone(name: string): GridMaterial;

    /**
     * Serializes the material to a JSON object
     * @returns Serialized material data
     */
    serialize(): unknown;

    /**
     * Gets the class name of the material
     * @returns "GridMaterial"
     */
    getClassName(): string;

    /**
     * Parses a serialized material
     * @param source - Serialized material data
     * @param scene - Scene to create the material in
     * @param rootUrl - Root URL for loading resources
     * @returns Parsed GridMaterial instance
     */
    static Parse(source: unknown, scene: Scene, rootUrl: string): GridMaterial;
}