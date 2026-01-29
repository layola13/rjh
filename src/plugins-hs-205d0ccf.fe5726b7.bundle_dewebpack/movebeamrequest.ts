import { Vector2 } from './Vector2';
import { BeamClipper } from './BeamClipper';
import { SnapHelper } from './SnapHelper';
import { MixPaveApi, RegionApi } from './MixPaveApi';

interface Point2D {
  x: number;
  y: number;
}

interface Point3D extends Point2D {
  z: number;
}

interface MoveToPosition {
  x?: number;
  y?: number;
  z?: number;
  ZRotation?: number;
  XRotation?: number;
  YRotation?: number;
  XScale?: number;
  YScale?: number;
  ZScale?: number;
}

interface ReceiveEventData {
  position?: number[];
  viewType?: string;
  pickedLayer?: any;
}

interface SnapHelperConfig {
  layer: any;
  snapMaster: any;
}

interface HostChangedEvent {
  oldHost: any;
  newHost: any;
}

interface SnapResult {
  dx?: number;
  dy?: number;
  center?: Point2D;
  drotation?: number;
}

interface FaceMapEntry {
  originKey: string;
}

export class MoveBeamRequest extends HSCore.Transaction.Common.StateRequest {
  private beam: any;
  private fromBeam: any;
  private layer: any;
  private basePoint: Point2D;
  private mouseBeginPoint: Point2D;
  private snaphelper: SnapHelper;
  private dragged: boolean;
  private selectionMgr: any;
  private signalHostChanged: HSCore.Util.Signal<HostChangedEvent>;

  constructor(beam: any, mouseBeginPoint: Point2D, fromBeam?: any) {
    super();
    
    this.beam = beam;
    this.fromBeam = fromBeam;
    this.layer = this.beam.getUniqueParent();
    this.signalHostChanged = new HSCore.Util.Signal<HostChangedEvent>();
    this.dragged = false;
    this.basePoint = {
      x: this.beam.x,
      y: this.beam.y
    };
    this.mouseBeginPoint = mouseBeginPoint;
    this.selectionMgr = HSApp.App.getApp().selectionManager;

    if (!HSApp.Util.Selection.hasOnlySelected(this.beam)) {
      this.selectionMgr.unselectAll();
      this.selectionMgr.select(this.beam);
    }

    const snapConfig: SnapHelperConfig = {
      layer: this.layer,
      snapMaster: this.beam
    };
    this.snaphelper = new SnapHelper(snapConfig);
    
    BeamClipper.getInstance().clearCache();
    HSCore.Util.FaceMoldingFitHelper.getInstance().startListening(this.layer);
  }

  onCommit(): any {
    this.snaphelper.hideAuxiliaries();
    this.beam.rebuild();

    if (this.fromBeam) {
      const fromLayer = this.fromBeam.getUniqueParent();
      
      for (const toFace of this.beam.faceList) {
        const fromFace = this.getCopyFromFaceByTopoKey(
          toFace,
          this.fromBeam.faceList,
          fromLayer
        );
        if (fromFace) {
          this.copyMaterial(toFace, fromFace);
        }
      }
    }

    HSCore.Util.FaceMoldingFitHelper.getInstance().autoFit();
    super.onCommit();
    
    return this.beam;
  }

  onReceive(eventType: string, eventData: ReceiveEventData): boolean {
    switch (eventType) {
      case 'moveto':
        this._moveTo(eventData.position);
        break;

      case 'dragstart': {
        const startPosition = eventData.viewType && eventData.viewType === '2d'
          ? eventData.position || []
          : [
              this.beam.x,
              this.beam.y,
              this.beam.z + HSCore.Util.Content.getAltitude(this.beam)
            ];
        
        this.mouseBeginPoint = {
          x: startPosition[0],
          y: startPosition[1]
        };
        this.dragged = true;
        return true;
      }

      case 'mousemove':
        if (this.dragged) {
          return false;
        }
        // fall through

      case 'dragmove':
        if (!eventData.position) {
          return false;
        }
        
        const { delta, newMousePos } = this._calcMoveOffset(eventData);
        this.move(delta, newMousePos);
        this._changeCursorStatus();
        return true;

      case 'mousedown':
        return false;

      default:
        super.onReceive(eventType, eventData);
    }

    return true;
  }

  move(delta: Vector2, newMousePos: Vector2): void {
    this._updateBeamPosition(delta);
    BeamClipper.getInstance().clipBeam(this.beam, newMousePos);

    const snapResult = this.snaphelper?.doSnap();
    
    if (snapResult) {
      const deltaX = snapResult.dx ?? 0;
      const deltaY = snapResult.dy ?? 0;
      
      this.beam.x += deltaX;
      this.beam.y += deltaY;

      if (snapResult.center && snapResult.drotation) {
        this.beam.rotateAround(snapResult.center, snapResult.drotation);
        this.basePoint = {
          x: this.beam.x,
          y: this.beam.y
        };
        this.mouseBeginPoint = newMousePos;
      }
    }

    BeamClipper.getInstance().clipBeam(this.beam, newMousePos);
    this.beam.dirtyPosition();
  }

