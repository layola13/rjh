interface Command {
  type: string;
  output: {
    content?: unknown;
  };
}

interface Canvas {
  context: unknown;
  displayLayers: {
    temp: unknown;
  };
}

interface App {
  getActive2DView(): Canvas | null;
}

class MoveRoomAttachedGizmo {
  constructor(context: unknown, layer: unknown, command: Command) {}
}

abstract class GizmoFactory {
  protected _canvas: Canvas;
  protected _context: unknown;

  constructor(canvas: Canvas) {
    this._canvas = canvas;
  }

  abstract createCommandGizmo(command: Command): unknown[];
}

class CustomizedModelingGizmoFactory extends GizmoFactory {
  constructor(canvas: Canvas, context: unknown) {
    super(canvas);
    this._context = context;
  }

  createCommandGizmo(command: Command): unknown[] {
    const app: App = (globalThis as any).HSApp?.App?.getApp();
    
    if (!app || this._canvas !== app.getActive2DView()) {
      return [];
    }

    const canvas = this._canvas;
    const context = canvas.context;
    const tempLayer = canvas.displayLayers.temp;

    let gizmo: MoveRoomAttachedGizmo | undefined;

    const isMoveOrPlaceCommand =
      command.type === (globalThis as any).HSFPConstants?.CommandType?.MoveContent ||
      command.type === (globalThis as any).HSFPConstants?.CommandType?.PlaceProduct;

    if (isMoveOrPlaceCommand && (command.output.content || command.output)) {
      gizmo = new MoveRoomAttachedGizmo(context, tempLayer, command);
    }

    return gizmo ? [gizmo] : [];
  }
}

export { CustomizedModelingGizmoFactory as GizmoFactory };