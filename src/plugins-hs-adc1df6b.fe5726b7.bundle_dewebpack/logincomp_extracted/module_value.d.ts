/**
 * 企业信息数据结构
 */
interface EnterpriseInfo {
  /** 企业ID */
  id?: string;
  /** 企业名称 */
  name?: string;
  /** 企业状态 */
  status?: string;
  [key: string]: unknown;
}

/**
 * MTOP API 响应结构
 * @template T - 响应数据的类型
 */
interface MtopResponse<T = unknown> {
  /** 返回状态码数组，通常第一个元素表示成功/失败 */
  ret: string[];
  /** 响应数据 */
  data: T;
  /** 错误消息 */
  message?: string;
}

/**
 * 组件状态接口
 */
interface ComponentState {
  /** 企业信息 */
  enterpriseInfo?: EnterpriseInfo;
  [key: string]: unknown;
}

/**
 * NWTK全局对象接口
 */
interface NWTK {
  mtop: {
    User: {
      /**
       * 获取企业信息
       * @returns Promise包装的企业信息响应
       */
      getEnterpriseInfo(): Promise<MtopResponse<EnterpriseInfo>>;
    };
  };
}

/**
 * 组件接口 - 包含setState方法
 */
interface Component {
  /**
   * 更新组件状态
   * @param state - 要更新的状态对象
   */
  setState(state: Partial<ComponentState>): void;
}

declare global {
  const NWTK: NWTK;
}

/**
 * 获取并设置企业信息到组件状态
 * 从MTOP API获取企业信息，成功后更新组件状态
 * 
 * @this Component - 组件实例上下文
 */
declare function fetchAndSetEnterpriseInfo(this: Component): void;

export type { EnterpriseInfo, MtopResponse, ComponentState, NWTK, Component };
export { fetchAndSetEnterpriseInfo };