  private _moveTo(position?: MoveToPosition): void {
    if (!this.beam.parent || !position || !this.beam) {
      return;
    }

    if (position.x !== undefined) {
      this.beam.x = position.x;
    }
    if (position.y !== undefined) {
      this.beam.y = position.y;
    }
    if (position.z !== undefined) {
      this.beam.z = position.z < 0 ? 0 : position.z;
    }
    if (position.ZRotation !== undefined) {
      this.beam.rotation = position.ZRotation;
    }
    if (position.XRotation !== undefined) {
      this.beam.XRotation = position.XRotation;
    }
    if (position.YRotation !== undefined) {
      this.beam.YRotation = position.YRotation;
    }
    if (position.XScale !== undefined) {
      this.beam.XScale = position.XScale;
    }
    if (position.YScale !== undefined) {
      this.beam.YScale = position.YScale;
    }
    if (position.ZScale !== undefined) {
      this.beam.ZScale = position.ZScale;
    }

    this.beam.dirtyGeometry();
    this.snaphelper?.hideAuxiliaries();
    this.beam.setFlagOff(HSCore.Model.StructureFlagEnum.dragOn, true);
    this.selectionMgr.unselectAll();
    this.selectionMgr.select(this.beam);
  }

  private _calcMoveOffset(eventData: ReceiveEventData): { delta: Vector2; newMousePos: Vector2 } {
    const newMousePos = new Vector2({
      x: eventData.position![0],
      y: eventData.position![1]
    });

    const delta = new Vector2({
      x: newMousePos.x - this.mouseBeginPoint.x,
      y: newMousePos.y - this.mouseBeginPoint.y
    });

    this.beam.replaceParent(eventData.pickedLayer);

    return { delta, newMousePos };
  }

  private _updateBeamPosition(delta: Vector2): void {
    const base = this.basePoint;
    this.beam.x = base.x + delta.x;
    this.beam.y = base.y + delta.y;
    this.beam.dirtyPosition();
  }

  private _changeCursorStatus(): void {
    HSApp.App.getApp().getActive2DView().context.cursorStatus.releaseStatus();
  }

  private _addToHost(newHost: any): void {
    const currentHost = this.beam.getHost();
    
    if (currentHost !== newHost) {
      this.beam.assignTo(newHost);
      this.signalHostChanged.dispatch({
        oldHost: currentHost,
        newHost: newHost
      });
    }
  }

  getCopyFromFaceByTopoKey(toFace: any, fromFaceList: any[], fromLayer: any): any | undefined {
    const toFaceMapEntry = fromLayer.beamBuilder.faceMap.get(toFace.id);
    
    if (!toFaceMapEntry) {
      return undefined;
    }

    const toOriginKey = toFaceMapEntry.originKey;
    const fromFaceIds = fromFaceList.map(face => face.id);

    for (const [faceId, mapEntry] of fromLayer.beamBuilder.faceMap) {
      if (!fromFaceIds.includes(faceId)) {
        continue;
      }

      const fromOriginKey = mapEntry.originKey;
      const toKeyParts = toOriginKey.split('/');
      const fromKeyParts = fromOriginKey.split('/');

      if (toKeyParts[1] !== fromKeyParts[1] || toKeyParts[2] !== fromKeyParts[2]) {
        continue;
      }

      return fromFaceList.find(face => face.id === faceId);
    }

    return undefined;
  }

  copyMaterial(targetFace: any, sourceFace: any): void {
    const sourceMaterial = sourceFace.material;
    
    if (sourceMaterial) {
      this.setFaceMixpaintMaterial(targetFace, sourceMaterial);
    }
  }

  setFaceMixpaintMaterial(face: any, sourceMaterial: any): void {
    const facePath2d = face.rawPath2d;
    const mixPaveApi = new MixPaveApi();
    const clonedMaterial = sourceMaterial.cloneDeep();
    
    let mixPave: any;

    if (HSCore.Paint.MaterialUtil.isMixPaintMaterial(clonedMaterial)) {
      mixPave = clonedMaterial.mixpaint.mixPave;
      new RegionApi().setPath(mixPave.regions[0], facePath2d);
    } else {
      mixPave = mixPaveApi.createMixPave();
      const backgroundSeekId = mixPave.backgroundMaterial.seekId;
      mixPaveApi.addRegion(mixPave, facePath2d, undefined, backgroundSeekId);
    }

    clonedMaterial.mixpaint = new HSCore.Model.MixPaint();
    clonedMaterial.mixpaint.mixPave = mixPave;
    face.material = clonedMaterial.clone();
    face.material.mixpaint.faceEntity = face;
  }

  canTransactField(): boolean {
    return true;
  }

  hideAllSnapAuxilaries(): void {
    this.snaphelper.hideAuxiliaries();
  }

  getCeilingHost(entity: any): any {
    return entity.roomInfos
      .map((roomInfo: any) => roomInfo.ceilings)
      .flat()[0];
  }
}