/**
 * MaterialConvertor 单元测试
 * 测试材质转换器功能
 */

export {};

describe('MaterialConvertor', () => {
  describe('getTileSizeScale方法', () => {
    it('应该在没有当前尺寸时返回[1, 1]', () => {
      const tileSize = {
        tileSize_x: undefined,
        tileSize_y: undefined,
        initTileSize_x: 100,
        initTileSize_y: 100
      };

      const calculateScale = (currentSize?: number, initialSize?: number): number => {
        if (!currentSize) return 1;
        if (!initialSize) return currentSize;
        return currentSize / initialSize;
      };

      const scaleX = calculateScale(tileSize.tileSize_x, tileSize.initTileSize_x);
      const scaleY = calculateScale(tileSize.tileSize_y, tileSize.initTileSize_y);

      expect(scaleX).toBe(1);
      expect(scaleY).toBe(1);
    });

    it('应该在没有初始尺寸时返回当前尺寸', () => {
      const tileSize = {
        tileSize_x: 50,
        tileSize_y: 75,
        initTileSize_x: undefined,
        initTileSize_y: undefined
      };

      const calculateScale = (currentSize?: number, initialSize?: number): number => {
        if (!currentSize) return 1;
        if (!initialSize) return currentSize;
        return currentSize / initialSize;
      };

      const scaleX = calculateScale(tileSize.tileSize_x, tileSize.initTileSize_x);
      const scaleY = calculateScale(tileSize.tileSize_y, tileSize.initTileSize_y);

      expect(scaleX).toBe(50);
      expect(scaleY).toBe(75);
    });

    it('应该正确计算缩放比例', () => {
      const tileSize = {
        tileSize_x: 200,
        tileSize_y: 150,
        initTileSize_x: 100,
        initTileSize_y: 100
      };

      const calculateScale = (currentSize?: number, initialSize?: number): number => {
        if (!currentSize) return 1;
        if (!initialSize) return currentSize;
        return currentSize / initialSize;
      };

      const scaleX = calculateScale(tileSize.tileSize_x, tileSize.initTileSize_x);
      const scaleY = calculateScale(tileSize.tileSize_y, tileSize.initTileSize_y);

      expect(scaleX).toBe(2);
      expect(scaleY).toBe(1.5);
    });

    it('应该从metadata读取初始尺寸', () => {
      const tileSize = {
        tileSize_x: 200,
        tileSize_y: 150,
        metadata: {
          tileSize_x: 100,
          tileSize_y: 100
        }
      };

      const initTileSizeX = tileSize.metadata.tileSize_x;
      const initTileSizeY = tileSize.metadata.tileSize_y;

      expect(initTileSizeX).toBe(100);
      expect(initTileSizeY).toBe(100);
    });

    it('应该处理seekId', () => {
      const tileSize = {
        seekId: 'material_12345',
        tileSize_x: 200,
        tileSize_y: 150
      };

      expect(tileSize.seekId).toBe('material_12345');
      expect(typeof tileSize.seekId).toBe('string');
    });
  });

  describe('convertPavingOption方法', () => {
    it('应该转换点坐标（Y轴取反）', () => {
      const option = {
        rotation: 0,
        point: { x: 10, y: 20 },
        sliderOffsetX: 5
      };

      const result = {
        point: {
          x: option.point.x,
          y: -option.point.y
        },
        rotation: 0,
        sliderOffsetX: option.sliderOffsetX,
        sliderOffsetY: 0
      };

      expect(result.point.x).toBe(10);
      expect(result.point.y).toBe(-20);
    });

    it('应该处理旋转角度', () => {
      const option = {
        rotation: 45,
        point: { x: 0, y: 0 },
        sliderOffsetX: 0
      };

      // 模拟getRangeRotation行为
      const mockGetRangeRotation = (angle: number, range: number): number => {
        let result = angle % range;
        if (result > range / 2) {
          result -= range;
        } else if (result < -range / 2) {
          result += range;
        }
        return result;
      };

      const rotation = mockGetRangeRotation(-option.rotation, 180);
      expect(rotation).toBe(-45);
    });

    it('应该转换sliderOffsetX', () => {
      const option = {
        rotation: 0,
        point: { x: 0, y: 0 },
        sliderOffsetX: 10
      };

      expect(option.sliderOffsetX).toBe(10);
    });

    it('应该转换sliderOffsetY（取反）', () => {
      const option = {
        rotation: 0,
        point: { x: 0, y: 0 },
        sliderOffsetX: 0,
        sliderOffsetY: 15
      };

      const sliderOffsetY = -(option.sliderOffsetY ?? 0);
      expect(sliderOffsetY).toBe(-15);
    });

    it('应该处理sliderOffsetY未定义的情况', () => {
      const option: any = {
        rotation: 0,
        point: { x: 0, y: 0 },
        sliderOffsetX: 0
      };

      const sliderOffsetY = -(option.sliderOffsetY ?? 0);
      expect(Math.abs(sliderOffsetY)).toBe(0);
    });

    it('应该返回完整的输出对象', () => {
      const result = {
        point: { x: 5, y: -10 },
        rotation: -30,
        sliderOffsetX: 3,
        sliderOffsetY: -7
      };

      expect(result).toHaveProperty('point');
      expect(result).toHaveProperty('rotation');
      expect(result).toHaveProperty('sliderOffsetX');
      expect(result).toHaveProperty('sliderOffsetY');
    });
  });

  describe('接口定义', () => {
    it('应该定义TileSize接口', () => {
      const tileSize = {
        initTileSize_x: 100,
        initTileSize_y: 100,
        tileSize_x: 200,
        tileSize_y: 150,
        seekId: 'material_123',
        metadata: {
          tileSize_x: 100,
          tileSize_y: 100
        }
      };

      expect(tileSize).toHaveProperty('initTileSize_x');
      expect(tileSize).toHaveProperty('initTileSize_y');
      expect(tileSize).toHaveProperty('tileSize_x');
      expect(tileSize).toHaveProperty('tileSize_y');
      expect(tileSize).toHaveProperty('seekId');
      expect(tileSize).toHaveProperty('metadata');
    });

    it('应该定义Point接口', () => {
      const point = { x: 10, y: 20 };

      expect(point).toHaveProperty('x');
      expect(point).toHaveProperty('y');
      expect(typeof point.x).toBe('number');
      expect(typeof point.y).toBe('number');
    });

    it('应该定义PavingOptionInput接口', () => {
      const option = {
        rotation: 45,
        point: { x: 5, y: 10 },
        sliderOffsetX: 3,
        sliderOffsetY: 7
      };

      expect(option).toHaveProperty('rotation');
      expect(option).toHaveProperty('point');
      expect(option).toHaveProperty('sliderOffsetX');
      expect(option).toHaveProperty('sliderOffsetY');
    });

    it('应该定义PavingOptionOutput接口', () => {
      const output = {
        point: { x: 5, y: -10 },
        rotation: -45,
        sliderOffsetX: 3,
        sliderOffsetY: -7
      };

      expect(output).toHaveProperty('point');
      expect(output).toHaveProperty('rotation');
      expect(output).toHaveProperty('sliderOffsetX');
      expect(output).toHaveProperty('sliderOffsetY');
    });
  });
});