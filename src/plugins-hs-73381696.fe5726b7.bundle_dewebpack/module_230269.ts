import { ILeftMenuItem, SvgMap } from './types';
import { HSCore } from './core';
import { Utils } from './utils';
import * as EventHandlers from './event-handlers';

// Menu item definitions
export const replace: ILeftMenuItem = {
  label: "group_contextmenu_replace_title",
  id: "replace",
  src: SvgMap.replace,
  order: 100,
  hotkey: {
    win: "x",
    mac: "x"
  },
  registerHotkey: true
};

export const flip: ILeftMenuItem = {
  label: "content_contextmenu_flip",
  id: "flip",
  src: SvgMap.flip,
  hideAfterClick: false,
  order: 120,
  uiMode: [HSFPConstants.UIMode.layoutDesignMode]
};

export const duplicate: ILeftMenuItem = {
  label: "toolBar_edit_duplicate",
  id: "duplicate",
  src: SvgMap.duplicate,
  order: 140,
  uiMode: [HSFPConstants.UIMode.layoutDesignMode]
};

export const lock: ILeftMenuItem = {
  label: "content_contextmenu_display_title_lock",
  id: "lock",
  src: SvgMap.lock,
  order: 166,
  uiMode: [HSFPConstants.UIMode.layoutDesignMode],
  hideAfterClick: false
};

const unlock: ILeftMenuItem = {
  label: "content_contextmenu_display_title_unlock",
  id: "lock",
  src: SvgMap.unlock,
  order: 166,
  uiMode: [HSFPConstants.UIMode.layoutDesignMode],
  hideAfterClick: false
};

export const hide: ILeftMenuItem = {
  label: "content_contextmenu_display_title_hide",
  id: "hide",
  src: SvgMap.hide,
  order: 150,
  uiMode: [HSFPConstants.UIMode.layoutDesignMode]
};

export const deleteItem: ILeftMenuItem = {
  label: "content_contextmenu_dete_title",
  id: "delete",
  src: SvgMap.del,
  order: 145,
  uiMode: [HSFPConstants.UIMode.layoutDesignMode]
};

export const favoriteAdd: ILeftMenuItem = {
  id: "favButton",
  type: PropertyBarControlTypeEnum.imageButton,
  src: SvgMap.favAdded,
  order: 162,
  label: "plugin_favoritelist_remove"
};

export const favoriteRemove: ILeftMenuItem = {
  id: "favButton",
  type: PropertyBarControlTypeEnum.imageButton,
  src: SvgMap.favRemove,
  order: 162,
  label: "plugin_favoritelist_add"
};

interface MenuItemContext {
  entities: HSCore.Model.Entity[];
  app: HSApp.App;
  seekId?: string;
  is3D?: boolean;
}

export function getReplaceItem(context: MenuItemContext): ILeftMenuItem {
  const { entities } = context;
  return {
    ...replace,
    disable: entities.length > 1,
    onClick: EventHandlers.replaceEvent.bind(undefined, context)
  };
}

export function getFlipItem(context: MenuItemContext): ILeftMenuItem {
  return {
    ...flip,
    onClick: EventHandlers.flipEvent.bind(undefined, context)
  };
}

export function getDuplicateItem(context: MenuItemContext): ILeftMenuItem {
  return {
    ...duplicate,
    onClick: EventHandlers.duplicateEvent.bind(undefined, context)
  };
}

export function getDeleteItem(context: MenuItemContext): ILeftMenuItem {
  return {
    ...deleteItem,
    onClick: EventHandlers.deleteEvent.bind(undefined, context)
  };
}

export function getLockItem(context: MenuItemContext): ILeftMenuItem {
  const { entities } = context;
  const isLocked = entities[0]?.isFlagOn(HSCore.Model.EntityFlagEnum.freezed);
  
  return {
    ...(isLocked ? unlock : lock),
    stateReducer: (state: ILeftMenuItem) => {
      const isCurrentlyLocked = entities[0]?.isFlagOn(HSCore.Model.EntityFlagEnum.freezed);
      const label = isCurrentlyLocked
        ? ResourceManager.getString("content_contextmenu_display_title_unlock")
        : ResourceManager.getString("content_contextmenu_display_title_lock");
      const src = isCurrentlyLocked ? SvgMap.unlock : SvgMap.lock;
      
      return {
        ...state,
        label,
        src
      };
    },
    onClick: EventHandlers.lockEvent.bind(undefined, context)
  };
}

