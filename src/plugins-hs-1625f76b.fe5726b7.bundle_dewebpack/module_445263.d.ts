/**
 * 删除橱柜事务请求
 * 用于处理橱柜删除操作的撤销/重做逻辑
 */

/**
 * 橱柜部件信息
 */
interface CabinetPart {
  id: string;
  type: string;
  data: unknown;
}

/**
 * 橱柜规格定义
 */
interface CabinetSpec {
  id: string;
  parts: CabinetPart[];
  position: { x: number; y: number; z: number };
  dimensions: { width: number; height: number; depth: number };
  metadata?: Record<string, unknown>;
}

/**
 * 橱柜对象接口
 */
interface Cabinet {
  /**
   * 遍历橱柜的所有部件
   * @param callback - 部件处理回调函数
   * @param context - 回调函数的上下文
   */
  forEachPart(
    callback: (part: CabinetPart, index: number, array: CabinetPart[]) => void,
    context: unknown
  ): void;
}

/**
 * 请求管理器接口
 */
interface RequestManager {
  /**
   * 创建请求
   * @param requestType - 请求类型
   * @param params - 请求参数
   */
  createRequest(requestType: string, params: unknown[]): Request;
}

/**
 * 请求对象接口
 */
interface Request {
  execute(): void;
  undo(): void;
  redo(): void;
}

/**
 * 复合请求基类
 */
declare class CompositeRequest {
  protected mgr: RequestManager;
  
  /**
   * 追加子请求
   * @param request - 子请求对象
   */
  protected append(request: Request): void;
  
  /**
   * 提交事务时的回调
   */
  protected onCommit(): unknown;
  
  /**
   * 撤销事务时的回调
   */
  protected onUndo(): void;
  
  /**
   * 重做事务时的回调
   */
  protected onRedo(): void;
}

/**
 * HSFPConstants 常量定义
 */
declare namespace HSFPConstants {
  enum RequestType {
    DeleteContent = 'DeleteContent'
  }
  
  enum LogGroupTypes {
    ContentOperation = 'ContentOperation'
  }
}

/**
 * HSCore 核心工具类
 */
declare namespace HSCore {
  namespace Util {
    namespace Content {
      /**
       * 移除自定义橱柜
       * @param cabinet - 橱柜对象
       * @returns 橱柜规格数据
       */
      function removeCustomizedCabinet(cabinet: Cabinet): CabinetSpec;
      
      /**
       * 添加自定义橱柜
       * @param spec - 橱柜规格数据
       */
      function addCustomizedCabinet(spec: CabinetSpec): void;
    }
  }
  
  namespace Transaction {
    namespace Common {
      export { CompositeRequest };
    }
  }
}

/**
 * 删除橱柜事务请求类
 * 继承自 CompositeRequest，处理橱柜删除的完整事务流程
 */
export default class DeleteCabinetRequest extends CompositeRequest {
  private _cabinet: Cabinet;
  private _spec: CabinetSpec;
  
  /**
   * 构造函数
   * @param cabinet - 要删除的橱柜对象
   */
  constructor(cabinet: Cabinet);
  
  /**
   * 提交事务：删除橱柜及其所有部件
   * @returns 被删除的橱柜对象
   */
  onCommit(): Cabinet;
  
  /**
   * 撤销操作：恢复已删除的橱柜
   */
  onUndo(): void;
  
  /**
   * 重做操作：再次删除橱柜
   */
  onRedo(): void;
  
  /**
   * 获取操作描述
   * @returns 操作描述文本
   */
  getDescription(): string;
  
  /**
   * 获取操作分类
   * @returns 日志分组类型
   */
  getCategory(): HSFPConstants.LogGroupTypes.ContentOperation;
}