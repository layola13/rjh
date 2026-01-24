/**
 * 选项配置接口
 */
interface Options {
  /** 是否必须排序 */
  mustSort?: boolean;
  [key: string]: unknown;
}

/**
 * 包含排序配置功能的类或对象
 */
interface SortableComponent {
  /**
   * 更新组件选项
   * @param options - 要更新的选项对象
   */
  updateOptions(options: Partial<Options>): void;

  /**
   * 设置是否必须排序
   * @param mustSort - 是否启用强制排序
   */
  setMustSort(mustSort: boolean): void;
}

/**
 * 模块导出的函数类型
 * @param this - 绑定的上下文对象
 * @param mustSort - 是否必须排序
 */
type MustSortSetter = (this: SortableComponent, mustSort: boolean) => void;

export { Options, SortableComponent, MustSortSetter };