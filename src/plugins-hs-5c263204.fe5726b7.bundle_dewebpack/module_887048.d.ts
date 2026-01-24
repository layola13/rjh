/**
 * 公共模板搜索与提交服务
 * 提供模板搜索、提交和地址信息获取功能
 */
declare module 'module_887048' {
  /**
   * 搜索结果接口
   */
  interface SearchResult<T = unknown> {
    /** 搜索结果数据列表 */
    data?: T[];
    /** 结果总数（可能被限制） */
    total: number;
    /** 实际总数 */
    totalNumber: number;
    /** 当前偏移量 */
    offset?: number;
    /** 每页大小 */
    limit?: number;
  }

  /**
   * 搜索条件枚举
   */
  interface SearchCriteriaEnum {
    /** 社区名称搜索条件 */
    neighborName: string;
  }

  /**
   * 中国地址信息接口
   */
  interface ChinaAddressInfo {
    /** 省份列表 */
    provinces?: Array<{
      id: string;
      name: string;
      cities?: Array<{
        id: string;
        name: string;
        districts?: Array<{
          id: string;
          name: string;
        }>;
      }>;
    }>;
  }

  /**
   * 公共模板服务类
   * 负责处理模板搜索、提交和地址信息获取
   */
  export default class TemplateService {
    /**
     * 搜索公共模板
     * 
     * @param searchKeyword - 搜索关键词（用于社区名称匹配）
     * @param param1 - 第二个搜索参数
     * @param param2 - 第三个搜索参数
     * @param searchOptions - 搜索选项对象
     * @param searchOptions.targetCity - 目标城市（格式: "city_id_{cityId}" 或其他）
     * @param offset - 结果偏移量，默认 0
     * @param limit - 每页数量，默认 16
     * @param strictMode - 严格模式标志，false时会添加社区名称搜索条件
     * @returns 搜索结果 Promise，最多返回 15 * limit 条记录
     */
    static searchPublicTemplates<T = unknown>(
      searchKeyword: string,
      param1: unknown,
      param2: unknown,
      searchOptions: { targetCity?: string },
      offset?: number,
      limit?: number,
      strictMode?: boolean
    ): Promise<SearchResult<T>>;

    /**
     * 提交公共模板
     * 
     * @param templateData - 要提交的模板数据
     * @param submissionOptions - 提交选项
     * @returns 提交结果 Promise
     */
    static submitPublicTemplates(
      templateData: unknown,
      submissionOptions: unknown
    ): Promise<unknown>;

    /**
     * 获取中国地址信息
     * 
     * @returns 包含省市区信息的 Promise
     */
    static getAddressInfo(): Promise<ChinaAddressInfo>;
  }
}

/**
 * 全局 NWTK API 命名空间声明
 */
declare global {
  namespace NWTK {
    namespace api {
      namespace design {
        /** 搜索条件枚举 */
        const SearchCriteriaEnum: {
          neighborName: string;
        };

        /**
         * 搜索迷你公共模板 V2 版本
         * 
         * @param keyword - 搜索关键词
         * @param param1 - 参数1
         * @param param2 - 参数2
         * @param cityId - 城市ID
         * @param criteria - 搜索条件数组
         * @param offset - 偏移量
         * @param limit - 限制数量
         */
        function searchMiniPublicTemplatesV2(
          keyword: string,
          param1: unknown,
          param2: unknown,
          cityId: string,
          criteria: string[],
          offset: number,
          limit: number
        ): Promise<{ total: number; [key: string]: unknown }>;

        /**
         * 提交公共模板
         */
        function submitPublicTemplates(
          data: unknown,
          options: unknown
        ): Promise<unknown>;
      }

      namespace general {
        /**
         * 获取中国地址信息 V2 版本
         */
        function getChinaAddressInfoV2(): Promise<unknown>;
      }
    }
  }
}

export {};