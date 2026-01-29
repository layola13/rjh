/**
 * 新用户引导步骤配置模块
 * 提供不同租户和用户身份下的引导流程选项
 */

/**
 * 弹窗位置枚举
 */
type PopupPlacement = 
  | 'RightTop' 
  | 'TopLeft' 
  | 'BottomRight';

/**
 * 媒体类型枚举
 */
type MediaType = 'image' | 'video';

/**
 * 目标元素位置偏移配置
 */
interface TargetDiff {
  /** 左侧偏移量（像素） */
  left: number;
  /** 顶部偏移量（像素） */
  top: number;
  /** 底部偏移量（像素） */
  bottom: number;
  /** 右侧偏移量（像素） */
  right: number;
}

/**
 * 提示弹窗信息配置
 */
interface PopupInfo {
  /** 弹窗标题 */
  title: string;
  /** 弹窗描述文本 */
  desc: string;
  /** 媒体资源URL（图片或视频） */
  src: string;
  /** 媒体类型 */
  mediaType: MediaType;
  /** 更多信息链接URL */
  moreUrl: string;
}

/**
 * 引导步骤提示配置
 */
interface TipConfig {
  /** 目标元素的CSS选择器 */
  target: string;
  /** 目标元素位置偏移（可选） */
  targetDiff?: TargetDiff;
  /** 弹窗显示位置 */
  popupPlacement: PopupPlacement;
  /** 弹窗信息内容 */
  popupInfo: PopupInfo;
}

/**
 * 引导步骤选项配置
 */
interface GuideStepOption {
  /** 步骤唯一标识符 */
  id: string;
  
  /**
   * 步骤前置处理函数
   * @returns Promise，解析为true表示可以继续
   */
  pre?: () => Promise<boolean>;
  
  /** 提示配置 */
  tip: TipConfig;
  
  /**
   * 步骤后置处理函数（可选）
   * @returns Promise，解析为true表示步骤完成
   */
  next?: () => Promise<boolean>;
}

/**
 * 获取当前租户和用户身份对应的引导步骤配置
 * @returns 引导步骤选项数组
 */
export declare function getOptions(): GuideStepOption[];

/**
 * 全局HSApp命名空间声明（框架API）
 */
declare global {
  const HSApp: {
    Config: {
      /** 资源基础路径 */
      RES_BASEPATH: string;
      /** 租户标识 */
      TENANT: string;
    };
    Catalog: {
      Manager: {
        /** 显示特殊主题 */
        showSpecialTopic(options: { poolId: number; attributes: Record<string, string> }): void;
        /** 按分类ID显示页面 */
        showPageByCategoryId(options: { categoryId: string; menuId: string }): void;
      };
      DataConfig: {
        MenuIdEnum: {
          styler: string;
        };
      };
    };
    App: {
      getApp(): {
        environmentManager: {
          signalEnvironmentActivated: {
            listen(callback: (event: { data: { newEnvironmentId: number } }) => void): void;
            unlisten(callback: Function): void;
          };
        };
      };
    };
  };

  const HSFPConstants: {
    Environment: {
      /** 渲染环境ID */
      Render: number;
    };
  };

  const ResourceManager: {
    /** 获取国际化字符串 */
    getString(key: string): string;
  };

  const adskUser: {
    /** 用户身份标识 */
    userIdentity: string;
  };
}