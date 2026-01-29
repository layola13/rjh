import { HSApp } from './HSApp';
import { DrawLine } from './DrawLine';
import { Vector2, Loop } from './Vector';

interface Sketch2dBuilder {
  clear(): void;
  updateSketch2d(sketch: unknown): void;
  getSketch(): unknown;
}

interface TransactionManager {
  createRequest(requestType: string, args: unknown[]): unknown;
}

interface Context {
  transManager: TransactionManager;
}

interface DisplayLayers {
  temp: unknown;
}

interface GizmoOptions {
  context: Context;
  displayLayers: DisplayLayers;
}

interface Gizmo {
  onESC(event: KeyboardEvent): void;
}

interface KeyboardEventData {
  keyCode: number;
}

export class CmdDrawPolygons extends HSApp.ExtraordinarySketch2d.Cmd.CmdDrawExLines {
  private sketch2dBuilder: Sketch2dBuilder;
  protected gizmo?: Gizmo;

  constructor(sketch2dBuilder: Sketch2dBuilder) {
    super(sketch2dBuilder);
    this.sketch2dBuilder = sketch2dBuilder;
  }

  protected _create2DGizmo(options: GizmoOptions): DrawLine {
    return new DrawLine(options.context, options.displayLayers.temp, this, false);
  }

  onReceive(eventType: string, eventData: KeyboardEventData): boolean {
    if (eventType === 'keydown' && eventData.keyCode === HSApp.Util.Keyboard.KeyCodes.ESC) {
      this.gizmo?.onESC(eventData as unknown as KeyboardEvent);
      return true;
    }
    return super.onReceive(eventType, eventData);
  }

  protected _createRequest(polygons: Vector2[][]): unknown {
    this.sketch2dBuilder.clear();
    this.sketch2dBuilder.updateSketch2d(this.sketch2dBuilder.getSketch());

    const transManager = this.context.transManager;
    const loops: Loop[] = [];

    polygons.forEach((polygon) => {
      if (polygon.length < 3) {
        return;
      }
      const firstPoint = new Vector2(polygon[0]);
      const lastPoint = polygon[polygon.length - 1];
      if (firstPoint.equals(lastPoint)) {
        loops.push(new Loop(polygon));
      }
    });

    return transManager.createRequest(
      HSFPConstants.RequestType.RoofsDrawing.DrawPolygon,
      [this.sketch2dBuilder, loops]
    );
  }

  showToast(polygons: Vector2[][]): void {
    const loops: Loop[] = [];

    polygons.forEach((polygon) => {
      if (polygon.length < 3) {
        return;
      }
      const firstPoint = new Vector2(polygon[0]);
      const lastPoint = polygon[polygon.length - 1];
      if (firstPoint.equals(lastPoint)) {
        loops.push(new Loop(polygon));
      }
    });

    const hasInvalidLoop = loops.some((loop) => !loop.isValid() && loop.isClosed());
    const hasUnclosedLoop = loops.length !== polygons.length || !loops.every((loop) => loop.isClosed());

    if (hasInvalidLoop || hasUnclosedLoop) {
      const message = hasInvalidLoop
        ? ResourceManager.getString('plugin_roofdrawing_intersect_notvalid')
        : ResourceManager.getString('plugin_slabedit_drawexlines_end');

      LiveHint.show(message, 5000, undefined, {
        status: LiveHint.statusEnum.canops
      });
    }
  }

  getDescription(): string {
    return '画直线屋顶';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.RoofsDrawing;
  }
}