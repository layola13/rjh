/**
 * 底部导航栏组件类型定义
 */
declare module 'bottom-bar' {
  import { VueConstructor } from 'vue';

  /** 菜单项配置 */
  interface MenuItem {
    /** 菜单标签（国际化key） */
    label: string;
    /** 默认图标类名 */
    icon: string;
    /** 激活状态图标类名 */
    active_icon: string;
    /** 路由名称 */
    router_name: string;
  }

  /** 底部导航栏组件Props */
  interface BottomBarProps {
    // 此组件无外部props
  }

  /** 底部导航栏组件 */
  const BottomBar: VueConstructor;
  export default BottomBar;
}

/**
 * 目录树组件类型定义
 */
declare module 'catalog-tree' {
  import { VueConstructor } from 'vue';

  /** 激活目录ID配置 */
  interface ActiveIds {
    /** 一级目录ID */
    first: number;
    /** 二级目录ID */
    second: number;
    /** 三级目录ID */
    third: number;
  }

  /** 固定顶部配置 */
  interface FixTopConfig {
    /** 是否启用固定定位 */
    use: boolean;
    /** 顶部距离 */
    top: number;
  }

  /** 目录项 */
  interface CatalogItem {
    /** 目录ID */
    id: number;
    /** 目录名称 */
    name: string;
    /** 子目录列表 */
    children: CatalogItem[];
    /** 是否限制编辑 */
    limit_edit?: boolean;
    /** 是否为默认目录 */
    is_default?: boolean;
  }

  /** 目录点击事件参数 */
  interface ClickCatalogEvent {
    /** 目录层级 */
    level: number;
    /** 目录路径（从根到当前节点） */
    catalogs: CatalogItem[];
  }

  /** 目录操作事件参数 */
  interface CatalogActionEvent {
    /** 目录层级 */
    level: number;
    /** 操作类型 */
    type: 'add' | 'edit' | 'delete';
    /** 目录路径 */
    catalogs: CatalogItem[];
  }

  /** 目录树组件Props */
  interface CatalogTreeProps {
    /** 是否可编辑 */
    canEdit?: boolean;
    /** 目录列表 */
    list?: CatalogItem[];
    /** 激活的目录ID配置 */
    activeIds?: ActiveIds;
    /** 目录层级数 */
    level?: number;
    /** 自定义高度 */
    height?: string;
    /** 是否隐藏头部 */
    hideHead?: boolean;
    /** 固定顶部配置 */
    fix_top?: FixTopConfig;
  }

  /** 目录树组件 */
  const CatalogTree: VueConstructor;
  export default CatalogTree;
}

/**
 * 窗型图库主组件类型定义
 */
declare module 'windoor-library' {
  import { VueConstructor } from 'vue';

  /** 目录编辑对话框数据 */
  interface MenuDialogData {
    /** 是否显示 */
    show: boolean;
    /** 对话框标题 */
    title: string;
  }

  /** 目录模型数据 */
  interface MenuModel {
    /** 操作类型 */
    type: string;
    /** 目录模式（0=一级，1=二级） */
    mode: number;
    /** 目录名称 */
    name: string;
    /** 备注 */
    note: string;
    /** 父级ID */
    fid: string | number;
    /** 目录ID */
    id: string | number;
  }

  /** 删除确认数据 */
  interface ConfirmDeleteData {
    /** 是否显示确认框 */
    show: boolean;
    /** 公司ID */
    company_id: string;
    /** 提示文本 */
    context: string;
    /** 删除项ID */
    id: string | number;
    /** 删除类型 */
    type: 'menu' | 'windoor';
  }

  /** 窗型数据 */
  interface WindoorItem {
    /** 窗型ID */
    id: number;
    /** 窗型名称 */
    name: string;
    /** 图片URL */
    pic_url: string;
    /** 公司ID */
    company_id: string;
    /** 排序索引 */
    sortableIndex?: number;
    /** 动画属性 */
    animated?: boolean;
  }

  /** 窗型图库组件Props */
  interface WindoorLibraryProps {
    /** 是否为选择模式 */
    choosewindoor?: boolean;
    /** 是否单选 */
    singleChoose?: boolean;
    /** 是否隐藏顶部栏 */
    hideTopbar?: boolean;
  }

  /** 窗型图库组件 */
  const WindoorLibrary: VueConstructor;
  export default WindoorLibrary;
}

/**
 * Vue Draggable组件类型定义
 */
declare module 'vuedraggable' {
  import { VueConstructor } from 'vue';

  /** 拖拽组配置 */
  interface DraggableGroup {
    /** 组名称 */
    name?: string;
    /** 拉取配置 */
    pull?: boolean | string | string[] | ((to: any, from: any, dragEl: HTMLElement, evt: Event) => boolean);
    /** 放置配置 */
    put?: boolean | string | string[];
    /** 是否还原克隆 */
    revertClone?: boolean;
  }

