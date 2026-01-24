/**
 * 有效面积计算条组件模块
 * 提供智能布局中有效面积的计算、展示和重试功能
 */

/**
 * 计算状态枚举
 */
export enum CalculationState {
  /** 禁用状态 - 不满足计算条件 */
  Disable = 0,
  /** 未计算状态 - 满足条件但尚未开始计算 */
  UnCalculate = 1,
  /** 计算中状态 - 正在执行计算 */
  Calculating = 2,
  /** 计算成功状态 - 已获取有效面积结果 */
  CalculateSuccess = 3,
  /** 重试状态 - 计算失败，提示用户重试 */
  ReTry = 4,
}

/**
 * 智能布局插件处理器接口
 */
interface SmartLayoutHandler {
  /** 检查是否需要保存当前操作 */
  checkSave(): Promise<boolean>;
  /** 检查是否满足计算条件（如是否有有效户型图） */
  checkCondition(): boolean;
  /** 获取指定设计的有效面积 */
  getValidArea(designId: string): Promise<number | undefined>;
  /** 预览有效面积计算结果 */
  previewValidArea(): void;
}

/**
 * 有效面积计算条组件Props
 */
interface ValidAreaBarProps {}

/**
 * 有效面积计算条渲染组件
 * 负责展示计算状态、触发计算操作、展示结果
 */
declare const ValidAreaBarContent: React.FC<ValidAreaBarProps>;

/**
 * 有效面积计算条类
 * 提供属性面板中的有效面积计算入口
 */
export declare class ValidAreaBar {
  /**
   * 在属性面板中的显示顺序
   * @default 0
   */
  order: number;

  constructor();

  /**
   * 获取渲染的React组件
   * @returns 返回ValidAreaBarContent组件实例
   */
  getRenderItem(): React.ReactElement;
}

/**
 * 组件内部状态管理Hook返回值
 */
interface ValidAreaState {
  /** 当前计算状态 */
  calculationState: CalculationState;
  /** 更新计算状态 */
  setCalculationState: React.Dispatch<React.SetStateAction<CalculationState>>;
  /** 计算得到的有效面积值（平方米） */
  validArea: number;
  /** 更新有效面积值 */
  setValidArea: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * 获取智能布局插件处理器
 * @returns 智能布局处理器实例，如果插件未加载则返回undefined
 */
declare function getSmartLayoutHandler(): SmartLayoutHandler | undefined;

/**
 * 触发有效面积计算
 * @param event - 点击事件对象
 */
declare function handleCalculate(event: React.MouseEvent): Promise<void>;

/**
 * 检查并更新计算条件状态
 * 根据当前户型图状态决定是启用还是禁用计算功能
 */
declare function checkAndUpdateCondition(): void;

/**
 * 强制重新检查计算条件
 * 用于文档打开等场景，确保状态正确
 */
declare function forceCheckCondition(): void;

/**
 * 注册应用事件监听
 * @param signalHook - 信号钩子实例，用于管理事件订阅
 */
declare function registerEventListeners(signalHook: HSCore.Util.SignalHook): void;

/**
 * 渲染计算状态对应的后缀内容
 * @returns 根据当前状态返回不同的React元素
 */
declare function renderSuffixContent(): React.ReactElement;

/**
 * 全局类型声明补充
 */
declare global {
  const HSApp: {
    App: {
      getApp(): {
        pluginManager: {
          getPlugin(type: string): any;
        };
        designMetadata: Map<string, any>;
        transManager: {
          signalUndone: any;
          signalRedone: any;
          signalCommitted: any;
        };
        signalDocumentOpened: any;
      };
    };
  };

  const HSFPConstants: {
    PluginType: {
      StoreSmartLayout: string;
    };
  };

  const ResourceManager: {
    getString(key: string): string;
  };

  namespace HSCore {
    namespace Util {
      class SignalHook {
        listen(signal: any, callback: () => void): this;
        unlistenAll(): void;
        dispose(): void;
      }
    }
  }
}