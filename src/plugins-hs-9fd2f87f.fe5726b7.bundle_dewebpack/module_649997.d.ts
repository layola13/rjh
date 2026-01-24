/**
 * CSS模块类型定义
 * 用于编辑设计对话框和保存对话框的样式
 */

/**
 * CSS模块导出接口
 * 包含所有可用的CSS类名
 */
export interface CSSModule {
  /** 弹窗容器根类 */
  popupcontainer: string;
  /** 编辑设计对话框类 */
  editdesigndialog: string;
  /** 保存对话框类 */
  savedialog: string;
  /** 遮罩层类 */
  'md-overlay': string;
  /** 弹窗窗口类 */
  popupwindows: string;
  /** 显示状态类 */
  'md-show': string;
  /** 窗口包装器类 */
  windowWrapper: string;
  /** 窗口头部类 */
  windowHeader: string;
  /** 标题类 */
  title: string;
  /** 关闭按钮类 */
  closeBtn: string;
  /** 窗口内容区域类 */
  windowContents: string;
  /** 设计表单类 */
  designform: string;
  /** 主要字段区域类 */
  mainfields: string;
  /** 表单行类 */
  'form-row': string;
  /** 表单标签类 */
  'form-label': string;
  /** 必填标签类 */
  'label-required': string;
  /** 表单行内容类 */
  'form-row-content': string;
  /** 设计名称长度提示类 */
  'design-name-length': string;
  /** 错误提示类 */
  'error-hints': string;
  /** 错误状态类 */
  error: string;
  /** 位置字段类 */
  positionfields: string;
  /** 城市字段类 */
  city: string;
  /** 社区字段类 */
  neighborhood: string;
  /** 下拉菜单类 */
  'dropdown-menu': string;
  /** 当前选中项类 */
  currentitem: string;
  /** 下拉箭头类 */
  caret: string;
  /** 深色文字类 */
  'dark-color': string;
  /** 表单标题类 */
  'form-title': string;
  /** 表单隐私设置类 */
  'form-privacy': string;
  /** 单选按钮卡片包装器类 */
  'radio-button-card-wrapper': string;
  /** 单选按钮组类（未选中） */
  'setting-radio-button-group0': string;
  /** 单选按钮类 */
  'setting-radio-button': string;
  /** 单选按钮组类（选中） */
  'setting-radio-button-group-checked': string;
  /** 单选按钮文本类 */
  'setting-radio-button-text': string;
  /** 单选按钮卡片右侧部分类 */
  'radio-button-card-right-part': string;
  /** 表单类型类 */
  'form-genre': string;
  /** 表单房屋模板类 */
  'form-house-template': string;
  /** 房屋模板第一行类 */
  'form-house-template-first-line': string;
  /** 房屋模板第一行项目类 */
  'form-house-template-first-line-item': string;
  /** 微型字段类 */
  microfield: string;
  /** 默认文本类 */
  defaulttext: string;
  /** 设计信息错误提示类 */
  'design-info-error-hints': string;
  /** 设计信息错误提示显示类 */
  'design-info-error-hints-show': string;
  /** 表单地址类 */
  'form-address': string;
  /** 地址第一行类 */
  'form-address-firstline': string;
  /** 地址长度提示类 */
  'form-address-length': string;
  /** 提示标签类 */
  hintLable: string;
  /** 默认选项类 */
  defaultoption: string;
  /** 样式字段类 */
  stylefield: string;
  /** 复选框项类 */
  checkboxitem: string;
  /** 中等尺寸类 */
  middle: string;
  /** 选项列表类 */
  optionslist: string;
  /** 复选框类 */
  checkbox: string;
  /** 注释消息类 */
  'note-msg': string;
  /** 房间属性字段类 */
  roomAttrfields: string;
  /** 附加字段包装器类 */
  addtionalfieldswrap: string;
  /** 操作按钮区域类 */
  actionbuttons: string;
  /** 取消设计按钮类 */
  'cancel-design': string;
  /** 保存设计按钮类 */
  'save-design': string;
  /** 聚焦状态类 */
  focus: string;
  /** 面板居中类 */
  panelcenter: string;
  /** 权限设置类 */
  authoritySetting: string;
  /** 隐私设置包装器类 */
  privacywrapper: string;
  /** 主要按钮类 */
  'btn-primary': string;
  /** 默认按钮类 */
  'btn-default': string;
  /** 打开状态类 */
  open: string;
  /** 下拉切换类 */
  'dropdown-toggle': string;
  /** 公开选项类 */
  'public-option': string;
  /** 只读选项类 */
  'readonly-option': string;
  /** 私有选项类 */
  'private-option': string;
  /** 当前选项类 */
  'current-option': string;
  /** 悬停状态类 */
  hover: string;
  /** 图标类 */
  icon: string;
  /** 只读图标类 */
  readonly: string;
  /** 私有图标类 */
  private: string;
  /** 文本类 */
  text: string;
  /** 下拉箭头类 */
  dropDownArrow: string;
  /** 显示状态类 */
  show: string;
  /** 激活状态类 */
  active: string;
}

/**
 * CSS模块默认导出
 * 返回包含所有CSS类名映射的对象
 */
declare const styles: CSSModule;

export default styles;