/**
 * 内容操作事件处理模块
 * 提供对3D实体（Entity）的各种操作事件处理函数
 */

/**
 * 应用程序实例接口
 */
interface App {
  /** 命令管理器 */
  cmdManager: CommandManager;
  /** 选择管理器 */
  selectionManager: SelectionManager;
  /** 事务管理器 */
  transManager: TransactionManager;
  /** 插件管理器 */
  pluginManager: PluginManager;
  /** 用户追踪日志记录器 */
  userTrackLogger: UserTrackLogger;
}

/**
 * 命令管理器接口
 */
interface CommandManager {
  /**
   * 创建命令
   * @param commandType 命令类型
   * @param args 命令参数
   * @returns 创建的命令实例
   */
  createCommand<T = unknown>(commandType: string, args?: unknown[]): Command<T>;
  
  /**
   * 执行命令
   * @param command 要执行的命令
   */
  execute(command: Command): void;
  
  /**
   * 完成命令
   * @param command 要完成的命令（可选）
   */
  complete(command?: Command): void;
  
  /**
   * 接收命令消息
   * @param type 消息类型
   * @param data 消息数据
   */
  receive(type: string, data: Record<string, unknown>): void;
}

/**
 * 命令对象接口
 */
interface Command<T = unknown> {
  /** 命令输出结果 */
  output?: T;
}

/**
 * 选择管理器接口
 */
interface SelectionManager {
  /**
   * 取消所有选择
   */
  unselectAll(): void;
  
  /**
   * 选择实体
   * @param entity 要选择的实体
   */
  select(entity: Entity): void;
}

/**
 * 事务管理器接口
 */
interface TransactionManager {
  /**
   * 创建请求
   * @param requestType 请求类型
   * @param args 请求参数
   * @returns 创建的请求实例
   */
  createRequest(requestType: string, args: unknown[]): Request;
  
  /**
   * 提交请求
   * @param request 要提交的请求
   */
  commit(request: Request): void;
}

/**
 * 请求对象接口
 */
interface Request {
  // 请求基础属性
}

/**
 * 插件管理器接口
 */
interface PluginManager {
  /**
   * 获取插件实例
   * @param pluginType 插件类型
   * @returns 插件实例
   */
  getPlugin<T = Plugin>(pluginType: string): T;
}

/**
 * 插件基础接口
 */
interface Plugin {
  // 插件基础属性
}

/**
 * 用户输入插件接口
 */
interface UserInputPlugin extends Plugin {
  actions: {
    /**
     * 删除已选中的项目
     */
    deleteSelectedItems(): void;
  };
}

/**
 * 收藏插件接口
 */
interface FavoritePlugin extends Plugin {
  /**
   * 上传模型及其材质
   * @param entity 实体对象
   */
  uploaderModelWithMaterial(entity: Entity): void;
  
  /**
   * 移除收藏
   * @param seekId 模型唯一标识ID
   */
  removeFavorite(seekId: string): void;
  
  /**
   * 显示分组面板弹窗
   * @param seekId 模型唯一标识ID
   */
  showPopupGroupPanel(seekId: string): void;
}

/**
 * 用户追踪日志记录器接口
 */
interface UserTrackLogger {
  /**
   * 推送追踪日志
   * @param event 事件名称
   * @param data 事件数据
   * @param options 附加选项
   */
  push(event: string, data: Record<string, unknown>, options: Record<string, unknown>): void;
}

/**
 * 实体基类接口
 */
interface Entity {
  /**
   * 检查实体是否启用了指定标志
   * @param flag 标志枚举值
   * @returns 是否启用
   */
  isFlagOn(flag: number): boolean;
}

/**
 * 打开选项配置接口
 */
interface OpenOption {
  [key: string]: unknown;
}

/**
 * 收藏信息接口
 */
interface FavoriteInfo {
  /** 材质是否已更改 */
  materialChanged: boolean;
  /** 是否存在SeekId */
  hasSeekId: boolean;
  /** 收藏添加标志 */
  favAddFlag: boolean;
}

