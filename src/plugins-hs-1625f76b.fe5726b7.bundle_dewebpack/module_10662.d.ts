/**
 * 房间类型规格接口
 * 定义房间的类型和显示名称
 */
interface RoomTypeSpec {
  /** 房间类型标识符 */
  roomType: string;
  /** 房间类型的显示名称（用于UI展示） */
  otherRoom: string;
}

/**
 * 房间接口
 * 表示应用中的一个房间对象
 */
interface Room {
  /** 房间类型标识符 */
  roomType: string;
  /** 房间类型显示名称 */
  roomTypeDisplayName: string;
}

/**
 * 事务请求基类
 * 所有可撤销操作的基类
 */
declare class TransactionRequest {
  /** 当事务提交时调用 */
  onCommit?(): void;
  /** 当事务撤销时调用 */
  onUndo?(): void;
  /** 当事务重做时调用 */
  onRedo?(): void;
  /** 获取操作描述文本 */
  getDescription?(): string;
  /** 获取操作分类 */
  getCategory?(): string;
}

/**
 * 房间类型修改事务请求类
 * 
 * 处理房间类型的修改操作，支持撤销和重做功能。
 * 该类维护了房间类型变更的前后状态，确保操作的可逆性。
 * 
 * @extends {TransactionRequest}
 * 
 * @example
 *