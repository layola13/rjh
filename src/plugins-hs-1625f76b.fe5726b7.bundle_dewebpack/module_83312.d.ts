/**
 * 模型对齐命令实现
 * @module AlignCommand
 */

import { Vector3 } from 'three';
import { HSCore } from '../core';
import { HSApp } from '../app';
import { HSConstants, HSFPConstants } from '../constants';

/**
 * 对齐处理策略接口
 */
interface AlignProcessStrategy {
  /** 策略优先级，数值越大优先级越高 */
  priority: number;
  
  /** 判断实体是否适用该策略 */
  condition: (entity: HSCore.Model.Entity) => boolean;
  
  /** 获取对齐处理请求列表 */
  getProcessRequests: (
    entity: HSCore.Model.Entity,
    benchmark: HSCore.Model.Entity,
    alignType: HSFPConstants.Align
  ) => HSCore.Transaction.Request[];
}

/**
 * 尺寸属性映射表
 */
interface SizePropertyMap extends Map<string, number> {
  get(key: 'width' | 'depth' | 'height'): number | undefined;
}

/**
 * 三维坐标点
 */
interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * 模型对齐命令类
 * 用于实现模型间的对齐操作，支持多种对齐方式和处理策略
 * @extends HSApp.Cmd.Implement.CmdBaseAlign
 */
export default class CmdModelAlign extends HSApp.Cmd.Implement.CmdBaseAlign {
  /** 信号钩子，用于监听状态栏事件 */
  private _signalHook?: HSCore.Util.SignalHook;
  
  /** 对齐处理策略列表 */
  private alignProcessStrategies: AlignProcessStrategy[] = [];
  
  /** 基准实体 */
  protected benchmarkEntity!: HSCore.Model.Entity;
  
  /** 选中的实体列表 */
  protected selected!: HSCore.Model.Entity[];
  
  /** 对齐类型 */
  protected alignType!: HSFPConstants.Align;

  /**
   * 构造函数
   * @param entity - 基准实体
   * @param selected - 选中的实体列表
   * @param alignType - 对齐类型
   */
  constructor(
    entity: HSCore.Model.Entity,
    selected: HSCore.Model.Entity[],
    alignType: HSFPConstants.Align
  ) {
    super(entity, selected, alignType);
  }

  /**
   * 执行命令时的初始化操作
   * 注册状态栏更新监听器
   */
  onExecute(): void {
    super.onExecute();
    
    const app = HSApp.App.getApp();
    const contextualToolsPlugin = app.pluginManager.getPlugin<HSApp.Plugin.ContextualTools>(
      HSFPConstants.PluginType.ContextualTools
    );
    
    this._signalHook = new HSCore.Util.SignalHook(this);
    this._signalHook.listen(
      contextualToolsPlugin.signalPopulateStatusBar,
      this.onPopulateStatusBar
    );
  }

  /**
   * 清理命令资源
   * 释放信号钩子
   */
  onCleanup(): void {
    super.onCleanup();
    this._signalHook?.dispose();
  }

  /**
   * 获取命令描述
   * @returns 命令描述文本
   */
  getDescription(): string {
    return '模型对齐';
  }

  /**
   * 获取命令分类
   * @returns 日志分组类型
   */
  getCategory(): HSFPConstants.LogGroupTypes {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }

  /**
   * 执行对齐操作
   * 根据基准实体对选中的实体进行对齐处理
   */
  protected _doAlign(): void {
    const benchmarkEntity = this.benchmarkEntity;
    
    // 过滤掉基准实体本身
    const targetEntities = this.selected.filter(
      entity => benchmarkEntity.ID !== entity.ID
    );
    
    if (targetEntities.length === 0) {
      return;
    }
    
    const app = HSApp.App.getApp();
    const transactionManager = app.transManager;
    const requests: HSCore.Transaction.Request[] = [];
    
    // 不可调整尺寸的对齐类型
    const sizeAlignTypes = [
      HSFPConstants.Align.AdaptFrontBack,
      HSFPConstants.Align.AdaptLeftRight,
      HSFPConstants.Align.AdaptBottomTop
    ];
    
    targetEntities.forEach(entity => {
      // 检查实体是否被锁定或冻结
      if (
        entity.isFlagOn(HSCore.Model.EntityFlagEnum.locked) ||
        entity.isFlagOn(HSCore.Model.EntityFlagEnum.freezed)
      ) {
        const entityName = entity.metadata.name;
        const message = `${entityName} ${ResourceManager.getString('content_locked_align_tip')}`;
        LiveHint.show(message, 3000, undefined, { canclose: true });
        return;
      }
      
      // 检查实体是否可缩放，或对齐类型是否需要缩放
      if (!entity.isScalable && sizeAlignTypes.includes(this.alignType)) {
        LiveHint.show(
          ResourceManager.getString('content_locked_size_align_tip'),
          3000,
          undefined,
          { canclose: true }
        );
        return;
      }
      
      // 查找适用的处理策略
      const applicableStrategies = this.alignProcessStrategies
        .filter(strategy => strategy.condition(entity))
        .sort((a, b) => b.priority - a.priority);
      
      if (applicableStrategies.length > 0) {
        const strategyRequests = applicableStrategies[0].getProcessRequests(
          entity,
          benchmarkEntity,
          this.alignType
        );
        requests.push(...strategyRequests);
      }
    });
    
    // 提交事务请求
    if (requests.length > 1) {
      const compositeRequest = transactionManager.createRequest(
        HSConstants.RequestType.Composite,
        [requests]
      );
      transactionManager.commitAsync(compositeRequest);
    } else if (requests.length === 1) {
      transactionManager.commitAsync(requests[0]);
    }
  }

