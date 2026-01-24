/**
 * 命令管理器接口
 * 负责创建和执行命令
 */
interface CommandManager {
  /**
   * 创建指定类型的命令
   * @param commandType - 命令类型常量
   * @param params - 命令参数数组
   * @returns 创建的命令实例或undefined
   */
  createCommand<T extends Command>(
    commandType: string,
    params: unknown[]
  ): T | undefined;

  /**
   * 执行命令
   * @param command - 要执行的命令实例
   * @param options - 执行选项
   */
  execute(command: Command, options?: unknown): void;
}

/**
 * 命令基础接口
 */
interface Command {
  /** 是否显示Gizmo控制器 */
  showGizmo?: boolean;
}

/**
 * HSF平台命令类型常量
 */
declare namespace HSFPConstants {
  enum CommandType {
    /** 应用几何材质到开口命令 */
    ApplyGeometryMaterialToOpening = 'ApplyGeometryMaterialToOpening'
  }
}

/**
 * 基础实体接口
 */
interface Entity {
  /** 实体唯一标识符 */
  id?: string;
}

/**
 * 基础样式应用器抽象类
 * 提供样式应用的基础功能
 */
declare abstract class BaseStyleApplier {
  /** 命令管理器实例 */
  protected readonly cmdMgr: CommandManager;
  
  /** 模板实体 */
  protected readonly templateEntity: Entity;

  /**
   * 构造函数
   * @param params - 初始化参数对象
   */
  constructor(params: unknown);

  /**
   * 应用样式的抽象方法
   * @param options - 样式应用选项
   */
  abstract onApplyStyle(options: unknown): void;
}

/**
 * 几何开口材质应用器
 * 继承自BaseStyleApplier，专门用于将几何材质应用到开口实体
 * 
 * @example
 *