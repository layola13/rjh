/**
 * 样板间编辑命令类型定义
 * @module StylerTemplateEditCommand
 */

/**
 * 自定义UI组件接口
 */
interface ICustomizedUI {
  /**
   * 绑定产品元数据
   * @param productMeta - 产品元数据对象
   */
  bindData(productMeta: IProductMeta): void;

  /**
   * 将UI结果写入容器
   * @param resultContainer - 结果容器对象
   */
  writeResult(resultContainer: Record<string, unknown>): void;

  /**
   * 检查数据是否已更改
   * @returns 如果已更改返回true
   */
  isChanged(): boolean;

  /**
   * 检查是否需要后处理
   * @returns 如果需要后处理返回true
   */
  needPostProcess(): boolean;
}

/**
 * 产品属性接口
 */
interface IProductAttributes {
  [key: string]: unknown;
}

/**
 * 用户自由数据接口
 */
interface IUserFreeData {
  /** 房间ID */
  roomId: string;
  /** 房间面积 */
  area?: number;
  /** 设计ID */
  designId?: string;
  /** 设计URL */
  designUrl?: string;
  /** 模板数据 */
  templateData?: unknown;
  [key: string]: unknown;
}

/**
 * 产品图片信息接口
 */
interface IProductImage {
  /** 图片URL */
  url: string;
  [key: string]: unknown;
}

/**
 * 产品元数据接口
 */
interface IProductMeta {
  /** 产品唯一标识 */
  id: string;
  /** 产品名称 */
  name: string;
  /** 房间风格ID */
  roomStyle?: string;
  /** 房间类型ID */
  roomType?: string;
  /** 房间ID */
  roomId?: string;
  /** 产品图片列表 */
  images?: IProductImage[];
  /** 内容类型 */
  contentType: {
    isTypeOf(type: unknown): boolean;
  };
  /** 产品属性 */
  attributes?: IProductAttributes;
  /** 用户自由数据 */
  userFreeData: IUserFreeData;
  /** 自定义房间信息 */
  customizedRoom?: {
    roomId: string;
  };
}

/**
 * 房间类型列表项接口
 */
interface IRoomType {
  /** 房间类型ID */
  id: string;
  /** 房间类型名称 */
  name: string;
  [key: string]: unknown;
}

/**
 * 图片信息接口
 */
interface IPictureInfo {
  /** 图片唯一标识 */
  id: string;
  /** 图片URL */
  url: string;
  /** 原始图片URL */
  originUrl?: string;
  /** 渲染类型 */
  renderingType?: string;
  /** 设计版本 */
  designVersion?: string;
  /** 房间ID */
  roomId?: string | number;
}

/**
 * 编辑面板保存数据接口
 */
interface IEditingPanelSaveData {
  /** 样板间名称 */
  name: string;
  /** 房间类型ID */
  roomTypeId: string;
  /** 封面图片信息 */
  picInfo: IPictureInfo;
}

/**
 * 原始数据快照接口
 */
interface IOriginalData {
  /** 原始名称 */
  name: string;
  /** 原始房间类型 */
  roomType: string;
  /** 原始图片URL */
  picUrl: string;
}

/**
 * 全屋编辑服务端数据接口
 */
interface IWholehouseEditServerData {
  /** 产品ID */
  id: string;
  /** 样板间名称 */
  name: string;
  /** 房间风格 */
  style: string;
  /** 封面缩略图URL */
  thumb?: string;
  /** ISO渲染唯一标识 */
  isoRenderingUid?: string;
  /** ISO渲染类型 */
  isoRenderingType?: string;
  /** ISO版本 */
  isoVersion?: string;
}

/**
 * 单房间编辑服务端数据接口
 */
interface ISinglehouseEditServerData {
  /** 产品ID */
  id: string;
  /** 房间ID */
  roomId: string;
  /** 模板名称 */
  templateName: string;
  /** 房间面积 */
  area?: number;
  /** 房间类型ID */
  roomType: string;
  /** 设计ID */
  designId?: string;
  /** 设计URL */
  designUrl?: string;
  /** 是否使用后处理 */
  usePostProcess: boolean;
  /** 模板数据 */
  templateData?: unknown;
  /** 封面缩略图URL */
  thumb?: string;
  /** ISO渲染唯一标识 */
  isoRenderingUid?: string;
  /** ISO渲染类型 */
  isoRenderingType?: string;
  /** ISO版本 */
  isoVersion?: string;
}

/**
 * 目录插件接口
 */
interface ICatalogPlugin {
  /**
   * 关闭独立面板
   */
  closeIndependent(): void;

  /**
   * 更新自定义产品
   * @param id - 产品ID
   * @param data - 更新数据
   * @param category - 用户数据分类
   * @returns 更新操作的Promise
   */
  updateCustomizedProduct(
    id: string,
    data: IWholehouseEditServerData | ISinglehouseEditServerData,
    category: unknown
  ): Promise<void>;
}

/**
 * 信号发送接口
 */
interface ISignalSendingStylerTemplate {
  /**
   * 分发信号数据
   * @param data - 包含自定义UI结果和服务端数据的对象
   */
  dispatch(data: {
    customizedUIResultContainer: Record<string, unknown>;
    dataToServer: ISinglehouseEditServerData;
  }): void;
}

/**
 * 图片选择器面板回调接口
 */
interface IPickImagePanelCallbacks {
  /**
   * 添加数据到状态
   * @param key - 数据键
   * @param value - 数据值
   */
  addData(key: string, value: unknown): void;

  /**
   * 提交状态更改
   */
  commit(): void;
}

