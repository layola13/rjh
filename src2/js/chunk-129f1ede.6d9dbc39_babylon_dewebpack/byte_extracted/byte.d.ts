/**
 * glTF 1.0 Loader Enumerations
 * 
 * This module defines WebGL constant enumerations used in glTF 1.0 specification.
 * These enums map to standard WebGL constants for component types, shaders, textures,
 * culling, and blending operations.
 * 
 * @module glTFLoaderInterfaces
 * @see https://www.khronos.org/registry/glTF/specs/1.0/glTF-1.0.html
 */

/**
 * WebGL component data types for vertex attributes and accessor data.
 * Maps to gl.BYTE, gl.UNSIGNED_BYTE, etc.
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
  /** 32-bit IEEE floating point */
  FLOAT = 5126
}

/**
 * WebGL shader types.
 * Maps to gl.FRAGMENT_SHADER and gl.VERTEX_SHADER.
 */
export enum EShaderType {
  /** Fragment (pixel) shader stage */
  FRAGMENT = 35632,
  /** Vertex shader stage */
  VERTEX = 35633
}

/**
 * WebGL uniform and attribute parameter types.
 * Includes scalars, vectors, matrices, and samplers.
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
  /** 32-bit float */
  FLOAT = 5126,
  /** 2-component float vector */
  FLOAT_VEC2 = 35664,
  /** 3-component float vector */
  FLOAT_VEC3 = 35665,
  /** 4-component float vector */
  FLOAT_VEC4 = 35666,
  /** 2-component integer vector */
  INT_VEC2 = 35667,
  /** 3-component integer vector */
  INT_VEC3 = 35668,
  /** 4-component integer vector */
  INT_VEC4 = 35669,
  /** Boolean value */
  BOOL = 35670,
  /** 2-component boolean vector */
  BOOL_VEC2 = 35671,
  /** 3-component boolean vector */
  BOOL_VEC3 = 35672,
  /** 4-component boolean vector */
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
 * WebGL texture coordinate wrapping modes.
 * Defines behavior when texture coordinates fall outside [0,1] range.
 */
export enum ETextureWrapMode {
  /** Clamps coordinates to edge pixels */
  CLAMP_TO_EDGE = 33071,
  /** Repeats texture with mirroring on odd repetitions */
  MIRRORED_REPEAT = 33648,
  /** Repeats texture indefinitely */
  REPEAT = 10497
}

/**
 * WebGL texture minification and magnification filter modes.
 * Controls texture sampling and mipmap interpolation.
 */
export enum ETextureFilterType {
  /** Nearest neighbor sampling (no interpolation) */
  NEAREST = 9728,
  /** Linear interpolation between texels */
  LINEAR = 9729,
  /** Nearest texel from nearest mipmap level */
  NEAREST_MIPMAP_NEAREST = 9984,
  /** Linear interpolation from nearest mipmap level */
  LINEAR_MIPMAP_NEAREST = 9985,
  /** Nearest texel with linear interpolation between mipmap levels */
  NEAREST_MIPMAP_LINEAR = 9986,
  /** Trilinear filtering (linear interpolation in all dimensions) */
  LINEAR_MIPMAP_LINEAR = 9987
}

/**
 * WebGL internal texture formats.
 * Defines the color components stored in a texture.
 */
export enum ETextureFormat {
  /** Alpha channel only */
  ALPHA = 6406,
  /** Red, green, blue channels */
  RGB = 6407,
  /** Red, green, blue, alpha channels */
  RGBA = 6408,
  /** Grayscale luminance */
  LUMINANCE = 6409,
  /** Grayscale luminance with alpha */
  LUMINANCE_ALPHA = 6410
}

/**
 * WebGL face culling modes.
 * Determines which polygon faces are culled (not rendered).
 */
export enum ECullingType {
  /** Cull front-facing polygons */
  FRONT = 1028,
  /** Cull back-facing polygons (most common) */
  BACK = 1029,
  /** Cull both front and back faces */
  FRONT_AND_BACK = 1032
}

/**
 * WebGL blending function factors.
 * Used in blend equation to determine source and destination blend factors.
 * 
 * Final color = (src color * src factor) op (dst color * dst factor)
 */
export enum EBlendingFunction {
  /** Factor is (0, 0, 0, 0) */
  ZERO = 0,
  /** Factor is (1, 1, 1, 1) */
  ONE = 1,
  /** Factor is (Rs, Gs, Bs, As) - source color */
  SRC_COLOR = 768,
  /** Factor is (1-Rs, 1-Gs, 1-Bs, 1-As) */
  ONE_MINUS_SRC_COLOR = 769,
  /** Factor is (Rd, Gd, Bd, Ad) - destination color */
  DST_COLOR = 774,
  /** Factor is (1-Rd, 1-Gd, 1-Bd, 1-Ad) */
  ONE_MINUS_DST_COLOR = 775,
  /** Factor is (As, As, As, As) - source alpha */
  SRC_ALPHA = 770,
  /** Factor is (1-As, 1-As, 1-As, 1-As) */
  ONE_MINUS_SRC_ALPHA = 771,
  /** Factor is (Ad, Ad, Ad, Ad) - destination alpha */
  DST_ALPHA = 772,
  /** Factor is (1-Ad, 1-Ad, 1-Ad, 1-Ad) */
  ONE_MINUS_DST_ALPHA = 773,
  /** Factor is constant color (Rc, Gc, Bc, Ac) */
  CONSTANT_COLOR = 32769,
  /** Factor is (1-Rc, 1-Gc, 1-Bc, 1-Ac) */
  ONE_MINUS_CONSTANT_COLOR = 32770,
  /** Factor is constant alpha (Ac, Ac, Ac, Ac) */
  CONSTANT_ALPHA = 32771,
  /** Factor is (1-Ac, 1-Ac, 1-Ac, 1-Ac) */
  ONE_MINUS_CONSTANT_ALPHA = 32772,
  /** Factor is (f, f, f, 1) where f = min(As, 1-Ad) */
  SRC_ALPHA_SATURATE = 776
}