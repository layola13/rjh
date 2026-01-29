class CmdApplyToEntireRoom extends HSApp.Cmd.Command {
  private _app: any;
  private _curContents: any[];
  private _transManager: any;
  private _rmContents: any[];
  private _rmCntHostsMap: Map<any, any>;

  constructor(options: {
    app: any;
    curContents: any[];
    transManager: any;
  }) {
    super();
    this._app = options.app;
    this._curContents = options.curContents;
    this._transManager = options.transManager;
    this._rmContents = [];
    this._rmCntHostsMap = new Map();
  }

  canUndoRedo(): boolean {
    return false;
  }

  canSuspend(): boolean {
    return false;
  }

  private _generateContents(
    positions: any[],
    dumpContext: any,
    basicContent: any
  ): void {
    const request = this._transManager.createRequest(
      HSFPConstants.RequestType.ApplyWallBoard,
      [{
        positions,
        dumpContext,
        app: this._app,
        basicContent,
        rmContents: this._rmContents,
        rmCntHostsMap: this._rmCntHostsMap
      }]
    );
    this._transManager.commit(request);
  }

  isConcaveConer(face1: any, face2: any): boolean {
    if (!face1 || !face2) return false;

    const getDirection = (face: any): THREE.Vector3 | undefined => {
      const profile = HSCore.Util.Geometry.getWallSideFaceProfile(face);
      if (profile) {
        const from = GeLib.VectorUtils.toTHREEVector3(profile.from);
        const to = GeLib.VectorUtils.toTHREEVector3(profile.to);
        return to.clone().sub(from).normalize();
      }
    };

    const direction1 = getDirection(face1);
    const direction2 = getDirection(face2);

    if (!direction1 || !direction2) return false;

    const cross = new THREE.Vector3().crossVectors(direction1, direction2);
    return cross.z < 0;
  }

  onExecute(): void {
    const content = this._curContents[0];
    const host = this._curContents[0].getHost();

    if (!host || !(host instanceof HSCore.Model.Face) || !host.surfaceObj.surface.isPlane()) {
      return;
    }

    const master = host.getMaster();
    if (!(master instanceof HSCore.Model.Wall || master instanceof HSCore.Model.NCustomizedStructure)) {
      return;
    }

    const facePath = this._getFaceFloorPath(host);
    const room = getContentHostRoom(content);

    if (!room || !(room instanceof HSCore.Model.Floor)) {
      return;
    }

    const hostId = content.getHost().id;
    const innerPaths = [
      { point: facePath.end, isWallBoardPoint: false },
      { point: facePath.start, isWallBoardPoint: false }
    ];

    const direction = new THREE.Vector3()
      .subVectors(innerPaths[1].point, innerPaths[0].point)
      .normalize();

    const normal = host.surfaceObj.getNormal().normalize();

    const dumpContext = {
      data: {},
      materialsData: new Map(),
      statesData: {},
      constraintsData: new Map(),
      productsMap: new Map()
    };

    const dumpData = content.dump(undefined, true, dumpContext);
    dumpContext.basicContentData = dumpData;

    const contentWidth = content.XLength * content.XScale;
    const contentDepth = content.YLength * content.YScale;
    const contentHeight = content.ZLength * content.ZScale + content.z;

    let allPositions: any[] = [];
    let nextFace: any;
    let prevFace: any;

    const wallFaces = HSApp.App.getApp().geometryManager.getFaceRoomInfo(room).wallFaces.faces;

    for (const faceKey in wallFaces) {
      const currentFace = wallFaces[faceKey];
      if (!(currentFace instanceof HSCore.Model.Face)) continue;
      if (!currentFace.surfaceObj.surface.isPlane()) continue;

      const currentMaster = currentFace.getMaster();
      if (!(currentMaster instanceof HSCore.Model.Wall || currentMaster instanceof HSCore.Model.NCustomizedStructure)) {
        continue;
      }

      const currentFacePath = this._getFaceFloorPath(currentFace);
      const wallBoardPaths = currentFace.id === hostId 
        ? getWallBoardPaths(dumpData, direction, contentWidth) 
        : [];

      const currentInnerPaths = [
        { point: currentFacePath.end, isWallBoardPoint: false },
        { point: currentFacePath.start, isWallBoardPoint: false }
      ];

      const currentDirection = new THREE.Vector3()
        .subVectors(currentInnerPaths[1].point, currentInnerPaths[0].point)
        .normalize();

      if (currentFace.id === hostId) {
        clearOtherWallBoards(
          currentFace.contents,
          content.id,
          currentInnerPaths,
          currentDirection,
          this._rmContents,
          this._rmCntHostsMap
        );
      } else {
        clearAllWallBoards(
          currentFace.contents,
          currentInnerPaths,
          currentDirection,
          this._rmContents,
          this._rmCntHostsMap
        );
      }

      const dotProduct = new THREE.Vector3().copy(direction).dot(currentDirection);
      let angle = THREE.Math.radToDeg(Math.acos(parseFloat(dotProduct.toFixed(7))));
      angle = new THREE.Vector3().copy(normal).dot(currentDirection) > 0 ? -angle : angle;
      angle += content.ZRotation;

      const currentNormal = currentFace.surfaceObj.getNormal().normalize();
      const offset = new THREE.Vector3().copy(currentNormal).multiplyScalar(contentDepth / 2);

      const openingPaths = getOpeningPaths(currentFace, contentDepth, contentHeight, currentInnerPaths);

      prevFace = currentFace.faceInfo?.prev;
      nextFace = currentFace.faceInfo?.next;

      const wallPoints = [
        {
          point: new THREE.Vector3().addVectors(currentInnerPaths[0].point, offset || new THREE.Vector3()),
          isWallBoardPoint: false,
          isConcaveConer: this.isConcaveConer(prevFace, currentFace),
          isWallPoint: true
        },
        {
          point: new THREE.Vector3().addVectors(currentInnerPaths[1].point, offset || new THREE.Vector3()),
          isWallBoardPoint: false,
          isConcaveConer: this.isConcaveConer(currentFace, nextFace),
          isWallPoint: true
        }
      ];

      let segments = createPathSegments(
        {
          innerPaths: wallPoints,
          contentPaths: wallBoardPaths,
          openingPaths,
          customizedModelPaths: []
        },
        offset || new THREE.Vector3(),
        angle,
        currentDirection
      ) || [];

      segments = segmentsFliter(segments);

      let positions = creatContentPositions(segments, contentWidth, currentDirection, currentFace);

      if (currentFace.id === hostId && positions) {
        positions = duplicatePositionRm(
          positions,
          new THREE.Vector3(content.x, content.y, content.z),
          wallPoints,
          contentWidth
        );
      }

      allPositions = allPositions.concat(positions);
    }

    allPositions.forEach((position) => {
      if (position) {
        position.position.z = content.z;
      }
    });

    this._generateContents(allPositions, dumpContext, content);
    content.dirty();
  }

  private _getFaceFloorPath(face: any): { start: THREE.Vector3; end: THREE.Vector3; faceWidth: number } {
    const floorPaths = face.wirePath.outer.filter((path: any) => {
      return (
        HSMath.Plane.XOY().containsPoint(path.getStartPt()) &&
        HSMath.Plane.XOY().containsPoint(path.getEndPt())
      );
    });

    if (floorPaths.length !== 0) {
      const start = floorPaths[0].getStartPt();
      const end = floorPaths[floorPaths.length - 1].getEndPt();
      const faceWidth = start.distanceTo(end);

      return { start, end, faceWidth };
    }
  }
}

export { CmdApplyToEntireRoom };