/**
 * ShortkeyHelper - 快捷键管理助手类
 * 负责管理工具类型与键盘快捷键之间的映射关系
 * 支持同一快捷键循环切换多个工具
 */

import { ToolType } from './ToolType'; // 假设 module 60 导出 ToolType

/**
 * 快捷键配置接口
 */
export interface ShortKeyConfig {
  /** 平移工具 */
  p: string[];
  /** 删除 */
  del: string[];
  /** 框架工具 */
  f: string[];
  /** 窗扇工具 */
  s: string[];
  /** 中挺工具 */
  v: string[];
  /** 墙体工具 */
  w: string[];
  /** 滑动/折叠工具 */
  d: string[];
  /** 连接器工具 */
  c: string[];
  /** 标注/备注工具 */
  e: string[];
  /** 填充工具 */
  t: string[];
  /** 装饰条工具 */
  b: string[];
  /** 型材结构工具 */
  x: string[];
  /** 撤销 */
  undo: string[];
}

/**
 * 快捷键管理器
 * 提供工具类型与键盘快捷键的双向映射和循环切换功能
 */
export class ShortkeyHelper {
  /** 快捷键到工具类型数组的映射表 */
  private keyMap: Map<string, ToolType[]>;
  
  /** 上一次按下的快捷键 */
  private prevKey: string;
  
  /** 上一个工具是否为临时工具 */
  private isTempToolPrev: boolean;
  
  /** 当前快捷键的循环计数器 */
  private keyCounter: number;
  
  /** 当前激活的工具类型 */
  private currentTool: ToolType;

  /**
   * 获取快捷键配置映射
   */
  public static get shortKeys(): ShortKeyConfig {
    return {
      p: ['p'],
      del: ['del'],
      f: ['f'],
      s: ['s'],
      v: ['v'],
      w: ['w'],
      d: ['d'],
      c: ['c'],
      e: ['e'],
      t: ['t'],
      b: ['b'],
      x: ['x'],
      undo: ['ctrl', 'z']
    };
  }

  constructor() {
    this.keyMap = new Map<string, ToolType[]>();
    this.prevKey = 'p';
    this.isTempToolPrev = false;
    this.keyCounter = 0;
    this.currentTool = ToolType.pan;
    this.setDefault();
  }

