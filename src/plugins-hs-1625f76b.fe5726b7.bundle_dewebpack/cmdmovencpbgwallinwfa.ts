import { Matrix4, Vector3, Plane } from './Math';
import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { CmdMoveInHardDecoration } from './Commands';

interface MovingEventData {
  position?: number[];
  offset?: number[];
  host?: HSCore.Model.Face;
}

interface SnappingOption {
  [strategyClassName: string]: {
    vialidatorCallback: (face: HSCore.Model.Face) => boolean;
  };
}

interface SnappingStrategies {
  strategies: Array<unknown>;
  option: SnappingOption;
}

interface CommandOption {
  moveby?: string;
}

export class CmdMoveNCPBgWallInWFA extends CmdMoveInHardDecoration {
  private _highlightPath?: unknown;
  private _highLightNCustomizedBackgroundId?: string;
  private _snappedEntity?: HSCore.Model.Face;
  private _firstContent: HSCore.Model.Content;
  private _hostFaces?: HSCore.Model.Face[];
  private _option?: CommandOption;
  private _is2D: boolean;
  private _app: typeof HSApp.App;

  constructor(app: typeof HSApp.App, option?: CommandOption) {
    super(app, option);
    this._highlightPath = undefined;
    this._highLightNCustomizedBackgroundId = undefined;
  }

  onComplete(): void {
    this._setNCPContentFlag(HSCore.Model.StructureFlagEnum.dragOn, false);
    super.onComplete([]);
  }

  onCancel(): void {
    this._setNCPContentFlag(HSCore.Model.StructureFlagEnum.dragOn, false);
    this.onComplete();
  }

  private _getHost(data: MovingEventData): HSCore.Model.Face {
    if (this._snappedEntity) {
      return this._snappedEntity;
    }

    const host = this._firstContent.getHost();
    const isValidFace = host instanceof HSCore.Model.Face && this._hostFaces?.includes(host);
    
    return isValidFace ? host : (data.host || host);
  }

  private _preMoving(data: MovingEventData): void {
    this._setNCPContentFlag(HSCore.Model.StructureFlagEnum.dragOn, true);

    if (this._firstContent.contentType.isTypeOf(HSCatalog.ContentTypeEnum.SmartCustomizedBackgroundWall)) {
      this._highLightBackground();
    }

    if (data.position) {
      const isNCPBackgroundEnvironment = 
        HSApp.App.getApp().activeEnvironmentId === HSFPConstants.Environment.NCustomizedBackgroundWall;

      const isNCPContent = 
        this._firstContent instanceof HSCore.Model.NCustomizedParametricBackgroundWall ||
        this._firstContent instanceof HSCore.Model.NCPBackgroundWallUnit;

      if (isNCPContent && isNCPBackgroundEnvironment && this._is2D) {
        const matrixArray = HSApp.App.getApp().activeEnvironment.face.customizedFeatureModel.sketch.convert3dMatrix.toArray();
        const transformMatrix = new Matrix4().fromArray(matrixArray);
        const position3D = new Vector3(data.position[0], data.position[1], 0).transformed(transformMatrix);
        
        data.position = [position3D.x, position3D.y, position3D.z];
        data.offset = undefined;
      }
    }

    super._preMoving([data]);
  }

  private _postMoving(data: MovingEventData): void {
    if (this._isCanDoSnapping()) {
      const host = this._firstContent.getHost();
      this._showTipView(host, data);
    }

    this._changeCursorStatus();
    super._postMoving([data]);
  }

  private _movingEnd(data: MovingEventData): void {
    this._setNCPContentFlag(HSCore.Model.StructureFlagEnum.dragOn, false);
    super._movingEnd([data]);
  }

  private _setNCPContentFlag(flag: HSCore.Model.StructureFlagEnum, value: boolean): void {
    const isNCPContent = 
      this._firstContent instanceof HSCore.Model.NCPBackgroundWallContent ||
      this._firstContent instanceof HSCore.Model.NCPBackgroundWallArray ||
      this._firstContent instanceof HSCore.Model.NCustomizedParametricBackgroundWall ||
      this._firstContent instanceof HSCore.Model.NCPBackgroundWallSubpart ||
      this._firstContent instanceof HSCore.Model.NCPBackgroundWallUnit;

    if (isNCPContent) {
      if (value) {
        this._firstContent.setFlagOn(flag, true);
      } else {
        this._firstContent.setFlagOff(flag, true);
      }
    }
  }

  private _isCanDoSnapping(): boolean {
    const isNCPWall = 
      this._firstContent instanceof HSCore.Model.NCustomizedParametricBackgroundWall ||
      this._firstContent instanceof HSCore.Model.NCPBackgroundWallUnit;

    if (!isNCPWall) {
      return true;
    }

    if (this._option && 
        (this._option.moveby === 'contentmovement' || this._option.moveby === 'contentlift')) {
      return false;
    }

    const isNCPEnvironment = 
      HSApp.App.getApp().activeEnvironmentId === HSFPConstants.Environment.NCustomizedBackgroundWall;
    const hostedFace = HSCore.Util.Content.getHostedFace(this._firstContent);

    if (isNCPEnvironment && this._is2D && hostedFace) {
      const activeFace = HSApp.App.getApp().activeEnvironment.face;
      const inLineFace = HSApp.Util.Face.getInLineFaceCanAddFeatureModel(hostedFace);
      return inLineFace !== activeFace;
    }

    return true;
  }

