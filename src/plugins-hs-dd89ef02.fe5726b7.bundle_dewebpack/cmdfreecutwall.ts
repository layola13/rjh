import { FreeCutWall } from './FreeCutWall';

export class CmdFreeCutWall extends HSApp.Cmd.Command {
    public signalRequestCommitted: HSCore.Util.Signal<CmdFreeCutWall>;
    private gizmo?: FreeCutWall;
    private _session?: any;
    private _request?: any;
    private splitPoint?: any;
    private wall?: any;

    constructor() {
        super();
        this.signalRequestCommitted = new HSCore.Util.Signal(this);
    }

    createGizmo(): void {
        const activeView = this.context.app.getActive2DView();
        const gizmoManager = activeView.gizmoManager;
        this.gizmo = new FreeCutWall(
            activeView.context,
            activeView.displayLayers.temp,
            this,
            this.wall
        );
        gizmoManager.addGizmo(this.gizmo);
    }

    destroyGizmo(): void {
        const gizmoManager = this.context.app.getActive2DView().gizmoManager;
        gizmoManager.removeGizmo(this.gizmo);
        this.gizmo?.onCleanup();
        this.gizmo = undefined;
    }

    onCleanup(event?: any): void {
        this._session.commit({ mergeRequest: false });
        this._session = undefined;
        this.destroyGizmo();
    }

    onESC(): void {
        if (this.gizmo?.snapSelected) {
            this.gizmo.onESC();
        } else {
            HSApp.App.getApp().cmdManager.cancel();
        }
    }

    onExecute(): void {
        const transactionManager = this.context.transManager;
        this._session = transactionManager.startSession();
        this.createGizmo();
    }

    onReceive(eventType: string, data: any): boolean {
        let shouldContinue = true;

        if (eventType === 'gizmo.freecutwall') {
            const wall = data.wall;
            const uniqueParent = wall.getUniqueParent();
            
            this._request = this.context.transManager.createRequest(
                HSFPConstants.RequestType.FreeCutWall,
                [uniqueParent, wall, data.lerp]
            );
            
            this.context.transManager.commit(this._request);
            this.signalRequestCommitted.dispatch();
            this.splitPoint = this._request.splitPoint;

            const selectionManager = HSApp.Selection.Manager;
            selectionManager.unselectAll();
            selectionManager.select(this.splitPoint);
        } else {
            shouldContinue = super.onReceive?.(eventType, data) ?? true;
        }

        return shouldContinue;
    }

    canUndoRedo(): boolean {
        return false;
    }

    isInteractive(): boolean {
        return true;
    }

    getDescription(): string {
        return '切割墙体';
    }

    getCategory(): string {
        return HSFPConstants.LogGroupTypes.WallOperation;
    }
}