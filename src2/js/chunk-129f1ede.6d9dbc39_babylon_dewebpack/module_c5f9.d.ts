/**
 * 长度单位转换系数映射
 * "0": 毫米 (0.001)
 * "1": 厘米 (0.01)
 * "2": 米 (1)
 */
type LengthUnit = "0" | "1" | "2";

/**
 * 用户设置配置
 */
interface UserSettings {
  /** 长度单位设置 */
  lenUnit?: LengthUnit;
  [key: string]: unknown;
}

/**
 * 型材(bar)数据项
 */
interface BarItem {
  /** 物料编码 */
  code: string;
  /** 颜色 */
  color: string;
  /** 长度 */
  length: number;
  /** 名称 */
  name: string;
  /** 米重 */
  meter_weight: number;
}

/**
 * 玻璃(glass)数据项
 */
interface GlassItem {
  /** 规格 */
  specs: string;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
  /** 名称 */
  name: string;
}

/**
 * 异形玻璃(polyGlass)数据项
 */
interface PolyGlassItem {
  /** 规格 */
  specs: string;
  /** 面积 */
  area: number;
  /** 序列号 */
  serial: string;
}

/**
 * 配件(addon)数据项
 */
interface AddonItem {
  /** 物料编码 */
  code: string;
  /** 颜色 */
  color: string;
  /** 长度(可选) */
  length?: number;
  /** 数量 */
  count: number;
  /** 名称 */
  name: string;
}

/**
 * 输入数据结构
 */
interface MaterialData {
  /** 型材列表 */
  bar: BarItem[];
  /** 玻璃列表 */
  glass: GlassItem[];
  /** 异形玻璃列表 */
  polyGLass: PolyGlassItem[];
  /** 配件列表 */
  addon: AddonItem[];
}

/**
 * 聚合后的物料信息
 */
interface AggregatedMaterial {
  /** 长度或面积或数量 */
  length: number;
  /** 物料名称 */
  name: string;
  /** 计算类型: 长度/面积/单位 */
  calc_type: "Length" | "Area" | "Unit";
  /** 重量 */
  weight: number;
}

/**
 * 物料配置查询请求
 */
interface MaterialConfigRequest {
  /** 物料信息列表(格式: "code|color") */
  infos: string[];
}

/**
 * 物料配置响应项
 */
interface MaterialConfigItem {
  /** BOM编码 */
  bom_code: string;
  /** 颜色 */
  color: string;
  /** 定价方式: 1=按长度, 其他=按重量 */
  pricing_method: number;
  /** 成本价 */
  cost: number;
  /** 销售价 */
  price: number;
  /** 备注 */
  note: string;
  /** 材料名称 */
  material: string;
}

/**
 * API响应结构
 */
interface ApiResponse<T> {
  /** 响应码: 1=成功 */
  code: number;
  /** 响应数据 */
  data: T;
  /** 错误消息 */
  message?: string;
}

/**
 * 成本项
 */
interface CostItem {
  /** 物料名称 */
  name: string;
  /** 计算结果描述 */
  result: string;
  /** 新单价 */
  newPrice: number;
  /** 新数量 */
  newQuantity: number;
  /** 备注 */
  note: string;
  /** 成本金额 */
  cost: number;
  /** 是否激活 */
  active: boolean;
  /** 物料编码 */
  code: string;
}

/**
 * 报价项
 */
interface QuoteItem {
  /** 物料名称 */
  name: string;
  /** 单价 */
  price: number;
  /** 数量(保留4位小数) */
  quantity: number;
  /** 数量(整数) */
  count: number;
  /** 金额 */
  money: number;
  /** 单位 */
  unit: string;
  /** 备注 */
  note: string;
  /** 匹配目标 */
  match_target: string;
  /** 作为数量 */
  asQuantity: string;
  /** 最小尺寸 */
  min_size: string;
  /** 匹配类型 */
  match_type: string;
  /** 是否手动 */
  manual: boolean;
  /** 物料信息(格式: "code~material~calc_type") */
  info: string;
  /** 折扣 */
  discount: number;
  /** 物料编码 */
  code: string;
}

/**
 * 计算结果
 */
interface CalculationResult {
  /** 报价数组 */
  quoteArr: QuoteItem[];
  /** 成本数组 */
  costArr: CostItem[];
}

/**
 * 获取长度单位转换系数
 * @param unitCode - 单位代码
 * @returns 转换系数(米为基准)
 */
declare function getLengthUnitMultiplier(unitCode: LengthUnit): number;

/**
 * 根据物料数据和配置计算成本和报价
 * @param materialData - 物料数据
 * @param includeQuote - 是否包含报价
 * @param includeCost - 是否包含成本
 * @param multiplier - 数量倍数,默认为1
 * @returns Promise包含报价和成本数组
 */
declare function calculateMaterialCosts(
  materialData: MaterialData,
  includeQuote: boolean,
  includeCost: boolean,
  multiplier?: number
): Promise<CalculationResult>;

/**
 * 构建成本项和报价项
 * @param aggregatedData - 聚合后的物料数据
 * @param configItem - 物料配置项
 * @returns 包含成本和报价的对象
 */
declare function buildCostAndQuote(
  aggregatedData: AggregatedMaterial,
  configItem: MaterialConfigItem
): {
  cost: CostItem;
  quote: QuoteItem;
};

/**
 * 会话存储中的用户设置键名
 */
declare const USER_SETTINGS_KEY = "userSettings";

/**
 * 从会话存储获取的长度单位转换系数
 */
declare const unitMultiplier: number;