  /**
   * 设置默认的快捷键映射
   * 将各类工具按功能分组绑定到对应的快捷键
   */
  public setDefault(): void {
    this.keyMap.clear();

    // p - 平移和选择工具
    this.keyMap.set('p', [
      ToolType.pan,
      ToolType.squareSelect
    ]);

    // f - 各种框架形状工具
    this.keyMap.set('f', [
      ToolType.frame_scalable,
      ToolType.frame_springline,
      ToolType.door,
      ToolType.frame_half_kfc,
      ToolType.frame_kfc,
      ToolType.frame_kfc2,
      ToolType.frame_kfc4,
      ToolType.frame_circle,
      ToolType.frame_three_dimensional_arc,
      ToolType.frame_parallelogram,
      ToolType.frame_half_circle,
      ToolType.frame_quarter_circle,
      ToolType.frame_gothic,
      ToolType.frame_onion,
      ToolType.frame_octagon,
      ToolType.frame_springline_flanker,
      ToolType.frame_isosceles_triangle,
      ToolType.frame_hexagon,
      ToolType.frame_hexagon2,
      ToolType.frame_diamond,
      ToolType.frame_angled_pentagon,
      ToolType.frame_peak_pentagon,
      ToolType.frame_trapezoid,
      ToolType.frame_quarter_arch,
      ToolType.frame_hollow_side,
      ToolType.frame_hollow,
      ToolType.frame_convex,
      ToolType.frame_quatrefoil,
      ToolType.frame_extended_partial_arch,
      ToolType.frame_triangle,
      ToolType.frame_ear,
      ToolType.frame_pointed_ear,
      ToolType.frame_double_ears,
      ToolType.frame_ear2,
      ToolType.frame_wave,
      ToolType.frame_mosque,
      ToolType.frame_polygon
    ]);

    // s - 窗扇和纱窗工具
    this.keyMap.set('s', [
      ToolType.sash,
      ToolType.screen,
      ToolType.antiTheft,
      ToolType.innerSashAndScreen,
      ToolType.downWithSlideSash,
      ToolType.doubleSash,
      ToolType.doubleScreen,
      ToolType.kfcSash,
      ToolType.doubleKfcSash,
      ToolType.shadePushSash,
      ToolType.doubleShadePushSash,
      ToolType.guardSash
    ]);

    // w - 墙体工具
    this.keyMap.set('w', [ToolType.wall]);

    // v - 中挺/分隔条工具
    this.keyMap.set('v', [
      ToolType.mullion_cross_line,
      ToolType.mullion_cross_line_equal_two,
      ToolType.mullion_half_wheel,
      ToolType.mullion_semi_arc,
      ToolType.mullion_inner_arc,
      ToolType.mullion_semi_arc_pro,
      ToolType.mullion_semi_segment_pro,
      ToolType.mullion_spin,
      ToolType.mullion_compound_square,
      ToolType.mullion_compound_x_square,
      ToolType.mullion_compound_diamond,
      ToolType.mullion_compound_circle,
      ToolType.mullion_compound_hexagon,
      ToolType.mullion_half_hexagon,
      ToolType.mullion_compound_rectangle_single,
      ToolType.mullion_compound_rectangle_double,
      ToolType.mullion_compound_long_octagon,
      ToolType.mullion_compound_double_octagon,
      ToolType.mullion_wave
    ]);

    // d - 滑动和折叠工具
    this.keyMap.set('d', [
      ToolType.slide,
      ToolType.foldSash,
      ToolType.foldScreen,
      ToolType.foldShade
    ]);

    // c - 连接器工具
    this.keyMap.set('c', [
      ToolType.connerJoiner,
      ToolType.connector,
      ToolType.wallCornerJoiner,
      ToolType.panoramicCornerJoiner
    ]);

    // e - 标注和备注工具
    this.keyMap.set('e', [
      ToolType.extraDimHorizontal,
      ToolType.extraDimVertical,
      ToolType.extraDimArbitrary,
      ToolType.extraDimRadius,
      ToolType.extraDimAngle,
      ToolType.note,
      ToolType.extraManImage,
      ToolType.extraWomenImage
    ]);

    // t - 填充物工具
    this.keyMap.set('t', [
      ToolType.fillerGlass,
      ToolType.fillerScreen,
      ToolType.fillerPanel,
      ToolType.fillerShade,
      ToolType.fillerEmpty,
      ToolType.glassHole
    ]);

    // b - 装饰条工具
    this.keyMap.set('b', [
      ToolType.decoration_bar_chinese,
      ToolType.decoration_bar_chinese2,
      ToolType.decoration_bar_prairie,
      ToolType.decoration_bar_colonial,
      ToolType.decoration_bar_diamond,
      ToolType.decoration_bar_semi_arc,
      ToolType.decoration_bar_chinese3,
      ToolType.decoration_bar_chinese4
    ]);

    // x - 型材结构工具
    this.keyMap.set('x', [ToolType.profileStruct]);
  }

  /**
   * 根据按键获取对应的工具类型
   * 支持同一按键循环切换多个工具
   * 
   * @param key - 按下的快捷键
   * @returns 对应的工具类型，如果未找到则返回 none
   */
  public getKey(key: string): ToolType {
    const currentKey = key;

    // 判断是否连续按下同一个键
    if (currentKey === this.prevKey) {
      if (!this.isTempToolPrev) {
        this.keyCounter++;
      }
    } else {
      this.keyCounter = 0;
      this.prevKey = currentKey;
    }

    const tools = this.keyMap.get(currentKey);
    
    if (tools === undefined) {
      return ToolType.none;
    }

    this.isTempToolPrev = false;
    const index = this.keyCounter % tools.length;
    this.currentTool = tools[index];
    
    return tools[index];
  }

  /**
   * 同步计数器状态
   * 当外部设置工具时，同步内部计数器以保持状态一致
   * 
   * @param tool - 当前激活的工具类型
   */
  public syncCounter(tool: ToolType): void {
    this.currentTool = tool;

    if (this.isTempTool(tool)) {
      this.isTempToolPrev = true;
    } else {
      this.isTempToolPrev = false;
      
      this.keyMap.forEach((tools, key) => {
        const index = tools.findIndex(t => t === tool);
        
        if (index !== -1) {
          this.prevKey = key;
          this.keyCounter = index;
        }
      });
    }
  }

  /**
   * 判断是否为临时工具
   * 临时工具不参与快捷键循环机制
   * 
   * @param tool - 要判断的工具类型
   * @returns 是否为临时工具
   */
  public isTempTool(tool: ToolType): boolean {
    // 平移工具被视为临时工具
    if (tool === ToolType.pan) {
      return true;
    }

    let isInKeyMap = false;

    this.keyMap.forEach((tools) => {
      if (tools.findIndex(t => t === tool) !== -1) {
        isInKeyMap = true;
      }
    });

    return !isInKeyMap;
  }
}