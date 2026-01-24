/**
 * 渲染模式类型定义
 * 定义了3D场景中物体的渲染显示模式
 */

/**
 * 渲染模式枚举键
 */
export type RenderMode = 'shading' | 'shadingWithEdges' | 'edgesOnly' | 'wireframe';

/**
 * 渲染模式配置映射
 * @description 定义了四种渲染模式及其对应的中文描述
 */
export interface RenderModeConfig {
  /** 材质模式 - 完整材质渲染 */
  shading: string;
  
  /** 线框+材质模式 - 在材质基础上叠加边缘线框 */
  shadingWithEdges: string;
  
  /** 线框模式 - 仅显示边缘线框 */
  edgesOnly: string;
  
  /** 线框+透明模式 - 透明材质叠加线框 */
  wireframe: string;
}

/**
 * 渲染模式配置常量
 */
declare const renderModeConfig: RenderModeConfig;

export default renderModeConfig;