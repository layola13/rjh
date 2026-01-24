import { Direction } from './Direction';
import { ShapeType } from './ShapeType';
import { OpenDirection } from './OpenDirection';
import { PartitionWidth } from './PartitionWidth';

/**
 * 滑动窗配置项管理类（单例模式）
 * 管理所有预定义的滑动窗布局配置
 */
export declare class SlideOptions {
  /**
   * 单例实例
   */
  private static instance?: SlideOptions;

  /**
   * 获取单例实例
   */
  static get Ins(): SlideOptions;

  /**
   * 所有预定义的滑动窗配置选项
   */
  readonly options: SlideOption[];

  constructor();

  /**
   * 配置项0: 2轨2列，右开+左开
   */
  private option0(): SlideOption;

  /**
   * 配置项1: 3轨2列，右开+左开+右纱窗
   */
  private option1(): SlideOption;

  /**
   * 配置项2: 2轨4列，复杂对开配置
   */
  private option2(): SlideOption;

  /**
   * 配置项3: 3轨4列，带纱窗的复杂配置
   */
  private option3(): SlideOption;

  /**
   * 配置项4: 垂直滑动，2轨3列，带固定扇
   */
  private option4(): SlideOption;

  /**
   * 配置项5: 2轨3列，多扇右开+左开
   */
  private option5(): SlideOption;

  /**
   * 配置项6: 3轨3列，带纱窗的混合配置
   */
  private option6(): SlideOption;

  /**
   * 配置项7: 2轨2列，纯纱窗配置
   */
  private option7(): SlideOption;

  /**
   * 配置项8: 3轨2列，右开+左开+左纱窗
   */
  private option8(): SlideOption;

  /**
   * 配置项9: 2轨4列，纯纱窗复杂配置
   */
  private option9(): SlideOption;

  /**
   * 配置项10: 垂直滑动纱窗，2轨3列
   */
  private option10(): SlideOption;

