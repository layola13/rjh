import { Kfc4Frametify } from './Kfc4Frametify';

/**
 * Represents a polygon with position information
 */
interface PolygonWithId {
  polyId: {
    pos: number;
  };
}

/**
 * Hollow2Frametify class
 * 
 * A specialized frametify implementation that generates three inner polygons
 * with specific positioning. Extends the base Kfc4Frametify functionality.
 * 
 * @extends Kfc4Frametify
 */
export class Hollow2Frametify extends Kfc4Frametify {
  /**
   * Internal cache of generated inner polygons
   * @private
   */
  private _innerPolygons?: PolygonWithId[];

  /**
   * Generates and returns three inner polygons with configured positions.
   * 
   * - First polygon: generated via inner0Polygon (default position)
   * - Second polygon: generated via inner1Polygon (position set to 0)
   * - Third polygon: generated via inner2Polygon (position set to 1)
   * 
   * @param input - The input parameter for polygon generation
   * @returns An array containing three configured polygons
   */
  innerPolygons(input: unknown): PolygonWithId[] {
    const polygon0 = this.inner0Polygon(input);
    const polygon1 = this.inner1Polygon(input);
    polygon1.polyId.pos = 0;
    
    const polygon2 = this.inner2Polygon(input);
    polygon2.polyId.pos = 1;
    
    this._innerPolygons = [polygon0, polygon1, polygon2];
    
    return [polygon0, polygon1, polygon2];
  }

  /**
   * Generates the first inner polygon
   * @protected
   */
  protected inner0Polygon(input: unknown): PolygonWithId {
    throw new Error('Method must be implemented by subclass or parent class');
  }

  /**
   * Generates the second inner polygon
   * @protected
   */
  protected inner1Polygon(input: unknown): PolygonWithId {
    throw new Error('Method must be implemented by subclass or parent class');
  }

  /**
   * Generates the third inner polygon
   * @protected
   */
  protected inner2Polygon(input: unknown): PolygonWithId {
    throw new Error('Method must be implemented by subclass or parent class');
  }
}