/**
 * 绘图命令和UI文本的国际化资源定义
 * @module CommandLocalization
 */

/**
 * 绘图命令和界面文本的本地化字符串映射
 */
export interface CommandLocalizationStrings {
  /** 画线命令 */
  command_line: string;
  
  /** 矩形绘制命令 */
  command_rect: string;
  
  /** 弧形绘制命令 */
  command_arch: string;
  
  /** 圆形绘制命令 */
  command_circle: string;
  
  /** 多边形绘制命令 */
  command_polygon: string;
  
  /** 选择工具命令 */
  command_selection: string;
  
  /** 拉伸操作命令 */
  command_extrusion: string;
  
  /** 偏移操作命令 */
  command_offset: string;
  
  /** 石膏线绘制命令 */
  command_molding: string;
  
  /** 倒角操作命令 */
  command_fillet: string;
  
  /** 扫掠操作命令 */
  command_sweep: string;
  
  /** 组合操作命令 */
  command_group: string;
  
  /** 线性阵列命令 */
  command_lineraid: string;
  
  /** 圆弧阵列命令 */
  command_radioraid: string;
  
  /** 属性面板标签 */
  property: string;
  
  /** 取消按钮文本 */
  cancel: string;
  
  /** 应用按钮文本 */
  apply: string;
  
  /** 下一步按钮文本 */
  next: string;
  
  /** 距离参数标签 */
  distance: string;
  
  /** 步骤标签 */
  step: string;
}

/**
 * 导出的本地化资源对象（中文）
 */
declare const localizationStrings: CommandLocalizationStrings;

export default localizationStrings;