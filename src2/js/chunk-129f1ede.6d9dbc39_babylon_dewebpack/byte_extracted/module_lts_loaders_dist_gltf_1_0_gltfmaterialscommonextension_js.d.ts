/**
 * glTF 1.0 Materials Common Extension
 * 
 * This extension provides support for the KHR_materials_common extension in glTF 1.0 files.
 * It enables loading of common material properties and light types that are not part of the core glTF 1.0 specification.
 * 
 * @see https://github.com/KhronosGroup/glTF/blob/main/extensions/1.0/Khronos/KHR_materials_common/README.md
 */

import type { IGLTFLoaderData } from './glTFLoader';
import type { Scene } from 'core/scene';
import type { Nullable } from 'core/types';
import type { StandardMaterial } from 'core/Materials/standardMaterial';
import type { BaseTexture } from 'core/Materials/Textures/baseTexture';

/**
 * Color value represented as RGB array
 */
type ColorArray = [number, number, number];

/**
 * Light types supported by the KHR_materials_common extension
 */
type LightType = 'ambient' | 'point' | 'directional' | 'spot';

/**
 * Ambient light properties
 */
interface IAmbientLight {
  /** RGB color values */
  color?: ColorArray;
}

/**
 * Point light properties
 */
interface IPointLight {
  /** RGB color values */
  color?: ColorArray;
}

/**
 * Directional light properties
 */
interface IDirectionalLight {
  /** RGB color values */
  color?: ColorArray;
}

/**
 * Spot light properties
 */
interface ISpotLight {
  /** RGB color values */
  color?: ColorArray;
  /** Outer cone angle in radians */
  fallOffAngle?: number;
  /** Light intensity fall-off exponent */
  fallOffExponent?: number;
}

/**
 * Light definition in the KHR_materials_common extension
 */
interface IKHRLight {
  /** Name of the light */
  name: string;
  /** Type of light */
  type: LightType;
  /** Ambient light specific properties */
  ambient?: IAmbientLight;
  /** Point light specific properties */
  point?: IPointLight;
  /** Directional light specific properties */
  directional?: IDirectionalLight;
  /** Spot light specific properties */
  spot?: ISpotLight;
}

/**
 * Collection of lights indexed by ID
 */
interface IKHRLights {
  [lightId: string]: IKHRLight;
}

/**
 * Rendering technique for materials
 */
type MaterialTechnique = 'CONSTANT' | 'LAMBERT' | 'BLINN' | 'PHONG';

/**
 * Material property value - can be a texture ID or color array
 */
type MaterialValue = string | ColorArray;

/**
 * Material values defined in the KHR_materials_common extension
 */
interface IKHRMaterialValues {
  /** Ambient color or texture ID */
  ambient?: MaterialValue;
  /** Diffuse color or texture ID */
  diffuse?: MaterialValue;
  /** Emission color or texture ID */
  emission?: MaterialValue;
  /** Specular color or texture ID */
  specular?: MaterialValue;
  /** Material transparency (0-1) */
  transparency?: number;
  /** Specular shininess factor */
  shininess?: number;
}

/**
 * KHR_materials_common extension data
 */
interface IKHRMaterialsCommon {
  /** Collection of lights */
  lights?: IKHRLights;
  /** Rendering technique */
  technique?: MaterialTechnique;
  /** Whether the material is double-sided */
  doubleSided?: boolean;
  /** Material property values */
  values: IKHRMaterialValues;
}

/**
 * glTF material with extensions
 */
interface IGLTFMaterial {
  /** Material name */
  name?: string;
  /** Material extensions */
  extensions?: {
    KHR_materials_common?: IKHRMaterialsCommon;
  };
}

/**
 * glTF runtime data with materials
 */
interface IGLTFRuntime extends IGLTFLoaderData {
  /** Babylon.js scene */
  scene: Scene;
  /** Collection of materials */
  materials?: IGLTFMaterial[];
  /** Extension data */
  extensions?: {
    KHR_materials_common?: IKHRMaterialsCommon;
  };
}

/**
 * Callback for texture loading operations
 */
type TextureCallback = (texture: BaseTexture) => void;

/**
 * Callback for buffer loading operations
 */
type BufferCallback = (buffer: ArrayBufferView) => void;

/**
 * Base class for glTF loader extensions
 */
export declare abstract class GLTFLoaderExtension {
  /** Extension name */
  readonly name: string;
  
  /**
   * Load runtime extensions asynchronously
   * @param gltfRuntime - The glTF runtime data
   * @returns True if the extension was loaded, false otherwise
   */
  loadRuntimeExtensionsAsync(gltfRuntime: IGLTFRuntime): boolean;
  
  /**
   * Load material asynchronously
   * @param gltfRuntime - The glTF runtime data
   * @param materialId - ID of the material to load
   * @param material - The material instance to populate
   * @param onSuccess - Callback on successful load
   * @returns True if the material was loaded, false otherwise
   */
  loadMaterialAsync(
    gltfRuntime: IGLTFRuntime,
    materialId: string,
    material: StandardMaterial,
    onSuccess: () => void
  ): boolean;
}

/**
 * Loader for glTF 1.0 files with KHR_materials_common extension support
 * 
 * This extension provides a bridge between glTF 1.0 common materials and Babylon.js materials.
 * It handles:
 * - Common light types (ambient, point, directional, spot)
 * - Standard material properties (ambient, diffuse, emission, specular)
 * - Material techniques (CONSTANT, LAMBERT, BLINN, PHONG)
 * - Texture and color-based material values
 * 
 * @example
 *