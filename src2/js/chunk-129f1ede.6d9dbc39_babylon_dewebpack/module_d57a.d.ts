/**
 * 条材结果数据
 */
interface BarResult {
  /** 条材代码 */
  code: string;
  /** 条材名称 */
  name: string;
  /** 颜色 */
  color: string;
  /** 切割角度 */
  cutAngle: number;
  /** 类型 */
  type: string;
  /** 结果数组 */
  result: Array<{
    /** 数量 */
    count: number;
    /** 长度 */
    length: number;
    /** 尺寸类型 */
    size_type: string;
    /** 长度表达式 */
    lengthExpression: string;
  }>;
  /** 表达式数组 */
  express: string[];
}

/**
 * 玻璃结果数据
 */
interface GlassResult {
  /** 名称 */
  name: string;
  /** 规格 */
  specs: string;
  /** 类型 */
  type: string;
  /** 结果数组 */
  result: Array<{
    /** 数量 */
    count: number;
    /** 宽度 */
    width: number;
    /** 高度 */
    height: number;
    /** 序列号数组 */
    serial: string[];
    /** 宽度表达式 */
    widthExpression: string;
    /** 高度表达式 */
    heightExpression: string;
  }>;
  /** 表达式数组 */
  express: string[];
}

/**
 * 附件结果数据
 */
interface AddonResult {
  /** 代码 */
  code: string;
  /** 名称 */
  name: string;
  /** 规格 */
  spec: string;
  /** 颜色 */
  color: string;
  /** 长度 */
  length: number;
  /** 结果数组 */
  result: Array<{
    /** 数量 */
    count: number;
    /** 长度 */
    length: number;
    /** 数量表达式 */
    countExpression: string;
    /** 长度表达式 */
    lengthExpression: string;
  }>;
  /** 表达式数组 */
  express: string[];
}

/**
 * 子条材结果数据
 */
interface SubBarResult {
  /** 代码 */
  code: string;
  /** 材料 */
  material: string;
  /** 颜色 */
  color: string;
  /** 切割角度 */
  cutAngle: number;
  /** 结果数组 */
  result: Array<{
    /** 数量 */
    count: number;
    /** 长度 */
    length: number;
    /** 尺寸类型 */
    size_type: string;
    /** 长度表达式 */
    lengthExpression: string;
  }>;
  /** 表达式数组 */
  express: string[];
}

/**
 * 扇数据
 */
interface SashData {
  /** 扇ID */
  id: number;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
}

/**
 * 组件数据
 */
interface ComponentData {
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
  /** 类型 */
  type: string;
  /** 宿主类型 */
  host_type: 'sash' | 'doubleSash' | 'slideSash' | 'foldSash';
  /** 扇分配方式 */
  sash_assign_way: string;
  /** 规格 */
  specs: string;
  /** 名称 */
  name: string;
  /** 宽度表达式 */
  widthExpression: string;
  /** 高度表达式 */
  heightExpression: string;
}

/**
 * 附加结果数据
 */
interface AdditionResult {
  /** 类型 */
  type: string;
  /** 扇分配方式 */
  sash_assign_way: string;
  /** 扇分配类型 */
  sash_assign_type: string;
  /** 尺寸字符串 */
  sizeStr: string;
  /** 尺寸 */
  size: string;
  /** 宽度表达式 */
  widthExpression: string;
  /** 高度表达式 */
  heightExpression: string;
  /** 表达式数组 */
  expressionArr: string[];
}

/**
 * 规格价格数据
 */
interface SpecPrice {
  /** 规格 */
  spec: string;
  /** 厚度 */
  thickness: number;
  /** 价格 */
  price: number;
}

/**
 * 编译结果
 */
interface CompileResult {
  /** 错误信息 */
  errors?: any[];
  /** 是否成功 */
  type: boolean;
  /** 结果数据 */
  result: any;
  /** 自定义变量结果 */
  customVariableRes: any;
  /** 汇总信息 */
  summary?: any;
}

/**
 * 产品条材数据
 */
interface ProductBar {
  /** 轨道索引 */
  track_index?: number[];
  /** 子条材数组 */
  sub_bars: any[];
  [key: string]: any;
}

/**
 * 产品数据
 */
interface ProductData {
  /** 产品条材数组 */
  product_bar: ProductBar[];
  [key: string]: any;
}

/**
 * 自动计算工具模块
 */
declare const autoCalculationUtils: {
  /**
   * 自动获取条材结果
   * @param elements - 元素数组
   * @param formulas - 公式数组
   * @returns 条材结果数组
   */
  getBarResultAuto(elements: any[], formulas: any[]): BarResult[];

  /**
   * 自动获取玻璃结果
   * @param elements - 元素数组
   * @param formulas - 公式数组
   * @param showError - 是否显示错误（默认true）
   * @returns 玻璃结果数组
   */
  getGlassResultAuto(
    elements: any[],
    formulas: any[],
    showError?: boolean
  ): GlassResult[];

  /**
   * 自动获取扇列表
   * @param elements - 元素数组
   * @param formulas - 公式数组
   * @returns 扇数据数组
   */
  getSashListAuto(elements: any[], formulas: any[]): SashData[];

  /**
   * 解析结果为字符串
   * @param type - 类型（bar/sub_bar/glass/addon）
   * @param results - 结果数组
   * @returns 格式化的字符串
   */
  parseResultString(
    type: 'bar' | 'sub_bar' | 'glass' | 'addon',
    results: any[]
  ): string;

  /**
   * 超级自动脚本计算
   * @param scriptCode - 脚本代码
   * @param productData - 产品数据
   * @param preCompileData - 预编译数据
   * @param variables - 变量对象
   * @param specPrices - 规格价格数组
   * @param customConfig - 自定义配置（可选）
   * @returns 编译结果
   */
  superAutoScript(
    scriptCode: string,
    productData: ProductData,
    preCompileData: any,
    variables: Record<string, any>,
    specPrices: SpecPrice[],
    customConfig?: Record<string, any>
  ): CompileResult;

  /**
   * 汇总结果
   * @param type - 类型（bar/sub_bar/glass/addon）
   * @param data - 数据数组
   * @returns 汇总后的结果数组
   */
  sumResult(
    type: 'bar' | 'sub_bar' | 'glass' | 'addon',
    data: any[]
  ): BarResult[] | GlassResult[] | AddonResult[] | SubBarResult[];

  /**
   * 汇总附加结果
   * @param components - 组件数组
   * @param assignType - 分配类型
   * @returns 附加结果数组
   */
  sumAdditionResult(components: any[], assignType: string): AdditionResult[];

  /**
   * 提取组件信息
   * @param elements - 元素数组
   * @param includeOpenCell - 是否包含开启格（默认true）
   * @returns 组件数据数组
   */
  fetchComponents(
    elements: any[],
    includeOpenCell?: boolean
  ): ComponentData[];
};

export default autoCalculationUtils;