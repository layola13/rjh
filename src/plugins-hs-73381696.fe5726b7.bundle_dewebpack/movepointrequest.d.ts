import { HSApp } from './HSApp';

/**
 * 移动点请求类
 * 
 * 该类扩展了HSApp的ExtraordinarySketch2d移动点请求功能，
 * 用于处理板洞(slabhole)的移动点操作。
 * 
 * @extends {HSApp.ExtraordinarySketch2d.Request.MovePointRequest}
 */
export declare class MovePointRequest extends HSApp.ExtraordinarySketch2d.Request.MovePointRequest {
    /**
     * 构造函数
     * 创建一个新的MovePointRequest实例
     */
    constructor();

    /**
     * 获取面拓扑标签过滤器
     * 
     * 返回用于过滤特定面拓扑类型的标签字符串。
     * 此方法指定该请求仅应用于"slabhole"（板洞）类型的面。
     * 
     * @returns {string} 返回拓扑标签 "slabhole"
     */
    getFilterFaceTopoTag(): string;
}