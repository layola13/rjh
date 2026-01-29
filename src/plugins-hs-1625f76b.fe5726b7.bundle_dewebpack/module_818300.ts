class MoveContentsCommand extends HSApp.Cmd.Command {
    contents: HSCore.Model.Content[];
    private _targetPosition?: HSCore.Util.Position;
    private _option?: MoveContentsOption;
    group?: HSCore.Model.Group;
    ctrlKeyDown: boolean = false;
    altKeyDown: boolean = false;
    saved: SavedContentState[] = [];
    signalHostChanged: HSCore.Util.Signal<HostChangedEvent>;
    output: MoveContentsOutput;
    cmdType: HSFPConstants.CommandType;
    private cmdMoveContent?: HSApp.Cmd.Command;

    constructor(
        contents: HSCore.Model.Content[],
        targetPosition: HSCore.Util.Position | undefined,
        option: MoveContentsOption,
        cmdType?: HSFPConstants.CommandType
    ) {
        super();
        this.contents = contents;
        this._targetPosition = targetPosition;
        this._option = option;
        this.signalHostChanged = new HSCore.Util.Signal();
        this.output = {
            content: this.contents
        };
        this.cmdType = cmdType ?? HSFPConstants.CommandType.MoveContent;
    }

    canSuspend(): boolean {
        return this.altKeyDown;
    }

    private _attatchedHost(content: HSCore.Model.Content): void {
        const snappingHelper = new HSApp.Snapping.Helper(content);
        const strategies = this._getSnappingStrategies(snappingHelper, content);
        snappingHelper.strategies = strategies;

        let snappedHost: HSCore.Model.Content | undefined;

        if (snappingHelper) {
            const foundHost = snappingHelper.doSnapping({
                snapOffset: HSCore.Util.Math.defaultTolerance,
                autoFitEnable: false,
                ignoreSnapOffset: false
            }).some((result: SnappingResult) => {
                const host = result.host;
                if (HSApp.Util.Content.isAppropriateHost(content, host)) {
                    snappedHost = host;
                    return true;
                }
                return false;
            });

            if (!foundHost) {
                snappedHost = undefined;
            }
        }

        const targetHost = snappedHost ?? HSCore.Util.Room.getRoomContentIn(content);

        if (content instanceof HSCore.Model.Content) {
            const currentHost = content.getHost();
            if (currentHost !== targetHost) {
                content.assignTo(targetHost);
                this.signalHostChanged.dispatch({
                    oldHost: currentHost,
                    newHost: targetHost
                });
            }
        }
    }

    private _removeGroup(): void {
        const group = this.group;
        if (!group) {
            return;
        }

        const selectionManager = HSApp.Selection.Manager;
        let wasSelected = false;

        if (selectionManager.hasSelected(group)) {
            wasSelected = true;
            selectionManager.unselect(group);
        }

        group.members.slice(0).forEach((member: HSCore.Model.Content) => {
            group.remove(member);
            if (wasSelected) {
                selectionManager.select(member);
            }
        });

        group.assignTo(null);
    }

    private _checkContentsHost(): void {
        if (this.ctrlKeyDown) {
            return;
        }

        this.contents.forEach((content: HSCore.Model.Content) => {
            this._attatchedHost(content);
        });
    }

    onCleanup(): void {
        if (this.cmdMoveContent) {
            this.cmdMoveContent.onCleanup();
        }

        this._removeGroup();

        const activeView = HSApp.App.getApp().getActive3DView();
        if (activeView) {
            activeView.setTrackingEntity();
        }

        super.onCleanup();
    }

    onExecute(): void {
        const option = this._option;
        const selectionManager = HSApp.Selection.Manager;

        this.contents.forEach((content: HSCore.Model.Content) => {
            if (!selectionManager.hasSelected(content)) {
                selectionManager.select(content);
            }
        });

        const app = HSApp.App.getApp();
        const contentType = HSCore.Util.Content.getGroupContentType(
            app.selectionManager.selected()
        );

        this._saveRestoreData();

        const groupConfig = {
            id: "none",
            contentType: contentType,
            XLength: 1,
            YLength: 1,
            ZLength: 1
        };

        this.group = HSCore.Model.Group.create(groupConfig);

        this.contents.forEach((content: HSCore.Model.Content) => {
            if (!content.group) {
                this.group!.add(content);
            }
        });

        if (this._targetPosition) {
            this.cmdMoveContent = this.mgr.createCommand(this.cmdType, [
                this.group,
                this._targetPosition,
                {
                    moveMembers: true,
                    saved: this.saved
                }
            ]);
            this.cmdMoveContent.execute();
            this.output = {
                content: this.contents
            };
            this.mgr.complete(this);
            return;
        }

        this.output = {
            content: this.group
        };

        this.cmdMoveContent = this.mgr.createCommand(this.cmdType, [
            this.group,
            undefined,
            {
                moveMembers: true,
                saved: this.saved
            }
        ]);

        const executeOption = option ?? {};
        executeOption.select = false;
        executeOption.keepZAxis = false;

        this.cmdMoveContent.execute(executeOption);
    }

    private _saveRestoreData(): void {
        this.saved = [];

        for (let i = 0; i < this.contents.length; i++) {
            const content = this.contents[i];
            if (content) {
                this.saved.push({
                    x: content.x,
                    y: content.y,
                    z: content.z,
                    rotation: content.rotation,
                    host: content.getHost?.()
                });
            }
        }
    }

    private _isContentsMoved(): boolean {
        return !!this.cmdMoveContent && this.cmdMoveContent.isContentMoved();
    }

    private _moveToPosition(content: HSCore.Model.Content, position: HSCore.Util.Position): void {
        if (position.x !== undefined) {
            content.x = position.x;
        }
        if (position.y !== undefined) {
            content.y = position.y;
        }
        if (position.z !== undefined) {
            content.z = position.z < 0 ? 0 : position.z;
        }
    }

    isDraggable(): boolean {
        if (!this.contents || this.contents.length === 0) {
            return false;
        }

        const app = HSApp.App.getApp();

        const isContentDraggable = (content: HSCore.Model.Content): boolean => {
            const contentType = content.contentType;
            if (!contentType) {
                return false;
            }

            if (contentType.isTypeOf(HSCatalog.ContentTypeEnum.Beam)) {
                return !app.is3DViewActive();
            }

            return !contentType.isTypeOf(HSCatalog.ContentTypeEnum.Countertop);
        };

        for (let i = 0; i < this.contents.length; i++) {
            if (!isContentDraggable(this.contents[i])) {
                return false;
            }
        }

        return true;
    }

    onReceive(eventType: string, eventData: CommandEventData): boolean {
        if (eventType === "dragstart") {
            this.altKeyDown = eventData.event.altKey;

            if (!this.isDraggable()) {
                this.mgr.cancel(this);
                return false;
            }
        } else if (eventType === "dragend" || eventType === "mouseup") {
            if (this.cmdMoveContent) {
                this.cmdMoveContent.receive(eventType, eventData);
            }

            if (this._isContentsMoved()) {
                this._checkContentsHost();
                this.mgr.complete(this);
            } else {
                this.mgr.cancel(this);
            }

            return false;
        } else if (eventType === "dragmove") {
            this.ctrlKeyDown = eventData.event.ctrlKey;
        } else if (eventType === "moveto") {
            if (!eventData.position) {
                return false;
            }

            if (!eventData.keepRelativePosition) {
                this.contents.forEach((content: HSCore.Model.Content) => {
                    this._moveToPosition(content, eventData.position);
                });

                if (this._isContentsMoved()) {
                    this._checkContentsHost();
                }

                return false;
            }
        }

        return !!this.cmdMoveContent && this.cmdMoveContent.receive(eventType, eventData);
    }

    onCancel(): void {
        if (this.cmdMoveContent) {
            this.cmdMoveContent.onCancel();
        }
    }

    canUndoRedo(): boolean {
        return false;
    }

    private _getSnappingStrategies(
        helper: HSApp.Snapping.Helper,
        content: HSCore.Model.Content
    ): HSApp.Snapping.Strategy[] {
        const strategyCallbacks: Record<string, StrategyCallbacks> = {};

        let strategies = HSApp.Snapping.getContentSnappingStrategies(
            content,
            this._option?.viewType
        );

        const is2DView = HSApp.App.getApp().is2DViewActive();

        const excludedStrategies = [
            is2DView ? HSApp.Snapping.SnapToFloor2D : HSApp.Snapping.SnapToFloor3D,
            is2DView ? HSApp.Snapping.SnapToCeiling2D : HSApp.Snapping.SnapToCeiling3D,
            HSApp.Snapping.SnapToContent
        ];

        strategies = strategies.filter((strategyClass: SnappingStrategyClass) => {
            return !excludedStrategies.includes(strategyClass);
        });

        return strategies.map((StrategyClass: SnappingStrategyClass) => {
            const doSnappingCallback = strategyCallbacks[StrategyClass.ClassName]?.doSnappingCallback;
            const validatorCallback = strategyCallbacks[StrategyClass.ClassName]?.vialidatorCallback;

            return new StrategyClass(content, helper, doSnappingCallback, validatorCallback);
        });
    }

    getDescription(): string {
        return "移动物品";
    }

    getCategory(): HSFPConstants.LogGroupTypes {
        return HSFPConstants.LogGroupTypes.ContentOperation;
    }
}

interface MoveContentsOption {
    viewType?: string;
    select?: boolean;
    keepZAxis?: boolean;
}

interface SavedContentState {
    x: number;
    y: number;
    z: number;
    rotation: number;
    host?: HSCore.Model.Content;
}

interface MoveContentsOutput {
    content: HSCore.Model.Content[] | HSCore.Model.Group;
}

interface HostChangedEvent {
    oldHost: HSCore.Model.Content;
    newHost: HSCore.Model.Content;
}

interface SnappingResult {
    host: HSCore.Model.Content;
}

interface CommandEventData {
    event: {
        altKey: boolean;
        ctrlKey: boolean;
    };
    position?: HSCore.Util.Position;
    keepRelativePosition?: boolean;
}

interface StrategyCallbacks {
    doSnappingCallback?: () => void;
    vialidatorCallback?: () => boolean;
}

type SnappingStrategyClass = new (
    content: HSCore.Model.Content,
    helper: HSApp.Snapping.Helper,
    doSnappingCallback?: () => void,
    validatorCallback?: () => boolean
) => HSApp.Snapping.Strategy;

HSApp.Cmd.Command.registerCmd(HSFPConstants.CommandType.MoveContents, MoveContentsCommand);

export default MoveContentsCommand;