/**
 * Babylon.js Materials Library - Legacy module exports
 * 
 * This module re-exports all materials from the main materials package
 * and ensures backward compatibility by attaching them to the global BABYLON namespace.
 */

// ============================================================================
// Material Classes
// ============================================================================

/**
 * Cell shading material that creates a cartoon-like toon shading effect
 */
export class CellMaterial {}

/**
 * Base class for creating custom materials with shader code injection
 */
export class CustomMaterial {}

/**
 * Structure definition for organizing custom shader code fragments
 */
export class CustomShaderStructure {}

/**
 * Procedural material that simulates animated fire effect
 */
export class FireMaterial {}

/**
 * Material that renders fur or hair-like effects using shell texturing technique
 */
export class FurMaterial {}

/**
 * Material with gradient color transitions
 */
export class GradientMaterial {}

/**
 * Material that renders a configurable grid pattern, useful for floor planes
 */
export class GridMaterial {}

/**
 * Procedural material simulating flowing lava with animated distortion
 */
export class LavaMaterial {}

/**
 * Material that blends multiple textures based on mix maps
 */
export class MixMaterial {}

/**
 * Material that visualizes surface normals as RGB colors (debugging utility)
 */
export class NormalMaterial {}

/**
 * PBR (Physically Based Rendering) material with custom shader injection support
 */
export class PBRCustomMaterial {}

/**
 * Shader code parts for customizing albedo/diffuse calculations
 */
export class ShaderAlebdoParts {}

/**
 * Shader code parts for special rendering effects
 */
export class ShaderSpecialParts {}

/**
 * Material that only renders shadows, making the mesh invisible except for cast shadows
 */
export class ShadowOnlyMaterial {}

/**
 * Simplified material with basic lighting and color properties
 */
export class SimpleMaterial {}

/**
 * Procedural sky material with atmospheric scattering simulation
 */
export class SkyMaterial {}

/**
 * Multi-texture terrain material for blending ground textures based on splatmaps
 */
export class TerrainMaterial {}

/**
 * Material that projects textures from three orthogonal planes (X, Y, Z axes)
 * Useful for objects without proper UV mapping
 */
export class TriPlanarMaterial {}

/**
 * Realistic water material with waves, reflection, and refraction
 */
export class WaterMaterial {}

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Global namespace containing all exported materials
 */
export interface MaterialsNamespace {
  CellMaterial: typeof CellMaterial;
  CustomMaterial: typeof CustomMaterial;
  CustomShaderStructure: typeof CustomShaderStructure;
  FireMaterial: typeof FireMaterial;
  FurMaterial: typeof FurMaterial;
  GradientMaterial: typeof GradientMaterial;
  GridMaterial: typeof GridMaterial;
  LavaMaterial: typeof LavaMaterial;
  MixMaterial: typeof MixMaterial;
  NormalMaterial: typeof NormalMaterial;
  PBRCustomMaterial: typeof PBRCustomMaterial;
  ShaderAlebdoParts: typeof ShaderAlebdoParts;
  ShaderSpecialParts: typeof ShaderSpecialParts;
  ShadowOnlyMaterial: typeof ShadowOnlyMaterial;
  SimpleMaterial: typeof SimpleMaterial;
  SkyMaterial: typeof SkyMaterial;
  TerrainMaterial: typeof TerrainMaterial;
  TriPlanarMaterial: typeof TriPlanarMaterial;
  WaterMaterial: typeof WaterMaterial;
}

/**
 * Global BABYLON namespace extension
 */
declare global {
  interface Window {
    BABYLON?: Partial<MaterialsNamespace>;
  }

  namespace NodeJS {
    interface Global {
      BABYLON?: Partial<MaterialsNamespace>;
    }
  }
}