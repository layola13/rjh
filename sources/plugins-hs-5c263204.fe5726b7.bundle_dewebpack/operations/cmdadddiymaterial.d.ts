/**
 * CmdAddDIYMaterial - 添加自定义材质命令
 * 用于在3D/2D视图中为模型实体应用和替换材质
 */

import { HSApp } from './HSApp';
import { HSCore } from './HSCore';

/**
 * 材质数据接口
 */
interface MaterialData {
  /** 材质ID */
  id?: string;
  /** 材质名称 */
  name?: string;
  /** 材质URL */
  url?: string;
  /** 材质纹理信息 */
  texture?: {
    width?: number;
    height?: number;
    repeat?: { x: number; y: number };
  };
  /** 刷新标志 */
  refresh?: boolean;
  [key: string]: unknown;
}

/**
 * 鼠标事件数据接口
 */
interface MouseEventData {
  /** 原生事件对象 */
  event: MouseEvent;
  /** 拾取到的实体 */
  entity?: HSCore.Model.Entity3D;
  /** 拾取结果数组 */
  pickResults?: Array<{
    viewObject?: { entity?: HSCore.Model.Entity3D };
    meshId?: string;
    meshName?: string;
  }>;
  /** 鼠标位置 */
  position?: { x: number; y: number; z: number };
}

/**
 * 灯槽分组信息接口
 */
interface LightSlotGroupOptions {
  /** 自动分组的灯槽ID */
  autoGroupLightSlotId?: string;
}

/**
 * 灯槽面组信息接口
 */
interface LightSlotFaceGroup {
  /** 灯槽面信息 */
  lightSlotFaces?: {
    entity?: HSCore.Model.Entity3D;
    meshKeys?: string[];
  };
  /** 依赖面信息 */
  relyerFaces?: {
    entity?: HSCore.Model.Entity3D;
    meshKeys?: string[];
  };
}

/**
 * 材质处理器接口
 */
interface MaterialHandler {
  /** 命令是否激活 */
  isCmdActive: boolean;
  /** 材质是否通过拖拽替换 */
  isMaterialReplaceByDragging: boolean;
  /** 当前编辑的实体 */
  entity: HSCore.Model.Entity3D;
  /** 高亮的子实体集合 */
  highlightChildEntities: Map<string, HSCore.Model.Entity3D>;
  /** 滑块X偏移 */
  sliderX: number;
  /** 滑块Y偏移 */
  sliderY: number;
  
  /** 清除高亮的相同材质实体 */
  clearHighlightSameMaterialEntities(): void;
  /** 清理资源 */
  onCleanup(): void;
  /** 取消选中网格 */
  unselectMeshes(): void;
  /** 根据网格ID高亮面组 */
  highlightFaceGroupByMeshId(meshName: string, entity: HSCore.Model.Entity3D): void;
  /** 清除高亮的子实体 */
  clearHighlightChildEntities(): void;
  /** 高亮所有相同材质的特征模型 */
  highlightAllFeatureModelSameMaterial(entity: HSCore.Model.Entity3D, meshName: string): void;
  /** 目录项点击处理 */
  onCatalogItemClicked(
    material: MaterialData,
    entity: HSCore.Model.Entity3D,
    replaceSameMaterial: boolean,
    position?: { x: number; y: number; z: number },
    groupOptions?: LightSlotGroupOptions
  ): void;
  /** ESC键处理 */
  onESC(): void;
  /** 材质选择改变信号 */
  signalSelectedMaterialChanged: {
    listen(callback: (event: { data?: MaterialData }) => void): void;
    unlisten(callback: (event: { data?: MaterialData }) => void): void;
  };
}

/**
 * 网格处理器接口
 */
interface MeshHandler extends MaterialHandler {
  /** 选中网格 */
  selectMesh(): void;
}

/**
 * 迷你图片预览控制器接口
 */
interface MiniImagePreviewController {
  /** 预览标题 */
  title?: string;
  /** 初始化 */
  init(): void;
  /** 渲染预览 */
  render(position: { x: number; y: number }): void;
  /** 销毁预览 */
  destroy(): void;
}

/**
 * 选择改变事件数据接口
 */
interface MaterialSelectionChangedEvent {
  data?: {
    /** 是否需要刷新 */
    refresh?: boolean;
    [key: string]: unknown;
  };
}

/**
 * CmdAddDIYMaterial - 添加DIY材质命令类
 * 继承自复合命令，用于处理材质的添加、替换和高亮显示
 */
export declare class CmdAddDIYMaterial extends HSApp.Cmd.CompositeCommand {
  /**
   * 构造函数
   * @param handler - 材质处理器
   * @param meshHandler - 网格处理器
   */
  constructor(handler: MaterialHandler, meshHandler: MeshHandler);

  /** 应用程序实例 */
  readonly app: HSApp.Application;
  
  /** 画布实例 */
  readonly canvas: HSApp.View.Canvas3D;
  
  /** 命令类型 */
  readonly type: HSFPConstants.CommandType.AddDIYMaterial;
  
  /** 迷你图片预览控制器 */
  private miniImagePreviewCtrl?: MiniImagePreviewController | null;
  
  /** 当前选中的材质数据 */
  private currentMaterial?: MaterialData;
  
