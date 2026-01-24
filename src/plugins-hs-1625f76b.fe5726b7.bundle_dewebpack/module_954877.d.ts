/**
 * 修改房间类型命令
 * 
 * 用于在房间设计应用中修改房间的类型规格
 */

/**
 * 房间类型规格接口
 */
interface RoomTypeSpec {
  /** 其他房间类型标识 */
  otherRoom: string;
  [key: string]: unknown;
}

/**
 * 房间对象接口
 */
interface Room {
  id: string;
  [key: string]: unknown;
}

/**
 * 点击率统计接口
 */
interface ClicksRatio {
  /** 命令类型ID */
  id: string;
  /** 命令名称 */
  name: string;
}

/**
 * 当前参数接口
 */
interface CurrentParams {
  /** 操作描述 */
  description: string;
  /** 激活的面板区域 */
  activeSection: string;
  /** 激活的面板区域名称 */
  activeSectionName: string;
  /** 点击率统计数据 */
  clicksRatio: ClicksRatio;
}

/**
 * 事务会话接口
 */
interface TransactionSession {
  /** 提交会话 */
  commit(): void;
}

/**
 * 事务请求接口
 */
interface TransactionRequest {
  [key: string]: unknown;
}

/**
 * 事务管理器接口
 */
interface TransactionManager {
  /**
   * 开始新的事务会话
   */
  startSession(): TransactionSession;
  
  /**
   * 创建事务请求
   * @param requestType 请求类型
   * @param params 请求参数
   */
  createRequest(requestType: string, params: unknown[]): TransactionRequest;
  
  /**
   * 提交事务请求
   * @param request 事务请求对象
   */
  commit(request: TransactionRequest): void;
}

/**
 * 命令上下文接口
 */
interface CommandContext {
  /** 事务管理器 */
  transManager: TransactionManager;
  [key: string]: unknown;
}

/**
 * 命令管理器接口
 */
interface CommandManager {
  /**
   * 标记命令完成
   * @param command 命令实例
   */
  complete(command: ChangeRoomTypeCommand): void;
}

/**
 * 修改房间类型命令类
 * 
 * 继承自 HSApp.Cmd.Command，用于执行房间类型变更操作
 */
declare class ChangeRoomTypeCommand extends HSApp.Cmd.Command {
  /** 要修改的房间列表 */
  private _rooms: Room[];
  
  /** 房间类型规格 */
  private _roomTypeSpec: RoomTypeSpec;
  
  /**
   * 构造函数
   * @param rooms 房间或房间数组（如果是数组，仅使用第一个元素）
   * @param roomTypeSpec 房间类型规格
   */
  constructor(rooms: Room | Room[], roomTypeSpec: RoomTypeSpec);
  
  /**
   * 执行命令
   * 
   * 创建事务会话，为每个房间创建类型变更请求并提交
   */
  onExecute(): void;
  
  /**
   * 是否可以撤销/重做
   * @returns 始终返回 false，表示此命令不支持撤销重做
   */
  canUndoRedo(): boolean;
  
  /**
   * 获取命令描述
   * @returns 命令的文本描述
   */
  getDescription(): string;
  
  /**
   * 获取命令分类
   * @returns 日志分组类型
   */
  getCategory(): string;
  
  /**
   * 获取当前命令参数
   * @returns 包含描述、激活面板等信息的参数对象
   */
  getCurrentParams(): CurrentParams;
}

export default ChangeRoomTypeCommand;