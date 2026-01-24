import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

/**
 * 清除楼板绘制辅助线命令
 * 
 * 该命令用于在楼板编辑模式下清空所有辅助线。
 * 继承自 CmdClearExGuideLines，提供删除辅助线的请求创建和日志记录功能。
 * 
 * @module CmdClearGuideLines
 */
export declare class CmdClearGuideLines extends HSApp.ExtraordinarySketch2d.Cmd.CmdClearExGuideLines {
    /**
     * 创建清除辅助线的请求
     * 
     * @param guideLineData - 待删除的辅助线数据
     * @returns 返回事务管理器创建的删除辅助线请求对象
     * @protected
     */
    protected _createRequest(guideLineData: unknown): unknown;

    /**
     * 获取命令描述
     * 
     * @returns 返回命令的中文描述："楼板编辑清空辅助线"
     */
    getDescription(): string;

    /**
     * 获取命令所属的日志分类
     * 
     * @returns 返回楼板绘制日志组类型常量
     */
    getCategory(): HSFPConstants.LogGroupTypes;
}