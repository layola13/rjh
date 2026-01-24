import { MeshGeometry, Mesh, MeshMaterial } from './core';
import { WRAP_MODES } from './constants';
import { Texture } from './textures';

/**
 * Represents a 2D point with x and y coordinates
 */
export interface IPoint {
  x: number;
  y: number;
}

/**
 * Geometry for rendering a plane mesh divided into segments
 * Used for creating flat, grid-based surfaces with customizable subdivision
 */
export class PlaneGeometry extends MeshGeometry {
  /** Width of each segment in the plane */
  segWidth: number;
  
  /** Height of each segment in the plane */
  segHeight: number;
  
  /** Total width of the plane */
  width: number;
  
  /** Total height of the plane */
  height: number;

  /**
   * Creates a new PlaneGeometry
   * @param width - Total width of the plane (default: 100)
   * @param height - Total height of the plane (default: 100)
   * @param segWidth - Number of horizontal segments (default: 10)
   * @param segHeight - Number of vertical segments (default: 10)
   */
  constructor(width?: number, height?: number, segWidth?: number, segHeight?: number);

  /**
   * Builds the geometry data (vertices, UVs, and indices)
   * Called internally when geometry needs to be regenerated
   */
  build(): void;
}

/**
 * Geometry for rendering a rope-like mesh from a series of points
 * Creates a ribbon that follows a path defined by control points
 */
export class RopeGeometry extends MeshGeometry {
  /** Array of points defining the rope's path */
  points: IPoint[];
  
  /** Width of the rope */
  width: number;
  
  /** Scale factor for texture tiling (0 = stretch, >0 = repeat) */
  textureScale: number;

  /**
   * Creates a new RopeGeometry
   * @param width - Width of the rope (default: 200)
   * @param points - Array of points defining the rope's path
   * @param textureScale - Texture tiling scale (default: 0)
   */
  constructor(width?: number, points?: IPoint[], textureScale?: number);

  /**
   * Rebuilds the entire geometry including vertices, UVs, and indices
   */
  build(): void;

  /**
   * Updates only the vertex positions based on current points
   * More efficient than rebuild when only positions change
   */
  updateVertices(): void;

  /**
   * Updates the geometry, choosing between full rebuild or vertex update
   * based on textureScale setting
   */
  update(): void;
}

/**
 * A simple rope mesh that follows a path of points
 * Automatically updates when texture or points change
 */
export class SimpleRope extends Mesh {
  /** Whether to automatically update geometry on render */
  autoUpdate: boolean;

  /**
   * Creates a new SimpleRope
   * @param texture - Texture to apply to the rope
   * @param points - Array of points defining the rope's path
   * @param textureScale - Texture tiling scale (default: 0)
   */
  constructor(texture: Texture, points: IPoint[], textureScale?: number);

  /**
   * Internal render method
   * @param renderer - The renderer instance
   */
  protected _render(renderer: unknown): void;
}

/**
 * A simple plane mesh with subdivided geometry
 * Useful for displacement effects or terrain-like surfaces
 */
export class SimplePlane extends Mesh {
  /** The texture applied to the plane */
  texture: Texture;

  /**
   * Creates a new SimplePlane
   * @param texture - Texture to apply to the plane
   * @param verticesX - Number of horizontal vertices (default: 10)
   * @param verticesY - Number of vertical vertices (default: 10)
   */
  constructor(texture: Texture, verticesX?: number, verticesY?: number);

  /**
   * Called when the texture is updated
   * Rebuilds geometry to match new texture dimensions
   */
  protected textureUpdated(): void;

  /**
   * Internal render method
   * @param renderer - The renderer instance
   */
  protected _render(renderer: unknown): void;
}

/**
 * A basic mesh with customizable geometry
 * Provides direct access to vertex data for manual manipulation
 */
export class SimpleMesh extends Mesh {
  /** Whether to automatically update vertex buffer on render */
  autoUpdate: boolean;

  /** Direct access to vertex position data */
  vertices: Float32Array;

  /**
   * Creates a new SimpleMesh
   * @param texture - Texture to apply (default: Texture.EMPTY)
   * @param vertices - Vertex position data
   * @param uvs - Texture coordinate data
   * @param indices - Index buffer data
   * @param drawMode - WebGL draw mode
   */
  constructor(
    texture?: Texture,
    vertices?: Float32Array,
    uvs?: Float32Array,
    indices?: Uint16Array,
    drawMode?: number
  );

  /**
   * Internal render method
   * @param renderer - The renderer instance
   */
  protected _render(renderer: unknown): void;
}

/**
 * A mesh that uses 9-slice scaling for UI elements
 * Allows scaling without distorting corners and edges
 */
export class NineSlicePlane extends SimplePlane {
  /** Direct access to vertex position data */
  readonly vertices: Float32Array;

  /** Total width of the plane */
  width: number;

  /** Total height of the plane */
  height: number;

  /** Width of the left slice (unscaled region) */
  leftWidth: number;

  /** Width of the right slice (unscaled region) */
  rightWidth: number;

  /** Height of the top slice (unscaled region) */
  topHeight: number;

  /** Height of the bottom slice (unscaled region) */
  bottomHeight: number;

  /**
   * Creates a new NineSlicePlane
   * @param texture - Texture to apply
   * @param leftWidth - Width of left unscaled region (default: 10)
   * @param topHeight - Height of top unscaled region (default: 10)
   * @param rightWidth - Width of right unscaled region (default: 10)
   * @param bottomHeight - Height of bottom unscaled region (default: 10)
   */
  constructor(
    texture: Texture,
    leftWidth?: number,
    topHeight?: number,
    rightWidth?: number,
    bottomHeight?: number
  );

  /**
   * Called when the texture is updated
   * Recalculates UV coordinates and vertex positions
   */
  protected textureUpdated(): void;

  /**
   * Updates the vertical positions of vertices
   * Applies scaling while preserving edge regions
   */
  updateHorizontalVertices(): void;

  /**
   * Updates the horizontal positions of vertices
   * Applies scaling while preserving edge regions
   */
  updateVerticalVertices(): void;

  /**
   * Calculates the minimum scale factor to prevent over-compression
   * @returns Scale factor between 0 and 1
   */
  protected _getMinScale(): number;

  /**
   * Refreshes all geometry data based on current dimensions
   * Called internally when any dimension property changes
   */
  protected _refresh(): void;
}