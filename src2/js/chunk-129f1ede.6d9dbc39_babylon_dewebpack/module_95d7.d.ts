/**
 * 订单计算混入模块
 * 用于处理门窗订单的脚本计算、材料统计和数据管理
 */

import { Compiler } from '@/modules/compiler';
import { Store } from 'vuex';

/**
 * 长度单位枚举
 */
type LengthUnit = '0' | '1' | '2'; // 0: mm, 1: cm, 2: m

/**
 * 长度单位转换系数映射
 */
type LengthUnitMultiplier = 0.001 | 0.01 | 1;

/**
 * 订单基础信息接口
 */
interface OrderInfo {
  /** 窗编号 */
  window_no: string;
  /** 产品名称 */
  product_name: string;
  /** 宽度(mm) */
  width: number;
  /** 高度(mm) */
  height: number;
  /** 面积(m²) */
  area: number;
  /** 数量 */
  count: number;
  /** 价格 */
  price: string;
  /** 安装位置 */
  install_position: string;
  /** 颜色 */
  color: string;
  /** 备注 */
  note: string;
  /** 脚本ID */
  script_id: number;
  /** 合同ID */
  contract_id?: string;
  /** 图纸数据 */
  drawing_data?: unknown;
  /** 型材列表 */
  script_bar?: ScriptBarItem[];
  /** 玻璃列表 */
  script_glass?: ScriptGlassItem[];
  /** 附件列表 */
  script_addon?: ScriptAddonItem[];
  /** 费用列表 */
  script_cost?: ScriptCostItem[];
  /** 属性数据 */
  attr_data?: AttributeData;
  /** 玻璃数据 */
  glass_data?: GlassData;
  /** 五金数据 */
  hardware_data?: HardwareData;
}

/**
 * 玻璃数据接口
 */
interface GlassData {
  /** 规格标签 */
  guigelabel: string;
  /** 是否磨砂 */
  mosha: boolean;
}

/**
 * 五金配件数据接口
 */
interface HardwareData {
  /** 产品名称 */
  productName: string;
  /** 颜色 */
  color: string | null;
  /** 自定义颜色 */
  custom_color: string | null;
}

/**
 * 属性数据接口
 */
interface AttributeData {
  /** 玻璃数据 */
  glass_data?: GlassData;
  /** 五金数据 */
  hardware_data?: HardwareData;
  /** 汇总数据 */
  summary?: SummaryData;
}

/**
 * 汇总数据接口
 */
interface SummaryData {
  /** 米重(kg) */
  meterWeight: number;
  /** 最小面积(m²) */
  minimumArea: string;
}

/**
 * 型材项接口
 */
interface ScriptBarItem {
  /** 名称 */
  name: string;
  /** 长度(mm) */
  length: number | string;
  /** 颜色 */
  color: string;
  /** 数量 */
  count: number;
  /** 条件表达式 */
  condition: string;
  /** 米重(kg/m) */
  meter_weight?: number;
  /** 重量(kg) */
  weight?: number;
}

/**
 * 玻璃项接口
 */
interface ScriptGlassItem {
  /** 名称 */
  name: string;
  /** 宽度(mm) */
  width: number | string;
  /** 高度(mm) */
  height: number | string;
  /** 数量 */
  count: number | string;
  /** 规格 */
  specs: string;
  /** 条件表达式 */
  condition: string;
}

/**
 * 附件项接口
 */
interface ScriptAddonItem {
  /** 名称 */
  name: string;
  /** 数量 */
  count: number | string;
  /** 规格 */
  specs: string;
  /** 颜色 */
  color: string;
  /** 条件表达式 */
  condition: string;
}

/**
 * 费用项接口
 */
interface ScriptCostItem {
  /** 名称 */
  name: string;
  /** 费用金额 */
  cost: number | string;
  /** 条件表达式 */
  condition: string;
}

/**
 * 可视化尺寸信息接口
 */
interface VisualDimensionInfo {
  /** 尺寸名称 */
  name: string;
  /** 尺寸值(mm) */
  value: number;
}

/**
 * 变量列表项接口
 */
interface VariableListItem {
  /** 变量名 */
  name: string;
  /** 条件-值映射 */
  item: Array<{
    /** 条件表达式 */
    condition: string;
    /** 值 */
    value: string;
  }>;
}

/**
 * 订单结果接口
 */
interface OrderResult {
  /** 型材订单列表 */
  order_bar: ScriptBarItem[];
  /** 玻璃订单列表 */
  order_glass: ScriptGlassItem[];
  /** 附件订单列表 */
  order_addon: ScriptAddonItem[];
  /** 费用订单列表 */
  order_cost: ScriptCostItem[];
}

/**
 * 图形管理器接口
 */
