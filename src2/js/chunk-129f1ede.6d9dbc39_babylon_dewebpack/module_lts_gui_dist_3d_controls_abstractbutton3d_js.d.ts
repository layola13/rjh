/**
 * Abstract base class for 3D button controls in the GUI system.
 * Extends ContentDisplay3D to provide button-specific functionality.
 * 
 * @module AbstractButton3D
 */

import { TransformNode } from 'core/Misc/observable';
import { ContentDisplay3D } from './contentDisplay3D';
import { Scene } from 'core/scene';

/**
 * Abstract 3D button control class.
 * Provides the foundation for interactive 3D button elements in the GUI.
 */
export declare class AbstractButton3D extends ContentDisplay3D {
  /**
   * Creates a new AbstractButton3D instance.
   * @param name - The name identifier for the button control
   */
  constructor(name: string);

  /**
   * Returns the type name of this control for identification purposes.
   * @returns The string "AbstractButton3D"
   */
  protected _getTypeName(): string;

  /**
   * Creates the internal 3D node structure for the button.
   * Generates a TransformNode that serves as the button's root node.
   * @param scene - The Babylon.js scene to create the node in
   * @returns A new TransformNode instance for the button
   */
  protected _createNode(scene: Scene): TransformNode;
}