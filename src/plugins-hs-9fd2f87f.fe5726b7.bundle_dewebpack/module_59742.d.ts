/**
 * 属性栏控件类型枚举
 */
declare enum PropertyBarControlTypeEnum {
  lengthInput = 'lengthInput',
  imageButton = 'imageButton',
  radioButton = 'radioButton'
}

/**
 * 属性栏项基础接口
 */
interface PropertyBarItemBase {
  /** 控件唯一标识 */
  id: string;
  /** 控件类型 */
  type: PropertyBarControlTypeEnum;
  /** 控件显示标签 */
  label?: string;
}

/**
 * 长度输入控件项
 */
interface LengthInputItem extends PropertyBarItemBase {
  type: PropertyBarControlTypeEnum.lengthInput;
  /** 长度输入控件的数据 */
  data: unknown;
}

/**
 * 图片按钮控件项
 */
interface ImageButtonItem extends PropertyBarItemBase {
  type: PropertyBarControlTypeEnum.imageButton;
}

/**
 * 单选按钮控件项
 */
interface RadioButtonItem extends PropertyBarItemBase {
  type: PropertyBarControlTypeEnum.radioButton;
  /** 单选按钮控件的数据 */
  data?: unknown;
}

/**
 * 属性栏控件项联合类型
 */
type PropertyBarItem = LengthInputItem | ImageButtonItem | RadioButtonItem;

/**
 * 详情页构建器类
 * 用于根据属性栏控件配置动态创建详情页面
 */
declare class DetailPageBuilder {
  constructor();

  /**
   * 根据属性栏控件项数组创建详情页面
   * @param items - 属性栏控件项数组
   * @param context - 上下文参数（未使用）
   * @returns React元素或undefined
   */
  createDetailPageByItems(
    items: PropertyBarItem[] | null | undefined,
    context?: unknown
  ): React.ReactElement | undefined;
}

export default DetailPageBuilder;