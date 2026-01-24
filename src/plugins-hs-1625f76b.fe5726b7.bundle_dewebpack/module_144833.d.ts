/**
 * 产品内容相关的命令类型枚举
 */
declare enum CommandType {
  AddProduct = "AddProduct",
  MoveContent = "MoveContent",
  MoveOpening = "MoveOpening",
  MoveStructure = "MoveStructure",
  MoveBeam = "MoveBeam",
  MoveParametricBackgroundWall = "MoveParametricBackgroundWall",
  MoveNCPBackgroundWallUnit = "MoveNCPBackgroundWallUnit",
  CmdRequestWrap = "CmdRequestWrap"
}

/**
 * 请求类型枚举
 */
declare enum RequestType {
  OverwriteEntityRequest = "OverwriteEntityRequest"
}

/**
 * 内容类型枚举
 */
declare namespace HSCatalog {
  enum ContentTypeEnum {
    SmartCustomizedBackgroundWall = "SmartCustomizedBackgroundWall",
    BackgroundWallUnit = "BackgroundWallUnit"
  }
}

/**
 * 内容元数据基类
 */
declare class Meta {
  contentType: ContentType;
}

/**
 * 内容类型接口
 */
interface ContentType {
  /**
   * 检查内容类型是否匹配指定模式
   * @param pattern - 类型匹配模式（字符串或正则表达式）
   */
  isTypeOf(pattern: string | RegExp): boolean;
}

/**
 * 移动操作配置选项
 */
interface MoveOptions {
  /** 是否显示默认提示信息 */
  showDefaultTip?: boolean;
  [key: string]: unknown;
}

/**
 * 产品内容接口
 */
interface ProductContent {
  content: unknown;
  replaceTarget?: unknown;
}

/**
 * 命令参数接口
 */
interface CommandParams {
  /** 命令类型 */
  type: CommandType | string;
  /** 命令参数数组 */
  params: unknown[];
  /** 取消时是否完成序列 */
  completeSequenceOnCancel?: boolean;
}

/**
 * 核心模型命名空间
 */
declare namespace HSCore.Model {
  /** 自定义结构模型 */
  class NCustomizedStructure {}
  
  /** 自定义梁模型 */
  class NCustomizedBeam {}
}

/**
 * 核心工具命名空间
 */
declare namespace HSCore.Util {
  namespace Content {
    /**
     * 检查是否为参数化开口
     * @param meta - 内容元数据
     */
    function isParametricOpening(meta: Meta): boolean;
  }
}

/**
 * 应用工具命名空间
 */
declare namespace HSApp.Util {
  namespace Opening {
    /**
     * 检查是否为开口内容类型
     * @param meta - 内容元数据
     */
    function isOpeningContentType(meta: Meta): boolean;
  }
}

/**
 * 资源管理器
 */
declare namespace ResourceManager {
  /**
   * 获取国际化字符串
   * @param key - 资源键名
   */
  function getString(key: string): string;
}

/**
 * 消息提示工具
 */
declare namespace Message {
  interface MessageOptions {
    /** 显示持续时间（毫秒） */
    duration?: number;
  }
  
  /**
   * 显示警告消息
   * @param content - 消息内容
   * @param options - 消息选项
   */
  function warning(content: string, options?: MessageOptions): void;
}

/**
 * 常量定义
 */
declare namespace HSFPConstants {
  export { CommandType };
  export { RequestType };
}

/**
 * 产品添加/移动命令生成函数
 * 
 * 根据传入的内容元数据和选项，生成相应的命令序列。
 * 支持多种内容类型：开口、结构、梁、背景墙等。
 * 
 * @param args - 参数数组，第一个元素为内容元数据(Meta)，第二个元素为移动选项(MoveOptions)
 * @returns 包含命令序列和处理数据的元组
 *   - 第一个元素：命令工厂函数数组
 *   - 第二个元素：待处理的内容数组
 * 
 * @example
 *