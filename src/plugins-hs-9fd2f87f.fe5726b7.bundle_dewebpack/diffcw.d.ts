/**
 * DiffCW模块 - 差异比较容器类
 * 
 * 该类用于管理差异路由（DiffRoutes）和差异管道（DiffTubes），
 * 继承自HSCore框架的Entity基类，提供差异数据的组织和管理功能。
 */

import { HSCore } from './hscore';
import { DiffCWRoute } from './diff-cw-route';

/**
 * 差异比较容器类
 * 
 * 用于管理和维护差异路由集合，支持添加新的差异管道，
 * 并自动过滤已存在的路由以避免重复。
 * 
 * @extends HSCore.Model.Entity
 * 
 * @example
 *