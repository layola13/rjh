/**
 * Animation property information for glTF loader
 */
export interface IAnimationPropertyInfo {
  /** Animation data type (e.g., VECTOR3, QUATERNION, FLOAT) */
  type: number;
  
  /** Target property name (e.g., "position", "rotation", "scaling") */
  name: string;
  
  /** 
   * Extract and convert animation value from raw data
   * @param target - Target object being animated
   * @param data - Raw animation data array
   * @param offset - Offset index in data array
   * @param scale - Scale factor to apply
   * @returns Converted animation value
   */
  getValue: (target: unknown, data: ArrayLike<number>, offset: number, scale: number) => unknown;
  
  /**
   * Get the number of elements per keyframe for this property
   * @param target - Target object being animated
   * @returns Number of array elements (stride)
   */
  getStride: (target: unknown) => number;
}

/**
 * Base class for animation property information
 */
export declare class AnimationPropertyInfo implements IAnimationPropertyInfo {
  type: number;
  name: string;
  getValue: (target: unknown, data: ArrayLike<number>, offset: number, scale: number) => unknown;
  getStride: (target: unknown) => number;

  constructor(
    type: number,
    name: string,
    getValue: (target: unknown, data: ArrayLike<number>, offset: number, scale: number) => unknown,
    getStride: (target: unknown) => number
  );

  /**
   * Build a Babylon.js Animation from keyframe data
   * @param animationName - Name of the animation
   * @param frameRate - Frames per second
   * @param keys - Array of animation keyframes
   * @returns Constructed Animation instance
   */
  protected _buildAnimation(animationName: string, frameRate: number, keys: unknown[]): unknown;
}

/**
 * Animation property info for TransformNode properties (position, rotation, scale)
 */
export declare class TransformNodeAnimationPropertyInfo extends AnimationPropertyInfo {
  /**
   * Build animations and apply them to the transform node
   * @param target - Target object containing _babylonTransformNode
   * @param animationName - Base name for the animation
   * @param frameRate - Frames per second
   * @param keys - Array of animation keyframes
   * @param callback - Callback invoked with the node and created animation
   */
  buildAnimations(
    target: { _babylonTransformNode: unknown },
    animationName: string,
    frameRate: number,
    keys: unknown[],
    callback: (node: unknown, animation: unknown) => void
  ): void;
}

/**
 * Animation property info for morph target weights
 */
export declare class WeightAnimationPropertyInfo extends AnimationPropertyInfo {
  /**
   * Build weight animations for all morph targets
   * @param target - Target object with _numMorphTargets and _primitiveBabylonMeshes
   * @param animationName - Base name for animations
   * @param frameRate - Frames per second
   * @param keys - Array of keyframes with value arrays
   * @param callback - Callback invoked with each morph target and its animation
   */
  buildAnimations(
    target: {
      _numMorphTargets: number;
      _primitiveBabylonMeshes?: Array<{
        morphTargetManager?: {
          getTarget(index: number): unknown;
        };
      }>;
    },
    animationName: string,
    frameRate: number,
    keys: Array<{
      frame: number;
      value: number[];
      inTangent?: number[];
      outTangent?: number[];
      interpolation?: unknown;
    }>,
    callback: (target: unknown, animation: unknown) => void
  ): void;
}

/**
 * Extract Vector3 from data array
 * @param target - Target object (unused)
 * @param data - Source data array
 * @param offset - Starting index
 * @param scale - Scale factor
 * @returns Vector3 scaled by the given factor
 */
export declare function getVector3(
  target: unknown,
  data: ArrayLike<number>,
  offset: number,
  scale: number
): unknown;

/**
 * Extract Quaternion from data array
 * @param target - Target object (unused)
 * @param data - Source data array
 * @param offset - Starting index
 * @param scale - Scale factor
 * @returns Quaternion scaled by the given factor
 */
export declare function getQuaternion(
  target: unknown,
  data: ArrayLike<number>,
  offset: number,
  scale: number
): unknown;

/**
 * Extract morph target weights from data array
 * @param target - Target object with _numMorphTargets property
 * @param data - Source data array
 * @param offset - Starting index
 * @param scale - Scale factor
 * @returns Array of scaled weight values
 */
export declare function getWeights(
  target: { _numMorphTargets: number },
  data: ArrayLike<number>,
  offset: number,
  scale: number
): number[];

/**
 * Predefined animation data mappings for glTF node animation channels
 */
export declare const nodeAnimationData: {
  /** Translation (position) animation info */
  translation: TransformNodeAnimationPropertyInfo[];
  
  /** Rotation (quaternion) animation info */
  rotation: TransformNodeAnimationPropertyInfo[];
  
  /** Scale animation info */
  scale: TransformNodeAnimationPropertyInfo[];
  
  /** Morph target weights animation info */
  weights: WeightAnimationPropertyInfo[];
};