import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSDevice } from './HSDevice';
import { PerformanceLogCategory, PerformanceOperationTypes } from './PerformanceLog';

interface MousePosition {
  x: number;
  y: number;
  z: number;
}

interface ScaleData {
  XScale: number;
  YScale: number;
  ZScale: number;
}

interface ResizeParams {
  x?: number;
  y?: number;
  z?: number;
  archHeight?: number;
}

interface MoveRequestParams {
  newHostRoof?: HSCore.Model.NCustomizedParametricRoof;
  newHostFaceTag?: string;
  ignoreValidate?: boolean;
  position?: MousePosition | number[];
  entity?: HSCore.Model.Opening | HSCore.Model.ParametricOpening;
  host?: unknown;
  pointOnRoofFace?: MousePosition;
  viewType?: string;
  event?: { screenX: number; screenY: number };
}

interface ValidationStatus {
  hostId: string;
  opening: Array<{
    viewObject: HSCore.Model.Opening | HSCore.Model.ParametricOpening;
    isInvalid: boolean;
  }>;
}

const logger = log.logger(PerformanceLogCategory.Operation);

export class MoveRoofOpeningRequest extends HSCore.Transaction.Common.StateRequest {
  private _opening: HSCore.Model.Opening | HSCore.Model.ParametricOpening;
  private _mouseStart?: MousePosition;
  private _openingStart: MousePosition;
  private _replaceTarget?: HSCore.Model.Opening | HSCore.Model.ParametricOpening;
  private initScales: ScaleData;
  private _bottomMaterial?: unknown;
  private _hostRoof: HSCore.Model.NCustomizedParametricRoof;
  private _hostFaceTag: string;
  private _preStatus?: ValidationStatus;
  private _preHost?: unknown;

  constructor(
    opening: HSCore.Model.Opening | HSCore.Model.ParametricOpening,
    hostRoof: HSCore.Model.NCustomizedParametricRoof,
    hostFaceTag: string,
    bottomMaterial?: unknown
  ) {
    super();
    
    this._opening = opening;
    this._hostRoof = hostRoof;
    this._hostFaceTag = hostFaceTag;
    this._bottomMaterial = bottomMaterial;
    
    this.initScales = {
      XScale: Number.isFinite(opening.XScale) ? opening.XScale : 1,
      YScale: Number.isFinite(opening.YScale) ? opening.YScale : 1,
      ZScale: Number.isFinite(opening.ZScale) ? opening.ZScale : 1
    };
    
    this._preHost = opening.getHost();
    this._openingStart = {
      x: this._opening.x,
      y: this._opening.y,
      z: this._opening.z
    };
  }

