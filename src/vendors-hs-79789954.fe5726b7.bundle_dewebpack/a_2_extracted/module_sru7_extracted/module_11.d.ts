/**
 * 状态设置函数
 * 用于根据标签和替换值更新目标对象的状态
 */
declare module 'module_11' {
  /**
   * 状态数据接口
   */
  interface StateData {
    /** 状态标签标识符 */
    tag: string | number;
    /** 替换值 */
    substitution: unknown;
  }

  /**
   * 具有 setState 方法的对象接口
   */
  interface StateSettable {
    /**
     * 设置状态
     * @param tag - 标签标识符
     * @param substitution - 替换值
     */
    setState(tag: string | number, substitution: unknown): void;
  }

  /**
   * 状态设置函数
   * @param data - 包含 tag 和 substitution 的状态数据
   * @param collection - 包含 StateSettable 对象的集合
   * @param index - 集合中的索引
   */
  function setStateByIndex(
    data: StateData,
    collection: StateSettable[] | Record<string | number, StateSettable>,
    index: string | number
  ): void;

  export = setStateByIndex;
}