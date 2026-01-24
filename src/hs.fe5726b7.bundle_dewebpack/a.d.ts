/**
 * UI组件类型常量枚举
 * 定义了系统中所有可用的UI组件类型标识符
 * @module ComponentTypes
 */

/**
 * UI组件类型枚举对象
 * 包含所有支持的UI组件类型的字符串常量
 * @readonly
 */
export declare const ComponentTypes: {
  /** 属性栏组件 */
  readonly PropertyBar: "propertyBar";
  
  /** 一级节点组件 */
  readonly FirstLevelNode: "firstLevelNode";
  
  /** 二级节点组件 */
  readonly SecondLevelNode: "secondLevelNode";
  
  /** 三级节点组件 */
  readonly ThirdLevelNode: "thirdLevelNode";
  
  /** 浮动项组件 */
  readonly FloatItem: "floatItem";
  
  /** 单选按钮组件 */
  readonly RadioButton: "radioButton";
  
  /** 长度输入框组件 */
  readonly LengthInput: "lengthInput";
  
  /** 滑块输入组件 */
  readonly SliderInput: "sliderInput";
  
  /** 滑块输入组组件 */
  readonly SliderInputGroup: "sliderInputGroup";
  
  /** 图片按钮组件 */
  readonly ImageButton: "imageButton";
  
  /** 开关组件 */
  readonly Switch: "switch";
  
  /** 标签页选择组件 */
  readonly TabsSelect: "tabsSelect";
  
  /** 颜色选择器组件 */
  readonly ColorPicker: "colorPicker";
  
  /** 房间类型下拉列表组件 */
  readonly Dropdownroomtypelist: "dropdownroomtypelist";
  
  /** 下拉列表组件 */
  readonly DropdownList: "dropdownlist";
  
  /** 下拉输入框组件 */
  readonly DropdownInput: "dropdowninput";
  
  /** 区域下拉列表组件 */
  readonly DropdownAreaList: "dropdownarealist";
  
  /** 复选框组件 */
  readonly CheckBox: "checkbox";
  
  /** 按钮组件 */
  readonly Button: "button";
  
  /** 标签单选按钮组件 */
  readonly LabelRadioButton: "labelRadioButton";
  
  /** 图文按钮组件 */
  readonly ImageTextButton: "imageTextButton";
  
  /** 块对齐组件 */
  readonly BlockAlign: "blockAlign";
  
  /** 标签按钮组件 */
  readonly LabelButton: "labelButton";
  
  /** 无选择组件 */
  readonly NoChoice: "noChoice";
  
  /** 复选块组件 */
  readonly CheckBlock: "checkBlock";
  
  /** 图片尺寸标签单选输入组件 */
  readonly TpzzLabelRadioInput: "tpzz-labelradioinput";
  
  /** 图片尺寸长度输入组件 */
  readonly TpzzLengthInput: "tpzz-lengthinput";
  
  /** 图片尺寸标签按钮组组件 */
  readonly LabelButtons: "tpzz-labelbuttons";
  
  /** 标签输入框组件 */
  readonly LabelInput: "labelinput";
  
  /** 旋转按钮组件 */
  readonly RotateButton: "rotatebutton";
  
  /** 轴向旋转组件 */
  readonly AxialRotation: "axialRotation";
  
  /** 多选按钮组件 */
  readonly MultiSelectButton: "MultiSelectButton";
  
  /** 示意图组件 */
  readonly SchematicDiagram: "schematicdiagram";
};

/**
 * 组件类型联合类型
 * 表示所有可能的组件类型值
 */
export type ComponentType = typeof ComponentTypes[keyof typeof ComponentTypes];