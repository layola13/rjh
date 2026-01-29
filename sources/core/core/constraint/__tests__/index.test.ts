/**
 * Unit tests for constraint module exports
 */
 * @module constraint/__tests__/index.test
 */

import * as ConstraintModule from '../index';

describe('Constraint Module Exports', () => {
  describe('Core Classes and Types', () => {
    it('should export Constraint base class', () => {
      expect(ConstraintModule.Constraint).toBeDefined();
      expect(typeof ConstraintModule.Constraint).toBe('function');
    });

    it('should export ConstraintFactory', () => {
      expect(ConstraintModule.ConstraintFactory).toBeDefined();
      expect(typeof ConstraintModule.ConstraintFactory).toBe('function');
    });

    it('should export getConstraintFactory function', () => {
      expect(ConstraintModule.getConstraintFactory).toBeDefined();
      expect(typeof ConstraintModule.getConstraintFactory).toBe('function');
      
      const factory = ConstraintModule.getConstraintFactory();
      expect(factory).toBeDefined();
      expect(factory).toBeInstanceOf(ConstraintModule.ConstraintFactory);
    });

    it('should export ConstraintSolver', () => {
      expect(ConstraintModule.ConstraintSolver).toBeDefined();
      expect(typeof ConstraintModule.ConstraintSolver).toBe('function');
      
      const solver = new ConstraintModule.ConstraintSolver();
      expect(solver).toBeDefined();
      expect(solver).toBeInstanceOf(ConstraintModule.ConstraintSolver);
    });

    it('should export ConstraintType enum', () => {
      expect(ConstraintModule.ConstraintType).toBeDefined();
      expect(ConstraintModule.ConstraintType.POSITION).toBeDefined();
      expect(ConstraintModule.ConstraintType.DIMENSION).toBeDefined();
      expect(ConstraintModule.ConstraintType.PARALLEL).toBeDefined();
      expect(ConstraintModule.ConstraintType.PERPENDICULAR).toBeDefined();
    });
  });

  describe('Parametric Constraints', () => {
    it('should export PositionConstraint', () => {
      expect(ConstraintModule.PositionConstraint).toBeDefined();
      expect(typeof ConstraintModule.PositionConstraint).toBe('function');
    });

    it('should export EquationConstraint', () => {
      expect(ConstraintModule.EquationConstraint).toBeDefined();
      expect(typeof ConstraintModule.EquationConstraint).toBe('function');
    });

    it('should export EquationType enum', () => {
      expect(ConstraintModule.EquationType).toBeDefined();
      expect(ConstraintModule.EquationType.LINEAR).toBeDefined();
      expect(ConstraintModule.EquationType.QUADRATIC).toBeDefined();
    });

    it('should export DimensionConstraint', () => {
      expect(ConstraintModule.DimensionConstraint).toBeDefined();
      expect(typeof ConstraintModule.DimensionConstraint).toBe('function');
    });

    it('should export DimensionType enum', () => {
      expect(ConstraintModule.DimensionType).toBeDefined();
      expect(ConstraintModule.DimensionType.DISTANCE).toBeDefined();
      expect(ConstraintModule.DimensionType.ANGLE).toBeDefined();
      expect(ConstraintModule.DimensionType.RADIUS).toBeDefined();
    });
  });

  describe('Geometric Constraints', () => {
    it('should export CollineConstraint', () => {
      expect(ConstraintModule.CollineConstraint).toBeDefined();
      expect(typeof ConstraintModule.CollineConstraint).toBe('function');
    });

    it('should export OverlapConstraint', () => {
      expect(ConstraintModule.OverlapConstraint).toBeDefined();
      expect(typeof ConstraintModule.OverlapConstraint).toBe('function');
    });

    it('should export OverlapType enum', () => {
      expect(ConstraintModule.OverlapType).toBeDefined();
      expect(ConstraintModule.OverlapType.POINT_POINT).toBeDefined();
      expect(ConstraintModule.OverlapType.LINE_LINE).toBeDefined();
      expect(ConstraintModule.OverlapType.POINT_LINE_END).toBeDefined();
    });

    it('should export TangentConstraint', () => {
      expect(ConstraintModule.TangentConstraint).toBeDefined();
      expect(typeof ConstraintModule.TangentConstraint).toBe('function');
    });

    it('should export TangentType enum', () => {
      expect(ConstraintModule.TangentType).toBeDefined();
      expect(ConstraintModule.TangentType.LINE_CIRCLE).toBeDefined();
      expect(ConstraintModule.TangentType.CIRCLE_LINE).toBeDefined();
      expect(ConstraintModule.TangentType.CIRCLE_CIRCLE_EXTERNAL).toBeDefined();
      expect(ConstraintModule.TangentType.CIRCLE_CIRCLE_INTERNAL).toBeDefined();
    });

    it('should export ParallelConstraint', () => {
      expect(ConstraintModule.ParallelConstraint).toBeDefined();
      expect(typeof ConstraintModule.ParallelConstraint).toBe('function');
    });

    it('should export PerpendicularConstraint', () => {
      expect(ConstraintModule.PerpendicularConstraint).toBeDefined();
      expect(typeof ConstraintModule.PerpendicularConstraint).toBe('function');
    });
  });

  describe('Initialization Function', () => {
    it('should export initializeConstraintSystem function', () => {
      expect(ConstraintModule.initializeConstraintSystem).toBeDefined();
      expect(typeof ConstraintModule.initializeConstraintSystem).toBe('function');
    });

    it('should auto-initialize constraint system on module import', () => {
      const factory = ConstraintModule.getConstraintFactory();
      
      // Verify that constraint types are registered
      expect(factory.isRegistered(ConstraintModule.ConstraintType.POSITION)).toBe(true);
      expect(factory.isRegistered(ConstraintModule.ConstraintType.DIMENSION)).toBe(true);
      expect(factory.isRegistered(ConstraintModule.ConstraintType.PARALLEL)).toBe(true);
      expect(factory.isRegistered(ConstraintModule.ConstraintType.PERPENDICULAR)).toBe(true);
    });
  });

  describe('API Completeness', () => {
    it('should have all expected constraint type exports', () => {
      const expectedConstraints = [
        'PositionConstraint',
        'EquationConstraint',
        'DimensionConstraint',
        'CollineConstraint',
        'OverlapConstraint',
        'TangentConstraint',
        'ParallelConstraint',
        'PerpendicularConstraint'
      ];

      expectedConstraints.forEach(constraintName => {
        expect(ConstraintModule).toHaveProperty(constraintName);
        expect((ConstraintModule as any)[constraintName]).toBeDefined();
      });
    });

    it('should have all expected enum exports', () => {
      const expectedEnums = [
        'ConstraintType',
        'EquationType',
        'DimensionType',
        'OverlapType',
        'TangentType'
      ];

      expectedEnums.forEach(enumName => {
        expect(ConstraintModule).toHaveProperty(enumName);
        expect((ConstraintModule as any)[enumName]).toBeDefined();
      });
    });

    it('should have all expected utility exports', () => {
      const expectedUtilities = [
        'Constraint',
        'ConstraintFactory',
        'getConstraintFactory',
        'ConstraintSolver',
        'initializeConstraintSystem'
      ];

      expectedUtilities.forEach(utilityName => {
        expect(ConstraintModule).toHaveProperty(utilityName);
        expect((ConstraintModule as any)[utilityName]).toBeDefined();
      });
    });
  });

  describe('Integration Tests', () => {
    it('should create constraint using factory', () => {
      const factory = ConstraintModule.getConstraintFactory();
      
      // Mock geometry object
      const mockPoint = {
        id: 'p1',
        type: 'Point2D',
        x: 0,
        y: 0
      };

      const constraint = factory.create(
        ConstraintModule.ConstraintType.POSITION,
        {
          type: ConstraintModule.ConstraintType.POSITION,
          id: 'c1',
          entities: [mockPoint],
          parameters: { x: 10, y: 20 }
        }
      );

      expect(constraint).toBeDefined();
      if (constraint) {
        expect(constraint).toBeInstanceOf(ConstraintModule.PositionConstraint);
        expect(constraint.id).toBe('c1');
      }
    });

    it('should solve constraints using solver', () => {
      const solver = new ConstraintModule.ConstraintSolver();
      
      const mockPoint = {
        id: 'p1',
        type: 'Point2D',
        x: 0,
        y: 0
      };

      const constraint = new ConstraintModule.PositionConstraint(
        'c1',
        ConstraintModule.ConstraintType.POSITION,
        [mockPoint],
        { x: 10, y: 20 }
      );

      solver.addConstraint(constraint);
      const result = solver.solve();

      expect(result.success).toBe(true);
      expect(mockPoint.x).toBeCloseTo(10);
      expect(mockPoint.y).toBeCloseTo(20);
    });

    it('should handle multiple constraint types together', () => {
      const solver = new ConstraintModule.ConstraintSolver();
      
      const point1 = { id: 'p1', type: 'Point2D', x: 0, y: 0 };
      const point2 = { id: 'p2', type: 'Point2D', x: 0, y: 0 };

      solver.addConstraint(
        new ConstraintModule.PositionConstraint(
          'c1',
          ConstraintModule.ConstraintType.POSITION,
          [point1],
          { x: 0, y: 0 }
        )
      );

      solver.addConstraint(
        new ConstraintModule.DimensionConstraint(
          'c2',
          ConstraintModule.ConstraintType.DIMENSION,
          [point1, point2],
          { dimensionType: ConstraintModule.DimensionType.DISTANCE, targetValue: 10 }
        )
      );

      const result = solver.solve();
      expect(result.success).toBe(true);
    });
  });

  describe('Factory Registration', () => {
    it('should allow manual re-initialization', () => {
      // Re-initialize should not throw
      expect(() => {
        ConstraintModule.initializeConstraintSystem();
      }).not.toThrow();
    });

    it('should maintain singleton factory instance', () => {
      const factory1 = ConstraintModule.getConstraintFactory();
      const factory2 = ConstraintModule.getConstraintFactory();
      
      expect(factory1).toBe(factory2);
    });
  });

  describe('Type Safety', () => {
    it('should validate constraint types', () => {
      const constraintTypes = Object.values(ConstraintModule.ConstraintType);
      
      expect(constraintTypes.length).toBeGreaterThan(0);
      expect(constraintTypes).toContain(ConstraintModule.ConstraintType.POSITION);
      expect(constraintTypes).toContain(ConstraintModule.ConstraintType.DIMENSION);
    });

    it('should validate dimension types', () => {
      const dimensionTypes = Object.values(ConstraintModule.DimensionType);
      
      expect(dimensionTypes.length).toBeGreaterThan(0);
      expect(dimensionTypes).toContain(ConstraintModule.DimensionType.DISTANCE);
      expect(dimensionTypes).toContain(ConstraintModule.DimensionType.ANGLE);
      expect(dimensionTypes).toContain(ConstraintModule.DimensionType.RADIUS);
    });
  });
});