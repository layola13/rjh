import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';
import { HSMath } from './HSMath';
import * as THREE from 'three';

interface ContentData {
  data: Record<string, unknown>;
  materialsData: Map<unknown, unknown>;
  statesData: Record<string, unknown>;
  constraintsData: Map<unknown, unknown>;
  productsMap: Map<unknown, unknown>;
  basicContentData?: unknown;
}

interface PathPoint {
  point: THREE.Vector3;
  isWallBoardPoint: boolean;
  isWallPoint?: boolean;
}

interface FaceFloorPath {
  start: THREE.Vector3;
  end: THREE.Vector3;
  faceWidth: number;
}

interface ContentPosition {
  position: THREE.Vector3;
}

interface PathSegmentsOptions {
  innerPaths: PathPoint[];
  contentPaths: unknown[];
  openingPaths: unknown[];
  customizedModelPaths: unknown[];
}

interface CmdApplyToWholeWallOptions {
  app: unknown;
  curContents: HSCore.Model.Content[];
  transManager: TransactionManager;
}

interface TransactionManager {
  createRequest(requestType: string, args: unknown[]): unknown;
  commit(request: unknown): void;
}

interface WallBoardUtils {
  clearOtherWallBoards(
    contents: HSCore.Model.Content[],
    contentId: string,
    points: PathPoint[],
    direction: THREE.Vector3,
    rmContents: unknown[],
    rmCntHostsMap: Map<unknown, unknown>
  ): void;
  getOpeningPaths(
    face: HSCore.Model.Face,
    height: number,
    zPosition: number,
    points: PathPoint[]
  ): unknown[];
  getWallBoardPaths(
    contentData: unknown,
    direction: THREE.Vector3,
    width: number
  ): unknown[];
  createPathSegments(
    options: PathSegmentsOptions,
    offset: THREE.Vector3,
    rotation: number,
    direction: THREE.Vector3
  ): unknown[] | null;
  segmentsFliter(segments: unknown[]): unknown[];
  creatContentPositions(
    segments: unknown[],
    width: number,
    direction: THREE.Vector3,
    face: HSCore.Model.Face
  ): ContentPosition[] | null;
  duplicatePositionRm(
    positions: ContentPosition[],
    basePosition: THREE.Vector3,
    wallPoints: PathPoint[],
    width: number
  ): ContentPosition[];
}

declare const p: WallBoardUtils;

export class CmdApplyToWholeWall extends HSApp.Cmd.Command {
  private readonly _app: unknown;
  private readonly _curContents: HSCore.Model.Content[];
  private readonly _transManager: TransactionManager;
  private readonly _rmContents: unknown[];
  private readonly _rmCntHostsMap: Map<unknown, unknown>;

  constructor(options: CmdApplyToWholeWallOptions) {
    super();
    this._app = options.app;
    this._curContents = options.curContents;
    this._transManager = options.transManager;
    this._rmContents = [];
    this._rmCntHostsMap = new Map();
  }

  private _generateContents(
    positions: ContentPosition[],
    dumpContext: ContentData,
    basicContent: HSCore.Model.Content
  ): void {
    const request = this._transManager.createRequest(
      HSFPConstants.RequestType.ApplyWallBoard,
      [
        {
          positions,
          dumpContext,
          app: this._app,
          basicContent,
          rmContents: this._rmContents,
          rmCntHostsMap: this._rmCntHostsMap,
        },
      ]
    );
    this._transManager.commit(request);
  }

  public canUndoRedo(): boolean {
    return false;
  }

  public canSuspend(): boolean {
    return false;
  }