export function getHideItem(context: MenuItemContext): ILeftMenuItem {
  return {
    ...hide,
    onClick: EventHandlers.hideEvent.bind(undefined, context)
  };
}

export function getFavoriteItem(context: MenuItemContext): ILeftMenuItem {
  const { entities, seekId: providedSeekId } = context;
  const seekId = providedSeekId ?? entities[0].seekId;
  const { favAddFlag } = Utils.getFavoriteInfo(entities?.[0], seekId);
  
  return {
    ...(favAddFlag ? favoriteAdd : favoriteRemove),
    disable: (entities?.length ?? 0) > 1,
    onClick: EventHandlers.favButtonEvent.bind(undefined, { ...context, seekId })
  };
}

export function getUploadGroupItem(context: MenuItemContext): ILeftMenuItem {
  const { entities, app } = context;
  const MAX_GROUP_SIZE = 10;
  
  return {
    ...favoriteRemove,
    id: "uploadGroupButton",
    onClick: () => {
      const errorMessage = ResourceManager.getString("group_size_too_large_livehint");
      const entity = entities[0];
      const isWithinSizeLimit = 
        entity.XLength < MAX_GROUP_SIZE && 
        entity.YLength < MAX_GROUP_SIZE && 
        entity.ZLength < MAX_GROUP_SIZE;
      
      if (isWithinSizeLimit) {
        app.pluginManager.getPlugin(HSFPConstants.PluginType.MyGroup).uploadGroup(entity);
      } else {
        LiveHint.show(
          `${errorMessage} ${MAX_GROUP_SIZE}${HSCore.Util.Unit.LengthUnitTypeEnum.meter}`,
          1000,
          undefined,
          { canclose: true }
        );
      }
    }
  };
}

export function getArrayItem(context: MenuItemContext): ILeftMenuItem {
  const { entities, app } = context;
  const entity = entities[0];
  const eventTracker = HSApp.Util.EventTrack.instance();
  
  return {
    label: ResourceManager.getString("toolBar_linear_array"),
    id: "array",
    src: SvgMap.array,
    order: 141,
    uiMode: [HSFPConstants.UIMode.layoutDesignMode],
    children: [
      {
        label: ResourceManager.getString("toolBar_linear_array"),
        id: "linearArray",
        src: SvgMap.array,
        onClick: (event: MouseEvent) => {
          const targetViewMode = HSCore.Util.Content.isCeilingLight(entity)
            ? HSApp.View.ViewModeEnum.RCP
            : HSApp.View.ViewModeEnum.Plane;
          
          if (app.primaryViewMode !== targetViewMode) {
            app.switchPrimaryViewMode(targetViewMode, {});
            LiveHint.show(
              ResourceManager.getString("liveHint_linear_array_switchView"),
              5000
            );
          }
          
          const cmdManager = app.cmdManager;
          const position = { x: event.clientX, y: event.clientY };
          const command = cmdManager.createCommand(
            HSFPConstants.CommandType.CmdContentArray,
            [entities, { position }]
          );
          cmdManager.execute(command);
          
          const environmentId = app.activeEnvironmentId;
          eventTracker.track(
            HSApp.Util.EventGroupEnum.Rightmenu,
            "2Dsketch_2D_array_event",
            {
              obj: ResourceManager.getString("mixpaint_paveBrickRegion"),
              env: environmentId
            }
          );
        }
      },
      {
        label: ResourceManager.getString("plugin_leftmenu_arc_array"),
        id: "arcArray",
        src: "hs_toolbar_yuanhuzhenlie",
        onClick: () => {
          const targetViewMode = HSCore.Util.Content.isCeilingLight(entity)
            ? HSApp.View.ViewModeEnum.RCP
            : HSApp.View.ViewModeEnum.Plane;
          
          if (app.primaryViewMode !== targetViewMode) {
            app.switchPrimaryViewMode(targetViewMode, {});
            LiveHint.show(
              ResourceManager.getString("liveHint_arc_array_switchView"),
              5000
            );
          }
          
          const cmdManager = app.cmdManager;
          const command = cmdManager.createCommand(
            HSFPConstants.CommandType.CmdContentArcArray,
            entities
          );
          cmdManager.execute(command);
          
          eventTracker.track(HSApp.Util.EventGroupEnum.Rightmenu, "arc_array_event", {});
        }
      }
    ]
  };
}

