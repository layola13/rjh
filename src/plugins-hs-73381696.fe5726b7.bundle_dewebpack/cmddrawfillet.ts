import { DrawFilletGizmo } from './DrawFilletGizmo';
import { HSApp } from './HSApp';

/**
 * 楼板编辑倒角命令
 * 继承自通用的2D草图倒角命令
 */
export class CmdDrawFillet extends HSApp.ExtraordinarySketch2d.Cmd.CmdDrawFillet {
  /**
   * 创建2D倒角操作的图形控件
   * @param params - 包含上下文、显示图层等参数
   * @returns 倒角绘制图形控件实例
   */
  protected _create2DGizmo(params: {
    context: unknown;
    displayLayers: { temp: unknown };
  }): DrawFilletGizmo {
    return new DrawFilletGizmo(
      params.context,
      params.displayLayers.temp,
      this,
      this._sketchBuilder
    );
  }

  /**
   * 创建倒角编辑请求
   * @param param1 - 第一个参数
   * @param param2 - 第二个参数
   * @returns 事务请求对象
   */
  protected _createRequest(param1: unknown, param2: unknown): unknown {
    return this.context.transManager.createRequest(
      HSFPConstants.RequestType.SlabEdit.DrawFillet,
      [this._sketchBuilder, param1, param2]
    );
  }

  /**
   * 获取命令描述
   * @returns 命令的中文描述
   */
  public getDescription(): string {
    return '楼板编辑倒角';
  }

  /**
   * 获取命令所属分类
   * @returns 日志分组类型
   */
  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.SlabEdit;
  }
}