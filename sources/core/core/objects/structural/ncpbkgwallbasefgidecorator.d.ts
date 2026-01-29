import { Matrix3, Vector2, MathUtil } from './math-library';
import { NCParametricModelFGIDecorator } from './nc-parametric-model-fgi-decorator';

/**
 * UV box defining texture coordinate boundaries
 */
export interface UvBox {
  /** Minimum UV coordinates */
  min: { x: number; y: number };
  /** Maximum UV coordinates */
  max: { x: number; y: number };
}

/**
 * UV transformation input parameters
 */
export interface UvTransformInput {
  /** Source UV bounding box */
  srcUvBox: UvBox;
}

/**
 * Material properties for UV transformation
 */
export interface MaterialProperties {
  /** Rotation angle in degrees */
  rotation: number;
  /** Tile width */
  tileSize_x: number;
  /** Tile height */
  tileSize_y: number;
  /** Horizontal offset */
  offsetX: number;
  /** Vertical offset */
  offsetY: number;
  /** Horizontal scale factor */
  scaleX: number;
  /** Vertical scale factor */
  scaleY: number;
  /** Whether to fit texture to UV box dimensions */
  fit: boolean;
}

/**
 * Base decorator for background wall Functional Graphics Interface (FGI).
 * Handles UV coordinate transformations for texture mapping on parametric wall models.
 */
export declare class NCPBkgWallBaseFGIDecorator extends NCParametricModelFGIDecorator {
  /** Internal reference to the parametric model */
  private readonly _model: unknown;

  /**
   * Creates a new background wall FGI decorator
   * @param model - The parametric model to decorate
   */
  constructor(model: unknown);

  /**
   * Computes UV transformation matrix (default version)
   * @param input - UV transformation input parameters
   * @param materialId - Material identifier or index
   * @returns 3x3 transformation matrix for UV coordinates
   */
  getUvTransform(input: UvTransformInput, materialId: unknown): Matrix3;

  /**
   * Computes UV transformation matrix (legacy version 0)
   * @param input - UV transformation input parameters
   * @param materialId - Material identifier or index
   * @returns 3x3 transformation matrix for UV coordinates
   */
  getUvTransformV0(input: UvTransformInput, materialId: unknown): Matrix3;

  /**
   * Internal implementation of UV transformation (version 0 algorithm).
   * Applies scale, rotation, translation and optional fitting transformations.
   * @param input - UV transformation input parameters
   * @param materialId - Material identifier or index
   * @returns 3x3 transformation matrix for UV coordinates
   */
  private _getUvTransformV0(input: UvTransformInput, materialId: unknown): Matrix3;

  /**
   * Internal implementation of UV transformation (version 1 algorithm)
   * @param input - UV transformation input parameters
   * @param materialId - Material identifier or index
   * @returns 3x3 transformation matrix for UV coordinates
   */
  private _getUvTransformV1(input: UvTransformInput, materialId: unknown): Matrix3;

  /**
   * Retrieves material properties by identifier
   * @param materialId - Material identifier or index
   * @returns Material properties object
   */
  private _getMaterialObj(materialId: unknown): MaterialProperties;
}