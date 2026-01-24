/**
 * 自定义参数化模型相关命令模块
 * 包含创建、编辑自定义参数化模型的命令类
 */

import type { HSCore } from 'hsw-core';
import type { HSCatalog } from 'hsw-catalog';
import type { HSApp } from 'hsw-app';
import type { HSFPConstants } from 'hsw-fp-constants';

/**
 * DIY建模结束时的上下文信息
 */
interface DiyModelingEndContext {
  /** 创建者用户ID */
  creator?: string;
  /** 是否由返回操作触发 */
  triggeredByBack?: boolean;
  /** 是否由保存操作触发 */
  triggeredByDIYSave?: boolean;
  /** 是否由自动保存触发 */
  triggeredByDIYAutoSave?: boolean;
  /** 是否由铺贴操作触发 */
  triggeredByDIYToPave?: boolean;
  /** 是否由退出操作触发 */
  triggeredByDiyExit?: boolean;
  /** 面信息（用于铺贴） */
  faceInfo?: {
    /** 混合铺贴对象 */
    mixPaveObj: unknown;
    /** 铺贴装饰器ID */
    paveDecoratorId: string;
  };
}

/**
 * 铺贴信息
 */
interface PaveInfo {
  /** 混合铺贴对象 */
  mixPave: unknown;
  /** 铺贴装饰器ID */
  paveDecoratorId: string;
}

/**
 * 自定义模型信息
 */
interface CustomModelInfo {
  /** 3D模型数据 */
  model3d: string;
  /** 模型元信息 */
  modelInfo: {
    /** 位置坐标 */
    pos: { x: number; y: number; z: number };
    /** 缩放比例 [x, y, z] */
    scale?: [number, number, number];
    /** 旋转角度 [x, y, z] */
    rotation?: [number, number, number];
  };
}

/**
 * 导入DIY实例参数
 */
interface ImportDiyInstanceParams {
  /** 文档字符串 */
  docStr: string;
  /** 内容类型字符串 */
  contentTypeStr: string;
  /** 中心点坐标 */
  center: [number, number, number];
  /** 缩放比例 */
  scale: [number, number, number];
  /** 旋转角度 */
  rotation: [number, number, number];
}

/**
 * 附加材质参数
 */
interface AttachMaterialParams {
  /** 材质ID */
  id: string;
  /** 图标URI */
  icon: string;
  /** 是否替换现有材质 */
  replace: boolean;
}

/**
 * 编辑类型对话框结果
 */
interface EditTypeDialogResult {
  /** 模型内容类型字符串 */
  modelContentType?: string;
}

/**
 * 自定义参数化模型基础命令（抽象类）
 * 封装创建和编辑自定义模型的通用逻辑
 */
export declare abstract class CmdCreateCustomizedPModel extends HSApp.Cmd.CompositeCommand {
  /** 根模型对象 */
  protected _rootModel?: HSCore.Model.CustomizedPMModel;
  
  /** 建模宿主对象（通常是楼板或天花板） */
  protected _modelingHost?: HSCore.Model.Floor | HSCore.Model.Ceiling;

  /**
   * 构造函数
   * @param rootModel - 根模型对象
   * @param modelingHost - 建模宿主对象
   */
  constructor(rootModel?: HSCore.Model.CustomizedPMModel, modelingHost?: HSCore.Model.Floor | HSCore.Model.Ceiling);

  /**
   * 命令执行时调用
   * 获取当前激活的2D视图
   */
  onExecute(): void;

  /**
   * 撤销操作
   * 取消所有选择并调用父类撤销逻辑
   */
  onUndo(): void;

  /**
   * 清理资源
   * 隐藏全屏加载提示
   */
  onCleanup(): void;

  /**
   * 模型创建完成时的回调
   * @param model - 创建的模型对象
   */
  onModelCreated(model: HSCore.Model.CustomizedPMModel): void;

  /**
   * 命令完成
   * @param cmd - 当前命令实例
   */
  complete(cmd: HSApp.Cmd.Command): void;
}

