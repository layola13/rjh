/**
 * 样式器工厂模块
 * 用于创建和管理不同类型模型的样式器实例
 * Module: module_769107
 * Original ID: 769107
 */

/**
 * 样式器配置选项
 */
interface StylerOptions {
  /** 是否应用于整个元素 */
  entire?: boolean;
  [key: string]: unknown;
}

/**
 * 模型基础接口
 */
interface ModelBase {
  /** 模型类别标识 */
  Class: string;
  [key: string]: unknown;
}

/**
 * 样式器基类接口
 */
interface IStyler {
  [key: string]: unknown;
}

/**
 * 样式器工厂类
 * 提供静态方法用于创建样式器实例和获取样式器环境
 */
declare class StylerFactory {
  /**
   * 创建样式器实例
   * @param model - 模型对象，包含模型类别信息
   * @param options - 样式器配置选项
   * @returns 返回对应类型的样式器实例，若模型不支持则返回 undefined
   * 
   * @remarks
   * 支持的模型类型：
   * - NgDoor（门）
   * - NgWindow（窗）
   * - NgHole（孔洞）
   * 
   * 根据 options.entire 参数决定创建完整样式器还是局部样式器
   */
  static createStyler(model: ModelBase | null | undefined, options?: StylerOptions): IStyler | undefined;

  /**
   * 获取样式器环境标识
   * @param model - 模型对象
   * @returns 返回对应的样式器环境常量，若模型不支持则返回 undefined
   * 
   * @remarks
   * 门、窗、孔洞类型的模型使用 OpeningStyler 环境
   */
  static getStylerEnv(model: ModelBase | null | undefined): string | undefined;
}

export default StylerFactory;