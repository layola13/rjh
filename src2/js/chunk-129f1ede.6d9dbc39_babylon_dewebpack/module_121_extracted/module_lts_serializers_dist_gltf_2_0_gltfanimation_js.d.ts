/**
 * Enum representing tangent types for animation keyframes
 */
enum TangentType {
  /** Input tangent (left/incoming) */
  INTANGENT = 0,
  /** Output tangent (right/outgoing) */
  OUTTANGENT = 1
}

/**
 * Interface for animation keyframe min/max frame values
 */
interface KeyFrameRange {
  /** Minimum frame number */
  min: number;
  /** Maximum frame number */
  max: number;
}

/**
 * Interface for interpolation analysis result
 */
interface InterpolationInfo {
  /** Interpolation type: LINEAR, STEP, or CUBICSPLINE */
  interpolationType: 'LINEAR' | 'STEP' | 'CUBICSPLINE';
  /** Whether animation requires baking */
  shouldBakeAnimation: boolean;
}

/**
 * Interface for animation channel target information
 */
interface AnimationInfo {
  /** Target path: translation, rotation, scale, or weights */
  animationChannelTargetPath: 'translation' | 'rotation' | 'scale' | 'weights';
  /** Data type: SCALAR, VEC3, or VEC4 */
  dataAccessorType: 'SCALAR' | 'VEC3' | 'VEC4';
  /** Whether to use quaternion representation */
  useQuaternion: boolean;
}

/**
 * Interface for created node animation data
 */
interface NodeAnimationData {
  /** Input time values */
  inputs: number[];
  /** Output animation values */
  outputs: number[][];
  /** Sampler interpolation type */
  samplerInterpolation: 'LINEAR' | 'STEP' | 'CUBICSPLINE';
  /** Minimum input time */
  inputsMin: number;
  /** Maximum input time */
  inputsMax: number;
}

/**
 * Interface for glTF animation sampler
 */
interface GLTFAnimationSampler {
  /** Interpolation mode */
  interpolation: 'LINEAR' | 'STEP' | 'CUBICSPLINE';
  /** Accessor index for input (time) values */
  input: number;
  /** Accessor index for output (keyframe) values */
  output: number;
}

/**
 * Interface for glTF animation channel target
 */
interface GLTFAnimationChannelTarget {
  /** Node index */
  node: number;
  /** Animation path */
  path: 'translation' | 'rotation' | 'scale' | 'weights';
}

/**
 * Interface for glTF animation channel
 */
interface GLTFAnimationChannel {
  /** Sampler index */
  sampler: number;
  /** Channel target */
  target: GLTFAnimationChannelTarget;
}

/**
 * Interface for glTF animation
 */
interface GLTFAnimation {
  /** Animation name */
  name: string;
  /** Animation samplers */
  samplers: GLTFAnimationSampler[];
  /** Animation channels */
  channels: GLTFAnimationChannel[];
}

/**
 * Interface for animation interpolation state
 */
interface InterpolationState {
  /** Current keyframe index */
  key: number;
  /** Repeat count for looping */
  repeatCount: number;
  /** Animation loop mode */
  loopMode: number;
}

/**
 * Utility class for glTF 2.0 animation export
 */
export class _GLTFAnimation {
  /**
   * Checks if a node is transformable (TransformNode, Camera, or Light)
   * @param node - The node to check
   * @returns True if the node is transformable
   */
  static _IsTransformable(node: unknown): boolean;

  /**
   * Creates node animation data from a Babylon animation
   * @param node - The animated node
   * @param animation - The Babylon animation
   * @param animationChannelTargetPath - The target path (translation, rotation, scale, weights)
   * @param useQuaternion - Whether to use quaternion for rotations
   * @param convertToRightHanded - Whether to convert to right-handed coordinate system
   * @param animationSampleRate - Sample rate for baked animations
   * @returns Node animation data or null if creation fails
   */
  static _CreateNodeAnimation(
    node: unknown,
    animation: unknown,
    animationChannelTargetPath: string,
    useQuaternion: boolean,
    convertToRightHanded: boolean,
    animationSampleRate: number
  ): NodeAnimationData | null;

