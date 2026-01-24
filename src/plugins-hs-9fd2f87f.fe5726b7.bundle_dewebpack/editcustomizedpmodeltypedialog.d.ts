/**
 * 编辑自定义参数化模型类型对话框
 * @module EditCustomizedPModelTypeDialog
 */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Button } from 'antd'; // 或其他UI库
import type { HSCatalog, HSApp, HSFPConstants, ResourceManager } from './global-types';

// ================================
// 类型定义
// ================================

/**
 * 模型内容类型枚举值
 */
type ModelContentType = 
  | HSCatalog.ContentTypeEnum.CustomizedPMInstanceCeiling
  | HSCatalog.ContentTypeEnum.CustomizedPMInstanceWall
  | HSCatalog.ContentTypeEnum.CustomizedPMInstancePlatform
  | HSCatalog.ContentTypeEnum.CustomizedPMInstancePersonal;

/**
 * 模型类型键名
 */
type ModelTypeKey = 
  | 'plugin_customizedModeling_type_ceiling'
  | 'plugin_customizedModeling_type_feature_wall'
  | 'plugin_customizedModeling_type_platform'
  | 'plugin_customizedModeling_type_personalized';

/**
 * 创建参数接口
 */
interface CreateParams {
  /** 模型内容类型 */
  modelContentType: ModelContentType;
}

/**
 * 用户追踪日志参数
 */
interface TrackLogParams {
  /** 操作描述 */
  description: string;
  /** 分组类型 */
  group: string;
  /** 类型标识 */
  type: string;
  /** 是否为有效操作 */
  validOperation: boolean;
}

// ================================
// 模型类型列表项组件
// ================================

/**
 * 模型类型列表项的Props
 */
interface ModelTypeItemProps {
  /** 模型类型键名 */
  item: ModelTypeKey;
  /** 当前选中的模型类型 */
  selectedItem: string;
  /** 模型展示图片数组 */
  modelImages: string[];
  /** 模型类型变更回调 */
  onModeTypeChange: (item: ModelTypeKey) => void;
}

/**
 * 模型类型列表项的State
 */
interface ModelTypeItemState {
  /** 鼠标悬停状态 */
  isHover: boolean;
}

/**
 * 模型类型列表项组件
 */
declare class ModelTypeItem extends React.Component<ModelTypeItemProps, ModelTypeItemState> {
  /**
   * 鼠标进入事件处理
   */
  onMouseEnter(): void;

  /**
   * 鼠标离开事件处理
   */
  onMouseLeave(): void;

  /**
   * 模型类型变更处理
   * @param item - 选中的模型类型
   */
  onModeTypeChange(item: ModelTypeKey): void;

  render(): React.ReactElement;
}

// ================================
// 内部对话框内容组件
// ================================

/**
 * 对话框内容组件的Props
 */
interface DialogContentProps {
  /** 创建回调 */
  create: (params: CreateParams) => void;
  /** 取消回调 */
  cancel: (shouldClose?: boolean) => void;
  /** 取消命令回调 */
  cancelCmd: () => void;
  /** 初始模型类型 */
  initType?: ModelTypeKey;
  /** 是否为修改模式 */
  isModify?: boolean;
}

/**
 * 对话框内容组件的State
 */
interface DialogContentState {
  /** 下拉列表显示状态 */
  show: boolean;
  /** 创建按钮禁用状态 */
  disabled: boolean;
  /** 当前选中的模型类型 */
  selectedItem: string;
}

/**
 * 对话框内容组件
 */
declare class DialogContent extends React.Component<DialogContentProps, DialogContentState> {
  /** 默认提示文本 */
  readonly defaultText: 'plugin_customizedModeling_select_model_type';
  
  /** 默认尺寸范围提示 */
  readonly defaultSizeRange: 'plugin_customizedModeling_model_size_refined';
  
  /** 可选模型类型列表 */
  readonly modelTypes: readonly ModelTypeKey[];

  /**
   * 模型类型到内容类型的映射
   */
  readonly modelContentTypeMap: Record<ModelTypeKey, ModelContentType>;

  /**
   * 模型类型到图片资源的映射
   */
  readonly modelImageMap: Record<ModelTypeKey, [string, string]>;

