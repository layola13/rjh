/**
 * 全局墙高修改命令
 * 用于撤销/重做系统中保存和恢复全局墙体高度设置
 */

/**
 * 墙体高度数据存储结构
 */
interface WallHeightData {
  /** 全局默认墙高 */
  global: number;
  /** 房间天花板高度映射表 (房间ID -> 高度) */
  rooms: Record<string, number>;
  /** 墙体高度映射表 (墙体ID -> 高度) */
  walls: Record<string, number>;
}

/**
 * 户型图对象接口
 */
interface FloorPlan {
  /** 全局墙体高度（3D模式） */
  global_wall_height3d: number;
  
  /**
   * 遍历所有墙体
   * @param callback - 对每个墙体执行的回调函数
   */
  forEachWall(callback: (wall: Wall) => void): void;
  
  /**
   * 遍历所有房间
   * @param callback - 对每个房间执行的回调函数
   */
  forEachRoom(callback: (room: Room) => void): void;
}

/**
 * 墙体对象接口
 */
interface Wall {
  /** 墙体唯一标识符 */
  ID: string;
  /** 墙体3D高度 */
  height3d: number;
}

/**
 * 房间对象接口
 */
interface Room {
  /** 房间唯一标识符 */
  ID: string;
  /** 房间天花板3D高度 */
  ceilingHeight3d: number;
}

/**
 * 命令基类接口
 */
interface Command {
  /** 执行命令 */
  onExecute(param: any): void;
  /** 撤销命令 */
  onUndo(): void;
  /** 重做命令 */
  onRedo(): void;
  /** 获取命令描述 */
  getDescription(): string;
  /** 获取命令分类 */
  getCategory(): string;
}

/**
 * 全局墙高修改命令类
 * 支持撤销/重做功能的墙体高度修改命令
 */
export default class GlobalWallHeightCommand extends Command {
  /** 保存的数据快照（用于撤销） */
  private savedData: WallHeightData;
  
  /** 恢复的数据快照（用于重做） */
  private restoredData: WallHeightData;
  
  /** 户型图实例引用 */
  private fp: FloorPlan;

  /**
   * 构造函数
   * @param floorplan - 户型图对象实例
   */
  constructor(floorplan: FloorPlan);

  /**
   * 将当前状态保存到指定数据对象
   * @param data - 目标数据存储对象
   * @private
   */
  private _saveToData(data: WallHeightData): void;

  /**
   * 从数据对象恢复状态
   * @param data - 源数据对象
   * @private
   */
  private _restoreFromData(data: WallHeightData): void;

  /**
   * 执行命令：修改全局墙高
   * @param newHeight - 新的全局墙体高度值
   */
  onExecute(newHeight: number): void;

  /**
   * 更改全局墙体高度
   * @param height - 新高度值
   * @private
   */
  private _changeHeight(height: number): void;

  /**
   * 撤销操作：恢复到修改前的状态
   */
  onUndo(): void;

  /**
   * 重做操作：重新应用修改后的状态
   */
  onRedo(): void;

  /**
   * 获取命令的描述文本
   * @returns 返回 "修改全局墙高"
   */
  getDescription(): string;

  /**
   * 获取命令所属分类
   * @returns 返回墙体操作分类枚举值
   */
  getCategory(): string;
}