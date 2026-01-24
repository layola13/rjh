/**
 * 复制粘贴工具模块
 * 提供模型选择数据序列化和复制粘贴支持判断功能
 */

/**
 * 判断指定的模型类是否支持复制粘贴操作
 * @param modelClass - 模型类型（来自 HSConstants.ModelClass）
 * @returns 如果该模型类支持复制粘贴则返回 true，否则返回 false
 */
export function isCopyPasteSupported(modelClass: number): boolean;

/**
 * 选中材质数据接口
 */
interface SelectedMaterialData {
  /** 材质的JSON序列化数据 */
  material: unknown;
  /** 当前激活的环境ID */
  environmentId: string;
  /** 主视图模式 */
  viewMode: string;
}

/**
 * 完整的选中数据结构
 */
interface SelectedCompleteData {
  /** 序列化后的实体数据数组 */
  data: unknown[];
  /** 状态数据数组 */
  states: unknown[];
  /** 约束数据数组 */
  constraints: unknown[];
  /** 产品元数据数组 */
  products: unknown[];
  /** 材质数据数组 */
  materials: unknown[];
  /** 当前激活的环境ID */
  environmentId: string;
  /** 主视图模式 */
  viewMode: string;
  /** 标识选中的数据是否完整（所有模型都支持复制粘贴） */
  isComplete?: boolean;
}

/**
 * 将选中的模型序列化为JSON数据
 * 
 * 功能说明：
 * - 如果选中单个面/天花板/地板，返回其材质数据
 * - 如果选中多个模型，返回完整的模型数据（包括实体、状态、约束、产品、材质等）
 * - 自动过滤不支持复制粘贴的模型类型
 * - 递归展平嵌套的成员结构
 * 
 * @param selectedModels - 选中的模型数组
 * @returns 序列化后的JSON数据，可能是材质数据或完整数据，如果无有效数据则返回空数组
 */
export function getSelectedInJSON(
  selectedModels: unknown[]
): SelectedMaterialData | SelectedCompleteData | unknown[];