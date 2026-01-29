/**
 * Constraint 基类单元测试
 * 测试约束系统的核心功能
 */

import { Constraint } from '../Constraint';
import { ConstraintType, Entity } from '../types';

// 创建具体的测试约束类
class TestConstraint extends Constraint {
  private errorValue: number = 0;

  constructor(
    id: string,
    type: ConstraintType,
    entities: Entity[] = [],
    parameters: any = {}
  ) {
    super(id, type, entities, parameters);
  }

  solve(): boolean {
    // 简单的测试实现：返回是否有实体
    return this.entities.length > 0;
  }

  verify(): boolean {
    // 验证误差是否在容差范围内
    return Math.abs(this.errorValue) < 0.001;
  }

  getError(): number {
    return this.errorValue;
  }

  setError(value: number): void {
    this.errorValue = value;
  }

  clone(): Constraint {
    return new TestConstraint(
      this.id,
      this.type,
      [...this.entities],
      { ...this.parameters }
    );
  }
}

// 注册测试约束类
Constraint.registerClass('HSCore.Constraint.TestConstraint', TestConstraint);

describe('Constraint', () => {
  describe('构造函数和基本属性', () => {
    it('应该正确创建约束实例', () => {
      const constraint = new TestConstraint('test-1', ConstraintType.POSITION);
      
      expect(constraint.id).toBe('test-1');
      expect(constraint.type).toBe(ConstraintType.POSITION);
      expect(constraint.entities).toEqual([]);
      expect(constraint.parameters).toEqual({});
      expect(constraint.enabled).toBe(true);
      expect(constraint.priority).toBe(50);
    });

    it('应该自动生成ID如果未提供', () => {
      const constraint = new TestConstraint('', ConstraintType.POSITION);
      
      expect(constraint.id).toBeTruthy();
      expect(constraint.id).toMatch(/^constraint_/);
    });

    it('应该正确设置实体和参数', () => {
      const entities: Entity[] = [
        { id: 'entity-1', type: 'point' },
        { id: 'entity-2', type: 'line' }
      ];
      const parameters = { distance: 100, angle: 45 };
      
      const constraint = new TestConstraint('test-2', ConstraintType.DIMENSION, entities, parameters);
      
      expect(constraint.entities).toEqual(entities);
      expect(constraint.parameters).toEqual(parameters);
    });
  });

  describe('getClassName', () => {
    it('应该返回正确的类名', () => {
      const constraint = new TestConstraint('test-3', ConstraintType.POSITION);
      const className = constraint.getClassName();
      
      expect(className).toBe('TestConstraint');
    });
  });

  describe('tag', () => {
    it('应该返回正确的标签格式', () => {
      const constraint = new TestConstraint('test-id-123', ConstraintType.POSITION);
      
      expect(constraint.tag).toBe('TestConstraint-test-id-123');
    });
  });

  describe('solve和verify', () => {
    it('solve应该在有实体时返回true', () => {
      const entities: Entity[] = [{ id: 'e1', type: 'point' }];
      const constraint = new TestConstraint('test-4', ConstraintType.POSITION, entities);
      
      expect(constraint.solve()).toBe(true);
    });

    it('solve应该在无实体时返回false', () => {
      const constraint = new TestConstraint('test-5', ConstraintType.POSITION);
      
      expect(constraint.solve()).toBe(false);
    });

    it('verify应该在误差范围内返回true', () => {
      const constraint = new TestConstraint('test-6', ConstraintType.POSITION);
      constraint.setError(0.0001);
      
      expect(constraint.verify()).toBe(true);
    });

    it('verify应该在误差超出范围时返回false', () => {
      const constraint = new TestConstraint('test-7', ConstraintType.POSITION);
      constraint.setError(0.1);
      
      expect(constraint.verify()).toBe(false);
    });
  });

  describe('getError', () => {
    it('应该返回正确的误差值', () => {
      const constraint = new TestConstraint('test-8', ConstraintType.POSITION);
      constraint.setError(0.05);
      
      expect(constraint.getError()).toBe(0.05);
    });
  });

  describe('clone', () => {
    it('应该创建约束的深拷贝', () => {
      const entities: Entity[] = [{ id: 'e1', type: 'point' }];
      const parameters = { distance: 100 };
      const original = new TestConstraint('test-9', ConstraintType.DIMENSION, entities, parameters);
      
      const cloned = original.clone();
      
      expect(cloned.id).toBe(original.id);
      expect(cloned.type).toBe(original.type);
      expect(cloned.entities).toEqual(original.entities);
      expect(cloned.entities).not.toBe(original.entities); // 不是同一个数组
      expect(cloned.parameters).toEqual(original.parameters);
      expect(cloned.parameters).not.toBe(original.parameters); // 不是同一个对象
    });
  });

  describe('序列化', () => {
    it('toJSON应该正确序列化约束', () => {
      const entities: Entity[] = [
        { id: 'e1', type: 'point' },
        { id: 'e2', type: 'line' }
      ];
      const parameters = { distance: 100, tolerance: 0.01 };
      const constraint = new TestConstraint('test-10', ConstraintType.DIMENSION, entities, parameters);
      constraint.setPriority(75);
      
      const json = constraint.toJSON();
      
      expect(json.className).toBe('TestConstraint');
      expect(json.id).toBe('test-10');
      expect(json.type).toBe(ConstraintType.DIMENSION);
      expect(json.entityIds).toEqual(['e1', 'e2']);
      expect(json.parameters).toEqual(parameters);
      expect(json.enabled).toBe(true);
      expect(json.priority).toBe(75);
    });

    it('fromJSON应该正确反序列化约束', () => {
      const entityMap = new Map<string, Entity>([
        ['e1', { id: 'e1', type: 'point' }],
        ['e2', { id: 'e2', type: 'line' }]
      ]);
      
      const json = {
        className: 'HSCore.Constraint.TestConstraint',
        id: 'test-11',
        type: ConstraintType.DIMENSION,
        entityIds: ['e1', 'e2'],
        parameters: { distance: 100 },
        enabled: false,
        priority: 80
      };
      
      const constraint = Constraint.fromJSON(json, entityMap);
      
      expect(constraint).not.toBeNull();
      expect(constraint!.id).toBe('test-11');
      expect(constraint!.type).toBe(ConstraintType.DIMENSION);
      expect(constraint!.entities.length).toBe(2);
      expect(constraint!.parameters.distance).toBe(100);
      expect(constraint!.enabled).toBe(false);
      expect(constraint!.priority).toBe(80);
    });

    it('fromJSON应该在未知类名时返回null', () => {
      const entityMap = new Map<string, Entity>();
      const json = {
        className: 'UnknownConstraintClass',
        id: 'test-12',
        type: ConstraintType.POSITION,
        entityIds: [],
        parameters: {},
        enabled: true,
        priority: 50
      };
      
      const constraint = Constraint.fromJSON(json, entityMap);
      
      expect(constraint).toBeNull();
    });
  });

  describe('类注册系统', () => {
    it('registerClass应该注册约束类', () => {
      class CustomConstraint extends Constraint {
        solve(): boolean { return true; }
        verify(): boolean { return true; }
        getError(): number { return 0; }
        clone(): Constraint { return this; }
      }
      
      Constraint.registerClass('HSCore.Constraint.CustomConstraint', CustomConstraint);
      
      const registeredClass = Constraint.getClass('HSCore.Constraint.CustomConstraint');
      expect(registeredClass).toBe(CustomConstraint);
    });

    it('getRegisteredClasses应该返回所有已注册的类', () => {
      const classes = Constraint.getRegisteredClasses();
      
      expect(classes).toContain('HSCore.Constraint');
      expect(classes).toContain('HSCore.Constraint.TestConstraint');
      expect(Array.isArray(classes)).toBe(true);
    });
  });

  describe('isValid', () => {
    it('应该在配置有效时返回true', () => {
      const entities: Entity[] = [{ id: 'e1', type: 'point' }];
      const constraint = new TestConstraint('test-13', ConstraintType.POSITION, entities);
      
      expect(constraint.isValid()).toBe(true);
    });

    it('应该在无实体时返回false', () => {
      const constraint = new TestConstraint('test-14', ConstraintType.POSITION);
      
      expect(constraint.isValid()).toBe(false);
    });
  });

  describe('enable和disable', () => {
    it('enable应该启用约束', () => {
      const constraint = new TestConstraint('test-15', ConstraintType.POSITION);
      constraint.disable();
      expect(constraint.enabled).toBe(false);
      
      constraint.enable();
      expect(constraint.enabled).toBe(true);
    });

    it('disable应该禁用约束', () => {
      const constraint = new TestConstraint('test-16', ConstraintType.POSITION);
      expect(constraint.enabled).toBe(true);
      
      constraint.disable();
      expect(constraint.enabled).toBe(false);
    });
  });

  describe('setPriority', () => {
    it('应该正确设置优先级', () => {
      const constraint = new TestConstraint('test-17', ConstraintType.POSITION);
      
      constraint.setPriority(75);
      expect(constraint.priority).toBe(75);
    });

    it('应该将优先级限制在0-100范围内', () => {
      const constraint = new TestConstraint('test-18', ConstraintType.POSITION);
      
      constraint.setPriority(-10);
      expect(constraint.priority).toBe(0);
      
      constraint.setPriority(150);
      expect(constraint.priority).toBe(100);
    });
  });

  describe('destroy', () => {
    it('应该清理约束资源', () => {
      const entities: Entity[] = [{ id: 'e1', type: 'point' }];
      const parameters = { distance: 100 };
      const constraint = new TestConstraint('test-19', ConstraintType.POSITION, entities, parameters);
      
      constraint.destroy();
      
      expect(constraint.entities).toEqual([]);
      expect(constraint.parameters).toEqual({});
    });
  });
});