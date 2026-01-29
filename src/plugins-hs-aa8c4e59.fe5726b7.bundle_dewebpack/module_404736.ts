class SelectRoomForAutoRecommendCommand extends HSApp.Cmd.CompositeCommand {
    private _autoRecommendPlugin: any;
    private _cmdMgr: any;
    private _app: any;

    constructor(autoRecommendPlugin: any, cmdManager: any) {
        super();
        this._autoRecommendPlugin = autoRecommendPlugin;
        this._cmdMgr = cmdManager;
        this._app = HSApp.App.getApp();
    }

    public onExecute(): void {
        const activeView = this._app.getActive2DView();
        if (!activeView) {
            return;
        }

        const context = activeView.context;
        if (!activeView.findDisplayObject(this)) {
            const RoomAttachedGizmo = HSApp.Util.Core.define("hsw.plugin.customizedmodeling").RoomAttachedGizmo;
            const gizmo = new RoomAttachedGizmo(context, activeView.displayLayers.temp, this);
            activeView.registerDisplayObject(this, gizmo);
        }
    }

    public onReceive(eventType: string, eventData: any): boolean {
        let handled = false;

        if (eventType === "gizmo.click") {
            if (!eventData.room) {
                return true;
            }

            let targetRoom = eventData.room;
            if (targetRoom instanceof HSCore.Model.Ceiling) {
                targetRoom = HSCore.Util.Ceiling.getCeilingFloor(targetRoom);
            }

            const roomContents = HSApp.Util.Recommend.getRoomContents(targetRoom).contentsIncludeGroup;
            const isSupportedSpace = HSApp.Util.Recommend.isSupportedSpace(targetRoom.roomType);
            const hasAnchorContent = !targetRoom.roomType && roomContents.some((content: any) => {
                return HSApp.Util.Recommend.isAnchorContent(content);
            });

            if (isSupportedSpace || hasAnchorContent) {
                this._cmdMgr.complete(this);
                this._autoRecommendPlugin.startRecommendFromToolbar(targetRoom);
                handled = true;
            } else {
                LiveHint.show(
                    ResourceManager.getString("liveHint_only_room"),
                    undefined,
                    undefined,
                    {
                        canclose: true,
                        closeCallback: () => {
                            const cmdManager = HSApp.App.getApp().cmdManager;
                            if (cmdManager.current && cmdManager.current.type === HSFPConstants.CommandType.CmdSelectRoomForAutoRecommend) {
                                cmdManager.cancel();
                            }
                        }
                    }
                );
                handled = false;
            }
        } else {
            handled = super.onReceive(eventType, eventData);
        }

        return handled;
    }

    public onCleanup(): void {
        LiveHint.hide();
    }

    public getDescription(): string {
        return "智能搭配: 选择智能搭配房间";
    }

    public getCategory(): string {
        return HSFPConstants.LogGroupTypes.SmartCollocation;
    }
}

export default SelectRoomForAutoRecommendCommand;