/**
 * 事件参数基础接口
 */
interface BaseEventParams {
  /** 实体数组 */
  entities: Entity[];
  /** 应用程序实例 */
  app: App;
}

/**
 * 替换事件参数接口
 */
interface ReplaceEventParams extends BaseEventParams {
  /** 打开选项配置 */
  openOption?: OpenOption;
}

/**
 * 收藏按钮事件参数接口
 */
interface FavButtonEventParams extends BaseEventParams {
  /** 模型唯一标识ID */
  seekId: string;
}

/**
 * 替换内容事件处理函数
 * 用智能替换功能替换选中的内容，如果内容与面组连接则会先提示用户断开连接
 * 
 * @param params 替换事件参数
 * @param params.entities 要替换的实体数组
 * @param params.app 应用程序实例
 * @param params.openOption 打开选项配置，默认为空对象
 */
export declare function replaceEvent(params: ReplaceEventParams): void;

/**
 * 翻转内容事件处理函数
 * 沿某个轴翻转选中的内容
 * 
 * @param params 事件参数
 * @param params.entities 要翻转的实体数组
 * @param params.app 应用程序实例
 */
export declare function flipEvent(params: BaseEventParams): void;

/**
 * 复制内容事件处理函数
 * 复制选中的内容并显示提示信息
 * 
 * @param params 事件参数
 * @param params.app 应用程序实例
 */
export declare function duplicateEvent(params: Pick<BaseEventParams, 'app'>): void;

/**
 * 锁定/解锁内容事件处理函数
 * 切换实体的冻结（锁定）状态，锁定后的内容无法被选中或编辑
 * 
 * @param params 事件参数
 * @param params.entities 要锁定/解锁的实体数组
 * @param params.app 应用程序实例
 */
export declare function lockEvent(params: BaseEventParams): void;

/**
 * 隐藏内容事件处理函数
 * 隐藏选中的内容，使其在视图中不可见
 * 
 * @param params 事件参数
 * @param params.entities 要隐藏的实体数组
 * @param params.app 应用程序实例
 */
export declare function hideEvent(params: BaseEventParams): void;

/**
 * 删除内容事件处理函数
 * 删除当前选中的项目
 * 
 * @param params 事件参数
 * @param params.app 应用程序实例
 */
export declare function deleteEvent(params: Pick<BaseEventParams, 'app'>): void;

/**
 * 收藏按钮事件处理函数
 * 处理模型收藏操作，包括添加/移除收藏、上传带材质的模型等
 * 需要用户登录才能执行操作
 * 
 * @param params 收藏事件参数
 * @param params.entities 实体数组
 * @param params.seekId 模型唯一标识ID
 * @param params.app 应用程序实例
 */
export declare function favButtonEvent(params: FavButtonEventParams): void;

/**
 * 取消编组事件处理函数
 * 将选中的组合对象拆分为单独的实体
 * 
 * @param params 事件参数
 * @param params.entities 要取消编组的实体数组
 * @param params.app 应用程序实例
 */
export declare function unGroupButtonEvent(params: BaseEventParams): void;

/**
 * 编组事件处理函数
 * 将选中的多个实体组合成一个组
 * 
 * @param params 事件参数
 * @param params.entities 要编组的实体数组
 * @param params.app 应用程序实例
 */
export declare function groupButtonEvent(params: BaseEventParams): void;

/**
 * 旋转至XY平面事件处理函数
 * 将选中的内容旋转90度使其与XY平面对齐
 * 
 * @param params 事件参数
 * @param params.entities 要旋转的实体数组
 * @param params.app 应用程序实例
 */
export declare function rotateXYPlaneEvent(params: BaseEventParams): void;

/**
 * 显示所有内容事件处理函数
 * 显示场景中所有被隐藏的内容
 * 
 * @param params 事件参数
 * @param params.app 应用程序实例
 */
export declare function showAllEvent(params: Pick<BaseEventParams, 'app'>): void;