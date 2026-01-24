/**
 * 添加辅助线请求模块
 * 
 * 该模块导出一个扩展自基础 AddGuideLineRequest 的类，
 * 用于在 2D 草图中添加辅助线的请求处理。
 * 
 * @module AddGuideLineRequest
 * @originalId 45399
 */

import { HSApp } from './HSApp';

/**
 * 添加辅助线请求类
 * 
 * 继承自 HSApp.ExtraordinarySketch2d.Request.AddGuideLineRequest，
 * 用于封装在特殊 2D 草图环境中添加辅助线的请求逻辑。
 * 
 * @class AddGuideLineRequest
 * @extends {HSApp.ExtraordinarySketch2d.Request.AddGuideLineRequest}
 * 
 * @example
 *