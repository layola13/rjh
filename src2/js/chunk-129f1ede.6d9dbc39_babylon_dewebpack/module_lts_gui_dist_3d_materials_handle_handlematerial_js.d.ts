import { ShaderMaterial } from 'core/Materials/shaderMaterial';
import { Scene } from 'core/scene';
import { Color3 } from 'core/Maths/math.color';
import { Vector3 } from 'core/Maths/math.vector';
import { Observer } from 'core/Misc/observable';
import { Nullable } from 'core/types';

/**
 * Material for rendering interactive handles in 3D GUI.
 * Provides smooth color and scale transitions for hover and drag states.
 */
export declare class HandleMaterial extends ShaderMaterial {
    /**
     * Whether the handle is currently being hovered.
     */
    get hover(): boolean;
    set hover(value: boolean);

    /**
     * Whether the handle is currently being dragged.
     */
    get drag(): boolean;
    set drag(value: boolean);

    /**
     * Duration of the animation transition in milliseconds.
     * @defaultValue 100
     */
    animationLength: number;

    /**
     * Color displayed when the handle is hovered or dragged.
     * @defaultValue Color3(0, 0.467, 0.84)
     */
    hoverColor: Color3;

    /**
     * Color displayed in the default/idle state.
     * @defaultValue Color3(1, 1, 1)
     */
    baseColor: Color3;

    /**
     * Scale factor applied when the handle is hovered.
     * @defaultValue 0.75
     */
    hoverScale: number;

    /**
     * Scale factor applied in the default/idle state.
     * @defaultValue 0.35
     */
    baseScale: number;

    /**
     * Scale factor applied when the handle is being dragged.
     * @defaultValue 0.55
     */
    dragScale: number;

    /**
     * Creates a new HandleMaterial instance.
     * @param name - The name of the material
     * @param scene - The scene to attach the material to
     */
    constructor(name: string, scene: Scene);

    /**
     * Disposes of the material and removes observers.
     */
    dispose(): void;

    /** @internal */
    private _hover: boolean;

    /** @internal */
    private _drag: boolean;

    /** @internal */
    private _color: Color3;

    /** @internal */
    private _scale: number;

    /** @internal */
    private _targetColor: Color3;

    /** @internal */
    private _targetScale: number;

    /** @internal */
    private _lastTick: number;

    /** @internal */
    private _positionOffset: Vector3;

    /** @internal */
    private _onBeforeRender: Nullable<Observer<Scene>>;

    /**
     * Updates the interpolation target based on current hover/drag state.
     * @internal
     */
    private _updateInterpolationTarget(): void;
}