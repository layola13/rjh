/**
 * 旋转内容命令
 * 用于旋转选中的多个3D内容对象
 */

import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { HSFPConstants } from './HSFPConstants';
import { HSConstants } from './HSConstants';

/**
 * 旋转平面类型
 */
type RotationPlane = 'xy' | 'xz' | 'yz';

/**
 * 内容对象的位置和旋转数据
 */
interface ContentTransformData {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标 */
  z: number;
  /** X轴旋转角度 */
  XRotation: number;
  /** Y轴旋转角度 */
  YRotation: number;
  /** Z轴旋转角度 */
  rotation: number;
}

/**
 * 原始数据记录映射表
 * key: 内容对象ID
 * value: 原始变换数据
 */
type OriginDataMap = Record<string, ContentTransformData>;

/**
 * 3D内容对象接口
 */
interface IContent {
  /** 唯一标识符 */
  id: string;
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标 */
  z: number;
  /** X轴旋转 */
  XRotation: number;
  /** Y轴旋转 */
  YRotation: number;
  /** Z轴旋转 */
  ZRotation: number;
  /** 所属组 */
  group?: IGroup;
}

/**
 * 组对象接口
 */
interface IGroup {
  /** 组ID */
  id: string;
  /** 内容类型 */
  contentType: string;
  /** X轴长度 */
  XLength: number;
  /** Y轴长度 */
  YLength: number;
  /** Z轴长度 */
  ZLength: number;
  /** X轴旋转 */
  XRotation: number;
  /** Y轴旋转 */
  YRotation: number;
  /** Z轴旋转 */
  ZRotation: number;
  /** 成员列表 */
  members: IContent[];
  /** 添加成员 */
  addItem(content: IContent): void;
  /** 移除成员 */
  removeItem(content: IContent): void;
  /** 分配到场景 */
  assignTo(parent: any): void;
}

/**
 * 命令消息类型
 */
type CommandMessage = 'drag_move' | 'drag_end' | 'reset';

/**
 * 命令消息数据
 */
interface CommandMessageData {
  /** 消息携带的值 */
  value?: number;
}

/**
 * 旋转内容命令类
 * 负责处理多个3D对象的旋转操作，支持在不同平面上旋转
 * 
 * @extends HSApp.Cmd.Command
 */
export declare class CmdRotateContents extends HSApp.Cmd.Command {
  /**
   * 临时创建的组对象，用于统一控制多个内容的旋转
   */
  group?: IGroup;

  /**
   * 要旋转的内容对象数组
   */
  contents: IContent[];

  /**
   * 旋转平面 ('xy'=水平旋转, 'xz'=前后旋转, 'yz'=左右旋转)
   */
  plane: RotationPlane;

  /**
   * 记录每个内容对象的原始变换数据，用于撤销操作
   * @private
   */
  private _originData: OriginDataMap;

  /**
   * 构造函数
   * @param contents - 要旋转的内容对象数组
   * @param plane - 旋转所在的平面
   */
  constructor(contents: IContent[], plane: RotationPlane);

  /**
   * 执行命令
   * 保存原始数据并创建临时组
   */
  onExecute(): void;

  /**
   * 创建临时组
   * 将所有要旋转的内容添加到组中以便统一控制
   * @private
   */
  private _createGroup(): void;

  /**
   * 接收命令消息
   * @param message - 消息类型 ('drag_move'=拖动中, 'drag_end'=拖动结束, 'reset'=重置)
   * @param data - 消息数据
   */
  onReceive(message: CommandMessage, data: CommandMessageData): void;

  /**
   * 处理旋转请求
   * 创建移动内容请求并提交事务
   * @private
   */
  private _dealRotateRequest(): void;

  /**
   * 清理命令
   * 移除临时创建的组
   */
  onCleanup(): void;

  /**
   * 移除临时组
   * 恢复成员的选中状态
   * @private
   */
  private _removeGroup(): void;

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
}