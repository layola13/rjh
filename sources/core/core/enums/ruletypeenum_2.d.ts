/**
 * 灯光规则类型枚举
 * 定义了所有支持的灯光布置规则类型
 */
export enum RuleTypeEnum {
  /** 未知规则类型 */
  Unknown = "unknown",
  /** 主灯规则 */
  HeadLightRule = "head light rule",
  /** 单人座椅灯光规则 */
  SingleSeatLightRule = "single seat rule",
  /** 多人座椅灯光规则 */
  MultipleSeatLightRule = "multiple seat rule",
  /** 转角沙发灯光规则 */
  CornerSofaLightRule = "corner sofa rule",
  /** 床铺灯光规则 */
  BedLightRule = "bed rule",
  /** 桌子灯光规则 */
  TableLightRule = "table rule",
  /** 浴室柜灯光规则 */
  BathroomCabinetRule = "bath cabinet rule",
  /** 橱柜灯光规则 */
  CabinetRule = "cabinet rule",
  /** 装饰画灯光规则 */
  DecorativePictureRule = "decorate picture rule",
  /** 电视柜灯光规则 */
  TVCabinetRule = "TV rule",
  /** 马桶灯光规则 */
  ToiletLightRule = "toilet rule",
  /** 窗户灯光规则 */
  WindowLightRule = "window rule",
  /** 筒灯规则 */
  DownLightRule = "down light rule"
}

/**
 * 灯光规则配置接口
 */
export interface RuleConfig {
  singleSeat: unknown;
  cornerSofa: unknown;
  multipleSeat: unknown;
  diningTable: unknown;
  bed: unknown;
  bathroomCabinet: unknown;
  cabinet: unknown;
  tvCabinet: unknown;
  decorativePicture: unknown;
  toilet: unknown;
  downLight: unknown;
}

/**
 * 灯光规则基类接口
 */
export interface ILightingRule {
  /**
   * 获取规则优先级
   * @returns 优先级数值，数值越小优先级越高
   */
  priority(): number;
}

/**
 * 灯光规则管理器
 * 负责注册、管理和检索各种类型的灯光布置规则
 */
export declare class LightingRuleManager {
  /** 存储所有已注册的规则 */
  private readonly _rules: Map<RuleTypeEnum, ILightingRule>;

  /**
   * 创建灯光规则管理器实例
   * @param config - 规则配置对象
   */
  constructor(config: RuleConfig);

  /**
   * 获取所有已注册的规则，按优先级排序
   * @returns 规则数组，按优先级从高到低排序
   */
  getRules(): ILightingRule[];

  /**
   * 根据规则类型获取特定规则
   * @param ruleType - 规则类型枚举值
   * @returns 对应的规则实例，如果不存在则返回undefined
   */
  getRule(ruleType: RuleTypeEnum): ILightingRule | undefined;

  /**
   * 初始化所有规则
   * @param config - 规则配置对象
   * @private
   */
  private _init(config: RuleConfig): void;

  /**
   * 注册一个灯光规则
   * @param ruleType - 规则类型
   * @param rule - 规则实例
   * @private
   */
  private _register(ruleType: RuleTypeEnum, rule: ILightingRule): void;
}