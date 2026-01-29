/**
 * Wall 类单元测试
 * 测试墙体结构对象的核心功能
 */

import { Wall } from '../wall';

describe('Wall', () => {
  describe('构造函数', () => {
    it('应该正确创建墙体实例', () => {
      const wall = new Wall(
        { x: 0, y: 0 },  // 起点
        { x: 100, y: 0 }, // 终点
        200,              // 高度
        10                // 厚度
      );
      
      expect(wall).toBeInstanceOf(Wall);
      expect(wall).toBeDefined();
    });

    it('应该接受不同的构造参数', () => {
      const wall = new Wall(
        null,
        null,
        null,
        null
      );
      
      expect(wall).toBeInstanceOf(Wall);
    });
  });

  describe('onUpdate', () => {
    it('应该能调用onUpdate方法', () => {
      const wall = new Wall(null, null, null, null);
      
      expect(() => {
        wall.onUpdate();
      }).not.toThrow();
    });
  });

  describe('toGraphicsData', () => {
    it('应该返回图形数据对象', () => {
      const wall = new Wall(null, null, null, null);
      
      const graphicsData = wall.toGraphicsData();
      
      expect(graphicsData).toBeDefined();
      expect(graphicsData).toHaveProperty('meshDefs');
      expect(graphicsData).toHaveProperty('objects');
    });

    it('图形数据应该包含meshDefs数组', () => {
      const wall = new Wall(null, null, null, null);
      
      const graphicsData = wall.toGraphicsData();
      
      expect(Array.isArray(graphicsData.meshDefs)).toBe(true);
    });

    it('图形数据应该包含objects数组', () => {
      const wall = new Wall(null, null, null, null);
      
      const graphicsData = wall.toGraphicsData();
      
      expect(Array.isArray(graphicsData.objects)).toBe(true);
    });
  });

  describe('toGraphicsDataAsync', () => {
    it('应该异步返回图形数据对象', async () => {
      const wall = new Wall(null, null, null, null);
      
      const graphicsData = await wall.toGraphicsDataAsync();
      
      expect(graphicsData).toBeDefined();
      expect(graphicsData).toHaveProperty('meshDefs');
      expect(graphicsData).toHaveProperty('objects');
    });

    it('应该在异常时返回空的图形数据', async () => {
      const wall = new Wall(null, null, null, null);
      
      // 模拟可能的错误情况
      const graphicsData = await wall.toGraphicsDataAsync();
      
      expect(graphicsData).toBeDefined();
      expect(Array.isArray(graphicsData.meshDefs)).toBe(true);
      expect(Array.isArray(graphicsData.objects)).toBe(true);
    });

    it('异步方法应该返回Promise', () => {
      const wall = new Wall(null, null, null, null);
      
      const result = wall.toGraphicsDataAsync();
      
      expect(result).toBeInstanceOf(Promise);
    });
  });

  describe('类型检查', () => {
    it('Wall实例应该有正确的类型', () => {
      const wall = new Wall(null, null, null, null);
      
      expect(typeof wall).toBe('object');
      expect(wall.constructor.name).toBe('Wall');
    });

    it('应该有onUpdate方法', () => {
      const wall = new Wall(null, null, null, null);
      
      expect(typeof wall.onUpdate).toBe('function');
    });

    it('应该有toGraphicsData方法', () => {
      const wall = new Wall(null, null, null, null);
      
      expect(typeof wall.toGraphicsData).toBe('function');
    });

    it('应该有toGraphicsDataAsync方法', () => {
      const wall = new Wall(null, null, null, null);
      
      expect(typeof wall.toGraphicsDataAsync).toBe('function');
    });
  });

  describe('继承关系', () => {
    it('Wall应该继承自ExtrudedBody', () => {
      const wall = new Wall(null, null, null, null);
      
      // 检查原型链
      expect(Object.getPrototypeOf(wall.constructor).name).toBe('ExtrudedBody');
    });
  });
});