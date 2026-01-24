import { Observable } from "core/Misc/observable";
import { Container3D } from "../../../lts/gui/dist/3D/controls/container3D";
import { Control3D } from "../../../lts/gui/dist/3D/controls/control3D";
import { Vector3, Matrix } from "core/Maths/math.vector";

/**
 * Orientation mode for volume-based panel layout
 */
export type PanelOrientation = number;

/**
 * Class representing a 3D panel that arranges child controls in a grid layout based on volume calculations.
 * Extends Container3D to provide automatic positioning of children in rows and columns.
 */
export declare class VolumeBasedPanel extends Container3D {
    /**
     * Number of columns in the grid layout (default: 10)
     * @remarks When set, triggers row-first layout calculation
     */
    columns: number;

    /**
     * Number of rows in the grid layout (default: 0 - auto-calculated)
     * @remarks When set, triggers column-first layout calculation
     */
    rows: number;

    /**
     * Margin spacing between cells in the grid (in world units)
     * @default 0
     */
    margin: number;

    /**
     * Orientation mode determining how child controls face
     * @default Container3D.FACEORIGIN_ORIENTATION
     */
    orientation: PanelOrientation;

    /**
     * Creates a new VolumeBasedPanel instance
     * @param name - Unique identifier for the panel
     */
    constructor(name?: string);

    /**
     * Internal: Width of each grid cell (auto-calculated based on child bounds)
     * @internal
     */
    protected _cellWidth: number;

    /**
     * Internal: Height of each grid cell (auto-calculated based on child bounds)
     * @internal
     */
    protected _cellHeight: number;

    /**
     * Internal: Number of columns in current layout
     * @internal
     */
    protected _columns: number;

    /**
     * Internal: Number of rows in current layout
     * @internal
     */
    protected _rows: number;

    /**
     * Internal: Flag indicating whether to calculate rows then columns (true) or columns then rows (false)
     * @internal
     */
    protected _rowThenColum: boolean;

    /**
     * Internal: Current orientation setting
     * @internal
     */
    protected _orientation: PanelOrientation;

    /**
     * Internal: Arranges all child controls into a grid based on current settings.
     * Calculates cell dimensions from child bounding boxes and positions each child accordingly.
     * @internal
     */
    protected _arrangeChildren(): void;

    /**
     * Internal: Maps a child control to a specific grid position
     * @param control - The child control to position
     * @param position - Target position vector in local space
     * @internal
     */
    protected _mapGridNode(control: Control3D, position: Vector3): void;

    /**
     * Internal: Hook for final processing after layout calculation
     * Override in derived classes to add custom post-layout behavior
     * @internal
     */
    protected _finalProcessing(): void;
}