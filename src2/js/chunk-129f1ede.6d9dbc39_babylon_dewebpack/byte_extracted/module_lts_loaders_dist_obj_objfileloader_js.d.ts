/**
 * OBJ file loader plugin for Babylon.js scene loading system.
 * Handles loading and parsing of .obj 3D model files with optional .mtl material files.
 * @module OBJFileLoader
 */

import type { Nullable } from "core/types";
import type { Observable } from "core/Misc/observable";
import type { Scene } from "core/scene";
import type { AssetContainer } from "core/assetContainer";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
import type { IParticleSystem } from "core/Particles/IParticleSystem";
import type { Skeleton } from "core/Bones/skeleton";
import type { AnimationGroup } from "core/Animations/animationGroup";
import type { TransformNode } from "core/Meshes/transformNode";
import type { Geometry } from "core/Meshes/geometry";
import type { Light } from "core/Lights/light";
import type { ISceneLoaderPluginAsync, ISceneLoaderPluginExtensions, ISceneLoaderAsyncResult, ISceneLoaderProgressEvent } from "core/Loading/sceneLoader";
import { Vector2 } from "core/Maths/math.vector";

/**
 * Configuration options for OBJ file loading behavior.
 */
export interface IOBJLoadingOptions {
    /** Whether to compute normals if not present in the file */
    computeNormals: boolean;
    
    /** Whether to optimize normal calculations */
    optimizeNormals: boolean;
    
    /** Whether to import vertex color data from the file */
    importVertexColors: boolean;
    
    /** Whether to invert Y axis coordinates */
    invertY: boolean;
    
    /** Whether to invert Y axis for texture coordinates */
    invertTextureY: boolean;
    
    /** UV coordinate scaling factor */
    UVScaling: Vector2;
    
    /** Whether material loading failures should be silent (not throw errors) */
    materialLoadingFailsSilently: boolean;
    
    /** Whether to optimize mesh data with UV coordinates */
    optimizeWithUV: boolean;
    
    /** Whether to skip loading materials entirely */
    skipMaterials: boolean;
}

/**
 * Scene loader plugin for loading OBJ (Wavefront) 3D model files.
 * Supports loading geometry, materials (via .mtl files), and textures.
 * 
 * @example
 *