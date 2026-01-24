import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

declare namespace CmdClearGuideLines {
  /**
   * 楼板编辑清空辅助线命令
   * @extends HSApp.ExtraordinarySketch2d.Cmd.CmdClearExGuideLines
   * @description 用于清除楼板编辑模式下的所有辅助线
   */
  export class CmdClearGuideLines extends HSApp.ExtraordinarySketch2d.Cmd.CmdClearExGuideLines {
    /**
     * 创建删除辅助线的请求
     * @param guideLineData - 辅助线数据
     * @returns 事务管理器创建的请求对象
     * @internal
     */
    protected _createRequest(guideLineData: unknown): unknown;

    /**
     * 获取命令描述
     * @returns 命令的中文描述信息
     */
    getDescription(): string;

    /**
     * 获取命令所属分类
     * @returns 日志分组类型 - 楼板编辑类别
     */
    getCategory(): HSFPConstants.LogGroupTypes.SlabEdit;

    /**
     * 上下文对象，包含事务管理器
     * @internal
     */
    protected readonly context: {
      transManager: {
        /**
         * 创建请求
         * @param requestType - 请求类型
         * @param params - 请求参数数组
         */
        createRequest(
          requestType: HSFPConstants.RequestType.SlabEdit.DeleteGuideLine,
          params: [sketch2dBuilder: unknown, guideLineData: unknown]
        ): unknown;
      };
    };

    /**
     * Sketch2D构建器实例
     * @internal
     */
    protected readonly sketch2dBuilder: unknown;
  }
}

export = CmdClearGuideLines;