  /**
   * 切换模型类型选择器显示状态
   */
  toggleSelectModelType(): void;

  /**
   * 模型类型变更处理（内部方法）
   * @param item - 选中的模型类型
   */
  _onModeTypeChange(item: ModelTypeKey): void;

  /**
   * 创建按钮点击处理
   */
  _onCreateClicked(): void;

  /**
   * 取消按钮点击处理
   */
  _onCancelClicked(): void;

  /**
   * 外部点击关闭处理
   */
  doit(): void;

  componentDidMount(): void;
  componentWillUnmount(): void;
  render(): React.ReactElement;
}

// ================================
// 对话框包装组件
// ================================

/**
 * 对话框包装组件的Props
 */
interface DialogWrapperProps {
  /** 创建完成回调 */
  onCreate: (params: CreateParams) => void;
  /** 初始模型类型 */
  initType?: ModelTypeKey;
}

/**
 * 对话框包装组件的Refs
 */
interface DialogWrapperRefs {
  /** 根对话框引用 */
  root: {
    handleOkClick: (event: Event) => void;
    handleCancelClick: (event: Event) => void;
  };
}

/**
 * 对话框包装组件
 */
declare class DialogWrapper extends React.Component<DialogWrapperProps> {
  refs: DialogWrapperRefs;

  /**
   * 关闭对话框
   * @param shouldSubmit - 是否为提交关闭
   */
  close(shouldSubmit: boolean): void;

  /**
   * 创建处理
   * @param params - 创建参数
   */
  onCreate(params: CreateParams): void;

  /**
   * 取消命令处理
   */
  cancelCmd(): void;

  /**
   * 添加结束日志
   * @param isValidOperation - 是否为有效操作
   */
  addEndLog(isValidOperation: boolean): void;

  /**
   * 取消回调
   */
  cancelCall(): void;

  /**
   * 提交回调
   */
  submitCall(): void;

  render(): React.ReactElement;
}

// ================================
// 主类导出
// ================================

/**
 * 编辑自定义参数化模型类型对话框
 */
export declare class EditCustomizedPModelTypeDialog {
  /** 初始化的模型类型 */
  private readonly _initType?: ModelTypeKey;

  /**
   * 构造函数
   * @param initType - 初始模型类型
   */
  constructor(initType?: ModelTypeKey);

  /**
   * 显示对话框
   * @param onCreateCallback - 创建完成后的回调函数
   */
  show(onCreateCallback: (params: CreateParams) => void): void;
}

// ================================
// 全局类型扩展（如需要）
// ================================

declare global {
  /**
   * 资源管理器
   */
  const ResourceManager: {
    /**
     * 获取国际化字符串
     * @param key - 资源键名
     */
    getString(key: string): string;
  };

  /**
   * 应用主对象
   */
  const HSApp: {
    App: {
      /**
       * 获取应用实例
       */
      getApp(): {
        /** 用户追踪日志记录器 */
        userTrackLogger: {
          /**
           * 推送日志
           * @param eventName - 事件名称
           * @param params - 日志参数
           * @param options - 额外选项
           */
          push(
            eventName: string,
            params: TrackLogParams,
            options: { triggerType: 'end' | 'start' }
          ): void;
        };
      };
    };
  };

  /**
   * 前端常量定义
   */
  const HSFPConstants: {
    LogGroupTypes: {
      /** 内容操作日志分组 */
      ContentOperation: string;
    };
  };

  /**
   * 目录相关类型定义
   */
  namespace HSCatalog {
    enum ContentTypeEnum {
      /** 自定义参数化模型实例-吊顶 */
      CustomizedPMInstanceCeiling = 'CustomizedPMInstanceCeiling',
      /** 自定义参数化模型实例-墙面 */
      CustomizedPMInstanceWall = 'CustomizedPMInstanceWall',
      /** 自定义参数化模型实例-地台 */
      CustomizedPMInstancePlatform = 'CustomizedPMInstancePlatform',
      /** 自定义参数化模型实例-个性化 */
      CustomizedPMInstancePersonal = 'CustomizedPMInstancePersonal'
    }
  }
}