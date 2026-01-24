/**
 * 线条/装饰条定位面板组件
 * 用于编辑线条在平面上的位置偏移
 */

import * as React from 'react';

/**
 * 线条轮廓数据
 */
interface ProfileData {
  /** 内容类型标识符 */
  contentType?: string;
  /** 唯一标识ID */
  seekId: string;
}

/**
 * 组件属性数据
 */
interface MoldingPanelData {
  /** 轮廓宽度（米） */
  profileWidth: number;
  /** 轮廓高度（米） */
  profileHeight: number;
  /** SVG路径数据 */
  profile: string;
  /** X轴偏移量（米） */
  offsetX: number;
  /** Y轴偏移量（米） */
  offsetY: number;
  /** 轮廓尺寸X */
  profileSizeX: number;
  /** 轮廓尺寸Y */
  profileSizeY: number;
  /** 轮廓数据 */
  profileData: ProfileData;
  /** 是否垂直翻转 */
  flipVertical: boolean;
  /** 是否水平翻转 */
  flipHorizontal: boolean;
}

/**
 * 修正后的参数
 */
interface CorrectedParameter {
  /** 修正后的X轴偏移量 */
  offsetX: number;
  /** 修正后的Y轴偏移量 */
  offsetY: number;
}

/**
 * 线条对象接口
 */
interface Molding {
  // 线条实体对象
  [key: string]: unknown;
}

/**
 * 组件属性
 */
interface MoldingLocationPanelProps {
  /** 面板数据 */
  data: MoldingPanelData;
  /** 线条对象 */
  molding: Molding;
  /** 修正参数 */
  correctedParameter: CorrectedParameter;
}

/**
 * 组件状态
 */
interface MoldingLocationPanelState {
  /** 宽度（米） */
  width: number;
  /** 高度（米） */
  height: number;
  /** SVG路径 */
  moldingPath: string;
  /** X轴偏移（毫米） */
  offsetX: number;
  /** Y轴偏移（毫米） */
  offsetY: number;
  /** 轮廓尺寸X */
  profileSizeX: number;
  /** 轮廓尺寸Y */
  profileSizeY: number;
}

/**
 * 滑块配置数据
 */
interface SliderData {
  /** 当前值 */
  value: number;
  /** 样式类名 */
  className: string;
  /** 配置选项 */
  options: {
    /** 验证规则 */
    rules: {
      /** 取值范围 */
      range: {
        /** 最大值 */
        max: number;
        /** 最小值 */
        min: number;
      };
    };
    /** 是否只读 */
    readOnly: boolean;
  };
  /** 值变化开始回调 */
  onValueChangeStart: () => void;
  /** 值变化中回调 */
  onValueChange: (value: number) => void;
  /** 值变化结束回调 */
  onValueChangeEnd: (value: number) => void;
}

/**
 * 线条定位面板组件
 * 提供可视化的线条位置调整界面，包含坐标轴显示和XY方向的滑块控制
 */
declare class MoldingLocationPanel extends React.Component<
  MoldingLocationPanelProps,
  MoldingLocationPanelState
> {
  /** 应用实例引用 */
  app: unknown;
  
  /** 命令管理器 */
  cmdMgr: unknown;
  
  /** 轮廓数据 */
  profileData: ProfileData;
  
  /** 垂直翻转选项（0=否，1=是） */
  dirSelectedItem: 0 | 1;
  
  /** 水平翻转选项（0=否，1=是） */
  mirSelectedUtem: 0 | 1;

  /**
   * 渲染坐标轴指示器
   * 绘制X/Y轴及箭头
   * @returns SVG坐标轴元素
   */
  private _renderMoldingLocation(): React.ReactElement;

  /**
   * 渲染线条轮廓图标
   * 根据翻转状态和偏移量计算并绘制线条预览
   * @returns SVG线条路径元素
   */
  private _renderMoldingIcon(): React.ReactElement;

  /**
   * 渲染组件主界面
   * @returns 完整的面板UI
   */
  render(): React.ReactElement;
}

export default MoldingLocationPanel;