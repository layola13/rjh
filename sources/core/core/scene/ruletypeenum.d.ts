/**
 * 照明规则类型枚举
 * 定义了所有支持的照明规则类型
 */
export enum RuleTypeEnum {
  /** 未知规则类型 */
  Unknown = "unknown",
  /** 顶灯规则 */
  HeadLightRule = "head light rule",
  /** 单人座椅照明规则 */
  SingleSeatLightRule = "single seat rule",
  /** 多人座椅照明规则 */
  MultipleSeatLightRule = "multiple seat rule",
  /** 转角沙发照明规则 */
  CornerSofaLightRule = "corner sofa rule",
  /** 床铺照明规则 */
  BedLightRule = "bed rule",
  /** 餐桌照明规则 */
  TableLightRule = "table rule",
  /** 浴室柜照明规则 */
  BathroomCabinetRule = "bath cabinet rule",
  /** 橱柜照明规则 */
  CabinetRule = "cabinet rule",
  /** 装饰画照明规则 */
  DecorativePictureRule = "decorate picture rule",
  /** 电视柜照明规则 */
  TVCabinetRule = "TV rule",
  /** 马桶照明规则 */
  ToiletLightRule = "toilet rule",
  /** 窗户照明规则 */
  WindowLightRule = "window rule",
  /** 筒灯规则 */
  DownLightRule = "down light rule"
}

/**
 * 照明规则基础接口
 * 所有具体规则实现必须遵循此接口
 */
export interface ILightingRule {
  /**
   * 获取规则优先级
   * @returns 优先级数值，越小优先级越高
   */
  priority(): number;
}

/**
 * 照明规则配置接口
 * 用于初始化各类照明规则
 */
export interface IRuleConfig {
  /** 单人座椅配置 */
  singleSeat: unknown;
  /** 转角沙发配置 */
  cornerSofa: unknown;
  /** 多人座椅配置 */
  multipleSeat: unknown;
  /** 餐桌配置 */
  diningTable: unknown;
  /** 床铺配置 */
  bed: unknown;
  /** 浴室柜配置 */
  bathroomCabinet: unknown;
  /** 橱柜配置 */
  cabinet: unknown;
  /** 电视柜配置 */
  tvCabinet: unknown;
  /** 装饰画配置 */
  decorativePicture: unknown;
  /** 马桶配置 */
  toilet: unknown;
  /** 筒灯配置 */
  downLight: unknown;
}

/**
 * 照明规则管理器
 * 负责注册、管理和检索各类照明规则
 */
export declare class LightingRuleManager {
  /** 规则存储映射表 */
  private readonly _rules: Map<RuleTypeEnum, ILightingRule>;

  /**
   * 构造函数
   * @param config - 规则配置对象，用于初始化各类规则
   */
  constructor(config: IRuleConfig);

  /**
   * 获取所有已注册的规则
   * @returns 按优先级排序的规则数组（优先级从低到高）
   */
  getRules(): ILightingRule[];

  /**
   * 根据规则类型获取特定规则
   * @param ruleType - 规则类型枚举值
   * @returns 对应的规则实例，若不存在则返回 undefined
   */
  getRule(ruleType: RuleTypeEnum): ILightingRule | undefined;

  /**
   * 初始化所有照明规则
   * @param config - 规则配置对象
   * @private
   */
  private _init(config: IRuleConfig): void;

  /**
   * 注册单个照明规则
   * @param ruleType - 规则类型
   * @param rule - 规则实例
   * @private
   */
  private _register(ruleType: RuleTypeEnum, rule: ILightingRule): void;
}