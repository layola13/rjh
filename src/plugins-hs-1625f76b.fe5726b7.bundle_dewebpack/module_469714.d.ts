/**
 * 3D建模数据接口
 * 包含WebCAD文档和尺寸信息
 */
interface ModelingData {
  /** WebCAD文档对象 */
  webCADDocument: unknown;
  /** 测量单位 */
  unit: string;
  /** X轴长度 */
  XLength: number;
  /** Y轴长度 */
  YLength: number;
  /** Z轴长度 */
  ZLength: number;
  /** 尺寸范围类型 */
  sizeRangeType?: string;
}

/**
 * 吊顶创建配置接口
 */
interface CeilingConfig {
  /** 建模数据 */
  modelingData: ModelingData;
  /** 位置坐标 */
  position: Vector3;
  /** 轮廓路径 */
  outline: unknown;
  /** 宿主多边形数据 */
  hostPolygon?: unknown[];
}

/**
 * 产品添加选项
 */
interface ProductAddOptions {
  /** 忽略吸附偏移 */
  ignoreSnapOffset?: boolean;
  /** 默认地面 */
  defaultGround?: boolean;
  /** 启用灯光矩阵排列 */
  lightingMatrixArrangedEnable?: boolean;
  /** 强制保持Z轴 */
  forceKeepZAxis?: boolean;
  /** 约束在房间内 */
  constraintInRoom?: boolean;
}

/**
 * 产品扩展字段
 */
interface ProductExtendedFields {
  /** 尺寸范围类型 */
  sizeRangeType?: string;
  /** 参数配置 */
  parameters: unknown;
}

/**
 * 产品元数据
 */
interface ProductMetadata {
  /** 产品ID */
  id: string;
  /** 产品类型 */
  productType: HSCatalog.ProductTypeEnum;
  /** 内容类型 */
  contentType: string;
  /** 属性列表 */
  attributes: Attribute[];
  /** 自由数据(JSON字符串) */
  free: string;
}

/**
 * 属性接口
 */
interface Attribute {
  /** 属性ID */
  id?: string;
  /** 属性值列表 */
  values?: AttributeValue[];
  /** 自由数据 */
  free?: string[];
}

/**
 * 属性值接口
 */
interface AttributeValue {
  /** 值内容 */
  value: string;
}

/**
 * 3D向量接口
 */
interface Vector3 {
  x: number;
  y: number;
  z: number;
}

/**
 * 创建参数化吊顶命令类
 * 继承自HSApp.Cmd.Command,用于在3D场景中添加定制化的吊顶产品
 * 
 * @extends HSApp.Cmd.Command
 * 
 * @example
 *