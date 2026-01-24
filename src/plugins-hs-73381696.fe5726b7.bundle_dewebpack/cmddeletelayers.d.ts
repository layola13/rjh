/**
 * 命令：删除图层
 * 用于删除场景中除根层外的所有自定义图层
 */

import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

/**
 * 删除图层命令类
 * 继承自基础命令类，用于批量删除场景中的非系统图层
 */
export class CmdDeleteLayers extends HSApp.Cmd.Command {
  /**
   * 事务管理器实例
   * 用于管理图层删除操作的事务
   */
  private transMgr: HSApp.TransactionManager;

  /**
   * 构造函数
   * 初始化命令并获取事务管理器实例
   */
  constructor() {
    super();
    this.transMgr = HSApp.App.getApp().transManager;
  }

  /**
   * 执行命令
   * 遍历场景中的所有图层，删除非系统图层（保留室外层和天花板层）
   * @override
   */
  onExecute(): void {
    const session = this.transMgr.startSession();
    const floorplan = HSApp.App.getApp().floorplan;
    const outdoorLayer = floorplan.scene.outdoorLayer;
    const ceilingLayer = floorplan.scene.ceilingLayer;

    floorplan.scene.forEachLayer((layer: HSApp.Layer) => {
      // 跳过室外层、天花板层和根图层
      if (
        layer !== outdoorLayer &&
        layer !== ceilingLayer &&
        !HSApp.Util.Layer.isRootLayer(layer)
      ) {
        const deleteRequest = this.transMgr.createRequest(
          HSFPConstants.RequestType.DeleteLayer,
          [layer]
        );
        this.transMgr.commit(deleteRequest);
      }
    });

    session.commit();
  }

  /**
   * 获取命令描述
   * @returns 命令的中文描述信息
   * @override
   */
  getDescription(): string {
    return '多层操作-删除所有非1层';
  }

  /**
   * 是否为交互式命令
   * @returns false 表示该命令无需用户交互
   * @override
   */
  isInteractive(): boolean {
    return false;
  }

  /**
   * 获取命令所属分类
   * @returns 图层操作分类标识
   * @override
   */
  getCategory(): HSFPConstants.LogGroupTypes {
    return HSFPConstants.LogGroupTypes.LayerOperation;
  }
}