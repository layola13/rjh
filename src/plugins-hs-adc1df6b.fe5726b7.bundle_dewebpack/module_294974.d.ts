/**
 * 参数化开窗材质编辑的事务请求类
 * 用于处理参数化窗户的材质开关操作，包括分面开关和AB面材质开关
 */

import { HSCore } from 'hscore';

/**
 * 参数化开窗属性编辑操作类型
 */
export enum IPropertybarEditParametricopeingHoldAction {
  /** 分面开关 */
  SplitFaceSwitch = 'splitFaceSwitch',
  /** A面材质开关 */
  AFaceMaterialSwitch = 'aFaceMaterialSwitch',
  /** B面材质开关 */
  BFaceMaterialSwitch = 'bFaceMaterialSwitch'
}

/**
 * 参数化开窗对象接口
 * 定义参数化窗户的核心属性和方法
 */
export interface IParametricOpening {
  /** 唯一标识ID */
  seekId: string;
  
  /** 显示名称 */
  displayName: string;
  
  /** 是否启用分面 */
  isSplitFace: boolean;
  
  /** A面材质开关状态 */
  aFaceMaterialSwitch: boolean;
  
  /** B面材质开关状态 */
  bFaceMaterialSwitch: boolean;
  
  /** 构建几何体 */
  build(): void;
  
  /** 标记几何体需要更新 */
  dirtyGeometry(): void;
}

/**
 * 接收消息的值对象
 */
export interface IReceiveValue {
  /** 开关值 */
  value: boolean;
}

/**
 * 操作日志参数接口
 */
export interface ILogParams {
  /** 当前激活的面板 */
  activeSection: string;
  
  /** 激活面板的名称 */
  activeSectionName: string;
  
  /** 点击率统计信息 */
  clicksRatio: {
    /** 对象ID */
    id: string;
    /** 对象名称 */
    name: string;
  };
}

/**
 * 应用信号接口
 */
interface IAppSignal {
  /** 自定义功能启动信号 */
  signalCustomFunctionStart?: {
    dispatch(params: { key: string }): void;
  };
}

/**
 * 应用对象接口
 */
interface IApp {
  /** 获取应用实例 */
  getApp(): IAppSignal | null | undefined;
}

/**
 * 全局HSApp对象
 */
declare global {
  const HSApp: {
    App: IApp;
  };
  
  const HSFPConstants: {
    LogGroupTypes: {
      /** 内容操作日志类型 */
      ContentOperation: string;
    };
  };
}

/**
 * 参数化开窗材质编辑事务请求类
 * 继承自HSCore的事务请求基类，实现参数化窗户的材质编辑操作
 * 
 * @extends {HSCore.Transaction.Request}
 * 
 * @example
 *