/**
 * 灵感库模板房间页面类型定义
 * @module TemplateRoomPage
 */

/**
 * 过滤器配置项
 */
interface FilterItem {
  id: string;
  name: string;
  value: string;
  enumerable?: boolean;
}

/**
 * 过滤器容器
 */
interface Filters {
  /** 外部过滤器 */
  outerFilters: FilterItem[];
  /** 其他过滤器 */
  restFilters: FilterItem[];
}

/**
 * 产品项数据
 */
interface ProductItem {
  id: string;
  roomId: string;
  image: string;
  imageDesignVersion: string;
  imageRenderingType: 'panorama' | 'standard';
  contentType: HSCatalog.ContentType;
  productType: HSCatalog.ProductTypeEnum;
  creatorGuid?: string;
  copyright?: string;
  sellType?: number;
  paid?: boolean;
  status?: number;
  dataType?: number;
  hasPano?: boolean;
  supportSelect?: boolean;
  showFavorite?: boolean;
  favoritesId?: string;
  customizedRoom?: {
    colorLump?: string;
  };
  apply?: 'all' | 'hardDecoration' | 'softDecoration';
  contextmenu?: {
    items: ContextMenuItem[];
  };
}

/**
 * 右键菜单项
 */
interface ContextMenuItem {
  id: string;
  name?: string;
  disabled?: boolean;
  onclick?: (data: ProductItem & { isWholeHouse: number }, callback: () => void) => void;
  popover?: {
    placement: string;
    trigger: string;
    delay?: number;
    delayOpen?: number;
    delayClose?: number;
    imageUrl?: string;
    videoUrl?: string;
    text?: string;
    showBtn?: boolean;
    onBtnClick?: () => void;
    btnText?: string;
    linkText?: string;
    linkUrl?: string;
  };
}

/**
 * 页面状态
 */
interface PageState {
  /** 是否加载中 */
  isLoading: boolean;
  /** 过滤器配置 */
  filters: Filters;
  /** 产品列表 */
  items: ProductItem[];
  /** 总数 */
  total: number;
}

/**
 * 查询参数
 */
interface QueryParams {
  /** 偏移量 */
  offset: number;
  /** 每页数量 */
  limit: number;
  /** 房间类别 (1:全屋, 2:单房间) */
  roomCategory?: number;
  /** 搜索名称 */
  name?: string;
  /** 搜索关键词 */
  search?: string;
  /** 是否选中模型 */
  modelSelected?: boolean;
  /** 模型状态 */
  modelStatus?: number;
  /** 在线状态 */
  onlineStatus?: number;
}

/**
 * 支付信息
 */
interface PayInfo {
  /** 是否需要支付 */
  needPay: boolean;
  /** 是否已支付 */
  paid: boolean;
  /** 是否VIP */
  isVip: boolean;
}

/**
 * 轮播面板按钮配置
 */
interface CarouselPanelButton {
  key: 'all' | 'hardDecoration' | 'softDecoration';
  eventKey: string;
  label: string;
  active: boolean;
  hide?: boolean;
  click: (event: MouseEvent) => void;
}

/**
 * 图片列表项
 */
interface ImageListItem {
  version: string;
  imageUrl: string;
  isPano: boolean;
  miniImageUrl: string;
  copyright?: string;
  label: string;
  id: string;
}

/**
 * 轮播面板缓存数据
 */
interface CarouselCacheData {
  data: ProductItem;
  top: number;
  imgList: ImageListItem[];
  baseHouseDataUrl: string;
  colorList?: unknown[];
}

/**
 * 房间类型选项
 */
interface RoomTypeTab {
  value: 'singleRoom' | 'wholeHouse';
  label: React.ReactNode;
}

/**
 * 组件属性
 */
interface TemplateRoomPageProps {
  /** 页面类型 */
  type: 'public_styler_template_page' | 'enterprise_styler_template_page' | 'my_styler_template' | 'model_collocation_page';
  /** 副标题 */
  subTitle?: string;
  /** 提示内容 */
  tooltipContent?: string;
  /** 是否显示标签页 */
  showTabs?: boolean;
  /** 是否显示创建模板房间按钮 */
  showCreateTemplateRoomButton?: boolean;
  /** 是否显示问卷 */
  showSurvey?: boolean;
  /** 是否显示应用入口 */
  showApplyEntry?: boolean;
  /** 问卷类型 */
  surveyType?: string;
  /** 查询产品API */
  queryProductApi?: string;
  /** 产品构建器 */
  productBuilder?: unknown;
  /** 页面切换回调 */
  onSwitchPage: (item: ProductItem) => void;
}

/**
 * 产品数据响应
 */
interface ProductQueryResponse {
  filters: Filters;
  items: ProductItem[];
  total: number;
  stylerMember?: boolean;
}

/**
 * 收藏操作参数
 */
interface FavoriteParams {
  sourceId: string;
  favoritesType: number;
  isFavorite: boolean;
  favoritesId?: string;
}

/**
 * 事件追踪参数
 */
interface TrackingParams {
  label?: string;
  GUID?: string;
  sampleRoomID?: string;
  sSampleroomID?: string;
  origin?: string;
}

/**
 * 用户追踪数据
 */
interface UserTrackData {
  activeSection: string;
  activeSectionName: string;
  description: string;
  clicksRatio: {
    id: string;
    name: string;
    subItem?: {
      id: string;
      name: string;
      subItem?: {
        id: string;
        name: string;
      };
    };
  };
}

/**
 * 灵感库模板房间基础页面组件
 * 
 * @description 展示模板房间、全屋方案或模型搭配的列表页面，支持搜索、筛选、应用等功能
 * 
 * @param props - 组件属性
 * @returns 模板房间页面组件
 * 
 * @example
 *