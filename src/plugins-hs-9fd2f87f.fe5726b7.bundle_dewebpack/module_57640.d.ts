/**
 * 应用过门石到所有门的命令
 * 此命令将当前门的过门石材质应用到楼层平面图中的所有其他门
 */

import { HSCore } from '@/core/model';
import { HSApp } from '@/app';
import { HSFPConstants } from '@/constants';

/**
 * 门石应用选项
 */
interface DoorStoneApplyOptions {
  /** 过门石类型 */
  type: 'doorstone';
  /** 是否包含墙面面组 */
  includeWallFaceGroup: boolean;
  /** 是否包含地板组 */
  includeFloorGroup: boolean;
}

/**
 * 提示显示选项
 */
interface HintOptions {
  /** 是否可关闭 */
  canclose: boolean;
}

/**
 * 过门石应用到所有门命令类
 * 继承自复合命令基类，用于批量应用过门石材质
 * 
 * @example
 *