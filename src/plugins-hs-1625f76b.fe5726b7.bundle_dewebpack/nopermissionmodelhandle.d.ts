/**
 * NoPermissionModelHandle 模块
 * 处理无权限场景下的模型操作，主要负责跳转到设计案例详情页
 */

import { ModelHandle } from './ModelHandle';

/**
 * 初始化参数接口
 */
interface InitParams {
  /** 设计案例ID */
  designId: string;
}

/**
 * 初始化返回结果接口
 */
interface InitResult {
  /** 是否取消后续操作 */
  cancel: boolean;
}

/**
 * MTOP设计详情检查请求参数接口
 */
interface CheckDesignDetailParams {
  /** 设计案例ID */
  designId: string;
}

/**
 * MTOP设计详情检查响应数据接口
 */
interface CheckDesignDetailData {
  /** 案例ID */
  caseId: string;
}

/**
 * MTOP响应接口
 */
interface MtopResponse<T> {
  /** 返回状态数组 */
  ret: string[];
  /** 响应数据 */
  data: T;
}

/**
 * 全局NWTK对象声明
 */
declare global {
  const NWTK: {
    mtop: {
      Design: {
        checkDesignDetailPage(options: { data: CheckDesignDetailParams }): Promise<MtopResponse<CheckDesignDetailData>>;
      };
    };
  };

  const CryptoJS: {
    enc: {
      Base64: {
        stringify(words: unknown): string;
      };
      Utf8: {
        parse(str: string): unknown;
      };
    };
    MD5(data: string): {
      toString(): string;
    };
  };
}

/**
 * HSApp配置声明
 */
declare module './HSApp' {
  export const HSApp: {
    Config: {
      /** 租户标识 */
      TENANT: string;
    };
    PartnerConfig: {
      /** 易家设计案例基础URL */
      EZHOME_DESIGN_CASE: string;
    };
  };
}

/**
 * 无权限模型处理器
 * 当用户无权限访问设计模型时，负责跳转到对应的案例详情页
 */
export declare class NoPermissionModelHandle extends ModelHandle {
  /** 是否为心跳检测 */
  isHeartbeat: boolean;

  constructor();

  /**
   * 初始化处理器
   * @param params - 包含设计ID的参数对象
   * @returns Promise，返回取消标志
   */
  init(params: InitParams): Promise<InitResult>;

  /**
   * 跳转到设计案例详情页
   * 根据租户配置和权限状态构建不同的跳转URL
   * @param designId - 设计案例ID
   * @returns Promise，完成跳转操作
   */
  jumpToDesignCaseDetail(designId: string): Promise<void>;

  /**
   * 编码案例ID
   * 使用Base64和MD5混合加密生成URL安全的案例标识
   * @param caseId - 原始案例ID
   * @returns 编码后的16位MD5字符串
   */
  encode(caseId: string): string;
}