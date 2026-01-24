import { Shape, ShapeType, PushSash, WinPolygon, SashUtil, Label, TextAlign } from './shapes';
import { Direction } from './direction';
import { DrawParams } from './draw-params';
import { EventType, SashSettings } from './events';
import { OpenToward, OpenDirection } from './hardware';
import { PolyId, HitResult, DisplayUtils } from './utils';
import paper from 'paper';

/**
 * 双扇窗配置数据接口
 */
interface DoubleSashJSON {
  /** 形状类型 */
  type: ShapeType;
  /** 多边形标识符 */
  polyId: any;
  /** 是否启用 */
  enabled: boolean;
  /** 偏移向量 */
  offvec: { x: number; y: number };
  /** 开启方向（内开/外开） */
  openToward: OpenToward;
  /** 是否为门 */
  isDoor: boolean;
  /** 是否带转向框 */
  withTurningFrame: boolean;
  /** 是否截断外框 */
  tf: boolean;
  /** 子窗扇配置数组 */
  sashes: any[];
}

/**
 * 双扇窗类 - 管理由两个窗扇组成的窗户单元
 * 支持双推拉窗、双纱窗等类型，可配置开启方向、门窗属性等
 */
export declare class DoubleSash extends Shape {
  /** 多边形标识符 */
  polyId: PolyId;
  
  /** 是否启用该双扇窗 */
  enabled: boolean;
  
  /** 可共存的形状类型列表 */
  coexistType: ShapeType[];
  
  /** 偏移向量 */
  offvec: paper.Point;
  
  /** 是否启用偏移向量 */
  offvecEnabled: boolean;
  
  /** 开启方向（内开/外开） */
  private _openToward: OpenToward;
  
  /** 是否可水平扩展 */
  expandHorizontally: boolean;
  
  /** 是否为门 */
  isDoor: boolean;
  
  /** 内部窗扇数组（包含禁用的） */
  private _sashes: PushSash[];
  
  /** 是否带转向框 */
  withTurningFrame: boolean;
  
  /** 是否截断外框 */
  truncateFrame: boolean;
  
  /** 文本标签 */
  label: Label;

  /**
   * 构造函数
   * @param parent 父级形状对象
   * @param polygon 窗户多边形区域
   * @param polyId 多边形标识符
   * @param type 形状类型，默认为双扇窗
   */
  constructor(
    parent: Shape,
    polygon: WinPolygon,
    polyId: PolyId,
    type?: ShapeType
  );

  /**
   * 初始化双扇窗 - 创建子窗扇并更新标签
   */
  initDoubleSash(): void;

  /**
   * 获取窗扇序列号（取第一个窗扇的序列号）
   */
  get serial(): string;

  /**
   * 获取同级的兄弟双扇窗（相同polyId但不同实例）
   */
  get siblingSash(): DoubleSash | undefined;

  /**
   * 获取/设置开启方向（内开/外开）
   */
  get openToward(): OpenToward;
  set openToward(value: OpenToward);

  /**
   * 获取子窗扇的类型（根据双扇窗类型推导）
   */
  get sashType(): ShapeType;

  /**
   * 获取/设置窗扇拼接方式
   */
  get jointWay(): any;
  set jointWay(value: any);

  /**
   * 判断所有子窗扇是否都高亮显示
   */
  get highlighted(): boolean;

  /**
   * 判断所有子窗扇是否都处于非活动状态
   */
  get inactive(): boolean;

  /**
   * 获取已启用的子窗扇数组
   */
  get sashes(): PushSash[];

  /**
   * 获取实际窗扇数量（优先统计普通窗扇类型）
   */
  get sashCount(): number;

  /**
   * 获取列数（固定返回2）
   */
  get columnCount(): number;

  /**
   * 判断是否有子窗扇被选中
   */
  get selected(): boolean;

  /**
   * 获取/设置窗扇开启状态
   */
  get opened(): boolean;
  set opened(value: boolean);

  /**
   * 获取中梃重叠数量（固定返回0）
   */
  get barOverlapsCount(): number;

  /**
   * 获取窗扇间隙数量（固定返回1）
   */
  get sashGapsCount(): number;

  /**
   * 获取窗扇分配方式标识（DS+I/O表示内开/外开）
   */
  get sashAssignWay(): string;

  /**
   * 获取固定宽度总和（所有设置了固定宽度的窗扇之和）
   */
  get fixedWidth(): number;

  /**
   * 获取固定列数（设置了固定宽度的窗扇数量）
   */
  get fixedColumnsCount(): number;

  /**
   * 删除双扇窗及其所有子窗扇
   */
  delete(): void;

  /**
   * 序列化为JSON对象
   */
  toJSON(): DoubleSashJSON;

  /**
   * 从JSON数据反序列化
   * @param json JSON配置对象
   */
  deserialize(json: DoubleSashJSON): this;

  /**
   * 更新多边形区域并重建子窗扇
   * @param polygon 新的多边形区域
   */
  updatePoly(polygon?: WinPolygon): void;

  /**
   * 更新标签文本和位置
   */
  updateLabel(): void;

  /**
   * 鼠标点击测试 - 检测点击位置并返回命中结果
   * @param point 点击点坐标
   * @param context 上下文对象（包含事件总线等）
   */
  hitBar(point: paper.Point, context: any): HitResult;

  /**
   * 高亮显示/取消高亮所有子窗扇
   * @param highlighted 是否高亮
   */
  highlight(highlighted: boolean): void;

  /**
   * 平移双扇窗及其所有子窗扇
   * @param vector 平移向量
   */
  translate(vector: paper.Point): void;

  /**
   * 隐藏辅助图形元素
   */
  hideAssist(): void;

  /**
   * 根据兄弟窗扇和全局配置调整开启方向
   * @param siblingSash 兄弟双扇窗（用于协调开启方向）
   */
  fitOpenToward(siblingSash?: DoubleSash): void;

  /**
   * 计算窗扇分割点（两个子窗扇的分界线中心点）
   */
  splitPoint(): paper.Point;

  /**
   * 创建/更新子窗扇 - 根据分割点将多边形分为两部分
   */
  create(): void;

  /**
   * 触发窗扇设置事件
   * @param sash 目标窗扇
   * @param context 上下文对象
   */
  private emitSashSetting(sash: PushSash, context: any): void;

  /**
   * 转换命中结果类型（将All转换为Sash）
   * @param hitResult 原始命中结果
   */
  private properHitResult(hitResult: HitResult): HitResult;

  /**
   * 计算指定索引窗扇的开启方向（左/右）
   * @param index 窗扇索引（0或1）
   */
  private calOpenDirection(index: number): OpenDirection;

  /**
   * 获取Z轴渲染顺序索引
   */
  get Zindex(): number;
}