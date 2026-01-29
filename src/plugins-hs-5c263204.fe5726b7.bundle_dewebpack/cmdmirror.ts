import { Matrix3, Matrix4 } from './math-utils';
import { HSCore } from './hs-core';
import { HSApp } from './hs-app';
import { Path, MathService } from './math-service';
import React from 'react';
import ReactDOM from 'react-dom';
import MirrorModal from './MirrorModal';

interface MirrorArgs {
  floorplan: HSCore.Model.Floorplan;
  direction: HSCore.Model.MirrorType;
}

interface MirrorInfo {
  matrix3: Matrix3;
  matrix4: Matrix4;
  type: HSCore.Model.MirrorType;
  center: { x: number; y: number };
  transLen: number;
}

interface CollectedFacesInfo {
  faces: HSCore.Model.Face[];
  faceMixpaints: Map<string, HSCore.Model.Mixpaint>;
  faceGroupBoxs: Map<string, HSCore.Model.Box>;
}

interface TransformRequest {
  matrix4: Matrix4;
}

interface TransactionSession {
  abort(): void;
  commit(): void;
}

interface TransactionManager {
  startSession(): TransactionSession;
  createRequest(requestType: string, args: unknown[]): unknown;
  commit(request: unknown): void;
}

interface CommandContext {
  transManager: TransactionManager;
}

interface CommandManager {
  cancel(): void;
  complete(command: Command): void;
}

abstract class Command {
  protected context!: CommandContext;
  protected mgr!: CommandManager;

  abstract onReceive(message: string, data: unknown): boolean;
  abstract onExecute(): void;
  abstract canUndoRedo(): boolean;
  abstract getDescription(): string;
  abstract getCurrentParams(): unknown;
  abstract getCategory(): string;
  abstract getMode(): string;
}

export class CmdMirror extends Command {
  private readonly _args: MirrorArgs;
  private readonly _floorplan: HSCore.Model.Floorplan;
  private readonly _direction: HSCore.Model.MirrorType;
  private session?: TransactionSession;
  private contentsForDelete: HSCore.Model.Content[];

  constructor(args: MirrorArgs) {
    super();
    this._args = args;
    this._floorplan = args.floorplan;
    this._direction = args.direction;
    this.contentsForDelete = [];
  }

  public onReceive(message: string, data: unknown): boolean {
    switch (message) {
      case 'executeRequest':
        this.executeRequest(data as TransformRequest);
        return true;
      case 'cancelRequest':
        this.cancelRequest();
        return true;
      default:
        return false;
    }
  }

  public onExecute(): void {
    const validMirrorTypes = [
      HSCore.Model.MirrorType.Horizontal,
      HSCore.Model.MirrorType.Vertical
    ];

    if (validMirrorTypes.includes(this._direction)) {
      const isHorizontal = this._direction === HSCore.Model.MirrorType.Horizontal;
      const mirrorInfo = this.calculateTransformation(isHorizontal);

      this.session = this.context.transManager.startSession();
      this.contentsForDelete = this.collectContentsForDelete();

      if (this.contentsForDelete.length > 0) {
        const modalRootId = 'mirror-modal-root';
        const existingModal = document.getElementById(modalRootId);

        if (existingModal) {
          const body = document.getElementsByTagName('body')[0];
          body.removeChild(existingModal);
        }

        if (!document.getElementById(modalRootId)) {
          const modalContainer = document.createElement('div');
          modalContainer.id = modalRootId;
          document.getElementsByTagName('body')[0].appendChild(modalContainer);
        }

        ReactDOM.render(
          React.createElement(MirrorModal, {
            executeRequest: this.executeRequest.bind(this),
            cancelRequest: this.cancelRequest.bind(this),
            mirrorInfo
          }),
          document.getElementById(modalRootId)
        );
      } else {
        this.executeRequest(mirrorInfo);
      }
    }
  }

  public cancelRequest(): void {
    this.session?.abort();
    this.mgr.cancel();
  }

  public executeRequest(transformRequest: TransformRequest): void {
    const transManager = this.context.transManager;

    if (this.contentsForDelete.length > 0) {
      this.contentsForDelete.forEach((content) => {
        const deleteRequest = transManager.createRequest(
          HSFPConstants.RequestType.DeleteProduct,
          [content]
        );
        transManager.commit(deleteRequest);
      });
    }

    const collectedFacesInfo = this.getCollectedFacesInfo();
    const mirrorRequest = transManager.createRequest(
      HSFPConstants.RequestType.FloorplanMirror,
      [this._args, transformRequest]
    );
    transManager.commit(mirrorRequest);

    const customizedPms = this._floorplan.scene.getCustomizedPms();
    if (customizedPms.length > 0) {
      const transformRequest = transManager.createRequest(
        HSFPConstants.RequestType.TransformCustomizedPMModel,
        [customizedPms[0], transformRequest.matrix4]
      );
      transManager.commit(transformRequest);
    }

    const mixpaintRequest = transManager.createRequest(
      HSFPConstants.RequestType.MirrorMixpaint,
      [collectedFacesInfo, transformRequest]
    );
    transManager.commit(mixpaintRequest);

    const cwRequest = transManager.createRequest(
      HSFPConstants.RequestType.MirrorCW,
      [transformRequest]
    );
    transManager.commit(cwRequest);

    this.session?.commit();
    this.mgr.complete(this);
  }