  /**
   * 配置项11-158: 其他预定义配置（省略详细注释）
   */
  private option11(): SlideOption;
  private option12(): SlideOption;
  private option13(): SlideOption;
  private option14(): SlideOption;
  private option15(): SlideOption;
  private option16(): SlideOption;
  private option17(): SlideOption;
  private option18(): SlideOption;
  private option19(): SlideOption;
  private option20(): SlideOption;
  private option21(): SlideOption;
  private option22(): SlideOption;
  private option23(): SlideOption;
  private option24(): SlideOption;
  private option25(): SlideOption;
  private option26(): SlideOption;
  private option27(): SlideOption;
  private option28(): SlideOption;
  private option29(): SlideOption;
  private option30(): SlideOption;
  private option31(): SlideOption;
  private option32(): SlideOption;
  private option33(): SlideOption;
  private option34(): SlideOption;
  private option35(): SlideOption;
  private option36(): SlideOption;
  private option37(): SlideOption;
  private option38(): SlideOption;
  private option39(): SlideOption;
  private option40(): SlideOption;
  private option41(): SlideOption;
  private option42(): SlideOption;
  private option43(): SlideOption;
  private option44(): SlideOption;
  private option45(): SlideOption;
  private option46(): SlideOption;
  private option47(): SlideOption;
  private option48(): SlideOption;
  private option49(): SlideOption;
  private option50(): SlideOption;
  private option51(): SlideOption;
  private option52(): SlideOption;
  private option53(): SlideOption;
  private option54(): SlideOption;
  private option55(): SlideOption;
  private option56(): SlideOption;
  private option57(): SlideOption;
  private option58(): SlideOption;
  private option59(): SlideOption;
  private option60(): SlideOption;
  private option61(): SlideOption;
  private option62(): SlideOption;
  private option63(): SlideOption;
  private option64(): SlideOption;
  private option65(): SlideOption;
  private option66(): SlideOption;
  private option67(): SlideOption;
  private option68(): SlideOption;
  private option69(): SlideOption;
  private option70(): SlideOption;
  private option71(): SlideOption;
  private option72(): SlideOption;
  private option73(): SlideOption;
  private option74(): SlideOption;
  private option75(): SlideOption;
  private option76(): SlideOption;
  private option77(): SlideOption;
  private option78(): SlideOption;
  private option79(): SlideOption;
  private option80(): SlideOption;
  private option81(): SlideOption;
  private option82(): SlideOption;
  private option83(): SlideOption;
  private option84(): SlideOption;
  private option85(): SlideOption;
  private option86(): SlideOption;
  private option87(): SlideOption;
  private option88(): SlideOption;
  private option89(): SlideOption;
  private option90(): SlideOption;
  private option91(): SlideOption;
  private option92(): SlideOption;
  private option93(): SlideOption;
  private option94(): SlideOption;
  private option95(): SlideOption;
  private option96(): SlideOption;
  private option97(): SlideOption;
  private option98(): SlideOption;
  private option99(): SlideOption;
  private option100(): SlideOption;
  private option101(): SlideOption;
  private option102(): SlideOption;
  private option103(): SlideOption;
  private option104(): SlideOption;
  private option105(): SlideOption;
  private option106(): SlideOption;
  private option107(): SlideOption;
  private option108(): SlideOption;
  private option109(): SlideOption;
  private option110(): SlideOption;
  private option111(): SlideOption;
  private option112(): SlideOption;
  private option113(): SlideOption;
  private option114(): SlideOption;
  private option115(): SlideOption;
  private option116(): SlideOption;
  private option117(): SlideOption;
  private option118(): SlideOption;
  private option119(): SlideOption;
  private option120(): SlideOption;
  private option121(): SlideOption;
  private option122(): SlideOption;
  private option123(): SlideOption;
  private option124(): SlideOption;
  private option125(): SlideOption;
  private option126(): SlideOption;
  private option127(): SlideOption;
  private option128(): SlideOption;
  private option129(): SlideOption;
  private option130(): SlideOption;
  private option131(): SlideOption;
  private option132(): SlideOption;
  private option133(): SlideOption;
  private option134(): SlideOption;
  private option135(): SlideOption;
  private option136(): SlideOption;
  private option137(): SlideOption;
  private option138(): SlideOption;
  private option139(): SlideOption;
  private option140(): SlideOption;
  private option141(): SlideOption;
  private option142(): SlideOption;
  private option143(): SlideOption;
  private option144(): SlideOption;
  private option145(): SlideOption;
  private option146(): SlideOption;
  private option147(): SlideOption;
  private option148(): SlideOption;
  private option149(): SlideOption;
  private option150(): SlideOption;
  private option151(): SlideOption;
  private option152(): SlideOption;
  private option153(): SlideOption;
  private option154(): SlideOption;
  private option155(): SlideOption;
  private option156(): SlideOption;
  private option157(): SlideOption;
  private option158(): SlideOption;

  /**
   * 初始化二维数组占位符
   * @param trackCount 轨道数量（行数）
   * @param columnCount 列数
   * @returns 初始化的二维数组
   */
  private initHolders(trackCount: number, columnCount: number): Array<Array<SlideItem | undefined>>;
}

/**
 * 固定扇位置信息
 */
interface FixedSashPosition {
  /** 轨道索引 */
  trackIndex: number;
  /** 列索引 */
  columnIndex: number;
  /** 固定宽度值 */
  fixedWidth: number;
}

/**
 * 滑动组件配置接口
 */
interface SlideComponentConfig {
  /** 扇配置的二维数组 */
  sashes: Array<Array<SashPartition | undefined>>;
}

/**
 * 扇分区配置
 */
interface SashPartition {
  /** 宽度类型 */
  widthType: PartitionWidth;
  /** 宽度值（比例或具体数值） */
  widthValue: number;
  /** 是否为次要扇 */
  isSecondary: boolean;
}

/**
 * 滑动窗配置选项类
 * 表示一个完整的滑动窗布局配置
 */
export declare class SlideOption {
  /**
   * 滑动窗项目的二维数组
   * 第一维：轨道索引，第二维：列索引
   */
  items: Array<Array<SlideItem | undefined>>;

  /**
   * 是否为垂直滑动
   */
  isVerticalSlide: boolean;

  /**
   * 固定扇位置列表
   */
  fixedSashes: FixedSashPosition[];

  /**
   * 是否使用月牙锁
   */
  useCrescentLock: boolean;

  constructor();

  /**
   * 获取列数
   */
  get columnsCount(): number;

