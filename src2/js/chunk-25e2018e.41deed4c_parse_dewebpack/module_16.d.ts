/**
 * 推拉窗/门脚本编译模块
 * 负责编译推拉类型的窗扇配置，包括轨道、碰撞、锁具等附件
 */

import { Utils } from './utils';
import { AddonCCType } from './addon-types';
import { scriptTypeEnum } from './script-types';
import { CompileScriptInnerSash } from './compile-script-inner-sash';

/**
 * 推拉位置枚举
 * 定义推拉窗扇的各种位置类型
 */
export enum SlidePositionType {
  /** 上方位置 */
  up = 'up',
  /** 下方位置 */
  down = 'down',
  /** 边缘/光企位置 */
  edge = 'edge',
  /** 单勾企位置 */
  single = 'single',
  /** 双勾企位置 */
  double = 'double',
  /** 左侧碰撞位置 */
  collisionLeft = 'collisionLeft',
  /** 右侧碰撞位置 */
  collisionRight = 'collisionRight'
}

/**
 * 推拉窗扇基础数据接口
 */
interface SlideBaseData {
  /** 窗扇数量 */
  sashCount: number;
  /** 开启数量 */
  columnCount: number;
  /** 是否为门 */
  isDoor: boolean;
  /** 窗扇编号 */
  sashNumber: number;
  /** 是否固定扇 */
  isFixed: boolean;
  /** 安装位置 */
  installPosition?: string;
  /** 推拉位置类型 */
  slidePosType?: SlidePositionType[] | { width?: SlidePositionType[]; height?: SlidePositionType[] };
}

/**
 * 窗扇条数据接口
 */
interface SashBarData extends SlideBaseData {
  /** 推拉位置 */
  slidePosition?: SlidePositionType;
  /** 推拉分配方式 */
  sashAssignWay: string;
  /** 轨道编号 */
  trackNo: number;
  /** 宽度 */
  width?: number;
  /** 高度 */
  height?: number;
  /** 类型 */
  type?: string;
}

/**
 * 玻璃数据接口
 */
interface GlassData extends SlideBaseData {
  /** 推拉分配方式 */
  sashAssignWay: string;
  /** 轨道编号 */
  trackNo: number;
}

/**
 * 附件数据接口
 */
interface AddonData extends SlideBaseData {
  /** 附件类型 */
  type: AddonCCType;
  /** 推拉分配方式 */
  sashAssignWay: string;
  /** 重叠位数量 */
  barOverlapsCount: number;
  /** 推拉位置 */
  slidePosition?: SlidePositionType;
  /** 尺寸 */
  cc?: number;
  /** 是否为月牙锁 */
  isCrescentLock?: boolean;
  /** 是否为纱扇 */
  isScreen?: boolean;
  /** 附件编号 */
  code?: string;
  /** 是否为装饰锁 */
  decorationLock?: boolean;
  /** 附件名称 */
  name?: string;
  /** 安装方向 */
  direction?: number;
}

/**
 * 编译结果接口
 */
interface CompileResult {
  /** 附件列表 */
  addon: unknown[];
}

/**
 * 窗扇附件数据接口
 */
interface SashAddonData {
  /** 附件类型 */
  type: string;
}

/**
 * 推拉窗/门脚本编译器
 * 继承自内窗扇编译器，专门处理推拉类型的配置编译
 */
export declare class CompileScriptSlide extends CompileScriptInnerSash {
  /**
   * 获取脚本类型
   * @returns 返回推拉类型枚举值
   */
  get scriptType(): scriptTypeEnum;

  /**
   * 获取窗扇CC类型
   * @returns 返回窗扇类型数组
   */
  get sashCCType(): string[];

  /**
   * 获取附件类型
   * @returns 返回推拉附件类型
   */
  get addonType(): AddonCCType;

  /**
   * 编译内窗扇的条材和附件
   * 处理碰撞、上下方、边缘、单双勾企、锁具等各类附件
   * @param sashBars - 窗扇条数据数组
   * @param addons - 附件数据数组
   * @param result - 编译结果对象
   */
  compileInnerSashBars(
    sashBars: SashBarData[],
    addons: AddonData[],
    result: CompileResult
  ): void;

  /**
   * 模拟窗扇附件数据
   * 将附件类型标记为推拉类型
   * @param data - 输入数据
   * @returns 返回处理后的附件数据数组
   */
  mockSashAddon(data: unknown): SashAddonData[];

  /**
   * 加载窗扇条变量到编译器
   * 设置推拉方式、轨道号、扇宽、扇高等参数
   * @param barData - 窗扇条数据
   */
  loadBarVar(barData: SashBarData): void;

  /**
   * 加载玻璃变量到编译器
   * 设置推拉方式、轨道号等参数
   * @param glassData - 玻璃数据
   */
  loadGlassVar(glassData: GlassData): void;

  /**
   * 加载玻璃宽度相关变量
   * 设置宽度方向的位置信息
   * @param glassData - 玻璃数据
   */
  loadGlassWidthVar(glassData: GlassData): void;

  /**
   * 加载玻璃高度相关变量
   * 设置高度方向的位置信息
   * @param glassData - 玻璃数据
   */
  loadGlassHeightVar(glassData: GlassData): void;

  /**
   * 加载附件变量到编译器
   * 设置推拉方式、重叠位数量、固定状态、锁具类型等参数
   * @param addonData - 附件数据
   */
  loadAddonVar(addonData: AddonData): void;

  /**
   * 加载通用变量到编译器
   * 设置扇数、开数、门窗类型、扇号、固定状态、安装位置、位置类型等
   * @param data - 基础数据
   */
  loadVar(data: SlideBaseData): void;

  /**
   * 获取推拉位置类型的名称组合
   * 将位置数组转换为排序后的名称字符串（如"上方-勾企"）
   * @param posTypes - 位置类型数组
   * @returns 返回格式化的位置名称字符串
   */
  slidePosTypeName(posTypes: SlidePositionType[]): string;

  /**
   * 位置名称排序函数
   * 按预定义顺序排序位置名称
   * @param name1 - 第一个位置名称
   * @param name2 - 第二个位置名称
   * @returns 返回排序比较结果
   */
  positionNameSort(name1: string, name2: string): number;

  /**
   * 获取位置类型的中文名称
   * @param posType - 位置类型枚举值
   * @returns 返回对应的中文名称（无/上方/下方/光企/勾企/对碰）
   */
  positionName(posType: SlidePositionType): string;
}