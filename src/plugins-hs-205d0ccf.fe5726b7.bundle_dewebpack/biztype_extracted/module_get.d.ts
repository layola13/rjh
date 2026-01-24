/**
 * 曲线数据管理接口
 * 用于管理和获取各类曲线Bean数据的集合
 */
interface CurveDataManager<T = CurveBean> {
  /**
   * 主要的曲线Bean数据集合
   * @private
   */
  _curveBeans: T[];

  /**
   * 额外的曲线Bean数据集合
   * @private
   */
  _extraCurveBeans: T[];

  /**
   * 临时的曲线Bean数据集合
   * @private
   */
  _tempBeans: T[];

  /**
   * 获取所有曲线Bean数据
   * 
   * 合并并返回所有曲线数据，包括主要数据、额外数据和临时数据。
   * 返回顺序：_curveBeans -> _extraCurveBeans -> _tempBeans
   * 
   * @returns {T[]} 包含所有曲线Bean的数组
   * 
   * @example
   * const allCurves = manager.get();
   * console.log(allCurves.length); // 所有曲线的总数
   */
  get(): T[];
}

/**
 * 曲线Bean基础数据结构
 * 表示单个曲线数据点或曲线配置
 */
interface CurveBean {
  // 根据实际业务需求定义具体属性
  id?: string | number;
  [key: string]: unknown;
}

/**
 * 导出get方法的类型定义
 */
export type GetCurvesFunction<T = CurveBean> = () => T[];

export { CurveDataManager, CurveBean };