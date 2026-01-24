/**
 * 绘制矩形请求类
 * 继承自基础绘制请求，用于处理矩形绘制操作
 */
export declare class DrawRectangleRequest extends DrawRequest {
  /**
   * 构造函数
   * 创建一个新的矩形绘制请求实例
   */
  constructor();

  /**
   * 执行矩形绘制请求
   * 发起实际的绘制操作并处理响应
   * @returns Promise 返回绘制操作的异步结果
   */
  doRequest(): Promise<void>;
}

/**
 * 基础绘制请求类（来自依赖模块）
 * 提供所有绘制请求的通用功能
 */
declare class DrawRequest {
  // 基类定义（从 c.DrawRequest 引入）
}