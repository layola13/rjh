/**
 * 图片搜索页面模块
 * 提供基于AI图像识别的商品搜索功能
 */

import { ReactElement, RefObject } from 'react';

/**
 * 图片数据接口
 */
export interface ImageData {
  /** 图片搜索URL */
  imgSearchUrl: string;
  /** 图片宽度（像素） */
  imgWidth: number;
  /** 图片高度（像素） */
  imgHeight: number;
}

/**
 * 类别信息接口
 */
export interface Category {
  /** 类别代码 */
  code: number;
  /** 类别名称 */
  name: string;
  /** 子类别列表 */
  children?: Category[];
}

/**
 * 商品项接口
 */
export interface ProductItem {
  /** 商品唯一标识 */
  uuid: string;
  /** 供应商ID */
  vendorId?: string;
  /** 风格ID */
  styleId?: string;
  /** 色块列表 */
  colorBlocks?: number[];
}

/**
 * 筛选条件接口
 */
export interface FilterCriteria {
  /** 品牌ID列表 */
  brandsIds?: string;
  /** 属性ID（格式：前缀_实际ID） */
  attributeIds?: string;
  /** 色块ID */
  colorBlock?: string;
}

/**
 * 筛选器配置接口
 */
export interface FilterConfig {
  /** 筛选器标题 */
  title: string;
  /** 其他筛选器配置项 */
  [key: string]: unknown;
}

/**
 * 图片搜索API请求参数
 */
export interface ImageSearchParams {
  /** 图片URL */
  imgUrl: string;
  /** 类别代码（可选） */
  category?: number;
  /** 边界框坐标字符串（格式：x1,y1,x2,y2） */
  boxStr: string;
}

/**
 * 图片搜索API响应数据
 */
export interface ImageSearchResponse {
  /** 预测的类别列表 */
  predictCategories: number[];
  /** 筛选器配置 */
  filters?: FilterConfig;
  /** 商品列表 */
  items: ProductItem[];
}

/**
 * 类别更新状态枚举
 */
export enum ECategoryUpdateState {
  /** 默认状态 */
  default = 'default',
  /** 清空状态 */
  clear = 'clear',
  /** 更新状态 */
  update = 'update'
}

/**
 * 图片搜索页面组件属性
 */
export interface ImageSearchPageProps {
  /** 图片数据 */
  imgData: ImageData;
  /** 返回按钮回调函数 */
  onBack: () => void;
}

/**
 * 图标按钮视图属性
 */
export interface IconfontViewProps {
  /** 图标类型 */
  showType: string;
  /** 自定义样式 */
  customStyle?: React.CSSProperties;
  /** 悬停背景色 */
  hoverBgColor?: string;
  /** 点击时的颜色 */
  clickColor?: string;
}

/**
 * 图标圆形视图属性
 */
export interface IconfontRadiusViewProps {
  /** 自定义类名 */
  customClass?: string;
  /** 自定义样式 */
  customStyle?: React.CSSProperties;
  /** 图标点击回调 */
  iconOnclick: () => void;
  /** 图标类型 */
  showType: string;
  /** 背景配置 */
  background?: {
    width: string;
    height: string;
    borderRadius: string;
    background: string;
  };
}

/**
 * 图片搜索按钮属性
 */
export interface ImageSearchButtonProps {
  /** 显示图片回调 */
  showPicture: (imgData: ImageData) => void;
  /** 是否为重新上传按钮 */
  isReUpLoadButton?: boolean;
}

/**
 * 图片视图组件属性
 */
export interface ImageViewProps {
  /** 图片URL */
  imageUrl: string;
  /** 面板是否隐藏 */
  isPanelHidden: boolean;
  /** 显示面板回调 */
  onShowPanel: () => void;
  /** 搜索图片类别函数 */
  searchPictureCategories: (categories: number[]) => Category[];
  /** 搜索图片回调 */
  searchPicture: (
    boxCoords: number[],
    categoryCode?: number,
    imageUrl?: string,
    shouldClearResults?: boolean
  ) => void;
  /** 默认状态 */
  defaultState: boolean;
  /** 类别列表 */
  categoryList: Category[];
  /** 类别列表更新状态 */
  updateCategoryList: ECategoryUpdateState;
}

/**
 * 图片面板组件属性
 */
export interface ImagePanelProps {
  /** 原始图片URL */
  originImageUrl: string;
  /** 原始图片宽度 */
  originImageWidth: number;
  /** 原始图片高度 */
  originImageHeight: number;
  /** 隐藏面板回调 */
  onHidePanel: () => void;
  /** 显示面板回调 */
  onShowPanel: () => void;
  /** 取消操作回调 */
  onCancel: () => void;
  /** 改变图片面板位置回调 */
  changeImagePanelPosition: () => void;
  /** 搜索图片回调 */
  searchPicture: (
    boxCoords: number[],
    categoryCode?: number,
    imageUrl?: string,
    shouldClearResults?: boolean
  ) => void;
}

/**
 * 加载组件属性
 */
export interface LoadingProps {
  /** 是否显示加载状态 */
  show: boolean;
}

/**
 * 筛选容器组件属性
 */
export interface FilterContainerProps {
  /** 筛选器配置 */
  filters: FilterConfig;
  /** 组件引用 */
  ref: RefObject<HTMLDivElement>;
  /** 筛选搜索回调 */
  onFilterSearch: (criteria: FilterCriteria) => void;
  /** 筛选器映射表 */
  filterMap: Map<string, unknown>;
  /** 标题 */
  title: string;
}

/**
 * 商品项容器组件属性
 */
export interface ProductItemContainerProps {
  /** 商品唯一键 */
  key: string;
  /** 商品数据 */
  item: ProductItem;
}

/**
 * 获取灵感图片识别类别
 * @returns Promise，解析为包含类别列表的对象
 */
export declare function getInspirationImageRecognizeCategory(): Promise<{
  categoryList: Category[];
}>;

/**
 * 获取图片搜索数据
 * @param params - 搜索参数
 * @returns Promise，解析为图片搜索响应数据
 */
export declare function getData(params: ImageSearchParams): Promise<ImageSearchResponse>;

/**
 * 图片搜索页面主组件
 * 提供AI图像识别、商品搜索、筛选等功能
 * 
 * @param props - 组件属性
 * @returns React元素
 * 
 * @example
 *