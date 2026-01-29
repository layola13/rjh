import React from 'react';
import { HSCore } from '../core';

/**
 * 户型详情项数据接口
 * 描述单个户型方案的完整信息
 */
interface FloorplanDetailItem {
  /** 设计唯一标识符 */
  hs_design_id: string;
  
  /** 户型图片URL */
  imageUrl: string;
  
  /** 小区名称 */
  neighbor: string;
  
  /** 城市名称 */
  cityName: string;
  
  /** 行政区名称 */
  districtName: string;
  
  /** 建筑面积（平方米） */
  grossAreaNum: number;
  
  /** 套内面积（平方米） */
  areaNum: number;
  
  /** 卧室数量 */
  bedroomNum: number;
  
  /** 客厅数量 */
  livingroomNum: number;
  
  /** 卫生间数量 */
  bathroomNum: number;
}

/**
 * 户型详情视图组件的 Props
 */
interface FloorplanDetailViewProps {
  /** 要展示的户型详情数据 */
  item: FloorplanDetailItem;
}

/**
 * 户型详情视图组件
 * 
 * 功能：
 * - 展示户型的详细信息（面积、户型、位置等）
 * - 提供"开始设计"功能，可基于选中的户型开始新设计
 * - 处理用户登录状态验证
 * - 管理设计元数据的保存与清理
 * 
 * @example
 *