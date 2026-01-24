/**
 * 缩放视图组件的类型定义
 * 提供画布缩放功能，包含缩小/放大按钮和滑块控制
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * 滑块配置选项
 */
interface SliderOptions {
  /** 是否只读 */
  readOnly: boolean;
  /** 滑块规则配置 */
  rules: {
    /** 取值范围 */
    range: {
      /** 最小值 */
      min: number;
      /** 最大值 */
      max: number;
    };
  };
}

/**
 * 滑块数据配置
 */
interface SliderData {
  /** 当前滑块值 */
  value: number;
  /** 值变化回调 */
  onValueChange: (value: number) => void;
  /** 滑块选项配置 */
  options: SliderOptions;
}

/**
 * 按钮数据配置（缩小/放大按钮）
 */
interface ButtonData {
  /** 工具提示文本 */
  tooltip: string;
  /** 点击事件回调 */
  onclick: () => void;
}

/**
 * 缩放视图组件属性
 */
interface ZoomViewProps {
  /** 组件数据配置 */
  data: {
    /** 滑块数据配置 */
    sliderData: SliderData;
    /** 缩小按钮配置 */
    zoomOutData: ButtonData;
    /** 放大按钮配置 */
    zoomInData: ButtonData;
    /** 当前环境类型 */
    environment: number;
    /** 是否禁用组件 */
    disable?: boolean;
    /** 工具提示的CSS类名 */
    tooltipClassName?: string;
    /** 是否使用白色图标 */
    useWhiteIcon?: boolean;
  };
}

/**
 * 缩放视图组件状态
 */
interface ZoomViewState {
  /** 当前滑块值 */
  value: number;
}

/**
 * 视图盒子变化事件数据
 */
interface ViewBoxChangedEventData {
  /** 缩放比例是否变化 */
  scaleChanged: boolean;
}

/**
 * 视图盒子变化事件
 */
interface ViewBoxChangedEvent {
  /** 事件数据 */
  data: ViewBoxChangedEventData;
}

/**
 * 视图盒子对象
 */
interface ViewBox {
  /** 视图盒子宽度 */
  width: number;
}

/**
 * 2D视图接口
 */
interface View2D {
  /** 视图盒子变化信号 */
  signalViewBoxChanged: {
    listen: (callback: (event?: ViewBoxChangedEvent) => void, context: any) => void;
    unlisten: (callback: (event?: ViewBoxChangedEvent) => void, context: any) => void;
  };
  /** 获取视图盒子 */
  getViewBox: () => ViewBox;
  /** 获取最小视图盒子宽度 */
  getMinViewBoxWidth: () => number;
}

/**
 * 调色画布接口
 */
interface MixpaintCanvas {
  /** 视图盒子是否已变化 */
  viewBoxChanged: boolean;
  /** 视图盒子变化信号 */
  signalViewBoxChanged: {
    listen: (callback: () => void, context: any) => void;
    unlisten: (callback: () => void, context: any) => void;
  };
  /** 缩放值 */
  zoomValue: number;
}

/**
 * 应用主接口
 */
interface HSAppInterface {
  /** 获取主2D视图 */
  getMain2DView: () => View2D;
  /** 获取辅助2D视图 */
  getAux2DView: () => View2D;
  /** 是否为3D视图激活状态 */
  is3DViewActive: () => boolean;
}

/**
 * 缩放视图组件
 * 支持多种环境下的画布缩放控制，包含滑块和缩放按钮
 */
declare class ZoomView extends React.Component<ZoomViewProps, ZoomViewState> {
  /** 属性类型验证 */
  static propTypes: {
    data: PropTypes.Requireable<object>;
  };

  /** 默认属性 */
  static defaultProps: {
    data: {};
  };

  /** 是否正在点击滑块 */
  private isClickSlider: boolean;

  /** 应用实例 */
  private _app: HSAppInterface;

  /** 调色画布实例 */
  private mixpaintCanvas?: MixpaintCanvas;

  /**
   * 构造函数
   * @param props - 组件属性
   */
  constructor(props: ZoomViewProps);

  /**
   * 组件接收新属性时调用（已废弃的生命周期）
   * @param nextProps - 新的属性
   */
  UNSAFE_componentWillReceiveProps(nextProps: ZoomViewProps): void;

  /**
   * 组件卸载前调用
   */
  componentWillUnmount(): void;

  /**
   * 监听视图盒子变化事件
   * @param props - 组件属性
   */
  private listen(props: ZoomViewProps): void;

  /**
   * 取消监听视图盒子变化事件
   */
  private unlisten(): void;

  /**
   * 更新调色画布滑块值
   */
  private updateMixpaintSliderValue(): void;

  /**
   * 更新辅助画布滑块值
   * @param event - 视图盒子变化事件
   */
  private updateAuxCanvasSliderValue(event: ViewBoxChangedEvent): void;

  /**
   * 更新主画布滑块值
   * @param event - 视图盒子变化事件
   */
  private updateMainCanvasSliderValue(event?: ViewBoxChangedEvent): void;

  /**
   * 更新视图滑块值（内部方法）
   * @param event - 视图盒子变化事件
   * @param view - 2D视图实例
   */
  private _updateViewSliderValue(event: ViewBoxChangedEvent | undefined, view: View2D): void;

  /**
   * 渲染组件
   */
  render(): JSX.Element;
}

export default ZoomView;