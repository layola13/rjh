/**
 * 防盗脚本编译模块
 * Module: module_17
 * Original ID: 17
 */

import { Utils } from './utils';
import { CompileBars } from './compile-bars';
import { CompileComponent } from './compile-component';
import { ErrorTag, ErrorMessage } from './error';
import { CompileAddons, AddonCCType } from './compile-addons';
import { scriptPurposeEnum, scriptTypeEnum } from './enums';

/**
 * 脚本类型枚举
 */
export enum ScriptType {
  /** 窗扇类型 */
  SASH = 'sash'
}

/**
 * 脚本用途枚举
 */
export enum ScriptPurpose {
  /** 尺寸脚本 */
  SIZE = 'size',
  /** 杆件脚本 */
  BAR = 'bar'
}

/**
 * 防盗CC类型
 */
export type AntitheftCCType = 'antitheft' | 'antitheftMullion';

/**
 * 尺寸类型枚举
 */
export enum SizeType {
  /** 宽度 */
  WIDTH = 0,
  /** 高度 */
  HEIGHT = 1
}

/**
 * 脚本配置接口
 */
export interface ScriptConfig {
  /** 脚本类型 */
  script_type: string;
  /** 脚本用途 */
  script_purpose: ScriptPurpose;
  /** CC类型 */
  type: string;
  /** 条件表达式 */
  condition?: string;
  /** 长度表达式 */
  length?: string;
  /** 忽略位置类型 */
  ignorePosType?: boolean;
  /** 忽略侧面位置 */
  ignoreSidePosition?: boolean;
  /** 忽略窗扇分配方式 */
  ignoreSashAssignWay?: boolean;
  /** 忽略窗扇编号 */
  ignoreSashNum?: boolean;
  /** 尺寸计算时忽略位置类型 */
  ignorePosTypeForSize?: boolean;
  /** 尺寸计算时忽略窗扇分配方式 */
  ignoreSashAssignWayForSize?: boolean;
  /** 尺寸计算时忽略窗扇编号 */
  ignoreSashNumForSize?: boolean;
  /** 尺寸计算时忽略尺寸类型 */
  ignoreSizeTypeForSize?: boolean;
}

/**
 * 窗扇尺寸信息接口
 */
export interface SashSizeInfo {
  /** 唯一标识 */
  id: string;
  /** 框架UID */
  frameUid: string;
  /** 框架ID */
  frameId: string;
  /** CC类型 */
  type: string;
  /** 窗扇分配方式 */
  sashAssignWay: string;
  /** 是否可开启 */
  openable: boolean;
  /** 是否有窗扇 */
  withSash: boolean;
  /** 尺寸类型 (0=宽度, 1=高度) */
  sizeType: SizeType;
  /** CC对象 */
  cc: any;
  /** AA对象 */
  aa: any;
}

/**
 * 防盗尺寸结果接口
 */
export interface AntitheftSize {
  /** 唯一标识 */
  id: string;
  /** 框架UID */
  frameUid: string;
  /** CC类型 */
  type: string;
  /** 窗扇分配方式 */
  sashAssignWay: string;
  /** 是否可开启 */
  openable: boolean;
  /** 是否有窗扇 */
  withSash: boolean;
  /** 宿主类型 */
  hostType: string;
  /** 宽度 */
  width?: number;
  /** 高度 */
  height?: number;
  /** 宽度表达式 */
  widthExpression?: string;
  /** 高度表达式 */
  heightExpression?: string;
}

/**
 * 编译结果接口
 */
export interface CompileResult {
  /** 杆件数据 */
  bar: any[];
  /** 玻璃数据 */
  glass: any[];
  /** 附件数据 */
  addon: any[];
  /** 附加信息 */
  addition: AntitheftSize[];
}

/**
 * 防盗脚本编译器类
 * 负责编译防盗相关的脚本配置，生成杆件、附件和尺寸信息
 */
export declare class CompileScriptAntitheft extends CompileComponent {
  /** 杆件编译器 */
  readonly compileBars: CompileBars;
  
  /** 附件编译器 */
  readonly compileAddons: CompileAddons;

  /**
   * 构造函数
   * @param compiler - 编译器实例
   * @param iccBar - ICC杆件处理器
   */
  constructor(compiler: any, iccBar: any);

  /**
   * 编译防盗脚本
   * @param scripts - 脚本配置数组
   * @param sashes - 窗扇尺寸信息数组
   * @returns 编译结果，包含杆件、玻璃、附件和附加信息
   * @throws {ErrorTag} 当存在杆件脚本但缺少尺寸脚本时
   * @throws {ErrorTag} 当宽度或高度脚本缺失时
   */
  compile(scripts: ScriptConfig[], sashes: SashSizeInfo[]): CompileResult;

  /**
   * 处理脚本配置，设置忽略标志
   * @param scripts - 杆件脚本配置数组
   * @returns 处理后的脚本配置数组
   */
  handleScript(scripts: ScriptConfig[]): ScriptConfig[];

  /**
   * 处理尺寸脚本配置，设置尺寸相关的忽略标志
   * @param scripts - 尺寸脚本配置数组
   * @returns 处理后的脚本配置数组
   */
  handleSizeScript(scripts: ScriptConfig[]): ScriptConfig[];

  /**
   * 计算防盗尺寸
   * @param sashes - 窗扇尺寸信息数组
   * @param sizeScripts - 尺寸脚本配置数组
   * @returns 防盗尺寸结果数组
   */
  calcAntitheftSize(sashes: SashSizeInfo[], sizeScripts: ScriptConfig[]): AntitheftSize[];

  /**
   * 加载杆件变量到编译器上下文
   * @param sash - 窗扇尺寸信息
   */
  loadBarVar(sash: SashSizeInfo): void;

  /**
   * 加载附件变量到编译器上下文
   * @param sash - 窗扇尺寸信息
   */
  loadAddonVar(sash: SashSizeInfo): void;

  /**
   * 加载通用变量到编译器上下文
   * @param sash - 窗扇尺寸信息
   */
  loadVar(sash: SashSizeInfo): void;

  /**
   * 获取脚本类型
   * @returns 脚本类型（窗扇）
   */
  get scriptType(): string;

  /**
   * 获取支持的窗扇CC类型列表
   * @returns 防盗CC类型数组
   */
  get sashCCType(): AntitheftCCType[];
}