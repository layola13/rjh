/**
 * 图片搜索分类更新状态枚举
 */
export enum ECategoryUpdateState {
  /** 默认状态 */
  default = 0,
  /** 清除状态 */
  clear = 1,
  /** 更新状态 */
  update = 2
}

/**
 * 分类项数据结构
 */
export interface ICategoryItem {
  /** 分类代码 */
  code: string | number;
  /** 分类名称 */
  name: string;
  /** 其他可选属性 */
  [key: string]: unknown;
}

/**
 * 用户行为追踪参数
 */
export interface IUserTrackParams {
  /** 事件描述 */
  description: string;
  /** 事件参数 */
  param: {
    /** 类型：all（全部）| top-three-categories（前三分类）| more（更多） */
    type: 'all' | 'top-three-categories' | 'more';
    /** 分类名称 */
    category: string;
  };
}

/**
 * ImageView 组件属性接口
 */
export interface IImageViewProps {
  /** 图片URL */
  imageUrl: string;
  /** 搜索图片分类列表（前几个常用分类） */
  searchPictureCategories: ICategoryItem[];
  /** 当前选中的分类ID */
  categoryId?: string | number;
  /** 执行图片搜索的回调函数 */
  searchPicture: (
    param1: undefined,
    categoryCode: string | number,
    param3: undefined,
    param4: boolean
  ) => void;
  /** 是否显示默认状态 */
  defaultState?: boolean;
  /** 完整分类列表 */
  categoryList: ICategoryItem[];
  /** 分类列表更新标志 */
  updateCategoryList?: boolean;
  /** 是否隐藏面板 */
  isPanelHidden?: boolean;
  /** 显示面板的回调 */
  onShowPanel?: () => void;
}

/**
 * 图片查看组件
 * 用于灵感图搜功能，支持按分类筛选图片
 * 
 * @param props - 组件属性
 * @returns React 函数组件
 */
export declare function ImageView(props: IImageViewProps): JSX.Element;

/**
 * 全局资源管理器（外部依赖）
 */
declare global {
  const ResourceManager: {
    getString(key: string): string;
  };

  namespace HSApp {
    interface IUserTrackLogger {
      push(
        eventName: string,
        params: IUserTrackParams,
        options: Record<string, unknown>
      ): void;
    }

    interface IApp {
      userTrackLogger: IUserTrackLogger;
    }

    namespace App {
      function getApp(): IApp;
    }
  }
}

/**
 * 分类项控件属性（外部依赖）
 */
export interface ICategoryItemControlProps {
  /** 点击分类的回调 */
  handleCategoryClick: (category: ICategoryItem) => void;
  /** 是否选中 */
  selected: boolean;
  /** 键名 */
  keyName: string;
  /** 分类数据 */
  category: ICategoryItem;
}

/**
 * 图片搜索下拉菜单属性（外部依赖）
 */
export interface IImageSearchDropdownProps {
  /** 分类名称 */
  categoryName: string;
  /** 已选中的更多分类 */
  selectedMoreCategory: ICategoryItem | null;
  /** 完整分类列表 */
  categoryList: ICategoryItem[];
  /** 禁用的分类列表 */
  disabledCategories: ICategoryItem[];
  /** 点击分类的回调 */
  onCategoryClick: (category: ICategoryItem) => void;
}