/**
 * 图片选择器面板组件接口
 */
interface IPickImagePanel {
  /**
   * 设置图片列表
   * @param pictureList - 图片信息列表
   */
  setPictureList_(pictureList: IPictureInfo[]): void;
}

/**
 * 样板间编辑命令构造参数接口
 */
interface IStylerTemplateEditCommandParams {
  /** 应用实例 */
  app: unknown;
  /** 编辑面板DOM节点 */
  editingPanelDomNode: HTMLElement;
  /** 图片选择面板DOM节点 */
  pickImagePanelDomNode: HTMLElement;
  /** 目录插件实例 */
  catalogPlugin: ICatalogPlugin;
  /** 信号发送样板间模板实例 */
  signalSendingStylerTemplate: ISignalSendingStylerTemplate;
  /** 自定义UI组件数组 */
  customizedUIArr: ICustomizedUI[];
  /** 产品元数据 */
  productMeta: IProductMeta;
  /** 完成回调函数 */
  callback?: () => void;
}

/**
 * 样板间编辑命令类
 * 负责处理样板间（单房间/全屋）的编辑、保存和图片管理
 */
declare class StylerTemplateEditCommand extends HSApp.Cmd.Command {
  /** 应用实例 */
  private readonly _app: unknown;

  /** 编辑面板DOM节点 */
  private readonly _editingPanelDomNode: HTMLElement;

  /** 图片选择面板DOM节点 */
  private readonly _pickImagePanelDomNode: HTMLElement;

  /** 目录插件实例 */
  private readonly _catalogPlugin: ICatalogPlugin;

  /** 信号发送样板间模板实例 */
  private readonly _signalSendingStylerTemplate: ISignalSendingStylerTemplate;

  /** 自定义UI组件数组 */
  private readonly _customizedUIArr: ICustomizedUI[];

  /** 产品元数据 */
  private readonly _productMeta: IProductMeta;

  /** 原始数据快照（用于比对变更） */
  private _originalData?: IOriginalData;

  /** 已下载的封面图片信息列表 */
  private _downloadedCoverPicInfoList?: IPictureInfo[];

  /** 是否为全屋模式标志 */
  wholehouseFlag: boolean;

  /** 房间ID */
  roomId?: string;

  /** 完成回调函数 */
  callbaclk?: () => void;

  /**
   * 创建样板间编辑命令实例
   * @param params - 命令构造参数
   */
  constructor(params: IStylerTemplateEditCommandParams);

  /**
   * 执行命令 - 打开编辑面板并加载产品数据
   */
  onExecute(): void;

  /**
   * 接收命令执行结果
   * @returns 始终返回true
   */
  onReceive(): boolean;

  /**
   * 是否可以撤销/重做
   * @returns 始终返回false（编辑命令不支持撤销）
   */
  canUndoRedo(): boolean;

  /**
   * 获取指定尺寸的图片URL
   * @param imageUrl - 原始图片URL
   * @returns 处理后的图片URL，如果输入为空则返回空字符串
   */
  private _getImgScr(imageUrl: string | null | undefined): string;

  /**
   * 生成全屋编辑模式的服务端数据
   * @param productMeta - 产品元数据
   * @param saveData - 编辑面板保存的数据
   * @returns 全屋编辑服务端数据对象
   */
  private _getWholhouseEditServerData(
    productMeta: IProductMeta,
    saveData: IEditingPanelSaveData
  ): IWholehouseEditServerData;

  /**
   * 生成单房间编辑模式的服务端数据
   * @param productMeta - 产品元数据
   * @param saveData - 编辑面板保存的数据
   * @param usePostProcess - 是否使用后处理
   * @returns 单房间编辑服务端数据对象
   */
  private _getSinglehouseEditServerData(
    productMeta: IProductMeta,
    saveData: IEditingPanelSaveData,
    usePostProcess: boolean
  ): ISinglehouseEditServerData;

  /**
   * 编辑面板保存回调
   * 检测数据变更并提交到服务器
   * @param saveData - 编辑面板保存的数据
   */
  private _onEditingPanelSave(saveData: IEditingPanelSaveData): void;

  /**
   * 执行数据发送到服务器
   * 显示加载提示，处理成功/失败状态
   * @param productId - 产品ID
   * @param serverData - 要发送的服务端数据
   * @param category - 用户数据分类类型
   */
  private _executeSendingToServer(
    productId: string,
    serverData: IWholehouseEditServerData | ISinglehouseEditServerData,
    category: unknown
  ): void;

  /**
   * 请求选择/上传图片回调
   * 打开图片选择面板
   * @param callbacks - 图片选择器回调函数集合
   * @param beforeUploadCallback - 上传前回调
   */
  private _onRequestPicture(
    callbacks: IPickImagePanelCallbacks,
    beforeUploadCallback: () => void
  ): void;

  /**
   * 根据房间ID过滤图片信息列表
   * @returns 过滤后的图片信息列表，如果无可用数据则返回原列表
   */
  filterPicInfoList(): IPictureInfo[] | undefined;

  /**
   * 图片选择面板即将挂载回调
   * 加载并设置可用图片列表
   * @param panel - 图片选择器面板组件实例
   */
  private _onPickImagePanelWillMount(panel: IPickImagePanel): void;

  /**
   * 获取命令描述
   * @returns 命令描述文本
   */
  getDescription(): string;

  /**
   * 获取命令分类
   * @returns 日志分组类型（模板设计）
   */
  getCategory(): unknown;

  /**
   * 是否为交互式命令
   * @returns 始终返回true
   */
  isInteractive(): boolean;
}

export default StylerTemplateEditCommand;