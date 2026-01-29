/**
 * 导引头部组件的属性接口
 */
interface GuideHeaderProps {
  /** 当前步骤编号 */
  stepNum: number;
  /** 总步骤数 */
  stepCount: number;
  /** 步骤标题列表 */
  stepsTitle: StepTitle[];
  /** 退出导引的回调函数 */
  exitGuide: (action: 'skip' | 'finish') => void;
  /** 是否为最后一步 */
  isFinalStep: boolean;
}

/**
 * 步骤标题接口
 */
interface StepTitle {
  /** 步骤的唯一键值 */
  key: number;
  /** 步骤标题文本 */
  title: string;
}

/**
 * URL查询字符串接口
 */
interface QueryStrings {
  /** 是否包含资产ID */
  hasAssetId?: string;
  [key: string]: string | undefined;
}

/**
 * 全局HSApp配置接口
 */
declare global {
  const HSApp: {
    Config: {
      /** 租户标识 */
      TENANT: string;
    };
    Util: {
      Url: {
        /** 获取URL查询字符串参数 */
        getQueryStrings(): QueryStrings;
      };
    };
  };

  const ResourceManager: {
    /** 获取国际化字符串资源 */
    getString(key: string): string;
  };
}

/**
 * 导引头部组件
 * 
 * 显示多步骤导引的头部，包括：
 * - 步骤进度指示器
 * - 当前步骤描述
 * - 跳过/完成按钮
 * 
 * @param props - 组件属性
 * @returns React元素
 */
export default function GuideHeader(props: GuideHeaderProps): React.ReactElement;