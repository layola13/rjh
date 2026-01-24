import type { Observer } from "core/Misc/observable";
import type { PerfCounter } from "core/Misc/observable";
import type { AdvancedDynamicTexture } from "./advancedDynamicTexture";

/**
 * Instrumentation class for AdvancedDynamicTexture performance monitoring.
 * Provides tools to capture and measure render time and layout time metrics.
 */
export declare class AdvancedDynamicTextureInstrumentation {
    /**
     * The AdvancedDynamicTexture instance being instrumented.
     */
    texture: AdvancedDynamicTexture | null;

    /**
     * Internal flag indicating whether render time capture is enabled.
     * @internal
     */
    private _captureRenderTime: boolean;

    /**
     * Performance counter for measuring render time.
     * @internal
     */
    private _renderTime: PerfCounter;

    /**
     * Internal flag indicating whether layout time capture is enabled.
     * @internal
     */
    private _captureLayoutTime: boolean;

    /**
     * Performance counter for measuring layout time.
     * @internal
     */
    private _layoutTime: PerfCounter;

    /**
     * Observer for begin render events.
     * @internal
     */
    private _onBeginRenderObserver: Observer<AdvancedDynamicTexture> | null;

    /**
     * Observer for end render events.
     * @internal
     */
    private _onEndRenderObserver: Observer<AdvancedDynamicTexture> | null;

    /**
     * Observer for begin layout events.
     * @internal
     */
    private _onBeginLayoutObserver: Observer<AdvancedDynamicTexture> | null;

    /**
     * Observer for end layout events.
     * @internal
     */
    private _onEndLayoutObserver: Observer<AdvancedDynamicTexture> | null;

    /**
     * Creates an instance of AdvancedDynamicTextureInstrumentation.
     * @param texture - The AdvancedDynamicTexture to instrument
     */
    constructor(texture: AdvancedDynamicTexture);

    /**
     * Gets the render time performance counter.
     * Use this to access render time statistics (current, min, max, average, etc.).
     */
    get renderTimeCounter(): PerfCounter;

    /**
     * Gets the layout time performance counter.
     * Use this to access layout time statistics (current, min, max, average, etc.).
     */
    get layoutTimeCounter(): PerfCounter;

    /**
     * Gets whether render time capture is currently enabled.
     */
    get captureRenderTime(): boolean;

    /**
     * Sets whether to capture render time metrics.
     * When enabled, monitors onBeginRenderObservable and onEndRenderObservable.
     * @param value - True to enable render time capture, false to disable
     */
    set captureRenderTime(value: boolean);

    /**
     * Gets whether layout time capture is currently enabled.
     */
    get captureLayoutTime(): boolean;

    /**
     * Sets whether to capture layout time metrics.
     * When enabled, monitors onBeginLayoutObservable and onEndLayoutObservable.
     * @param value - True to enable layout time capture, false to disable
     */
    set captureLayoutTime(value: boolean);

    /**
     * Disposes of the instrumentation and removes all observers.
     * Cleans up all event listeners and nullifies references.
     */
    dispose(): void;
}