  /** 当前高亮的网格实体 */
  private highlightMeshEntity?: {
    entity: HSCore.Model.Entity3D;
    highlightMesh?(meshId?: string): void;
    highlightMeshs?(meshIds: string[]): void;
    updateSelectOutlineMesh?(selected: boolean, highlighted: boolean): void;
    getMeshIdsByMeshNames?(meshNames: string[]): string[];
  };
  
  /** 是否为替换面板模式 */
  private isReplacePanelMode: boolean;
  
  /** 面是否支持涂刷材质 */
  private isFaceSupportPaintMaterial: boolean;
  
  /** N定制参数化背景墙数组 */
  private nCustomizedParametricBackgroundWalls: HSCore.Model.NCustomizedParametricBackgroundWall[];
  
  /** 材质处理器 */
  private _handler: MaterialHandler;
  
  /** 网格处理器 */
  private _meshHandler: MeshHandler;

  /**
   * 获取上下文工具插件
   */
  get contextualToolsPlugin(): HSApp.Plugin.ContextualTools | undefined;

  /**
   * 获取属性栏插件
   */
  get propertyBarPlugin(): HSApp.Plugin.PropertyBar | undefined;

  /**
   * 获取材质图片插件
   */
  get materialImagePlugin(): HSApp.Plugin.MaterialImage | undefined;

  /**
   * 命令执行入口
   */
  onExecute(): void;

  /**
   * 命令清理，释放资源
   */
  onCleanup(): void;

  /**
   * 更新鼠标光标样式
   * @param cursorType - 光标类型
   */
  updateCursor(cursorType: HSApp.View.CursorEnum): void;

  /**
   * 接收消息处理
   * @param message - 消息类型
   * @param data - 消息数据
   * @returns 是否处理成功
   */
  onReceive(message: string, data: unknown): boolean;

  /**
   * 鼠标按下事件处理
   * @param eventData - 鼠标事件数据
   */
  private onMouseDown(eventData: MouseEventData): void;

  /**
   * 添加材质到网格
   * @param eventData - 事件数据
   */
  private addMaterialToMesh(eventData: MouseEventData): void;

  /**
   * 获取灯槽底面
   * @param entity - 灯槽实体
   * @returns 底面对象或undefined
   */
  private _getLightSlotBottomFace(entity: HSCore.Model.Entity3D): GeLib.Face | undefined;

  /**
   * 鼠标移动事件处理
   * @param eventData - 鼠标事件数据
   * @returns 是否处理成功
   */
  private onMouseMove(eventData: MouseEventData): boolean;

  /**
   * 检查是否替换相同材质
   * @param eventData - 事件数据
   * @param entity - 目标实体
   * @param meshName - 网格名称
   * @returns 是否替换相同材质
   */
  private checkReplaceSameMaterial(
    eventData: MouseEventData,
    entity: HSCore.Model.Entity3D,
    meshName: string
  ): boolean;

  /**
   * 更新迷你图片预览
   * @param eventData - 事件数据
   * @param title - 预览标题
   */
  private _updateMiniImagePreview(eventData: MouseEventData, title: string): void;

  /**
   * 目录项点击处理
   * @param material - 材质数据
   * @param entity - 目标实体
   * @param replaceSameMaterial - 是否替换相同材质
   * @param position - 点击位置
   * @param groupOptions - 分组选项
   * @returns 是否处理成功
   */
  private onCatalogItemClicked(
    material: MaterialData,
    entity: HSCore.Model.Entity3D,
    replaceSameMaterial?: boolean,
    position?: { x: number; y: number; z: number },
    groupOptions?: LightSlotGroupOptions
  ): boolean;

  /**
   * ESC键处理
   */
  private onEsc(): void;

  /**
   * 清空数据并完成命令
   */
  private clearData(): void;

  /**
   * 添加事件监听器
   */
  private addListener(): void;

  /**
   * 移除事件监听器
   */
  private removeListener(): void;

  /**
   * 创建迷你图片预览
   * @param imageUrl - 图片URL
   */
  private createMiniImagePreview(imageUrl: string): void;

  /**
   * 渲染迷你图片预览
   * @param eventData - 事件数据
   * @returns 是否渲染成功
   */
  private renderMiniImagePreview(eventData: MouseEventData): boolean;

  /**
   * 销毁迷你图片预览
   */
  private destroyMiniImagePreview(): void;

  /**
   * 获取提示字符串
   * @returns 提示文本
   */
  getHintString(): string;

  /**
   * 过滤拾取结果，返回有效的DIY模型
   * @param eventData - 事件数据
   * @returns 过滤后的拾取结果或undefined
   */
  private filterPickResult(eventData: MouseEventData): MouseEventData['pickResults'][0] | undefined;

  /**
   * 判断是否为DIY模型
   * @param entity - 实体对象
   * @returns 是否为DIY模型
   */
  private isDIYModels(entity: HSCore.Model.Entity3D): boolean;

  /**
   * 判断是否为N定制参数化背景墙
   * @param entity - 实体对象
   * @returns 是否为参数化背景墙
   */
  private _isNCParametricBackgroundWall(entity: HSCore.Model.Entity3D): boolean;

  /**
   * 清除高亮的网格实体
   */
  private clearHighlightMeshEntity(): void;

  /**
   * 材质选择改变事件回调
   * @param event - 选择改变事件数据
   */
  private onCmdSelectedMaterialDataChanged(event: MaterialSelectionChangedEvent): void;
}