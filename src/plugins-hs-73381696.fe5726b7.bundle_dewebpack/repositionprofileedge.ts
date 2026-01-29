import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { ProfileEdgeDimension } from './ProfileEdgeDimension';
import { InputBoxType } from './InputBoxType';
import { getUnitParam } from './UnitUtils';

interface Point {
  x: number;
  y: number;
}

interface Edge {
  from: Point;
  to: Point;
  direction: Vector2;
  edge: Edge;
  coedge?: Edge;
  partner?: Edge;
  ID: string;
  isValid(): boolean;
}

interface Vector2 {
  clone(): Vector2;
  normalize(): Vector2;
  invert(): Vector2;
  scale(factor: number): Vector2;
  add(other: Vector2): Vector2;
}

interface Dimension {
  editable: boolean;
  curve: { getLength(): number };
  update(): void;
  focus(): void;
  blur(): void;
  updateProps(props: DimensionProps): void;
}

interface DimensionProps {
  type: InputBoxType;
  onEnter?: (value: number, isValid: boolean, dimension: Dimension) => void;
  onTab?: () => void;
}

interface ProfileEdgeDimensionGizmo {
  entity: Edge;
  dimension: Dimension;
  canDraw(): boolean;
}

interface GizmoManager {
  getEntityGizmos(entity: Edge): ProfileEdgeDimensionGizmo[];
}

interface Canvas {
  gizmoManager: GizmoManager;
}

interface TransactionManager {
  signalUndone: string;
  signalRedone: string;
}

interface Application {
  transManager: TransactionManager;
  signalViewActivated: string;
  is2DViewActive(): boolean;
  floorplan: { removeChild(id: string): void };
}

interface Context {
  application: Application;
}

interface SignalHook {
  listen(signal: string, callback: () => void): SignalHook;
}

interface CommandManager {
  createCommand(name: string, args: unknown[]): Command;
  execute(command: Command, data?: unknown): void;
  receive(event: string, data: unknown): void;
  complete(): void;
}

interface Command {
  showGizmo: boolean;
}

interface MoveVertexData {
  entity: Point;
  position: Vector2;
}

interface ValueChangeData {
  data: {
    value: number;
    gizmo: ProfileEdgeDimensionGizmo;
  };
}

function getConnectedEdges(point: Point, excludeEdge: Edge): Edge[] {
  return HSCore.Util.Point.getParentEdges(point).filter((edge) => edge !== excludeEdge);
}

export class RepositionProfileEdge extends HSApp.View.Base.Gizmo {
  private currentEditableDimensions: ProfileEdgeDimensionGizmo[] = [];
  private _activeGizmo?: ProfileEdgeDimensionGizmo;
  public readonly type = 'hsw.view.svg.gizmo.RepositionProfileEdge';
  public entity: Edge;
  protected context: Context;
  protected signalHook: SignalHook;
  protected controller: RepositionProfileEdgeController;

  constructor(canvas: Canvas, context: Context, entity: Edge) {
    super(canvas, context, entity, new RepositionProfileEdgeController(entity, canvas));
    this.entity = entity;
    this.context = context;
    this.reset();
  }

  public reset(): void {
    const dimensions = this.currentEditableDimensions;
    if (dimensions) {
      dimensions.forEach((dimension) => {
        this._deactivateDimension(dimension);
      }, this);
    }
    this.currentEditableDimensions = [];
    this._activeGizmo = undefined;
  }

  public onActivate(): void {
    const updateHandler = (): void => {
      this.update();
    };

    const app = this.context.application;
    const transManager = app.transManager;

    this.signalHook
      .listen(transManager.signalUndone, updateHandler)
      .listen(transManager.signalRedone, updateHandler)
      .listen(app.signalViewActivated, () => {
        this.update();
      });

    this.update();
    super.onActivate?.();
  }

  public onDeactivate(): void {
    this.unlistenAllEvents();
    this.currentEditableDimensions.forEach((dimension) => {
      this._deactivateDimension(dimension);
    }, this);
    this.currentEditableDimensions = [];
    this._activeGizmo = undefined;
    super.onDeactivate?.();
  }

  public onCleanup(): void {
    super.onCleanup?.();
  }

  public draw(): void {
    super.draw?.();
  }

