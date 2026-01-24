/**
 * 多产品参数适配器模块
 * 用于处理添加多个产品到场景中的命令转换和参数适配
 */

/**
 * 命令类型枚举
 */
declare enum CommandType {
  CmdAddProducts = 'CmdAddProducts',
  MoveContent = 'MoveContent',
  MoveContents = 'MoveContents',
  CmdRequestWrap = 'CmdRequestWrap',
}

/**
 * 请求类型枚举
 */
declare enum RequestType {
  OverwriteEntityRequest = 'OverwriteEntityRequest',
}

/**
 * 产品元数据接口
 */
interface ProductMeta {
  /** 产品唯一标识符 */
  id: string;
  /** 产品名称 */
  name?: string;
  /** 产品类型 */
  type?: string;
}

/**
 * 软模型数据接口
 */
interface SoftModelData {
  /** 产品元数据 */
  meta?: ProductMeta;
  /** 模型数据 */
  data?: unknown;
}

/**
 * 代理数据接口（自定义和DIY代理的基础接口）
 */
interface ProxyData {
  /** 代理标识符 */
  id?: string;
  /** 代理配置 */
  config?: unknown;
}

/**
 * 添加多产品参数接口
 */
interface AddMultiProductParams {
  /** 软模型数据数组 */
  softModelData: SoftModelData[];
  /** 自定义代理数据数组 */
  customizeProxyData: ProxyData[];
  /** DIY代理数据数组 */
  diyProxyData: ProxyData[];
}

/**
 * 移动选项接口
 */
interface MoveOptions {
  /** 是否忽略捕捉偏移 */
  ignoreSnapOffset: boolean;
  /** 默认地面模式 */
  defaultGround: boolean;
  /** 是否启用灯光矩阵排列 */
  lightingMatrixArrangedEnable: boolean;
}

/**
 * 命令对象接口 - 添加产品
 */
interface AddProductsCommand {
  /** 命令类型 */
  type: CommandType.CmdAddProducts;
  /** 命令参数 */
  params: AddMultiProductParams[];
}

/**
 * 命令对象接口 - 移动内容（单个）
 */
interface MoveContentCommand {
  /** 命令类型 */
  type: CommandType.MoveContent;
  /** 命令参数：[内容, 位置, 选项] */
  params: [unknown, undefined, MoveOptions];
  /** 取消时是否完成序列 */
  completeSequenceOnCancel: boolean;
}

/**
 * 命令对象接口 - 移动内容（多个）
 */
interface MoveContentsCommand {
  /** 命令类型 */
  type: CommandType.MoveContents;
  /** 命令参数：[内容数组, 位置, 选项] */
  params: [unknown[], undefined, MoveOptions];
  /** 取消时是否完成序列 */
  completeSequenceOnCancel: boolean;
}

/**
 * 覆盖实体请求参数接口
 */
interface OverwriteEntityParams {
  /** 要覆盖的内容 */
  content: unknown;
  /** 被替换的目标 */
  replaceTarget: unknown;
}

/**
 * 命令对象接口 - 请求包装
 */
interface RequestWrapCommand {
  /** 命令类型 */
  type: CommandType.CmdRequestWrap;
  /** 命令参数：[请求类型, [内容, 替换目标]] */
  params: [RequestType, [unknown, unknown]];
  /** 取消时是否完成序列 */
  completeSequenceOnCancel: boolean;
}

/**
 * 命令工厂函数类型
 */
type CommandFactory = (data: unknown) => AddProductsCommand | MoveContentCommand | MoveContentsCommand | RequestWrapCommand;

/**
 * 命令序列类型：包含命令工厂函数数组和参数数组
 */
type CommandSequence = [CommandFactory[], AddMultiProductParams[]];

/**
 * 添加多产品参数适配器
 * 
 * 将添加多产品的请求转换为命令序列，根据产品数量和类型选择合适的命令类型
 * 
 * @param params - 添加多产品参数数组
 * @returns 命令序列，包含命令工厂函数数组和参数数组
 * 
 * @example
 *