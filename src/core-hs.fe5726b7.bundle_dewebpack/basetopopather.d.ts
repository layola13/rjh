/**
 * 基础拓扑路径分割器
 * 用于处理路径参数的分割和区间计算
 */
export declare class BaseTopoPather {
  /**
   * 起始参数比例 (0-1之间)
   */
  readonly from: number;

  /**
   * 结束参数比例 (0-1之间)
   */
  readonly to: number;

  /**
   * 构造函数
   * @param from - 起始参数比例，范围[0, 1]
   * @param to - 结束参数比例，范围[0, 1]
   */
  constructor(from: number, to: number);

  /**
   * 分割路径参数
   * 根据给定的路径对象和参数位置数组，计算分割后的参数区间
   * 
   * @param pathObject - 路径对象，需实现getStartParam、getEndParam和getParamAt方法
   * @param paramPositions - 参数位置数组，表示路径上的分割点
   * @returns 返回分割后的参数区间数组，每个区间包含from和to属性
   * 
   * @example
   * const segments = pather.splitParams(path, [0.25, 0.5, 0.75]);
   * // 返回: [{ from: 0.2, to: 0.3 }, { from: 0.3, to: 0.6 }, ...]
   */
  splitParams(
    pathObject: PathParameterProvider,
    paramPositions: number[]
  ): PathSegment[];
}

/**
 * 路径参数提供者接口
 * 定义了路径对象必须实现的参数获取方法
 */
export interface PathParameterProvider {
  /**
   * 获取路径的起始参数值
   */
  getStartParam(): number;

  /**
   * 获取路径的结束参数值
   */
  getEndParam(): number;

  /**
   * 根据给定位置获取参数值
   * @param position - 位置索引或比例
   */
  getParamAt(position: number): number;
}

/**
 * 路径片段接口
 * 表示分割后的一个参数区间
 */
export interface PathSegment {
  /**
   * 区间起始参数（归一化到[0, 1]）
   */
  from: number;

  /**
   * 区间结束参数（归一化到[0, 1]）
   */
  to: number;
}