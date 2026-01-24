import { Control3D } from './control3D';
import { AdvancedDynamicTexture } from '../../2D/advancedDynamicTexture';
import { Control } from '../../2D/controls/control';
import { Texture } from 'core/Materials/Textures/texture';

/**
 * 3D content display control that can render 2D GUI controls on a 3D surface
 * Extends Control3D to provide facade texture rendering capabilities
 */
export declare class ContentDisplay3D extends Control3D {
    /**
     * Internal facade texture used to render 2D content in 3D space
     * @internal
     */
    protected _facadeTexture: AdvancedDynamicTexture | null;

    /**
     * The 2D GUI control to display on this 3D surface
     * @internal
     */
    protected _content: Control | null;

    /**
     * Resolution of the facade texture (width and height in pixels)
     * @internal
     */
    protected _contentResolution: number;

    /**
     * Scale ratio applied to the content in X direction
     * @internal
     */
    protected _contentScaleRatio: number;

    /**
     * Scale ratio applied to the content in Y direction
     * If not set, uses _contentScaleRatio
     * @internal
     */
    protected _contentScaleRatioY?: number;

    /**
     * Gets or sets the 2D GUI control content to display
     * When set, creates or updates the facade texture and applies the content
     */
    get content(): Control | null;
    set content(value: Control | null);

    /**
     * Gets or sets the resolution of the facade texture
     * Changing this value will reset and recreate the content
     */
    get contentResolution(): number;
    set contentResolution(value: number);

    /**
     * Creates a new ContentDisplay3D instance
     */
    constructor();

    /**
     * Updates the scaling of the facade texture based on content scale ratios
     * Applies _contentScaleRatio to X axis and _contentScaleRatioY (or _contentScaleRatio) to Y axis
     * @internal
     */
    protected _setFacadeTextureScaling(): void;

    /**
     * Disposes the facade texture and clears its reference
     * @internal
     */
    protected _disposeFacadeTexture(): void;

    /**
     * Resets the content by disposing the facade texture and re-applying the current content
     * @internal
     */
    protected _resetContent(): void;

    /**
     * Abstract method to apply the facade texture to the 3D control
     * Must be implemented by derived classes to define how the texture is applied
     * @param facadeTexture - The AdvancedDynamicTexture to apply
     * @internal
     */
    protected _applyFacade(facadeTexture: AdvancedDynamicTexture): void;
}