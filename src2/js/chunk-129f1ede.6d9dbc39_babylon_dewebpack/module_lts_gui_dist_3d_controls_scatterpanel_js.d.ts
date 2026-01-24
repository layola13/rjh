import { Observable } from "core/Misc/observable";
import { Vector3, Vector2, TmpVectors } from "core/Maths/math.vector";
import { VolumeBasedPanel } from "./volumeBasedPanel";
import { Container3D } from "./container3D";
import { Control3D } from "./control3D";
import { Mesh } from "core/Meshes/mesh";

/**
 * ScatterPanel - A 3D panel that arranges child controls in a scattered layout
 * 
 * This panel extends VolumeBasedPanel and positions child controls randomly
 * within the panel bounds, then iteratively adjusts positions to prevent overlapping.
 */
export declare class ScatterPanel extends VolumeBasedPanel {
    /**
     * Number of iterations for collision detection and position adjustment
     * Higher values produce better spacing but require more computation
     * @default 100
     */
    private _iteration: number;

    /**
     * Width of each cell in the scatter layout
     */
    private _cellWidth: number;

    /**
     * Height of each cell in the scatter layout
     */
    private _cellHeight: number;

    /**
     * Gets the number of iterations used for scatter distribution optimization
     */
    get iteration(): number;

    /**
     * Sets the number of iterations for scatter distribution optimization
     * Triggers re-arrangement of children when changed
     */
    set iteration(value: number);

    /**
     * Maps a grid node to a scattered position
     * 
     * @param node - The control node to position
     * @param position - The target position vector (will be modified)
     */
    protected _mapGridNode(node: Control3D, position: Vector3): void;

    /**
     * Applies random scatter transformation to a position vector
     * 
     * @param position - The position to scatter (modified in place)
     * @returns The scattered position
     */
    protected _scatterMapping(position: Vector3): Vector3;

    /**
     * Final processing step that performs iterative collision resolution
     * 
     * Sorts meshes by distance from origin and iteratively pushes overlapping
     * meshes apart based on margin and cell size constraints.
     */
    protected _finalProcessing(): void;

    /**
     * Re-arranges all children in the scatter pattern
     */
    protected _arrangeChildren(): void;

    /**
     * Collection of child controls
     */
    protected _children: Control3D[];

    /**
     * Margin between controls (minimum separation distance)
     */
    margin: number;

    /**
     * Orientation mode for child controls
     * Determines how controls face relative to the panel
     */
    orientation: number;
}