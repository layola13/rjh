/**
 * 模板样式应用器基类
 * 负责管理模板实体的样式应用操作
 */

/**
 * 模板实体接口
 * 表示可应用样式的模板对象
 */
interface TemplateEntity {
  // 模板实体的具体属性需要根据实际业务定义
  [key: string]: unknown;
}

/**
 * 命令管理器接口
 * 负责管理应用中的命令执行和撤销
 */
interface CommandManager {
  /**
   * 取消当前正在执行的命令
   */
  cancel(): void;
}

/**
 * 应用实例接口
 * 全局应用单例，提供核心服务访问
 */
interface AppInstance {
  /**
   * 命令管理器实例
   */
  cmdManager: CommandManager;
}

/**
 * HSApp全局命名空间
 */
declare global {
  const HSApp: {
    App: {
      /**
       * 获取应用单例实例
       */
      getApp(): AppInstance;
    };
  };

  /**
   * 断言函数
   * @param condition - 需要验证的条件
   */
  function assert(condition: boolean): void;
}

/**
 * 模板样式应用器抽象类
 * 提供模板样式应用的基础框架，子类需要实现具体的样式应用逻辑
 */
declare class TemplateStyleApplier {
  /**
   * 关联的模板实体
   */
  protected templateEntity?: TemplateEntity;

  /**
   * 命令管理器引用
   */
  protected cmdMgr?: CommandManager;

  /**
   * 构造函数
   * @param templateEntity - 需要应用样式的模板实体
   */
  constructor(templateEntity: TemplateEntity);

  /**
   * 应用样式
   * 取消当前命令后执行样式应用
   * @param style - 要应用的样式对象
   */
  applyStyle(style: unknown): void;

  /**
   * 执行样式应用的具体逻辑
   * 抽象方法，子类必须实现
   * @param style - 要应用的样式对象
   */
  protected onApplyStyle(style: unknown): void;

  /**
   * 清理资源
   * 释放模板实体和命令管理器的引用
   */
  cleanUp(): void;
}

export default TemplateStyleApplier;