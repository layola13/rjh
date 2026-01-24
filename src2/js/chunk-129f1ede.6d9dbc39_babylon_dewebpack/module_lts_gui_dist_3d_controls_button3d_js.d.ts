import { Observable } from 'core/Misc/observable';
import { Vector4, Color3, StandardMaterial, CreateBox } from 'core/Misc/observable';
import { AbstractButton3D } from '../../../lts/gui/dist/3D/controls/abstractButton3D';
import { Scene } from 'core/scene';
import { Mesh } from 'core/Meshes/mesh';
import { Texture } from 'core/Materials/Textures/texture';

/**
 * Options for configuring a Button3D instance
 */
export interface IButton3DOptions {
  /** Width of the button (default: 1) */
  width?: number;
  /** Height of the button (default: 1) */
  height?: number;
  /** Depth of the button (default: 0.08) */
  depth?: number;
}

/**
 * A 3D button control that extends AbstractButton3D
 * Provides interactive 3D button functionality with customizable dimensions and animations
 */
export declare class Button3D extends AbstractButton3D {
  /** Configuration options for the button */
  private _options: Required<IButton3DOptions>;
  
  /** The current material applied to the button */
  private _currentMaterial: StandardMaterial;
  
  /** Scale ratio for content in the Y direction */
  private _contentScaleRatioY: number;
  
  /** Base scale ratio for content */
  private _contentScaleRatio: number;

  /**
   * Creates a new Button3D instance
   * @param name - The name of the button
   * @param options - Optional configuration for button dimensions
   */
  constructor(name: string, options?: IButton3DOptions);

  /**
   * Applies a facade texture to the button's material
   * @param texture - The texture to apply as emissive texture
   * @protected
   */
  protected _applyFacade(texture: Texture): void;

  /**
   * Returns the type name of this control
   * @returns The string "Button3D"
   * @protected
   */
  protected _getTypeName(): string;

  /**
   * Creates the 3D mesh node for the button
   * @param scene - The scene to create the mesh in
   * @returns The created box mesh
   * @protected
   */
  protected _createNode(scene: Scene): Mesh;

  /**
   * Applies the material to the mesh
   * @param mesh - The mesh to apply the material to
   * @protected
   */
  protected _affectMaterial(mesh: Mesh): void;

  /**
   * Sets the scaling for the facade texture
   * @protected
   */
  protected _setFacadeTextureScaling(): void;

  /**
   * Resets the button content
   * @protected
   */
  protected _resetContent(): void;

  /**
   * Disposes the facade texture
   * @protected
   */
  protected _disposeFacadeTexture(): void;

  /**
   * Animation executed when pointer enters the button
   * Changes emissive color to red
   */
  pointerEnterAnimation: () => void;

  /**
   * Animation executed when pointer leaves the button
   * Changes emissive color to black
   */
  pointerOutAnimation: () => void;

  /**
   * Animation executed when pointer is pressed down on the button
   * Scales the button down to 95%
   */
  pointerDownAnimation: () => void;

  /**
   * Animation executed when pointer is released from the button
   * Restores the button to original scale
   */
  pointerUpAnimation: () => void;

  /**
   * Disposes the button and releases all resources
   */
  dispose(): void;
}