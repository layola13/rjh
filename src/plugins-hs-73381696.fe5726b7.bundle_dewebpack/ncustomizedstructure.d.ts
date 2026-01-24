/**
 * 定制化结构模块
 * 提供墙体、开口、洞口和参数化开口的右键菜单配置
 */

import { HSCore } from 'HSCore';
import { PropertyBarControlTypeEnum } from './PropertyBarControlTypes';
import { SvgMap } from './SvgMap';
import { MenuBuilder } from './MenuBuilder';

// ==================== 类型定义 ====================

/**
 * 菜单项配置
 */
interface MenuItem {
  /** 菜单项唯一标识 */
  id: string;
  /** 控件类型 */
  type?: PropertyBarControlTypeEnum;
  /** 显示顺序 */
  order?: number;
  /** 图标路径 */
  src?: string;
  /** 显示文本 */
  label: string;
  /** 点击后是否隐藏菜单 */
  hideAfterClick?: boolean;
  /** 状态更新函数 */
  stateReducer?: (currentState: MenuItem) => MenuItem;
  /** 点击事件处理 */
  onClick: () => void;
}

/**
 * 实体选择上下文
 */
interface EntityContext {
  /** 选中的实体列表 */
  entities: HSCore.Model.Entity[];
  /** 是否在3D视图 */
  is3D: boolean;
  /** 应用实例 */
  app: HSApp.App;
}

/**
 * 菜单配置接口
 */
interface MenuConfig {
  /** 配置名称 */
  name: string;
  /** 判断配置是否适用于给定实体 */
  isApplied: (entities: HSCore.Model.Entity[]) => boolean;
  /** 获取菜单项列表 */
  getItems: (context: EntityContext) => MenuItem[];
}

// ==================== 常量定义 ====================

/** 右键菜单显示时长 */
const HINT_DISPLAY_DURATION = 3000;

/**
 * 替换材质按钮配置
 */
const REPLACE_MATERIAL_BUTTON: MenuItem = {
  id: 'replacematerial',
  type: PropertyBarControlTypeEnum.imageButton,
  order: 103,
  src: SvgMap.replaceMaterial,
  label: ResourceManager.getString('mixpaint_replace_material'),
  onClick: (): void => {
    const app = HSApp.App.getApp();
    const environmentId = app.activeEnvironmentId;
    const tracker = HSApp.Util.EventTrack.instance();
    const viewType = app.is3DViewActive() ? '3D' : '2D';

    tracker.track(
      HSApp.Util.EventGroupEnum.Rightmenu,
      'mixpaint_replace_material_event',
      {
        IF_env: environmentId,
        viewType: viewType,
      }
    );

    const wallDecorationPlugin = app.pluginManager.getPlugin(
      HSFPConstants.PluginType.WallDecoration
    );
    wallDecorationPlugin.handler.handleWallPaper();
  },
};

// ==================== 辅助函数 ====================

/**
 * 合并对象属性（类似Object.assign）
 * @param target - 目标对象
 * @param sources - 源对象列表
 * @returns 合并后的对象
 */
function mergeObjects<T extends Record<string, unknown>>(
  target: T,
  ...sources: Partial<T>[]
): T {
  const result = { ...target };

  for (const source of sources) {
    if (source == null) continue;

    // 合并自有可枚举属性
    Object.keys(source).forEach((key) => {
      const typedKey = key as keyof T;
      result[typedKey] = source[typedKey] as T[keyof T];
    });

    // 合并Symbol属性
    const symbols = Object.getOwnPropertySymbols(source);
    symbols
      .filter((sym) => Object.getOwnPropertyDescriptor(source, sym)?.enumerable)
      .forEach((sym) => {
        (result as unknown as Record<symbol, unknown>)[sym] = (
          source as Record<symbol, unknown>
        )[sym];
      });
  }

  return result;
}

// ==================== 菜单配置导出 ====================

/**
 * 墙体菜单配置
 */
export const wall: MenuConfig = {
  name: 'wall',

  isApplied(entities: HSCore.Model.Entity[]): boolean {
    return entities.some((entity) => entity instanceof HSCore.Model.Wall);
  },

  getItems(context: EntityContext): MenuItem[] {
    const { entities, app } = context;
    const items: MenuItem[] = [getDeleteItem(context)];

    // 多选时不显示隐藏选项
    if (entities.length > 1) {
      return items;
    }

    // 添加隐藏墙体功能
    items.push(
      mergeObjects(getHideItem(context), {
        onClick: (): void => {
          const entitiesToHide: HSCore.Model.Entity[] = [];

          entities.forEach((entity) => {
            if (HSApp.Util.Content.canHide(entity)) {
              const hideRelatedEntities = HSApp.Util.Content.getHideWallEntitys(entity);
              entitiesToHide.push(...hideRelatedEntities, entity);
            } else {
              LiveHint.show(
                ResourceManager.getString('plugin_leftmenu_hide_wall'),
                HINT_DISPLAY_DURATION,
                null,
                {
                  status: LiveHint.statusEnum.warning,
                  canclose: true,
                }
              );
            }
          });

          const cmdManager = app.cmdManager;
          const hideCommand = cmdManager.createCommand(
            HSFPConstants.CommandType.DisplayContents,
            [entitiesToHide, false]
          );
          cmdManager.execute(hideCommand);
          cmdManager.complete(hideCommand);
        },
      })
    );

    return items;
  },
};

