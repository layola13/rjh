/**
 * Loader module for managing and loading 3D assets, textures, and video resources
 * @module Loader
 */

import { SceneLoader, Texture, VideoTexture, Vector3, Scene, AbstractMesh, ISceneLoaderAsyncResult } from '@babylonjs/core';

/**
 * Represents a single asset item configuration
 */
interface AssetItem {
  /** Asset type: 'model', 'texture', or 'video' */
  type?: 'model' | 'texture' | 'video';
  /** Asset identifier name */
  name: string;
  /** Source file path or URL */
  source: string;
}

/**
 * Collection of assets to be loaded
 */
interface Assets {
  /** Array of asset items */
  items: AssetItem[];
}

/**
 * Named texture pair for mapping textures to identifiers
 */
interface NamedTexture {
  /** Texture identifier */
  name: string;
  /** Babylon.js texture instance */
  texture: Texture;
}

/**
 * Room scene container holding loaded models and textures
 */
interface Room {
  /** Root transform node for the room hierarchy */
  root: {
    position: Vector3;
  };
  /** Main room model mesh */
  roomModel?: AbstractMesh;
  /** Mac screen model mesh */
  macModel?: AbstractMesh;
  /** PC screen model mesh */
  pcModel?: AbstractMesh;
  /** Chair model mesh */
  chairModel?: AbstractMesh;
  /** Coffee steam particle effect model mesh */
  coffeeModel?: AbstractMesh;
  /** Collection of all loaded textures */
  textures: NamedTexture[];
  /** Baked lighting textures for the room model */
  roomModelTextures: Texture[];
  /** Logo texture reference */
  logoTexture?: Texture;
  /** Mac screen display texture */
  macTexture?: Texture;
  /** PC screen display texture */
  pcTexture?: Texture;
  
  /** Initialize shader-based room rendering */
  DoLoadShaderRoom(): void;
  /** Apply Mac screen texture to model */
  DoLoadMacTexture(): void;
  /** Apply video texture to PC screen */
  DoLoadVideoTexture(): void;
}

/**
 * Asset loader responsible for importing 3D models, textures, and videos into a Babylon.js scene
 */
export declare class Loader {
  /** Babylon.js scene instance */
  private readonly scene: Scene;
  
  /** Asset manifest containing items to load */
  private readonly assets: Assets;
  
  /** Room container for loaded resources */
  private readonly room: Room;

  /**
   * Creates a new Loader instance
   * @param assets - Asset manifest with items to load
   * @param scene - Target Babylon.js scene
   * @param room - Room container for organizing loaded assets
   */
  constructor(assets: Assets, scene: Scene, room: Room);

  /**
   * Synchronously test GLTF model loading (development/debug method)
   * Loads models from localhost without awaiting completion
   * @deprecated Use AsyncLoadGltf for production
   */
  TestLoadGltf(): void;

  /**
   * Asynchronously load all GLTF models and textures from remote CDN
   * - Imports meshes and assigns them to room model references
   * - Loads textures with appropriate settings (mipmaps, invertY)
   * - Configures room position and initializes shaders
   * @returns Promise that resolves when all assets are loaded
   */
  AsyncLoadGltf(): Promise<void>;

  /**
   * Load video textures for screen displays
   * Filters video assets and creates VideoTexture instances with autoplay configuration
   */
  LoadVideoTexture(): void;
}