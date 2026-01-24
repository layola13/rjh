/**
 * 删除楼板轮廓点请求
 * 用于处理删除楼板端点的事务操作
 * @module DeleteSlabProfilePointRequest
 * @original-id 836141
 */

import { StateRequest } from 'HSCore/Transaction/Common/StateRequest';
import { Util } from '@/utils/81274';

/**
 * 日志组类型枚举
 */
declare const HSFPConstants: {
  LogGroupTypes: {
    SlabOperation: string;
  };
};

/**
 * 核心工具类声明
 */
declare const HSCore: {
  Util: {
    TgSlab: {
      /**
       * 更新图层楼板面
       * @param layer - 楼板图层对象
       */
      updateLayerSlabFaces(layer: SlabLayer): void;
    };
  };
  Transaction: {
    Common: {
      StateRequest: typeof StateRequest;
    };
  };
};

/**
 * 楼板图层接口
 */
export interface SlabLayer {
  /** 图层ID */
  id: string;
  /** 图层名称 */
  name?: string;
  /** 楼板数据 */
  slabData?: unknown;
}

/**
 * 顶点接口
 */
export interface Vertex {
  /** X坐标 */
  x: number;
  /** Y坐标 */
  y: number;
  /** Z坐标（可选） */
  z?: number;
  /** 顶点ID */
  id?: string;
}

/**
 * 当前参数接口
 */
export interface CurrentParams {
  /** 活动区域标识 */
  activeSection: string;
  /** 点击率统计信息 */
  clicksRatio: {
    /** 操作ID */
    id: string;
    /** 操作名称 */
    name: string;
  };
}

/**
 * 删除楼板轮廓点请求类
 * 继承自StateRequest，用于处理删除楼板端点的事务操作
 * 
 * @example
 *