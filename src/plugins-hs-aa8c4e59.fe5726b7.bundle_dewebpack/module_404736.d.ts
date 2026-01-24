import { App } from './app';
import { CommandManager } from './command-manager';
import { AutoRecommendPlugin } from './auto-recommend-plugin';
import { View2D } from './view-2d';
import { Room } from './room';
import { DisplayObject } from './display-object';

/**
 * 检测当前环境是否支持 Reflect.construct
 * @returns 如果支持返回 true，否则返回 false
 */
function supportsReflectConstruct(): boolean {
  try {
    const result = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {})
    );
    return !!result;
  } catch (error) {
    return false;
  }
}

/**
 * 房间附加装饰器命名空间
 */
const CustomizedModelingNamespace = HSApp.Util.Core.define('hsw.plugin.customizedmodeling');

/**
 * 智能搭配选择房间命令
 * 用于在智能搭配功能中选择目标房间
 */
export default class SelectRoomForAutoRecommendCommand extends HSApp.Cmd.CompositeCommand {
  private readonly _autoRecommendPlugin: AutoRecommendPlugin;
  private readonly _cmdMgr: CommandManager;
  private readonly _app: App;

  /**
   * 构造函数
   * @param autoRecommendPlugin - 自动推荐插件实例
   * @param commandManager - 命令管理器实例
   */
  constructor(autoRecommendPlugin: AutoRecommendPlugin, commandManager: CommandManager) {
    super();
    this._autoRecommendPlugin = autoRecommendPlugin;
    this._cmdMgr = commandManager;
    this._app = HSApp.App.getApp();
  }

  /**
   * 执行命令时的回调
   * 创建并注册房间附加的可视化装饰器
   */
  public onExecute(): void {
    const activeView = this._app.getActive2DView();
    if (!activeView) {
      return;
    }

    const context = activeView.context;
    
    // 如果视图中不存在此命令的显示对象，则创建并注册
    if (!activeView.findDisplayObject(this)) {
      const gizmo = new CustomizedModelingNamespace.RoomAttachedGizmo(
        context,
        activeView.displayLayers.temp,
        this
      );
      activeView.registerDisplayObject(this, gizmo);
    }
  }

  /**
   * 接收事件消息的回调
   * @param eventType - 事件类型
   * @param eventData - 事件数据
   * @returns 是否继续处理事件
   */
  public onReceive(eventType: string, eventData: any): boolean {
    let shouldContinue = false;

    if (eventType === 'gizmo.click') {
      if (!eventData.room) {
        return true;
      }

      // 处理房间选择逻辑
      let targetRoom: Room = eventData.room;
      
      // 如果选中的是天花板，获取对应的地板房间
      if (targetRoom instanceof HSCore.Model.Ceiling) {
        targetRoom = HSCore.Util.Ceiling.getCeilingFloor(targetRoom);
      }

      // 获取房间内容（包括组）
      const roomContents = HSApp.Util.Recommend.getRoomContents(targetRoom);
      const contentsIncludeGroup = roomContents.contentsIncludeGroup;

      // 检查房间是否支持智能搭配
      const isSupportedSpace = HSApp.Util.Recommend.isSupportedSpace(targetRoom.roomType);
      const hasAnchorContent = !targetRoom.roomType && contentsIncludeGroup.some(
        (content: any) => HSApp.Util.Recommend.isAnchorContent(content)
      );

      if (isSupportedSpace || hasAnchorContent) {
        // 房间支持智能搭配，完成选择并启动推荐流程
        this._cmdMgr.complete(this);
        this._autoRecommendPlugin.startRecommendFromToolbar(targetRoom);
        shouldContinue = true;
      } else {
        // 房间不支持智能搭配，显示提示信息
        LiveHint.show(
          ResourceManager.getString('liveHint_only_room'),
          undefined,
          undefined,
          {
            canclose: true,
            closeCallback: () => {
              const cmdManager = HSApp.App.getApp().cmdManager;
              if (
                cmdManager.current &&
                cmdManager.current.type === HSFPConstants.CommandType.CmdSelectRoomForAutoRecommend
              ) {
                cmdManager.cancel();
              }
            }
          }
        );
        shouldContinue = false;
      }
    } else {
      // 调用父类的 onReceive 方法处理其他事件
      shouldContinue = super.onReceive(eventType, eventData);
    }

    return shouldContinue;
  }

  /**
   * 清理命令状态
   * 在命令结束时隐藏所有提示信息
   */
  public onCleanup(): void {
    LiveHint.hide();
  }

  /**
   * 获取命令描述
   * @returns 命令的中文描述
   */
  public getDescription(): string {
    return '智能搭配: 选择智能搭配房间';
  }

  /**
   * 获取命令分类
   * @returns 命令所属的日志分组类型
   */
  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.SmartCollocation;
  }
}