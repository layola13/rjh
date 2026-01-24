/**
 * FPS (Frames Per Second) counter utility class.
 * Monitors and calculates frame rates for 3D view rendering performance.
 */
export default class FpsCounter {
    /**
     * Reference to the parent application instance
     */
    private _app: Application;

    /**
     * Number of FPS samples to collect before dispatching signal
     */
    private _count: number;

    /**
     * Signal dispatched when the configured count of FPS samples has been collected
     */
    public signalFpsCounted: HSCore.Util.Signal<FpsCountedPayload>;

    /**
     * Internal signal hook manager for listening to application signals
     */
    private _signalHook: HSCore.Util.SignalHook;

    /**
     * Timestamp of the previous FPS calculation (in milliseconds)
     */
    private prevTime: number;

    /**
     * Current frame count since last FPS calculation
     */
    private frames: number;

    /**
     * Array storing all calculated FPS values
     */
    private allFps: number[];

    /**
     * Creates a new FPS counter instance
     * @param app - The application instance to monitor
     * @param count - Number of FPS samples to collect before signaling
     */
    constructor(app: Application, count: number) {
        this._app = app;
        this._count = count;
        this.signalFpsCounted = new HSCore.Util.Signal(this);
        this._signalHook = new HSCore.Util.SignalHook(this);
    }

    /**
     * Starts the FPS counting process.
     * Initializes counters and begins listening to animation frame signals.
     */
    public start(): void {
        this.prevTime = (performance || Date).now();
        this.frames = 0;
        this.allFps = [];
        this._signalHook.listen(this._app.signalNewAnimationFrame, this.onNewAnimationFrame);
    }

    /**
     * Stops the FPS counting process.
     * Resets counters and removes animation frame listeners.
     */
    public stop(): void {
        this.frames = 0;
        this.allFps = [];
        this._app.signalNewAnimationFrame.unlisten(this.onNewAnimationFrame, this);
    }

    /**
     * Handler called on each animation frame.
     * Calculates FPS every second and dispatches signal when enough samples are collected.
     */
    private onNewAnimationFrame(): void {
        // Reset if 3D view is not active
        if (!this._app.is3DViewActive()) {
            if (this.allFps.length > 0) {
                this.frames = 0;
                this.allFps = [];
            }
            this.prevTime = (performance || Date).now();
            return;
        }

        this.frames++;

        const currentTime = (performance || Date).now();
        const ONE_SECOND_MS = 1000;

        // Calculate FPS every second
        if (currentTime >= this.prevTime + ONE_SECOND_MS) {
            const fps = (ONE_SECOND_MS * this.frames) / (currentTime - this.prevTime);
            this.allFps.push(fps);
            this.prevTime = currentTime;
            this.frames = 0;

            // Dispatch signal when enough samples are collected
            if (this.allFps.length >= this._count) {
                this.signalFpsCounted.dispatch({
                    fpsArray: this.allFps.slice()
                });
                this.allFps = [];
            }
        }
    }
}

/**
 * Payload dispatched by signalFpsCounted signal
 */
interface FpsCountedPayload {
    /**
     * Array of collected FPS values
     */
    fpsArray: number[];
}

/**
 * Application interface (minimal definition based on usage)
 */
interface Application {
    /**
     * Signal emitted on each animation frame
     */
    signalNewAnimationFrame: HSCore.Util.Signal<void>;

    /**
     * Checks if the 3D view is currently active
     */
    is3DViewActive(): boolean;
}

/**
 * HSCore utility namespace
 */
declare namespace HSCore.Util {
    /**
     * Generic signal/event dispatcher
     */
    class Signal<T = any> {
        constructor(context: any);
        dispatch(payload: T): void;
        unlisten(callback: Function, context: any): void;
    }

    /**
     * Signal hook manager for managing signal listeners
     */
    class SignalHook {
        constructor(context: any);
        listen(signal: Signal<any>, callback: Function): void;
    }
}