  /**
   * Deduces animation information from a Babylon animation
   * @param animation - The Babylon animation
   * @returns Animation info or null if deduction fails
   */
  static _DeduceAnimationInfo(animation: unknown): AnimationInfo | null;

  /**
   * Creates node animations from all animations on a node
   * @param node - The animated node
   * @param runtimeGLTFAnimation - Runtime glTF animation container
   * @param animations - Output glTF animations array
   * @param nodeMap - Map of node unique IDs to glTF indices
   * @param bufferViews - glTF buffer views array
   * @param accessors - glTF accessors array
   * @param dataWriter - Binary data writer
   * @param convertToRightHanded - Whether to convert to right-handed coordinate system
   * @param animationSampleRate - Sample rate for baked animations
   * @param morphAnimationChannels - Morph target animation channels (optional)
   * @param animationFilter - Optional filter function for animations
   */
  static _CreateNodeAnimationFromNodeAnimations(
    node: unknown,
    runtimeGLTFAnimation: GLTFAnimation,
    animations: GLTFAnimation[],
    nodeMap: Record<number, number>,
    bufferViews: unknown[],
    accessors: unknown[],
    dataWriter: unknown,
    convertToRightHanded: boolean,
    animationSampleRate: number,
    morphAnimationChannels?: unknown,
    animationFilter?: (animation: unknown) => boolean
  ): void;

  /**
   * Creates morph target animations from morph target animations on a mesh
   * @param mesh - The mesh with morph targets
   * @param runtimeGLTFAnimation - Runtime glTF animation container
   * @param animations - Output glTF animations array
   * @param nodeMap - Map of node unique IDs to glTF indices
   * @param bufferViews - glTF buffer views array
   * @param accessors - glTF accessors array
   * @param dataWriter - Binary data writer
   * @param convertToRightHanded - Whether to convert to right-handed coordinate system
   * @param animationSampleRate - Sample rate for baked animations
   * @param morphAnimationChannels - Morph target animation channels (optional)
   * @param animationFilter - Optional filter function for animations
   */
  static _CreateMorphTargetAnimationFromMorphTargetAnimations(
    mesh: unknown,
    runtimeGLTFAnimation: GLTFAnimation,
    animations: GLTFAnimation[],
    nodeMap: Record<number, number>,
    bufferViews: unknown[],
    accessors: unknown[],
    dataWriter: unknown,
    convertToRightHanded: boolean,
    animationSampleRate: number,
    morphAnimationChannels?: unknown,
    animationFilter?: (animation: unknown) => boolean
  ): void;

  /**
   * Creates animations from animation groups in the scene
   * @param scene - The Babylon scene
   * @param animations - Output glTF animations array
   * @param nodeMap - Map of node unique IDs to glTF indices
   * @param bufferViews - glTF buffer views array
   * @param accessors - glTF accessors array
   * @param dataWriter - Binary data writer
   * @param morphAnimationChannels - Morph target animation channels
   * @param convertToRightHanded - Whether to convert to right-handed coordinate system
   * @param animationSampleRate - Sample rate for baked animations
   * @param animationFilter - Optional filter function for animations
   */
  static _CreateNodeAndMorphAnimationFromAnimationGroups(
    scene: unknown,
    animations: GLTFAnimation[],
    nodeMap: Record<number, number>,
    bufferViews: unknown[],
    accessors: unknown[],
    dataWriter: unknown,
    morphAnimationChannels: unknown,
    convertToRightHanded: boolean,
    animationSampleRate: number,
    animationFilter?: (animation: unknown) => boolean
  ): void;

