/**
 * 参数化屋顶创建预览命令
 * @module CreateParametricRoofPreviewCommand
 */

/**
 * 屋顶创建请求参数
 */
interface RoofCreationParams {
  /** 元数据信息 */
  meta: any;
  /** 图层信息 */
  layer: any;
  /** 屋顶闭合环路 */
  loop: any[];
  /** 房间高度 */
  roomHeight: number;
  /** 关联的墙体ID列表 */
  linkWallIds: string[];
  /** 屋顶生成类型 */
  generatedType: HSCore.Model.ParametricRoofGeneratedTypeEnum;
  /** 是否为预览模式 */
  isPreview: boolean;
}

/**
 * 屋顶信息结构
 */
interface RoofInfo {
  /** 屋顶轮廓环路信息 */
  loop: {
    /** 环路坐标点集合 */
    loop: any[];
  };
}

/**
 * 创建参数化屋顶预览命令类
 * @extends HSApp.Cmd.Command
 */
declare class CreateParametricRoofPreviewCommand extends HSApp.Cmd.Command {
  /** 元数据信息 */
  private _meta: any;
  
  /** 图层信息 */
  private _layer: any;
  
  /** 屋顶详细信息 */
  private _info: RoofInfo;
  
  /** 房间高度 */
  private _roomHeight: number;
  
  /** 关联的墙体ID集合 */
  private _linkWallIds: string[];
  
  /** 事务请求对象 */
  private _request: any;

  /**
   * 构造函数
   * @param meta - 元数据
   * @param layer - 图层
   * @param info - 屋顶信息
   * @param roomHeight - 房间高度
   * @param linkWallIds - 关联墙体ID列表
   */
  constructor(
    meta: any,
    layer: any,
    info: RoofInfo,
    roomHeight: number,
    linkWallIds: string[]
  );

  /**
   * 执行命令逻辑
   * @returns 请求执行结果
   */
  onExecute(): any;

  /**
   * 获取命令描述
   * @returns 命令描述字符串
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * @returns 日志分组类型
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}

export default CreateParametricRoofPreviewCommand;