  private calculateTransformation(isHorizontal: boolean): MirrorInfo {
    const scene = this._floorplan.scene;
    scene.refreshBoundInternal();

    const bound = scene.bound;
    const mirrorType = isHorizontal
      ? HSCore.Model.MirrorType.Horizontal
      : HSCore.Model.MirrorType.Vertical;

    const transLen = isHorizontal
      ? 2 * bound.left + bound.width
      : 2 * bound.top + bound.height;

    const center = {
      x: bound.left + bound.width / 2,
      y: bound.top + bound.height / 2
    };

    const normal2D = isHorizontal ? { x: 0, y: 1 } : { x: 1, y: 0 };
    const normal3D = isHorizontal
      ? { x: 1, y: 0, z: 0 }
      : { x: 0, y: 1, z: 0 };

    return {
      matrix3: Matrix3.makeMirror(center, normal2D),
      matrix4: Matrix4.makeMirror({ x: center.x, y: center.y, z: 0 }, normal3D),
      type: mirrorType,
      center,
      transLen
    };
  }

  private collectContentsForDelete(): HSCore.Model.Content[] {
    const dContents = this.collectDContents();
    const parameterOpenings = this.collectParameterOpenings();
    return [...dContents, ...parameterOpenings];
  }

  private collectDContents(): HSCore.Model.Content[] {
    const floorplan = HSApp.App.getApp().floorplan;
    const contents: HSCore.Model.Content[] = [];

    floorplan.forEachContent((content: HSCore.Model.Content) => {
      const isDContent =
        content.Class === HSConstants.ModelClass.DAssembly ||
        content.Class === HSConstants.ModelClass.DContent ||
        content.Class === HSConstants.ModelClass.DExtruding ||
        content.Class === HSConstants.ModelClass.DMolding ||
        content.Class === HSConstants.ModelClass.DSweep;

      if (isDContent) {
        contents.push(content);
      }
    });

    return contents;
  }

  private collectParameterOpenings(): HSCore.Model.ParametricOpening[] {
    const floorplan = HSApp.App.getApp().floorplan;
    const openings: HSCore.Model.ParametricOpening[] = [];

    floorplan.forEachParametricOpenings((opening: HSCore.Model.ParametricOpening) => {
      const isParametricOpening = opening instanceof HSCore.Model.ParametricOpening;
      const wallType = opening.getWallType();
      const isValidWallType = wallType !== 'L' && wallType !== 'A';

      if (isParametricOpening && isValidWallType) {
        openings.push(opening);
      }
    });

    return openings;
  }

  private getCollectedFacesInfo(): CollectedFacesInfo {
    const faceSet = new Set<HSCore.Model.Face>();

    this._floorplan.scene.forEachLayer((layer: HSCore.Model.Layer) => {
      Object.values(layer.faces).forEach((face: HSCore.Model.Face) => {
        faceSet.add(face);
      });
    });

    const faces = Array.from(faceSet);
    const facePaths = new Map<string, Path>();
    const faceGroupBoxs = new Map<string, HSCore.Model.Box>();
    const faceMixpaints = new Map<string, HSCore.Model.Mixpaint>();
    const clonedMixpaints = new Map<string, HSCore.Model.Mixpaint>();

    faces.forEach((face) => {
      const curvePath = HSCore.Util.BackgroundPath.getCurvePath(face);
      let path = new Path(curvePath.outer, curvePath.holes);

      if (HSCore.Util.FaceGroup.isFaceGroup(face)) {
        const transform = HSCore.Util.FaceGroup.getFaceGroupTransform(face);
        if (transform) {
          path = path.transformed(transform);
        }
      }

      facePaths.set(face.id, path);

      const mixpaint = face.material?.mixpaint;
      if (mixpaint) {
        let clonedMixpaint = clonedMixpaints.get(mixpaint.id);
        if (!clonedMixpaint) {
          clonedMixpaint = mixpaint.clone();
          clonedMixpaint.faceGroup.copyFrom(mixpaint.faceGroup);
          clonedMixpaints.set(mixpaint.id, clonedMixpaint);
        }
        faceMixpaints.set(face.id, clonedMixpaint);
      }
    });

    faces.forEach((face) => {
      if (HSCore.Util.FaceGroup.isFaceGroup(face) && !faceGroupBoxs.has(face.id)) {
        const groupFaces = HSCore.Util.FaceGroup.getGroupFaces(face);
        const groupPaths = groupFaces
          .map((groupFace) => facePaths.get(groupFace.id))
          .filter((path): path is Path => path !== undefined);

        const box = MathService.ins.getBoxFromPaths(groupPaths);
        faceGroupBoxs.set(face.id, box);
      } else {
        const path = facePaths.get(face.id);
        if (path) {
          const box = MathService.ins.getBoxFromPath(path);
          faceGroupBoxs.set(face.id, box);
        }
      }
    });

    return {
      faces,
      faceMixpaints,
      faceGroupBoxs
    };
  }

  public canUndoRedo(): boolean {
    return false;
  }

  public getDescription(): string {
    const direction = this._args.direction === 'horizontal' ? '左右' : '上下';
    return `户型${direction}翻转`;
  }

  public getCurrentParams(): { direction: HSCore.Model.MirrorType } {
    return {
      direction: this._args.direction
    };
  }

  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.ViewOperation;
  }

  public getMode(): string {
    return this._args.direction;
  }
}