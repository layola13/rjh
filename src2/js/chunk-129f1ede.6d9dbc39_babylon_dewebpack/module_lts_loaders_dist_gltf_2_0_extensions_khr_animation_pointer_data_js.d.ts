/**
 * KHR_animation_pointer extension data structures and animation property definitions.
 * This module defines the tree structure for mapping glTF animation pointers to Babylon.js properties.
 * @module KHR_animation_pointer.data
 */

import { Animation, Color3 } from '@babylonjs/core';
import { AnimationPropertyInfo } from './glTFLoaderAnimation';

/**
 * Converts an array of color values to a Color3 object and applies scaling.
 * @param target - The target object (unused in implementation)
 * @param values - Array of color component values
 * @param offset - Offset index in the values array
 * @param scale - Scale factor to apply to the color
 * @returns Scaled Color3 instance
 */
declare function createScaledColor3(
  target: unknown,
  values: ArrayLike<number>,
  offset: number,
  scale: number
): Color3;

/**
 * Extracts a single float value from an array and applies scaling.
 * @param target - The target object (unused in implementation)
 * @param values - Array of numeric values
 * @param offset - Index to read from
 * @param scale - Scale factor to apply
 * @returns Scaled float value
 */
declare function getScaledFloat(
  target: unknown,
  values: ArrayLike<number>,
  offset: number,
  scale: number
): number;

/**
 * Extracts a negated float value from an array and applies scaling.
 * @param target - The target object (unused in implementation)
 * @param values - Array of numeric values
 * @param offset - Index to read from
 * @param scale - Scale factor to apply
 * @returns Negated and scaled float value
 */
declare function getNegatedScaledFloat(
  target: unknown,
  values: ArrayLike<number>,
  offset: number,
  scale: number
): number;

/**
 * Extracts a float value from offset+1 position and applies scaling.
 * @param target - The target object (unused in implementation)
 * @param values - Array of numeric values
 * @param offset - Base index (reads from offset+1)
 * @param scale - Scale factor to apply
 * @returns Scaled float value from offset+1
 */
declare function getOffsetScaledFloat(
  target: unknown,
  values: ArrayLike<number>,
  offset: number,
  scale: number
): number;

/**
 * Extracts a float value, doubles it, and applies scaling.
 * @param target - The target object (unused in implementation)
 * @param values - Array of numeric values
 * @param offset - Index to read from
 * @param scale - Scale factor to apply
 * @returns Scaled float value multiplied by 2
 */
declare function getDoubledScaledFloat(
  target: unknown,
  values: ArrayLike<number>,
  offset: number,
  scale: number
): number;

/**
 * Creates animation property mappings for texture transform properties.
 * @param texturePropertyPath - Base property path for the texture (e.g., "albedoTexture")
 * @returns Object containing scale, offset, and rotation animation property definitions
 */
declare function createTextureTransformAnimations(texturePropertyPath: string): {
  scale: AnimationPropertyInfo[];
  offset: AnimationPropertyInfo[];
  rotation: AnimationPropertyInfo[];
};

/**
 * Animation property info for camera-specific properties.
 * Extends base AnimationPropertyInfo to handle camera animations.
 */
declare class CameraAnimationPropertyInfo extends AnimationPropertyInfo {
  /**
   * Builds animations for camera targets.
   * @param loader - The glTF loader context
   * @param animationContext - Animation channel context
   * @param babylonScene - Babylon.js scene instance
   * @param animatable - Target animatable object
   * @param onAnimationCreated - Callback invoked when animation is created
   */
  buildAnimations(
    loader: unknown,
    animationContext: unknown,
    babylonScene: unknown,
    animatable: unknown,
    onAnimationCreated: (target: unknown, animation: Animation) => void
  ): void;
}

/**
 * Animation property info for material-specific properties.
 * Extends base AnimationPropertyInfo to handle material animations across all material data.
 */
declare class MaterialAnimationPropertyInfo extends AnimationPropertyInfo {
  /**
   * Builds animations for all materials in the loader's material data.
   * @param loader - The glTF loader context
   * @param animationContext - Animation channel context
   * @param babylonScene - Babylon.js scene instance
   * @param animatable - Target animatable object
   * @param onAnimationCreated - Callback invoked when animation is created for each material
   */
  buildAnimations(
    loader: unknown,
    animationContext: unknown,
    babylonScene: unknown,
    animatable: unknown,
    onAnimationCreated: (target: unknown, animation: Animation) => void
  ): void;
}

/**
 * Animation property info for light-specific properties.
 * Extends base AnimationPropertyInfo to handle light animations.
 */
