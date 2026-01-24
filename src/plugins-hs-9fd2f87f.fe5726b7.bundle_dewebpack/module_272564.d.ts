/**
 * 移除定制模型光带的事务请求类
 * @module RemoveLightBandRequest
 */

import { Transaction } from './Transaction';
import { CustomizedModel } from './CustomizedModel';
import { LightBand } from './LightBand';

/**
 * 光带移除请求类
 * 继承自 HSCore.Transaction.Request，用于实现光带移除操作的撤销/重做功能
 */
export default class RemoveLightBandRequest extends Transaction.Request {
  /**
   * 被移除的光带对象
   */
  private readonly _lightBand: LightBand;

  /**
   * 光带所属的父定制模型
   */
  private readonly _parentCustomizedModel: CustomizedModel;

  /**
   * 操作前的WebCAD文档序列化字符串
   */
  private readonly _webcadDocBefore: string;

  /**
   * 操作后的WebCAD文档序列化字符串
   */
  private _webcadDocAfter: string;

  /**
   * 构造函数
   * @param lightBand - 要移除的光带对象
   */
  constructor(lightBand: LightBand);

  /**
   * 执行移除光带的请求操作
   */
  doRequest(): void;

  /**
   * 提交事务时的回调
   * 执行移除操作并保存操作后的文档状态
   */
  onCommit(): void;

  /**
   * 撤销操作时的回调
   * 恢复到操作前的文档状态并还原光带
   */
  onUndo(): void;

  /**
   * 重做操作时的回调
   * 重新执行移除操作并恢复到操作后的文档状态
   */
  onRedo(): void;
}

/**
 * HSCore 命名空间类型声明
 */
declare namespace HSCore {
  namespace Transaction {
    /**
     * 事务请求基类
     */
    class Request {
      constructor();
    }
  }

  namespace Model {
    namespace CustomizedModel {
      /**
       * 将WebCAD文档序列化为字符串
       * @param document - WebCAD文档对象
       * @returns 序列化后的字符串
       */
      function stringifyWebCADDocument(document: unknown): string;

      /**
       * 将字符串解析为WebCAD文档对象
       * @param documentString - 序列化的文档字符串
       * @returns 解析后的WebCAD文档对象
       */
      function parseWebCADDocument(documentString: string): unknown;
    }
  }

  namespace Util {
    namespace Content {
      /**
       * 移除定制模型的光带
       * @param lightBand - 要移除的光带对象
       */
      function removeCustomizedModelLightBand(lightBand: LightBand): void;

      /**
       * 还原已移除的光带
       * @param lightBand - 要还原的光带对象
       * @param parentModel - 光带所属的父定制模型
       */
      function restoreRemovedLightBand(
        lightBand: LightBand,
        parentModel: CustomizedModel
      ): void;
    }
  }
}