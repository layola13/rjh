/**
 * 抽屉柜体参数化建模模块
 * Created by Jeff Shen
 * 详情参考wiki: http://wiki-dev.shejijia.com:8090/pages/viewpage.action?pageId=13486007
 */

/**
 * 3D空间点坐标
 */
interface Point3D {
  /** X轴坐标（宽度方向） */
  x: string;
  /** Y轴坐标（深度方向） */
  y: string;
  /** Z轴坐标（高度方向） */
  z: string;
}

/**
 * 几何体参数引用
 */
interface GeometryParameters {
  /** X方向长度参数ID */
  XLength: string;
  /** Y方向长度参数ID */
  YLength: string;
  /** Z方向长度参数ID */
  ZLength: string;
  /** X轴位置参数ID */
  x: string;
  /** Y轴位置参数ID */
  y: string;
  /** Z轴位置参数ID */
  z: string;
}

/**
 * 拉伸几何体参数
 */
interface ExtrudeParameters {
  /** 拉伸高度参数ID */
  height: string;
  /** 拉伸路径点集合（每个路径是点ID数组） */
  paths: string[][];
}

/**
 * 几何元素定义
 */
interface GeometryChild {
  /** 注释说明 */
  comment?: string;
  /** 中文描述 */
  _des: string;
  /** 本地唯一标识符 */
  localId: string;
  /** 几何体类型：box-长方体, extrude-拉伸体 */
  type: 'box' | 'extrude';
  /** 几何参数引用 */
  parameters: GeometryParameters | ExtrudeParameters;
}

/**
 * 约束方程定义
 */
interface Constraint {
  /** 注释说明1 */
  comment1?: string;
  /** 注释说明2 */
  comment2?: string;
  /** 中文描述 */
  _des: string;
  /** 本地唯一标识符 */
  localId: string;
  /** 约束类型 */
  type: 'position';
  /** 约束方程表达式 */
  equation: string;
}

/**
 * 参数状态值
 */
type ParameterValue = number | Point3D;

/**
 * 参数状态定义
 */
interface ParameterState {
  /** 通用注释 */
  comments?: string;
  /** 注释说明1 */
  comment1?: string;
  /** 中文描述 */
  _des: string;
  /** 是否为控制参数（可被外部修改） */
  isCtlParam?: boolean;
  /** 本地唯一标识符 */
  localId: string;
  /** 参数类型：point-点坐标 */
  type?: 'point';
  /** 参数值：数值或点坐标 */
  value: ParameterValue;
}

/**
 * 元数据
 */
interface ModuleMeta {
  /** 魔数标识 */
  magic: string;
  /** 内容类型 */
  contentType: string;
}

/**
 * 参数化装配体定义
 */
interface ParametricAssembly {
  /** 子几何体列表 */
  children: GeometryChild[];
  /** 约束方程列表 */
  constraints: Constraint[];
  /** 本地唯一标识符 */
  localId: string;
  /** 材质ID（UUID格式） */
  material: string;
  /** 顶层参数引用 */
  parameters: GeometryParameters;
  /** 资源列表（暂未使用） */
  resources: unknown[];
  /** 参数状态列表 */
  states: ParameterState[];
  /** 类型标识 */
  type: 'passembly';
  /** 元数据 */
  meta: ModuleMeta;
}

/**
 * 抽屉柜体参数化模型数据
 * 
 * 结构说明：
 * - 包含4个板件：左侧板(bd1)、背板(bd2)、右侧板(bd3)、底板(bd4)
 * - 通过全局控制参数(ID_W/ID_D/ID_H等)驱动各板件位置和尺寸
 * - 使用约束方程实现参数化设计
 * 
 * @example
 *