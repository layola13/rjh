// @ts-nocheck
import { Application } from './types/Application';
import { Canvas } from './types/Canvas';
import { CommandEvent } from './types/CommandEvent';
import { CameraTypeEnum } from './types/HSCore';
import { CommandType } from './types/HSFPConstants';
import CameraControlGizmo from './CameraControlGizmo';

/**
 * Camera rotation gizmo that manages multiple camera control gizmos
 * for different rotation angles in 3D view
 */
export default class CameraRotationGizmo extends HSApp.View.Base.Gizmo {
    private _cameraControls?: CameraControlGizmo[];

    constructor(
        application: Application,
        canvas: Canvas,
        options?: unknown
    ) {
        super(application, canvas);

        const rotationAngles: number[] = [
            0,
            Math.PI,
            0.5 * Math.PI,
            -0.5 * Math.PI
        ];

        this._cameraControls = rotationAngles.map((angle: number) => {
            return new CameraControlGizmo(application, canvas, angle);
        });

        this._cameraControls.forEach((control: CameraControlGizmo) => {
            this.addChildGizmo(control);
        });

        const commandManager = application.cmdManager;

        this.signalHook
            .listen(commandManager.signalCommandStarted, this._onCmdStart)
            .listen(commandManager.signalCommandResumed, this._onCmdStart)
            .listen(commandManager.signalCommandSuspending, this._onCmdEnd)
            .listen(commandManager.signalCommandTerminating, this._onCmdEnd)
            .listen(application.signalViewActivated, this._onViewChanged)
            .listen(application.floorplan.signalActiveCameraChanged, this._onViewChanged);

        this.show();
    }

    /**
     * Cleanup resources when gizmo is destroyed
     */
    public onCleanup(): void {
        this.hide();
        this._cameraControls = undefined;
        super.onCleanup();
    }

    /**
     * Handle view change events
     * Hides gizmo if current view is not active or camera type is OrbitView
     */
    private _onViewChanged = (): void => {
        const application = this.context.application;
        const isActiveView = application.isActiveView(this.canvas);
        const isOrbitView = application.floorplan.active_camera.type === CameraTypeEnum.OrbitView;

        if (!isActiveView || isOrbitView) {
            this.hide();
        }
    };

    /**
     * Handle command start events
     * Shows gizmo only for MoveCamera3D commands in valid view state
     */
    private _onCmdStart = (event: CommandEvent): void => {
        if (event.data.cmd.type === CommandType.MoveCamera3D) {
            const application = this.context.application;
            const isActiveView = application.isActiveView(this.canvas);
            const isOrbitView = application.floorplan.active_camera.type === CameraTypeEnum.OrbitView;

            if (this.active && isActiveView && !isOrbitView) {
                this.show();
            }
        } else {
            this.hide();
        }
    };

    /**
     * Handle command end events
     * Shows gizmo if in valid view state
     */
    private _onCmdEnd = (): void => {
        const application = this.context.application;
        const isActiveView = application.isActiveView(this.canvas);
        const isOrbitView = application.floorplan.active_camera.type === CameraTypeEnum.OrbitView;

        if (this.active && isActiveView && !isOrbitView) {
            this.show();
        }
    };
}