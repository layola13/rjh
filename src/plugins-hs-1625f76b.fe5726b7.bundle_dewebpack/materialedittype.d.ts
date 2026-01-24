/**
 * 材质编辑组件类型定义
 * @module MaterialEditType
 */

/**
 * 材质编辑操作类型枚举
 */
export enum MaterialEditType {
  /** 旋转角度 */
  Angle = "Angle",
  /** 垂直缩放 */
  VerticalScale = "VerticalScale",
  /** 垂直偏移 */
  VerticalOffset = "VerticlaOffset",
  /** 水平缩放 */
  HorizontalScale = "HorizontalScale",
  /** 水平偏移 */
  HorizontalOffset = "HorizontalOffset"
}

/**
 * 材质编辑重置类型枚举
 */
export enum MaterialEditResetType {
  /** 位置重置 */
  Position = "position",
  /** 缩放重置 */
  Scale = "scale"
}

/**
 * 滑块值变化事件详情
 */
interface SliderValueChangeEvent {
  detail: {
    /** 滑块当前值 */
    value: number;
  };
}

/**
 * 位置控制器接口
 */
interface PositionController {
  /** 旋转开始回调 */
  onRotateChangeStart: (value: number) => void;
  /** 旋转变化回调 */
  onRotateChange: (value: number) => void;
  /** 旋转结束回调 */
  onRotateChangeEnd: (value: number) => void;
  /** X轴偏移开始回调 */
  onOffsetXChangeStart: (value: number) => void;
  /** X轴偏移变化回调 */
  onOffsetXChange: (value: number) => void;
  /** X轴偏移结束回调 */
  onOffsetXChangeEnd: (value: number) => void;
  /** Y轴偏移开始回调 */
  onOffsetYChangeStart: (value: number) => void;
  /** Y轴偏移变化回调 */
  onOffsetYChange: (value: number) => void;
  /** Y轴偏移结束回调 */
  onOffsetYChangeEnd: (value: number) => void;
}

/**
 * 缩放控制器接口
 */
interface ScaleController {
  /** X轴缩放开始回调 */
  onScaleXChangeStart: (value: number, equalScale: boolean) => void;
  /** X轴缩放变化回调 */
  onScaleXChange: (value: number, equalScale: boolean) => void;
  /** X轴缩放结束回调 */
  onScaleXChangeEnd: (value: number, equalScale: boolean) => void;
  /** Y轴缩放开始回调 */
  onScaleYChangeStart: (value: number, equalScale: boolean) => void;
  /** Y轴缩放变化回调 */
  onScaleYChange: (value: number, equalScale: boolean) => void;
  /** Y轴缩放结束回调 */
  onScaleYChangeEnd: (value: number, equalScale: boolean) => void;
}

/**
 * 材质信息接口
 */
interface MaterialInfo {
  /** 旋转角度 */
  rotation: number;
  /** X轴滑块偏移 */
  sliderOffsetX: number;
  /** Y轴滑块偏移 */
  sliderOffsetY: number;
  /** X轴缩放比例 */
  scaleX: number;
  /** Y轴缩放比例 */
  scaleY: number;
}

/**
 * 材质编辑属性接口
 */
interface MaterialEditProps {
  /** 唯一标识ID */
  seekId: string;
  /** 是否禁用替换功能 */
  replaceDisabled: boolean;
  /** 旋转图标点击回调 */
  onRotateIconClick: () => void;
  /** 替换按钮点击回调 */
  onReplaceBtnClick: () => void;
  /** 当前旋转角度 */
  rotation: number;
  /** X轴滑块偏移值 */
  sliderOffsetX: number;
  /** Y轴滑块偏移值 */
  sliderOffsetY: number;
  /** X轴滑块最大值 */
  maxSliderX: number;
  /** Y轴滑块最大值 */
  maxSliderY: number;
  /** X轴缩放比例 */
  scaleX: number;
  /** Y轴缩放比例 */
  scaleY: number;
  /** 位置控制器 */
  position: PositionController;
  /** 缩放控制器 */
  scale: ScaleController;
  /** 位置重置回调 */
  onPositionReset: () => void;
  /** 缩放重置回调 */
  onScaleReset: () => void;
  /** 更新材质信息并返回最新数据 */
  updateMaterialInfo: () => MaterialInfo;
}