export function getDistributionItem(context: MenuItemContext): ILeftMenuItem {
  const { entities, app, is3D } = context;
  const contentEntities = entities.filter(entity => entity instanceof HSCore.Model.Content);
  const MIN_ENTITIES_FOR_DISTRIBUTION = 2;
  
  return {
    id: "distribution",
    label: ResourceManager.getString("content_distance_distribution"),
    type: PropertyBarControlTypeEnum.imageButton,
    src: SvgMap.distributionContents,
    order: 145,
    disable: (contentEntities?.length ?? 0) <= MIN_ENTITIES_FOR_DISTRIBUTION || is3D,
    children: [
      {
        id: "horizontalDistribution",
        label: ResourceManager.getString("content_horizontal_distance_distribution"),
        type: PropertyBarControlTypeEnum.imageButton,
        onClick: () => {
          const cmdManager = app.cmdManager;
          const command = cmdManager.createCommand(
            HSFPConstants.CommandType.DistributionContents,
            [entities, "x"]
          );
          cmdManager.execute(command);
          cmdManager.complete();
        }
      },
      {
        id: "verticalDistribution",
        label: ResourceManager.getString("content_vertical_distance_distribution"),
        type: PropertyBarControlTypeEnum.imageButton,
        onClick: () => {
          const cmdManager = app.cmdManager;
          const command = cmdManager.createCommand(
            HSFPConstants.CommandType.DistributionContents,
            [entities, "y"]
          );
          cmdManager.execute(command);
          cmdManager.complete();
        }
      }
    ]
  };
}

export function getGroupItem(context: MenuItemContext): ILeftMenuItem {
  const { entities } = context;
  const MIN_ENTITIES_FOR_GROUP = 2;
  
  return {
    id: "groupButton",
    type: PropertyBarControlTypeEnum.imageButton,
    order: 10,
    uiMode: [HSFPConstants.UIMode.layoutDesignMode],
    src: SvgMap.group,
    label: ResourceManager.getString("group_contextmenu_group_title"),
    disable: 
      entities.length < MIN_ENTITIES_FOR_GROUP ||
      entities.some(entity => entity instanceof HSCore.Model.NCustomizedParametricModel),
    onClick: EventHandlers.groupButtonEvent.bind(undefined, context)
  };
}

export function getUnGroupItem(context: MenuItemContext): ILeftMenuItem {
  const { entities, app } = context;
  
  return {
    id: "unGroupButton",
    type: PropertyBarControlTypeEnum.imageButton,
    src: SvgMap.ungroup,
    order: 113,
    uiMode: [HSFPConstants.UIMode.layoutDesignMode],
    label: ResourceManager.getString("group_contextmenu_ungroup_title"),
    showHotKey: true,
    onClick: () => {
      const cmdManager = app.cmdManager;
      const command = cmdManager.createCommand(
        HSFPConstants.CommandType.RemoveGroup,
        [entities[0]]
      );
      cmdManager.execute(command);
    }
  };
}

