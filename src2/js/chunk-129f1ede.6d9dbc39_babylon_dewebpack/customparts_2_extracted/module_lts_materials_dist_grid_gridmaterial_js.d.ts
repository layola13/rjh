import { MaterialDefines, PushMaterial } from '@babylonjs/core/Materials';
import { Scene } from '@babylonjs/core/scene';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import { SubMesh } from '@babylonjs/core/Meshes/subMesh';
import { Matrix } from '@babylonjs/core/Maths/math.vector';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { Vector3, Vector4 } from '@babylonjs/core/Maths/math.vector';
import { BaseTexture } from '@babylonjs/core/Materials/Textures/baseTexture';
import { Effect } from '@babylonjs/core/Materials/effect';

/**
 * Material defines for grid material rendering
 * Manages shader compilation flags and rendering states
 */
export declare class GridMaterialDefines extends MaterialDefines {
    /** Whether opacity texture is enabled */
    OPACITY: boolean;
    
    /** Whether transparency is enabled (opacity < 1) */
    TRANSPARENT: boolean;
    
    /** Whether fog rendering is enabled */
    FOG: boolean;
    
    /** Whether to pre-multiply alpha values */
    PREMULTIPLYALPHA: boolean;
    
    /** Whether to use maximum line width */
    MAX_LINE: boolean;
    
    /** Whether first UV channel is used */
    UV1: boolean;
    
    /** Whether second UV channel is used */
    UV2: boolean;
    
    /** Whether mesh instances are used */
    INSTANCES: boolean;
    
    /** Whether thin instances are used */
    THIN_INSTANCES: boolean;
    
    /** Whether image processing is applied by post-process */
    IMAGEPROCESSINGPOSTPROCESS: boolean;
    
    /** Whether to skip final color clamping */
    SKIPFINALCOLORCLAMP: boolean;

    constructor();
}

/**
 * Grid material for rendering infinite grid planes
 * Provides a procedural grid with customizable colors, spacing, and opacity
 */
export declare class GridMaterial extends PushMaterial {
    /**
     * Main color of the grid (background color)
     * @default Color3.Black()
     */
    mainColor: Color3;
    
    /**
     * Line color for grid lines
     * @default Color3.Teal()
     */
    lineColor: Color3;
    
    /**
     * Grid cell size ratio
     * Controls the spacing between grid lines
     * @default 1
     */
    gridRatio: number;
    
    /**
     * Offset of the grid in 3D space
     * Allows translating the entire grid
     * @default Vector3.Zero()
     */
    gridOffset: Vector3;
    
    /**
     * Frequency of major grid lines
     * Major lines appear every N minor lines
     * @default 10
     */
    majorUnitFrequency: number;
    
    /**
     * Visibility level of minor grid lines
     * Range: 0 (invisible) to 1 (fully visible)
     * @default 0.33
     */
    minorUnitVisibility: number;
    
    /**
     * Overall opacity of the grid
     * Range: 0 (transparent) to 1 (opaque)
     * @default 1
     */
    opacity: number;
    
    /**
     * Whether to pre-multiply alpha values for correct transparency blending
     * @default false
     */
    preMultiplyAlpha: boolean;
    
    /**
     * Whether to use maximum line width for grid lines
     * @default false
     */
    useMaxLine: boolean;
    
    /**
     * Opacity texture for varying transparency across the grid
     * When set, modulates grid opacity based on texture values
     */
    opacityTexture: BaseTexture | null;
    
    /**
     * Internal opacity texture reference
     * @internal
     */
    private _opacityTexture: BaseTexture | null;
    
    /**
     * Internal grid control vector containing packed grid parameters
     * x: gridRatio, y: majorUnitFrequency, z: minorUnitVisibility, w: opacity
     * @internal
     */
    private _gridControl: Vector4;

    /**
     * Creates a new grid material
     * @param name - Name identifier for the material
     * @param scene - Scene to attach the material to
     */
    constructor(name: string, scene: Scene);

    /**
     * Determines if alpha blending is needed for this material
     * @returns True if opacity < 1 or opacity texture is ready
     */
    needAlphaBlending(): boolean;

    /**
     * Determines if alpha blending is needed for a specific mesh
     * @param mesh - Mesh to check
     * @returns True if mesh visibility < 1 or material needs alpha blending
     */
    needAlphaBlendingForMesh(mesh: AbstractMesh): boolean;

    /**
     * Checks if the material is ready to render a specific submesh
     * @param mesh - Parent mesh
     * @param subMesh - Submesh to check
     * @param useInstances - Whether mesh instances are used
     * @returns True if material and shaders are ready
     */
    isReadyForSubMesh(mesh: AbstractMesh, subMesh: SubMesh, useInstances?: boolean): boolean;

    /**
     * Binds material parameters to the shader for a specific submesh
     * @param world - World transformation matrix
     * @param mesh - Mesh being rendered
     * @param subMesh - Submesh being rendered
     */
    bindForSubMesh(world: Matrix, mesh: AbstractMesh, subMesh: SubMesh): void;

    /**
     * Disposes of material resources
     * @param forceDisposeEffect - Whether to force disposal of shader effects
     * @param forceDisposeTextures - Whether to force disposal of textures
     */
    dispose(forceDisposeEffect?: boolean, forceDisposeTextures?: boolean): void;

    /**
     * Creates a copy of this material
     * @param name - Name for the cloned material
     * @returns New grid material instance with copied properties
     */
    clone(name: string): GridMaterial;

    /**
     * Serializes the material to a JSON object
     * @returns Serialized material data
     */
    serialize(): unknown;

    /**
     * Gets the class name of this material
     * @returns "GridMaterial"
     */
    getClassName(): string;

    /**
     * Parses a serialized grid material
     * @param source - Serialized material data
     * @param scene - Scene to create the material in
     * @param rootUrl - Root URL for loading assets
     * @returns Parsed grid material instance
     */
    static Parse(source: unknown, scene: Scene, rootUrl: string): GridMaterial;
}