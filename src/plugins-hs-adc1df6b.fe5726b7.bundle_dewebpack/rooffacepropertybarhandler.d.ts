/**
 * 屋顶面属性栏处理器
 * 负责管理屋顶面材质属性的UI交互和数据更新
 */
export declare class RoofFacePropertyBarHandler {
  /**
   * 图片缩放比例锁定状态
   */
  lockImageScaleRatio: boolean;

  /**
   * 纹理缩放锁定状态
   */
  lockTextureScale: boolean;

  /**
   * 当前面是否有材质
   */
  hasFaceMaterial: boolean;

  /**
   * 混合贴图插件助手
   * @private
   */
  private _mixPaintPluginHelper: typeof HSApp.PaintPluginHelper.Pave.MixPaintPluginHelper;

  /**
   * 插件处理器缓存
   * @private
   */
  private _pluginHandler?: any;

  /**
   * 获取参数化屋顶插件处理器
   */
  get pluginHandler(): any;

  /**
   * 获取属性栏配置项
   * @param entity - 屋顶实体对象
   * @param faceType - 面类型标识
   * @returns 属性栏配置项数组
   */
  getPropertyItems(entity: any, faceType: number): Array<PropertyBarItem>;

  /**
   * 获取接缝属性配置
   * @param entity - 屋顶实体对象
   * @param faceType - 面类型标识
   * @param region - 唯一区域对象（可选）
   * @returns 接缝属性配置对象
   * @private
   */
  private _getSeamProps(
    entity: any,
    faceType: number,
    region?: any
  ): SeamProperties;

  /**
   * 获取图片属性配置
   * @param entity - 屋顶实体对象
   * @param faceType - 面类型标识
   * @param material - 材质对象
   * @param region - 唯一区域对象（可选）
   * @returns 图片属性配置对象
   * @private
   */
  private _getPictureProps(
    entity: any,
    faceType: number,
    material: any,
    region?: any
  ): PictureProperties;

  /**
   * 获取铺贴选项属性配置
   * @param entity - 屋顶实体对象
   * @param faceType - 面类型标识
   * @param region - 唯一区域对象（可选）
   * @returns 铺贴选项配置对象
   * @private
   */
  private _getPavingOptionProps(
    entity: any,
    faceType: number,
    region?: any
  ): PavingOptionProperties;

  /**
   * 获取混合颜色属性配置
   * @param entity - 屋顶实体对象
   * @param faceType - 面类型标识
   * @param material - 材质对象
   * @param region - 唯一区域对象（可选）
   * @returns 混合颜色配置对象
   * @private
   */
  private _getBlendColorProps(
    entity: any,
    faceType: number,
    material: any,
    region?: any
  ): BlendColorProperties;

  /**
   * 获取缩放卡片属性配置
   * @param entity - 屋顶实体对象
   * @param faceType - 面类型标识
   * @param material - 材质对象
   * @param region - 唯一区域对象（可选）
   * @returns 缩放属性配置对象
   * @private
   */
  private _getScaleCardProps(
    entity: any,
    faceType: number,
    material: any,
    region?: any
  ): ScaleCardProperties;
}

/**
 * 属性栏配置项
 */
interface PropertyBarItem {
  /** 配置项唯一标识 */
  id: string;
  /** 父级配置项ID */
  parentId?: string;
  /** 显示标签 */
  label: string;
  /** 属性栏类型 */
  type: string;
  /** 子配置项 */
  items?: Array<any>;
  /** 排序顺序 */
  order?: number;
}

/**
 * 接缝属性配置
 */
interface SeamProperties {
  /** 点击替换按钮回调 */
  onReplaceClick: () => void;
  /** 宽度值变化回调 */
  onWidthValueChange: (event: CustomEvent<{ value: number }>) => void;
}

/**
 * 图片属性配置
 */
interface PictureProperties {
  /** 锁定图片缩放比例 */
  lockImageScaleRatio: boolean;
  /** 点击适配按钮回调 */
  onFitClick: (event: Event & { target: HTMLInputElement }) => void;
  /** 宽度值变化回调 */
  onWidthValueChange: (event: CustomEvent<{ value: number }>) => void;
  /** 高度值变化回调 */
  onHeightValueChange: (event: CustomEvent<{ value: number }>) => void;
  /** 点击锁定按钮回调 */
  onLockClick: () => void;
  /** 翻转变化回调 */
  onFlipChange: (isFlipY: boolean) => void;
}

/**
 * 铺贴选项属性配置
 */
interface PavingOptionProperties {
  /** 点击重置按钮回调 */
  onResetClick: () => void;
  /** 对齐方式变化回调 */
  onAlignmentChange: (alignType: string) => void;
  /** 旋转角度变化回调 */
  onRotationChange: (event: CustomEvent<{ value: number }>) => void;
  /** X轴偏移变化回调 */
  onOffsetXChange: (event: CustomEvent<{ value: number }>) => void;
  /** Y轴偏移变化回调 */
  onOffsetYChange: (event: CustomEvent<{ value: number }>) => void;
}

/**
 * 混合颜色属性配置
 */
interface BlendColorProperties {
  /** 混合单选框选中回调 */
  blendRadioOnCheck?: (event: Event) => void;
  /** 点击墙纸按钮回调 */
  wallpaperOnClick: () => void;
  /** 点击颜色模式按钮回调 */
  colorModeOnClick?: () => void;
  /** 颜色值变化回调 */
  colorOnValueChange?: (color: any) => void;
}

/**
 * 缩放卡片属性配置
 */
interface ScaleCardProperties {
  /** 锁定纹理缩放 */
  lockTextureScale: boolean;
  /** X轴缩放变化回调 */
  onScaleXChanged: (event: CustomEvent<{ value: number }>) => void;
  /** Y轴缩放变化回调 */
  onScaleYChanged: (event: CustomEvent<{ value: number }>) => void;
  /** 点击锁定按钮回调 */
  onLockClick: () => void;
  /** 点击重置按钮回调 */
  onReset: () => void;
}