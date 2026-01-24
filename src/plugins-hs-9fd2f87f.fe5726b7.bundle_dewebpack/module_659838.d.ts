/**
 * 粘贴内容命令模块
 * 处理复制粘贴操作，支持跨视图模式检测和不完整粘贴提示
 */

/**
 * 粘贴内容命令的配置选项
 */
interface PasteContentOptions {
  /** 选中的内容实体数组 */
  selectedContents?: Array<HSCore.Model.Entity>;
  /** 是否按下Alt键（用于特殊粘贴模式） */
  altKey?: boolean;
  /** 粘贴位置坐标 */
  position?: { x: number; y: number; z?: number };
}

/**
 * 粘贴内容的JSON数据结构
 */
interface ContentsJSON {
  /** 环境ID */
  environmentId?: string;
  /** 视图模式 */
  viewMode?: string;
  /** 是否完整 */
  isComplete?: boolean;
  /** 内容数据数组 */
  data?: Array<ContentData>;
  /** 产品信息数组 */
  products?: Array<{ id: string }>;
  /** 材质信息 */
  material?: unknown;
}

/**
 * 单个内容数据项
 */
interface ContentData {
  /** 内容唯一标识 */
  id: string;
  /** SeekId用于查找产品 */
  seekId: string;
  /** 成员ID数组（用于组关系） */
  members?: string[];
  /** 父级ID数组 */
  p?: string[];
}

/**
 * 粘贴内容请求参数
 */
interface PasteContentRequest {
  /** 数据内容 */
  dataContent: ContentData;
  /** 选中的内容实体 */
  selectedContent?: HSCore.Model.Entity;
  /** 完整的内容JSON */
  contentsJSON: ContentsJSON;
  /** 平面图对象 */
  floorplan: HSApp.FloorPlan;
  /** 产品映射表 */
  productsMap: Map<string, HSCatalog.Product>;
  /** 粘贴位置 */
  position?: { x: number; y: number; z?: number };
  /** 是否Alt键模式 */
  altKey?: boolean;
  /** 目标实体 */
  entity?: HSCore.Model.Entity;
}

/**
 * 粘贴内容命令类
 * 继承自HSApp.Cmd.Command，处理内容的粘贴操作
 */
declare class PasteContentCommand extends HSApp.Cmd.Command {
  /** 应用实例 */
  private _app: HSApp.App;
  
  /** 平面图实例 */
  private _floorplan: HSApp.FloorPlan;
  
  /** 选中的内容实体数组 */
  private _selectedContents?: Array<HSCore.Model.Entity>;
  
  /** 内容的JSON表示 */
  private _contentsJSON?: ContentsJSON;
  
  /** 粘贴后的内容实体数组 */
  private _contents: Array<HSCore.Model.Entity>;
  
  /** 是否按下Alt键 */
  private _altKey?: boolean;
  
  /** 粘贴位置 */
  position?: { x: number; y: number; z?: number };
  
  /** 本地存储实例 */
  private _localStorage: HSApp.Util.Storage;
  
  /** 命令是否已终止 */
  private _terminated: boolean;
  
  /** 粘贴的单个内容实体 */
  content?: HSCore.Model.Entity;
  
  /** 命令输出结果 */
  output?: Array<HSCore.Model.Entity>;

  /**
   * 构造函数
   * @param options - 粘贴内容选项
   */
  constructor(options: PasteContentOptions);

  /**
   * 执行粘贴命令
   * 1. 获取待粘贴的JSON数据
   * 2. 验证视图模式是否匹配
   * 3. 过滤支持的内容类型
   * 4. 加载所需的产品数据
   * 5. 执行粘贴操作
   */
  onExecute(): void;

  /**
   * 执行内容粘贴
   * @param filteredData - 过滤后的内容数据数组
   * @param contentsJSON - 完整的内容JSON
   * @param productsMap - 产品映射表
   */
  private _pasteContents(
    filteredData: ContentData[],
    contentsJSON: ContentsJSON,
    productsMap: Map<string, HSCatalog.Product>
  ): void;

  /**
   * 检查是否为非当前视图模式
   * @param environmentId - 环境ID
   * @param viewMode - 视图模式
   * @returns 是否为跨视图模式
   */
  private _isNotCurrentViewMode(environmentId: string, viewMode: string): boolean;

  /**
   * 获取当前环境ID
   * @returns 当前激活的环境ID
   */
  private _getEnvId(): string;

  /**
   * 获取当前视图模式
   * @returns 当前主视图模式
   */
  private _getViewMode(): string;

  /**
   * 显示不完整粘贴的实时提示
   * 仅在用户未禁用提示时显示
   */
  private _showIncompleteLiveHint(): void;

  /**
   * 显示跨视图模式粘贴的实时提示
   * 提示持续3秒后自动隐藏
   */
  private _showCrossViewModeLiveHint(): void;

  /**
   * 粘贴单个内容实体
   * @param dataContent - 内容数据
   * @param contentsJSON - 完整的内容JSON
   * @param productsMap - 产品映射表
   * @param selectedContent - 选中的内容（Alt模式下使用）
   * @param entity - 目标实体（门窗等）
   * @returns 粘贴后的内容实体
   */
  private _pasteContent(
    dataContent: ContentData,
    contentsJSON: ContentsJSON,
    productsMap: Map<string, HSCatalog.Product>,
    selectedContent?: HSCore.Model.Entity,
    entity?: HSCore.Model.Entity
  ): HSCore.Model.Entity;

  /**
   * 选中指定的内容实体数组
   * @param contents - 要选中的内容实体数组
   */
  private _selectContents(contents: Array<HSCore.Model.Entity>): void;

  /**
   * 清理命令资源
   * 重置内容数组和终止状态
   */
  onCleanup(): void;

  /**
   * 终止命令执行
   * @param isCancelled - 是否取消（true=取消，false=完成）
   */
  private _onTerminate(isCancelled: boolean): void;

  /**
   * 是否支持撤销/重做
   * @returns false - 不支持撤销重做
   */
  canUndoRedo(): boolean;

  /**
   * 是否可以挂起
   * @returns false - 不可挂起
   */
  canSuspend(): boolean;

  /**
   * 获取命令描述
   * @returns 命令描述文本
   */
  getDescription(): string;

  /**
   * 获取命令类别
   * @returns 日志分组类型
   */
  getCategory(): string;
}

/**
 * 本地存储键：不完整粘贴提示不再显示标志
 */
declare const CMDPASTE_INCOMPLETE_PASTE_NOT_SHOW_LIVEHINT = "CMDPASTE_INCOMPLETE_PASTE_NOT_SHOW_LIVEHINT";

/** 默认导出粘贴内容命令类 */
export default PasteContentCommand;