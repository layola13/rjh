import { HSCore } from './core';
import { HSApp } from './app';
import { HSFPConstants } from './constants';

/**
 * 创建辅助线请求
 * 用于在平面图场景中绘制户型辅助线的事务请求
 */
export class CreateAuxiliaryLineRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * 辅助线数据
   */
  private readonly _line: unknown;

  /**
   * 构造函数
   * @param line - 辅助线的配置数据
   */
  constructor(line: unknown) {
    super();
    this._line = line;
  }

  /**
   * 提交操作
   * 在活动图层上创建并添加辅助线
   */
  onCommit(): void {
    const activeLayer = HSApp.App.getApp().floorplan.scene.activeLayer;
    const auxiliaryLine = HSCore.Model.AuxiliaryLine.create(this._line);
    activeLayer.addChild(auxiliaryLine);
    
    // 调用父类的onCommit方法
    super.onCommit?.([]);
  }

  /**
   * 判断字段是否可以进行事务操作
   * @returns 始终返回true，表示该操作支持事务
   */
  canTransactField(): boolean {
    return true;
  }

  /**
   * 获取操作描述
   * @returns 操作的中文描述
   */
  getDescription(): string {
    return "绘制户型辅助线操作";
  }

  /**
   * 获取操作分类
   * @returns 操作所属的日志分组类型（墙体操作）
   */
  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}