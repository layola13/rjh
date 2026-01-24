/**
 * 删除结构物的命令类
 * 负责删除建筑结构及其关联的内容对象
 */

import { HSCore } from '../core';
import { PerformanceLogCategory, PerformanceOperationTypes } from '../constants/performance';

/**
 * 关联内容分类结果
 */
interface RelatedContentsResult {
  /** 需要重新分配的内容列表 */
  toBeReassign: HSCore.Model.NgContent[];
  /** 需要移除的内容列表 */
  toBeRemoved: HSCore.Model.NgContent[];
}

/**
 * 删除结构物命令
 * 继承自基础命令类，用于删除建筑结构及其依赖的内容对象
 */
export class CmdDeleteStructure extends HSApp.Cmd.Command {
  /** 待删除的结构物 */
  private structure: HSCore.Model.Structure;
  
  /** 事务管理器，用于管理命令的事务性操作 */
  private transMgr: HSApp.TransactionManager;
  
  /** 性能日志记录器 */
  private readonly _perfLog: log.Logger;

  /**
   * 构造函数
   * @param structure - 待删除的结构物对象
   */
  constructor(structure: HSCore.Model.Structure) {
    super();
    
    this._perfLog = log.logger(PerformanceLogCategory.Operation);
    this.structure = structure;
    this.transMgr = HSApp.App.getApp().transManager;
  }

  /**
   * 获取结构物关联的内容对象
   * 将内容分为两类：需要重新分配的和需要移除的
   * 
   * @returns 分类后的关联内容对象
   */
  private getRelateContents(): RelatedContentsResult {
    const toBeReassign: HSCore.Model.NgContent[] = [];
    const toBeRemoved: HSCore.Model.NgContent[] = [];

    this.structure.forEachContent((content: HSCore.Model.NgContent | null) => {
      if (!content || !content.instanceOf(HSConstants.ModelClass.NgContent)) {
        return;
      }

      // 跳过角窗
      if (content.instanceOf(HSConstants.ModelClass.NgCornerWindow)) {
        return;
      }

      // 判断是否为需要移除的特殊类型
      const shouldRemove = 
        content.instanceOf(HSConstants.ModelClass.NgOpening) ||
        content.instanceOf(HSConstants.ModelClass.NgCustomizedModel) ||
        content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_Wainscot) ||
        content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_WallAttached) ||
        content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ParametricOpening);

      if (shouldRemove) {
        toBeRemoved.push(content);
      } else {
        toBeReassign.push(content);
      }
    });

    return {
      toBeReassign,
      toBeRemoved
    };
  }

  /**
   * 执行删除结构物命令
   * 1. 删除关联的内容对象（组件、产品等）
   * 2. 删除结构物本身
   * 3. 提交事务
   */
  onExecute(): void {
    this._perfLog.time(PerformanceOperationTypes.StructureRemoved);

    const relatedContents = this.getRelateContents();
    const deleteRequests: HSApp.Request[] = [];
    const session = this.transMgr.startSession();

    // 处理需要移除的内容对象
    relatedContents.toBeRemoved.forEach((content) => {
      if (content.instanceOf(HSConstants.ModelClass.NgGroup)) {
        // 删除组件
        const request = this.transMgr.createRequest(
          HSFPConstants.RequestType.DeleteAssembly,
          [content]
        );
        deleteRequests.push(request);
      } else {
        // 删除产品
        let skipCheck: boolean | undefined;
        
        // 对于开口和参数化开口，跳过检查
        if (
          content instanceof HSCore.Model.Opening ||
          content instanceof HSCore.Model.ParametricOpening
        ) {
          skipCheck = false;
        }

        const request = this.transMgr.createRequest(
          HSFPConstants.RequestType.DeleteProduct,
          [content, skipCheck]
        );
        deleteRequests.push(request);
      }
    });

    // 批量提交删除内容的请求
    const compositeRequest = this.transMgr.createRequest(
      HSConstants.RequestType.Composite,
      [deleteRequests]
    );
    this.transMgr.commit(compositeRequest);

    // 删除结构物本身
    const deleteStructureRequest = this.transMgr.createRequest(
      HSFPConstants.RequestType.DeleteStructure,
      [this.structure]
    );
    this.transMgr.commit(deleteStructureRequest);

    // 提交事务并完成
    session.commit();
    this._onComplete();
    
    this._perfLog.timeEnd(PerformanceOperationTypes.StructureRemoved, true);
  }

  /**
   * 接收命令响应
   * @param data - 响应数据
   * @param context - 上下文信息
   * @returns 处理结果
   */
  onReceive(data: unknown, context: unknown): boolean {
    return super.onReceive?.(data, context) ?? false;
  }

  /**
   * 命令完成回调
   * 通知命令管理器命令执行完成
   */
  private _onComplete(): void {
    this.mgr.complete(this);
  }
}