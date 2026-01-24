import type { SweepHelper } from './SweepHelper';
import type { Coordinate3 } from './Coordinate3';

/**
 * 光带扫掠路径的辅助类
 * 用于处理光带特效的路径坐标计算
 */
export interface LightBandSweepHelper extends SweepHelper {
  /**
   * 根据扫掠路径获取局部坐标系
   * @param paths - 扫掠路径数组
   * @param position - 当前位置向量
   * @param surface - 曲面对象，包含UV坐标和法线信息
   * @returns 返回包含位置、法线和切线的三维坐标系，路径为空时返回 undefined
   */
  getLocalCoordinateBySweepPath(
    paths: Array<{ getStartTangent(): { clone(): { cross(normal: any): any } } }>,
    position: any,
    surface: {
      getSurface(): { getUVAt(position: any): any };
      getNormAt(uv: any): any;
    }
  ): Coordinate3 | undefined;
}

/**
 * LightBandSweepHelper 类的构造函数
 */
export interface LightBandSweepHelperConstructor {
  new (): LightBandSweepHelper;
  
  /**
   * 获取 LightBandSweepHelper 的单例实例
   * @returns LightBandSweepHelper 单例对象
   */
  getInstance(): LightBandSweepHelper;
}

/**
 * 光带扫掠辅助类的单例实现
 */
export const LightBandSweepHelper: LightBandSweepHelperConstructor;