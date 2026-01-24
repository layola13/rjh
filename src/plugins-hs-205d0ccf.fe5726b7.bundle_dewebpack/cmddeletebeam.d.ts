/**
 * 梁删除命令模块
 * 
 * 该模块提供了删除建筑梁（Beam）及其关联内容的命令实现。
 * 当删除梁时，会自动处理依附在梁上的各种建筑元素（如开口、墙板等）。
 */

import { HSCore } from '@/types/core';

/**
 * 梁上关联内容的分类结果
 */
interface RelatedContents {
  /** 需要重新分配到其他梁的内容（如墙体、地板等独立元素） */
  toBeReassign: HSCore.Model.Content[];
  
  /** 需要随梁一起删除的内容（如开口、自定义模型、墙板等依附元素） */
  toBeRemoved: HSCore.Model.Content[];
}

/**
 * 删除梁命令类
 * 
 * 该命令负责删除指定的建筑梁，并智能处理梁上的所有关联内容：
 * - 对于依附性元素（开口、角窗、墙板等）：随梁一起删除
 * - 对于独立元素（普通墙体内容等）：重新分配到其他梁或保留
 * 
 * @extends HSApp.Cmd.Command 基础命令类
 * 
 * @example
 *