/**
 * 单房间模式管理器
 * 负责管理单房间编辑模式的进入、退出和状态维护
 */

import { HSCore } from '635589';
import { HSApp } from '518193';

/**
 * 单房间模式管理器配置选项
 */
interface SingleRoomModeOptions {
  /** 进入单房间模式时触发的信号 */
  signalEnterSingleRoomMode?: HSCore.Util.Signal;
  /** 退出单房间模式时触发的信号 */
  signalExitSingleRoomMode?: HSCore.Util.Signal;
  /** 切换单房间模式时触发的信号 */
  signalChangeSingleRoomMode?: HSCore.Util.Signal;
}

/**
 * 实体冻结映射表类型
 * key: 实体类名
 * value: 被冻结的实体数组
 */
type FrozenEntitiesMap = Map<string, HSCore.Model.Entity[]>;

/**
 * 辅助画布配置选项
 */
interface AuxCanvasConfig {
  /** 判断是否可以创建实体的回调 */
  canCreateEntity: (entity: HSCore.Model.Entity) => boolean;
  /** 覆盖视图设置 */
  overrideViewSettings?: {
    face?: {
      style?: {
        getStyle: (face: HSCore.Model.Face, context: any) => FaceStyle | null;
      };
    };
  };
}

/**
 * 面样式配置
 */
interface FaceStyle {
  /** 填充颜色 */
  fill: string;
  /** 不透明度 (0-1) */
  opacity: number;
}

/**
 * 单房间模式管理器类
 * 提供单房间编辑模式的完整功能支持
 */
export default class SingleRoomModeManager {
  /** 当前目标房间 */
  private _targetRoom?: HSCore.Model.Floor;
  
  /** 信号钩子管理器 */
  signalHook: HSCore.Util.SignalHook;
  
  /** 进入单房间模式信号 */
  signalEnterSingleRoomMode?: HSCore.Util.Signal;
  
  /** 退出单房间模式信号 */
  signalExitSingleRoomMode?: HSCore.Util.Signal;
  
  /** 切换单房间模式信号 */
  signalChangeSingleRoomMode?: HSCore.Util.Signal;
  
  /** 退出环境标识 */
  private _isExitEnv?: string;
  
  /** 应用实例引用 */
  private _app: HSApp.App;
  
  /** 冻结实体映射表 */
  private _frozenEntitiesMap: FrozenEntitiesMap;

  /**
   * 构造函数
   * @param options - 单房间模式配置选项
   */
  constructor(target: any, options: SingleRoomModeOptions);

  /**
   * 初始化管理器
   * 注册命令和监听事件
   */
  init(): void;

  /**
   * 激活单房间模式时的回调
   */
  onActive(): void;

  /**
   * 停用单房间模式时的回调
   */
  onDeactive(): void;

  /**
   * 应用设置值变化时的回调
   * @param event - 变化事件对象
   */
  onAppSettingsValueChanged(event: { data: { fieldName: string; value: any } }): void;

  /**
   * 文档关闭时的回调
   */
  onDocumentClosing(): void;

  /**
   * 设置墙体的透明标志
   * @param transparent - 是否透明
   * @param entity - 目标实体
   */
  private _setFlag(transparent: boolean, entity: HSCore.Model.Entity): void;

  /**
   * 启用墙体（取消冻结和不可选状态）
   * @param wall - 墙体实体
   */
  private _enableWall(wall?: HSCore.Model.Wall): void;

  /**
   * 禁用墙体（设置冻结和不可选状态）
   * @param wall - 墙体实体
   */
  private _disableWall(wall?: HSCore.Model.Wall): void;

  /**
   * 冻结非目标房间相关的所有实体
   * 包括房间、墙体、内容、开口、面等
   */
  private _freezeRooms(): void;

  /**
   * 裁剪顶面孔洞
   * @param structureIds - 结构ID列表
   * @param hiddenFaces - 隐藏的面列表
   */
  private _clipTopFaceHoles(structureIds: string[], hiddenFaces: HSCore.Model.Face[]): void;

  /**
   * 解冻所有实体
   * 恢复所有实体的可见性和可选状态
   */
  private _unfreezeRooms(): void;

  /**
   * 更新轨道视图工具栏
   */
  private _updateOrbitViewToolbar(): void;

  /**
   * 初始化辅助画布
   * 设置2D和3D辅助视图的画布配置
   */
  initAuxCanvas(): void;

  /**
   * 获取辅助2D面样式
   * @param face - 面实体
   * @param context - 上下文对象
   * @returns 面样式配置或null
   */
  private _getAux2dFaceStyle(face: HSCore.Model.Face, context: any): FaceStyle | null;

  /**
   * 判断是否为墙顶平台环境
   * @returns 是否为墙顶平台环境
   */
  private _isWallCeilingPlatformEnv(): boolean;

  /**
   * 从面实体获取关联的房间
   * @param face - 面实体
   * @returns 房间实体或undefined
   */
  private _getRoom(face?: HSCore.Model.Face): HSCore.Model.Floor | undefined;

  /**
   * 刷新目标房间
   * @param face - 面实体
   */
  refreshTargetRoom(face?: HSCore.Model.Face): void;

  /**
   * 平板构建处理器
   * 监听平板构建事件并处理相关逻辑
   */
  private _slabBuildHandler(): void;

  /**
   * 设置目标房间
   * @param face - 面实体
   */
  setTargetRoom(face?: HSCore.Model.Face): void;

  /**
   * 获取当前目标房间
   * @returns 目标房间实体或undefined
   */
  getTargetRoom(): HSCore.Model.Floor | undefined;

  /**
   * 根据激活视图刷新目标房间
   * @param face - 面实体
   */
  refreshTargetRoomWithActiveView(face?: HSCore.Model.Face): void;

  /**
   * 更新单房间模式状态
   * @param enabled - 是否启用单房间模式
   */
  updateSingleRoomMode(enabled: boolean): void;

  /**
   * 取消单房间模式
   */
  cancelSingleRoom(): void;

  /**
   * 通过命令设置目标房间
   * @param room - 房间实体
   * @param forceUpdate - 是否强制更新
   * @param envType - 环境类型
   */
  cmdSetTargetRoom(room: HSCore.Model.Floor, forceUpdate?: boolean, envType?: string): void;

  /**
   * 进入单房间模式
   * 切换到辅助视图并冻结非目标房间
   */
  enterSingleRoomMode(): void;

  /**
   * 退出单房间模式
   * 恢复主视图并解冻所有实体
   */
  exitSingleRoomMode(): void;

  /**
   * 获取冻结实体映射表
   * @returns 冻结实体映射表
   */
  getFrozenEntitiesMap(): FrozenEntitiesMap;

  /**
   * 根据ID切换房间
   * @param shouldSwitch - 是否应该切换
   * @param roomId - 房间ID
   */
  switchRoomById(shouldSwitch: boolean, roomId?: string): void;
}