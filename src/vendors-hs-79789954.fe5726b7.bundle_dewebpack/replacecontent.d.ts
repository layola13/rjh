/**
 * 内容替换模块
 * 负责通过AI算法查询和替换3D模型内容
 */

/**
 * 3D模型内容信息
 */
export interface ContentInfo {
  /** 模型唯一标识 */
  seekId: string;
  /** 实体ID */
  entityId: string;
  /** 分类ID列表 */
  categories: string[];
  /** X轴长度 */
  XLength: number;
  /** X轴缩放比例 */
  XScale: number;
  /** Y轴长度 */
  YLength: number;
  /** Y轴缩放比例 */
  YScale: number;
  /** Z轴长度 */
  ZLength: number;
  /** Z轴缩放比例 */
  ZScale: number;
}

/**
 * 模型替换信息
 */
export interface ReplaceModelInfo {
  /** 模型ID */
  modelId: string;
  /** 原始模型ID */
  originModelId: string;
  /** 模型类型 */
  type: '3D';
  /** 分类ID（逗号分隔） */
  categoryId: string;
  /** 长度（毫米） */
  length: number;
  /** 宽度（毫米） */
  width: number;
  /** 高度（毫米） */
  height: number;
  /** 关联的实体ID列表 */
  entityIds: string[];
}

/**
 * AI替换查询参数
 */
export interface AIReplaceQueryParams {
  /** 语言代码 */
  lang: 'zh_CN';
  /** 租户标识 */
  tenant: 'ezhome';
  /** 是否初始化泛化 */
  initGeneralization: boolean;
  /** 替换模型信息列表 */
  replaceModelsInfo: ReplaceModelInfo[];
  /** 基础模型ID列表 */
  baseModelIds: string[];
  /** 是否扩展风格 */
  isExpandStyle: boolean;
  /** 风格代码列表 */
  styleCode: string[];
}

/**
 * AI算法返回的内容项
 */
export interface AIAlgorithmContentItem {
  /** 原始替换ID */
  originReplaceId: string;
  /** 新生成的ID */
  id: string;
}

/**
 * AI替换查询响应
 */
export interface AIReplaceQueryResponse {
  /** 任务状态：1表示完成 */
  status: number;
  /** 替换结果项列表 */
  items?: AIAlgorithmContentItem[];
}

/**
 * 内容替换类
 * 负责批量替换3D模型内容，通过AI算法生成新的模型ID
 */
export declare class ReplaceContent {
  /** 待替换的内容列表 */
  private readonly contents: ContentInfo[];
  
  /** 替换映射表：原始ID -> 新ID */
  private replaceContentMap: Map<string, string>;
  
  /** 轮询定时器ID */
  private timeId?: NodeJS.Timeout;

  /**
   * 构造函数
   * @param contents - 待替换的3D模型内容列表
   */
  constructor(contents: ContentInfo[]);

  /**
   * 执行内容替换流程
   * @returns 替换映射表（原始ID -> 新ID）
   */
  execute(): Promise<Map<string, string>>;

  /**
   * 构造AI替换查询参数
   * @returns AI查询参数对象
   */
  private paramsFactory(): AIReplaceQueryParams;

  /**
   * 检查模型ID是否全部相同（未发生替换）
   * @param items - AI算法返回的内容项列表
   * @returns 是否所有ID都未改变
   */
  private isSameModelIds(items: AIAlgorithmContentItem[]): boolean;

  /**
   * 取消加载（清除定时器）
   */
  cancelLoading(): void;

  /**
   * 轮询获取AI算法处理结果
   * @param taskId - 任务ID
   * @returns AI算法返回的内容项列表，如果超时或失败则返回undefined
   */
  private getAIAlgorithmContents(taskId: string): Promise<AIAlgorithmContentItem[] | undefined>;

  /**
   * 提交AI替换任务
   * @param params - 查询参数
   * @returns 任务ID
   */
  private startQuery(params: AIReplaceQueryParams): Promise<string>;

  /**
   * 去除重复的内容项
   * @param contents - 原始内容列表
   * @returns 去重后的内容列表
   */
  private removeDumplicateContents(contents: ContentInfo[]): ContentInfo[];

  /**
   * 根据等级和类型获取替换数量配置
   * @param replaceModelsInfo - 替换模型信息列表
   * @param baseModelIds - 基础模型ID列表
   * @returns 包含替换模型信息和基础模型ID的对象
   */
  private getReplaceNumsByGradeAndType(
    replaceModelsInfo: ReplaceModelInfo[],
    baseModelIds: string[]
  ): {
    replaceModelsInfo: ReplaceModelInfo[];
    baseModelIds: string[];
  };
}