  /** Draggable组件Props */
  interface DraggableProps<T = any> {
    /** 可拖拽列表数据 */
    list?: T[];
    /** 双向绑定的值 */
    value?: T[];
    /** Sortable配置选项 */
    options?: Record<string, any>;
    /** 克隆函数 */
    clone?: (original: T) => T;
    /** 容器元素标签名 */
    element?: string;
    /** 容器标签（替代element） */
    tag?: string;
    /** 移动回调 */
    move?: (evt: any, originalEvent: Event) => boolean | void;
    /** 组件数据 */
    componentData?: Record<string, any>;
    /** 拖拽时不启用过渡 */
    noTransitionOnDrag?: boolean;
    /** 是否禁用 */
    disabled?: boolean;
    /** 拖拽元素选择器 */
    draggable?: string;
    /** 组配置 */
    group?: string | DraggableGroup;
    /** 是否允许排序 */
    sort?: boolean;
    /** 延迟时间（ms） */
    delay?: number;
    /** 是否仅在触摸设备上延迟 */
    delayOnTouchOnly?: boolean;
    /** 动画持续时间（ms） */
    animation?: number;
    /** 拖拽样式类 */
    dragClass?: string;
    /** 幽灵元素样式类 */
    ghostClass?: string;
    /** 选中样式类 */
    chosenClass?: string;
    /** 忽略的选择器 */
    ignore?: string;
    /** 过滤器选择器或函数 */
    filter?: string | ((evt: Event, target: HTMLElement, draggable: VueConstructor) => boolean);
    /** 过滤时是否阻止默认行为 */
    preventOnFilter?: boolean;
  }

  /** Draggable组件事件 */
  interface DraggableEvents<T = any> {
    /** 开始拖拽 */
    start?: (evt: any) => void;
    /** 添加元素 */
    add?: (evt: any) => void;
    /** 移除元素 */
    remove?: (evt: any) => void;
    /** 更新位置 */
    update?: (evt: any) => void;
    /** 拖拽结束 */
    end?: (evt: any) => void;
    /** 选择元素 */
    choose?: (evt: any) => void;
    /** 取消选择 */
    unchoose?: (evt: any) => void;
    /** 排序 */
    sort?: (evt: any) => void;
    /** 过滤 */
    filter?: (evt: any) => void;
    /** 克隆 */
    clone?: (evt: any) => void;
    /** 数据变化 */
    change?: (evt: { added?: any; removed?: any; moved?: any }) => void;
  }

  /** Vue Draggable组件 */
  const Draggable: VueConstructor;
  export default Draggable;
}

/**
 * Sortable.js核心类型定义
 */
declare module 'sortablejs' {
  /** Sortable实例选项 */
  export interface SortableOptions {
    group?: string | { name: string; pull?: boolean | string; put?: boolean | string[] };
    sort?: boolean;
    disabled?: boolean;
    animation?: number;
    handle?: string;
    filter?: string;
    draggable?: string;
    ghostClass?: string;
    chosenClass?: string;
    dragClass?: string;
    swapThreshold?: number;
    invertSwap?: boolean;
    direction?: 'vertical' | 'horizontal' | (() => string);
    scrollSensitivity?: number;
    scrollSpeed?: number;
    bubbleScroll?: boolean;
    emptyInsertThreshold?: number;
    
    /** 事件回调 */
    onStart?: (evt: any) => void;
    onEnd?: (evt: any) => void;
    onAdd?: (evt: any) => void;
    onUpdate?: (evt: any) => void;
    onRemove?: (evt: any) => void;
    onSort?: (evt: any) => void;
    onMove?: (evt: any, originalEvent: Event) => boolean | -1 | 1;
    onClone?: (evt: any) => void;
    onChange?: (evt: any) => void;
  }

  /** Sortable类 */
  export class Sortable {
    constructor(element: HTMLElement, options?: SortableOptions);
    
    /** 销毁实例 */
    destroy(): void;
    
    /** 获取配置项 */
    option<K extends keyof SortableOptions>(name: K): SortableOptions[K];
    
    /** 设置配置项 */
    option<K extends keyof SortableOptions>(name: K, value: SortableOptions[K]): void;
    
    /** 当前拖拽的元素 */
    static dragged: HTMLElement | null;
    
    /** 幽灵元素 */
    static ghost: HTMLElement | null;
    
    /** 克隆元素 */
    static clone: HTMLElement | null;
    
    /** 当前激活的实例 */
    static active: Sortable | null;
    
    /** 挂载插件 */
    static mount(...plugins: any[]): void;
    
    /** 创建实例 */
    static create(element: HTMLElement, options?: SortableOptions): Sortable;
  }

  export default Sortable;
}