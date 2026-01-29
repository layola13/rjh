import { HSApp } from './path/to/HSApp';
import { DiffCWRouteDisplay3D } from './DiffCWRouteDisplay3D';

interface DiffRoute {
  id: string;
  [key: string]: unknown;
}

interface DiffCWEntity {
  diffRoutes: DiffRoute[];
  [key: string]: unknown;
}

interface Canvas {
  getDisplayObjectByID(id: string): DiffCWRouteDisplay3D | null;
}

interface Context {
  [key: string]: unknown;
}

interface Group {
  [key: string]: unknown;
}

/**
 * 3D differential CW display component
 * Manages and renders differential CW routes in 3D space
 */
export class DiffCWDisplay3D extends HSApp.View.T3d.Base.Display3D {
  declare entity: DiffCWEntity;
  declare canvas: Canvas;
  declare context: Context;
  declare group: Group;

  /**
   * Initialize the display and add all differential CW routes
   */
  init(): void {
    this._addDiffCWRoutes(this.entity.diffRoutes);
    super.init?.([]);
  }

  /**
   * Add differential CW routes to the display
   * @param routes - Array of differential routes to add
   */
  private _addDiffCWRoutes(routes: DiffRoute[]): void {
    routes.forEach((route) => {
      let displayObject = this.canvas.getDisplayObjectByID(route.id);
      
      if (!displayObject) {
        displayObject = new DiffCWRouteDisplay3D(this.context, this, this.group, route);
        displayObject.init();
      }
      
      if (displayObject) {
        this.addChild(displayObject);
      }
    });
  }

  /**
   * Update visibility status for all child routes
   * @param status - The visibility status to apply
   */
  updateVisibleStatus(status: unknown): void {
    this.entity.diffRoutes.forEach((route) => {
      const displayObject = this.canvas.getDisplayObjectByID(route.id);
      displayObject?.updateVisibleStatus(status);
    });
  }
}