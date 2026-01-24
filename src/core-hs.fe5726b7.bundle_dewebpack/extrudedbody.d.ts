/**
 * ExtrudedBody 模块类型定义
 * 提供挤压体、窗户、墙体等建筑构件的类型声明
 * @module ExtrudedBody
 */

/**
 * 挤压体转储数据接口
 * 用于序列化/反序列化挤压体数据
 */
export interface IExtrudedBodyDump {
  // 具体字段需根据实际实现补充
  [key: string]: unknown;
}

/**
 * 挤压体参数接口
 * 定义创建挤压体所需的配置参数
 */
export interface IExtrudedBodyParameters {
  // 具体字段需根据实际实现补充
  [key: string]: unknown;
}

/**
 * 挤压体类
 * 表示可沿路径挤压生成的三维实体
 */
export declare class ExtrudedBody {
  constructor(parameters: IExtrudedBodyParameters);
  // 类方法需根据实际实现补充
}

/**
 * 挤压体输入输出处理类
 * 负责挤压体的序列化和反序列化操作
 */
export declare class ExtrudedBody_IO {
  static serialize(body: ExtrudedBody): IExtrudedBodyDump;
  static deserialize(dump: IExtrudedBodyDump): ExtrudedBody;
}

/**
 * 窗墙参数接口
 * 定义窗墙构件的配置参数
 */
export interface IWindowWallParameters {
  // 具体字段需根据实际实现补充
  [key: string]: unknown;
}

/**
 * 窗墙类
 * 表示包含窗户的墙体结构
 * @alias Wall
 */
export declare class WindowWall {
  constructor(parameters: IWindowWallParameters);
  // 类方法需根据实际实现补充
}

/**
 * 墙体类（WindowWall 的别名）
 */
export declare const Wall: typeof WindowWall;

/**
 * 窗墙输入输出处理类
 * 负责窗墙的序列化和反序列化操作
 * @alias Wall_IO
 */
export declare class WindowWall_IO {
  static serialize(wall: WindowWall): unknown;
  static deserialize(data: unknown): WindowWall;
}

/**
 * 墙体输入输出处理类（WindowWall_IO 的别名）
 */
export declare const Wall_IO: typeof WindowWall_IO;

/**
 * 窗框参数接口
 * 定义窗框构件的配置参数
 */
export interface IWindowFrameParameters {
  // 具体字段需根据实际实现补充
  [key: string]: unknown;
}

/**
 * 窗框类
 * 表示窗户的框架结构
 * @alias Window
 */
export declare class WindowFrame {
  constructor(parameters: IWindowFrameParameters);
  // 类方法需根据实际实现补充
}

/**
 * 窗户类（WindowFrame 的别名）
 */
export declare const Window: typeof WindowFrame;

/**
 * 窗框输入输出处理类
 * 负责窗框的序列化和反序列化操作
 * @alias Window_IO
 */
export declare class WindowFrame_IO {
  static serialize(frame: WindowFrame): unknown;
  static deserialize(data: unknown): WindowFrame;
}

/**
 * 窗户输入输出处理类（WindowFrame_IO 的别名）
 */
export declare const Window_IO: typeof WindowFrame_IO;

/**
 * 窗台参数接口
 * 定义窗台构件的配置参数
 */
export interface IWindowSillParameters {
  // 具体字段需根据实际实现补充
  [key: string]: unknown;
}

/**
 * 窗台侧面类型枚举
 * 定义窗台侧面的样式类型
 */
export enum WindowSillSideType {
  // 枚举值需根据实际实现补充
}

/**
 * 窗台类
 * 表示窗户下方的窗台结构
 */
export declare class WindowSill {
  constructor(parameters: IWindowSillParameters);
  // 类方法需根据实际实现补充
}

/**
 * 窗台输入输出处理类
 * 负责窗台的序列化和反序列化操作
 */
export declare class WindowSill_IO {
  static serialize(sill: WindowSill): unknown;
  static deserialize(data: unknown): WindowSill;
}

/**
 * 窗顶类
 * 表示窗户上方的顶部结构
 */
export declare class WindowCeiling {
  // 类方法需根据实际实现补充
}

/**
 * 窗顶输入输出处理类
 * 负责窗顶的序列化和反序列化操作
 */
export declare class WindowCeiling_IO {
  static serialize(ceiling: WindowCeiling): unknown;
  static deserialize(data: unknown): WindowCeiling;
}

/**
 * 窗洞转储数据接口
 * 用于序列化/反序列化窗洞数据
 */
export interface IWindowHoleDump {
  // 具体字段需根据实际实现补充
  [key: string]: unknown;
}

/**
 * 窗洞参数接口
 * 定义窗洞的配置参数
 */
export interface IWindowHoleParameters {
  // 具体字段需根据实际实现补充
  [key: string]: unknown;
}

/**
 * 窗洞轮廓配置接口
 * 定义窗洞轮廓的形状配置
 */
export interface IWindowHoleProfileConfig {
  // 具体字段需根据实际实现补充
  [key: string]: unknown;
}

/**
 * 窗洞类
 * 表示墙体中用于安装窗户的开口
 */
export declare class WindowHole {
  constructor(parameters: IWindowHoleParameters);
  // 类方法需根据实际实现补充
}

/**
 * 窗洞输入输出处理类
 * 负责窗洞的序列化和反序列化操作
 */
export declare class WindowHole_IO {
  static serialize(hole: WindowHole): IWindowHoleDump;
  static deserialize(dump: IWindowHoleDump): WindowHole;
}

/**
 * 窗口凹槽参数接口
 * 定义窗口凹槽的配置参数
 */
export interface IWindowPocketParameters {
  // 具体字段需根据实际实现补充
  [key: string]: unknown;
}

/**
 * 窗口凹槽类
 * 表示窗户周围的凹陷区域
 */
export declare class WindowPocket {
  constructor(parameters: IWindowPocketParameters);
  // 类方法需根据实际实现补充
}

/**
 * 窗口凹槽输入输出处理类
 * 负责窗口凹槽的序列化和反序列化操作
 */
export declare class WindowPocket_IO {
  static serialize(pocket: WindowPocket): unknown;
  static deserialize(data: unknown): WindowPocket;
}

/**
 * 管理器类
 * 负责协调和管理所有建筑构件的创建与操作
 */
export declare class Manager {
  // 类方法需根据实际实现补充
}