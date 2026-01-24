/**
 * Module: NearMenu Component
 * 3D GUI control for creating near-interaction holographic menus with pinning functionality
 */

import { TouchHolographicButton } from './touchHolographicButton';
import { DefaultBehavior } from '../behaviors/defaultBehavior';
import { TouchHolographicMenu } from './touchHolographicMenu';
import { Observer } from '@babylonjs/core';
import { Scene, TransformNode } from '@babylonjs/core';

/**
 * Near menu control that extends TouchHolographicMenu with pinning and follow behavior.
 * Designed for XR/MR experiences where menus can follow the user or be pinned in space.
 */
export declare class NearMenu extends TouchHolographicMenu {
    /**
     * Base URL for menu assets (icons, textures)
     */
    private static readonly _ASSETS_BASE_URL: string; // "https://assets.babylonjs.com/meshes/MRTK/"
    
    /**
     * Filename for the pin icon texture
     */
    private static readonly _PIN_ICON_FILENAME: string; // "IconPin.png"

    /**
     * Internal pinned state flag
     */
    private _isPinned: boolean;

    /**
     * Default behavior controller managing follow and drag interactions
     */
    private readonly _defaultBehavior: DefaultBehavior;

    /**
     * Observer for drag events to auto-pin menu when dragged
     */
    private readonly _dragObserver: Observer<unknown>;

    /**
     * Button control for toggling pin state
     */
    private _pinButton: TouchHolographicButton;

    /**
     * Creates a new NearMenu instance
     * @param name - Unique identifier for the menu
     */
    constructor(name: string);

    /**
     * Gets the default behavior component controlling menu positioning and interaction
     * @readonly
     */
    get defaultBehavior(): DefaultBehavior;

    /**
     * Gets or sets whether the menu is pinned in place (not following user)
     * When pinned, follow behavior is disabled; when unpinned, menu follows user gaze/position
     */
    get isPinned(): boolean;
    set isPinned(value: boolean);

    /**
     * Creates the pin toggle button
     * @param parentNode - Parent transform node to attach button to
     * @returns Configured TouchHolographicButton for pinning
     * @private
     */
    private _createPinButton(parentNode: TransformNode): TouchHolographicButton;

    /**
     * Creates the root scene node for the menu with pinning and follow behaviors
     * @param scene - Scene to create node in
     * @returns Configured TransformNode for the menu
     * @protected
     */
    protected _createNode(scene: Scene): TransformNode;

    /**
     * Final layout pass to position pin button relative to back plate
     * @protected
     */
    protected _finalProcessing(): void;

    /**
     * Disposes of the menu and all associated resources
     * Removes observers and detaches behaviors
     */
    dispose(): void;
}