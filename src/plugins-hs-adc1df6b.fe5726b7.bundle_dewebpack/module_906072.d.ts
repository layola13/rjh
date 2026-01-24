import { HSCore } from '635589';
import { HSApp } from '518193';
import { EN_PROPERTY_PANEL_ITEM_TYPE } from '969029';

/**
 * 属性面板节点配置接口
 * 定义属性面板中每个输入项的结构
 */
interface IPropertyPanelNode {
  /** 节点类型 */
  type: EN_PROPERTY_PANEL_ITEM_TYPE | 'MATERIIAL';
  /** 最小最大值限制 [min, max] */
  minMax?: [number, number?];
  /** 输入回调函数 */
  onEnter?: (node: IPropertyPanelNode, value: unknown) => void;
  /** 右侧标题点击回调 */
  onRightTitleClick?: (node: IPropertyPanelNode) => void;
}

/**
 * 接收参数接口
 * 描述doReceive和onReceive方法的参数结构
 */
interface IReceivePayload {
  /** 属性面板节点 */
  node?: IPropertyPanelNode;
  /** 新的输入值 */
  newValue: unknown;
}

/**
 * 操作参数接口
 * 用于日志记录和分析的当前操作参数
 */
interface IOperationParams {
  /** 当前活动的面板区域 */
  activeSection: string;
  /** 活动区域的显示名称 */
  activeSectionName: string;
  /** 点击统计信息 */
  clicksRatio: {
    /** 内容ID */
    id: string;
    /** 内容显示名称 */
    name: string;
  };
}

/**
 * 参数化门窗编辑事务类型
 * 支持的操作事件类型
 */
type TEditEventType =
  | 'changing'        // 值正在改变
  | 'dragMove'        // 拖拽移动中
  | 'changeend'       // 值改变结束
  | 'dragEnd'         // 拖拽结束
  | 'onBoolInputDataChange' // 布尔输入改变
  | 'Reset';          // 重置操作

/**
 * 参数化门窗编辑事务类
 * 处理参数化门窗内容的编辑操作，支持撤销/重做功能
 * @extends HSCore.Transaction.Common.StateRequest
 */
export default class ParametricWindowEditTransaction extends HSCore.Transaction.Common.StateRequest {
  /** 编辑的内容实体 */
  private _content: HSCore.Util.ILayerEntity;
  
  /** 操作是否成功执行 */
  private _isSuccessed: boolean;

  /**
   * 构造函数
   * @param content - 要编辑的参数化门窗内容实体
   */
  constructor(content: HSCore.Util.ILayerEntity);

  /**
   * 处理接收到的编辑操作
   * @param eventType - 事件类型
   * @param payload - 包含节点和新值的负载对象
   * @returns 操作是否成功
   */
  doReceive(eventType: TEditEventType, payload: IReceivePayload): boolean;

  /**
   * 接收编辑操作的入口方法
   * @param eventType - 事件类型
   * @param payload - 包含节点和新值的负载对象
   * @returns 操作是否成功
   */
  onReceive(eventType: TEditEventType, payload: IReceivePayload): boolean;

  /**
   * 提交事务
   * 构建内容、执行自动适配并处理屋顶剪裁几何
   * @returns 操作是否成功
   */
  onCommit(): boolean;

  /**
   * 撤销事务
   * 恢复到上一状态并刷新材质
   */
  onUndo(): void;

  /**
   * 重做事务
   * 重新应用已撤销的更改并刷新材质
   */
  onRedo(): void;

  /**
   * 判断是否可以事务化字段
   * @returns 始终返回true
   */
  canTransactField(): boolean;

  /**
   * 获取事务所属的日志分类
   * @returns 内容操作日志分类
   */
  getCategory(): HSFPConstants.LogGroupTypes;

  /**
   * 获取事务的描述信息
   * @returns 事务描述字符串
   */
  getDescription(): string;

  /**
   * 获取当前操作的参数
   * 用于日志记录和用户行为分析
   * @returns 包含活动区域和点击统计的参数对象
   */
  getCurrentParams(): IOperationParams;
}