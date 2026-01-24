/**
 * 鼠标点击处理模块
 * @module module_onMouseDown
 */

/**
 * 搜索项点击处理器的参数类型
 */
interface SearchItemClickParams {
  /** 搜索结果项数据 */
  result: unknown;
  /** 项目索引 */
  index: number;
  /** 附加数据或事件对象 */
  additionalData: unknown;
}

/**
 * 组件 Props 接口
 */
interface ComponentProps {
  /**
   * 处理搜索项点击事件
   * @param result - 搜索结果项
   * @param index - 项目索引
   * @param additionalData - 附加数据
   */
  handleClickSearchItem(
    result: unknown,
    index: number,
    additionalData: unknown
  ): void;
}

/**
 * 鼠标按下事件处理函数
 * @param result - 搜索结果数据
 * @param index - 当前项索引
 * @param additionalData - 附加参数
 */
declare function onMouseDown(
  result: unknown,
  index: number,
  additionalData: unknown
): void;

export { onMouseDown, ComponentProps, SearchItemClickParams };