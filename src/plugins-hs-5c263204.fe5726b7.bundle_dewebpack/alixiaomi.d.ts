/**
 * 阿里小蜜客服对话组件
 * 提供智能客服对话框功能，支持多环境配置
 */

/**
 * 阿里小蜜对话框配置接口
 */
interface AlicareDialogConfig {
  /** 来源标识 */
  from: string;
  /** 访问令牌 */
  accessToken: string;
  /** 对话框位置配置 */
  position: {
    /** 距离底部的像素值 */
    bottom: number;
    /** 距离右侧的像素值 */
    right: number;
  };
  /** 自定义模板HTML */
  tpl: string;
  /** CSS z-index层级 */
  'z-index': number;
}

/**
 * 对话框渲染事件数据
 */
interface AlicareRenderEvent {
  /** 对话框类型 */
  config: {
    type: string;
  };
  /** 布局DOM元素 */
  layout: HTMLElement;
}

/**
 * 阿里小蜜对话框实例接口
 */
interface AlicareDialogInstance {
  /** UI事件触发器 */
  ui: {
    emit(event: 'toggleDialog'): void;
    emit(event: 'message', message: string): void;
  };
  /** 渲染完成回调 */
  onRendered(callback: (event: AlicareRenderEvent) => void): void;
}

/**
 * 阿里小蜜对话框构造函数类型
 */
interface AlicareDialogConstructor {
  new (config: AlicareDialogConfig): AlicareDialogInstance;
}

/**
 * MTOP用户接口返回数据结构
 */
interface MtopUserTokenResponse {
  /** 返回状态数组 */
  ret: string[];
  /** 响应数据 */
  data?: {
    /** 状态码 */
    code: string;
    /** 令牌数据 */
    data?: {
      /** 访问令牌 */
      token: string;
    };
  };
}

/**
 * 全局Window接口扩展
 */
declare global {
  interface Window {
    /** 阿里小蜜对话框构造函数 */
    AlicareDialog?: AlicareDialogConstructor;
    /** 异步初始化回调 */
    alicareDialogAsyncInit?: (dialog: AlicareDialogConstructor) => void;
    /** HSApp全局对象 */
    HSApp?: {
      Util: {
        Url: {
          /** 获取URL查询参数 */
          getQueryStrings(): Record<string, string>;
        };
      };
      App: {
        /** 获取应用实例 */
        getApp(): {
          appParams: {
            /** 业务类型 */
            biz?: string;
          };
        };
      };
    };
    /** NWTK全局对象 */
    NWTK?: {
      mtop: {
        User: {
          /** 获取阿里妈妈令牌 */
          getAlimeToken(): Promise<MtopUserTokenResponse>;
        };
      };
    };
  }
}

/**
 * 阿里小蜜客服组件类
 * 用于在应用中集成阿里小蜜智能客服对话功能
 */
export declare class AliXiaoMi {
  /**
   * 启动阿里小蜜客服对话框
   * 根据不同环境和业务类型配置不同的来源标识
   */
  start(): void;
}