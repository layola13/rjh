/**
 * 样板间还原命令
 * 用于将房间恢复到指定的样板间状态，包括内容、开口、材质和装饰线等
 */

import type { App } from 'HSApp';
import type { Room, Entity, Layer, Opening, Face, Content, Material, Molding } from 'HSCore.Model';
import type { ProxyObject } from 'HSApp.Util';
import type { Command } from 'HSApp.Cmd';

/**
 * 面数据接口，包含材质和装饰线信息
 */
interface FaceData {
  /** 面的材质 */
  material: Material;
  /** 装饰线集合，按类型分组 */
  moldings?: Record<string, Molding[]>;
}

/**
 * 实体转储数据
 */
interface EntityDump {
  /** 实体唯一标识 */
  id: string;
  /** 宿主实体ID */
  host?: string;
  /** 父实体ID列表 */
  p?: string[];
  [key: string]: unknown;
}

/**
 * 房间内容数据
 */
interface RoomContentData {
  /** 内容实体转储数据 */
  dumps: EntityDump[];
  /** 开口实体转储数据 */
  openingDumps: EntityDump[];
  /** 材质数据 */
  materialsData: unknown;
  /** 产品映射表 */
  productsMap: Map<string, unknown>;
  /** 状态映射表 */
  statesMap: Map<string, unknown>;
  /** 约束映射表 */
  constraintMap: Map<string, unknown>;
}

/**
 * 房间数据接口
 */
interface RoomData {
  /** 房间内容数据 */
  contents: RoomContentData;
  /** 面数据映射表，key为面ID */
  faceMap: Map<string, FaceData>;
}

/**
 * 定制化参数化模型数据
 */
interface CustomizedPMData {
  /** 根模型 */
  rootModel: {
    /** WebCAD文档 */
    webCADDocument: unknown;
    /** 打开DIY文档 */
    openDiyDocument(flag: boolean): Promise<void>;
  };
  /** WebCAD文档 */
  webCADDocument: unknown;
  /** 实例模型列表 */
  insModels: unknown[];
}

/**
 * 还原数据接口
 */
interface RestoreData {
  /** 房间数据映射表，key为房间ID */
  roomData: Map<string, RoomData>;
  /** 定制化参数化模型数据（可选） */
  customizedPMs?: CustomizedPMData;
}

/**
 * 加载上下文接口
 */
interface LoadContext {
  /** 实体转储数据，key为实体ID */
  data: Record<string, EntityDump>;
  /** 材质数据 */
  materialsData: unknown;
  /** 产品映射表 */
  productsMap: Map<string, unknown>;
  /** 已加载的实体，key为实体ID */
  entities: Record<string, Entity>;
  /** 材质映射表 */
  materials: Map<string, Material>;
  /** 状态映射表 */
  states: Map<string, unknown>;
  /** 约束映射表 */
  constraints: Map<string, unknown>;
}

/**
 * 代理对象撤销数据接口
 */
interface ProxyObjectUndoData {
  /** 准备重做操作 */
  prepareRedo(): void;
  /** 执行撤销操作 */
  undo(): void;
}

/**
 * 样板间还原命令类
 * 负责将房间恢复到样板间状态，包括清除现有内容和还原保存的数据
 */
declare class TemplateRestoreCommand extends Command {
  /** 应用实例 */
  private app: App;
  
  /** 还原数据 */
  private restoreData: RestoreData;
  
  /** 目标房间（如果为空则处理所有房间） */
  private room: Room | null;
  
  /** 代理对象映射表，用于存储撤销数据 */
  private proxyObjectsMap: Map<string, ProxyObjectUndoData>;

  /**
   * 构造函数
   * @param app - 应用实例
   * @param restoreData - 还原数据
   * @param room - 目标房间，为null时处理所有房间
   * @param proxyObjectsMap - 代理对象映射表
   */
  constructor(
    app: App,
    restoreData: RestoreData,
    room: Room | null,
    proxyObjectsMap: Map<string, ProxyObjectUndoData>
  );

  /**
   * 执行命令
   * 清除房间内容并还原样板间数据
   */
  onExecute(): void;

  /**
   * 清除房间中的所有内容和开口
   * @param room - 要清除的房间
   */
  private clearRoom(room: Room): void;

  /**
   * 还原房间数据
   * @param room - 要还原的房间
   * @returns 还原的开口实体列表
   */
  private restoreRoom(room: Room): Opening[];

  /**
   * 还原定制化参数化模型
   */
  private restoreCustomizedPMModles(): Promise<void>;

  /**
   * 设置面的材质和装饰线
   * @param face - 目标面
   * @param faceData - 面数据
   */
  private setFaceMaterialAndMoldings(face: Face, faceData: FaceData): void;

  /**
   * 添加内容到场景
   * @param content - 内容实体
   * @param parents - 父实体列表
   * @param host - 宿主实体（可选）
   */
  private addContent(content: Content, parents: Entity[], host?: Entity): void;

  /**
   * 获取命令描述
   * @returns 命令描述字符串
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * @returns 命令分类常量
   */
  getCategory(): string;
}

export default TemplateRestoreCommand;