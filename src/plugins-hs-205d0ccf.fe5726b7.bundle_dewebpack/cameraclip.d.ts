import type { PureComponent } from 'react';
import type { Signal } from './signal-types';
import type { Camera } from './camera-types';
import type { CommandManager, Command } from './command-types';

/**
 * 相机剪切面板组件的属性接口
 */
export interface CameraClipProps {
  // 可根据实际需求扩展属性
}

/**
 * 相机剪切面板组件的状态接口
 */
export interface CameraClipState {
  /**
   * 剪切深度值（0-最大边界长度，单位为场景单位的1/100）
   */
  clipValue: number;
  
  /**
   * 是否启用相机剪切功能
   */
  clipEnable: boolean;
}

/**
 * 滑块控制器配置接口
 */
interface SliderController {
  /**
   * 值变化时的回调函数
   */
  onValueChanged: (value: number | { detail: { value: number } }) => void;
  
  /**
   * 值变化结束时的回调函数
   */
  onValueChangeEnd: () => void;
}

/**
 * 滑块范围规则配置接口
 */
interface SliderRangeRules {
  /**
   * 是否检查最大值
   */
  checkMax: boolean;
  
  /**
   * 是否检查最小值
   */
  checkMin: boolean;
  
  /**
   * 最大值限制
   */
  max: number;
  
  /**
   * 最小值限制
   */
  min: number;
}

/**
 * 滑块选项配置接口
 */
interface SliderOptions {
  /**
   * 是否只读
   */
  readOnly: boolean;
  
  /**
   * 验证规则
   */
  rules: {
    /**
     * 是否仅允许正数
     */
    positiveOnly: boolean;
    
    /**
     * 范围规则
     */
    range: SliderRangeRules;
  };
}

/**
 * 长度输入框配置接口
 */
interface LengthInputData {
  /**
   * 样式类名
   */
  className: string;
  
  /**
   * 当前值
   */
  value: number;
  
  /**
   * 值变化回调
   */
  onValueChange: (value: number | { detail: { value: number } }) => void;
  
  /**
   * 值变化结束回调
   */
  onValueChangeEnd: () => void;
  
  /**
   * 输入框选项
   */
  options: {
    /**
     * 单位类型
     */
    unitType: string;
    
    /**
     * 显示小数位数
     */
    displayDigits: number;
    
    /**
     * 是否只读
     */
    readOnly: boolean;
    
    /**
     * 验证规则
     */
    rules: {
      range: SliderRangeRules;
      positiveOnly: boolean;
    };
  };
}

/**
 * 滑块数据配置接口
 */
interface SliderData {
  /**
   * 控制器配置
   */
  controller: SliderController;
  
  /**
   * 当前值
   */
  value: number;
  
  /**
   * 滑块选项
   */
  options: SliderOptions;
  
  /**
   * 长度输入框数据
   */
  inputData?: LengthInputData;
}

/**
 * 相机剪切面板组件
 * 
 * 用于控制3D场景中相机的近裁剪面，可以调整剪切深度以隐藏近距离物体。
 * 
 * @example
 *