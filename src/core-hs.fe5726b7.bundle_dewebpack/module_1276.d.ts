/**
 * 组件处理器类型定义
 * 用于在组件装配过程中的各个阶段执行自定义逻辑
 */
type Processor = unknown;

/**
 * P组装处理器
 * 提供组件装配生命周期的钩子管理，包括预处理、元数据构建和后处理阶段
 */
export interface PAssemblyProcessor {
  /**
   * 预处理器列表
   * 在组件装配前执行的处理器集合
   * @internal
   */
  readonly _prevprocessors: Processor[];

  /**
   * 添加预处理器
   * @param processor - 要添加的预处理器实例
   */
  addPrevProcessor(processor: Processor): void;

  /**
   * 移除预处理器
   * @param processor - 要移除的预处理器实例
   * @returns 被移除的预处理器数组
   */
  removePrevProcessor(processor: Processor): Processor[];

  /**
   * 获取所有预处理器
   * @returns 预处理器列表
   */
  getPrevProcessors(): Processor[];

  /**
   * 元数据构建器列表
   * 用于构建组件元数据的处理器集合
   * @internal
   */
  readonly _metabuilders: Processor[];

  /**
   * 添加元数据构建器
   * @param builder - 要添加的元数据构建器实例
   */
  addMetaBuilder(builder: Processor): void;

  /**
   * 移除元数据构建器
   * @param builder - 要移除的元数据构建器实例
   * @returns 被移除的构建器数组
   */
  removeMetaBuilder(builder: Processor): Processor[];

  /**
   * 获取所有元数据构建器
   * @returns 元数据构建器列表
   */
  getMetaBuilders(): Processor[];

  /**
   * 后处理器列表
   * 在组件装配后执行的处理器集合
   * @internal
   */
  readonly _postprocessors: Processor[];

  /**
   * 添加后处理器
   * @param processor - 要添加的后处理器实例
   */
  addPostProcessor(processor: Processor): void;

  /**
   * 移除后处理器
   * @param processor - 要移除的后处理器实例
   * @returns 被移除的后处理器数组
   */
  removePostProcessor(processor: Processor): Processor[];

  /**
   * 获取所有后处理器
   * @returns 后处理器列表
   */
  getPostProcessors(): Processor[];

  /**
   * 新数据模型预处理器列表
   * 用于新数据模型初始化前的处理器集合
   * @internal
   */
  readonly _prevprocessorsForNewDataModel: Processor[];

  /**
   * 为新数据模型添加预处理器
   * @param processor - 要添加的预处理器实例
   */
  addPrevProcessorForNewDataModel(processor: Processor): void;

  /**
   * 为新数据模型移除预处理器
   * @param processor - 要移除的预处理器实例
   */
  removePrevProcessorForNewDataModel(processor: Processor): void;

  /**
   * 获取新数据模型的所有预处理器
   * @returns 新数据模型预处理器列表
   */
  getPrevProcessorsForNewDataModel(): Processor[];

  /**
   * 新数据模型后处理器列表
   * 用于新数据模型初始化后的处理器集合
   * @internal
   */
  readonly _postprocessorsForNewDataModel: Processor[];

  /**
   * 为新数据模型添加后处理器
   * @param processor - 要添加的后处理器实例
   */
  addPostProcessorForNewDataModel(processor: Processor): void;

  /**
   * 为新数据模型移除后处理器
   * @param processor - 要移除的后处理器实例
   */
  removePostProcessorForNewDataModel(processor: Processor): void;

  /**
   * 获取新数据模型的所有后处理器
   * @returns 新数据模型后处理器列表
   */
  getPostProcessorsForNewDataModel(): Processor[];
}

/**
 * P组装处理器单例实例
 */
export declare const PAssemblyProcessor: PAssemblyProcessor;