import { Observable, Observer } from "core/Misc/observable";
import { Vector3 } from "core/Maths/math.vector";
import { ValueAndUnit } from "./valueAndUnit";
import { Control } from "./control";
import { AbstractMesh } from "core/Meshes/abstractMesh";
import { AdvancedDynamicTexture } from "./advancedDynamicTexture";

/**
 * Represents a point in a multi-line control that can be attached to either
 * a specific coordinate, a GUI control, or a 3D mesh in the scene.
 */
export class MultiLinePoint {
    /** @internal */
    private _multiLine: any; // MultiLine control that owns this point

    /** @internal */
    private _x: ValueAndUnit;

    /** @internal */
    private _y: ValueAndUnit;

    /** @internal */
    private _point: Vector3;

    /** @internal */
    private _control: Control | null = null;

    /** @internal */
    private _controlObserver: Observer<Control> | null = null;

    /** @internal */
    private _mesh: AbstractMesh | null = null;

    /** @internal */
    private _meshObserver: Observer<Camera> | null = null;

    /**
     * Gets or sets the x coordinate of the point.
     * The value is returned as a string representation based on the host's units.
     */
    public get x(): string {
        return this._x.toString(this._multiLine._host);
    }

    public set x(value: string) {
        if (this._x.toString(this._multiLine._host) !== value) {
            if (this._x.fromString(value)) {
                this._multiLine._markAsDirty();
            }
        }
    }

    /**
     * Gets or sets the y coordinate of the point.
     * The value is returned as a string representation based on the host's units.
     */
    public get y(): string {
        return this._y.toString(this._multiLine._host);
    }

    public set y(value: string) {
        if (this._y.toString(this._multiLine._host) !== value) {
            if (this._y.fromString(value)) {
                this._multiLine._markAsDirty();
            }
        }
    }

    /**
     * Gets or sets the GUI control this point is attached to.
     * When set, the point will automatically follow the control's position.
     */
    public get control(): Control | null {
        return this._control;
    }

    public set control(value: Control | null) {
        if (this._control !== value) {
            // Clean up previous control observer
            if (this._control && this._controlObserver) {
                this._control.onDirtyObservable.remove(this._controlObserver);
                this._controlObserver = null;
            }

            this._control = value;

            // Set up new control observer
            if (this._control) {
                this._controlObserver = this._control.onDirtyObservable.add(
                    this._multiLine.onPointUpdate
                );
            }

            this._multiLine._markAsDirty();
        }
    }

    /**
     * Gets or sets the 3D mesh this point is attached to.
     * When set, the point will automatically follow the mesh's projected screen position.
     */
    public get mesh(): AbstractMesh | null {
        return this._mesh;
    }

    public set mesh(value: AbstractMesh | null) {
        if (this._mesh !== value) {
            // Clean up previous mesh observer
            if (this._mesh && this._meshObserver) {
                this._mesh.getScene().onAfterCameraRenderObservable.remove(this._meshObserver);
            }

            this._mesh = value;

            // Set up new mesh observer
            if (this._mesh) {
                this._meshObserver = this._mesh
                    .getScene()
                    .onAfterCameraRenderObservable.add(this._multiLine.onPointUpdate);
            }

            this._multiLine._markAsDirty();
        }
    }

    /**
     * Creates a new MultiLinePoint instance.
     * @param multiLine - The parent MultiLine control that owns this point
     */
    constructor(multiLine: any) {
        this._multiLine = multiLine;
        this._x = new ValueAndUnit(0);
        this._y = new ValueAndUnit(0);
        this._point = new Vector3(0, 0, 0);
    }

    /**
     * Removes all control and mesh links from this point.
     * This will detach the point from any GUI controls or 3D meshes.
     */
    public resetLinks(): void {
        this.control = null;
        this.mesh = null;
    }

    /**
     * Translates the point to its current position based on its attachments.
     * @returns The translated position as a Vector3
     */
    public translate(): Vector3 {
        this._point = this._translatePoint();
        return this._point;
    }

    /**
     * Internal method to calculate the point's position based on its current attachment.
     * Priority: mesh > control > coordinates
     * @returns The calculated position as a Vector3
     * @internal
     */
    private _translatePoint(): Vector3 {
        const EPSILON_OFFSET = 1 - Number.EPSILON;

        // If attached to a mesh, project its 3D position to screen space
        if (this._mesh != null) {
            const boundingSphereCenter = this._mesh.getBoundingInfo().boundingSphere.center;
            const worldMatrix = this._mesh.getWorldMatrix();
            return this._multiLine._host.getProjectedPositionWithZ(
                boundingSphereCenter,
                worldMatrix
            );
        }

        // If attached to a control, use its center position
        if (this._control != null) {
            return new Vector3(
                this._control.centerX,
                this._control.centerY,
                EPSILON_OFFSET
            );
        }

        // Otherwise, use the explicit x/y coordinates
        const host: AdvancedDynamicTexture = this._multiLine._host;
        const pixelX = this._x.getValueInPixel(host, Number(host._canvas.width));
        const pixelY = this._y.getValueInPixel(host, Number(host._canvas.height));

        return new Vector3(pixelX, pixelY, EPSILON_OFFSET);
    }

    /**
     * Releases all resources and removes all observers.
     * Call this method when the point is no longer needed.
     */
    public dispose(): void {
        this.resetLinks();
    }
}