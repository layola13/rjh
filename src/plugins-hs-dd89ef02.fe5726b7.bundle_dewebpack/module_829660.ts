export default class DeleteRequestsFactory {
  static getDeleteContentsRequests(
    entities: HSCore.Model.Entity[],
    targetRoom?: HSCore.Model.Room
  ): HSFPConstants.Request[] {
    const app = HSApp.App.getApp();
    const requests: HSFPConstants.Request[] = [];
    const transManager = app.transManager;

    entities.forEach((entity) => {
      if (
        entity instanceof HSCore.Model.PAssembly &&
        Object.keys(entity.parents).length === 0
      ) {
        return;
      }

      if (targetRoom) {
        const roomContent = HSCore.Util.Room.getRoomContentIn(entity);
        if (!roomContent || roomContent.ID !== targetRoom.ID) {
          return;
        }
      }

      if (!entity.isFlagOn(HSCore.Model.EntityFlagEnum.removed)) {
        const request = transManager.createRequest(
          HSFPConstants.RequestType.DeleteProduct,
          [entity]
        );
        requests.push(request);
      }
    });

    return requests;
  }

  static getDeleteFaceDecorationsRequests(
    room?: HSCore.Model.Room,
    layers: HSCore.Model.Layer[] = []
  ): HSFPConstants.Request[] {
    const app = HSApp.App.getApp();
    const requests: HSFPConstants.Request[] = [];
    const transManager = app.transManager;
    let faces: HSCore.Model.Face[] = [];

    if (room) {
      const roomInfo = room.roomInfos[0];
      if (!roomInfo) {
        return [];
      }

      if (roomInfo.ceilings) {
        faces.push(...roomInfo.ceilings);
      }

      if (roomInfo.floors) {
        faces.push(...roomInfo.floors);
      }

      if (roomInfo.faces) {
        faces = faces.concat(roomInfo.faces);
        roomInfo.faces.forEach((face) => {
          requests.xPushCollection(
            DeleteRequestsFactory.getDeleteFaceMoldingRequests(face)
          );
        });
      }
    } else {
      const activeLayer = app.floorplan.scene.activeLayer;
      if (layers.length === 0) {
        layers.push(activeLayer);
      }

      layers.forEach((layer) => {
        layer.forEachSlab((slab) => {
          slab.forEachFace((face) => {
            faces.push(face);
          });
        });

        layer.forEachFace((face) => {
          const master = face.getMaster();
          if (
            master instanceof HSCore.Model.Opening &&
            master.getBottomFaces().includes(face)
          ) {
            return;
          }

          faces.push(face);
          requests.xPushCollection(
            DeleteRequestsFactory.getDeleteFaceMoldingRequests(face)
          );
        });
      });
    }

    const paintMessageEnum = HSApp.PaintPluginHelper.Enum.PaintCmdMessageEnum;

    faces.forEach((face) => {
      if (face.material?.mixpaint) {
        const master = face.getMaster();
        const faceType = master?.getFaceType(face);
        const requestParams = [
          face,
          faceType,
          {
            msg: paintMessageEnum.clearMaterial,
          },
        ];
        const request = transManager.createRequest(
          HSFPConstants.RequestType.EditMaterial,
          requestParams
        );
        requests.push(request);
      }
    });

    return requests;
  }

  static getDeletedDoorStoneRequests(
    room?: HSCore.Model.Room,
    layers: HSCore.Model.Layer[] = []
  ): HSFPConstants.Request[] {
    const requests: HSFPConstants.Request[] = [];
    const app = HSApp.App.getApp();
    const transManager = app.transManager;

    const createDoorStoneRequest = (opening: HSCore.Model.Opening): void => {
      const request = transManager.createRequest(
        HSFPConstants.RequestType.ChangeDoorStoneStatus,
        [opening, false]
      );
      requests.push(request);
    };

    if (room) {
      room.structureFaces.forEach((face) => {
        face.openings.forEach(createDoorStoneRequest);
      });
    } else {
      const activeLayer = app.floorplan.scene.activeLayer;
      if (layers.length === 0) {
        layers.push(activeLayer);
      }

      layers.forEach((layer) => {
        layer.forEachOpening(createDoorStoneRequest);
      });
    }

    return requests;
  }

  static getDeleteFaceMoldingRequests(
    face: HSCore.Model.Face
  ): HSFPConstants.Request[] {
    const requests: HSFPConstants.Request[] = [];
    const transManager = HSApp.App.getApp().transManager;
    const baseboardType = HSCore.Model.MoldingTypeEnum.Baseboard;
    const corniceType = HSCore.Model.MoldingTypeEnum.Cornice;

    if (face.getMolding(baseboardType)) {
      const request = transManager.createRequest(
        HSFPConstants.RequestType.AddWallFaceMolding,
        [undefined, face, baseboardType]
      );
      requests.push(request);
    }

    if (face.getMolding(corniceType)) {
      const request = transManager.createRequest(
        HSFPConstants.RequestType.AddWallFaceMolding,
        [undefined, face, corniceType]
      );
      requests.push(request);
    }

    return requests;
  }

  static getDeleteCustomizedPMModelsRequests(
    entities: HSCore.Model.Entity[],
    targetRoom?: HSCore.Model.Room
  ): HSFPConstants.Request[] {
    const app = HSApp.App.getApp();
    const requests: HSFPConstants.Request[] = [];
    const transManager = app.transManager;

    entities.forEach((entity) => {
      if (
        !(entity instanceof HSCore.Model.CustomizedPMModel) ||
        entity.isFlagOn(HSCore.Model.EntityFlagEnum.removed)
      ) {
        return;
      }

      const allChildren = entity.getAllChildren();

      if (targetRoom) {
        allChildren.forEach((child) => {
          const hostRooms = child.getHostRoom();
          const hostRoom = hostRooms?.[0];

          if (hostRoom?.ID === targetRoom.ID) {
            const request = transManager.createRequest(
              HSFPConstants.RequestType.DeleteCustomizedPMInstanceModel,
              [[child]]
            );
            requests.push(request);
          }
        });
      } else if (allChildren?.length) {
        const request = transManager.createRequest(
          HSFPConstants.RequestType.DeleteCustomizedPMInstanceModel,
          [allChildren]
        );
        requests.push(request);
      }
    });

    return requests;
  }
}