import { Vector2, Loop } from './geometry';
import { CmdDrawExLines } from './CmdDrawExLines';
import { Sketch2dBuilder } from './Sketch2dBuilder';

/**
 * Command for drawing polygons in slab editing mode
 */
export class CmdDrawPolygons extends CmdDrawExLines {
  private sketch2dBuilder: Sketch2dBuilder;

  constructor(sketch2dBuilder: Sketch2dBuilder) {
    super(sketch2dBuilder);
    this.sketch2dBuilder = sketch2dBuilder;
  }

  /**
   * Creates a request for drawing polygons
   * @param polygonPoints - Array of polygon point arrays
   * @returns Transaction request
   */
  protected _createRequest(polygonPoints: Vector2[][]): unknown {
    const transManager = this.context.transManager;
    const validLoops: Loop[] = [];

    polygonPoints.forEach((points) => {
      if (points.length < 3) {
        return;
      }

      const firstPoint = new Vector2(points[0]);
      const lastPoint = points[points.length - 1];
      
      if (firstPoint.equals(lastPoint)) {
        validLoops.push(new Loop(points));
      }
    });

    return transManager.createRequest(
      HSFPConstants.RequestType.SlabEdit.DrawPolygon,
      [this.sketch2dBuilder, validLoops]
    );
  }

  /**
   * Shows toast message for invalid polygons
   * @param polygonPoints - Array of polygon point arrays
   */
  showToast(polygonPoints: Vector2[][]): void {
    const loops: Loop[] = [];

    polygonPoints.forEach((points) => {
      if (points.length < 3) {
        return;
      }

      const firstPoint = new Vector2(points[0]);
      const lastPoint = points[points.length - 1];
      
      if (firstPoint.equals(lastPoint)) {
        loops.push(new Loop(points));
      }
    });

    const hasInvalidLoop = loops.some((loop) => !loop.isValid() && loop.isClosed());
    const hasUnclosedLoop = 
      loops.length !== polygonPoints.length || 
      !loops.every((loop) => loop.isClosed());

    if (hasInvalidLoop || hasUnclosedLoop) {
      const message = hasInvalidLoop
        ? ResourceManager.getString("plugin_slabedit_drawexlines_notvalid")
        : ResourceManager.getString("plugin_slabedit_drawexlines_end");

      const TOAST_DURATION = 5000;

      LiveHint.show(message, TOAST_DURATION, undefined, {
        status: LiveHint.statusEnum.canops
      });
    }
  }

  /**
   * Gets the description of this command
   * @returns Command description
   */
  getDescription(): string {
    return "楼板编辑直线绘洞";
  }

  /**
   * Gets the category of this command
   * @returns Log group type
   */
  getCategory(): string {
    return HSFPConstants.LogGroupTypes.SlabEdit;
  }
}