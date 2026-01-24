/**
 * Mesh rendering module providing geometry, material, and batch UV management for WebGL meshes.
 * @module MeshModule
 */

import { State, Program, Shader, TextureMatrix, Buffer, Geometry } from './rendering-core';
import { Point, Polygon, Matrix } from './math';
import { DRAW_MODES, BLEND_MODES, TYPES } from './constants';
import { Container } from './display';
import { settings } from './settings';
import { premultiplyTintToRgba } from './utils';
import type { Texture, BaseTexture } from './textures';

/**
 * Manages UV coordinates for batched mesh rendering with texture matrix transformations.
 */
export declare class MeshBatchUvs {
    /** The buffer containing UV coordinates */
    uvBuffer: Buffer;
    
    /** Matrix for transforming UV coordinates */
    uvMatrix: TextureMatrix;
    
    /** Transformed UV data ready for rendering */
    data: Float32Array | null;
    
    /** Internal buffer update tracking ID */
    private _bufferUpdateId: number;
    
    /** Internal texture matrix update tracking ID */
    private _textureUpdateId: number;
    
    /** Incremented when UVs are updated */
    private _updateID: number;

    /**
     * Creates a new MeshBatchUvs instance.
     * @param uvBuffer - Buffer containing original UV coordinates
     * @param uvMatrix - Matrix for UV transformation
     */
    constructor(uvBuffer: Buffer, uvMatrix: TextureMatrix);

    /**
     * Updates the transformed UV data if the buffer or matrix has changed.
     * @param forceUpdate - Force update even if no changes detected
     */
    update(forceUpdate?: boolean): void;
}

/**
 * Configuration options for MeshMaterial.
 */
export interface MeshMaterialOptions {
    /** Tint color applied to the mesh (default: 0xFFFFFF) */
    tint?: number;
    
    /** Alpha transparency (default: 1.0) */
    alpha?: number;
    
    /** Plugin name for batch rendering (default: "batch") */
    pluginName?: string;
    
    /** Custom shader program */
    program?: Program;
    
    /** Additional shader uniforms */
    uniforms?: Record<string, unknown>;
}

/**
 * Material shader for mesh rendering with texture, tint, and alpha support.
 */
export declare class MeshMaterial extends Shader {
    /** UV transformation matrix */
    uvMatrix: TextureMatrix;
    
    /** Whether this material can be batched for performance */
    batchable: boolean;
    
    /** Name of the renderer plugin to use */
    pluginName: string;
    
    /** Internal flag tracking color uniform changes */
    private _colorDirty: boolean;
    
    /** Cached alpha value */
    private _alpha: number;
    
    /** Cached tint value */
    private _tint: number;
    
    /** Pre-computed RGB tint components */
    _tintRGB: number;

    /**
     * Creates a new MeshMaterial.
     * @param texture - Texture to apply to the mesh
     * @param options - Material configuration options
     */
    constructor(texture: Texture, options?: MeshMaterialOptions);

    /** The texture applied to this material */
    get texture(): Texture;
    set texture(value: Texture);

    /** Alpha transparency (0.0 to 1.0) */
    get alpha(): number;
    set alpha(value: number);

    /** Tint color as a hexadecimal value */
    get tint(): number;
    set tint(value: number);

    /**
     * Updates shader uniforms including color and UV matrix.
     */
    update(): void;
}

/**
 * Geometry data for meshes containing vertex positions, UVs, and indices.
 */
export declare class MeshGeometry extends Geometry {
    /** Internal update tracking ID */
    private _updateId: number;

    /**
     * Creates a new MeshGeometry.
     * @param vertices - Float32Array of vertex positions [x, y, x, y, ...]
     * @param uvs - Float32Array of UV coordinates [u, v, u, v, ...]
     * @param indices - Uint16Array of triangle indices
     */
    constructor(vertices: Float32Array, uvs: Float32Array, indices: Uint16Array);

