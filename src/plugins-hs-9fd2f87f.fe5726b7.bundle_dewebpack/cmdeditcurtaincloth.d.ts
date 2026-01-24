/**
 * 窗帘布料编辑命令模块
 * 提供窗帘组件的编辑、显示/隐藏、材质应用等功能
 */

/**
 * 命令消息枚举
 * 定义窗帘编辑命令支持的所有消息类型
 */
export enum CommandMessageEnum {
  /** 取消编辑操作 */
  Cancel = "cancel",
  /** 完成编辑操作 */
  Complete = "complete",
  /** 重置窗帘到初始状态 */
  Reset = "reset",
  /** 编辑指定组件 */
  EditComponent = "editcomponent",
  /** 显示指定组件 */
  ShowComponent = "showcomponent",
  /** 隐藏指定组件 */
  HideComponent = "hidecomponent"
}

/**
 * 窗帘对象接口
 * 表示可编辑的窗帘实体
 */
interface ICurtain {
  /**
   * 获取指定组件的材质
   * @param component - 窗帘组件类型
   * @returns 材质对象或undefined
   */
  getMaterial(component: HSCore.Model.CurtainComponentEnum): IMaterial | undefined;

  /**
   * 检查组件是否启用
   * @param component - 窗帘组件类型
   * @returns 是否启用
   */
  isComponentEnabled(component: HSCore.Model.CurtainComponentEnum): boolean;

  /**
   * 获取禁用的组件数量
   * @returns 禁用组件的数量
   */
  disableComponentNumber(): number;
}

/**
 * 材质对象接口
 */
interface IMaterial {
  /**
   * 判断材质是否相同
   * @param other - 要比较的材质
   * @returns 是否相同
   */
  isSame(other: IMaterial): boolean;
}

/**
 * 目录插件接口
 */
interface ICatalogPlugin {
  // 目录插件相关方法
}

/**
 * 命令上下文接口
 */
interface ICommandContext {
  /** 应用程序实例 */
  app: HSApp.View.IApp;
  /** 事务管理器 */
  transManager: ITransactionManager;
}

/**
 * 事务管理器接口
 */
interface ITransactionManager {
  /**
   * 开始新的事务会话
   * @returns 事务会话对象
   */
  startSession(): ITransactionSession;

  /**
   * 创建事务请求
   * @param requestType - 请求类型
   * @param args - 请求参数
   * @returns 事务请求对象
   */
  createRequest(requestType: string, args: unknown[]): ITransactionRequest;

  /**
   * 提交事务请求
   * @param request - 要提交的请求
   */
  commit(request: ITransactionRequest): void;
}

/**
 * 事务会话接口
 */
interface ITransactionSession {
  /** 中止当前会话 */
  abort(): void;
  /** 提交当前会话 */
  commit(): void;
}

/**
 * 事务请求接口
 */
interface ITransactionRequest {
  // 请求相关属性
}

/**
 * 命令管理器接口
 */
interface ICommandManager {
  /**
   * 完成命令执行
   * @param command - 要完成的命令
   */
  complete(command: HSApp.Cmd.Command): void;
}

/**
 * 消息数据接口 - 键盘事件
 */
interface IKeyboardMessageData {
  /** 键盘按键码 */
  keyCode: number;
}

/**
 * 消息数据接口 - 组件操作
 */
interface IComponentMessageData {
  /** 窗帘组件类型 */
  component: HSCore.Model.CurtainComponentEnum;
}

/**
 * 消息数据接口 - 内容/材质
 */
interface IContentMessageData {
  /** 产品类型 */
  productType: HSCatalog.ProductTypeEnum;
  /** 其他内容属性（如材质数据） */
  [key: string]: unknown;
}

/**
 * 窗帘布料编辑命令类
 * 继承自 HSApp.Cmd.Command，用于处理窗帘的交互式编辑
 */
export class CmdEditCurtainCloth extends HSApp.Cmd.Command {
  /** 当前编辑的窗帘对象 */
  public curtain: ICurtain;

