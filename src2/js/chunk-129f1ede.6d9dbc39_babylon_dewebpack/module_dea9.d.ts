/**
 * 产品目录与公式管理组件类型定义
 * 用于管理门窗产品的分类目录、系列和计算公式
 */

/** OSS图片压缩参数 */
declare const OSS_IMAGE_QUALITY_PARAM = "x-image-process=image/quality,q_30";

/** 目录展开状态 */
interface CatalogExpandState {
  /** 一级目录ID */
  first: number;
  /** 二级目录ID */
  second: number;
  /** 三级产品系列ID */
  third: number;
}

/** 菜单弹窗状态 */
interface MenuDialogState {
  /** 是否显示弹窗 */
  show: boolean;
  /** 操作类型: 'addFirst' | 'addSecond' | 'editMenu' | 'addProduct' | 'editProduct' */
  action: string;
  /** 弹窗标题 */
  title: string;
}

/** 删除确认弹窗状态 */
interface ConfirmDeleteState {
  /** 是否显示确认弹窗 */
  show: boolean;
  /** 确认提示文本 */
  context: string;
  /** 待删除项ID */
  id: string;
  /** 删除类型: 'menu' | 'product' | 'script' */
  type: string;
}

/** 选择门窗弹窗状态 */
interface ChooseWindoorState {
  /** 是否显示选择窗 */
  show: boolean;
}

/** 菜单/产品数据模型 */
interface MenuModel {
  /** 类型: 0=一级目录, 1=二级目录 */
  type: number;
  /** 名称 */
  name: string;
  /** 备注 */
  note: string;
  /** 父级ID */
  fid: string;
  /** 当前ID */
  id: string;
  /** 产品ID（编辑产品时使用） */
  pid: string;
}

/** 产品目录项 */
interface ProductCatalog {
  /** 目录ID */
  id: number;
  /** 目录名称 */
  name: string;
  /** 备注 */
  note?: string;
  /** 父级ID */
  fid: number;
  /** 子目录列表 */
  children?: ProductCatalog[];
}

/** 产品系列 */
interface ProductSeries {
  /** 系列ID */
  id: number;
  /** 系列名称 */
  name: string;
  /** 备注 */
  note?: string;
  /** 所属目录ID */
  catelog_id: number;
}

/** 计算公式脚本 */
interface Script {
  /** 脚本ID */
  id: number;
  /** 脚本名称 */
  name: string;
  /** 预览图URL */
  pic_url: string;
  /** 所属产品ID */
  product_id: number;
}

/** 目录点击事件参数 */
interface CatalogClickEvent {
  /** 点击层级: 1=一级目录, 2=二级目录, 3=产品系列 */
  level: number;
  /** 目录路径数组 */
  catalogs: ProductCatalog[];
}

/** 目录操作事件参数 */
interface CatalogActionEvent {
  /** 操作层级 */
  level: number;
  /** 操作类型: 'add' | 'edit' | 'delete' */
  type: string;
  /** 目录路径数组 */
  catalogs: ProductCatalog[];
}

/** API响应基础结构 */
interface ApiResponse<T = unknown> {
  /** 响应码: 1=成功 */
  code: number;
  /** 响应消息 */
  message: string;
  /** 响应数据 */
  data?: T;
}

/** 组件Props定义 */
interface ComponentProps {
  /** 是否为选择脚本模式 */
  choosescript?: boolean;
  /** 是否单选模式 */
  singleChoose?: boolean;
  /** 外部传入的脚本列表 */
  scriptList?: Script[];
}

/** 组件数据定义 */
interface ComponentData {
  /** OSS图片压缩参数 */
  OSS_ZIP: string;
  /** 目录展开状态 */
  expand_catalog_id: CatalogExpandState;
  /** 菜单弹窗状态 */
  menu_dialog: MenuDialogState;
  /** 删除确认弹窗状态 */
  confirm_delete: ConfirmDeleteState;
  /** 选择门窗弹窗状态 */
  choose_windoor: ChooseWindoorState;
  /** 已选择的脚本列表 */
  choosen_script: Script[];
  /** 菜单编辑数据模型 */
  menu_model: MenuModel;
  /** 产品目录树 */
  productmenu: ProductCatalog[];
  /** 当前显示的脚本列表 */
  scriptlist: Script[];
}

/** 组件计算属性 */
interface ComponentComputed {
  /** 是否为小屏幕 */
  is_small_screen: boolean;
}

/** 组件方法定义 */
interface ComponentMethods {
  /**
   * 新增脚本
   * 小屏跳转到移动端新增页面，大屏显示选择门窗弹窗
   */
  add_script(): void;

  /**
   * 菜单模型数据初始化
   * 重置所有弹窗状态和菜单模型数据
   */
  menu_model_dataInitialization(): void;

  /**
   * 准备删除操作
   * @param id - 待删除项ID
   * @param type - 删除类型: 'menu' | 'product' | 'script'
   */
  deleteReady(id: string, type: string): void;

  /**
   * 执行删除操作
   * 根据confirm_delete.type调用对应的删除API
   */
  dodelete(): void;

  /**
   * 显示菜单编辑弹窗
   * @param action - 操作类型
   * @param data - 相关数据对象
   */
  showMenuDialog(action: string, data?: ProductCatalog | ProductSeries): void;

  /**
   * 获取脚本列表
   * 根据当前选中的产品系列ID获取脚本列表
   */
  getscriptlist(): void;

  /**
   * 获取产品列表
   * @param autoExpand - 是否自动展开第一个产品
   */
  getproduct_list(autoExpand?: boolean): void;

  /**
   * 获取产品目录树
   * @param autoExpand - 是否自动展开第一级目录
   */
  getproduct_catelog(autoExpand?: boolean): void;

  /**
   * 编辑弹窗提交
   * 根据action类型调用对应的提交方法
   */
  edit_dialog_submit(): void;

  /**
   * 数据初始化
   * 重置已选择的脚本列表
   */
  dataInitialization(): void;

  /**
   * 选择门窗提交
   * 将选中的门窗创建为脚本
   */
  choose_windoor_submit(): void;

  /**
   * 产品系列提交
   * 新增或编辑产品系列
   */
  productsubmit(): void;

  /**
   * 目录提交
   * 新增或编辑目录
   */
  menusubmit(): void;

  /**
   * 目录点击事件处理
   * @param event - 目录点击事件参数
   */
  handleClickCatalog(event: CatalogClickEvent): void;

  /**
   * 目录操作事件处理
   * @param event - 目录操作事件参数
   */
  handleCatalogAction(event: CatalogActionEvent): void;
}

/**
 * 产品管理组件完整类型定义
 */
declare interface ProductManagementComponent {
  /** 组件属性 */
  props: ComponentProps;
  /** 组件数据 */
  data(): ComponentData;
  /** 组件计算属性 */
  computed: ComponentComputed;
  /** 组件方法 */
  methods: ComponentMethods;
  /** 生命周期：挂载后 */
  mounted(): void;
}

export default ProductManagementComponent;