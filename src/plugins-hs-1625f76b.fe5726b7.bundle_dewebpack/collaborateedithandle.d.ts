/**
 * 协同编辑处理模块
 * 负责管理多用户协同编辑时的权限控制、心跳检测和状态同步
 */

import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { 
  lockState, 
  isCollaborateEditDesign, 
  LockStateResponse, 
  CollaborateCheckResponse 
} from './api';
import { config, CollaborateConfig } from './config';

/**
 * 设计模型类型
 */
type DesignModel = string;

/**
 * 持久化接口
 */
interface Persistence {
  /**
   * 注册打开前任务
   */
  registerOpenPreTask(taskName: string, callback: (params: PreLoadParams) => Promise<void>): void;
  
  /**
   * 保存成功信号
   */
  signalSaveSucceeded: {
    listen(callback: (event: SaveEvent) => void, context: unknown): void;
    unlisten(callback: (event: SaveEvent) => void, context: unknown): void;
  };
  
  /**
   * 设置页面关闭前是否忽略未保存警告
   */
  setBeforeunloadIgnoreFloorplanDirty(ignore: boolean): void;
}

/**
 * 预加载参数
 */
interface PreLoadParams {
  /** 设计ID */
  designId: string;
  /** 是否为方案集合 */
  isFpcollection: boolean;
  /** 是否已加载 */
  isLoad?: boolean;
}

/**
 * 保存事件
 */
interface SaveEvent {
  data?: {
    saveParams?: {
      /** 保存类型: save | saveas */
      saveType?: string;
    };
  };
}

/**
 * 状态变更数据
 */
interface StateChangeData {
  /** 设计ID */
  designId: string;
  /** 操作者 */
  operator?: string;
  /** 管理者 */
  management?: string;
  /** 原状态 */
  from: DesignModel;
  /** 目标状态 */
  to: DesignModel;
}

/**
 * 状态变更结果
 */
interface StateChangeResult {
  /** 用户选择的操作: change(切换) | close(关闭) | keep(保持) | newDesign(新建) */
  state?: 'change' | 'close' | 'keep' | 'newDesign';
  /** 是否取消 */
  cancel?: boolean;
  /** 页面头部文本 */
  pageHeaderText?: string;
}

/**
 * 模型状态选项
 */
interface ModelStatusOptions {
  /** 页面头部文本 */
  text?: string;
  /** 页面头部点击回调 */
  onPageHeaderClick?: () => void;
}

/**
 * 用户变更参数
 */
interface UserChangeParams {
  /** 设计ID */
  designId: string;
}

/**
 * 协同编辑处理器
 * 管理协同编辑场景下的权限控制、心跳机制和状态同步
 */
export class CollaborateEditHandle {
  /** 心跳间隔时间(毫秒) */
  private readonly timeInterval: number = 30000; // 30秒
  
  /** 心跳定时器ID */
  private timer?: number;
  
  /** 是否为协同编辑模式 */
  private isCollaborate: boolean = false;
  
  /** 当前设计可编辑模型状态 */
  private designCanModel?: DesignModel;
  
  /** 持久化管理器 */
  private persistence?: Persistence;
  
  /** 当前设计ID */
  private currentDesignId?: string;
  
  /** 是否正在执行心跳检测 */
  private isInHeartbeat: boolean = false;

  constructor() {
    // 绑定方法上下文
    this.preLoadDesign = this.preLoadDesign.bind(this);
    this.heartbeat = this.heartbeat.bind(this);
    this.reloadDesign = this.reloadDesign.bind(this);
    this.onDesignClose = this.onDesignClose.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
  }

  /**
   * 获取当前设计模型状态
   */
  private get designModel(): DesignModel | undefined {
    return HSApp.EditStatus.EditStatusManager.getInstance().status;
  }