/**
 * 开口（门窗）菜单配置
 */
export const opening: MenuConfig = {
  name: 'opening',

  isApplied(entities: HSCore.Model.Entity[]): boolean {
    return entities.some((entity) => entity instanceof HSCore.Model.Opening);
  },

  getItems(context: EntityContext): MenuItem[] {
    const { entities, is3D, app } = context;
    const items: MenuItem[] = [getDeleteItem(context), getLockItem(context)];

    if (entities.length > 1) {
      return items;
    }

    const selectedOpening = entities[0];

    // 添加基础操作项
    items.push(
      getReplaceItem(context),
      getDuplicateItem(context),
      mergeObjects(flip, {
        onClick: (): void => {
          const cmdManager = app.cmdManager;
          const flipCommand = cmdManager.createCommand(
            HSFPConstants.CommandType.FlipOpening,
            [selectedOpening]
          );
          cmdManager.execute(flipCommand);
        },
      }),
      getFavoriteItem(context)
    );

    // 添加属性样式功能
    items.push({
      label: ResourceManager.getString('plugin_contentstyler_attibutes'),
      id: 'applystyle',
      src: SvgMap.copy_attribute,
      order: 141,
      onClick: (): void => {
        const stylerPlugin = app.pluginManager.getPlugin(
          HSFPConstants.PluginType.ContentStyler
        );
        stylerPlugin?.startStyler(selectedOpening);
      },
    });

    // 3D视图下添加额外功能
    if (is3D) {
      items.push(REPLACE_MATERIAL_BUTTON);

      // 门开关功能
      if (
        selectedOpening instanceof HSCore.Model.Door &&
        selectedOpening.metadata.extension?.objInfo?.axis
      ) {
        let isOpened = selectedOpening.isOpened;
        const getLabel = (opened: boolean): string =>
          ResourceManager.getString(
            opened ? 'plugin_opendoor_close' : 'plugin_opendoor_open'
          );
        const getIcon = (opened: boolean): string =>
          opened ? SvgMap.door_close : SvgMap.door_open;

        items.push({
          label: getLabel(isOpened),
          id: 'openDoor',
          src: getIcon(isOpened),
          order: 106,
          hideAfterClick: false,
          stateReducer: (currentState: MenuItem): MenuItem =>
            mergeObjects(currentState, {
              label: getLabel(isOpened),
              src: getIcon(isOpened),
            }),
          onClick: (): void => {
            const openDoorPlugin = app.pluginManager.getPlugin(
              HSFPConstants.PluginType.OpenDoor
            );
            if (!openDoorPlugin) return;

            if (isOpened) {
              openDoorPlugin.onCloseDoor(selectedOpening);
              isOpened = false;
            } else {
              openDoorPlugin.onOpenDoor(selectedOpening);
              isOpened = true;
            }
          },
        });
      }
    }

    return items;
  },
};

/**
 * 洞口菜单配置
 */
export const hole: MenuConfig = {
  name: 'hole',

  isApplied(entities: HSCore.Model.Entity[]): boolean {
    return entities.some((entity) => entity instanceof HSCore.Model.Hole);
  },

  getItems(context: EntityContext): MenuItem[] {
    const { entities, is3D } = context;
    const items: MenuItem[] = [getDeleteItem(context), getLockItem(context)];

    if (entities.length > 1) {
      return items;
    }

    items.push(getDuplicateItem(context), getReplaceItem(context));

    if (is3D) {
      items.push(REPLACE_MATERIAL_BUTTON);
    }

    return items;
  },
};

/**
 * 参数化开口菜单配置
 */
