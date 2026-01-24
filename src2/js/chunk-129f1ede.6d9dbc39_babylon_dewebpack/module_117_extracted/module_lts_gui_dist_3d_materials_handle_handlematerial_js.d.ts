import { ShaderMaterial } from '@babylonjs/core/Materials/shaderMaterial';
import { Scene } from '@babylonjs/core/scene';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Observer } from '@babylonjs/core/Misc/observable';

/**
 * Material for rendering interactive 3D handles in GUI.
 * Supports hover and drag states with smooth color and scale transitions.
 */
export declare class HandleMaterial extends ShaderMaterial {
    /**
     * Internal hover state flag.
     */
    private _hover: boolean;

    /**
     * Internal drag state flag.
     */
    private _drag: boolean;

    /**
     * Current interpolated color value.
     */
    private _color: Color3;

    /**
     * Current interpolated scale value.
     */
    private _scale: number;

    /**
     * Target color for interpolation (based on current state).
     */
    private _targetColor: Color3;

    /**
     * Target scale for interpolation (based on current state).
     */
    private _targetScale: number;

    /**
     * Timestamp of last animation tick in milliseconds.
     */
    private _lastTick: number;

    /**
     * Observer for before-render animation updates.
     */
    private _onBeforeRender: Observer<Scene>;

    /**
     * Position offset applied to the handle geometry.
     */
    private _positionOffset: Vector3;

    /**
     * Duration of state transition animations in milliseconds.
     * @default 100
     */
    animationLength: number;

    /**
     * Color displayed when handle is in hover or drag state.
     * @default Color3(0, 0.467, 0.84) - Blue
     */
    hoverColor: Color3;

    /**
     * Color displayed when handle is in base (inactive) state.
     * @default Color3(1, 1, 1) - White
     */
    baseColor: Color3;

    /**
     * Scale multiplier when handle is hovered.
     * @default 0.75
     */
    hoverScale: number;

    /**
     * Scale multiplier in base (inactive) state.
     * @default 0.35
     */
    baseScale: number;

    /**
     * Scale multiplier when handle is being dragged.
     * @default 0.55
     */
    dragScale: number;

    /**
     * Whether the handle is currently in hover state.
     * Setting this triggers interpolation to hover appearance.
     */
    get hover(): boolean;
    set hover(value: boolean);

    /**
     * Whether the handle is currently being dragged.
     * Setting this triggers interpolation to drag appearance.
     * Drag state takes precedence over hover state.
     */
    get drag(): boolean;
    set drag(value: boolean);

    /**
     * Creates a new HandleMaterial instance.
     * @param name - Unique name for the material.
     * @param scene - Scene to attach the material to.
     */
    constructor(name: string, scene: Scene);

    /**
     * Updates target color and scale based on current hover/drag state.
     * Priority: drag > hover > base
     */
    private _updateInterpolationTarget(): void;

    /**
     * Disposes the material and removes animation observers.
     */
    dispose(): void;
}