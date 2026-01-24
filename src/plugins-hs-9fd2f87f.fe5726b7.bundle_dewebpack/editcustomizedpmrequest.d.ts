/**
 * 自定义参数化建模编辑请求
 * 用于处理3D模型的参数化编辑操作，支持撤销/重做功能
 */

import { DIYUtils } from './DIYUtils';
import { CustomizedPMRequest } from './CustomizedPMRequest';

/**
 * 根实体接口，表示可编辑的3D模型实体
 */
interface IRootEntity {
  /**
   * 当前的WebCAD文档对象
   */
  webCADDocument: unknown;
  
  /**
   * 打开DIY文档
   * @returns Promise，完成后无返回值
   */
  openDiyDocument(): Promise<void>;
}

/**
 * 建模数据类型
 * 包含编辑模型所需的参数化数据
 */
type ModelingData = unknown;

/**
 * 编辑自定义参数化建模请求类
 * 继承自CustomizedPMRequest，实现参数化模型的编辑、撤销、重做功能
 */
export class EditCustomizedPMRequest extends CustomizedPMRequest {
  /**
   * 根实体对象，表示被编辑的3D模型
   */
  private readonly _rootEntity: IRootEntity;
  
  /**
   * 宿主对象
   */
  private readonly _host: unknown;
  
  /**
   * 建模数据，包含编辑所需的参数
   */
  private readonly _modelingData: ModelingData;
  
  /**
   * 编辑前的文档状态
   */
  private _beforeDoc: unknown;
  
  /**
   * 编辑后的文档状态
   */
  private _afterDoc?: unknown;

  /**
   * 构造函数
   * @param rootEntity - 根实体对象
   * @param host - 宿主对象
   * @param modelingData - 建模数据
   */
  constructor(rootEntity: IRootEntity, host: unknown, modelingData: ModelingData) {
    super();
    this._rootEntity = rootEntity;
    this._host = host;
    this._modelingData = modelingData;
    this._beforeDoc = this._rootEntity.webCADDocument;
  }

  /**
   * 异步接收并处理请求
   * @param command - 命令类型，例如 "editModel"
   * @param args - 命令参数
   * @returns Promise<boolean> - 操作是否成功
   */
  async onReceiveAsync(command: string, args?: unknown): Promise<boolean> {
    if (command === 'editModel') {
      return await DIYUtils.editModel(this._rootEntity, this._modelingData, true);
    }
    return super.onReceiveAsync?.(command, args) ?? false;
  }

  /**
   * 提交操作
   * 在编辑完成后调用，保存编辑后的文档状态
   */
  onCommit(): void {
    super.onCommit?.();
    this._afterDoc = this._rootEntity.webCADDocument;
  }

  /**
   * 撤销操作
   * 恢复到编辑前的文档状态
   */
  async onUndo(): Promise<void> {
    super.onUndo?.();
    await this._rootEntity.openDiyDocument();
    
    // 调试模式下验证文档状态是否正确恢复
    if (this._beforeDoc !== this._rootEntity.webCADDocument && typeof DEBUG !== 'undefined' && DEBUG) {
      console.warn('Document state mismatch after undo');
    }
  }

  /**
   * 重做操作
   * 恢复到编辑后的文档状态
   */
  async onRedo(): Promise<void> {
    super.onRedo?.();
    await this._rootEntity.openDiyDocument();
    
    // 调试模式下验证文档状态是否正确恢复
    if (this._afterDoc !== this._rootEntity.webCADDocument && typeof DEBUG !== 'undefined' && DEBUG) {
      console.warn('Document state mismatch after redo');
    }
  }
}