  /**
   * 初始化协同编辑处理器
   * @param persistence 持久化管理器实例
   */
  public init(persistence: Persistence): void {
    this.persistence = persistence;
    
    // 注册打开设计前的预处理任务
    this.persistence.registerOpenPreTask('CollaborateEdit', this.preLoadDesign);
    
    // 监听保存成功事件
    this.persistence.signalSaveSucceeded.listen(this.onDesignSaved, this);
    
    // 监听文档关闭事件
    HSApp.App.getApp().signalDocumentClosed.listen(this.onDesignClose);
  }

  /**
   * 反初始化,清理资源
   */
  public uninit(): void {
    HSApp.App.getApp().signalDocumentClosed.unlisten(this.onDesignClose);
    this.persistence?.signalSaveSucceeded.unlisten(this.onDesignSaved, this);
  }

  /**
   * 执行心跳检测
   * 检查当前用户的编辑权限是否发生变化
   */
  private async doHeartbeat(): Promise<void> {
    // 检查必要条件
    if (!this.currentDesignId || !this.designModel || !this.designCanModel) {
      return;
    }

    const currentConfig = config[this.designModel];
    
    // 如果配置了忽略心跳,则跳过
    if (currentConfig?.ignoreHeartbeat) {
      return;
    }

    // 请求锁状态
    const lockStateResponse = await lockState({
      designId: this.currentDesignId,
      lock: currentConfig?.lock ?? false
    }).catch((error: unknown) => {
      HSApp.App.getApp().userTrackLogger.push(
        'collaborate.edit.heartbeat.error',
        {
          description: '协同方案权限心跳出错',
          params: error
        },
        {}
      );
      return undefined;
    });

    if (!lockStateResponse) {
      return;
    }

    // 检查设计ID是否匹配且状态是否发生变化
    if (
      lockStateResponse.designId !== this.currentDesignId ||
      [this.designCanModel, this.designModel].includes(lockStateResponse.state)
    ) {
      return;
    }

    // 状态需要变更
    const changeData: StateChangeData = {
      designId: lockStateResponse.designId,
      operator: lockStateResponse.operator,
      management: lockStateResponse.management,
      from: this.designCanModel,
      to: lockStateResponse.state
    };

    HSApp.App.getApp().userTrackLogger.push(
      'collaborate.edit.state.need.change',
      {
        description: '协同方案权限需要变更',
        params: { data: changeData }
      },
      {}
    );

    // 调用配置的状态变更处理函数
    const changeResult = await currentConfig?.changeTo?.(changeData).catch(() => undefined);

    HSApp.App.getApp().userTrackLogger.push(
      'collaborate.edit.state.changed',
      {
        description: '协同方案权限变更',
        params: {
          data: changeData,
          userSelect: changeResult
        }
      },
      {}
    );

    // 根据用户选择执行相应操作
    switch (changeResult?.state) {
      case 'change':
        this.designCanModel = lockStateResponse.state;
        this.reloadDesign();
        break;
      case 'close':
        this.closeDesign();
        break;
      case 'keep':
        this.designCanModel = lockStateResponse.state;
        break;
      case 'newDesign':
        this.newDesign();
        break;
    }
  }

  /**
   * 心跳检测入口
   * 防止并发执行
   */
  private async heartbeat(): Promise<void> {
    if (this.isInHeartbeat) {
      return;
    }

    this.isInHeartbeat = true;
    await this.doHeartbeat().catch(() => {});
    this.isInHeartbeat = false;
  }

  /**
   * 重新加载设计
   */
  private reloadDesign(): void {
    this.persistence?.setBeforeunloadIgnoreFloorplanDirty(true);
    window.location.reload();
  }

  /**
   * 关闭设计
   */
  private closeDesign(): void {
    this.persistence?.setBeforeunloadIgnoreFloorplanDirty(true);
    window.location.replace('about:blank');
  }

  /**
   * 新建设计
   */
  private newDesign(): void {
    this.persistence?.setBeforeunloadIgnoreFloorplanDirty(true);
    
    const queryParams = HSApp.Util.Url.getQueryStrings();
    queryParams.assetId = undefined;
    
    const newUrl = HSApp.Util.Url.replaceParamsInUrl(queryParams);
    window.location.replace(newUrl);
  }

