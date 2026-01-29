interface Point {
  x: number;
  y: number;
}

interface Bound {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface MouseEventData {
  position: Point;
  event: MouseEvent;
  clientX: number;
  clientY: number;
}

interface Model {
  bound: Bound;
  contentID?: string;
  ID: string;
  instanceOf(modelClass: string): boolean;
  isContentValid(): boolean;
  isFlagOff(flag: number): boolean;
  isFlagOn(flag: number): boolean;
}

interface SketchFace {
  bound: Bound;
}

interface Sketch2dEntity {
  faces: SketchFace[];
}

interface Canvas2d {
  context: CanvasRenderingContext2D;
  displayLayers: {
    temp: HTMLElement;
  };
  modelBoundToCanvas?(bound: Bound): Bound;
  canvasPointToModel(point: Point): Point;
}

interface Environment {
  id: string;
  paintMode?: string;
  getSketch2dEntity?(): Sketch2dEntity | null;
  getCanvas2d(): Canvas2d;
  isFreePaintMode(): boolean;
}

interface Gizmo {
  onCleanup(): void;
  onMouseMove(event: MouseEvent, x: number, y: number): void;
  onMouseUp(event: MouseEvent, x: number, y: number): void;
}

interface SelectionManager {
  selected(): Model[];
  unselect(models: Model[]): void;
  select(models: Model[]): void;
}

export default class WindowSelectCommand extends HSApp.Cmd.Command {
  private _startPoint: Point;
  private _endPoint: Point;
  private _selectionMgr: SelectionManager;
  private app: any;
  private pickedEntities: Model[];
  private readonly PositiveSelection: boolean = true;
  private readonly NegativeSelection: boolean = false;
  private activeEnv: Environment;
  private gizmo?: Gizmo;

  constructor(startPoint: Point) {
    super();
    this._startPoint = startPoint;
    this._endPoint = {} as Point;
    this._selectionMgr = HSApp.Selection.Manager;
    this.app = HSApp.App.getApp();
    this.pickedEntities = [];
    this.activeEnv = this.app.environmentManager.activeEnvironment;
    
    log.logger(HSFPConstants.CommandType.WindowSelect);
  }

  onExecute(param1: unknown, param2: unknown, param3: unknown): void {
    this.createGizmo();
    this.app.hotkey.registerHotkey("esc", this.onESC.bind(this), this.type);
  }

  createGizmo(): void {
    let view = this.context.app.getActive2DView();
    const sketchEntity = this.activeEnv.getSketch2dEntity?.();
    
    if (sketchEntity) {
      view = this.activeEnv.getCanvas2d();
    }
    
    this.gizmo = new HSApp.View.SVG.WindowSelectGizmo(
      view.context,
      view.displayLayers.temp,
      this
    );
    view.gizmoManager.addGizmo(this.gizmo);
  }

  destroyGizmo(): void {
    if (!this.gizmo) return;
    
    this.context.app.getActive2DView().gizmoManager.removeGizmo(this.gizmo);
    this.gizmo.onCleanup();
    this.gizmo = undefined;
  }

  pickSketchFaces(selectionBound: Bound): boolean {
    const sketchEntity = this.activeEnv.getSketch2dEntity?.();
    if (!sketchEntity) return false;

    const canvas = this.activeEnv.getCanvas2d();
    
    sketchEntity.faces.forEach((face) => {
      let canvasBound = canvas.modelBoundToCanvas?.(face.bound);
      canvasBound = canvasBound || HSApp.View.SVG.Util.ModelBoundToCanvas(face.bound);
      this.pickInnerBox(canvasBound, selectionBound, face as unknown as Model);
    });

    return true;
  }

  private _isBackgroundModel(model: Model): boolean {
    const sketchEntity = this.activeEnv.getSketch2dEntity?.();
    return (
      model instanceof HSCore.Model.CustomizedFeatureModel &&
      (model as any).sketch === sketchEntity
    );
  }

  isSketch2dEnv(): boolean {
    return !!(this.activeEnv.getSketch2dEntity?.());
  }

