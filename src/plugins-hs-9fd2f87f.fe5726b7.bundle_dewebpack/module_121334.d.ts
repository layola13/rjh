/**
 * 编辑插件类型定义
 * 提供复制、粘贴、剪切、清空视图等编辑功能
 */

import type { HSCore, HSFPConstants, HSApp, MessageBox, ResourceManager } from './global-types';

/**
 * 插件初始化参数
 */
interface PluginInitParams {
  /** 应用实例 */
  app: HSApp.App;
  /** 插件依赖项映射 */
  dependencies: Record<string, any>;
}

/**
 * 命令参数 - 复制/粘贴/剪切
 */
interface EditCommandParams {
  /** 选中的对象列表 */
  selections: any[];
  /** 户型图实例 */
  floorplan: any;
  /** 用户输入插件实例 */
  userinputPlugin: any;
  /** 目录插件实例 */
  catalogPlugin: any;
  /** 应用实例 */
  app: HSApp.App;
}

/**
 * 粘贴序列命令参数
 */
interface PasteSequenceParams {
  /** 用户输入插件 */
  userinputPlugin: any;
  /** 目录插件 */
  catalogPlugin: any;
  /** 户型图实例 */
  floorplan: any;
  /** 应用实例 */
  app: HSApp.App;
  /** 配置选项 */
  options: {
    /** 是否忽略捕捉偏移 */
    ignoreSnapOffset: boolean;
  };
}

/**
 * 消息框配置选项
 */
interface MessageBoxOptions {
  /** 对话框标题 */
  title: string;
  /** 复选框文本内容 */
  checkboxContent: string;
  /** 复选框是否选中 */
  isChecked: boolean;
}

/**
 * 用户追踪日志参数
 */
interface UserTrackLogParams {
  /** 操作描述 */
  description: string;
  /** 日志分组类型 */
  group: string;
  /** 是否为有效操作（可选） */
  validOperation?: boolean;
}

/**
 * 撤销/重做事件数据
 */
interface UndoRedoEventData {
  data?: {
    request?: {
      /** 子请求列表 */
      subRequests?: Array<{
        /** 请求类型 */
        type: string;
      }>;
    };
  };
}

/**
 * 编辑器JSON数据结构
 */
interface EditorJsonData {
  /** 材质信息 */
  material?: any;
}

/**
 * 编辑插件类
 * 负责处理场景中对象的复制、粘贴、剪切、删除等编辑操作
 */
export default class EditPlugin {
  /** 应用实例 */
  private _app: HSApp.App;
  
  /** 选择管理器 */
  private _selectionManager: any;
  
  /** 命令管理器 */
  private _cmdMgr: any;
  
  /** 信号钩子，用于事件监听 */
  private _signalHook: HSCore.Util.SignalHook;
  
  /** 用户输入插件 */
  private _userinputPlugin: any;
  
  /** 工具栏插件 */
  private _toolbarPlugin: any;
  
  /** 目录插件 */
  private _catalogPlugin: any;
  
  /** 是否删除底图标志 */
  public isDeleteUnderlay: boolean;

  /**
   * 初始化插件
   * @param params - 初始化参数
   */
  init(params: PluginInitParams): void;

  /**
   * 注入默认工具栏项
   * 添加"清空视图"工具栏按钮及快捷键
   * @private
   */
  private _injectDefaultToolbar(): void;

  /**
   * 删除当前视图（显示确认对话框）
   * @private
   */
  private _deleteCurrentView(): void;

  /**
   * 执行清空视图操作
   * @private
   */
  private _clearView(): void;

  /**
   * 撤销/重做时刷新状态栏
   * @param event - 撤销/重做事件数据
   */
  undoAndRedoRefreshStatusBar(event: UndoRedoEventData): void;

  /**
   * 刷新状态栏显示
   * @private
   */
  private _refreshStatusBar(): void;

  /**
   * 处理复制事件
   * 支持复制面、自定义PM实例模型、材质等
   * @private
   */
  private _onCopyOccurred(): void;

  /**
   * 处理粘贴事件
   * 根据当前上下文执行粘贴序列命令
   * @private
   */
  private _onPasteOccurred(): void;

  /**
   * 处理剪切事件
   * 过滤可剪切对象并执行剪切命令
   * @private
   */
  private _onCutOccurred(): void;

  /**
   * 反初始化插件
   * 取消所有事件监听
   */
  uninit(): void;
}