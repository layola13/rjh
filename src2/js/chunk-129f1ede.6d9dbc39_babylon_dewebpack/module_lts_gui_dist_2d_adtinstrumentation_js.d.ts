import { Observer } from "core/Misc/observable";
import { PerfCounter } from "core/Misc/perfCounter";

/**
 * Interface representing an Advanced Dynamic Texture with observable events
 */
export interface IAdvancedDynamicTexture {
    /** Observable triggered before rendering starts */
    onBeginRenderObservable: {
        add(callback: () => void): Observer<unknown>;
        remove(observer: Observer<unknown> | null): void;
    };
    /** Observable triggered after rendering ends */
    onEndRenderObservable: {
        add(callback: () => void): Observer<unknown>;
        remove(observer: Observer<unknown> | null): void;
    };
    /** Observable triggered before layout calculation starts */
    onBeginLayoutObservable: {
        add(callback: () => void): Observer<unknown>;
        remove(observer: Observer<unknown> | null): void;
    };
    /** Observable triggered after layout calculation ends */
    onEndLayoutObservable: {
        add(callback: () => void): Observer<unknown>;
        remove(observer: Observer<unknown> | null): void;
    };
}

/**
 * Instrumentation class for monitoring Advanced Dynamic Texture performance
 * Tracks render time and layout time metrics
 */
export declare class AdvancedDynamicTextureInstrumentation {
    /** The texture being instrumented */
    texture: IAdvancedDynamicTexture | null;

    /** @internal */
    private _captureRenderTime: boolean;
    /** @internal */
    private _renderTime: PerfCounter;
    /** @internal */
    private _captureLayoutTime: boolean;
    /** @internal */
    private _layoutTime: PerfCounter;
    /** @internal */
    private _onBeginRenderObserver: Observer<unknown> | null;
    /** @internal */
    private _onEndRenderObserver: Observer<unknown> | null;
    /** @internal */
    private _onBeginLayoutObserver: Observer<unknown> | null;
    /** @internal */
    private _onEndLayoutObserver: Observer<unknown> | null;

    /**
     * Creates a new instrumentation instance for an Advanced Dynamic Texture
     * @param texture - The texture to instrument
     */
    constructor(texture: IAdvancedDynamicTexture);

    /**
     * Gets the render time performance counter
     * @returns Performance counter tracking render duration
     */
    get renderTimeCounter(): PerfCounter;

    /**
     * Gets the layout time performance counter
     * @returns Performance counter tracking layout calculation duration
     */
    get layoutTimeCounter(): PerfCounter;

    /**
     * Gets whether render time capture is enabled
     * @returns True if capturing render time metrics
     */
    get captureRenderTime(): boolean;

    /**
     * Sets whether to capture render time metrics
     * Automatically attaches/detaches observers to render observables
     * @param value - True to enable render time capture
     */
    set captureRenderTime(value: boolean);

    /**
     * Gets whether layout time capture is enabled
     * @returns True if capturing layout time metrics
     */
    get captureLayoutTime(): boolean;

    /**
     * Sets whether to capture layout time metrics
     * Automatically attaches/detaches observers to layout observables
     * @param value - True to enable layout time capture
     */
    set captureLayoutTime(value: boolean);

    /**
     * Disposes the instrumentation instance
     * Removes all observers and clears references
     */
    dispose(): void;
}