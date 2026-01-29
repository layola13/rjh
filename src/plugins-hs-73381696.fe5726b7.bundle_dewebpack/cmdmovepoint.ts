import { HSApp } from './HSApp';

/**
 * 楼板编辑移动点命令
 */
export class CmdMovePoint extends HSApp.ExtraordinarySketch2d.Cmd.CmdMovePoint {
  /**
   * 创建移动点请求
   * @param data - 请求数据
   * @returns 移动点请求对象
   */
  protected _createRequest(data: unknown): unknown {
    return this.context.transManager.createRequest(
      HSFPConstants.RequestType.SlabEdit.MovePoint,
      data
    );
  }

  /**
   * 获取命令描述
   * @returns 命令描述字符串
   */
  public getDescription(): string {
    return "楼板编辑移动点";
  }

  /**
   * 获取命令分类
   * @returns 命令分类枚举值
   */
  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.SlabEdit;
  }
}