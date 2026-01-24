/**
 * 复制自定义参数化模型实例的命令类
 * 支持通过鼠标拖拽预览和放置复制的实例
 */
declare module "CmdCopyCustomizedPMInstance" {
  /**
   * 创建类型常量
   */
  const enum CreateType {
    /** 左侧菜单触发 */
    LEFT_MENU = "leftmenu"
  }

  /**
   * 三维空间坐标点
   */
  interface Position3D {
    /** X坐标 */
    x: number;
    /** Y坐标 */
    y: number;
    /** Z坐标 */
    z: number;
  }

  /**
   * 鼠标移动事件数据
   */
  interface MouseMoveEventData {
    /** 鼠标位置 [x, y, z?] */
    position?: [number, number, number?];
  }

  /**
   * 键盘事件数据
   */
  interface KeyboardEventData {
    /** 按键代码 */
    keyCode?: number;
  }

  /**
   * 自定义参数化模型实例
   */
  interface CustomizedPMInstance {
    /** X坐标 */
    x: number;
    /** Y坐标 */
    y: number;
    /** Z坐标 */
    z: number;
    /**
     * 获取唯一父节点
     */
    getUniqueParent(): CustomizedPMParent;
    /**
     * 导出模型数据
     */
    dump(): unknown[];
  }

  /**
   * 自定义参数化模型父节点
   */
  interface CustomizedPMParent {
    /**
     * 移除子节点
     * @param child 要移除的子节点
     */
    removeChild(child: CustomizedPMInstance): void;
  }

  /**
   * 应用程序实例
   */
  interface HSApp {
    /** 活动视图 */
    activeView: {
      /**
       * 拾取三维坐标
       * @param mousePos 鼠标位置
       */
      pick(mousePos: unknown): Position3D;
    };
    /** 选择管理器 */
    selectionManager: {
      /** 取消所有选择 */
      unselectAll(): void;
    };
    /** 命令管理器 */
    cmdManager: {
      /**
       * 取消命令执行
       * @param cmd 命令实例
       */
      cancel(cmd: CmdCopyCustomizedPMInstance): void;
    };
  }

  /**
   * 用户输入插件接口
   */
  interface UserInputPlugin {
    /**
     * 获取当前鼠标位置
     */
    getMousePosition(): unknown;
  }

  /**
   * 事务会话接口
   */
  interface TransactionSession {
    /** 提交事务 */
    commit(): void;
    /** 结束事务 */
    end(): void;
  }

  /**
   * 事务管理器接口
   */
  interface TransactionManager {
    /**
     * 启动新的事务会话
     */
    startSession(): TransactionSession;
    /**
     * 创建请求对象
     * @param requestType 请求类型
     * @param params 请求参数
     */
    createRequest(
      requestType: string,
      params: [CustomizedPMInstance[], Position3D]
    ): unknown;
    /**
     * 提交请求
     * @param request 请求对象
     */
    commit(request: unknown): void;
  }

  /**
   * 命令上下文接口
   */
  interface CommandContext {
    /** 事务管理器 */
    transManager: TransactionManager;
    /** 应用实例 */
    app: HSApp;
  }

  /**
   * 命令管理器接口
   */
  interface CommandManager {
    /**
     * 完成命令执行
     * @param cmd 命令实例
     */
    complete(cmd: CmdCopyCustomizedPMInstance): void;
  }

  /**
   * 命令基类
   */
  class Command {
    /** 命令上下文 */
    protected context: CommandContext;
    /** 命令管理器 */
    protected mgr: CommandManager;

    constructor();
  }

  /**
   * 复制自定义参数化模型实例命令
   * 
   * 功能说明：
   * - 支持复制一个或多个自定义参数化模型实例
   * - 提供实时预览效果，跟随鼠标移动
   * - 点击鼠标确认放置位置
   * - 支持Esc取消操作
   * 
   * @example
   *