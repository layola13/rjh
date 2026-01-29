/**
 * Point2D 路径解析单元测试
 * 测试SVG路径解析和轮廓处理功能
 */

import { parse, parseOpeningProfile } from '../Point2D';

export {};

describe('Point2D Path Parser', () => {
  describe('parse函数', () => {
    describe('MoveTo命令(M)', () => {
      it('应该解析简单的MoveTo命令', () => {
        const result = parse('M 10,20');
        
        expect(result).toHaveLength(1);
        expect(result[0]).toEqual({ x: 10, y: 20 });
      });

      it('应该解析多个坐标的MoveTo命令', () => {
        const result = parse('M 0,0 10,10');
        
        expect(result).toHaveLength(1);
        expect(result[0]).toEqual({ x: 0, y: 0 });
      });

      it('应该处理负坐标', () => {
        const result = parse('M -5,-10');
        
        expect(result).toHaveLength(1);
        expect(result[0]).toEqual({ x: -5, y: -10 });
      });
    });

    describe('LineTo命令(L)', () => {
      it('应该解析LineTo命令', () => {
        const result = parse('M 0,0 L 10,20');
        
        expect(result).toHaveLength(2);
        expect(result[0]).toEqual({ x: 0, y: 0 });
        expect(result[1]).toEqual({ x: 10, y: 20 });
      });

      it('应该处理多个LineTo命令', () => {
        const result = parse('M 0,0 L 10,10 L 20,20');
        
        expect(result).toHaveLength(3);
        expect(result[2]).toEqual({ x: 20, y: 20 });
      });
    });

    describe('CubicBezier命令(C)', () => {
      it('应该解析CubicBezier曲线', () => {
        const result = parse('M 0,0 C 10,0 20,10 30,10');
        
        expect(result.length).toBeGreaterThan(1);
        expect(result[0]).toEqual({ x: 0, y: 0 });
        // 曲线应该生成多个插值点
        expect(result.length).toBeGreaterThan(5);
      });

      it('CubicBezier应该在起点和终点之间插值', () => {
        const result = parse('M 0,0 C 10,0 20,10 30,10');
        
        // 最后一个点应该是终点
        const lastPoint = result[result.length - 1];
        expect(lastPoint).toEqual({ x: 30, y: 10 });
      });
    });

    describe('QuadraticBezier命令(Q)', () => {
      it('应该解析QuadraticBezier曲线', () => {
        const result = parse('M 0,0 Q 10,20 20,0');
        
        expect(result.length).toBeGreaterThan(1);
        expect(result[0]).toEqual({ x: 0, y: 0 });
        // 曲线应该生成多个插值点
        expect(result.length).toBeGreaterThan(5);
      });

      it('QuadraticBezier应该在起点和终点之间插值', () => {
        const result = parse('M 0,0 Q 10,20 20,0');
        
        // 最后一个点应该是终点
        const lastPoint = result[result.length - 1];
        expect(lastPoint).toEqual({ x: 20, y: 0 });
      });
    });

    describe('组合命令', () => {
      it('应该解析混合的路径命令', () => {
        const result = parse('M 0,0 L 10,10 L 20,10 L 20,20');
        
        expect(result).toHaveLength(4);
        expect(result[0]).toEqual({ x: 0, y: 0 });
        expect(result[1]).toEqual({ x: 10, y: 10 });
        expect(result[2]).toEqual({ x: 20, y: 10 });
        expect(result[3]).toEqual({ x: 20, y: 20 });
      });

      it('应该处理MoveTo和CubicBezier的组合', () => {
        const result = parse('M 0,0 C 10,0 20,10 30,10 L 40,10');
        
        expect(result.length).toBeGreaterThan(5);
        // 验证最后一个点是LineTo的终点
        const lastPoint = result[result.length - 1];
        expect(lastPoint).toEqual({ x: 40, y: 10 });
      });
    });

    describe('边界情况', () => {
      it('应该处理空字符串', () => {
        const result = parse('');
        
        expect(result).toEqual([]);
      });

      it('应该处理null输入', () => {
        const result = parse(null as any);
        
        expect(result).toEqual([]);
      });

      it('应该处理无效的路径字符串', () => {
        const result = parse('INVALID PATH');
        
        expect(result).toEqual([]);
      });

      it('应该处理只有命令没有坐标的情况', () => {
        const result = parse('M');
        
        expect(result).toEqual([]);
      });
    });

    describe('坐标舍入', () => {
      it('默认应该舍入坐标到4位小数', () => {
        const result = parse('M 1.123456789,2.987654321');
        
        expect(result[0].x).toBe(1.1235);
        expect(result[0].y).toBe(2.9877);
      });

      it('当shouldRound为false时不应舍入', () => {
        const result = parse('M 1.123456789,2.987654321', false);
        
        expect(result[0].x).toBeCloseTo(1.123456789);
        expect(result[0].y).toBeCloseTo(2.987654321);
      });
    });

    describe('科学计数法', () => {
      it('应该处理科学计数法坐标', () => {
        const result = parse('M 1e2,2e1');
        
        expect(result[0].x).toBe(100);
        expect(result[0].y).toBe(20);
      });

      it('应该处理负指数', () => {
        const result = parse('M 1e-2,2e-1');
        
        expect(result[0].x).toBeCloseTo(0.01);
        expect(result[0].y).toBeCloseTo(0.2);
      });
    });
  });

  describe('parseOpeningProfile函数', () => {
    it('应该解析swing=0的轮廓', () => {
      const profileData = {
        profile: 'M 0,0 L 10,10',
        swing: 0
      };
      
      const result = parseOpeningProfile(profileData);
      
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ x: 0, y: 0 });
      expect(result[1]).toEqual({ x: 10, y: 10 });
    });

    it('应该解析swing=1的轮廓', () => {
      const profileData = {
        profile: 'M 0,0 L 10,10',
        swing: 1
      };
      
      const result = parseOpeningProfile(profileData);
      
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ x: 0, y: 0 });
      expect(result[1]).toEqual({ x: 10, y: 10 });
    });

    it('应该镜像swing=2的轮廓（x坐标取反）', () => {
      const profileData = {
        profile: 'M 5,10 L 10,20',
        swing: 2
      };
      
      const result = parseOpeningProfile(profileData);
      
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ x: -5, y: 10 });
      expect(result[1]).toEqual({ x: -10, y: 20 });
    });

    it('应该镜像swing=3的轮廓（x坐标取反）', () => {
      const profileData = {
        profile: 'M 5,10 L 10,20',
        swing: 3
      };
      
      const result = parseOpeningProfile(profileData);
      
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ x: -5, y: 10 });
      expect(result[1]).toEqual({ x: -10, y: 20 });
    });

    it('应该处理包含曲线的轮廓', () => {
      const profileData = {
        profile: 'M 0,0 C 10,0 20,10 30,10',
        swing: 0
      };
      
      const result = parseOpeningProfile(profileData);
      
      expect(result.length).toBeGreaterThan(2);
      expect(result[0]).toEqual({ x: 0, y: 0 });
    });

    it('应该对swing=2的曲线轮廓进行镜像', () => {
      const profileData = {
        profile: 'M 0,0 L 10,10',
        swing: 2
      };
      
      const result = parseOpeningProfile(profileData);
      
      // 所有x坐标应该是负数
      result.forEach(point => {
        if (point.x !== 0) {
          expect(point.x).toBeLessThan(0);
        }
      });
    });
  });
});