import { Wall } from './Wall';

export class PointUtil {
  static getParentWalls(point: { parents?: Record<string, unknown> } | null | undefined): Wall[] {
    const parentWalls: Wall[] = [];
    
    if (!point) {
      return parentWalls;
    }
    
    for (const key in point.parents) {
      const parent = point.parents[key];
      
      if (parent instanceof Wall && !parentWalls.includes(parent)) {
        parentWalls.push(parent);
      }
    }
    
    return parentWalls;
  }
}