  /**
   * 设置设计模型状态
   * @param model 模型类型
   * @param options 选项
   */
  private setDesignModel(model: DesignModel, options?: ModelStatusOptions): void {
    const onPageHeaderClick = options?.onPageHeaderClick ?? (() => {});

    HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.EditStatus)
      .setModelStatus(model, {
        pageHeaderOptions: {
          readonlyFn: onPageHeaderClick,
          text: options?.text
        }
      });
  }

  /**
   * 启动心跳定时器
   */
  private startTimer(): void {
    if (!this.timer) {
      this.timer = window.setInterval(this.heartbeat, this.timeInterval);
    }
  }

  /**
   * 清除心跳定时器
   */
  private clearTimer(): void {
    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  /**
   * 预加载设计
   * 在设计打开前检查协同编辑状态和权限
   * @param params 预加载参数
   */
  private async preLoadDesign(params: PreLoadParams): Promise<void> {
    this.clearTimer();

    // 方案集合不需要协同编辑处理
    if (params.isFpcollection) {
      return;
    }

    this.currentDesignId = params.designId;

    // 检查是否为协同编辑设计
    const collaborateCheck = await isCollaborateEditDesign(params.designId);
    this.isCollaborate = collaborateCheck.collaborate;

    // 设计ID变更,取消处理
    if (this.currentDesignId !== params.designId) {
      return;
    }

    // 非协同编辑模式,设置为普通编辑模式
    if (!this.isCollaborate) {
      this.setDesignModel(HSApp.EditStatus.ENUM_EDIT_MODEL.EDIT, {});
      return;
    }

    // 获取锁状态
    const lockStateResponse = await lockState({
      designId: params.designId,
      lock: true
    });

    const stateConfig = config[lockStateResponse.state];

    HSApp.App.getApp().userTrackLogger.push(
      'collaborate.edit.init',
      {
        description: '协同方案权限获取',
        params: lockStateResponse
      },
      {}
    );

    // 执行状态初始化
    let initResult: StateChangeResult | undefined;
    if (stateConfig) {
      initResult = await stateConfig.init?.(
        {
          ...lockStateResponse,
          designId: params.designId
        },
        {
          reloadDesign: this.reloadDesign,
          closeDesign: this.closeDesign
        }
      );

      // 用户取消操作
      if (initResult?.cancel) {
        return Promise.reject({ cancel: true });
      }
    }

    // 设置设计模型状态
    this.setDesignModel(lockStateResponse.state, {
      text: initResult?.pageHeaderText,
      onPageHeaderClick: this.onUserChange
    });

    this.designCanModel = lockStateResponse.state;

    // 如果需要心跳检测
    if (stateConfig?.isHeartbeat) {
      if (params.isLoad) {
        this.startTimer();
      } else {
        // 等待文档打开后再启动
        const signalHook = new HSCore.Util.SignalHook();
        const onDocumentOpened = (): void => {
          this.startTimer();
          signalHook.unlistenAll();
        };
        signalHook.listen(HSApp.App.getApp().signalDocumentOpened, onDocumentOpened);
      }
    }
  }

  /**
   * 用户变更回调
   * 当用户点击页面头部时触发
   */
  private onUserChange(): void {
    if (!this.currentDesignId || !this.designModel) {
      return;
    }

    const currentConfig = config[this.designModel];
    currentConfig?.onUserChange?.({
      designId: this.currentDesignId
    });
  }

  /**
   * 设计保存成功回调
   * @param event 保存事件
   */
  private onDesignSaved(event: SaveEvent): void {
    const saveType = event.data?.saveParams?.saveType;
    
    // 保存或另存为时重新检查权限
    if (saveType && ['save', 'saveas'].includes(saveType)) {
      this.preLoadDesign({
        designId: this.getDesignId(),
        isFpcollection: false,
        isLoad: true
      });
    }
  }

  /**
   * 获取当前设计ID
   */
  private getDesignId(): string {
    return HSApp.App.getApp().designMetadata.get('designId');
  }

  /**
   * 设计关闭回调
   */
  private onDesignClose(): void {
    this.clearTimer();
  }
}