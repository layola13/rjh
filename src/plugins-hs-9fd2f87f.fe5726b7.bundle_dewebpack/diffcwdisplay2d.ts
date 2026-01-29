import { Display2D } from './Base/Display2D';
import { DiffCWRouteDisplay2D } from './DiffCWRouteDisplay2D';

interface DiffRoute {
  id: string;
  [key: string]: unknown;
}

interface DiffCWEntity {
  diffRoutes: DiffRoute[];
}

interface Canvas {
  getDisplayObjectByID(id: string): DiffCWRouteDisplay2D | null;
}

interface Context {
  [key: string]: unknown;
}

interface Group {
  [key: string]: unknown;
}

export class DiffCWDisplay2D extends Display2D {
  declare entity: DiffCWEntity;
  declare canvas: Canvas;
  declare context: Context;
  declare group: Group;

  /**
   * Initialize the DiffCW display and add diff routes
   */
  init(): void {
    const entity = this.entity;
    this._addDiffCWRoutes(entity.diffRoutes);
  }

  /**
   * Add differential route displays to the canvas
   * @param routes - Array of diff routes to add
   */
  private _addDiffCWRoutes(routes: DiffRoute[]): void {
    routes.forEach((route) => {
      let displayObject = this.canvas.getDisplayObjectByID(route.id);
      
      if (!displayObject) {
        displayObject = new DiffCWRouteDisplay2D(
          this.context,
          this,
          this.group,
          route
        );
        displayObject.init();
      }
      
      if (displayObject) {
        this.addChild(displayObject);
      }
    });
  }

  /**
   * Update visibility status for all diff routes
   * @param status - The visibility status to apply
   */
  updateVisibleStatus(status: unknown): void {
    this.entity.diffRoutes.forEach((route) => {
      const displayObject = this.canvas.getDisplayObjectByID(route.id);
      
      if (displayObject) {
        displayObject.updateVisibleStatus(status);
      }
    });
  }
}