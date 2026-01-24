/**
 * Module: StackPanel3D
 * 3D stack panel container for organizing GUI controls in vertical or horizontal layout
 */

import { Observable } from "core/Misc/observable";
import { Matrix, Vector3, TmpVectors } from "core/Maths/math.vector";
import { Container3D } from "./container3D";
import { Control3D } from "./control3D";
import { TransformNode } from "core/Meshes/transformNode";
import { BoundingInfo } from "core/Culling/boundingInfo";

/**
 * 3D stack panel that arranges child controls in a vertical or horizontal stack
 */
export declare class StackPanel3D extends Container3D {
    /**
     * Whether the stack panel arranges children vertically (true) or horizontally (false)
     */
    private _isVertical: boolean;

    /**
     * Spacing margin between child controls
     * @defaultValue 0.1
     */
    margin: number;

    /**
     * Creates a new StackPanel3D instance
     * @param isVertical - If true, arranges children vertically; if false, arranges horizontally
     * @defaultValue false
     */
    constructor(isVertical?: boolean);

    /**
     * Gets whether the stack panel is oriented vertically
     */
    get isVertical(): boolean;

    /**
     * Sets whether the stack panel is oriented vertically
     * When changed, triggers rearrangement of child controls
     */
    set isVertical(value: boolean);

    /**
     * Arranges child controls in a stack layout based on the current orientation
     * Calculates positions based on bounding boxes and margins
     * @internal
     */
    protected _arrangeChildren(): void;

    /**
     * The transform node representing this container in the 3D scene
     * @inherited
     */
    node: TransformNode;

    /**
     * Array of child Control3D elements
     * @inherited
     */
    protected _children: Control3D[];
}