import { Vector3, Vector2, Line2d, OffsetCurve2d, Interval, Loop } from '../geometry';
import { HSApp } from '../app';
import { HSCore } from '../core';
import { HSFPConstants } from '../constants';
import { HSConstants } from '../constants/global';

interface MoldingEntity extends HSCore.Model.Entity {
  id: string;
  sweepPath: Array<{ getStartPt(): Vector3; getEndPt(): Vector3 }>;
  YSize: number;
  XSize: number;
  host: {
    roomInfos: Array<{
      floors: Floor[];
    }>;
  };
  topoPathers: Array<{ from: number }>;
  getUniqueParent(): MoldingEntity | undefined;
}

interface Floor {
  forEachContent(callback: (content: Content) => void): void;
  forEachStructureFace(callback: (face: StructureFace) => void): void;
}

interface StructureFace {
  forEachContent(callback: (content: Content) => void): void;
}

interface Content {
  z: number;
  ZSize: number;
  outline: unknown;
}

interface Gizmo {
  childItems: Array<{
    valueChanged: HSCore.Util.Signal<ValueChangedData>;
  }>;
  update(position?: Vector3): void;
  onCleanup(): void;
}

interface ValueChangedData {
  data: {
    dim: {
      start: Vector3;
      end: Vector3;
    };
    value: number;
  };
}

interface DisplayListItem {
  isHighlight(): boolean;
  highlightOutlineMesh(highlight: boolean, force?: boolean): void;
}

interface PickEventData {
  entity: MoldingEntity;
  modelPos: Vector3;
  event: {
    button: number;
  };
}

interface GizmoPlugin {
  getCutMoldingDimensionGizmo(
    context: unknown,
    layer: unknown,
    molding: MoldingEntity,
    options: { startPt: Vector3; endPt: Vector3 }
  ): Gizmo;
}

export class CmdCutMolding extends HSApp.Cmd.Command {
  private molding: MoldingEntity;
  private app: HSApp.App;
  private startPos!: Vector3;
  private endPos!: Vector3;
  private pickPoint: Vector3;
  private gizmo?: Gizmo;
  private signalHook?: HSCore.Util.SignalHook;
  private displayList: Record<string, DisplayListItem>;
  private intersectContentPos: Vector3[];
  private lineMaxLength!: number;
  private layerHeight: number;

  constructor(molding: MoldingEntity) {
    super();
    this.app = HSApp.App.getApp();
    this.molding = molding;
    this.intersectContentPos = [];
    this.pickPoint = new Vector3(0, 0, 0);
    this.displayList = this.app.getActive3DView().displayList || {};
    this.layerHeight = this.getLayerHeight();
    this.getMoldingPos();
  }

  private getLayerHeight(): number {
    const floorplan = this.app.floorplan;
    const parent = this.molding.getUniqueParent()?.getUniqueParent() || floorplan.scene.activateLayer;
    return floorplan.scene.getLayerAltitude(parent);
  }

  private getMoldingPos(): void {
    const sweepPath = this.molding.sweepPath;
    this.startPos = sweepPath[0].getStartPt();
    this.endPos = sweepPath[sweepPath.length - 1].getEndPt();
    this.lineMaxLength = this.startPos.distanceTo(this.endPos);
  }

  private createGizmo(): Gizmo {
    if (this.gizmo) {
      this.destroyGizmo();
    }

    const gizmoPlugin = this.app.pluginManager.getPlugin<GizmoPlugin>(HSFPConstants.PluginType.Gizmo);
    const viewContext = this.app.getActive3DView().context;
    const yOffset = this.molding instanceof HSCore.Model.Baseboard
      ? this.molding.YSize + 0.05
      : -(this.molding.YSize + 0.05);
    const offsetVector = new Vector3(0, 0, yOffset + this.layerHeight);

    const gizmo = gizmoPlugin.getCutMoldingDimensionGizmo(
      viewContext,
      viewContext.hscanvas.displayLayers.gizmo,
      this.molding,
      {
        startPt: this.startPos.add(offsetVector),
        endPt: this.endPos.add(offsetVector)
      }
    );

    this.gizmo = gizmo;
    this.signalHook = new HSCore.Util.SignalHook(this);

    gizmo.childItems.forEach((item) => {
      this.signalHook!.listen(item.valueChanged, (data: ValueChangedData) => this.handleValueChanged(data));
    });

    return gizmo;
  }

  private handleValueChanged(eventData: ValueChangedData): void {
    const { dim, value } = eventData.data;
    const { start, end } = dim;

    if (value >= this.lineMaxLength) {
      this.updateGizmo(this.pickPoint);
    } else {
      const direction = end.subtracted(start).normalized();
      const newPosition = start.added(direction.multiplied(value));
      this.destroyGizmo();
      this.cutMolding(newPosition);
    }
  }

  private updateGizmo(position?: Vector3): void {
    const adjustedPosition = position ? new Vector3(position.x, position.y, this.startPos.z) : undefined;
    this.gizmo?.update(adjustedPosition);
  }

  private destroyGizmo(): void {
    this.gizmo?.onCleanup();
    this.signalHook?.dispose();
    this.signalHook = undefined;
    this.gizmo = undefined;
  }

