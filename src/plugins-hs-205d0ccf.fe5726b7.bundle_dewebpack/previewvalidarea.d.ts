/**
 * 预览有效区域模块
 * 用于显示和下载设计区域的预览图像
 */

/**
 * 区域信息（面积数值）
 */
export type AreaSize = number;

/**
 * PreviewValidArea 组件的属性接口
 */
export interface PreviewValidAreaProps {
  /**
   * 设计区域的面积大小
   */
  area: AreaSize;
  
  /**
   * 区域是否有效的标识
   * @deprecated 当前实现中未使用此属性
   */
  isAreaValid?: boolean;
  
  /**
   * 预览图像的 URL 地址
   */
  url: string;
}

/**
 * 预览有效区域的主函数
 * 
 * 功能说明：
 * - 展示设计区域的可视化预览图
 * - 区分可设计区域和非可设计区域
 * - 提供图片下载功能
 * - 以模态框形式呈现
 * 
 * @param props - 组件属性，包含区域面积和图片 URL
 * @returns 无返回值，直接触发模态框显示
 * 
 * @example
 *