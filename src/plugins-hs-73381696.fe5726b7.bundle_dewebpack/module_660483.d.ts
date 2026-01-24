/**
 * 墙面装饰线条（踢脚线/顶角线）操作模块
 * @module molding
 */

import { HSCore } from './core-types';
import { PropertyBarControlTypeEnum } from './property-bar-types';
import { CommandType, UIMode, PluginType } from './constants-types';

/**
 * 实体集合参数
 */
interface EntitiesParam {
  /** 选中的实体列表 */
  entities: HSCore.Model.BaseEntity[];
}

/**
 * 属性栏控制项基础接口
 */
interface BasePropertyBarItem {
  /** 控制项唯一标识 */
  id: string;
  /** 控制项类型 */
  type: PropertyBarControlTypeEnum;
  /** 显示标签 */
  label: string;
  /** 排序权重 */
  order: number;
  /** 适用的UI模式列表 */
  uiMode: UIMode[];
}

/**
 * 图片按钮控制项
 */
interface ImageButtonItem extends BasePropertyBarItem {
  type: PropertyBarControlTypeEnum.imageButton;
  /** 图标资源路径 */
  src: string;
  /** 是否禁用 */
  disable?: boolean;
  /** 点击回调 */
  onClick: () => void;
}

/**
 * 通用操作项（替换/复制/删除等）
 */
interface ActionItem {
  /** 操作标识 */
  id: string;
  /** 显示标签 */
  label: string;
  /** 图标资源 */
  icon?: string;
  /** 点击回调 */
  onClick: () => void;
}

/**
 * 属性栏控制项联合类型
 */
type PropertyBarItem = ImageButtonItem | ActionItem;

/**
 * 线条模块接口定义
 */
interface MoldingModule {
  /** 模块名称 */
  name: string;
  
  /**
   * 判断选中实体是否应用此模块
   * @param entities - 选中的实体列表
   * @returns 是否包含线条实体
   */
  isApplied(entities: HSCore.Model.BaseEntity[]): boolean;
  
  /**
   * 获取属性栏操作项列表
   * @param params - 包含选中实体的参数对象
   * @returns 属性栏控制项数组
   */
  getItems(params: EntitiesParam): PropertyBarItem[];
}

/**
 * 合并对象属性（支持Symbol键）
 * @param target - 目标对象
 * @param includeSymbols - 是否包含Symbol属性
 * @returns 所有属性键的数组
 */
function getAllPropertyKeys(target: object, includeSymbols: boolean): (string | symbol)[] {
  const keys: (string | symbol)[] = Object.keys(target);
  
  if (Object.getOwnPropertySymbols) {
    let symbols = Object.getOwnPropertySymbols(target);
    
    if (includeSymbols) {
      symbols = symbols.filter((symbol) => {
        const descriptor = Object.getOwnPropertyDescriptor(target, symbol);
        return descriptor?.enumerable ?? false;
      });
    }
    
    keys.push(...symbols);
  }
  
  return keys;
}

/**
 * 深度合并多个对象
 * @param target - 目标对象
 * @param sources - 源对象列表
 * @returns 合并后的对象
 */
function deepMerge<T extends object>(target: T, ...sources: Partial<T>[]): T {
  for (const source of sources) {
    if (source == null) continue;
    
    const ownKeys = getAllPropertyKeys(source, true);
    
    for (const key of ownKeys) {
      const descriptor = Object.getOwnPropertyDescriptor(source, key);
      if (descriptor) {
        Object.defineProperty(target, key, descriptor);
      }
    }
  }
  
  return target;
}

/**
 * 墙面线条装饰模块（踢脚线/顶角线）
 * 提供切割、连接、替换、复制、删除等操作
 */