  onReceive(event: string, params: MoveRequestParams): boolean {
    const mouseEvents = HSDevice?.MouseEvents;
    
    if (params.newHostRoof && this._hostRoof !== params.newHostRoof) {
      this._hostRoof = params.newHostRoof;
    }
    
    if (params.newHostFaceTag && this._hostFaceTag !== params.newHostFaceTag) {
      this._hostFaceTag = params.newHostFaceTag;
    }

    if (event === mouseEvents?.DragStart) {
      if (!(this._opening.getHost() instanceof HSCore.Model.NCustomizedParametricRoof)) {
        HSCore.Util.Opening.setWindowSillOff(this._opening);
      }
      this._opening.setRoofHost(this._hostRoof, this._hostFaceTag);
      this._mouseStart = this.getMousePos(params);
    } else if (event === mouseEvents?.Move || event === mouseEvents?.DragMove) {
      if (!(this._opening.getHost() instanceof HSCore.Model.NCustomizedParametricRoof)) {
        HSCore.Util.Opening.setWindowSillOff(this._opening);
      }
      
      const currentMousePos = this.getMousePos(params);
      
      if (!this._mouseStart) {
        this._mouseStart = currentMousePos;
      }
      
      if (
        this._opening.getHost() !== this._hostRoof ||
        this._opening.getHostRoofFaceId() !== this._hostFaceTag
      ) {
        this._opening.setRoofHost(this._hostRoof, this._hostFaceTag);
      }
      
      if (this._opening instanceof HSCore.Model.Opening && this._hostRoof) {
        const thickness = this._hostRoof.getThickness(this._hostFaceTag) / 1000;
        if (this._opening.thickness !== thickness) {
          this._opening.thickness = thickness;
        }
      }
      
      const baseHeight = HSCore.Util.Layer.getEntityBaseHeight(this._hostRoof);
      this._opening.updateRotationAndPosOnRoof(this._hostRoof, this._hostFaceTag, {
        x: currentMousePos.x,
        y: currentMousePos.y,
        z: currentMousePos.z - baseHeight
      });
      
      if (this._preStatus && this._opening.host && this._opening.host.id !== this._preStatus.hostId) {
        this._preStatus.opening.forEach((item) => {
          item.viewObject?.signalValidityChanged?.dispatch(item.isInvalid);
        });
        this._preStatus = undefined;
      }
      
      if (!params.ignoreValidate && this._opening.host) {
        const activeView = HSApp.App.getApp().getActive2DView();
        
        if (!this._preStatus && activeView instanceof HSApp.View.Base.CanvasBase) {
          const layer = HSCore.Util.Layer.getEntityLayer(this._opening);
          
          if (layer) {
            const allOpenings = [
              ...Object.values(layer.openings),
              ...Object.values(layer.parametricOpenings)
            ];
            
            this._preStatus = {
              hostId: this._opening.host.id,
              opening: allOpenings
                .filter((opening) => opening.host === this._opening.host && opening !== this._opening)
                .map((opening) => ({
                  viewObject: opening,
                  isInvalid: activeView.displayList[opening.id].isInValid
                }))
            };
          }
        }
        
        this._validate();
      }
    } else if (event === 'moveto') {
      if (!params.position || Array.isArray(params.position)) {
        return true;
      }
      this._moveTo(params.position);
      if (!params.ignoreValidate) {
        this._validate();
      }
    } else if (event === 'resize') {
      this._resize(params);
      if (!params.ignoreValidate) {
        this._validate();
      }
    } else if (
      event === mouseEvents?.Click ||
      event === mouseEvents?.Down ||
      event === mouseEvents?.Up
    ) {
      if (!params.ignoreValidate) {
        this._validate();
      }
      
      if (params.entity) {
        this._replaceTarget = params.entity;
        
        if (this._replaceTarget instanceof HSCore.Model.Opening) {
          this._opening.x = this._replaceTarget.x;
          this._opening.y = this._replaceTarget.y;
          this._opening.z = this._replaceTarget.z;
          
          this._resize({
            x: this._replaceTarget.XSize,
            y: this._replaceTarget.YSize,
            z: this._replaceTarget.ZSize,
            archHeight: this._replaceTarget.archHeight
          });
        }
      }
    } else if (event === 'assignto') {
      if (params.host === undefined) {
        return true;
      }
      this._opening.assignTo(params.host);
    }
    
    return true;
  }

  private _validate(showHint: boolean = false): void {
    if (this._opening.host instanceof HSCore.Model.NCustomizedParametricRoof) {
      this._opening.signalValidityChanged?.dispatch(false);
    } else {
      const overlapObjects = HSApp.Util.Layer.calcOverlapObject(this._opening);
      const overWallObjects = HSApp.Util.Layer.calcOverWallObject(this._opening);
      const patchedObjects = HSApp.Util.Layer.patchOverlapObejct(
        new Map([...overlapObjects, ...overWallObjects])
      );
      
      const { update, recover } = patchedObjects;
      
      update.forEach((entity) => {
        if (
          entity instanceof HSCore.Model.Opening ||
          entity instanceof HSCore.Model.ParametricOpening
        ) {
          entity.signalValidityChanged?.dispatch(true);
          
          const currentCommand = HSApp.App.getApp().cmdManager.current;
          const isPlacingDoor =
            currentCommand?.type === HSFPConstants.CommandType.PlaceProduct &&
            this._opening instanceof HSCore.Model.Door;
          
          if (showHint && !isPlacingDoor && this._opening !== entity) {
            const message = ResourceManager.getString('plugin_parametricopening_opening_valid').replace(
              '%name',
              entity.metadata.name
            );
            
            LiveHint.show(message, 3000, () => LiveHint.hide(), { canclose: true });
          }
        }
      });
      
      recover.forEach((entity) => {
        if (
          entity instanceof HSCore.Model.Opening ||
          entity instanceof HSCore.Model.ParametricOpening
        ) {
          entity.signalValidityChanged?.dispatch(false);
        }
      });
    }
  }

