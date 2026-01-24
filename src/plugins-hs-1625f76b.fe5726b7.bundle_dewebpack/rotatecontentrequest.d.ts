/**
 * 旋转内容请求类
 * 用于处理3D内容的旋转操作，支持撤销/重做功能
 */

import { HSCore } from './HSCore';

/**
 * 旋转状态接口
 * 描述3D对象的完整旋转信息
 */
interface RotationState {
  /** X轴旋转角度（弧度或度数） */
  XRotation: number;
  /** Y轴旋转角度（弧度或度数） */
  YRotation: number;
  /** Z轴旋转角度或整体旋转值 */
  rotation: number;
}

/**
 * 可旋转内容接口
 * 定义支持旋转操作的内容对象必须具备的属性
 */
interface RotatableContent {
  /** X轴旋转角度 */
  XRotation: number;
  /** Y轴旋转角度 */
  YRotation: number;
  /** 整体旋转角度 */
  rotation: number;
}

/**
 * 旋转内容请求类
 * 继承自HSCore事务系统的StateRequest基类
 * 实现内容旋转的事务性操作，支持完整的撤销/重做机制
 */
export class RotateContentRequest extends HSCore.Transaction.Common.StateRequest {
  /** 要旋转的内容对象 */
  private readonly _content: RotatableContent;
  
  /** 旋转前的原始状态 */
  private readonly _oldRotation: RotationState;
  
  /** 旋转后的目标状态 */
  private readonly _newRotation: RotationState;

  /**
   * 构造旋转内容请求
   * @param content - 要旋转的内容对象
   * @param oldRotation - 旧的旋转值数组 [XRotation, YRotation, rotation]
   * @param newRotation - 新的旋转值数组 [XRotation, YRotation, rotation]
   */
  constructor(
    content: RotatableContent,
    oldRotation: [number, number, number],
    newRotation: [number, number, number]
  ) {
    super();
    
    this._content = content;
    
    this._oldRotation = {
      XRotation: oldRotation[0],
      YRotation: oldRotation[1],
      rotation: oldRotation[2]
    };
    
    this._newRotation = {
      XRotation: newRotation[0],
      YRotation: newRotation[1],
      rotation: newRotation[2]
    };
  }

  /**
   * 提交事务时执行
   * 应用新的旋转状态
   */
  onCommit(): void {
    this.rotateContent(this._newRotation);
    super.onCommit();
  }

  /**
   * 判断字段是否可以参与事务
   * @returns 始终返回true，表示支持事务操作
   */
  canTransactField(): boolean {
    return true;
  }

  /**
   * 应用旋转状态到内容对象
   * 只更新发生变化的旋转属性以优化性能
   * @param rotation - 要应用的旋转状态
   */
  private rotateContent(rotation: RotationState): void {
    const { XRotation, YRotation, rotation: zRotation } = rotation;
    
    if (this._content.XRotation !== XRotation) {
      this._content.XRotation = XRotation;
    }
    
    if (this._content.YRotation !== YRotation) {
      this._content.YRotation = YRotation;
    }
    
    if (this._content.rotation !== zRotation) {
      this._content.rotation = zRotation;
    }
  }

  /**
   * 撤销操作
   * 恢复到旋转前的状态
   */
  onUndo(): void {
    super.onUndo();
    this.rotateContent(this._oldRotation);
  }

  /**
   * 重做操作
   * 重新应用旋转变更
   */
  onRedo(): void {
    super.onRedo();
    this.rotateContent(this._newRotation);
  }

  /**
   * 获取操作描述
   * @returns 操作的可读描述文本
   */
  getDescription(): string {
    return "旋转模型";
  }

  /**
   * 获取操作类别
   * @returns 日志分组类型，用于操作分类统计
   */
  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }
}