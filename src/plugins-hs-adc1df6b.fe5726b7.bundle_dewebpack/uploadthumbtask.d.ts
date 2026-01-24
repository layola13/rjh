/**
 * 上传缩略图任务类
 * 负责在需要时导出并更新3D场景的缩略图
 */
export declare class UploadThumbTask {
  /**
   * 构造函数
   */
  constructor();

  /**
   * 执行缩略图上传任务
   * 
   * @param context - 任务执行上下文，包含更新配置信息
   * @param context.updateThumbnail - 是否需要更新缩略图的标志
   * @param options - 执行选项（可选）
   * @returns Promise，解析为任务执行结果
   * 
   * @remarks
   * - 如果 updateThumbnail 为 false，直接返回成功状态
   * - 否则从应用画布导出 960x540 的缩略图
   * - 导出的缩略图将保存到设计元数据的 threeDThumbnail 字段
   */
  execute(
    context: TaskContext,
    options?: unknown
  ): Promise<TaskResult>;
}

/**
 * 任务执行上下文
 */
export interface TaskContext {
  /**
   * 是否需要更新缩略图
   * - true: 执行缩略图导出和上传
   * - false: 跳过任务直接返回成功
   */
  updateThumbnail: boolean;
}

/**
 * 任务执行结果
 */
export interface TaskResult {
  /**
   * 任务执行状态
   * - "success": 任务成功完成
   */
  status: "success";
}

/**
 * 缩略图导出配置
 */
export interface ThumbnailExportOptions {
  /**
   * 导出图片宽度（像素）
   */
  width: number;

  /**
   * 导出图片高度（像素）
   */
  height: number;

  /**
   * 是否包含前景元素
   */
  forground: boolean;
}