export function getAlignItem(context: MenuItemContext): ILeftMenuItem {
  const { entities, app } = context;
  const alignType = HSFPConstants.Align;
  
  const labels = {
    surface: ResourceManager.getString("surface_align"),
    front: ResourceManager.getString("front_surface_align"),
    back: ResourceManager.getString("back_surface_align"),
    left: ResourceManager.getString("left_surface_align"),
    right: ResourceManager.getString("right_surface_align"),
    top: ResourceManager.getString("top_surface_align"),
    bottom: ResourceManager.getString("bottom_surface_align"),
    centerFrontBack: ResourceManager.getString("front_back_center_align"),
    adaptFrontBack: ResourceManager.getString("front_back_surface_align"),
    centerLeftRight: ResourceManager.getString("left_right_center_align"),
    adaptLeftRight: ResourceManager.getString("left_right_surface_align"),
    centerTopBottom: ResourceManager.getString("top_bottom_center_align"),
    adaptTopBottom: ResourceManager.getString("top_bottom_surface_align")
  };
  
  let alignmentOptions: Array<Array<[HSFPConstants.Align, string]>>;
  
  const activeView = HSApp.App.getApp().getActive3DView();
  const camera = activeView?.camera?.entity;
  const isOrthView = camera?.type === HSCore.Model.CameraTypeEnum.OrthView;
  
  if (isOrthView) {
    alignmentOptions = [
      [[alignType.Left, labels.left], [alignType.Top, labels.top]],
      [[alignType.Right, labels.right], [alignType.Bottom, labels.bottom]],
      [[alignType.CenterLeftRight, labels.centerLeftRight], [alignType.CenterBottomTop, labels.centerTopBottom]],
      [[alignType.AdaptLeftRight, labels.adaptLeftRight], [alignType.AdaptBottomTop, labels.adaptTopBottom]]
    ];
  } else {
    const baseOptions = [
      [[alignType.Front, labels.front], [alignType.Left, labels.left], [alignType.Top, labels.top]],
      [[alignType.Back, labels.back], [alignType.Right, labels.right], [alignType.Bottom, labels.bottom]],
      [[alignType.CenterFrontBack, labels.centerFrontBack], [alignType.CenterLeftRight, labels.centerLeftRight], [alignType.CenterBottomTop, labels.centerTopBottom]]
    ];
    
    const hasAdaptableEntities = entities.some(entity =>
      [HSConstants.ModelClass.DAssembly, HSConstants.ModelClass.DExtruding, HSConstants.ModelClass.DContent]
        .includes(entity.Class)
    );
    
    alignmentOptions = hasAdaptableEntities
      ? [...baseOptions, [[alignType.AdaptFrontBack, labels.adaptFrontBack], [alignType.AdaptLeftRight, labels.adaptLeftRight], [alignType.AdaptBottomTop, labels.adaptTopBottom]]]
      : baseOptions;
  }
  
  const children = alignmentOptions.map(row =>
    row.map(([type, label]) => ({
      label,
      onClick: () => {
        const cmdManager = app.cmdManager;
        const command = cmdManager.createCommand(
          HSFPConstants.CommandType.CmdAlign,
          [entities, type]
        );
        if (command) {
          cmdManager.execute(command);
        }
      }
    }))
  );
  
  return {
    label: labels.surface,
    src: SvgMap.align,
    order: 7,
    uiMode: [HSFPConstants.UIMode.layoutDesignMode],
    id: "align",
    children
  };
}

export function getSmartLayoutItem(context: MenuItemContext): ILeftMenuItem {
  const { entities } = context;
  
  return {
    label: ResourceManager.getString("customized_products_smart_accessories"),
    id: "customized_products_leftmenu_smartlayout",
    src: SvgMap.smartAccessoryLayoutLeftMenu,
    order: 144,
    disable: !Utils.smartAccessoryLayoutEnable(entities),
    onClick: () => {
      if (!Utils.isAllCustomIzedProducts(entities)) {
        Utils.smartAccessoryLayout(entities);
      }
    },
    children: Utils.smartLayoutChildItems(entities)
  };
}

export function getScaleItem(context: MenuItemContext): ILeftMenuItem {
  const { entities, app } = context;
  const entity = entities[0];
  
  return {
    label: ResourceManager.getString("plugin_style_material_replace_card_scale"),
    order: 25,
    id: "content_scale",
    src: SvgMap.scale,
    uiMode: [HSFPConstants.UIMode.layoutDesignMode],
    disable: 
      entities.length > 1 ||
      !entity.isScalable ||
      entity.isFlagOn(HSCore.Model.EntityFlagEnum.freezed),
    onClick: () => {
      const gizmoType = HSApp.View.GizmoSelectionType.Scale;
      app.getActive3DView().gizmoManager.setSelectionType(gizmoType);
    }
  };
}

export { ILeftMenuItem };