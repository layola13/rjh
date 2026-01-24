/**
 * Module: MoveCurveRequest
 * 
 * 扩展移动曲线请求类，用于处理特定拓扑类型的曲线移动操作。
 * 该类继承自 HSApp.ExtraordinarySketch2d.Request.MoveCurveRequest，
 * 并针对楼板洞口(slabhole)场景提供专用过滤逻辑。
 */

import { HSApp } from './HSAppTypes'; // 假设HSApp类型定义在此模块

/**
 * 移动曲线请求类
 * 
 * 用于处理2D草图中曲线移动操作的请求类，
 * 特化用于楼板洞口拓扑过滤。
 * 
 * @extends {HSApp.ExtraordinarySketch2d.Request.MoveCurveRequest}
 */
export declare class MoveCurveRequest extends HSApp.ExtraordinarySketch2d.Request.MoveCurveRequest {
    /**
     * 构造函数
     * 创建一个新的移动曲线请求实例
     */
    constructor();

    /**
     * 获取面拓扑标签过滤器
     * 
     * 返回用于过滤面拓扑元素的标签字符串。
     * 在本实现中，专门用于识别和处理楼板洞口(slab hole)类型的拓扑。
     * 
     * @returns {string} 拓扑过滤标签 "slabhole"
     */
    getFilterFaceTopoTag(): string;
}