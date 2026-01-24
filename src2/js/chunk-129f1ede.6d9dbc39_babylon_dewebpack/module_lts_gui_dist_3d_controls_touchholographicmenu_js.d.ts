/**
 * Touch-based holographic menu for 3D GUI controls in Babylon.js
 * Extends VolumeBasedPanel to provide a touch-interactive menu with a backplate
 */

import { VolumeBasedPanel } from './volumeBasedPanel';
import { Mesh, CreateBox, Color3, Logger, Vector3 } from '@babylonjs/core';
import { Observer } from '@babylonjs/core/Misc/observable';
import { Scene } from '@babylonjs/core/scene';
import { FluentMaterial } from '../materials/fluent/fluentMaterial';
import { Control3D } from './control3D';
import { Button3D } from './button3D';

/**
 * Touch-enabled holographic menu control with fluent design backplate
 * Provides a 3D menu interface optimized for touch interactions
 */
export declare class TouchHolographicMenu extends VolumeBasedPanel {
    /**
     * Default scale factor applied to menu buttons
     */
    static readonly MENU_BUTTON_SCALE: number;

    /**
     * Material applied to the menu's backplate
     */
    private _backPlateMaterial: FluentMaterial;

    /**
     * Mesh representing the visual backplate of the menu
     */
    private _backPlate: Mesh;

    /**
     * Margin multiplier for backplate sizing relative to content
     */
    private _backPlateMargin: number;

    /**
     * Current minimum bounds of menu content
     */
    private _currentMin: Vector3 | null;

    /**
     * Current maximum bounds of menu content
     */
    private _currentMax: Vector3 | null;

    /**
     * Observer tracking picked point changes for hover effects
     */
    private _pickedPointObserver: Observer<Vector3 | null>;

    /**
     * Gets the backplate margin multiplier
     * Controls spacing between content and backplate edges
     */
    get backPlateMargin(): number;

    /**
     * Sets the backplate margin multiplier
     * Automatically recalculates backplate size when changed
     * @param value - Margin multiplier (default: 1.25)
     */
    set backPlateMargin(value: number);

    /**
     * Creates a new TouchHolographicMenu instance
     * @param name - Unique identifier for the menu
     */
    constructor(name?: string);

    /**
     * Creates the root mesh node and backplate for the menu
     * @param scene - Scene to attach the menu to
     * @returns Root mesh containing the menu
     */
    protected _createNode(scene: Scene): Mesh;

    /**
     * Configures fluent material and hover effects for the backplate
     * Sets up observer for touch/pointer interactions
     * @param mesh - Root mesh to apply materials to
     */
    protected _affectMaterial(mesh: Mesh): void;

    /**
     * Maps a control to a grid position and updates bounds
     * @param control - Control to position
     * @param position - Target position in local space
     */
    protected _mapGridNode(control: Control3D, position: Vector3): void;

    /**
     * Finalizes layout by updating backplate margins
     * Called after all controls are positioned
     */
    protected _finalProcessing(): void;

    /**
     * Updates minimum and maximum bounds based on a new position
     * @param position - Position to include in bounds calculation
     */
    private _updateCurrentMinMax(position: Vector3): void;

    /**
     * Recalculates and applies backplate size and child positions
     * Centers content and applies margin-based scaling
     */
    private _updateMargins(): void;

    /**
     * Adds a button to the menu with proper styling
     * Automatically disables button backplate and applies menu scaling
     * @param button - Button3D instance to add
     * @returns This menu instance for method chaining
     */
    addButton(button: Button3D): TouchHolographicMenu;

    /**
     * Overridden to prevent adding non-button controls
     * @param control - Control attempting to be added
     * @returns This menu instance (no-op with warning)
     */
    addControl(control: Control3D): TouchHolographicMenu;

    /**
     * Disposes of the menu and cleans up observers
     * Removes backplate material and picked point observer
     */
    dispose(): void;
}