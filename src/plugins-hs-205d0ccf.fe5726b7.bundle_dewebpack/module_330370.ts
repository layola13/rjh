class SetCeilingStateRequest extends HSCore.Transaction.Request {
    private readonly _room: HSCore.Model.Room;
    private readonly _isCeilingOn: boolean;

    constructor(room: HSCore.Model.Room, isCeilingOn: boolean) {
        super();
        this._room = room;
        this._isCeilingOn = isCeilingOn;
    }

    onCommit(): unknown[] {
        const room = this._room;
        const isCeilingOn = this._isCeilingOn;

        if (!isCeilingOn) {
            HSApp.App.getApp().floorplan.forEachContent((content: HSCore.Model.Content) => {
                const host = content.getHost();
                const isCeilingHost = host?.contentType?.isTypeOf(HSCatalog.ContentTypeEnum.ext_Ceiling);
                
                if (!isCeilingHost) {
                    const isCeilingAttached = content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_CeilingAttached);
                    const isInRoom = HSCore.Util.Room.isContentInRoom(content, room);
                    
                    if (isCeilingAttached && isInRoom) {
                        const deleteRequest = this.mgr.createRequest(
                            HSFPConstants.RequestType.DeleteProduct,
                            [content]
                        );
                        this.append(deleteRequest);
                    }
                }
            }, this);
        }

        const changeFlagRequest = this.mgr.createRequest(
            HSConstants.RequestType.ChangeFlag,
            [room, HSCore.Model.RoomFlagEnum.ceilingOff, !isCeilingOn]
        );
        this.append(changeFlagRequest);

        return super.onCommit?.call(this, []) ?? [];
    }
}

export default SetCeilingStateRequest;