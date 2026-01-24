/**
 * 删除内容事务请求类
 * 
 * 该类处理各种类型内容对象的删除操作，包括窗户、组、装配件、屋顶、天花板、
 * 开口、墙面等多种室内设计元素。根据不同的内容类型，会生成相应的删除请求。
 * 
 * @module DeleteContentRequest
 */

/**
 * 内容类型接口
 */
interface ContentType {
  /**
   * 检查内容类型是否匹配指定的目录类型
   * @param typeEnum - 目录类型枚举值
   * @returns 如果类型匹配返回 true，否则返回 false
   */
  isTypeOf(typeEnum: HSCatalog.ContentTypeEnum): boolean;
}

/**
 * 可删除的内容基类接口
 */
interface DeletableContent {
  /** 内容类型 */
  contentType: ContentType;
}

/**
 * HSCore 命名空间的模型定义
 */
declare namespace HSCore.Model {
  /** 转角窗模型 */
  export class CornerWindow extends DeletableContent {}
  
  /** 组模型 */
  export class Group extends DeletableContent {}
  
  /** 参数化装配件模型 */
  export class PAssembly extends DeletableContent {}
  
  /** 定制参数化屋顶模型 */
  export class NCustomizedParametricRoof extends DeletableContent {}
  
  /** 开口模型 */
  export class Opening extends DeletableContent {}
  
  /** 参数化开口模型 */
  export class ParametricOpening extends DeletableContent {}
  
  /** 装饰装配件模型 */
  export class DAssembly extends DeletableContent {}
  
  /** 装饰造型模型 */
  export class DMolding extends DeletableContent {}
  
  /** 装饰内容模型 */
  export class DContent extends DeletableContent {}
}

/**
 * HSFPConstants 命名空间 - 前端-后端常量定义
 */
declare namespace HSFPConstants {
  /**
   * 请求类型枚举
   */
  export enum RequestType {
    /** 删除普通内容 */
    DeleteContent = 'DeleteContent',
    /** 删除转角窗 */
    DeleteCornerWindow = 'DeleteCornerWindow',
    /** 删除装配件组 */
    DeleteAssembly = 'DeleteAssembly',
    /** 删除参数化装配件 */
    DeletePAssembly = 'DeletePAssembly',
    /** 删除屋顶 */
    DeleteRoof = 'DeleteRoof',
    /** 删除定制模型 */
    DeleteCustomizedModel = 'DeleteCustomizedModel',
    /** 删除NGM开口 */
    DeleteNgmOpening = 'DeleteNgmOpening',
    /** 删除装饰装配件 */
    DeleteDAssembly = 'DeleteDAssembly'
  }

  /**
   * 日志分组类型枚举
   */
  export enum LogGroupTypes {
    /** 内容操作日志组 */
    ContentOperation = 'ContentOperation'
  }
}

/**
 * HSCatalog 命名空间 - 目录相关定义
 */
declare namespace HSCatalog {
  /**
   * 内容类型枚举
   */
  export enum ContentTypeEnum {
    /** 智能定制天花板 */
    SmartCustomizedCeiling = 'SmartCustomizedCeiling',
    /** 定制天花板 */
    CustomizedCeiling = 'CustomizedCeiling',
    /** 挤压定制天花板模型 */
    ExtrusionCustomizedCeilingModel = 'ExtrusionCustomizedCeilingModel',
    /** 挤压定制背景墙 */
    ExtrusionCustomizedBackgroundWall = 'ExtrusionCustomizedBackgroundWall',
    /** 挤压定制平台 */
    ExtrusionCustomizedPlatform = 'ExtrusionCustomizedPlatform',
    /** 定制内容 */
    CustomizedContent = 'CustomizedContent'
  }
}

/**
 * HSCore 事务命名空间
 */
declare namespace HSCore.Transaction.Common {
  /**
   * 复合请求基类
   * 
   * 提供事务请求的基础功能，包括请求的组合、提交等操作
   */
  export class CompositeRequest {
    /** 事务管理器 */
    protected mgr: TransactionManager;

    /**
     * 追加子请求到当前复合请求中
     * @param request - 要添加的子请求
     */
    protected append(request: Request): void;

    /**
     * 提交事务请求
     * @returns 执行结果
     */
    protected onCommit(): unknown;
  }

  /**
   * 事务管理器接口
   */
  interface TransactionManager {
    /**
     * 创建指定类型的请求
     * @param requestType - 请求类型
     * @param args - 请求参数数组
     * @returns 创建的请求对象
     */
    createRequest(requestType: HSFPConstants.RequestType, args: unknown[]): Request;
  }

  /**
   * 请求接口
   */
  interface Request {}
}

/**
 * 删除内容事务请求类
 * 
 * 继承自 CompositeRequest，用于处理各种类型内容对象的删除操作。
 * 该类会根据内容的具体类型（如窗户、装配件、屋顶等），自动选择
 * 对应的删除请求类型，并将其提交给事务管理器执行。
 * 
 * @example
 *