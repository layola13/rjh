/**
 * 删除模型组合请求类
 * 用于处理删除模型组合的复合事务操作
 * @module DeleteGroupRequest
 */

/**
 * 表示模型组的接口
 */
interface IGroup {
  /**
   * 将组转换为扁平的组列表
   * @returns 扁平化后的组数组
   */
  toFlatGroupList(): IGroup[];
  
  /**
   * 将组转换为扁平的成员列表
   * @returns 扁平化后的成员数组
   */
  toFlatMemberList<T>(): T[];
}

/**
 * 请求管理器接口
 */
interface IRequestManager {
  /**
   * 创建请求
   * @param requestType - 请求类型
   * @param args - 请求参数
   * @returns 创建的请求对象
   */
  createRequest<T>(requestType: HSFPConstants.RequestType, args: T[]): unknown;
}

/**
 * 复合请求基类
 */
declare class CompositeRequest {
  /**
   * 请求管理器实例
   */
  protected mgr: IRequestManager;
  
  /**
   * 追加子请求到复合请求中
   * @param request - 要追加的请求
   */
  protected append(request: unknown): void;
}

/**
 * 删除模型组合请求类
 * 继承自HSCore.Transaction.Common.CompositeRequest
 * 负责处理模型组合的删除操作,包括解散组和删除成员
 */
declare class DeleteGroupRequest extends CompositeRequest {
  /**
   * 要删除的模型组
   * @private
   */
  private readonly _group: IGroup;
  
  /**
   * 构造函数
   * @param group - 要删除的模型组实例
   */
  constructor(group: IGroup);
  
  /**
   * 提交删除操作
   * 执行以下操作:
   * 1. 遍历组的扁平列表,为每个组创建解散请求(UngroupContents)
   * 2. 遍历组的成员列表,为每个成员创建删除请求(DeleteContent)
   * 3. 调用父类的onCommit方法
   * @returns 返回被删除的组实例
   */
  onCommit(): IGroup;
  
  /**
   * 获取操作描述
   * @returns 返回"删除模型组合"
   */
  getDescription(): string;
  
  /**
   * 获取操作日志分类
   * @returns 返回内容操作类型
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}

/**
 * HSFP常量命名空间
 */
declare namespace HSFPConstants {
  /**
   * 请求类型枚举
   */
  enum RequestType {
    /** 解散内容组 */
    UngroupContents = "UngroupContents",
    /** 删除内容 */
    DeleteContent = "DeleteContent"
  }
  
  /**
   * 日志分组类型枚举
   */
  enum LogGroupTypes {
    /** 内容操作类型 */
    ContentOperation = "ContentOperation"
  }
}

/**
 * HSCore核心命名空间
 */
declare namespace HSCore.Transaction.Common {
  export { CompositeRequest };
}

export default DeleteGroupRequest;