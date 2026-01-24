/**
 * 模型搭配与样板间相关的页面组件类型定义
 * @module StylerTemplatePage
 */

// ==================== 基础类型定义 ====================

/**
 * 页面类型枚举
 */
export type PageType =
  | 'public_styler_template_page'
  | 'my_styler_template'
  | 'enterprise_styler_template_page'
  | 'model_collocation_page'
  | 'model_collocation_product_page';

/**
 * 房间类型数据结构
 */
export interface RoomData {
  /** 房间名称 */
  name: string;
  /** 房间图片URL */
  image: string;
  /** 包含的模型列表 */
  models: Array<unknown>;
  /** 房间类型名称 */
  roomTypeName: string;
}

/**
 * 产品数据结构
 */
export interface ProductData {
  /** 是否为用户上传 */
  isUserUpload?: boolean;
  [key: string]: unknown;
}

/**
 * 图片数据结构
 */
export interface ImageData {
  /** 图片URL或Base64数据 */
  url?: string;
  /** 图片元数据 */
  [key: string]: unknown;
}

/**
 * 工具提示配置
 */
export interface TooltipConfig {
  /** 图标名称 */
  icon: string;
  /** 悬停时的图标名称 */
  iconHover: string;
  /** 工具提示标题 */
  tooltipTitle: string;
}

/**
 * 点击比率追踪数据
 */
export interface ClicksRatioData {
  /** 唯一标识 */
  id: string;
  /** 显示名称 */
  name: string;
}

/**
 * 用户追踪日志数据
 */
export interface UserTrackLogData {
  /** 活跃区域 */
  activeSection: string;
  /** 活跃区域名称 */
  activeSectionName: string;
  /** 描述信息 */
  description: string;
  /** 点击比率数据 */
  clicksRatio: ClicksRatioData;
}

// ==================== API 相关类型 ====================

/**
 * 查询产品的API函数签名
 */
export type QueryProductApi = (...args: any[]) => Promise<any>;

/**
 * 产品构建器函数
 */
export type ProductBuilder = (product: ProductData) => ProductData;

// ==================== 组件属性类型 ====================

/**
 * 图片搜索页面组件属性
 */
export interface ImageSearchPageProps {
  /** 图片数据 */
  imgData: ImageData | null;
  /** 返回回调函数 */
  onBack: () => void;
}

/**
 * 样板间列表页面组件基础属性
 */
export interface StylerTemplateListBaseProps {
  /** 页面类型 */
  type: PageType;
  /** 副标题 */
  subTitle: string;
  /** 查询产品的API */
  queryProductApi: QueryProductApi;
  /** 是否显示标签页 */
  showTabs: boolean;
  /** 切换图片页面的回调 */
  toggleImagePage: (imgData: ImageData | null) => void;
}

/**
 * 我的样板间页面特有属性
 */
export interface MyStylerTemplateProps extends StylerTemplateListBaseProps {
  type: 'my_styler_template';
  /** 是否显示创建模板房间按钮 */
  showCreateTemplateRoomButton: boolean;
  /** 产品构建器函数 */
  productBuilder: ProductBuilder;
}

/**
 * 公共样板间页面特有属性
 */
export interface PublicStylerTemplateProps extends StylerTemplateListBaseProps {
  type: 'public_styler_template_page';
  /** 工具提示配置（可选） */
  tooltipContent?: TooltipConfig;
  /** 是否显示问卷调查 */
  showSurvey: boolean;
  /** 问卷类型 */
  surveyType: string;
  /** 是否显示申请入口 */
  showApplyEntry: boolean;
}

/**
 * 企业样板间页面属性
 */
export interface EnterpriseStylerTemplateProps extends StylerTemplateListBaseProps {
  type: 'enterprise_styler_template_page';
}

/**
 * 模型搭配页面属性
 */
export interface ModelCollocationPageProps extends StylerTemplateListBaseProps {
  type: 'model_collocation_page';
  /** 切换页面回调 */
  onSwitchPage: (roomData: RoomData) => void;
}

/**
 * 模型搭配产品页面属性
 */
export interface ModelCollocationProductPageProps {
  /** 房间数据 */
  data: RoomData;
  /** 切换页面回调 */
  onSwitchPage: () => void;
}

/**
 * 样板间页面组件属性联合类型
 */
export type StylerTemplateListProps =
  | MyStylerTemplateProps
  | PublicStylerTemplateProps
  | EnterpriseStylerTemplateProps
  | ModelCollocationPageProps;

/**
 * 主组件属性
 */
export interface StylerTemplatePageProps {
  /** 初始页面类型 */
  type: PageType;
}

// ==================== 组件声明 ====================

/**
 * 图片搜索页面组件
 */
export declare const ImageSearchPage: React.FC<ImageSearchPageProps>;

/**
 * 样板间列表页面组件（通用）
 * @description 用于展示各类样板间列表，支持多种类型
 */
export declare const StylerTemplateList: React.FC<StylerTemplateListProps>;

/**
 * 模型搭配产品页面组件
 */
export declare const ModelCollocationProductPage: React.FC<ModelCollocationProductPageProps>;

/**
 * 样板间主页面组件
 * @description 根据类型动态渲染不同的样板间页面
 * @param props - 组件属性
 * @returns React 函数组件
 */
declare function StylerTemplatePage(props: StylerTemplatePageProps): React.ReactElement;

export default StylerTemplatePage;

// ==================== 全局类型扩展 ====================

/**
 * 全局资源管理器
 */
declare global {
  const ResourceManager: {
    /** 获取国际化字符串 */
    getString(key: string): string;
  };

  namespace HSApp {
    const Config: {
      /** 租户标识 */
      TENANT: string;
    };

    namespace App {
      interface AppInstance {
        userTrackLogger: {
          /** 推送用户行为追踪日志 */
          push(eventName: string, data: UserTrackLogData): void;
        };
      }

      /** 获取应用实例 */
      function getApp(): AppInstance;
    }
  }
}