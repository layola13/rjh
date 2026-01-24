import { Observable } from "core/Misc/observable";
import { Container3D } from "../../../lts/gui/dist/3D/controls/container3D";
import { Control3D } from "../../../lts/gui/dist/3D/controls/control3D";
import { Vector3, Matrix } from "core/Maths/math.vector";

/**
 * Class used to create a volume-based panel that arranges 3D controls in a grid layout
 * Controls are automatically positioned based on their bounding volumes
 */
export declare class VolumeBasedPanel extends Container3D {
    /**
     * Number of columns in the grid layout
     * When set, the panel arranges controls in column-first order
     * @default 10
     */
    columns: number;

    /**
     * Number of rows in the grid layout
     * When set, the panel arranges controls in row-first order
     * @default 0
     */
    rows: number;

    /**
     * Orientation mode for the panel
     * Determines how the panel faces relative to the origin
     * @default Container3D.FACEORIGIN_ORIENTATION
     */
    orientation: number;

    /**
     * Margin space between controls in the grid (in world units)
     * @default 0
     */
    margin: number;

    /**
     * Creates a new VolumeBasedPanel instance
     * @param name - The name of the panel
     */
    constructor(name?: string);

    /**
     * Internal property tracking the current orientation setting
     * @internal
     */
    private _orientation: number;

    /**
     * Internal property tracking the number of columns
     * @internal
     */
    private _columns: number;

    /**
     * Internal property tracking the number of rows
     * @internal
     */
    private _rows: number;

    /**
     * Internal flag indicating whether to arrange by rows then columns (false) or columns then rows (true)
     * @internal
     */
    private _rowThenColum: boolean;

    /**
     * Width of each cell in the grid (calculated from control bounding volumes)
     * @internal
     */
    private _cellWidth: number;

    /**
     * Height of each cell in the grid (calculated from control bounding volumes)
     * @internal
     */
    private _cellHeight: number;

    /**
     * Arranges child controls in a grid layout based on their bounding volumes
     * Calculates cell dimensions from control sizes and positions them accordingly
     * @internal
     */
    private _arrangeChildren(): void;

    /**
     * Maps a 3D control to a specific grid node position
     * @param control - The control to position
     * @param position - The target position in local space
     * @internal
     */
    private _mapGridNode(control: Control3D, position: Vector3): void;

    /**
     * Performs final processing after children arrangement
     * Can be overridden in derived classes for custom post-processing
     * @internal
     */
    protected _finalProcessing(): void;
}