import type { Scene, TransformNode } from '@babylonjs/core';
import type { Observable } from '@babylonjs/core/Misc/observable';
import type { ContentDisplay3D } from './contentDisplay3D';

/**
 * Abstract base class for 3D button controls in Babylon.js GUI.
 * Extends ContentDisplay3D to provide basic button functionality.
 * 
 * @remarks
 * This is an abstract class that should be extended by concrete button implementations.
 * It provides the foundational structure for 3D interactive button controls.
 */
export declare abstract class AbstractButton3D extends ContentDisplay3D {
    /**
     * Creates a new AbstractButton3D instance.
     * 
     * @param name - The unique name identifier for this button control
     */
    constructor(name: string);

    /**
     * Gets the type name of this control.
     * Used internally for identification and debugging purposes.
     * 
     * @returns The string "AbstractButton3D"
     * @internal
     */
    protected _getTypeName(): string;

    /**
     * Creates the underlying TransformNode for this button.
     * This node serves as the root transform for all button visual elements.
     * 
     * @param scene - The Babylon.js scene to which this button's node will be added
     * @returns A new TransformNode with name "button{name}"
     * @internal
     */
    protected _createNode(scene: Scene): TransformNode;
}