/**
 * 材质编辑卡片组件属性接口
 */
interface MaterialEditCardProps {
  /** 根DOM节点 */
  rootDom: HTMLElement;
  /** 材质编辑配置属性 */
  materialEditProps: MaterialEditProps;
}

/**
 * 材质编辑卡片组件状态接口
 */
interface MaterialEditCardState {
  /** 是否等比缩放 */
  equalScale: boolean;
  /** 位置面板是否展开 */
  position: boolean;
  /** 缩放面板是否展开 */
  scale: boolean;
  /** 当前角度值 */
  angle: number;
  /** 水平偏移值 */
  hOffset: number;
  /** 垂直偏移值 */
  vOffset: number;
  /** 水平缩放值 */
  hScale: number;
  /** 垂直缩放值 */
  vScale: number;
}

/**
 * 材质编辑卡片组件
 * @class MaterialEditCard
 * @extends {React.Component<MaterialEditCardProps, MaterialEditCardState>}
 */
export class MaterialEditCard extends React.Component<MaterialEditCardProps, MaterialEditCardState> {
  /**
   * 属性栏插件实例
   * @private
   */
  private _propertyBarPlugin: unknown;

  /**
   * 文档点击隐藏弹窗的事件处理器
   * @private
   */
  private _documentClickedHidePopup: (event: MouseEvent) => void;

  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: MaterialEditCardProps);

  /**
   * 组件挂载后的生命周期钩子
   */
  componentDidMount(): void;

  /**
   * 组件卸载前的生命周期钩子
   */
  componentWillUnmount(): void;

  /**
   * 渲染组件
   */
  render(): React.ReactElement;

  /**
   * 获取缩略图视图位置信息
   * @returns 缩略图视图的尺寸和位置
   */
  getThumbnailView(): { left: number; height: number; width?: number };

  /**
   * 获取属性栏尺寸信息
   * @returns 属性栏的宽度和高度
   */
  getPropertyBarSize(): { width: number; height: number };

  /**
   * 重置按钮点击处理
   * @param resetType - 重置类型（位置或缩放）
   * @private
   */
  private _resetClick(resetType: MaterialEditResetType): void;

  /**
   * 切换等比缩放状态
   * @private
   */
  private _equalScale(): void;

  /**
   * 关闭材质编辑卡片
   * @private
   */
  private _close(): void;

  /**
   * 隐藏/显示子面板列表
   * @param resetType - 面板类型
   * @private
   */
  private _hideList(resetType?: MaterialEditResetType): void;

  /**
   * 获取子节点
   * @param nodeConfig - 节点配置
   * @param index - 节点索引
   * @returns React元素
   * @private
   */
  private _getChildNode(nodeConfig: unknown, index: number): React.ReactElement;

  /**
   * 根据组件类型获取对应组件
   * @param compType - 组件类型
   * @param config - 组件配置
   * @param index - 组件索引
   * @returns React元素或null
   * @private
   */
  private _getComponentByType(compType: string, config: unknown, index: number): React.ReactElement | null;

  /**
   * 值变化开始时的处理
   * @param editType - 编辑类型
   * @param value - 变化的值
   * @private
   */
  private _onValueChangeStart(editType: MaterialEditType, value: number): void;

  /**
   * 值变化过程中的处理
   * @param editType - 编辑类型
   * @param value - 变化的值
   * @private
   */
  private _onValueChange(editType: MaterialEditType, value: number): void;

  /**
   * 值变化结束时的处理
   * @param editType - 编辑类型
   * @param value - 最终值
   * @private
   */
  private _onValueChangeEnd(editType: MaterialEditType, value: number): void;

  /**
   * 更新材质信息到组件状态
   * @private
   */
  private _updateMaterialInfo(): void;

  /**
   * 文档点击事件处理，用于隐藏弹窗
   * @param event - 鼠标事件
   * @private
   */
  private documentClickedHidePopup(event: MouseEvent): void;
}

/**
 * 显示材质编辑组件
 * @param materialEditProps - 材质编辑属性配置
 */
export function ShowMaterialEditComponent(materialEditProps: MaterialEditProps): void;