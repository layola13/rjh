import { DrawRectangleGizmo } from './DrawRectangleGizmo';
import { CmdDrawExRectangle } from './CmdDrawExRectangle';

interface GizmoCreationParams {
  context: unknown;
  displayLayers: {
    temp: unknown;
  };
}

interface Sketch2dBuilder {
  clear(): void;
  updateSketch2d(sketch: unknown): void;
  getSketch(): unknown;
}

interface TransactionManager {
  createRequest(requestType: string, params: unknown[]): unknown;
}

interface Context {
  transManager: TransactionManager;
}

export class CmdDrawRectangle extends CmdDrawExRectangle {
  protected sketch2dBuilder!: Sketch2dBuilder;
  protected context!: Context;

  /**
   * Creates a 2D gizmo for rectangle drawing
   * @param params - Parameters containing context and display layers
   * @returns A new DrawRectangleGizmo instance
   */
  protected _create2DGizmo(params: GizmoCreationParams): DrawRectangleGizmo {
    return new DrawRectangleGizmo(params.context, params.displayLayers.temp, this);
  }

  /**
   * Creates a request for drawing a rectangle roof
   * @param data - Additional data for the request
   * @returns The created request
   */
  protected _createRequest(data: unknown): unknown {
    this.sketch2dBuilder.clear();
    this.sketch2dBuilder.updateSketch2d(this.sketch2dBuilder.getSketch());
    
    return this.context.transManager.createRequest(
      HSFPConstants.RequestType.RoofsDrawing.DrawRectangle,
      [this.sketch2dBuilder, data]
    );
  }

  /**
   * Gets the description of this command
   * @returns Command description in Chinese
   */
  public getDescription(): string {
    return "画矩形屋顶";
  }

  /**
   * Gets the category of this command
   * @returns The log group type for roofs drawing
   */
  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.RoofsDrawing;
  }
}