/**
 * BarModifier - 门窗横梁/竖梃（Mullion）的属性修改器类
 * 用于管理和修改门窗系统中的分隔条（bar）的各种属性
 */

import type Flatten from 'flatten-js';
import type { MullionManager } from './mullion-manager';
import type { Frame, Sash, Glass, AlignTypeEnum } from './frame-types';
import type { 
  EndpointSplitWay, 
  EqualSplitType, 
  EqualSplitSide 
} from './split-types';
import type { 
  CutLine, 
  SpinLine, 
  SemiSegmentPro, 
  SemiArcPro, 
  SemiArc, 
  SimpleInnerArc, 
  HalfWheel, 
  CompoundLineCircle,
  CenterIntersectType 
} from './cutline-types';
import type { PolyId } from './geometry-types';
import type { MulChordHeightDimInfo } from './dimension-types';
import type { View } from './view-types';

/**
 * 横梁/竖梃修改器类
 * 提供对门窗分隔条的全面属性访问和修改能力
 */
export declare class BarModifier {
  /** 横梁管理器引用 */
  private readonly mm: MullionManager;
  
  /** 多边形ID，标识该横梁在几何结构中的位置 */
  private readonly polyId: PolyId;
  
  /** 中心点坐标 */
  private readonly cpt: Flatten.Point;
  
  /** 视图引用，用于界面刷新 */
  private readonly view: View;

  /**
   * 构造函数
   * @param mm - 横梁管理器
   * @param polyId - 多边形标识
   * @param cpt - 中心点
   * @param view - 视图对象
   */
  constructor(
    mm: MullionManager, 
    polyId: PolyId, 
    cpt: Flatten.Point, 
    view: View
  );

  /**
   * 分割方式
   * 控制横梁端点的拼接方式（左/上拼接、右/下拼接或无拼接）
   */
  get split(): EndpointSplitWay;
  set split(value: EndpointSplitWay);

  /**
   * 横梁在分割线数组中的索引
   */
  get idx(): number;

  /**
   * 是否为圆弧形横梁
   */
  get isArc(): boolean;

  /**
   * 弦高标注是否显示
   * 仅对圆弧形横梁有效
   */
  get chordHeightDimShow(): boolean;
  set chordHeightDimShow(value: boolean);

  /**
   * 型材尺寸（横梁宽度）
   */
  get profileSize(): number;
  set profileSize(value: number);

  /**
   * 横梁类型
   * @returns "bar" 或具体的切割线类型
   */
  get type(): string;

  /**
   * 是否启用等分模式
   * 等分模式下横梁会自动均匀分割空间
   */
  get equalSplit(): boolean;
  set equalSplit(value: boolean);

  /**
   * 等分侧边设置
   * 指定等分应用于哪一侧（两侧/单侧）
   */
  get equalSplitSide(): EqualSplitSide;
  set equalSplitSide(value: EqualSplitSide);

  /**
   * 是否为垂直方向
   * 基于角度判断（45°-135° 或 225°-315° 为垂直）
   */
  get isVertical(): boolean;

  /**
   * 横梁角度（度数）
   * 范围：0-360
   */
  get angle(): number;
  set angle(value: number);

  /**
   * 旋转线/半段型材的宽度
   * 仅对 SpinLine 和 SemiSegmentPro 类型有效
   */
  get width(): number;
  set width(value: number);

  /**
   * 旋转线/半段型材的高度
   * 仅对 SpinLine 和 SemiSegmentPro 类型有效
   */
  get height(): number;
  set height(value: number);

  /**
   * 旋转方向（逆时针）
   * true: 逆时针 (CCW), false: 顺时针 (CW)
   * 仅对 SpinLine 类型有效
   */
  get orien(): boolean;
  set orien(value: boolean);

  /**
   * 侧边选择
   * 用于指定旋转线或复合圆弧线的作用侧
   */
  get side(): number;
  set side(value: number);

  /**
   * 切割线对象
   * 返回实际的切割线实例（如存在）
   */
  get cutLine(): CutLine | undefined;

  /**
   * 简单内弧宽度
   * 仅对 SimpleInnerArc 类型有效，返回 -1 表示不适用
   */
  get simpleInnerArcWidth(): number;
  set simpleInnerArcWidth(value: number);

  /**
   * 简单内弧高度
   * 仅对 SimpleInnerArc 类型有效，返回 -1 表示不适用
   */
  get simpleInnerArcHeight(): number;
  set simpleInnerArcHeight(value: number);

  /**
   * 对齐类型
   * 控制横梁的标注对齐方式（左对齐/居中/右对齐）
   */
  get alignType(): AlignTypeEnum;
  set alignType(value: AlignTypeEnum);

  /**
   * 是否与外弧共享圆心
   * 仅对圆弧型材（SemiArcPro/SemiArc）有效
   */
  get sameWithOuterArcCenter(): boolean;
  set sameWithOuterArcCenter(value: boolean);

  /**
   * 弦长（毫米）
   * 圆弧的弦长度，最小值 250mm
   * 仅对 SemiArcPro/SemiArc 类型有效，返回 -1 表示不适用
   */
  get chordLength(): number;
  set chordLength(value: number);

  /**
   * 弦高（毫米）
   * 圆弧的矢高，最小值 100mm
   * 仅对 SemiArcPro/SemiArc 类型有效，返回 -1 表示不适用
   */
  get chordHeight(): number;
  set chordHeight(value: number);

  /**
   * 圆弧偏移量
   * 仅对 SemiArcPro 类型有效
   */
  get offsetOfArcs(): number | undefined;
  set offsetOfArcs(value: number | undefined);

  /**
   * 是否隐藏侧边横撑
   * 控制圆弧或多段型材的侧边横撑显示
   */
  get sideCrosstiesHidden(): boolean;
  set sideCrosstiesHidden(value: boolean);

  /**
   * 侧边横撑是否水平布置
   * 仅对 SemiArcPro 类型有效
   */
  get horizontallySideCrossties(): boolean;
  set horizontallySideCrossties(value: boolean);

  /**
   * 中间横撑数量
   * 适用于多种圆弧和多段型材类型
   * 返回 -1 表示不适用
   */
  get middleCrosstiesCount(): number;
  set middleCrosstiesCount(value: number);

  /**
   * 中间横撑比例
   * 格式：以"-"分隔的数字字符串，如 "1-2-1"
   * 仅对 SemiArcPro/SemiSegmentPro 类型有效
   */
  get middleCrosstiesRatio(): string;
  set middleCrosstiesRatio(value: string);

  /**
   * 中心交叉类型
   * 控制半轮形横梁的中心交叉方式
   * 仅对 HalfWheel 类型有效
   */
  get centerIntersectType(): CenterIntersectType;
  set centerIntersectType(value: CenterIntersectType);

  /**
   * 线条宽度（型材宽度）
   */
  get lineWidth(): number;
  set lineWidth(value: number);

  /**
   * 是否为加强型
   * 加强型横梁使用更宽的型材尺寸
   */
  get reinforced(): boolean;
  set reinforced(value: boolean);
}