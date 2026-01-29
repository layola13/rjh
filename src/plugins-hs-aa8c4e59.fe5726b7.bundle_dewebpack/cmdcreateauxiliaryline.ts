import { CreateAuxiliaryLineGizmo } from './CreateAuxiliaryLineGizmo';

export class CmdCreateAuxiliaryLine extends HSApp.Cmd.Command {
    private _gizmo?: CreateAuxiliaryLineGizmo;
    private _canvas?: HSApp.View.Canvas2D;

    onExecute(): void {
        this.context.app.selectionManager.unselectAll();
        this._canvas = this.context.app.getActive2DView();

        const { gizmoManager, context, displayLayers } = this._canvas;
        
        this._gizmo = new CreateAuxiliaryLineGizmo(
            context,
            displayLayers.temp,
            this
        );
        
        gizmoManager.addGizmo(this._gizmo);
        
        this._canvas.context.cursorStatus.setCurrentStatus(
            `cursor: url(${HSConstants.Resources.svgs.guideLineCursor}) 0 0, auto;`
        );
    }

    onReceive(eventType: string, data: { event: MouseEvent }): boolean {
        const { event } = data;

        switch (eventType) {
            case "mousedown":
                return false;

            case "mousemove":
                if (event.type === "mouseup" || this._gizmo) {
                    this._gizmo?.mouseMoveHandler(event);
                }
                return false;

            case "click":
                const app = HSApp.App.getApp();
                
                if (!app.appSettings.getViewItem("auxiliaryLineVisible")) {
                    app.appSettings.setViewItem("auxiliaryLineVisible", true);
                    appSettingsUtil.save("auxiliaryLineVisible");
                    
                    Object.values(app.floorplan.scene.activeLayer.auxiliaryLines).forEach(
                        (auxiliaryLine: HSCore.Model.Entity) => {
                            auxiliaryLine.setFlagOff(HSCore.Model.EntityFlagEnum.hidden);
                            auxiliaryLine.dirty();
                        }
                    );
                }
                
                this._gizmo?.mouseClickHandler(event);
                return false;

            default:
                return super.onReceive(eventType, data);
        }
    }

    onCleanup(): void {
        if (this._gizmo && this._canvas) {
            this._canvas.gizmoManager.removeGizmo(this._gizmo);
            this._gizmo.onCleanup();
        }

        this._canvas?.context.cursorStatus.setCurrentStatus(
            HSApp.View.CursorEnum.default
        );
    }

    getCurrentParams(): {
        activeSection: string;
        activeSectionName: string;
        clicksRatio: {
            id: string;
            name: string;
        };
    } {
        return {
            activeSection: HSFPConstants.LogGroupTypes.WallOperation,
            activeSectionName: "墙体操作",
            clicksRatio: {
                id: "drawAuxiliaryLine",
                name: "绘制户型辅助线"
            }
        };
    }

    getDescription(): string {
        return "进入辅助线绘制模式";
    }

    isInteractive(): boolean {
        return false;
    }
}