interface ShapeManager {
  /** 宽度(mm) */
  width: number;
  /** 高度(mm) */
  height: number;
  /** 面积(m²) */
  area: number;
  /** 型材显示尺寸 */
  profileSize: unknown;
  /** 形状模式 */
  shapeMode: 'normal' | 'order';
  /**
   * 打开文件
   * @param data 图纸数据
   * @param flag 是否为新建
   */
  openFile(data: unknown, flag: boolean): void;
}

/**
 * 尺寸管理器接口
 */
interface DimensionManager {
  /** 可视化尺寸信息列表 */
  visualIDimInfos: VisualDimensionInfo[];
}

/**
 * 画布接口
 */
interface Canvas {
  /** 形状管理器 */
  shapeManager: ShapeManager;
  /** 尺寸管理器 */
  dimManager: DimensionManager;
}

/**
 * 脚本响应数据接口
 */
interface ScriptResponse {
  /** 脚本ID */
  id: number;
  /** 产品名称 */
  product_name: string;
  /** 图纸数据 */
  drawing_data: unknown;
  /** 显示设置(JSON字符串) */
  show_setting: string;
  /** 型材列表 */
  script_bar: ScriptBarItem[];
  /** 玻璃列表 */
  script_glass: ScriptGlassItem[];
  /** 附件列表 */
  script_addon: ScriptAddonItem[];
  /** 费用列表 */
  script_cost: ScriptCostItem[];
}

/**
 * 订单响应数据接口
 */
interface OrderResponse {
  /** 订单信息 */
  order: OrderInfo;
}

/**
 * Vue实例扩展接口
 */
interface VueInstance {
  /** 订单信息 */
  info: OrderInfo;
  /** 玻璃数据 */
  glass_data: GlassData;
  /** 五金数据 */
  hardware_data: HardwareData;
  /** 属性表单键映射 */
  attr_form_keys: Record<string, string>;
  /** 订单表单键映射 */
  order_form_keys?: Record<string, unknown>;
  /** 可视化尺寸信息列表 */
  visualIDimInfos: VisualDimensionInfo[];
  /** 变量列表 */
  varlist: VariableListItem[];
  /** 编译器实例 */
  compiler?: Compiler;
  /** 画布实例 */
  canvas: Canvas;
  /** 当前索引 */
  currentindex?: number;
  /** 加载状态 */
  loading?: boolean;
  /** 国际化翻译函数 */
  $t(key: string): string;
  /** Vue响应式设置 */
  $set<T>(target: T, key: keyof T, value: T[keyof T]): void;
  /** Axios实例 */
  $axios: {
    get<T = unknown>(url: string, params?: Record<string, unknown>): Promise<{ code: number; data: T }>;
  };
  /** 路由实例 */
  $route: {
    params: { id: string };
    query: { id: string };
  };
  /** 消息提示 */
  $VMessage: {
    error(message: string): void;
  };
  /** 事件总线 */
  bus: {
    $emit(event: string, ...args: unknown[]): void;
  };
  /** 触发事件 */
  $emit(event: string, ...args: unknown[]): void;
}

/**
 * 订单计算混入
 * 提供订单数据管理、脚本计算和材料统计功能
 */
declare const OrderCalculationMixin: {
  /**
   * 组件数据初始化
   */
  data(this: VueInstance): {
    /** 订单信息 */
    info: OrderInfo;
    /** 玻璃数据 */
    glass_data: GlassData;
    /** 五金数据 */
    hardware_data: HardwareData;
    /** 属性表单键映射 */
    attr_form_keys: Record<string, string>;
    /** 可视化尺寸信息列表 */
    visualIDimInfos: VisualDimensionInfo[];
    /** 变量列表 */
    varlist: VariableListItem[];
  };

  methods: {
    /**
     * 测试脚本计算
     * 执行订单脚本，计算型材、玻璃、附件和费用
     * @returns 订单计算结果
     */
    testScript(this: VueInstance): OrderResult;

    /**
     * 获取订单详情
     * @param orderId 订单ID，默认使用路由参数
     * @param openDrawing 是否打开图纸，默认true
     */
    getOrder(this: VueInstance, orderId?: string, openDrawing?: boolean): void;

    /**
     * 获取变量列表
     * @param scriptId 脚本ID
     */
    getVarList(this: VueInstance, scriptId: number): void;

    /**
     * 获取脚本详情
     * @param scriptId 脚本ID
     */
    get_script(this: VueInstance, scriptId: number): void;

    /**
     * 计算表达式结果
     * @param expression 计算表达式
     * @param condition 条件表达式
     * @returns 计算结果或错误信息
     */
    getresult(this: VueInstance, expression: string, condition: string): number | string;
  };

  computed: {
    /**
     * 形状管理器计算属性
     * 自动同步画布尺寸到订单信息
     */
    shape_manager: {
      get(this: VueInstance): ShapeManager | Record<string, never>;
      set(this: VueInstance): void;
    };
  };
};

export default OrderCalculationMixin;