  /**
   * Adds animation data to glTF structures
   * @param name - Animation name
   * @param glTFAnimation - Target glTF animation
   * @param node - The animated node
   * @param animation - The Babylon animation
   * @param dataAccessorType - Data accessor type (SCALAR, VEC3, VEC4)
   * @param animationChannelTargetPath - Target path (translation, rotation, scale, weights)
   * @param nodeMap - Map of node unique IDs to glTF indices
   * @param dataWriter - Binary data writer
   * @param bufferViews - glTF buffer views array
   * @param accessors - glTF accessors array
   * @param convertToRightHanded - Whether to convert to right-handed coordinate system
   * @param useQuaternion - Whether to use quaternion for rotations
   * @param animationSampleRate - Sample rate for baked animations
   * @param morphTargetCount - Number of morph targets (optional)
   */
  static _AddAnimation(
    name: string,
    glTFAnimation: GLTFAnimation,
    node: unknown,
    animation: unknown,
    dataAccessorType: 'SCALAR' | 'VEC3' | 'VEC4',
    animationChannelTargetPath: 'translation' | 'rotation' | 'scale' | 'weights',
    nodeMap: Record<number, number>,
    dataWriter: unknown,
    bufferViews: unknown[],
    accessors: unknown[],
    convertToRightHanded: boolean,
    useQuaternion: boolean,
    animationSampleRate: number,
    morphTargetCount?: number
  ): void;

  /**
   * Creates a baked animation by sampling at regular intervals
   * @param node - The animated node
   * @param animation - The Babylon animation
   * @param animationChannelTargetPath - Target path (translation, rotation, scale, weights)
   * @param minFrame - Minimum frame number
   * @param maxFrame - Maximum frame number
   * @param fps - Frames per second
   * @param sampleRate - Sample rate for baking
   * @param inputs - Output array for time values
   * @param outputs - Output array for keyframe values
   * @param keyFrameRange - Key frame range object
   * @param useQuaternion - Whether to use quaternion for rotations
   * @param convertToRightHanded - Whether to convert to right-handed coordinate system
   */
  static _CreateBakedAnimation(
    node: unknown,
    animation: unknown,
    animationChannelTargetPath: string,
    minFrame: number,
    maxFrame: number,
    fps: number,
    sampleRate: number,
    inputs: number[],
    outputs: number[][],
    keyFrameRange: KeyFrameRange,
    useQuaternion: boolean,
    convertToRightHanded: boolean
  ): void;

  /**
   * Converts a scalar factor to Vector3 or Quaternion based on component name
   * @param factor - The scalar factor value
   * @param node - The animated node
   * @param animation - The Babylon animation
   * @param animationChannelTargetPath - Target path (translation, rotation, scale, weights)
   * @param convertToRightHanded - Whether to convert to right-handed coordinate system
   * @param useQuaternion - Whether to use quaternion for rotations
   * @returns Converted Vector3 or Quaternion
   */
  static _ConvertFactorToVector3OrQuaternion(
    factor: number,
    node: unknown,
    animation: unknown,
    animationChannelTargetPath: string,
    convertToRightHanded: boolean,
    useQuaternion: boolean
  ): unknown;

  /**
   * Sets interpolated animation value at a specific time
   * @param node - The animated node
   * @param value - The interpolated value
   * @param time - The time value
   * @param animation - The Babylon animation
   * @param animationChannelTargetPath - Target path (translation, rotation, scale, weights)
   * @param quaternionCache - Cached quaternion for reuse
   * @param inputs - Array to append time values
   * @param outputs - Array to append keyframe values
   * @param useQuaternion - Whether to use quaternion for rotations
   * @param convertToRightHanded - Whether to convert to right-handed coordinate system
   */
  static _SetInterpolatedValue(
    node: unknown,
    value: unknown,
    time: number,
    animation: unknown,
    animationChannelTargetPath: string,
    quaternionCache: unknown,
    inputs: number[],
    outputs: number[][],
    useQuaternion: boolean,
    convertToRightHanded: boolean
  ): void;

