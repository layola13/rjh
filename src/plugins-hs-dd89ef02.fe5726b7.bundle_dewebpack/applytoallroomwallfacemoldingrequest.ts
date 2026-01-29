import { HSCore } from './HSCore';

export class ApplyToAllRoomWallFaceMoldingRequest extends HSCore.Transaction.Common.CompositeRequest {
  private entity: HSCore.Model.Room;
  private wallMoldingType?: HSCore.Model.MoldingTypeEnum;
  private isApply: boolean;

  constructor(
    entity: HSCore.Model.Room,
    wallMoldingType: HSCore.Model.MoldingTypeEnum | undefined,
    isApply: boolean
  ) {
    super();
    this.entity = entity;
    this.wallMoldingType = wallMoldingType;
    this.isApply = isApply;
  }

  onCommit(): void {
    this.applyToAllWallMolding();
  }

  /**
   * Get all interior wall faces for the given walls
   */
  private getInteriorWallsFace(walls: HSCore.Model.Wall[]): HSCore.Model.WallFace[] {
    const faces: HSCore.Model.WallFace[] = [];

    if (!walls || walls.length === 0) {
      return faces;
    }

    walls.forEach((wall) => {
      const leftFaces = wall.getFaces(HSCore.Model.WallFaceType.left);
      faces.push(...Object.values(leftFaces));

      const rightFaces = wall.getFaces(HSCore.Model.WallFaceType.right);
      faces.push(...Object.values(rightFaces));

      if (this.isNeedSideSurface(wall, true)) {
        const frontFaces = wall.getFaces(HSCore.Model.WallFaceType.front);
        faces.push(...Object.values(frontFaces));
      }

      if (this.isNeedSideSurface(wall, false)) {
        const backFaces = wall.getFaces(HSCore.Model.WallFaceType.back);
        faces.push(...Object.values(backFaces));
      }
    });

    return faces;
  }

  /**
   * Get all faces from all floors in the active layer
   */
  private getAllFaces(): HSCore.Model.WallFace[] {
    const allFaces: HSCore.Model.WallFace[] = [];
    const geometryManager = HSCore.Doc.getDocManager().geometryManager;

    HSApp.App.getApp().floorplan.scene.activeLayer.forEachFloor((floor: HSCore.Model.Floor) => {
      const faceRoomInfo = geometryManager.getFaceRoomInfo(floor);
      allFaces.push(...faceRoomInfo.wallFaces.faces);

      const interiorWallFaces = this.getInteriorWallsFace(faceRoomInfo.interiorWalls);
      allFaces.push(...interiorWallFaces);

      if (faceRoomInfo.isolatedWallFaces?.walls) {
        const isolatedWallFaces = this.getInteriorWallsFace(faceRoomInfo.isolatedWallFaces.walls);
        allFaces.push(...isolatedWallFaces);
      }
    });

    return allFaces.filter((face) => !!face.roomInfo);
  }

  /**
   * Check if side surface is needed for the given wall
   */
  private isNeedSideSurface(wall: HSCore.Model.Wall, isFrom: boolean): boolean {
    const app = HSApp.App.getApp();
    const point = isFrom ? wall.from : wall.to;
    const parentWalls = HSCore.Util.Point.getParentWalls(point);
    
    return (
      parentWalls.length === 1 &&
      !app.associationManager.getEntityByTargetId(point.id)
    );
  }

  /**
   * Apply molding to a specific surface type
   */
  private applyMoldingToSurfaceType(
    face: HSCore.Model.WallFace,
    moldingType: HSCore.Model.MoldingTypeEnum,
    molding?: HSCore.Model.Baseboard[] | HSCore.Model.Cornice[]
  ): void {
    const request = this.mgr.createRequest(
      HSFPConstants.RequestType.AddWallFaceMolding,
      [molding?.[0], face, moldingType]
    );
    this.append(request);
  }

  /**
   * Apply molding by type to all faces
   */
  private applyModingByType(moldingType: HSCore.Model.MoldingTypeEnum): void {
    let molding = this.isApply && this.entity.getMolding(moldingType);
    const selected = this.isApply ? HSApp.App.getApp().selectionManager.selected() : [];

    if (
      selected &&
      selected.length > 0 &&
      (selected[0] instanceof HSCore.Model.Baseboard ||
        selected[0] instanceof HSCore.Model.Cornice)
    ) {
      molding = [selected[0]];
    }

    const faces = this.getAllFaces();
    faces?.forEach((face) => {
      this.applyMoldingToSurfaceType(face, moldingType, molding);
    });
  }

  /**
   * Apply molding to all wall faces
   */
  private applyToAllWallMolding(): void {
    const moldingTypes = [
      HSCore.Model.MoldingTypeEnum.Baseboard,
      HSCore.Model.MoldingTypeEnum.Cornice
    ];

    if (this.wallMoldingType === undefined) {
      moldingTypes.forEach((type) => {
        this.applyModingByType(type);
      });
    } else {
      this.applyModingByType(this.wallMoldingType);
    }

    if (this._subRequests.length > 0) {
      super.onCommit([]);
    }
  }
}