export const parametricOpening: MenuConfig = {
  name: 'parametricOpening',

  isApplied(entities: HSCore.Model.Entity[]): boolean {
    return entities.some(
      (entity) => entity instanceof HSCore.Model.ParametricOpening
    );
  },

  getItems(context: EntityContext): MenuItem[] {
    const { entities, is3D, app } = context;
    const items: MenuItem[] = [
      getDuplicateItem(context),
      getLockItem(context),
    ];

    if (entities.length > 1) {
      return items;
    }

    const selectedEntity = entities[0];

    // 添加智能替换功能
    items.push(
      mergeObjects(getReplaceItem(context), {
        onClick: (): void => {
          const entity = entities[0];
          const replaceOptions: Record<string, unknown> = {};

          // 企业模型特殊处理
          if (entity.metadata.isFromEnterprise) {
            Object.assign(replaceOptions, {
              parentModelId: entity.metadata.aliModelId,
              eId: entity.eId,
              sceneType: 'hardcover_params_backdrop_product',
              categoryIds: [entity.metadata.categories[0]],
              customizedTabs: MenuBuilder.getInstance().getEnterpriseTabData(entity),
            });
          }

          const cmdManager = app.cmdManager;

          const executeReplace = (): void => {
            const replaceCommand = cmdManager.createCommand(
              HSFPConstants.CommandType.SmartReplaceContent,
              [entity, replaceOptions]
            );
            cmdManager.execute(replaceCommand);
          };

          // 检查是否需要断开面组连接
          const needsDisconnect =
            HSApp.PaintPluginHelper.Util.MixPaintUtil.disconnectFaceGroupWithPrompt(
              [entity],
              undefined,
              executeReplace
            );

          if (!needsDisconnect) {
            executeReplace();
          }
        },
      }),
      getDeleteItem(context),
      getFavoriteItem(context)
    );

    // 参数化门添加翻转功能（排除参数化窗）
    if (
      selectedEntity instanceof HSCore.Model.ParametricDoor &&
      !HSCore.Util.Content.isParametricWindow(selectedEntity?.metadata)
    ) {
      items.push(
        mergeObjects(flip, {
          onClick: (): void => {
            const cmdManager = app.cmdManager;
            const flipCommand = cmdManager.createCommand(
              HSFPConstants.CommandType.FlipOpening,
              [selectedEntity]
            );
            cmdManager.execute(flipCommand);
          },
        })
      );
    }

    // 3D视图额外功能
    if (is3D) {
      items.push(REPLACE_MATERIAL_BUTTON);

      // 子开口不显示菜单
      if (
        selectedEntity.getUniqueParent() instanceof HSCore.Model.ParametricOpening
      ) {
        return [];
      }
    }

    return items;
  },
};

/**
 * N定制结构菜单配置
 */
export const NCustomizedStructure: MenuConfig = {
  name: 'NCustomizedStructure',

  isApplied(entities: HSCore.Model.Entity[]): boolean {
    return entities.some(
      (entity) =>
        entity instanceof HSCore.Model.NCustomizedBeam ||
        entity instanceof HSCore.Model.NCustomizedStructure
    );
  },

  getItems(context: EntityContext): MenuItem[] {
    const { is3D, app, entities } = context;
    const items: MenuItem[] = [getLockItem(context), getDeleteItem(context)];

    const CUSTOMIZED_ENVIRONMENTS = [
      HSFPConstants.Environment.NCustomizedCeilingModel,
      HSFPConstants.Environment.NCustomizedBackgroundWall,
      HSFPConstants.Environment.NCustomizedPlatform,
    ];

    // 非定制环境添加复制功能
    if (!CUSTOMIZED_ENVIRONMENTS.includes(app.activeEnvironmentId)) {
      items.unshift(
        mergeObjects(duplicate, {
          onClick: (): void => {
            // 根据实体类型切换视图
            const isBeam = entities.every(
              (entity) => entity instanceof HSCore.Model.NCustomizedBeam
            );
            const targetViewMode = isBeam
              ? HSApp.View.ViewModeEnum.RCP
              : HSApp.View.ViewModeEnum.Plane;

            HSApp.App.getApp().switchPrimaryViewMode(targetViewMode, {});

            const cmdManager = app.cmdManager;
            const duplicateCommand = cmdManager.createCommand(
              HSFPConstants.CommandType.Duplicate,
              [{}]
            );
            cmdManager.execute(duplicateCommand);
          },
        })
      );
    }

    // 3D视图处理
    if (is3D) {
      // 插座不显示替换材质
      const hasOutlet = entities.some(
        (entity) => entity instanceof HSCore.Model.NCustomizedOutlet
      );
      if (hasOutlet) {
        return items;
      }

      items.push(REPLACE_MATERIAL_BUTTON);
    }

    return items;
  },
};

// ==================== 引用的外部菜单项（需在其他模块定义）====================

/**
 * 获取删除菜单项
 */
declare function getDeleteItem(context: EntityContext): MenuItem;

/**
 * 获取锁定菜单项
 */
declare function getLockItem(context: EntityContext): MenuItem;

/**
 * 获取隐藏菜单项
 */
declare function getHideItem(context: EntityContext): MenuItem;

/**
 * 获取替换菜单项
 */
declare function getReplaceItem(context: EntityContext): MenuItem;

/**
 * 获取复制菜单项
 */
declare function getDuplicateItem(context: EntityContext): MenuItem;

/**
 * 获取收藏菜单项
 */
declare function getFavoriteItem(context: EntityContext): MenuItem;

/**
 * 翻转菜单项基础配置
 */
declare const flip: Partial<MenuItem>;

/**
 * 复制菜单项基础配置
 */
declare const duplicate: Partial<MenuItem>;