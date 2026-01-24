/**
 * glTF 1.0 Loader Interfaces
 * Defines enumerations for WebGL constants used in glTF 1.0 specification
 * @module glTFLoaderInterfaces
 */

/**
 * Component data types for vertex attributes and accessor elements
 * Corresponds to WebGL data type constants
 */
export enum EComponentType {
  /** Signed 8-bit integer (-128 to 127) */
  BYTE = 5120,
  /** Unsigned 8-bit integer (0 to 255) */
  UNSIGNED_BYTE = 5121,
  /** Signed 16-bit integer (-32768 to 32767) */
  SHORT = 5122,
  /** Unsigned 16-bit integer (0 to 65535) */
  UNSIGNED_SHORT = 5123,
  /** 32-bit floating point number */
  FLOAT = 5126
}

/**
 * Shader types in WebGL pipeline
 */
export enum EShaderType {
  /** Fragment (pixel) shader stage */
  FRAGMENT = 35632,
  /** Vertex shader stage */
  VERTEX = 35633
}

/**
 * Parameter data types for shader uniforms and attributes
 * Extended set including scalar, vector, matrix, and sampler types
 */
export enum EParameterType {
  /** Signed 8-bit integer */
  BYTE = 5120,
  /** Unsigned 8-bit integer */
  UNSIGNED_BYTE = 5121,
  /** Signed 16-bit integer */
  SHORT = 5122,
  /** Unsigned 16-bit integer */
  UNSIGNED_SHORT = 5123,
  /** Signed 32-bit integer */
  INT = 5124,
  /** Unsigned 32-bit integer */
  UNSIGNED_INT = 5125,
  /** 32-bit floating point number */
  FLOAT = 5126,
  /** 2D float vector */
  FLOAT_VEC2 = 35664,
  /** 3D float vector */
  FLOAT_VEC3 = 35665,
  /** 4D float vector */
  FLOAT_VEC4 = 35666,
  /** 2D integer vector */
  INT_VEC2 = 35667,
  /** 3D integer vector */
  INT_VEC3 = 35668,
  /** 4D integer vector */
  INT_VEC4 = 35669,
  /** Boolean value */
  BOOL = 35670,
  /** 2D boolean vector */
  BOOL_VEC2 = 35671,
  /** 3D boolean vector */
  BOOL_VEC3 = 35672,
  /** 4D boolean vector */
  BOOL_VEC4 = 35673,
  /** 2x2 float matrix */
  FLOAT_MAT2 = 35674,
  /** 3x3 float matrix */
  FLOAT_MAT3 = 35675,
  /** 4x4 float matrix */
  FLOAT_MAT4 = 35676,
  /** 2D texture sampler */
  SAMPLER_2D = 35678
}

/**
 * Texture coordinate wrapping modes
 * Defines behavior when texture coordinates fall outside [0, 1] range
 */
export enum ETextureWrapMode {
  /** Clamps coordinates to edge, repeating edge pixels */
  CLAMP_TO_EDGE = 33071,
  /** Mirrors texture at every integer boundary */
  MIRRORED_REPEAT = 33648,
  /** Repeats texture, ignoring integer part of coordinates */
  REPEAT = 10497
}

/**
 * Texture filtering modes for minification and magnification
 */
export enum ETextureFilterType {
  /** Nearest neighbor filtering (blocky appearance) */
  NEAREST = 9728,
  /** Linear interpolation filtering (smooth appearance) */
  LINEAR = 9729,
  /** Nearest filtering with nearest mipmap selection */
  NEAREST_MIPMAP_NEAREST = 9984,
  /** Linear filtering with nearest mipmap selection */
  LINEAR_MIPMAP_NEAREST = 9985,
  /** Nearest filtering with linear mipmap interpolation */
  NEAREST_MIPMAP_LINEAR = 9986,
  /** Linear filtering with linear mipmap interpolation (trilinear) */
  LINEAR_MIPMAP_LINEAR = 9987
}

/**
 * Texture internal formats
 * Defines pixel data format and component layout
 */
export enum ETextureFormat {
  /** Alpha channel only */
  ALPHA = 6406,
  /** Red, green, blue channels */
  RGB = 6407,
  /** Red, green, blue, alpha channels */
  RGBA = 6408,
  /** Single luminance (grayscale) channel */
  LUMINANCE = 6409,
  /** Luminance and alpha channels */
  LUMINANCE_ALPHA = 6410
}

/**
 * Face culling modes for polygon rendering
 * Determines which triangle faces to discard
 */
export enum ECullingType {
  /** Cull front-facing polygons */
  FRONT = 1028,
  /** Cull back-facing polygons */
  BACK = 1029,
  /** Cull both front and back-facing polygons */
  FRONT_AND_BACK = 1032
}

/**
 * Blending function constants
 * Defines blend factors for source and destination color/alpha
 */
export enum EBlendingFunction {
  /** Blend factor of (0, 0, 0, 0) */
  ZERO = 0,
  /** Blend factor of (1, 1, 1, 1) */
  ONE = 1,
  /** Blend factor of source color (Rs, Gs, Bs, As) */
  SRC_COLOR = 768,
  /** Blend factor of (1-Rs, 1-Gs, 1-Bs, 1-As) */
  ONE_MINUS_SRC_COLOR = 769,
  /** Blend factor of destination color (Rd, Gd, Bd, Ad) */
  DST_COLOR = 774,
  /** Blend factor of (1-Rd, 1-Gd, 1-Bd, 1-Ad) */
  ONE_MINUS_DST_COLOR = 775,
  /** Blend factor of source alpha (As, As, As, As) */
  SRC_ALPHA = 770,
  /** Blend factor of (1-As, 1-As, 1-As, 1-As) */
  ONE_MINUS_SRC_ALPHA = 771,
  /** Blend factor of destination alpha (Ad, Ad, Ad, Ad) */
  DST_ALPHA = 772,
  /** Blend factor of (1-Ad, 1-Ad, 1-Ad, 1-Ad) */
  ONE_MINUS_DST_ALPHA = 773,
  /** Blend factor from constant color (Rc, Gc, Bc, Ac) */
  CONSTANT_COLOR = 32769,
  /** Blend factor of (1-Rc, 1-Gc, 1-Bc, 1-Ac) */
  ONE_MINUS_CONSTANT_COLOR = 32770,
  /** Blend factor from constant alpha (Ac, Ac, Ac, Ac) */
  CONSTANT_ALPHA = 32771,
  /** Blend factor of (1-Ac, 1-Ac, 1-Ac, 1-Ac) */
  ONE_MINUS_CONSTANT_ALPHA = 32772,
  /** Blend factor of min(As, 1-Ad) for RGB, 1 for alpha */
  SRC_ALPHA_SATURATE = 776
}