  public getEditableDimensions(): ProfileEdgeDimensionGizmo[] {
    const entity = this.entity;
    
    const isNotParallel = (edge: Edge): boolean => {
      return !HSCore.Util.Math.isParallel(
        entity.from,
        entity.to,
        edge.from,
        edge.to,
        0.001
      );
    };

    const findDimensionGizmo = (edge: Edge): ProfileEdgeDimensionGizmo | undefined => {
      const gizmos = this.getCanvas().gizmoManager.getEntityGizmos(edge);
      for (let i = 0; i < gizmos.length; i++) {
        const gizmo = gizmos[i];
        if (gizmo && gizmo.canDraw() && gizmo instanceof ProfileEdgeDimension) {
          return gizmo;
        }
      }
      return undefined;
    };

    const result: ProfileEdgeDimensionGizmo[] = [];
    const currentEdge = this.entity;

    let fromEdges = HSCore.Util.Point.getParentEdges(currentEdge.from);
    fromEdges = fromEdges.concat(HSCore.Util.Point.getParentEdges(currentEdge.to));

    const coedges: Edge[] = [];
    fromEdges.forEach((edge) => {
      if (edge.coedge) {
        coedges.push(edge.coedge);
        if (edge.coedge.partner) {
          coedges.push(edge.coedge.partner);
        }
      }
    });

    const filteredCoedges = coedges.filter((edge) => {
      return (
        edge !== currentEdge &&
        edge !== currentEdge &&
        edge !== currentEdge.partner &&
        edge !== currentEdge.partner
      );
    });

    filteredCoedges.forEach((edge) => {
      if (isNotParallel(edge)) {
        const gizmo = findDimensionGizmo(edge);
        if (gizmo) {
          result.push(gizmo);
        }
      }
    });

    if (
      getConnectedEdges(currentEdge.from, currentEdge.edge).length === 0 ||
      getConnectedEdges(currentEdge.to, currentEdge.edge).length === 0
    ) {
      const selfGizmo = findDimensionGizmo(currentEdge);
      if (selfGizmo) {
        result.unshift(selfGizmo);
      }
    }

    return result;
  }

  public update(): void {
    if (!HSApp.App.getApp().is2DViewActive()) {
      this.reset();
      return;
    }

    if (!this.entity) {
      return;
    }

    const toActivate: ProfileEdgeDimensionGizmo[] = [];
    const toDeactivate: ProfileEdgeDimensionGizmo[] = [];
    const current = this.currentEditableDimensions;
    const editable = this.getEditableDimensions();

    editable.forEach((gizmo) => {
      if (!current.includes(gizmo)) {
        toActivate.push(gizmo);
      }
    });

    current.forEach((gizmo) => {
      if (!editable.includes(gizmo)) {
        toDeactivate.push(gizmo);
      }
    });

    toDeactivate.forEach((gizmo) => {
      this._deactivateDimension(gizmo);
    });

    toActivate.forEach((gizmo) => {
      this._activateDimension(gizmo);
    });

    this.currentEditableDimensions = editable;

    if (this.currentEditableDimensions.length > 0) {
      this.currentEditableDimensions.forEach((gizmo) => gizmo.dimension.update());

      if (!this._activeGizmo || !this.currentEditableDimensions.includes(this._activeGizmo)) {
        this.setActiveGizmo(this.currentEditableDimensions[0]);
      }
    } else {
      this.setActiveGizmo(undefined);
    }
  }

  private _activateDimension(gizmo: ProfileEdgeDimensionGizmo): void {
    if (gizmo?.dimension) {
      gizmo.dimension.editable = true;
      gizmo.dimension.updateProps({
        type: InputBoxType.Number,
        onEnter: this._onValueChangeCommit.bind(this),
        onTab: this._onInputSwitching.bind(this),
      });
    }
  }

  private _deactivateDimension(gizmo: ProfileEdgeDimensionGizmo): void {
    if (gizmo?.dimension) {
      gizmo.dimension.editable = false;
      gizmo.dimension.updateProps({
        type: InputBoxType.Number,
        onEnter: undefined,
        onTab: undefined,
      });
    }
  }

  public setActiveGizmo(gizmo?: ProfileEdgeDimensionGizmo): void {
    let activeGizmo = gizmo;

    if (!activeGizmo || (activeGizmo.dimension && !activeGizmo.dimension.editable)) {
      activeGizmo = undefined;
    }

    if (activeGizmo === this._activeGizmo) {
      return;
    }

    this._activeGizmo = activeGizmo;

    this.currentEditableDimensions.forEach((currentGizmo) => {
      if (currentGizmo === this._activeGizmo) {
        currentGizmo.dimension.focus();
      } else {
        currentGizmo.dimension.blur();
      }
    });
  }

  private _onValueChangeCommit(value: number, isValid: boolean, dimension: Dimension): void {
    if (!isValid) {
      return;
    }

    const gizmo = this.currentEditableDimensions.find((g) => g.dimension === dimension);

    if (!gizmo) {
      return;
    }

    this.controller.dispatch('valueChanged', this.entity, {
      data: {
        value: value / getUnitParam() - dimension.curve.getLength(),
        gizmo: gizmo,
      },
    });

    this.update();
  }

