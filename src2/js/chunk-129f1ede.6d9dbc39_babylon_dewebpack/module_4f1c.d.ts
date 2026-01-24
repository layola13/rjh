/**
 * 订单表单配置模块
 * 包含订单表单字段、规格价格、规格额外信息和规格表单的键值映射配置
 */

/**
 * 订单表单字段映射接口
 */
interface OrderFormKeys {
  /** 窗号 */
  window_no: string;
  /** 系列 */
  product_name: string;
  /** 总宽 */
  width: string;
  /** 总高 */
  height: string;
  /** 面积 */
  area: string;
  /** 樘数 */
  count: string;
  /** 单价 */
  price: string;
  /** 位置 */
  install_position: string;
  /** 颜色 */
  color: string;
  /** 备注 */
  note: string;
  /** 洞口 */
  hole_pic_url: string;
}

/**
 * 规格价格表单字段映射接口
 * 键为规格类型ID，值为对应的中文标签
 */
interface SpecPriceFormKeys {
  /** 玻璃单价 */
  1: string;
  /** 五金单价 */
  2: string;
  /** 外色单价 */
  7: string;
  /** 内色单价 */
  8: string;
  /** 纱网单价 */
  11: string;
  /** 外框单价 */
  12: string;
  /** 中梃单价 */
  13: string;
  /** 玻扇单价 */
  14: string;
  /** 合页单价 */
  15: string;
  /** 下轨单价 */
  16: string;
}

/**
 * 规格额外信息表单字段映射接口
 * 键为规格类型ID，值为对应的中文标签
 */
interface SpecExtraFormKeys {
  /** 外框小面 */
  12: string;
  /** 中梃小面 */
  13: string;
  /** 玻扇小面 */
  14: string;
  /** 下轨宽度 */
  16: string;
}

/**
 * 规格项配置接口
 */
interface SpecFormItem {
  /** 显示标签 */
  label: string;
  /** 数据键名 */
  key: string;
  /** 原始数据来源字段（可选） */
  ori?: string;
}

/**
 * 规格表单配置映射接口
 * 键为规格类型ID，值为对应的规格项配置
 */
interface SpecFormKeys {
  /** 玻璃规格配置 */
  1: SpecFormItem;
  /** 五金规格配置 */
  2: SpecFormItem;
  /** 外色规格配置 */
  7: SpecFormItem;
  /** 内色规格配置 */
  8: SpecFormItem;
  /** 纱网规格配置 */
  11: SpecFormItem;
  /** 外框规格配置 */
  12: SpecFormItem;
  /** 中梃规格配置 */
  13: SpecFormItem;
  /** 玻扇规格配置 */
  14: SpecFormItem;
  /** 合页规格配置 */
  15: SpecFormItem;
  /** 下轨规格配置 */
  16: SpecFormItem;
}

/**
 * 模块数据接口
 */
interface ModuleData {
  /** 订单表单字段映射 */
  order_form_keys: OrderFormKeys;
  /** 规格价格表单字段映射 */
  spec_price_form_keys: SpecPriceFormKeys;
  /** 规格额外信息表单字段映射 */
  spec_extra_form_keys: SpecExtraFormKeys;
  /** 规格表单配置映射 */
  spec_form_keys: SpecFormKeys;
}

/**
 * 模块导出接口
 */
export interface Module4f1c {
  /**
   * 返回模块配置数据
   * @returns 包含各类表单配置的数据对象
   */
  data(): ModuleData;
}

declare const module: Module4f1c;

export default module;