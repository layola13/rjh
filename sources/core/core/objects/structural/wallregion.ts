import { Wall } from './Wall';
import { WallTopoFace } from './WallTopoFace';
import { TopoName } from './TopoName';
import { ExtrudeType } from './ExtrudeType';
import { Region } from './Region';
import { TgWallUtil } from './TgWallUtil';
import { MathUtil } from './MathUtil';
import { alg } from './alg';
import { BuilderUtil } from './BuilderUtil';
import { Log } from './Log';
import type { FloorPlan } from './FloorPlan';
import type { CoEdgePath } from './CoEdgePath';
import type { CoEdge } from './CoEdge';
import type { Shell } from './Shell';
import type { BrepFace } from './BrepFace';
import type { Curve } from './Curve';
import type { ShellWrapper } from './ShellWrapper';

interface WallLinkInfo {
  wallId: string;
  index: number;
}

interface SplitFacesResult {
  visible: BrepFace[];
  aux: BrepFace[];
}

interface ExtrudeOptions {
  region?: WallRegion;
  [key: string]: unknown;
}

const SPLIT_TOLERANCE = 2e-6;

export class WallRegion extends Region {
  public linkInfo: WallLinkInfo[] = [];
  public coEdgePath!: CoEdgePath;
  public linkWallIds!: string[];

  static create(floorPlan: FloorPlan, coEdgePath: CoEdgePath, wallIds: string[]): WallRegion {
    const region = new WallRegion(floorPlan);
    region.coEdgePath = coEdgePath;
    region.linkInfo = wallIds.map((wallId) => ({
      wallId,
      index: 0
    }));
    region.linkWallIds = wallIds;
    return region;
  }

  get targetWallId(): string {
    return TgWallUtil.getTargetWallId(this.linkWallIds, this._fp);
  }

  get targetWall(): Wall {
    const entity = this._fp.getEntityById(this.targetWallId);
    return entity as Wall;
  }

  get targetWallIndex(): number {
    const linkInfoItem = this.linkInfo.find((item) => item.wallId === this.targetWallId);
    return linkInfoItem!.index;
  }

  extrudeBody(startHeight: number, endHeight: number, options?: ExtrudeOptions): void {
    const { targetWallId, targetWallIndex } = this;

    super.extrudeBody(0, this.targetWall.height3d, options ? {
      ...options,
      region: this
    } : undefined);

    const edgePaths = this.shellWrapper.extraTopFaces
      ? [this.coEdgePath.outer]
      : [this.coEdgePath.outer].concat(this.coEdgePath.holes);

    this.shellWrapper.sideFaces.forEach((faceGroup, groupIndex) => {
      faceGroup.forEach((face, faceIndex) => {
        if (edgePaths[groupIndex] && edgePaths[groupIndex][faceIndex]) {
          const coEdge = this._getCoEdge(edgePaths[groupIndex][faceIndex].id);
          const topoFace = new WallTopoFace(face, coEdge.topoName.clone(), this.linkWallIds);
          topoFace.coEdge = coEdge;
          this.topoFaces.push(topoFace);
        }
      });
    });

    this.topoFaces.push(
      new WallTopoFace(
        this.shellWrapper.bottomFace,
        new TopoName(targetWallId, ExtrudeType.Bottom, targetWallIndex),
        this.linkWallIds
      )
    );

    if (this.shellWrapper.extraTopFaces) {
      this.shellWrapper.extraTopFaces.forEach((face, faceIndex) => {
        const topoNameId = this.linkWallIds.length > 1
          ? this.linkWallIds.join("-")
          : targetWallId;
        this.topoFaces.push(
          new WallTopoFace(
            face,
            new TopoName(topoNameId, ExtrudeType.Top, targetWallIndex, faceIndex),
            this.linkWallIds
          )
        );
      });
    } else {
      this.topoFaces.push(
        new WallTopoFace(
          this.shellWrapper.topFace,
          new TopoName(targetWallId, ExtrudeType.Top, targetWallIndex),
          this.linkWallIds
        )
      );
    }
  }

  private _tryFixSplitAddFaces(faces: BrepFace[]): SplitFacesResult | undefined {
    if (faces.length <= 2) {
      return undefined;
    }

    const bottomFaces: BrepFace[] = [];
    const otherFaces: BrepFace[] = [];

    faces.forEach((face) => {
      const hasBottomVertex = face.getVertexes().some((vertex) =>
        MathUtil.isNearlyEqual(vertex.getPoint().z, 0)
      );
      if (hasBottomVertex) {
        bottomFaces.push(face);
      } else {
        otherFaces.push(face);
      }
    });

    if (bottomFaces.length === 1) {
      return {
        visible: otherFaces,
        aux: bottomFaces
      };
    }

    return undefined;
  }