  private _onInputSwitching(): void {
    if (!this._activeGizmo || this.currentEditableDimensions.length <= 1) {
      return;
    }

    const dimensions = this.currentEditableDimensions;
    let currentIndex = -1;

    for (let i = 0; i < dimensions.length; ++i) {
      if (dimensions[i] === this._activeGizmo) {
        currentIndex = i;
        break;
      }
    }

    if (currentIndex !== -1) {
      const nextGizmo = dimensions[(currentIndex + 1) % dimensions.length];
      this.setActiveGizmo(nextGizmo);
    }
  }

  protected getCanvas(): Canvas {
    return (this as any).canvas;
  }

  protected unlistenAllEvents(): void {
    // Implementation provided by base class
  }
}

class RepositionProfileEdgeController extends HSApp.View.Base.DisplayController {
  protected entity: Edge;
  protected _cmdMgr: CommandManager;

  constructor(entity: Edge, canvas: Canvas) {
    super(entity, canvas);
    this.entity = entity;
  }

  public dispatch(event: string, entity: Edge, data: ValueChangeData): void {
    const gizmo = data.data.gizmo;
    if (!gizmo) {
      return;
    }

    if (gizmo.entity === this.entity) {
      this._movePointHandler(event, entity, data);
    } else {
      this._moveCoEdgeHandler(event, entity, data);
    }
  }

  private _movePointHandler(event: string, entity: Edge, data: ValueChangeData): void {
    if (event !== 'valueChanged') {
      return;
    }

    const gizmo = data.data.gizmo;
    if (!gizmo) {
      return;
    }

    const currentEdge = this.entity;
    const pointToMove = this._findMovablePoint(currentEdge);

    if (!pointToMove) {
      return;
    }

    const direction = currentEdge.direction.clone().normalize();
    if (pointToMove === currentEdge.from) {
      direction.invert();
    }

    const vertexData: MoveVertexData = {
      entity: pointToMove,
      position: HSCore.Util.Math.Vec2.fromCoordinate(pointToMove),
    };

    const command = this._cmdMgr.createCommand('hsw.cmd.layer.CmdMoveSlabProfileVetex', [
      vertexData,
    ]);
    command.showGizmo = false;
    this._cmdMgr.execute(command);

    const distance = data.data.value;
    const offset = direction.clone().scale(distance);

    this._cmdMgr.receive('gizmo.mousemove', { offset });
    this._cmdMgr.receive('gizmo.mouseup', { entity: undefined });
    this._cmdMgr.complete();
  }

  private _moveCoEdgeHandler(event: string, entity: Edge, data: ValueChangeData): void {
    if (event !== 'valueChanged') {
      return;
    }

    const gizmo = data.data.gizmo;
    if (!gizmo) {
      return;
    }

    const targetEdge = gizmo.entity;
    const currentEdge = this.entity;
    const direction = targetEdge.direction.clone().normalize();
    const fromPoint = targetEdge.from;
    const toPoint = targetEdge.to;

    const wallsInLine = HSCore.Util.Geometry.findWallsInLine(currentEdge);
    const lineStart = wallsInLine[0].from;
    const lineEnd = wallsInLine[wallsInLine.length - 1].to;

    let pointToMove: Point | undefined;

    if (fromPoint === lineStart || fromPoint === lineEnd) {
      pointToMove = fromPoint;
      direction.invert();
    } else if (toPoint === lineStart || toPoint === lineEnd) {
      pointToMove = toPoint;
    }

    if (!pointToMove) {
      return;
    }

    const startPosition = HSCore.Util.Math.Vec2.fromCoordinate(pointToMove);
    const distance = data.data.value;
    const offset = direction.clone().scale(distance);
    const endPosition = startPosition.clone().add(offset);

    wallsInLine.forEach((wall) => {
      if (wall.isValid()) {
        const moveData = {
          entity: wall,
          position: startPosition,
        };

        const command = this._cmdMgr.createCommand('hsw.cmd.layer.CmdMoveSlabProfileEdge', [
          wall,
        ]);
        command.showGizmo = false;
        this._cmdMgr.execute(command, moveData);

        this._cmdMgr.receive('gizmo.mousedown', { position: startPosition });
        this._cmdMgr.receive('gizmo.mousemove', { offset });
        this._cmdMgr.receive('gizmo.mouseup', { position: endPosition });
      } else {
        HSApp.App.getApp().floorplan.removeChild(wall.ID);
      }
    });
  }

  private _findMovablePoint(edge: Edge): Point | undefined {
    const toConnections = getConnectedEdges(edge.to, edge.edge);
    const fromConnections = getConnectedEdges(edge.from, edge.edge);

    if (toConnections.length === 0) {
      return edge.to;
    } else if (fromConnections.length === 0) {
      return edge.from;
    }

    return undefined;
  }
}