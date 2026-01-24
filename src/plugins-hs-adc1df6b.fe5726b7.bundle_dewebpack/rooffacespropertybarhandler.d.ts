/**
 * 屋顶面属性栏处理器模块
 * 
 * 负责处理参数化屋顶的面材质属性栏交互，包括材质替换、缩放、旋转和偏移等操作。
 * 该处理器管理顶面、底面和侧面的材质配置，并提供完整的材质重置功能。
 * 
 * @module RoofFacesPropertyBarHandler
 * @originalId 748092
 */

/**
 * 材质信息接口
 * 表示一个实体的材质配置
 */
interface MaterialInfo {
  /** 材质对象 */
  material: unknown;
  /** 材质名称 */
  name: string;
  /** 草图组件ID */
  sketchComId: string;
  /** 材质标签 */
  tag: string;
}

/**
 * 面组ID集合接口
 * 包含屋顶不同部位的面ID数组
 */
interface PartFaceIds {
  /** 顶面ID列表 */
  top: string[];
  /** 底面ID列表 */
  bottom: string[];
  /** 侧面ID列表 */
  side: string[];
}

/**
 * 材质实时更新参数接口
 * 用于材质属性的增量更新
 */
interface MaterialRTSParams {
  /** X轴缩放比例 */
  scaleX?: number;
  /** Y轴缩放比例 */
  scaleY?: number;
  /** X轴偏移量 */
  offsetX?: number;
  /** Y轴偏移量 */
  offsetY?: number;
  /** 旋转角度（度） */
  rotation?: number;
  /** X轴瓷砖尺寸 */
  tileSize_x?: number;
  /** Y轴瓷砖尺寸 */
  tileSize_y?: number;
  /** 是否重置位置（旋转和偏移） */
  resetPosition?: boolean;
  /** 是否重置缩放 */
  resetScale?: boolean;
  /** 是否完全重置（位置+缩放） */
  reset?: boolean;
}

/**
 * 材质属性栏回调接口
 * 定义材质编辑的用户交互回调
 */
interface MaterialRTSCallbacks {
  /** 是否锁定纹理缩放比例 */
  lockTextureScale: boolean;
  
  /** X轴缩放变化回调 */
  onScaleXChanged: (event: { detail: { value: number } }) => void;
  
  /** Y轴缩放变化回调 */
  onScaleYChanged: (event: { detail: { value: number } }) => void;
  
  /** 锁定/解锁缩放比例回调 */
  onLockClick: () => void;
  
  /** X轴偏移变化回调 */
  onOffsetXChange: (event: { detail: { value: number } }) => void;
  
  /** Y轴偏移变化回调 */
  onOffsetYChange: (event: { detail: { value: number } }) => void;
  
  /** 旋转角度变化回调 */
  onRotationChange: (rotation: number) => void;
  
  /** 重置位置回调 */
  onResetPosition: () => void;
  
  /** 重置缩放回调 */
  onResetScale: () => void;
  
  /** 完全重置回调 */
  onReset: () => void;
}

/**
 * 面组样式属性配置接口
 * 定义一组面的样式属性栏项目
 */
interface FacesStylePropertyProps {
  /** 面ID数组 */
  faceIds: string[];
  
  /** 组名称（如"顶面"、"底面"、"侧面"） */
  groupName: string;
  
  /** 是否显示旋转按钮 */
  showRotationBtn: boolean;
  
  /** 是否显示编辑按钮 */
  showEditBtn: boolean;
  
  /** 替换材质点击回调 */
  onReplaceClick: () => void;
  
  /** 材质实时更新参数 */
  materialRTSParam: MaterialRTSCallbacks;
  
  /** 重置回调 */
  onReset: () => void;
}

/**
 * 实体多面材质配置接口
 * 用于获取实体的多面材质属性栏项目
 */
interface EntityMultiFaceMaterialConfig {
  /** 目标实体对象 */
  entity: unknown;
  
  /** 获取实体面材质的函数 */
  getEntityFaceMaterial: (entity: unknown, faceId: string) => unknown;
  
  /** 面组样式参数数组 */
  groupFacesStyleParams: FacesStylePropertyProps[];
}

/**
 * 屋顶面属性栏处理器类
 * 
 * 负责管理参数化屋顶的面材质属性栏，处理顶面、底面和侧面的材质编辑操作。
 * 支持材质替换、缩放、旋转、偏移以及重置功能。
 * 
 * @example
 *