  splitFaceByCurve(topoFace: WallTopoFace, curve: Curve, excludeWallIds: string[]): void {
    if (MathUtil.isNearlyEqual(curve.getLength(), 0, SPLIT_TOLERANCE) || !this.isValid()) {
      return;
    }

    const surface = topoFace.brepFace.getSurface();
    let addEdgesResult: { modifiedShellsMap?: Map<Shell, { addFaces?: BrepFace[] }> };

    try {
      const targetSurface = surface.isPlane() || surface.isCylinder() ? surface : undefined;
      addEdgesResult = alg.ShellEdit.addEdges([curve], [this.shellWrapper.shell], targetSurface);
    } catch (error) {
      const moduleName = "HSCore.WallRegion";
      const operationName = "Failed to split face by curve";
      const errorMessage = `Failed to split face: ${error}!`;
      const errorDetails = {
        curve: Log.toString([curve]),
        shell: Log.toString([this.shellWrapper.shell])
      };
      BuilderUtil.logError(moduleName, operationName, operationName, errorMessage, errorDetails);
      return;
    }

    const modifiedShell = addEdgesResult.modifiedShellsMap?.get(this.shellWrapper.shell);

    if (modifiedShell?.addFaces && modifiedShell.addFaces.length > 2) {
      const fixedResult = this._tryFixSplitAddFaces(modifiedShell.addFaces);
      if (fixedResult) {
        this.topoFaces.xRemove(topoFace);

        const auxFaces = fixedResult.aux;
        const visibleFaces = fixedResult.visible;
        const filteredWallIds = topoFace.linkWallIds.filter((id) => !excludeWallIds.includes(id));

        const visibleTopoFaces = visibleFaces.map((face) => {
          const newTopoFace = new WallTopoFace(face, topoFace.topoName.clone(), filteredWallIds);
          newTopoFace.isAux = false;
          newTopoFace.coEdge = topoFace.coEdge;
          return newTopoFace;
        });

        const auxTopoFaces = auxFaces.map((face) => {
          const newTopoFace = new WallTopoFace(face, topoFace.topoName.clone(), topoFace.linkWallIds);
          newTopoFace.isAux = true;
          newTopoFace.coEdge = topoFace.coEdge;
          return newTopoFace;
        });

        this.topoFaces.xPushCollection([...visibleTopoFaces, ...auxTopoFaces]);
        return;
      }
    }

    if (!modifiedShell?.addFaces || modifiedShell.addFaces.length !== 2) {
      const moduleName = "HSCore.WallRegion";
      const operationName = "Split face by curve";
      const errorMessage = "Split face number !== 2";
      const errorDetails = {
        curve: Log.toString([curve]),
        shell: Log.toString([this.shellWrapper.shell])
      };
      BuilderUtil.logError(moduleName, operationName, operationName, errorMessage, errorDetails);
      return;
    }

    let visibleFace: BrepFace;
    let auxFace: BrepFace;

    this.topoFaces.xRemove(topoFace);

    const firstFaceHasBottomVertex = modifiedShell.addFaces[0].getVertexes().find((vertex) =>
      MathUtil.isNearlyEqual(vertex.getPoint().z, 0)
    );

    if (firstFaceHasBottomVertex) {
      visibleFace = modifiedShell.addFaces[1];
      auxFace = modifiedShell.addFaces[0];
    } else {
      visibleFace = modifiedShell.addFaces[0];
      auxFace = modifiedShell.addFaces[1];
    }

    const filteredWallIds = topoFace.linkWallIds.filter((id) => !excludeWallIds.includes(id));

    const visibleTopoFace = new WallTopoFace(visibleFace, topoFace.topoName.clone(), filteredWallIds);
    visibleTopoFace.isAux = false;
    visibleTopoFace.coEdge = topoFace.coEdge;

    const auxTopoFace = new WallTopoFace(auxFace, topoFace.topoName.clone(), topoFace.linkWallIds);
    auxTopoFace.isAux = true;
    auxTopoFace.coEdge = topoFace.coEdge;

    this.topoFaces.xPushCollection([visibleTopoFace, auxTopoFace]);
  }

  isValid(): boolean {
    return !this.path.outer.some((edge) => MathUtil.isNearlyEqual(edge.getLength(), 0));
  }
}