    /** 
     * Returns the update ID of the vertex position buffer.
     * Used to track when vertices need recalculation.
     */
    get vertexDirtyId(): number;
}

/**
 * A renderable mesh combining geometry, material, and transform.
 * Supports both batched and non-batched rendering modes.
 */
export declare class Mesh extends Container {
    /** Maximum vertices for automatic batching */
    static readonly BATCHABLE_SIZE: number;

    /** Geometry defining the mesh shape */
    geometry: MeshGeometry;
    
    /** Shader/material for rendering */
    shader: MeshMaterial;
    
    /** WebGL render state (blend mode, depth test, etc.) */
    state: State;
    
    /** Drawing mode (TRIANGLES, TRIANGLE_STRIP, etc.) */
    drawMode: DRAW_MODES;
    
    /** Starting index in the index buffer */
    start: number;
    
    /** Number of indices to draw */
    size: number;
    
    /** Cached UV coordinates for rendering */
    uvs: Float32Array | null;
    
    /** Cached index data for rendering */
    indices: Uint16Array | null;
    
    /** Transformed vertex positions in world space */
    vertexData: Float32Array;
    
    /** Tracks last geometry update for vertex recalculation */
    vertexDirty: number;
    
    /** Tracks last transform update */
    private _transformID: number;
    
    /** Whether to round pixel positions */
    private _roundPixels: boolean;
    
    /** Batch UV manager for texture transformations */
    batchUvs: MeshBatchUvs | null;
    
    /** Cached texture reference for batching */
    _texture: Texture | undefined;
    
    /** Cached tint RGB for batching */
    _tintRGB: number | undefined;

    /**
     * Creates a new Mesh.
     * @param geometry - Mesh geometry data
     * @param shader - Material/shader for rendering
     * @param state - WebGL state configuration
     * @param drawMode - Drawing mode (default: TRIANGLES)
     */
    constructor(
        geometry: MeshGeometry,
        shader: MeshMaterial,
        state?: State,
        drawMode?: DRAW_MODES
    );

    /** The UV coordinate buffer from geometry */
    get uvBuffer(): Buffer;

    /** The vertex position buffer from geometry */
    get verticesBuffer(): Buffer;

    /** Alias for shader property */
    get material(): MeshMaterial;
    set material(value: MeshMaterial);

    /** Blend mode for rendering */
    get blendMode(): BLEND_MODES;
    set blendMode(value: BLEND_MODES);

    /** Whether to round vertices to whole pixels */
    get roundPixels(): boolean;
    set roundPixels(value: boolean);

    /** Tint color applied to the mesh */
    get tint(): number;
    set tint(value: number);

    /** The texture being rendered */
    get texture(): Texture;
    set texture(value: Texture);

    /**
     * Renders the mesh, choosing between batched or default rendering.
     * @param renderer - WebGL renderer
     * @internal
     */
    protected _render(renderer: unknown): void;

    /**
     * Standard mesh rendering using dedicated draw calls.
     * @param renderer - WebGL renderer
     * @internal
     */
    protected _renderDefault(renderer: unknown): void;

    /**
     * Optimized batch rendering for small meshes.
     * @param renderer - WebGL renderer
     * @internal
     */
    protected _renderToBatch(renderer: unknown): void;

    /**
     * Transforms vertex positions from local to world space.
     * Applies rounding if roundPixels is enabled.
     */
    calculateVertices(): void;

    /**
     * Calculates final UV coordinates with texture matrix transformation.
     */
    calculateUvs(): void;

    /**
     * Calculates axis-aligned bounding box from transformed vertices.
     * @internal
     */
    protected _calculateBounds(): void;

    /**
     * Tests if a point intersects any triangle in the mesh.
     * @param point - Point to test in world coordinates
     * @returns True if point is inside the mesh
     */
    containsPoint(point: Point): boolean;

    /**
     * Cleans up resources and decrements geometry reference count.
     * @param options - Destruction options
     */
    destroy(options?: unknown): void;
}