  onExecute(): void {
    this.getIntersectPos();
    this.createGizmo();
    this.updateViewCursor(`cursor: url(${HSConstants.Resources.svgs.cut_wall}) 0 0, auto;`);
  }

  onReceive(eventType: string, eventData: PickEventData): boolean {
    const { entity, modelPos, event } = eventData;

    switch (eventType) {
      case 'click':
        if (event.button === 0 && entity.id === this.molding.id) {
          this.pickPoint = new Vector3(modelPos);
          this.cutMolding(this.pickPoint);
        } else if (event.button === 2) {
          this.onESC();
        }
        return false;

      case 'mousemove':
        if (entity?.id === this.molding.id) {
          this.pickPoint = new Vector3(modelPos);
          this.doSnappingIntersectPos(modelPos);
          this.updateGizmo(this.pickPoint);
        } else {
          this.updateGizmo();
        }
        return false;

      default:
        return super.onReceive(eventType, eventData);
    }
  }

  private doSnappingIntersectPos(position: Vector3): void {
    const SNAP_THRESHOLD = 0.03;
    this.intersectContentPos.forEach((intersectPos) => {
      if (intersectPos.distanceTo(position) <= SNAP_THRESHOLD) {
        this.pickPoint.x = intersectPos.x;
        this.pickPoint.y = intersectPos.y;
      }
    });
  }

  private getIntersectPos(): void {
    const floors = this.molding.host.roomInfos[0]?.floors;
    if (!floors || floors.length <= 0) {
      return;
    }

    const moldingLine2d = new Line2d(
      { x: this.startPos.x, y: this.startPos.y },
      { x: this.endPos.x, y: this.endPos.y }
    );
    const offsetCurve = OffsetCurve2d.makeByOffset(moldingLine2d, -this.molding.XSize);
    const offsetLine = this.curveToLine(offsetCurve);
    const zStart = this.startPos.z;
    const moldingHeight = this.molding.YSize;
    const moldingInterval = new Interval(zStart - moldingHeight, zStart);

    floors.forEach((floor) => {
      floor.forEachContent((content) => {
        if (this.isIntersected(moldingInterval, content)) {
          const contentLines = this.getContentBoxLine(content);
          const intersections = this.getContentLinesIntersected(offsetLine, contentLines);
          this.intersectContentPos.push(...intersections);
        }
      });

      floor.forEachStructureFace((face) => {
        face.forEachContent((content) => {
          if (this.isIntersected(moldingInterval, content)) {
            const contentLines = this.getContentBoxLine(content);
            const intersections = this.getContentLinesIntersected(offsetLine, contentLines);
            this.intersectContentPos.push(...intersections);
          }
        });
      });
    });
  }

  private isIntersected(moldingInterval: Interval, content: Content): boolean {
    const contentInterval = new Interval(content.z, content.z + content.ZSize);
    return moldingInterval.intersected(contentInterval).length > 0;
  }

  private getContentBoxLine(content: Content): Line2d[] {
    const loop = new Loop(content.outline);
    return loop.getAllCurves().map((curve) => this.curveToLine(curve));
  }

  private curveToLine(curve: { getStartPt(): unknown; getEndPt(): unknown }): Line2d {
    const startPoint = curve.getStartPt();
    const endPoint = curve.getEndPt();
    return new Line2d(startPoint, endPoint);
  }

  private getContentLinesIntersected(moldingLine: Line2d, contentLines: Line2d[]): Vector3[] {
    const intersections: Vector3[] = [];

    contentLines.forEach((contentLine) => {
      const intersection = HSCore.Util.Math.segmentSegmentIntersection(
        moldingLine.getStartPt(),
        moldingLine.getEndPt(),
        contentLine.getStartPt(),
        contentLine.getEndPt()
      );

      if (intersection) {
        intersections.push(new Vector2(intersection.x, intersection.y) as unknown as Vector3);
      }
    });

    return intersections;
  }

  onCleanup(): void {
    this.destroyGizmo();
    this.updateViewCursor(HSApp.View.CursorEnum.default);
    this.highlightOutlineMesh(false, true);
  }

  private cutMolding(position: Vector3): void {
    const transactionManager = this.context.transManager;
    const request = transactionManager.createRequest(HSFPConstants.RequestType.CutMolding, [this.molding, position]);
    transactionManager.commit(request);

    const newMoldings = request.getNewMoldings();
    if (newMoldings.length < 2) {
      return;
    }

    const firstMolding = newMoldings[0].topoPathers[0].from < newMoldings[1].topoPathers[0].from
      ? newMoldings[0]
      : newMoldings[1];

    this.molding = firstMolding;
    this.getMoldingPos();
    this.createGizmo();
    this.highlightOutlineMesh(true);
  }

  private highlightOutlineMesh(shouldHighlight: boolean, force: boolean = false): void {
    const displayItem = this.displayList[this.molding?.id];
    if (displayItem && displayItem.isHighlight() !== shouldHighlight) {
      displayItem.highlightOutlineMesh(shouldHighlight, force);
    }
  }

  private updateViewCursor(cursorStyle: string): void {
    const activeView = this.app.getActive3DView();
    activeView?.context.cursorStatus.setCurrentStatus(cursorStyle);
  }

  private onESC(): void {
    this.mgr.cancel();
  }

  getDescription(): string {
    return '拆分线条';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.FaceOperation;
  }
}