/**
 * SVG模板视图组件的类型定义
 * 用于渲染和管理SVG开口(Opening)元素，支持模板模式和交互状态
 */

/**
 * 颜色样式配置接口
 * 定义元素在不同状态下的颜色表现
 */
export interface ColorStyle {
  /** 主要描边颜色 */
  color: string;
  /** 浅色描边颜色（用于特殊标记的元素） */
  lightColor?: string;
  /** 填充颜色 */
  fillColor?: string;
}

/**
 * 颜色定义配置接口
 * 包含元素在各种状态下的颜色样式
 */
export interface ColorDefinition {
  /** 模板模式下的颜色样式 */
  Template: ColorStyle;
  /** 替换模式下的颜色样式 */
  Replace: ColorStyle;
  /** 正常状态下的颜色样式 */
  Normal: ColorStyle;
  /** 正常状态悬停时的颜色样式 */
  NormalHover: ColorStyle;
}

/**
 * 构造函数选项接口
 */
export interface TemplateOpeningOptions {
  /** 是否为模板模式 */
  isTemplate?: boolean;
}

/**
 * SVG模板开口视图类
 * 继承自 HSApp.View.SVG.Opening，提供模板化的SVG开口元素渲染能力
 * 
 * @remarks
 * 该类扩展了基础的SVG开口视图，添加了：
 * - 模板模式支持
 * - 动态颜色样式切换（正常、悬停、替换、模板状态）
 * - 交互事件处理（鼠标悬停效果）
 * - 从资源文档动态加载节点
 */
export default class TemplateOpeningView extends HSApp.View.SVG.Opening {
  /**
   * 是否为模板模式
   * 模板模式下元素不响应交互且使用特定的颜色样式
   */
  isTemplate: boolean;

  /**
   * 颜色定义配置
   * 包含所有状态下的颜色样式定义
   */
  colorDef: ColorDefinition;

  /**
   * 内部状态：鼠标是否悬停在元素上
   * @internal
   */
  private _isHoverOn: boolean;

  /**
   * 创建模板开口视图实例
   * 
   * @param element - SVG元素或元素ID
   * @param entity - 关联的实体模型对象
   * @param context - 应用上下文对象
   * @param viewBox - SVG视图盒配置
   * @param options - 可选配置项，包含 isTemplate 等属性
   */
  constructor(
    element: SVGElement | string,
    entity: HSCore.Model.Entity,
    context: HSApp.Context,
    viewBox: HSApp.View.SVG.ViewBox,
    options?: TemplateOpeningOptions
  );

  /**
   * 更新元素的选中状态样式
   * 根据当前状态（模板/正常/替换/悬停）应用相应的颜色样式
   * @internal
   */
  protected _updateSelectionStatus(): void;

  /**
   * 应用颜色样式到SVG元素
   * 
   * @param colorStyle - 要应用的颜色样式对象
   * @internal
   * 
   * @remarks
   * 该方法会：
   * - 更新主描边颜色（非计划标记的元素）
   * - 更新浅色描边（带有 hsw-stroke-plan="light" 属性的元素）
   * - 更新填充颜色（非计划标记的元素）
   */
  protected _updateColorStyle(colorStyle: ColorStyle): void;

  /**
   * 从资源文档中通过ID插入节点
   * 
   * @param targetElement - 目标父元素，新节点将插入到此元素中
   * @param resourceId - 资源文档中的元素ID
   * @internal
   * 
   * @remarks
   * 该方法异步加载资源文档，查找指定ID的元素并克隆插入到目标元素中
   * 插入完成后会触发视图盒变更和重绘
   */
  protected _insertNodeFromResourceById(
    targetElement: SVGElement,
    resourceId: string
  ): void;

  /**
   * 获取当前应该应用的颜色样式
   * 
   * @returns 根据当前状态返回对应的颜色样式对象
   * 
   * @remarks
   * 颜色样式的选择优先级：
   * 1. 模板模式 -> Template 样式
   * 2. 实体标记为替换 -> Replace 样式
   * 3. 鼠标悬停 -> NormalHover 样式
   * 4. 默认 -> Normal 样式
   */
  getColorStyle(): ColorStyle;

  /**
   * 绑定交互命令和事件处理
   * 设置鼠标悬停和移出事件，控制光标样式和视图重绘
   * 
   * @remarks
   * 在模板模式下不会响应鼠标事件
   * 非模板模式下：
   * - 鼠标悬停：切换到指针光标，触发悬停样式
   * - 鼠标移出：恢复默认光标，恢复正常样式
   */
  bindCommand(): void;
}