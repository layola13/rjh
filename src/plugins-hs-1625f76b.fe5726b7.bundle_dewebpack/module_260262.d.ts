/**
 * 定制页面组件的类型定义
 * 提供硬装、全屋定制、水电等功能入口
 */

import type React from 'react';
import type { HSApp } from 'hsapp-types';
import type { HSCore } from 'hscore-types';

/**
 * 组件状态接口
 */
interface MakeCustomPageState {
  /** 图标字体样式 */
  iconfontStyle: {
    fontSize: string;
  };
  /** 是否为小屏模式（高度 < 600px） */
  isSmallMode: boolean;
  /** 当前编辑状态 */
  editStatus: HSApp.EditStatus.ENUM_EDIT_MODEL;
  /** 定制建模剩余次数 */
  customizedpmAmount?: number;
  /** 墙地面装饰剩余次数 */
  mixpaintAmount?: number;
  /** 全屋定制剩余次数 */
  tpzzCabinetAmount?: number;
  /** 水电2.0购买VIP配置 */
  cwBuyVip?: {
    icon: string;
  };
  /** 水电2.0免费试用配置 */
  cwFreeTrial?: {
    text: string;
  };
}

/**
 * 组件属性接口
 */
interface MakeCustomPageProps {
  // 继承自React组件的props
  [key: string]: unknown;
}

/**
 * 自定义按钮数据项接口
 */
interface CustomButtonItem {
  /** 按钮类型 */
  type: 'custom-imagebutton' | 'originalmold-imagebutton';
  /** 按钮标签文本 */
  label: string;
  /** 常规图标 */
  icon: string;
  /** 悬停图标 */
  iconHover: string;
  /** 是否禁用 */
  disable?: boolean;
  /** 编辑状态 */
  editStatus?: boolean;
  /** 唯一标识 */
  id?: string;
  /** 点击事件处理器 */
  onClick: (event: React.MouseEvent) => void | Promise<void>;
  /** 当前免费试用配置 */
  currentFreeTrial?: {
    text: string;
  };
  /** 购买VIP配置 */
  buyVip?: {
    icon: string;
  };
  /** 免费试用点击处理器 */
  freeTrialClick?: () => void | Promise<void>;
  /** 购买VIP点击处理器 */
  buyVipClick?: () => void | Promise<void>;
}

/**
 * 数据构建器返回的分组数据接口
 */
interface CatalogGroupData {
  /** 是否可编辑状态 */
  editStatus: boolean;
  /** 分组类型标题 */
  type: string;
  /** 唯一标识 */
  id: string;
  /** 是否显示设置按钮 */
  isSettingVisible: boolean;
  /** 按钮列表 */
  values: CustomButtonItem[];
}

/**
 * 水电2.0权益检查结果接口
 */
interface ConcealedWorkRights {
  /** 是否为VIP */
  isVip: boolean;
  /** 免费试用剩余次数 */
  freeAmount: number;
}

/**
 * 权益金额接口
 */
interface BenefitAmount {
  /** 剩余使用次数 */
  amount: number;
}

/**
 * 定制页面组件类
 * 负责展示和管理硬装、全屋定制、水电等定制功能入口
 */
export default class MakeCustomPage extends React.Component<MakeCustomPageProps, MakeCustomPageState> {
  /** 应用实例引用 */
  private _app: HSApp.App;
  
  /** 事件追踪实例 */
  private _eventTrack: HSApp.Util.EventTrack;
  
  /** 编辑模式插件引用 */
  private _editModelPlugin?: HSApp.Plugin.EditStatusPlugin;
  
  /** 信号钩子管理器 */
  private _signalHook?: HSCore.Util.SignalHook;
  
  /** 首次登录插件引用 */
  firstloginPlugin?: HSApp.Plugin.FirstLoginPlugin;

  constructor(props: MakeCustomPageProps);

  /**
   * 组件挂载后的生命周期钩子
   * 初始化插件、监听窗口大小变化、注册编辑模式回调
   */
  componentDidMount(): void;

  /**
   * 组件卸载前的生命周期钩子
   * 清理事件监听器和信号钩子
   */
  componentWillUnmount(): void;

  /**
   * 编辑模式变更回调
   * 更新组件的编辑状态
   */
  changeEditModel(): void;

  /**
   * 刷新权益次数
   * 更新水电、定制建模、墙地面装饰等功能的剩余次数
   */
  refreshRights(): void;

  /**
   * 刷新环境相关权益
   * 检查并更新各功能模块的权益状态（仅非企业用户）
   */
  refreshEnvsRights(): void;

  /**
   * 窗口大小变化处理器
   * 根据窗口高度切换小屏/正常模式
   */
  handleResize(): void;

  /**
   * 显示营销弹窗
   * @param featureKey - 功能标识（customizedpm/mixpaint/tpzzCabinet）
   */
  showMarketModal(featureKey: string): void;

  /**
   * 保存设计方案
   * @param callback - 保存成功后的回调函数
   */
  saveDesign(callback?: () => void): void;

  /**
   * 购买水电2.0
   * 显示水电功能的市场弹窗
   */
  private _buyCW(): Promise<void>;

  /**
   * 更新水电2.0权益状态
   * 检查并更新VIP状态和免费试用次数
   */
  private _updateCWRights(): Promise<void>;

  /**
   * 获取定制建模剩余次数
   */
  private get customizedpmAmount(): number | undefined;

  /**
   * 获取墙地面装饰剩余次数
   */
  private get mixpaintAmount(): number | undefined;

  /**
   * 获取全屋定制剩余次数
   */
  private get tpzzCabinetAmount(): number | undefined;

  /**
   * 构建目录数据
   * 根据当前状态和权限动态生成功能入口列表
   * @returns 目录分组数据数组
   */
  dataDataBuilder(): CatalogGroupData[];

  /**
   * 渲染组件
   * @returns React元素
   */
  render(): React.ReactElement;
}