  private _resize(params: ResizeParams): void {
    if (!params) return;
    
    this._opening.resize(
      params.x ?? this._opening.XSize,
      params.y ?? this._opening.YSize,
      params.z ?? this._opening.ZSize,
      params.archHeight
    );
  }

  private getMousePos(params: MoveRequestParams): MousePosition {
    if (params.pointOnRoofFace) {
      return params.pointOnRoofFace;
    }
    
    if (params.viewType === '3d' && params.position) {
      if (Array.isArray(params.position)) {
        return {
          x: params.position[0],
          y: params.position[1],
          z: params.position[2]
        };
      }
      return params.position;
    }
    
    const event = params.event!;
    const context = HSApp.App.getApp().activeView.context;
    const modelPoint = HSApp.View.SVG.Util.ScreenPointToModel(
      [event.screenX, event.screenY],
      context
    );
    
    return {
      x: modelPoint[0],
      y: modelPoint[1],
      z: modelPoint[2]
    };
  }

  private _moveTo(position: MousePosition): void {
    if (position.x !== undefined) {
      this._opening.x = position.x;
    }
    if (position.y !== undefined) {
      this._opening.y = position.y;
    }
    if (position.z !== undefined) {
      this._opening.z = position.z;
    }
  }

  onCommit(): void {
    logger.time(PerformanceOperationTypes.OpeningChangeBuild);
    
    if (
      this._opening instanceof HSCore.Model.Opening ||
      this._opening instanceof HSCore.Model.ParametricOpening
    ) {
      this._opening.build();
      
      if (
        (this._opening instanceof HSCore.Model.Opening ||
          this._opening instanceof HSCore.Model.ParametricDoor) &&
        this._bottomMaterial
      ) {
        this._opening.bottomFaceMaterial = this._bottomMaterial.clone();
        this._opening.getBottomFaces().forEach((face) => {
          HSCore.Util.Paints.updateFaceMixpaint(face);
        });
      }
      
      this._validate(true);
    }
    
    if (
      this._replaceTarget instanceof HSCore.Model.Opening ||
      this._replaceTarget instanceof HSCore.Model.ParametricOpening
    ) {
      this._replaceTarget.build();
    }
    
    if (this._opening instanceof HSCore.Model.Opening && this._opening.getPocket()) {
      const pocket = this._opening.getPocket();
      pocket.side = pocket.getDefaultSide();
      pocket.dirtyGeometry();
    }
    
    this._opening.dirty();
    
    const parentLayer = this._hostRoof.getUniqueParent();
    if (parentLayer instanceof HSCore.Model.Layer) {
      parentLayer.roomBuilder.build();
    }
    
    this._dirtyHostRoof();
    
    super.onCommit();
    
    HSApp.App.getApp().signalPropertyBarRefresh?.dispatch();
    HSApp.App.getApp().signalContextualtoolRefresh?.dispatch();
    
    logger.timeEnd(PerformanceOperationTypes.OpeningChangeBuild, true);
  }

  onUndo(): void {
    super.onUndo();
    this._dirtyHostRoof();
  }

  onRedo(): void {
    super.onRedo();
    this._dirtyHostRoof();
  }

  canTransactField(): boolean {
    return true;
  }

  private _dirtyHostRoof(): void {
    if (this._hostRoof) {
      this._hostRoof.dirtyClipGeometry();
      this._hostRoof.refreshFaceMaterial();
    }
    
    if (
      this._preHost instanceof HSCore.Model.NCustomizedParametricRoof &&
      this._preHost !== this._hostRoof
    ) {
      this._preHost.dirtyClipGeometry();
      this._preHost.refreshFaceMaterial();
    }
  }
}