  doPick(selectionBound: Bound, isShiftKey: boolean, isPositiveSelection: boolean): void {
    const useInnerBoxPick = this.isSketch2dEnv() || isPositiveSelection;
    const layerContents = this.app.floorplan.scene.activeLayer.contents;

    Object.values(layerContents).forEach((model: Model) => {
      if (
        !model.instanceOf(HSConstants.ModelClass.NgOpening) &&
        !model.instanceOf(HSConstants.ModelClass.NgCornerWindow) &&
        model.isContentValid() &&
        model.isFlagOff(HSCore.Model.EntityFlagEnum.unselectable) &&
        !this._isBackgroundModel(model)
      ) {
        const canvasBound = HSApp.View.SVG.Util.ModelBoundToCanvas(model.bound);
        
        if (useInnerBoxPick) {
          this.pickInnerBox(canvasBound, selectionBound, model);
        } else {
          this.pickBorderBox(canvasBound, selectionBound, model);
        }
      }
    });

    const hiddenContentIds = new Set<string>();
    const defaultLightGroup = HSApp.Util.LightgroupsUtil.getDefaultEditableLightGroup();

    if (defaultLightGroup?.members.length) {
      Object.keys(defaultLightGroup.members).forEach((key) => {
        const member = defaultLightGroup.members[key];
        
        if (
          member.isFlagOff(HSCore.Model.EntityFlagEnum.hidden) &&
          member.isFlagOff(HSCore.Model.EntityFlagEnum.unselectable)
        ) {
          const svgBound = HSApp.View.SVG.Util.buildSVGContentBound(member);
          
          if (useInnerBoxPick) {
            this.pickInnerBox(svgBound, selectionBound, member);
          } else {
            this.pickBorderBox(svgBound, selectionBound, member);
          }
        } else if (
          member.contentID &&
          this.activeEnv.id === HSFPConstants.Environment.ManualLighting
        ) {
          hiddenContentIds.add(member.contentID);
        }
      });
    }

    this.pickedEntities = this.pickedEntities.filter((entity) => {
      const id = entity.contentID ?? entity.ID;
      return !hiddenContentIds.has(id);
    });

    if (this.pickedEntities.length === 0) {
      this.pickSketchFaces(selectionBound);
    }

    this._doSelect();
  }

  private _doSelect(): void {
    if (this._isMixPaintEnv()) {
      if (this.activeEnv.isFreePaintMode()) return;
      
      HSApp.PaintPluginHelper.Class.PaveActionIntegration.instance.selectRegionByFaces(
        this.pickedEntities
      );
    } else {
      const currentSelected = this._selectionMgr.selected();
      const toUnselect: Model[] = [];
      const toSelect: Model[] = [];

      if (this.pickedEntities.length > 0) {
        currentSelected.forEach((entity) => {
          if (
            entity.instanceOf(HSConstants.ModelClass.NgOpening) ||
            entity.instanceOf(HSConstants.ModelClass.NgCornerWindow) ||
            entity.instanceOf(HSConstants.ModelClass.NgWall) ||
            entity.instanceOf(HSConstants.ModelClass.NgFloor) ||
            entity.instanceOf(HSConstants.ModelClass.NgFace)
          ) {
            toUnselect.push(entity);
          }
        });
      }

      this.pickedEntities.forEach((entity) => {
        if (entity.isFlagOn(HSCore.Model.EntityFlagEnum.selected)) {
          toUnselect.push(entity);
        }
        toSelect.push(entity);
      });

      this._selectionMgr.unselect(toUnselect);
      this._selectionMgr.select(toSelect);
    }
  }

  doPick_MixPaintBlock(
    startPoint: Point,
    endPoint: Point,
    selectionBound: Bound,
    paintContext: any
  ): void {
    const PaintCollider = HSApp.PaintPluginHelper.Class.PaintCollider;
    const mixpaint = paintContext.mixpaint;
    const canvas = paintContext.ui.mixpaintCanvas;

    const modelStart = canvas.canvasPointToModel(startPoint);
    const modelEnd = canvas.canvasPointToModel(endPoint);

    const collider = new PaintCollider(mixpaint);
    const queryBound: Bound = {
      x: Math.min(modelStart.x, modelEnd.x),
      y: Math.min(modelStart.y, modelEnd.y),
      width: Math.abs(modelStart.x - modelEnd.x),
      height: Math.abs(modelStart.y - modelEnd.y)
    };

    const blocks = collider.queryAllBlocks(queryBound);

    if (startPoint.x < endPoint.x) {
      for (const block of blocks) {
        const blockBound = this._getBlockBoundInCanvas(block, canvas);
        this.pickBorderBox(blockBound, selectionBound, block);
      }
    } else {
      for (const block of blocks) {
        const blockBound = this._getBlockBoundInCanvas(block, canvas);
        this.pickInnerBox(blockBound, selectionBound, block);
      }
    }

    this._doSelect();
  }

