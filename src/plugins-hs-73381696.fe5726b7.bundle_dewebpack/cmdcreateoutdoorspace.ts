import { HSCore } from './HSCore';
import { CreateOutdoorSpace } from './CreateOutdoorSpace';

export class CmdCreateOutdoorSpace extends HSApp.Cmd.Command {
    private _signalHook: HSCore.Util.SignalHook;
    private cmdManager: any;
    private gizmo?: CreateOutdoorSpace;
    private _UISession?: any;

    constructor() {
        super();
        this._signalHook = new HSCore.Util.SignalHook(this);
        this.cmdManager = HSApp.App.getApp().cmdManager;
    }

    createGizmo(): void {
        const activeView = this.context.app.getActive2DView();
        const gizmoManager = activeView.gizmoManager;
        this.gizmo = new CreateOutdoorSpace(
            activeView.context,
            activeView.displayLayers.temp,
            this
        );
        gizmoManager.addGizmo(this.gizmo);
    }

    destroyGizmo(): void {
        const view = this.context.app.getActive2DView();
        view.gizmoManager.removeGizmo(this.gizmo);
        this.gizmo?.onCleanup();
        this.gizmo = undefined;
    }

    private _init(): void {
        this._endUISession();
    }

    private _updateCursorStatus(cursorStyle: string): void {
        const app = HSApp.App.getApp();
        app.activeView.context.cursorStatus.unlock();
        app.activeView.context.cursorStatus.setCurrentStatus(cursorStyle);
    }

    onExecute(): void {
        const transManager = this.context.transManager;
        this._signalHook.listen(
            transManager.signalUndone,
            this._onTransactionStateChanged
        );
        this.context.app.selectionManager.unselectAll();
        this.createGizmo();
    }

    private _endUISession(): void {
        if (this._UISession) {
            this._UISession.end();
            this._UISession = undefined;
        }
    }

    private _onTransactionStateChanged(): void {
        const transManager = this.context.transManager;
        if (transManager.getSessionCount() === 3 && !transManager.canUndo()) {
            this._endUISession();
        }
    }

    isCenterMode(): boolean {
        return true;
    }

    private _onComplete(): void {
        const transManager = this.context.transManager;
        const session = transManager.startSession();
        const request = transManager.createRequest(
            HSFPConstants.RequestType.CreateOutdoorSpace,
            [this.gizmo!.tempEdges]
        );
        transManager.commit(request);
        this.gizmo!.reset();
        session.commit({ mergeRequest: false });
    }

    private _onCancel(): void {
        this.context.transManager.cancel();
    }

    onCleanup(): void {
        this._endUISession();
        this.destroyGizmo();
        this._updateCursorStatus(HSApp.View.CursorEnum.default);
        this._signalHook.dispose();
        this._signalHook = undefined as any;
    }

    onESC(): void {
        if (this.gizmo && this.gizmo.path.length > 0) {
            this.gizmo.onESC();
        } else {
            HSApp.App.getApp().cmdManager.cancel();
        }
    }

    onReceive(eventName: string, eventData: any): boolean {
        const cursorUrl = 'cursor: url(data:image/png;base64,...) 0 24, auto;';
        this._updateCursorStatus(cursorUrl);

        if (eventName === 'gizmo.createoutdoorspace') {
            const path = eventData.path;
            if (!path || path.length < 2) {
                this._onCancel();
            } else {
                this._init();
                this._onComplete();
            }
            return true;
        }

        if (eventName === 'gizmo.createuirequest') {
            return false;
        }

        if (eventName === 'click' && eventData.event && eventData.event.which === 3) {
            this.onESC();
        }

        return super.onReceive?.(eventName, eventData) ?? false;
    }

    getDescription(): string {
        return '绘制外部区域';
    }

    isInteractive(): boolean {
        return true;
    }
}