/**
 * 创建房间附加的自定义参数化模型命令
 * 用于在楼板或天花板上创建新的自定义模型
 */
export declare class CmdCreateRoomAttachedCustomizedPModel extends CmdCreateCustomizedPModel {
  /** 事务请求对象 */
  private _request?: unknown;

  /**
   * 构造函数
   */
  constructor();

  /**
   * 命令执行入口
   * 检查2D视图并启动3D编辑器
   */
  onExecute(): void;

  /**
   * 命令完成时提交事务
   */
  onComplete(): void;

  /**
   * 接收消息处理
   * @param messageType - 消息类型
   * @param data - 消息数据
   * @returns 是否处理成功
   */
  onReceive(messageType: string, data: DiyModelingEndContext | HSCatalog.Content): boolean;

  /**
   * 启动3D编辑器
   * 检查当前选择，如果已存在模型则编辑，否则创建新模型
   */
  startEditor3d(): void;
}

/**
 * 编辑自定义参数化模型命令
 * 用于编辑已存在的自定义参数化模型实例
 */
export declare class CmdEditCustomizedPModel extends CmdCreateCustomizedPModel {
  /** 事务请求对象 */
  private _request?: unknown;
  
  /** 是否在DIY保存流程中 */
  private readonly _inDIYSave: boolean;

  /**
   * 构造函数
   * @param rootModel - 要编辑的根模型
   * @param modelingHost - 建模宿主对象
   * @param inDIYSave - 是否在DIY保存流程中
   */
  constructor(
    rootModel: HSCore.Model.CustomizedPMModel,
    modelingHost?: HSCore.Model.Floor | HSCore.Model.Ceiling,
    inDIYSave?: boolean
  );

  /**
   * 命令执行入口
   * 查找选中模型的宿主房间并初始化建模环境
   */
  onExecute(): void;

  /**
   * 命令完成时提交事务
   */
  onComplete(): void;

  /**
   * 接收消息处理
   * @param messageType - 消息类型
   * @param data - 消息数据
   * @returns 是否处理成功
   */
  onReceive(messageType: string, data: DiyModelingEndContext | HSCatalog.Content): boolean;

  /**
   * 提交命令变更
   */
  commit(): void;

  /**
   * 清理资源
   * 隐藏全屏加载提示
   */
  onCleanup(): void;
}

/**
 * 编辑自定义参数化模型类型命令
 * 用于修改自定义模型实例的内容类型（墙面/天花板/平台/个人）
 */
export declare class CmdEditCustomizedPModelType extends HSApp.Cmd.CompositeCommand {
  /** 要编辑的实例模型 */
  private readonly _instanceModel: HSCore.Model.CustomizedPMInstanceModel;
  
  /** 目标内容类型字符串 */
  private readonly _strContentType: string;
  
  /** 事务请求对象 */
  private _request?: unknown;

  /**
   * 构造函数
   * @param instanceModel - 自定义模型实例
   * @param strContentType - 目标内容类型字符串
   */
  constructor(instanceModel: HSCore.Model.CustomizedPMInstanceModel, strContentType: string);

  /**
   * 命令执行入口
   * 创建类型编辑请求并选中模型
   */
  onExecute(): void;

  /**
   * 命令完成时提交事务
   */
  onComplete(): void;

  /**
   * 清理资源
   * 隐藏全屏加载提示
   */
  onCleanup(): void;

  /**
   * 根据类型字符串构建ContentType对象
   * @param contentTypeStr - 内容类型字符串（Wall/Ceiling/Platform/Personal）
   * @returns ContentType对象
   */
  private _makeContentType(contentTypeStr: string): HSCatalog.ContentType;

  /**
   * 获取命令描述
   * @returns 命令描述文本
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * @returns 日志分组类型
   */
  getCategory(): HSFPConstants.LogGroupTypes;

  /**
   * 静态方法：编辑当前选中的自定义模型类型
   * 弹出对话框供用户选择新类型
   */
  static edit(): void;
}