  /**
   * 初始化对齐处理策略
   * 注册不同类型实体的对齐处理逻辑
   */
  protected initProcessStrategies(): void {
    // 3D模型类型（不适用普通内容对齐策略）
    const threeDModelClasses = [
      HSConstants.ModelClass.DAssembly,
      HSConstants.ModelClass.DExtruding,
      HSConstants.ModelClass.DContent,
      HSConstants.ModelClass.DMolding
    ];
    
    // 普通内容对齐策略
    this.alignProcessStrategies.push({
      priority: 1,
      condition: (entity: HSCore.Model.Entity) => {
        if (entity.Class === HSConstants.ModelClass.NgContent) {
          return true;
        }
        
        if (entity.Class === HSConstants.ModelClass.NgGroup) {
          // 检查组内是否不包含3D模型
          const has3DModel = entity.members.find(member =>
            threeDModelClasses.includes(member.Class)
          );
          return !has3DModel;
        }
        
        return false;
      },
      getProcessRequests: (
        entity: HSCore.Model.Entity,
        benchmark: HSCore.Model.Entity,
        alignType: HSFPConstants.Align
      ) => {
        return this._handleNormalContent(entity, benchmark, alignType);
      }
    });
  }

  /**
   * 处理普通内容的对齐
   * @param entity - 目标实体
   * @param benchmark - 基准实体
   * @param alignType - 对齐类型
   * @returns 事务请求列表
   */
  private _handleNormalContent(
    entity: HSCore.Model.Entity,
    benchmark: HSCore.Model.Entity,
    alignType: HSFPConstants.Align
  ): HSCore.Transaction.Request[] {
    const requests: HSCore.Transaction.Request[] = [];
    const transactionManager = HSApp.App.getApp().transManager;
    
    // 获取当前尺寸
    const currentSize = new Vector3(entity.XSize, entity.YSize, entity.ZSize);
    
    // 计算目标尺寸
    const sizePropertyMap = HSApp.Util.AlignUtil.adaptTo(
      benchmark,
      entity,
      alignType,
      true
    );
    const targetSize = this._getSizeFromPropertyMap(sizePropertyMap, entity);
    
    // 如果尺寸需要变化，创建调整尺寸请求
    if (!HSCore.Util.Math.isSamePoint3(currentSize, targetSize)) {
      const resizeRequest = transactionManager.createRequest(
        HSFPConstants.RequestType.ResizeContent,
        [entity, targetSize]
      );
      if (resizeRequest) {
        requests.push(resizeRequest);
      }
    }
    
    // 计算位置偏移
    const offset = HSApp.Util.AlignUtil.alignTo(
      benchmark,
      entity,
      alignType,
      targetSize
    );
    
    const currentPosition: Point3D = {
      x: entity.x,
      y: entity.y,
      z: entity.z
    };
    
    const targetPosition: Point3D = {
      x: currentPosition.x + offset.x,
      y: currentPosition.y + offset.y,
      z: currentPosition.z + offset.z
    };
    
    // 如果位置需要变化，创建移动请求
    if (!HSCore.Util.Math.isSamePoint3(targetPosition, currentPosition)) {
      const moveRequest = transactionManager.createRequest(
        HSFPConstants.RequestType.MoveContentRequest,
        [entity, currentPosition, targetPosition]
      );
      if (moveRequest) {
        requests.push(moveRequest);
      }
    }
    
    return requests;
  }

  /**
   * 从属性映射表中获取尺寸向量
   * @param propertyMap - 尺寸属性映射表
   * @param entity - 实体对象
   * @returns 尺寸向量
   */
  private _getSizeFromPropertyMap(
    propertyMap: SizePropertyMap,
    entity: HSCore.Model.Entity
  ): Vector3 {
    const size = new Vector3(entity.XSize, entity.YSize, entity.ZSize).clone();
    
    propertyMap.forEach((value, key) => {
      switch (key) {
        case 'width':
          size.x = value;
          break;
        case 'depth':
          size.y = value;
          break;
        case 'height':
          size.z = value;
          break;
      }
    });
    
    return size;
  }
}