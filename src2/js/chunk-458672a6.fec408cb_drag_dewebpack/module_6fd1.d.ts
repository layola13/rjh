/**
 * 窗型图库模块类型定义
 * 用于管理窗型模板的目录结构和窗型数据
 */

/** 目录展开状态 */
interface ExpandCatalogId {
  /** 一级目录ID */
  first: number;
  /** 二级目录ID */
  second: number;
}

/** 菜单对话框配置 */
interface MenuDialog {
  /** 是否显示对话框 */
  show: boolean;
  /** 对话框标题 */
  title: string;
}

/** 删除确认对话框数据 */
interface ConfirmDelete {
  /** 是否显示对话框 */
  show: boolean;
  /** 公司ID */
  company_id: string;
  /** 提示文本内容 */
  context: string;
  /** 要删除的项目ID */
  id: string;
  /** 删除类型: 'menu' | 'windoor' */
  type: 'menu' | 'windoor' | '';
}

/** 菜单模型数据 */
interface MenuModel {
  /** 操作类型: 'addfirst' | 'addsecond' | 'edit' */
  type: string;
  /** 模式: 0=一级目录, 1=二级目录 */
  mode: 0 | 1;
  /** 目录名称 */
  name: string;
  /** 备注 */
  note: string;
  /** 父级ID */
  fid: string;
  /** 当前ID（编辑时使用） */
  id: string;
}

/** 目录项数据结构 */
interface CatalogItem {
  /** 目录ID */
  id: number;
  /** 目录名称 */
  name: string;
  /** 备注 */
  note: string;
  /** 父级ID */
  fid: number;
  /** 是否为默认目录 */
  is_default: boolean;
  /** 是否限制编辑（默认目录且非超级管理员时为true） */
  limit_edit?: boolean;
  /** 子目录列表 */
  children: CatalogItem[];
  /** 公司ID */
  company_id?: string;
}

/** 窗型数据项 */
interface WindoorItem {
  /** 窗型ID */
  id: string;
  /** 窗型名称 */
  name: string;
  /** 图片URL */
  pic_url: string;
  /** 公司ID */
  company_id: string;
}

/** 用户信息 */
interface UserInfo {
  /** 用户ID（1为超级管理员） */
  id: number;
  /** 公司ID */
  company_id: string;
}

/** 目录点击事件参数 */
interface CatalogClickEvent {
  /** 目录层级: 1=一级, 2=二级 */
  level: 1 | 2;
  /** 目录链（从顶级到当前层级的目录数组） */
  catalogs: CatalogItem[];
}

/** 目录操作事件参数 */
interface CatalogActionEvent {
  /** 目录层级: 0=根级, 1=一级, 2=二级 */
  level: 0 | 1 | 2;
  /** 操作类型: 'add' | 'edit' | 'delete' */
  type: 'add' | 'edit' | 'delete';
  /** 目录链（从顶级到当前层级的目录数组） */
  catalogs: CatalogItem[];
}

/** 窗型列表查询参数 */
interface WindoorListParams {
  /** 公司ID（二级目录ID） */
  company_id?: number | string;
  /** 是否为默认目录 */
  is_default?: boolean;
}

/** 组件Props定义 */
interface ComponentProps {
  /** 是否为选择窗型模式 */
  choosewindoor: boolean;
  /** 是否为单选模式 */
  singleChoose: boolean;
  /** 是否隐藏顶部栏 */
  hideTopbar: boolean;
}

/** 组件Data定义 */
interface ComponentData {
  /** 移动端菜单是否显示 */
  menuShown: boolean;
  /** 是否为默认目录 */
  is_default: string;
  /** OSS图片压缩参数 */
  OSS_ZIP: string;
  /** 展开的目录ID状态 */
  expand_catalog_id: ExpandCatalogId;
  /** 菜单对话框状态 */
  menu_dialog: MenuDialog;
  /** 当前选中的菜单名称 */
  selectedMenu: string;
  /** 已选择的窗型列表 */
  windoorselected: WindoorItem[];
  /** 删除确认对话框数据 */
  confirm_delete: ConfirmDelete;
  /** 菜单编辑模型数据 */
  menu_model: MenuModel;
  /** 目录树列表 */
  menuList: CatalogItem[];
  /** 窗型列表 */
  windoor_list: WindoorItem[];
  /** 是否处于排序模式 */
  sortMode: boolean;
  /** 排序时的临时数据副本 */
  third_catalog_list_copy: WindoorItem[];
}

/** 组件计算属性 */
interface ComponentComputed {
  /** 是否为超级管理员（用户ID为1） */
  superman: boolean;
  /** 是否为小屏幕设备 */
  is_small_screen: boolean;
  /** 用户信息 */
  userinfo: UserInfo | null;
}

/** 组件方法定义 */
interface ComponentMethods {
  /** 分享页面（开发中） */
  sharePage(): void;
  
  /** 处理菜单显示状态变化 */
  handleMenuDisplayChange(show: boolean): void;
  
  /** 数据初始化（清空已选窗型） */
  dataInitialization(): void;
  
  /** 菜单模型数据初始化 */
  menu_model_dataInitialization(): void;
  
  /** 准备删除操作 */
  deleteReady(item: CatalogItem | WindoorItem, type: 'menu' | 'windoor'): void;
  
  /** 执行删除 */
  dodelete(): void;
  
  /** 显示菜单编辑对话框 */
  showMenuDialog(type: 'addfirst' | 'addsecond' | 'edit', catalog?: CatalogItem): void;
  
  /** 获取窗型目录树 */
  getwindoor_catelog(autoExpand?: boolean): void;
  
  /** 获取窗型列表 */
  getwindoor_list(params: WindoorListParams): void;
  
  /** 提交菜单编辑 */
  menusubmit(): void;
  
  /** 处理目录点击事件 */
  handleClickCatalog(event: CatalogClickEvent): void;
  
  /** 处理目录操作事件 */
  handleCatalogAction(event: CatalogActionEvent): void;
  
  /** 开启排序模式 */
  openSortMode(): void;
  
  /** 完成排序 */
  completeSort(): void;
  
  /** 跳转到窗型编辑页 */
  toWindoorType(windoor: WindoorItem): void;
  
  /** 新建窗型 */
  newWindow(): void;
}

/** Vue组件选项类型 */
export interface WindoorLibraryComponent {
  data(): ComponentData;
  props: ComponentProps;
  methods: ComponentMethods;
  computed: ComponentComputed & {
    userinfo: UserInfo | null;
  };
  mounted(): void;
  beforeRouteLeave(to: unknown, from: unknown, next: () => void): void;
  components: {
    CatalogTree: unknown;
    BottomBar: unknown;
    draggable: unknown;
  };
}

export default WindoorLibraryComponent;