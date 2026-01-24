/**
 * AI 情绪板项目组件
 * 用于展示 AI 生成的图片项目，支持进度跟踪和状态显示
 */

/**
 * 任务处理状态枚举
 */
export enum ProcessStatus {
  /** 处理中 */
  Processing = 0,
  /** 排队中 */
  Queued = 1,
  /** 成功 */
  Success = 2,
  /** 失败 */
  Failed = 3,
  /** 取消 */
  Cancelled = 4,
  /** 超时 */
  Timeout = 5
}

/**
 * AI 情绪板项目数据接口
 */
export interface AiMoodboardItemData {
  /** 子任务 ID */
  subTaskId: string;
  /** 任务 ID */
  taskId: string;
  /** 图片名称 */
  imageName: string;
  /** 处理进度（0-100） */
  processSchedule: number;
  /** 处理状态 */
  processStatus: ProcessStatus;
  /** 图片 URL */
  imageUrl?: string;
}

/**
 * 查询任务进度的响应接口
 */
export interface QueryScheduleResponse {
  /** 返回状态 */
  ret?: Array<string>;
  /** 任务 ID */
  taskId: string;
  /** 响应数据 */
  data?: {
    /** 图片结果列表 */
    imageResultList: Array<{
      /** 处理进度 */
      processSchedule: number;
      /** 处理状态 */
      processStatus: ProcessStatus;
      /** 图片 URL */
      imageUrl: string;
    }>;
  };
}

/**
 * 轮询结果接口
 */
export interface PollingResult {
  /** 进度百分比 */
  percent: number;
  /** 处理状态 */
  status: ProcessStatus;
  /** 封面图片 URL */
  coverImageUrl: string;
  /** 任务 ID */
  taskId: string;
}

/**
 * AiMoodboardItem 组件属性接口
 */
export interface AiMoodboardItemProps {
  /** 情绪板项目数据 */
  item: AiMoodboardItemData;
  /** 查看器显示回调函数 */
  showViewer: () => void;
  /** 停止轮询回调函数 */
  stopPolling?: () => void;
}

/**
 * AI 情绪板项目 React 组件
 * 
 * 功能：
 * - 显示 AI 生成图片的处理进度
 * - 自动轮询任务状态直到完成
 * - 支持成功、失败、处理中等多种状态展示
 * - 完成后可预览图片
 * 
 * @param props - 组件属性
 * @returns React 元素
 */
export function AiMoodboardItem(props: AiMoodboardItemProps): JSX.Element;

/**
 * 默认导出
 */
export default AiMoodboardItem;