  /** 目录插件实例 */
  private _catalogPlugin: ICatalogPlugin;

  /** 当前正在编辑的组件 */
  private _editingComponent?: HSCore.Model.CurtainComponentEnum;

  /** 当前事务会话 */
  private _session?: ITransactionSession;

  /** 命令上下文 */
  protected context: ICommandContext;

  /** 命令管理器 */
  protected mgr: ICommandManager;

  /**
   * 构造函数
   * @param curtain - 要编辑的窗帘对象
   * @param catalogPlugin - 目录插件实例
   */
  constructor(curtain: ICurtain, catalogPlugin: ICatalogPlugin);

  /**
   * 判断命令是否支持撤销/重做
   * @returns 始终返回 false，表示不支持撤销重做
   */
  canUndoRedo(): boolean;

  /**
   * 命令执行时调用
   * 切换到第一人称视角并启动事务会话
   */
  onExecute(): void;

  /**
   * 接收并处理命令消息
   * @param message - 消息类型（字符串或枚举值）
   * @param data - 消息携带的数据
   * @returns 是否已处理消息
   */
  onReceive(
    message: string | CommandMessageEnum,
    data?: IKeyboardMessageData | IComponentMessageData | IContentMessageData | unknown
  ): boolean;

  /**
   * 取消编辑操作
   * 中止事务并完成命令
   * @private
   */
  private _cancelEdit(): void;

  /**
   * 应用编辑结果
   * 提交事务并完成命令
   * @private
   */
  private _applyEdit(): void;

  /**
   * 应用组件材质
   * @param materialData - 包含材质信息的数据对象
   * @private
   */
  private _applyComponentMaterial(materialData: IContentMessageData): void;

  /**
   * 重置窗帘到默认状态
   * 检查是否有启用的组件或禁用的组件，如果有则执行重置
   * @private
   */
  private _resetCurtain(): void;

  /**
   * 显示或隐藏窗帘组件
   * @param component - 要操作的组件
   * @param isHide - true为隐藏，false为显示
   * @private
   */
  private _isHideComponent(component: HSCore.Model.CurtainComponentEnum, isHide: boolean): void;
}

/**
 * 全局命名空间扩展
 */
declare global {
  namespace HSApp {
    namespace Cmd {
      /**
       * 命令基类
       */
      class Command {
        protected context: ICommandContext;
        protected mgr: ICommandManager;
      }
    }

    namespace View {
      /**
       * 视图模式枚举
       */
      enum ViewModeEnum {
        FirstPerson = "FirstPerson"
      }

      /**
       * 应用程序接口
       */
      interface IApp {
        /**
         * 切换主视图模式
         * @param mode - 目标视图模式
         */
        switchPrimaryViewMode(mode: ViewModeEnum): void;
      }
    }

    namespace Util {
      namespace Keyboard {
        /**
         * 键盘按键码枚举
         */
        enum KeyCodes {
          ESC = 27,
          DELETE = 46,
          TAB = 9
        }
      }
    }
  }

  namespace HSCore {
    namespace Model {
      /**
       * 窗帘组件枚举
       * 定义窗帘的各个可编辑部分
       */
      enum CurtainComponentEnum {
        // 具体组件由实际模型定义
      }
    }
  }

  namespace HSCatalog {
    /**
     * 产品类型枚举
     */
    enum ProductTypeEnum {
      /** 材质产品 */
      Material = "Material"
    }
  }

  namespace HSFPConstants {
    /**
     * 命令消息常量
     */
    namespace CommandMessage {
      const Content: string;
    }

    /**
     * 请求类型常量
     */
    namespace RequestType {
      /** 更改组件材质 */
      const ChangeComponentMaterial: string;
      /** 重置窗帘 */
      const ResetCurtain: string;
      /** 显示/隐藏窗帘组件 */
      const ShowHideCurtainComponent: string;
    }
  }
}