  /**
   * 获取轨道数量
   */
  get tracksCount(): number;

  /**
   * 是否仅包含纱窗（不含玻璃扇）
   */
  get screenOnly(): boolean;

  /**
   * 获取扇的数量（不含隐藏扇）
   */
  get sashCount(): number;

  /**
   * 生成序列化字符串
   * 格式：轨道内扇编码用连字符分隔，垂直滑动加"|V"后缀
   */
  get serial(): string;

  /**
   * 生成CC系统中的序列化字符串
   * 包含主扇和次扇的位置关系编码
   */
  get serialInCC(): string;

  /**
   * 获取锁条覆盖物数量
   */
  get barOverlaysCount(): number;

  /**
   * 获取扇间隙数量
   */
  get sashGapsCount(): number;

  /**
   * 初始化默认锁位置
   * 根据扇的位置和相邻关系自动设置默认锁方向
   */
  initDefaultLock(): void;

  /**
   * 初始化月牙锁配置
   * 根据扇的堆叠关系设置月牙锁方向
   */
  initCrescentLock(): void;

  /**
   * 转换为滑动组件配置对象
   * @returns 包含扇分区配置的对象
   */
  toSlideComp(): SlideComponentConfig;

  /**
   * 生成扇的编码
   * @param item 滑动窗项目
   * @returns 编码字符串 (H=隐藏, S=纱窗, D=遮光帘, A=玻璃扇)
   */
  private sashCode(item: SlideItem): string;
}

/**
 * 滑动窗项目类
 * 表示滑动窗中的单个扇或纱窗
 */
export declare class SlideItem {
  /**
   * 填充类型（玻璃/纱窗/遮光帘）
   */
  fill: ShapeType;

  /**
   * 是否为固定扇
   */
  isFixed: boolean;

  /**
   * 开启方向
   */
  openDirection: OpenDirection;

  /**
   * 是否为次要扇（依附于主扇）
   */
  isSecondary: boolean;

  /**
   * 宽度值（可选）
   */
  width?: number;

  /**
   * 是否隐藏
   */
  hidden: boolean;

  /**
   * 锁是否隐藏
   */
  lockHidden: boolean;

  /**
   * 默认锁方向列表
   */
  defaultLocks: Direction[];

  /**
   * 月牙锁方向列表
   */
  crescentLocks: Direction[];

  /**
   * 私有锁方向存储
   */
  private _lockDirection?: Direction;

  /**
   * 锁方向
   * 如果未设置，则使用默认锁方向
   */
  get lockDirection(): Direction;
  set lockDirection(value: Direction);

  constructor(
    fill?: ShapeType,
    isFixed?: boolean,
    openDirection?: OpenDirection,
    isSecondary?: boolean,
    width?: number,
    hidden?: boolean,
    lockHidden?: boolean,
    defaultLocks?: Direction[],
    crescentLocks?: Direction[]
  );

  /**
   * 创建玻璃扇
   * @param openDirection 开启方向
   * @param isSecondary 是否为次要扇
   */
  static sash(openDirection: OpenDirection, isSecondary?: boolean): SlideItem;

  /**
   * 创建纱窗
   * @param openDirection 开启方向
   * @param isSecondary 是否为次要纱窗
   */
  static screen(openDirection: OpenDirection, isSecondary?: boolean): SlideItem;

  /**
   * 创建遮光帘
   * @param openDirection 开启方向
   * @param isSecondary 是否为次要遮光帘
   */
  static shade(openDirection: OpenDirection, isSecondary?: boolean): SlideItem;

  /**
   * 创建固定玻璃扇
   * @param isSecondary 是否为次要扇
   */
  static fixedSash(isSecondary?: boolean): SlideItem;

  /**
   * 创建固定纱窗
   * @param isSecondary 是否为次要纱窗
   */
  static fixedScreen(isSecondary?: boolean): SlideItem;

  /**
   * 创建固定遮光帘
   * @param isSecondary 是否为次要遮光帘
   */
  static fixedShade(isSecondary?: boolean): SlideItem;

  /**
   * 创建隐藏项
   */
  static hidden(): SlideItem;

  /**
   * 计算默认锁方向
   * 根据开启方向自动确定锁的默认方向
   */
  private defaultLockDirection(): Direction;
}