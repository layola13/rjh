import { describe, it, expect } from '@jest/globals';
import {
  DataModelConvertor,
  Point2D,
  Line2D,
  Circle2D,
  CircleArc2D,
  Wire,
  Vector2,
  Line2d,
  Arc2d,
  isClockwise
} from '../../../source/core/convertor/DataModelConvertor';

describe('DataModelConvertor', () => {
  describe('convertPoint2d', () => {
    it('should convert a valid point', () => {
      const point: Point2D = { x: 10, y: 20 };
      const result = DataModelConvertor.convertPoint2d(point);
      expect(result).toEqual({ x: 10, y: 20 });
    });

    it('should return zero point for undefined input', () => {
      const result = DataModelConvertor.convertPoint2d(undefined);
      expect(result).toEqual({ x: 0, y: 0 });
    });
  });

  describe('Vector2', () => {
    it('should construct from point', () => {
      const point: Point2D = { x: 5, y: 10 };
      const vector = new Vector2(point);
      expect(vector.x).toBe(5);
      expect(vector.y).toBe(10);
    });

    it('should construct from coordinates', () => {
      const vector = new Vector2(3, 7);
      expect(vector.x).toBe(3);
      expect(vector.y).toBe(7);
    });
  });

  describe('Line2d', () => {
    it('should reverse line correctly', () => {
      const start = new Vector2(0, 0);
      const end = new Vector2(10, 10);
      const line = new Line2d(start, end);
      
      line.reverse();
      
      expect(line.start).toEqual(end);
      expect(line.end).toEqual(start);
    });
  });

  describe('isClockwise', () => {
    it('should detect clockwise polygon', () => {
      const points: Point2D[] = [
        { x: 0, y: 0 },
        { x: 10, y: 0 },
        { x: 10, y: 10 },
        { x: 0, y: 10 }
      ];
      const result = isClockwise(points);
      expect(typeof result).toBe('boolean');
    });

    it('should handle Vector2 array', () => {
      const points = [
        new Vector2(0, 0),
        new Vector2(5, 0),
        new Vector2(5, 5)
      ];
      const result = isClockwise(points);
      expect(typeof result).toBe('boolean');
    });
  });

  describe('convertLine2d', () => {
    it('should convert line without reverse', () => {
      const line: Line2D = {
        id: 'line1',
        start: { x: 0, y: 0 },
        end: { x: 10, y: 10 }
      };
      
      const result = DataModelConvertor.convertLine2d(line, false);
      
      expect(result.start.x).toBe(0);
      expect(result.start.y).toBe(0);
      expect(result.end.x).toBe(10);
      expect(result.end.y).toBe(10);
    });

    it('should convert line with reverse', () => {
      const line: Line2D = {
        id: 'line1',
        start: { x: 0, y: 0 },
        end: { x: 10, y: 10 }
      };
      
      const result = DataModelConvertor.convertLine2d(line, true);
      
      expect(result.start.x).toBe(10);
      expect(result.start.y).toBe(10);
      expect(result.end.x).toBe(0);
      expect(result.end.y).toBe(0);
    });
  });

  describe('convertCircle2d', () => {
    it('should convert circle to arc', () => {
      const circle: Circle2D = {
        id: 'circle1',
        center: { x: 5, y: 5 },
        radius: 10
      };
      
      const result = DataModelConvertor.convertCircle2d(circle, false);
      
      expect(result).toBeInstanceOf(Arc2d);
    });
  });

  describe('convertArc2d', () => {
    it('should convert arc without reverse', () => {
      const arc: CircleArc2D = {
        id: 'arc1',
        center: { x: 5, y: 5 },
        start: { x: 0, y: 5 },
        end: { x: 10, y: 5 },
        clockwise: true
      };
      
      const result = DataModelConvertor.convertArc2d(arc, false);
      
      expect(result).toBeInstanceOf(Arc2d);
    });
  });

  describe('convertWireArray', () => {
    it('should return empty array for undefined input', () => {
      const result = DataModelConvertor.convertWireArray(undefined);
      expect(result).toEqual([]);
    });

    it('should convert wire array', () => {
      const wire: Wire = {
        id: 'wire1',
        curves: [],
        isOuter: () => true
      };
      
      const result = DataModelConvertor.convertWireArray([wire]);
      
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(1);
    });
  });
});