  /**
   * Creates linear or step animation from keyframes
   * @param node - The animated node
   * @param animation - The Babylon animation
   * @param animationChannelTargetPath - Target path (translation, rotation, scale, weights)
   * @param frameDelta - Frame delta value
   * @param inputs - Output array for time values
   * @param outputs - Output array for keyframe values
   * @param useQuaternion - Whether to use quaternion for rotations
   * @param convertToRightHanded - Whether to convert to right-handed coordinate system
   */
  static _CreateLinearOrStepAnimation(
    node: unknown,
    animation: unknown,
    animationChannelTargetPath: string,
    frameDelta: number,
    inputs: number[],
    outputs: number[][],
    useQuaternion: boolean,
    convertToRightHanded: boolean
  ): void;

  /**
   * Creates cubic spline animation with tangents
   * @param node - The animated node
   * @param animation - The Babylon animation
   * @param animationChannelTargetPath - Target path (translation, rotation, scale, weights)
   * @param frameDelta - Frame delta value
   * @param inputs - Output array for time values
   * @param outputs - Output array for keyframe values
   * @param useQuaternion - Whether to use quaternion for rotations
   * @param convertToRightHanded - Whether to convert to right-handed coordinate system
   */
  static _CreateCubicSplineAnimation(
    node: unknown,
    animation: unknown,
    animationChannelTargetPath: string,
    frameDelta: number,
    inputs: number[],
    outputs: number[][],
    useQuaternion: boolean,
    convertToRightHanded: boolean
  ): void;

  /**
   * Gets base position, rotation or scale from a node
   * @param node - The node
   * @param animationChannelTargetPath - Target path (translation, rotation, scale)
   * @param convertToRightHanded - Whether to convert to right-handed coordinate system
   * @param useQuaternion - Whether to use quaternion for rotations
   * @returns Array of component values
   */
  static _GetBasePositionRotationOrScale(
    node: unknown,
    animationChannelTargetPath: string,
    convertToRightHanded: boolean,
    useQuaternion: boolean
  ): number[];

  /**
   * Adds a keyframe value to the outputs array
   * @param keyFrame - The animation keyframe
   * @param animation - The Babylon animation
   * @param outputs - Output array for keyframe values
   * @param animationChannelTargetPath - Target path (translation, rotation, scale, weights)
   * @param node - The animated node
   * @param convertToRightHanded - Whether to convert to right-handed coordinate system
   * @param useQuaternion - Whether to use quaternion for rotations
   */
  static _AddKeyframeValue(
    keyFrame: unknown,
    animation: unknown,
    outputs: number[][],
    animationChannelTargetPath: string,
    node: unknown,
    convertToRightHanded: boolean,
    useQuaternion: boolean
  ): void;

  /**
   * Deduces interpolation type from keyframes
   * @param keyFrames - Array of animation keyframes
   * @param animationChannelTargetPath - Target path (translation, rotation, scale, weights)
   * @param convertToRightHanded - Whether to convert to right-handed coordinate system
   * @returns Interpolation information
   */
  static _DeduceInterpolation(
    keyFrames: unknown[],
    animationChannelTargetPath: string,
    convertToRightHanded: boolean
  ): InterpolationInfo;

  /**
   * Adds spline tangent data for cubic interpolation
   * @param node - The animated node
   * @param tangentType - Tangent type (in or out)
   * @param outputs - Output array for tangent values
   * @param animationChannelTargetPath - Target path (translation, rotation, scale, weights)
   * @param interpolationType - Interpolation type
   * @param keyFrame - The animation keyframe
   * @param frameDelta - Frame delta value
   * @param convertToRightHanded - Whether to convert to right-handed coordinate system
   * @param useQuaternion - Whether to use quaternion for rotations
   */
  static _AddSplineTangent(
    node: unknown,
    tangentType: TangentType,
    outputs: number[][],
    animationChannelTargetPath: string,
    interpolationType: string,
    keyFrame: unknown,
    frameDelta: number,
    convertToRightHanded: boolean,
    useQuaternion: boolean
  ): void;

  /**
   * Calculates minimum and maximum frame numbers from keyframes
   * @param keyFrames - Array of animation keyframes
   * @returns Key frame range with min and max values
   */
  static _CalculateMinMaxKeyFrames(keyFrames: unknown[]): KeyFrameRange;
}