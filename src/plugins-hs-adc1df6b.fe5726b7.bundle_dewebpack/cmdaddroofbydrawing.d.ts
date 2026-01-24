/**
 * 手动绘制屋顶命令
 * 通过绘制区域创建参数化屋顶对象
 */

import { Command } from 'HSApp/Cmd/Command';
import { Loop } from '815362'; // 模块路径待确认
import { HSCore } from '635589'; // 模块路径待确认

/**
 * 屋顶绘制参数接口
 */
interface RoofDrawingParams {
  /** 绘制区域，包含外轮廓和关联的屋顶对象 */
  drawingRegion: {
    /** 外部轮廓环 */
    outerLoop: {
      /** 获取所有曲线 */
      getAllCurves(): any[];
    };
    /** 关联的现有屋顶对象（如存在则会被替换） */
    roof?: any;
  };
  /** 元数据 */
  meta: any;
  /** 所在图层 */
  layer: {
    /** 图层高度（米） */
    height: number;
  };
}

/**
 * 屋顶创建参数
 */
interface AddRoofParams {
  meta: any;
  layer: any;
  loop: Loop;
  /** 房间高度（毫米单位） */
  roomHeight: number;
  /** 关联的墙体ID列表 */
  linkWallIds: string[];
  /** 生成类型：绘制方式 */
  generatedType: HSCore.Model.ParametricRoofGeneratedTypeEnum;
  /** 是否为预览模式 */
  isPreview: boolean;
  /** 更新参数 */
  updateParams: {
    /** 偏移量 */
    offset: number;
  };
}

/**
 * 屋顶关系数据结构
 */
interface RoofRelation {
  /** 绘制区域 */
  drawingRegion: RoofDrawingParams['drawingRegion'];
  /** 创建的屋顶对象 */
  roof: any;
}

/**
 * 屋顶关系集合
 */
interface RoofRelations {
  relations: RoofRelation[];
}

/**
 * 命令输入参数
 */
interface CmdAddRoofByDrawingParams {
  /** 待创建的屋顶列表 */
  roofs: RoofDrawingParams[];
}

/**
 * 通过绘制方式添加屋顶的命令类
 * 支持批量创建屋顶并自动处理旧屋顶的替换
 */
export declare class CmdAddRoofByDrawing extends Command {
  /** 命令参数 */
  private _params: CmdAddRoofByDrawingParams;

  /**
   * 构造函数
   * @param params - 屋顶绘制参数
   */
  constructor(params: CmdAddRoofByDrawingParams);

  /**
   * 执行命令主逻辑
   * 1. 开启事务会话
   * 2. 遍历所有屋顶参数，合并曲线创建Loop
   * 3. 发送AddRoof请求创建屋顶
   * 4. 如果存在旧屋顶则删除
   * 5. 更新屋顶关系并提交事务
   */
  onExecute(): void;

  /**
   * 获取命令描述
   * @returns 命令的中文描述
   */
  getDescription(): string;

  /**
   * 获取命令所属分类
   * @returns 日志分组类型：屋顶绘制
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}