  private _highLightBackground(): void {
    this._clearBackgroundwallHighLight();

    if (this._firstContent.parameters.isAutoFit === false) {
      return;
    }

    const isNCPEnvironment = 
      HSApp.App.getApp().activeEnvironmentId === HSFPConstants.Environment.NCustomizedBackgroundWall;

    if (!isNCPEnvironment || !this._firstContent.host) {
      return;
    }

    const hostedFace = HSCore.Util.Content.getHostedFace(this._firstContent);
    if (!hostedFace || hostedFace instanceof HSCore.Model.Ceiling || hostedFace instanceof HSCore.Model.Floor) {
      return;
    }

    const activeFace = HSApp.App.getApp().activeEnvironment.face;
    const inLineFace = HSApp.Util.Face.getInLineFaceCanAddFeatureModel(hostedFace);

    if (inLineFace !== activeFace) {
      return;
    }

    const faceGeomInfo = HSCore.Doc.getDocManager().geometryManager.getFaceGeomInfo(hostedFace);
    const faceNormal = Plane.makePlaneByPoints(faceGeomInfo.faceGeomPath)?.getNorm();

    let targetBackground: HSCore.Model.NCustomizedBackgroundWall | undefined;

    inLineFace.getUniqueParent().forEachContent((content: HSCore.Model.Content) => {
      if (content instanceof HSCore.Model.NCustomizedBackgroundWall) {
        const surfaceNormal = content.breps[0].getFaces()[0].getSurface().getNorm();
        if (faceNormal?.equals(surfaceNormal)) {
          targetBackground = content;
        }
      }
    });

    const view3D = HSApp.App.getApp().getActive3DView();

    if (!targetBackground) {
      return;
    }

    const sketchFaces = targetBackground.sketch.faces;
    const globalMatrix = HSCore.Util.Matrix3DHandler.getGlobalMatrix4(this._firstContent);
    const contentCenter = new THREE.Vector3().applyMatrix4(globalMatrix);
    
    const altitude = HSCore.Util.Content.getAltitude(this._firstContent);
    const centerPoint = contentCenter.setZ(contentCenter.z + altitude + this._firstContent.ZSize / 2);

    const convert3dMatrixArray = targetBackground.sketch.convert3dMatrix.toArray();
    const inverseMatrix = new Matrix4().fromArray(convert3dMatrixArray).inversed();
    const baseHeight = HSCore.Util.Layer.getEntityBaseHeight(this._firstContent);
    const localPoint = new Vector3(centerPoint.x, centerPoint.y, centerPoint.z - baseHeight);
    localPoint.transform(inverseMatrix);

    const containingFace = sketchFaces.find((face: unknown) => 
      HSCore.Util.Curve2d.isPointInsideFace2d(localPoint, face)
    );

    const faceId = containingFace?.id;

    if (!faceId) {
      return;
    }

    const discretePoints = containingFace.outerLoop.getDiscretePoints();

    if (discretePoints && discretePoints.length > 0) {
      discretePoints.push(discretePoints[0]);
      const svgPath = HSApp.View.SVG.Util.buildSvgPath(discretePoints);
      const view2D = this._app.getActive2DView();

      if (!this._highlightPath) {
        this._highlightPath = view2D.context.path().attr({
          'stroke-width': 4,
          stroke: '#327DFF',
          fill: 'url(res/view/svg/highlight_ceiling_pattern.svg)',
          'pointer-events': 'none'
        });
      }

      this._highlightPath.attr({ d: svgPath });
      this._highlightPath.show();
    } else {
      this._highlightPath?.hide();
      this._highlightPath?.remove();
    }

    const displayItem = view3D.displayList[targetBackground.id];
    let targetMeshKey: string | undefined;

    for (const meshKey of displayItem.meshMap.keys()) {
      const mesh = displayItem.meshMap.get(meshKey);
      if (mesh.mName.startsWith('NCustomizedBackgroundWall')) {
        const parts = mesh.mName.split('/');
        if (faceId === parts[parts.length - 1]) {
          targetMeshKey = meshKey;
        }
      }
    }

    if (targetMeshKey) {
      displayItem.highlightMesh(targetMeshKey);
      this._highLightNCustomizedBackgroundId = targetBackground.id;
    }
  }

  private _clearBackgroundwallHighLight(): void {
    this._highlightPath?.hide();

    const view3D = HSApp.App.getApp().getActive3DView();
    if (this._highLightNCustomizedBackgroundId) {
      view3D.displayList[this._highLightNCustomizedBackgroundId].highlightMesh();
    }
  }

  private _getSnappingStrategies(): SnappingStrategies {
    const baseStrategies = super._getSnappingStrategies([]);
    const contentType = this._firstContent.contentType;
    const contentTypeEnum = HSCatalog.ContentTypeEnum;

    const isCustomizedContent = 
      contentType.isTypeOf(contentTypeEnum.CustomizedFeaturewall) ||
      contentType.isTypeOf(contentTypeEnum.CustomizedPersonalizedModel);

    if (isCustomizedContent) {
      if (this._is2D) {
        baseStrategies.strategies.push(HSApp.Snapping.SnapToWall2D);
      } else {
        baseStrategies.strategies.push(HSApp.Snapping.SnapToWall3D);
      }
    }

    const strategyClassName = this._is2D 
      ? HSApp.Snapping.SnapToWall2D.ClassName 
      : HSApp.Snapping.SnapToWall3D.ClassName;

    baseStrategies.option[strategyClassName] = {
      vialidatorCallback: (face: HSCore.Model.Face): boolean => {
        return !this._hostFaces || this._hostFaces.includes(face);
      }
    };

    return baseStrategies;
  }
}