declare class LightAnimationPropertyInfo extends AnimationPropertyInfo {
  /**
   * Builds animations for light targets.
   * @param loader - The glTF loader context
   * @param animationContext - Animation channel context
   * @param babylonScene - Babylon.js scene instance
   * @param animatable - Target animatable object
   * @param onAnimationCreated - Callback invoked when animation is created
   */
  buildAnimations(
    loader: unknown,
    animationContext: unknown,
    babylonScene: unknown,
    animatable: unknown,
    onAnimationCreated: (target: unknown, animation: Animation) => void
  ): void;
}

/**
 * Tree structure mapping glTF animation pointer paths to Babylon.js animation properties.
 * This defines how animation data from glTF files should be applied to Babylon.js objects.
 */
export declare const animationPointerTree: {
  /** Node animations (transforms, etc.) */
  nodes: {
    __array__: Record<string, unknown> & { __target__: true };
  };

  /** Material property animations */
  materials: {
    __array__: {
      __target__: true;
      /** PBR Metallic-Roughness material properties */
      pbrMetallicRoughness: {
        baseColorFactor: MaterialAnimationPropertyInfo[];
        metallicFactor: MaterialAnimationPropertyInfo[];
        roughnessFactor: MaterialAnimationPropertyInfo[];
        baseColorTexture: {
          extensions: {
            KHR_texture_transform: ReturnType<typeof createTextureTransformAnimations>;
          };
        };
      };
      emissiveFactor: MaterialAnimationPropertyInfo[];
      normalTexture: {
        scale: MaterialAnimationPropertyInfo[];
      };
      occlusionTexture: {
        strength: MaterialAnimationPropertyInfo[];
        extensions: {
          KHR_texture_transform: ReturnType<typeof createTextureTransformAnimations>;
        };
      };
      emissiveTexture: {
        extensions: {
          KHR_texture_transform: ReturnType<typeof createTextureTransformAnimations>;
        };
      };
      /** Material extension properties */
      extensions: {
        KHR_materials_ior: {
          ior: MaterialAnimationPropertyInfo[];
        };
        KHR_materials_clearcoat: {
          clearcoatFactor: MaterialAnimationPropertyInfo[];
          clearcoatRoughnessFactor: MaterialAnimationPropertyInfo[];
        };
        KHR_materials_sheen: {
          sheenColorFactor: MaterialAnimationPropertyInfo[];
          sheenRoughnessFactor: MaterialAnimationPropertyInfo[];
        };
        KHR_materials_specular: {
          specularFactor: MaterialAnimationPropertyInfo[];
          specularColorFactor: MaterialAnimationPropertyInfo[];
        };
        KHR_materials_emissive_strength: {
          emissiveStrength: MaterialAnimationPropertyInfo[];
        };
        KHR_materials_transmission: {
          transmissionFactor: MaterialAnimationPropertyInfo[];
        };
        KHR_materials_volume: {
          attenuationColor: MaterialAnimationPropertyInfo[];
          attenuationDistance: MaterialAnimationPropertyInfo[];
          thicknessFactor: MaterialAnimationPropertyInfo[];
        };
        KHR_materials_iridescence: {
          iridescenceFactor: MaterialAnimationPropertyInfo[];
          iridescenceIor: MaterialAnimationPropertyInfo[];
          iridescenceThicknessMinimum: MaterialAnimationPropertyInfo[];
          iridescenceThicknessMaximum: MaterialAnimationPropertyInfo[];
        };
      };
    };
  };

  /** Camera property animations */
  cameras: {
    __array__: {
      __target__: true;
      /** Orthographic camera properties */
      orthographic: {
        xmag: CameraAnimationPropertyInfo[];
        ymag: CameraAnimationPropertyInfo[];
        zfar: CameraAnimationPropertyInfo[];
        znear: CameraAnimationPropertyInfo[];
      };
      /** Perspective camera properties */
      perspective: {
        yfov: CameraAnimationPropertyInfo[];
        zfar: CameraAnimationPropertyInfo[];
        znear: CameraAnimationPropertyInfo[];
      };
    };
  };

  /** Extension-specific animations */
  extensions: {
    /** KHR_lights_punctual extension light properties */
    KHR_lights_punctual: {
      lights: {
        __array__: {
          __target__: true;
          color: LightAnimationPropertyInfo[];
          intensity: LightAnimationPropertyInfo[];
          range: LightAnimationPropertyInfo[];
          /** Spotlight-specific properties */
          spot: {
            innerConeAngle: LightAnimationPropertyInfo[];
            outerConeAngle: LightAnimationPropertyInfo[];
          };
        };
      };
    };
  };
};