export const molding: MoldingModule = {
  name: "molding",
  
  isApplied(entities: HSCore.Model.BaseEntity[]): boolean {
    return entities.some((entity) => entity instanceof HSCore.Model.Molding);
  },
  
  getItems(params: EntitiesParam): PropertyBarItem[] {
    const { entities } = params;
    const selectedEntity = entities[0];
    
    const app = HSApp.App.getApp();
    const commandManager = app.cmdManager;
    const additionalItems: PropertyBarItem[] = [];
    
    const parentWall = selectedEntity.parent;
    const masterWall = parentWall?.getMaster();
    
    // 仅为直墙上的踢脚线或顶角线提供切割/连接功能
    const isNotArcWall = !HSCore.Util.Wall.isArcWall(masterWall);
    const isMoldingType = 
      selectedEntity instanceof HSCore.Model.Baseboard || 
      selectedEntity instanceof HSCore.Model.Cornice;
    
    if (isNotArcWall && isMoldingType) {
      // 获取同类型、同位置的线条段
      const allMoldings = parentWall.getMolding(selectedEntity.type) ?? [];
      const currentTopoPather = selectedEntity.topoPathers[0];
      
      const sameSectionMoldings = allMoldings.filter((molding) => {
        if (molding.topoPathers.length === 0) return false;
        
        const topoPather = molding.topoPathers[0];
        return (
          topoPather.index === currentTopoPather.index &&
          topoPather.isAux === currentTopoPather.isAux
        );
      });
      
      // 切割线条按钮
      additionalItems.push({
        id: "splitMoldingButton",
        type: PropertyBarControlTypeEnum.imageButton,
        label: ResourceManager.getString("plugin_leftmenu_molding_cut"),
        src: SvgMap.splitMolding,
        order: 101,
        uiMode: [HSFPConstants.UIMode.layoutDesignMode],
        onClick: () => {
          // 切换到3D视图
          if (!app.is3DViewActive()) {
            app.switchPrimaryViewMode(HSApp.View.ViewModeEnum.OrbitView, {});
          }
          
          const cutCommand = commandManager.createCommand(
            HSFPConstants.CommandType.CutMolding,
            [selectedEntity]
          );
          commandManager.execute(cutCommand);
        }
      });
      
      // 连接线条按钮（需要至少2段才能连接）
      additionalItems.push({
        id: "connectMoldingButton",
        type: PropertyBarControlTypeEnum.imageButton,
        label: ResourceManager.getString("plugin_leftmenu_molding_connect"),
        src: SvgMap.connectMolding,
        disable: sameSectionMoldings.length < 2,
        order: 102,
        uiMode: [HSFPConstants.UIMode.layoutDesignMode],
        onClick: () => {
          // 切换到3D视图
          if (!app.is3DViewActive()) {
            app.switchPrimaryViewMode(HSApp.View.ViewModeEnum.OrbitView, {});
          }
          
          const connectCommand = commandManager.createCommand(
            HSFPConstants.CommandType.ConnectMolding,
            [selectedEntity]
          );
          commandManager.execute(connectCommand);
        }
      });
    }
    
    // 替换操作项
    const replaceItem: ActionItem = deepMerge(
      { ...replace },
      {
        onClick: () => {
          const wallDecorationPlugin = app.pluginManager.getPlugin(
            HSFPConstants.PluginType.WallDecoration
          );
          wallDecorationPlugin.handler.changeWallMoldingType(selectedEntity);
        }
      }
    );
    
    // 复制操作项
    const duplicateItem: ActionItem = deepMerge(
      { ...duplicate },
      {
        onClick: () => {
          Utils.showDuplicateTip();
          
          const wallDecorationPlugin = app.pluginManager.getPlugin(
            HSFPConstants.PluginType.WallDecoration
          );
          wallDecorationPlugin.handler.copyMolding(entities[0]);
        }
      }
    );
    
    // 删除操作项
    const deleteItem = getDeleteItem(params);
    
    return [replaceItem, ...additionalItems, duplicateItem, deleteItem];
  }
};