  private _getBlockBoundInCanvas(block: any, canvas: Canvas2d): Bound {
    const bounds = HSCore.Util.Math.getBounds(block.points);
    return canvas.modelBoundToCanvas({
      left: bounds[0],
      top: bounds[1],
      width: bounds[2],
      height: bounds[3]
    });
  }

  pickInnerBox(entityBound: Bound, selectionBound: Bound, entity: Model): void {
    const isFullyContained =
      selectionBound.left < entityBound.left &&
      selectionBound.left + Math.abs(selectionBound.width) > entityBound.left + entityBound.width &&
      selectionBound.top < entityBound.top &&
      selectionBound.top + Math.abs(selectionBound.height) > entityBound.top + entityBound.height;

    if (isFullyContained && HSApp.Util.Selection.canMultiSelect(entity)) {
      this.pickedEntities.push(entity);
    }
  }

  pickBorderBox(entityBound: Bound, selectionBound: Bound, entity: Model): void {
    const entityAABB = new HSCore.Util.BrepBound(
      entityBound.left,
      entityBound.top,
      entityBound.width,
      entityBound.height
    );
    const selectionAABB = new HSCore.Util.BrepBound(
      selectionBound.left,
      selectionBound.top,
      selectionBound.width,
      selectionBound.height
    );

    if (
      HSCore.Util.Collision.AABBIntersect(entityAABB, selectionAABB) &&
      HSApp.Util.Selection.canMultiSelect(entity)
    ) {
      this.pickedEntities.push(entity);
    }
  }

  onReceive(eventType: string, eventData: MouseEventData): boolean {
    switch (eventType) {
      case "gizmo.mousemove":
        this._startPoint = this._startPoint || eventData.position;
        return true;

      case "gizmo.mouseup":
        this._endPoint = eventData.position;
        const selectionBound: Bound = {
          left: Math.min(this._startPoint.x, this._endPoint.x),
          top: Math.min(this._startPoint.y, this._endPoint.y),
          width: Math.abs(this._startPoint.x - this._endPoint.x),
          height: Math.abs(this._startPoint.y - this._endPoint.y)
        };

        if (this._isMixPaintEnvFreeMode()) {
          const mixPaintHandler = HSApp.PaintPluginHelper.Kernel.MixPaintPluginHandler;
          mixPaintHandler?.onWindowSelected(this._startPoint, this._endPoint);
          return true;
        }

        const isPositiveSelection = this._startPoint.x <= this._endPoint.x;
        this.doPick(
          selectionBound,
          eventData.event.shiftKey,
          isPositiveSelection ? this.PositiveSelection : this.NegativeSelection
        );
        return true;

      case "dragmove":
        this.gizmo?.onMouseMove(eventData.event, eventData.event.clientX, eventData.event.clientY);
        return true;

      case "dragend":
        this.gizmo?.onMouseUp(eventData.event, eventData.event.clientX, eventData.event.clientY);
        this.mgr.complete();
        return true;

      default:
        log("move wall command: " + eventType);
        return super.onReceive(eventType, eventData);
    }
  }

  private _isMixPaintEnv(): boolean {
    return this.activeEnv.id === HSFPConstants.Environment.MixPaint;
  }

  private _isMixPaintEnvFreeMode(): boolean {
    return this._isMixPaintEnv() && !!this.activeEnv.paintMode && this.activeEnv.isFreePaintMode();
  }

  onESC(): void {
    HSApp.App.getApp().cmdManager.cancel();
  }

  onCleanup(): void {
    this.destroyGizmo();
    this.app.hotkey.unregisterHotkey("esc", this.onESC.bind(this), this.type);
  }

  canUndoRedo(): boolean {
    return false;
  }

  canSuspend(): boolean {
    return false;
  }
}