  public onExecute(): void {
    const currentContent = this._curContents[0];
    const host = this._curContents[0].getHost();

    if (
      !(host instanceof HSCore.Model.Face) ||
      !host.surfaceObj.surface.isPlane()
    ) {
      return;
    }

    const master = host.getMaster();
    if (
      !(
        master instanceof HSCore.Model.Wall ||
        master instanceof HSCore.Model.NCustomizedStructure
      )
    ) {
      return;
    }

    const faceFloorPath = this._getFaceFloorPath(host);
    if (!faceFloorPath) {
      return;
    }

    const dumpContext: ContentData = {
      data: {},
      materialsData: new Map(),
      statesData: {},
      constraintsData: new Map(),
      productsMap: new Map(),
    };

    const contentData = currentContent.dump(undefined, true, dumpContext);
    dumpContext.basicContentData = contentData;

    const contentWidth = currentContent.XSize;
    const contentHeight = currentContent.YLength * currentContent.YScale;

    const wallEndpoints: PathPoint[] = [
      {
        point: faceFloorPath.end,
        isWallBoardPoint: false,
      },
      {
        point: faceFloorPath.start,
        isWallBoardPoint: false,
      },
    ];

    const wallDirection = new THREE.Vector3()
      .subVectors(wallEndpoints[1].point, wallEndpoints[0].point)
      .normalize();

    p.clearOtherWallBoards(
      host.contents,
      currentContent.ID,
      wallEndpoints,
      wallDirection,
      this._rmContents,
      this._rmCntHostsMap
    );

    const faceNormal = host.surfaceObj.getNormal().normalize();
    const normalOffset = new THREE.Vector3()
      .copy(faceNormal)
      .multiplyScalar(contentHeight / 2);

    const contentZPosition =
      currentContent.ZLength * currentContent.ZScale + currentContent.z;

    const openingPaths = p.getOpeningPaths(
      host,
      contentHeight,
      contentZPosition,
      wallEndpoints
    );

    const wallBoardPaths = p.getWallBoardPaths(
      contentData,
      wallDirection,
      contentWidth
    );

    const innerWallPoints: PathPoint[] = [
      {
        point: new THREE.Vector3().addVectors(
          wallEndpoints[0].point,
          normalOffset ?? new THREE.Vector3()
        ),
        isWallBoardPoint: false,
        isWallPoint: true,
      },
      {
        point: new THREE.Vector3().addVectors(
          wallEndpoints[1].point,
          normalOffset ?? new THREE.Vector3()
        ),
        isWallBoardPoint: false,
        isWallPoint: true,
      },
    ];

    let pathSegments =
      p.createPathSegments(
        {
          innerPaths: innerWallPoints,
          contentPaths: wallBoardPaths,
          openingPaths,
          customizedModelPaths: [],
        },
        normalOffset ?? new THREE.Vector3(),
        currentContent.ZRotation,
        wallDirection
      ) ?? [];

    pathSegments = p.segmentsFliter(pathSegments);

    let contentPositions = p.creatContentPositions(
      pathSegments,
      contentWidth,
      wallDirection,
      host
    );

    if (!contentPositions) {
      return;
    }

    contentPositions.forEach((position) => {
      position.position.z = currentContent.z;
    });

    contentPositions = p.duplicatePositionRm(
      contentPositions,
      new THREE.Vector3(currentContent.x, currentContent.y, currentContent.z),
      innerWallPoints,
      contentWidth
    );

    this._generateContents(contentPositions, dumpContext, currentContent);
    currentContent.dirtyGeometry();
  }

  private _getFaceFloorPath(face: HSCore.Model.Face): FaceFloorPath | undefined {
    const floorPaths = face.wirePath.outer.filter((path) => {
      return (
        HSMath.Plane.XOY().containsPoint(path.getStartPt()) &&
        HSMath.Plane.XOY().containsPoint(path.getEndPt())
      );
    });

    if (floorPaths.length === 0) {
      return undefined;
    }

    const startPoint = floorPaths[0].getStartPt();
    const endPoint = floorPaths[floorPaths.length - 1].getEndPt();
    const faceWidth = startPoint.distanceTo(endPoint);

    return {
      start: startPoint,
      end: endPoint,
      faceWidth,
    };
  }
}