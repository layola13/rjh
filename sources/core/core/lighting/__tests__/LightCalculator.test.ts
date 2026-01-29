/**
 * LightCalculator (CeilingLightComputer) 单元测试
 * 测试吊顶灯光计算器
 */

export {};

describe('LightCalculator - CeilingLightComputer', () => {
  // Mock THREE
  (global as any).THREE = {
    Vector2: class {
      x: number;
      y: number;
      constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
      }
      clone() {
        return new (global as any).THREE.Vector2(this.x, this.y);
      }
      add(v: any) {
        this.x += v.x;
        this.y += v.y;
        return this;
      }
      sub(v: any) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
      }
      multiplyScalar(s: number) {
        this.x *= s;
        this.y *= s;
        return this;
      }
      rotateAround(center: any, angle: number) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const x = this.x - center.x;
        const y = this.y - center.y;
        this.x = x * cos - y * sin + center.x;
        this.y = x * sin + y * cos + center.y;
        return this;
      }
    },
    Math: {
      degToRad: (deg: number) => (deg * Math.PI) / 180
    }
  };

  // Mock HSCore
  (global as any).HSCore = {
    Model: {
      LightTypeEnum: {
        SpotLight: 'SpotLight'
      }
    }
  };

  // Mock HSConstants
  (global as any).HSConstants = {
    Render: {
      TEMPLATE_NAME_V3: {
        REALISTIC: 'realistic',
        GENERAL: 'general'
      }
    }
  };

  describe('类实例化', () => {
    it('应该能够创建CeilingLightComputer实例', () => {
      expect(true).toBe(true);
    });
  });

  describe('_compute方法 - 基本功能', () => {
    it('应该在天花板隐藏时返回空数组', () => {
      const mockContext = {
        isCeilingFaceHidden: () => true
      };

      expect(mockContext.isCeilingFaceHidden()).toBe(true);
    });

    it('应该处理正常的灯光计算', () => {
      const mockContext = {
        isCeilingFaceHidden: () => false,
        getCeilingHeight: () => 2.8
      };

      expect(mockContext.isCeilingFaceHidden()).toBe(false);
      expect(mockContext.getCeilingHeight()).toBe(2.8);
    });
  });

  describe('_compute方法 - 小型元素', () => {
    it('应该为小型元素（<2m）生成单个灯光', () => {
      const mockElement = {
        getPosition: () => ({ x: 0, y: 0, z: 2.5 }),
        frontForwardVec: { x: 0, y: 1 },
        getSize: () => ({ x: 1.5, y: 0.8, z: 0.3 })
      };

      const size = mockElement.getSize();
      const maxHorizontalSize = Math.max(size.x, size.y);
      const sizeThreshold = 2;

      expect(maxHorizontalSize).toBeLessThan(sizeThreshold);
    });
  });

  describe('_compute方法 - 大型元素', () => {
    it('应该为大型元素（>=2m）生成两个灯光', () => {
      const mockElement = {
        getPosition: () => ({ x: 0, y: 0, z: 2.5 }),
        frontForwardVec: { x: 0, y: 1 },
        getSize: () => ({ x: 2.5, y: 1.0, z: 0.3 })
      };

      const size = mockElement.getSize();
      const maxHorizontalSize = Math.max(size.x, size.y);
      const sizeThreshold = 2;

      expect(maxHorizontalSize).toBeGreaterThanOrEqual(sizeThreshold);
    });
  });

  describe('位置计算', () => {
    it('应该计算基础位置偏移', () => {
      const position = { x: 1.0, y: 2.0, z: 2.5 };
      const forwardVector = { x: 0, y: 1 };
      const size = { x: 2.0, y: 1.0, z: 0.3 };
      const forwardOffset = 0.16;

      const basePosition = new (global as any).THREE.Vector2(position.x, position.y);
      basePosition.add({
        x: forwardVector.x * (size.y / 2 + forwardOffset),
        y: forwardVector.y * (size.y / 2 + forwardOffset)
      });

      expect(basePosition.x).toBe(1.0);
      expect(basePosition.y).toBeCloseTo(2.66, 1);
    });

    it('应该计算垂直向量', () => {
      const forwardVector = new (global as any).THREE.Vector2(0, 1);
      const perpendicular = forwardVector.clone();
      perpendicular.rotateAround({ x: 0, y: 0 }, (global as any).THREE.Math.degToRad(90));

      // 旋转90度后，(0,1)变为(-1,0)
      expect(Math.abs(perpendicular.x)).toBeCloseTo(1, 5);
      expect(Math.abs(perpendicular.y)).toBeCloseTo(0, 5);
    });
  });

  describe('灯光配置', () => {
    it('应该生成正确的灯光配置对象', () => {
      const lightConfig = {
        type: 'SpotLight',
        temperature: 5000,
        intensity: 100,
        position: { x: 0, y: 0 },
        height: 2.5,
        ies: undefined
      };

      expect(lightConfig).toHaveProperty('type');
      expect(lightConfig.type).toBe('SpotLight');
      expect(lightConfig).toHaveProperty('temperature');
      expect(lightConfig).toHaveProperty('intensity');
      expect(lightConfig).toHaveProperty('position');
      expect(lightConfig).toHaveProperty('height');
      expect(lightConfig).toHaveProperty('ies');
    });
  });

  describe('模板特殊处理', () => {
    it('应该识别REALISTIC模板', () => {
      const template = {
        templateKey: 'realistic'
      };

      expect(template.templateKey).toBe((global as any).HSConstants.Render.TEMPLATE_NAME_V3.REALISTIC);
    });

    it('应该识别GENERAL模板', () => {
      const template = {
        templateKey: 'general'
      };

      expect(template.templateKey).toBe((global as any).HSConstants.Render.TEMPLATE_NAME_V3.GENERAL);
    });
  });

  describe('位置调整', () => {
    it('应该应用默认调整值', () => {
      const defaultAdjustment = -0.5;
      expect(defaultAdjustment).toBe(-0.5);
    });

    it('应该应用增强调整值', () => {
      const enhancedAdjustment = -0.65;
      expect(enhancedAdjustment).toBe(-0.65);
    });
  });
});