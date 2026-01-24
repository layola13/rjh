import { Vector4, CreateBox, StandardMaterial, Color3 } from 'core/Misc/observable';
import { AbstractButton3D } from './abstractButton3D';
import { Scene } from '@babylonjs/core/scene';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';

/**
 * Options for configuring a Button3D control
 */
export interface Button3DOptions {
  /** Width of the button in 3D space (default: 1) */
  width?: number;
  /** Height of the button in 3D space (default: 1) */
  height?: number;
  /** Depth of the button in 3D space (default: 0.08) */
  depth?: number;
}

/**
 * A 3D button control that can be placed in a 3D GUI scene.
 * Extends AbstractButton3D to provide interactive button functionality with visual feedback.
 * 
 * @example
 *