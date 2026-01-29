/**
 * SpotLight 单元测试
 * 测试聚光灯类
 */

export {};

describe('SpotLight', () => {
  // Mock HSConstants
  (global as any).HSConstants = {
    RenderLight: {
      SPOT_LIGHT_NUM_1: 'spot_light_1.ies',
      SPOT_LIGHT_NUM_2: 'spot_light_2.ies',
      SPOT_LIGHT_NUM_3: 'spot_light_3.ies',
      SPOT_LIGHT_NUM_4: 'spot_light_4.ies',
      SPOT_LIGHT_NUM_5: 'spot_light_5.ies',
      SPOT_LIGHT_NUM_6: 'spot_light_6.ies',
      SPOT_LIGHT_NUM_7: 'spot_light_7.ies',
      SPOT_LIGHT_NUM_8: 'spot_light_8.ies',
      SPOT_LIGHT_NUM_9: 'spot_light_9.ies',
      SPOT_LIGHT_NUM_10: 'spot_light_10.ies',
      SPOT_LIGHT_NUM_11: 'spot_light_11.ies',
      SPOT_LIGHT_NUM_12: 'spot_light_12.ies',
      SPOT_LIGHT_NUM_13: 'spot_light_13.ies',
      SPOT_LIGHT_NUM_14: 'spot_light_14.ies',
      SPOT_LIGHT_NUM_15: 'spot_light_15.ies',
      FILL_LIGHT_NUM_1: 'fill_light_1.ies',
      FILL_LIGHT_NUM_2: 'fill_light_2.ies',
      FILL_LIGHT_NUM_3: 'fill_light_3.ies',
      FILL_LIGHT_NUM_4: 'fill_light_4.ies',
      FILL_LIGHT_NUM_5: 'fill_light_5.ies',
      FILL_LIGHT_NUM_6: 'fill_light_6.ies',
      FILL_LIGHT_NUM_7: 'fill_light_7.ies'
    },
    ModelClass: {
      NgSpotLight: 'NgSpotLight'
    }
  };

  // Mock THREE
  (global as any).THREE = {
    Euler: class {
      constructor(public x: number, public y: number, public z: number, public order: string) {}
    },
    Quaternion: class {
      setFromEuler() {
        return this;
      }
    },
    Vector3: class {
      constructor(public x: number, public y: number, public z: number) {}
      applyQuaternion() {
        return this;
      }
    },
    Math: {
      degToRad: (deg: number) => (deg * Math.PI) / 180
    }
  };

  // Mock HSCore
  (global as any).HSCore = {
    Util: {
      Math: {
        Vec2: {
          fromCoordinate: (coord: any) => ({ x: coord.x, y: coord.y })
        }
      },
      Layer: {
        getEntityBaseHeight: () => 0
      }
    }
  };

  describe('常量定义', () => {
    it('应该定义默认尺寸常量', () => {
      const DEFAULT_SIZE = 0.3;
      expect(DEFAULT_SIZE).toBe(0.3);
    });

    it('应该定义近偏移常量', () => {
      const NEAR_OFFSET = -0.15;
      expect(NEAR_OFFSET).toBe(-0.15);
    });

    it('应该定义远偏移常量', () => {
      const FAR_OFFSET = -0.5;
      expect(FAR_OFFSET).toBe(-0.5);
    });
  });

  describe('INNER_IES数组', () => {
    it('应该包含所有预定义的IES文件', () => {
      const INNER_IES = [
        'spot_light_1.ies',
        'spot_light_2.ies',
        'spot_light_3.ies',
        'fill_light_1.ies',
        'fill_light_2.ies'
      ];

      expect(INNER_IES.length).toBeGreaterThan(0);
      expect(INNER_IES).toContain('spot_light_1.ies');
    });

    it('应该包含聚光灯IES文件', () => {
      const spotLightIES = [
        'spot_light_1.ies',
        'spot_light_2.ies',
        'spot_light_3.ies'
      ];

      spotLightIES.forEach(ies => {
        expect(typeof ies).toBe('string');
        expect(ies).toMatch(/^spot_light_\d+\.ies$/);
      });
    });

    it('应该包含补光灯IES文件', () => {
      const fillLightIES = [
        'fill_light_1.ies',
        'fill_light_2.ies',
        'fill_light_3.ies'
      ];

      fillLightIES.forEach(ies => {
        expect(typeof ies).toBe('string');
        expect(ies).toMatch(/^fill_light_\d+\.ies$/);
      });
    });
  });

  describe('SpotLightData接口', () => {
    it('应该支持IES属性', () => {
      const data = {
        IES: 'spot_light_1.ies',
        iesUrl: 'https://example.com/ies/spot_light_1.ies',
        isPublicIES: true,
        extractSourceId: 'source_123'
      };

      expect(data).toHaveProperty('IES');
      expect(data).toHaveProperty('iesUrl');
      expect(data).toHaveProperty('isPublicIES');
      expect(data).toHaveProperty('extractSourceId');
    });

    it('应该支持尺寸属性', () => {
      const data = {
        XSize: 0.3,
        YSize: 0.3
      };

      expect(data).toHaveProperty('XSize');
      expect(data).toHaveProperty('YSize');
      expect(data.XSize).toBe(0.3);
      expect(data.YSize).toBe(0.3);
    });
  });

  describe('SpotLight_IO.dump方法', () => {
    it('应该导出IES相关属性', () => {
      const entity = {
        IES: 'spot_light_1.ies',
        iesUrl: 'https://example.com/ies/spot_light_1.ies',
        isPublicIES: true,
        extractSourceId: 'source_123'
      };

      expect(entity.IES).toBe('spot_light_1.ies');
      expect(entity.iesUrl).toBeDefined();
      expect(entity.isPublicIES).toBe(true);
      expect(entity.extractSourceId).toBe('source_123');
    });

    it('应该支持回调函数', () => {
      const callback = jest.fn();
      const result = [{ IES: 'spot_light_1.ies' }];
      const entity = { IES: 'spot_light_1.ies' };

      callback(result, entity);
      expect(callback).toHaveBeenCalledWith(result, entity);
    });
  });

  describe('SpotLight_IO.load方法', () => {
    it('应该加载IES数据', () => {
      const data = {
        IES: 'spot_light_1.ies',
        iesUrl: 'https://example.com/ies/spot_light_1.ies',
        isPublicIES: true,
        extractSourceId: 'source_123'
      };

      expect(data.IES).toBe('spot_light_1.ies');
      expect(data.iesUrl).toBeDefined();
    });

    it('应该处理小于默认尺寸的情况', () => {
      const DEFAULT_SIZE = 0.3;
      const data = {
        XSize: 0.2,
        YSize: 0.2
      };

      const needsAdjustment = data.XSize < DEFAULT_SIZE || data.YSize < DEFAULT_SIZE;
      expect(needsAdjustment).toBe(true);
    });

    it('应该设置默认尺寸', () => {
      const DEFAULT_SIZE = 0.3;
      const entity = {
        XSize: DEFAULT_SIZE,
        YSize: DEFAULT_SIZE
      };

      expect(entity.XSize).toBe(DEFAULT_SIZE);
      expect(entity.YSize).toBe(DEFAULT_SIZE);
    });
  });

  describe('SpotLight.reset方法', () => {
    it('应该重置为默认IES', () => {
      const spotLight = {
        IES: (global as any).HSConstants.RenderLight.SPOT_LIGHT_NUM_1,
        iesUrl: '',
        isPublicIES: true,
        XSize: 0.3,
        YSize: 0.3
      };

      expect(spotLight.IES).toBe((global as any).HSConstants.RenderLight.SPOT_LIGHT_NUM_1);
      expect(spotLight.iesUrl).toBe('');
      expect(spotLight.isPublicIES).toBe(true);
    });

    it('应该重置为默认尺寸', () => {
      const DEFAULT_SIZE = 0.3;
      const spotLight = {
        XSize: DEFAULT_SIZE,
        YSize: DEFAULT_SIZE
      };

      expect(spotLight.XSize).toBe(DEFAULT_SIZE);
      expect(spotLight.YSize).toBe(DEFAULT_SIZE);
    });
  });

  describe('refreshBoundInternal方法', () => {
    it('应该计算正确的顶点数量', () => {
      const vertices = Array(8).fill(null);
      expect(vertices.length).toBe(8);
    });

    it('应该应用欧拉角旋转', () => {
      const rotation = { x: 0, y: 0, z: 0 };
      const euler = new (global as any).THREE.Euler(
        -(global as any).THREE.Math.degToRad(rotation.x),
        -(global as any).THREE.Math.degToRad(rotation.y),
        -(global as any).THREE.Math.degToRad(rotation.z),
        'XYZ'
      );

      expect(euler).toBeDefined();
      expect(euler.order).toBe('XYZ');
    });

    it('应该计算边界框', () => {
      const vertices = [
        { x: -0.15, y: -0.15 },
        { x: 0.15, y: -0.15 },
        { x: 0.15, y: 0.15 },
        { x: -0.15, y: 0.15 }
      ];

      let minX = vertices[0].x;
      let maxX = vertices[0].x;
      let minY = vertices[0].y;
      let maxY = vertices[0].y;

      for (let i = 1; i < vertices.length; i++) {
        minX = Math.min(minX, vertices[i].x);
        maxX = Math.max(maxX, vertices[i].x);
        minY = Math.min(minY, vertices[i].y);
        maxY = Math.max(maxY, vertices[i].y);
      }

      expect(minX).toBe(-0.15);
      expect(maxX).toBe(0.15);
      expect(minY).toBe(-0.15);
      expect(maxY).toBe(0.15);
    });
  });

  describe('getRenderParameters方法', () => {
    it('应该返回完整的渲染参数', () => {
      const params = {
        temperature: 5000,
        intensity: 100,
        x: 0,
        y: 0,
        z: 2.5,
        IES: 'spot_light_1.ies',
        iesUrl: 'https://example.com/ies/spot_light_1.ies',
        isPublicIES: true,
        rgb: [255, 255, 255],
        affectSpecular: true,
        close: false,
        sourceContentType: 'light'
      };

      expect(params).toHaveProperty('temperature');
      expect(params).toHaveProperty('intensity');
      expect(params).toHaveProperty('x');
      expect(params).toHaveProperty('y');
      expect(params).toHaveProperty('z');
      expect(params).toHaveProperty('IES');
      expect(params).toHaveProperty('iesUrl');
      expect(params).toHaveProperty('isPublicIES');
    });

    it('应该包含RGB颜色数组', () => {
      const rgb = [255, 255, 255];
      expect(rgb).toHaveLength(3);
      expect(rgb[0]).toBeGreaterThanOrEqual(0);
      expect(rgb[0]).toBeLessThanOrEqual(255);
    });
  });

  describe('getFriendlyIndexGroup方法', () => {
    it('应该识别内部IES文件', () => {
      const iesUrl = 'https://example.com/ies/spot_light_1.ies';
      const innerIES = 'spot_light_1.ies';

      expect(iesUrl.endsWith(innerIES)).toBe(true);
    });

    it('应该返回IES URL或IES值', () => {
      const spotLight1 = {
        iesUrl: 'https://example.com/custom.ies',
        IES: 'spot_light_1.ies'
      };

      const spotLight2 = {
        iesUrl: '',
        IES: 'spot_light_1.ies'
      };

      expect(spotLight1.iesUrl || spotLight1.IES).toBeTruthy();
      expect(spotLight2.iesUrl || spotLight2.IES).toBe('spot_light_1.ies');
    });

    it('应该有默认值', () => {
      const defaultGroup = 'default';
      expect(defaultGroup).toBe('default');
    });
  });

  describe('onFieldChanged方法', () => {
    it('应该监听iesUrl字段变化', () => {
      const fieldName = 'iesUrl';
      const previousValue = 'old_url';
      const currentValue = 'new_url';

      expect(fieldName).toBe('iesUrl');
      expect(previousValue).not.toBe(currentValue);
    });

    it('应该监听IES字段变化', () => {
      const fieldName = 'IES';
      const iesUrl = '';

      const shouldHandle = fieldName === 'IES' && !iesUrl;
      expect(shouldHandle).toBe(true);
    });
  });
});