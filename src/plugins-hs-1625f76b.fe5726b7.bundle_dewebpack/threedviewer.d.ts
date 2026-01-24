/**
 * 3D模型查看器组件
 * 用于展示AI建模任务的三维模型预览
 * @module ThreeDViewer
 */

import React, { useState, useEffect, useRef } from 'react';

/**
 * 组件属性接口
 */
interface ThreeDViewerProps {
  /** 关闭查看器的回调函数 */
  close: () => void;
  /** 任务ID，用于加载特定的3D模型 */
  taskId?: string;
  /** 作业ID，当taskId未提供时用于查询任务信息 */
  jid?: string;
}

/**
 * 窗口消息事件数据接口
 */
interface MessageEventData {
  /** 事件类型标识 */
  eType: string;
  [key: string]: unknown;
}

/**
 * AI建模调度查询响应接口
 */
interface AiModelerScheduleResponse {
  /** 任务ID */
  taskId: string;
}

/**
 * 基础API管理器接口
 */
interface BaseApiManager {
  dataManager: {
    /** 查询AI建模任务调度信息 */
    queryAiModelerSchedule(params: { jid: string }): Promise<AiModelerScheduleResponse>;
  };
}

/**
 * 全局HSApp配置接口
 */
declare global {
  const HSApp: {
    Config: {
      /** EZHome服务主机地址 */
      EZHOME_HOST: string;
    };
    Catalog: {
      BaseApiManager: {
        /** 获取API管理器单例 */
        getInstance(): BaseApiManager;
      };
    };
  };
}

/**
 * 3D模型查看器组件
 * 
 * 功能说明：
 * - 通过iframe嵌入3D模型查看器页面
 * - 支持通过taskId直接加载或通过jid查询后加载
 * - 监听iframe内的关闭消息事件
 * 
 * @param props - 组件属性
 * @returns React元素
 * 
 * @example
 *