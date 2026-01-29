import { HSCore } from './HSCore';
import { DiffCWRoute } from './DiffCWRoute';

export class DiffCW extends HSCore.Model.Entity {
  get diffRoutes(): DiffCWRoute[] {
    const children = Object.values(this._children);
    const routes: DiffCWRoute[] = [];

    if (children.length === 0) {
      return routes;
    }

    children.forEach((child) => {
      if (child instanceof DiffCWRoute) {
        routes.push(child);
      }
    });

    return routes;
  }

  addDiffTubes(tubes: DiffCWRoute[]): void {
    const tubesToAdd: DiffCWRoute[] = [];
    const existingRoutes = this.diffRoutes;

    tubes.forEach((tube) => {
      const exists = existingRoutes.find((route) => route === tube);
      if (!exists) {
        tubesToAdd.push(tube);
      }
    });

    this.addChild(tubesToAdd);
  }
}