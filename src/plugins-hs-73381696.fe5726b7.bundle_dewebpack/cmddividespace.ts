import { DivideSpace } from './DivideSpace';
import { Arc2d, Arc3d, Line2d, Vector2, MathAlg } from './MathLibrary';
import { HSCore } from './HSCore';

interface Floor {
  getMaster(): any;
  spaceInfos: SpaceInfo[];
  getUniqueParent(): any;
}

interface SpaceInfo {
  allFaces: Face[];
}

interface Face {
  contents: Record<string, any>;
}

interface Edge {
  curve: Arc3d | Line2d | any;
  from: Vector2;
  to: Vector2;
}

interface GizmoMessage {
  path: Vector2[];
  firstEdges: Edge[];
  lastEdges: Edge[];
}

interface GizmoManager {
  addGizmo(gizmo: DivideSpace): void;
  removeGizmo(gizmo: DivideSpace): void;
}

interface DisplayLayers {
  temp: any;
}

interface View2D {
  context: any;
  gizmoManager: GizmoManager;
  displayLayers: DisplayLayers;
}

interface App {
  getActive2DView(): View2D;
  transManager: TransactionManager;
}

interface TransactionManager {
  createRequest(type: string, params: any[]): any;
  commit(request: any): void;
}

interface CommandContext {
  app: App;
}

interface CommandManager {
  complete(): void;
  cancel(): void;
}

export class CmdDivideSpace extends HSApp.Cmd.Command {
  private app: App;
  private floor: Floor;
  private gizmo?: DivideSpace;
  private _isToastShow: boolean = false;

  constructor(app: App, floor: Floor) {
    super();
    this.app = app;
    this.floor = floor;
  }

  onExecute(): void {
    if (!this.floor.getMaster()) {
      return;
    }

    const storage = new HSApp.Util.Storage('hsw.plugin.roomproperty');
    
    if (storage.get('has_customized_model')) {
      this._showToast();
      return;
    }

    const hasCustomizedModel = this.floor.spaceInfos.some((spaceInfo) =>
      spaceInfo.allFaces.some((face) =>
        Object.values(face.contents).some((content) =>
          content instanceof HSCore.Model.CustomizedFeatureModel ||
          content instanceof HSCore.Model.NCustomizedSketchModel
        )
      )
    );

    if (hasCustomizedModel) {
      LiveHint.show(
        ResourceManager.getString('floor_contextmenu_dividespace_lint_live'),
        8000,
        () => {
          LiveHint.hide();
          storage.set('has_customized_model', true);
        },
        {
          append: ResourceManager.getString('floor_contextmenu_dividespace_lint_live_append'),
          canclose: true,
          onClose: () => {
            this._showToast();
          }
        }
      );
      return;
    }

    this._createGizmo();
  }

  onCleanup(): void {
    this._destroyGizmo();
    this._hideToast();
    super.onCleanup();
  }

  canUndoRedo(): boolean {
    return false;
  }

  private _onComplete(): void {
    this.mgr.complete();
  }

  private _onCancel(): void {
    this.mgr.cancel();
  }

  private _canDivideSpace(path: Vector2[], firstEdges: Edge[], lastEdges: Edge[]): boolean {
    if (firstEdges.length < 1 || lastEdges.length < 1) {
      return false;
    }

    if (path.length < 2) {
      return false;
    }

    if (path.length < 3) {
      const edge = firstEdges.find((edge) => lastEdges.includes(edge));
      if (edge && HSCore.Util.Math.isSameLine(path[0], path[1], edge.from, edge.to)) {
        return false;
      }
    }

    return true;
  }

  onReceive(event: string, message: GizmoMessage): boolean {
    if (event === 'gizmo.dividespace') {
      const path = message.path;

      if (!path || path.length < 2) {
        this._onCancel();
        return true;
      }

      if (!this._canDivideSpace(path, message.firstEdges, message.lastEdges)) {
        this._onCancel();
        return true;
      }

      const adjustedPath = path.slice();
      const firstCurve = message.firstEdges[0].curve;
      const lastCurve = message.lastEdges[0].curve;

      if (firstCurve instanceof Arc3d) {
        const arc2d = Arc2d.makeArcByThreePoints(
          firstCurve.getStartPt(),
          firstCurve.getMidPt(),
          firstCurve.getEndPt()
        );
        const closestPoint = Vector2.O();
        MathAlg.CalculateDistance.pointToCurve2d(adjustedPath[0], arc2d, closestPoint);
        adjustedPath[0] = closestPoint;
      }

      if (lastCurve instanceof Arc3d) {
        const arc2d = Arc2d.makeArcByThreePoints(
          lastCurve.getStartPt(),
          lastCurve.getMidPt(),
          lastCurve.getEndPt()
        );
        const closestPoint = Vector2.O();
        MathAlg.CalculateDistance.pointToCurve2d(
          adjustedPath[adjustedPath.length - 1],
          arc2d,
          closestPoint
        );
        adjustedPath[adjustedPath.length - 1] = closestPoint;
      }

      const lines: Line2d[] = [];
      for (let i = 1; i < adjustedPath.length; i++) {
        lines.push(new Line2d(new Vector2(adjustedPath[i - 1]), new Vector2(adjustedPath[i])));
      }

      const uniqueParent = this.floor.getUniqueParent();
      const request = HSApp.App.getApp().transManager.createRequest(
        HSFPConstants.RequestType.SplitSpace,
        [uniqueParent, lines, this.floor]
      );
      HSApp.App.getApp().transManager.commit(request);
      this._onComplete();

      return true;
    }

    return super.onReceive(event, message);
  }

  private _createGizmo(): void {
    const view2d = this.context.app.getActive2DView();
    const gizmoManager = view2d.gizmoManager;

    this.gizmo = new DivideSpace(view2d.context, view2d.displayLayers.temp, this);
    gizmoManager.addGizmo(this.gizmo);
    this.gizmo.setFloor(this.floor);
  }

  private _destroyGizmo(): void {
    const view2d = this.context.app.getActive2DView();
    view2d.gizmoManager.removeGizmo(this.gizmo!);
    
    if (this.gizmo) {
      this.gizmo.onCleanup();
      this.gizmo = undefined;
    }
  }

  private _showToast(): void {
    const storage = new HSApp.Util.Storage('hsw.plugin.roomproperty');
    
    if (storage.get('has_dividespace_orth_tip')) {
      return;
    }

    this._isToastShow = true;
    LiveHint.show(
      ResourceManager.getString('floor_dividespace_orth_tip'),
      0,
      () => {
        LiveHint.hide();
        storage.set('has_dividespace_orth_tip', true);
      },
      {
        append: ResourceManager.getString('floor_contextmenu_dividespace_lint_live_append'),
        canclose: true,
        onClose: () => {
          this._isToastShow = false;
        }
      }
    );
  }

  private _hideToast(): void {
    if (this._isToastShow) {
      LiveHint.hide();
      this._isToastShow = false;
    }
  }

  canSuspend(): boolean {
    return false;
  }

  isInteractive(): boolean {
    return true;
  }

  getDescription(): string {
    return '划分区域';
  }
}