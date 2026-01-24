/**
 * 计算工作路径的中点、深度、移动方向和旋转角度
 * 基于工作路径和参考位置计算橱柜的几何属性
 */
declare function calculateCabinetGeometry(this: CabinetContext): void;

/**
 * 橱柜上下文接口
 * 包含计算橱柜几何属性所需的所有状态
 */
interface CabinetContext {
  /** 工作路径的两个端点 */
  _workPath: [Vec2, Vec2];
  
  /** 橱柜深度（Y轴长度） */
  _depth: number;
  
  /** 移动方向的单位向量 */
  _moveDirection: THREE.Vector3;
  
  /** 前方向的单位向量 */
  _frontDir: THREE.Vector3;
  
  /** 参考位置坐标 */
  _referencePos: Vec2;
  
  /** 旋转角度（弧度） */
  _rotation: number;
  
  /** 橱柜总高度 */
  _height: number;
  
  /** 区域信息 */
  _areaInfo: AreaInfo;
  
  /**
   * 查找最接近给定位置的基础橱柜
   * @param position - 二维位置坐标
   * @returns 最接近的基础橱柜对象
   */
  _findClosestBaseCabinet(position: Vec2): BaseCabinet;
}

/**
 * 二维向量接口
 */
interface Vec2 {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
}

/**
 * 基础橱柜接口
 * 定义橱柜的尺寸和位置信息
 */
interface BaseCabinet {
  /** Y轴长度（深度） */
  YLength: number;
  
  /** Z轴起始位置 */
  z: number;
  
  /** Z轴长度（高度） */
  ZLength: number;
}

/**
 * 区域信息接口
 */
interface AreaInfo {
  /** 区域额外高度 */
  height: number;
}

/**
 * HSCore工具库命名空间
 */
declare namespace HSCore {
  namespace Util {
    namespace Math {
      namespace Vec2 {
        /**
         * 在两个二维向量之间进行线性插值
         * @param start - 起始向量
         * @param end - 结束向量
         * @param t - 插值参数 [0, 1]，0.5表示中点
         * @returns 插值后的向量
         */
        function lerp(start: Vec2, end: Vec2, t: number): Vec2;
      }
      
      /**
       * 计算两条线段之间的逆时针角度
       * @param lineAStart - 线段A的起点
       * @param lineAEnd - 线段A的终点
       * @param lineBStart - 线段B的起点
       * @param lineBEnd - 线段B的终点
       * @returns 逆时针角度（弧度）
       */
      function lineLineAngleCCW(
        lineAStart: Vec2,
        lineAEnd: Vec2,
        lineBStart: Vec2,
        lineBEnd: Vec2
      ): number;
    }
  }
}

/**
 * Three.js Vector3类型声明
 */
declare namespace THREE {
  class Vector3 {
    x: number;
    y: number;
    z: number;
    
    constructor(x: number, y: number, z: number);
    
    /**
     * 归一化向量为单位向量
     * @returns 归一化后的向量（修改自身）
     */
    normalize(): this;
    
    /**
     * 计算两个向量的叉积
     * @param a - 第一个向量
     * @param b - 第二个向量
     * @returns 叉积结果（修改自身）
     */
    cross(a: Vector3, b: Vector3): this;
    
    /**
     * 计算与另一个向量的点积
     * @param v - 另一个向量
     * @returns 点积标量值
     */
    dot(v: Vector3): number;
    
    /**
     * 将向量取反（所有分量乘以-1）
     * @returns 取反后的向量（修改自身）
     */
    negate(): this;
  }
}