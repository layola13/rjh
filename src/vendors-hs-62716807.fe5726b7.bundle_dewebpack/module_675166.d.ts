/**
 * 数据上报模块
 * 使用 Beacon API 发送监控数据到服务器
 */

import { serialize, warn } from './module_595956';

/**
 * 发送监控数据到指定的端点
 * 优先使用 navigator.sendBeacon API 进行数据上报，如果不支持则输出警告
 * 
 * @param data - 要发送的数据，可以是对象（会被序列化）或字符串
 * @param endpoint - 上报的目标端点 URL
 * 
 * @example
 *