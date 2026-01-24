import { Control3D } from './control3D';
import { AdvancedDynamicTexture } from '../2D/advancedDynamicTexture';
import { Control } from '../2D/controls/control';
import { Texture } from 'core/Materials/Textures/texture';
import { Scene } from 'core/scene';

/**
 * 3D content display control that renders 2D GUI content on a 3D surface
 * Provides a bridge between 2D GUI controls and 3D mesh surfaces using facade textures
 */
export declare class ContentDisplay3D extends Control3D {
    /**
     * Internal 2D GUI content to be displayed on the 3D surface
     */
    private _content: Control | null;

    /**
     * Facade texture used to render 2D content onto 3D surface
     */
    private _facadeTexture: AdvancedDynamicTexture | null;

    /**
     * Resolution of the content texture in pixels (width and height)
     * @default 512
     */
    private _contentResolution: number;

    /**
     * Scale ratio for the content display on X axis
     * @default 2
     */
    private _contentScaleRatio: number;

    /**
     * Scale ratio for the content display on Y axis
     * If not set, uses _contentScaleRatio value
     */
    private _contentScaleRatioY?: number;

    /**
     * Gets or sets the 2D GUI control to display on the 3D surface
     */
    get content(): Control | null;
    set content(value: Control | null);

    /**
     * Gets or sets the resolution of the content texture
     * Changing this value will recreate the facade texture
     */
    get contentResolution(): number;
    set contentResolution(value: number);

    /**
     * Updates the scaling of the facade texture based on content scale ratios
     * @internal
     */
    private _setFacadeTextureScaling(): void;

    /**
     * Disposes the facade texture and clears references
     * @internal
     */
    private _disposeFacadeTexture(): void;

    /**
     * Resets the content by disposing and recreating the facade texture
     * @internal
     */
    private _resetContent(): void;

    /**
     * Applies the facade texture to the 3D control
     * Override this method to customize how the texture is applied
     * @param facadeTexture - The advanced dynamic texture to apply
     * @internal
     */
    protected _applyFacade(facadeTexture: AdvancedDynamicTexture): void;
}