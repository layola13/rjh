export interface Line2dEntity {
  from: { x: number; y: number };
  to: { x: number; y: number };
  isbackground?: boolean;
  isBackground?: () => boolean;
}

export interface Line2dApp {
  activeEnvironmentId: string;
  environmentManager: {
    isWallCeilingPlatformEnv: () => boolean;
  };
  cmdManager: CommandManager;
  selectionManager: {
    selected: () => Line2dEntity[];
  };
  pluginManager: {
    getPlugin: (pluginType: string) => Plugin | null;
  };
}

export interface CommandManager {
  createCommand: (commandType: string, args: unknown[]) => Command;
  execute: (command: Command) => void;
}

export interface Command {}

export interface Plugin {
  commonItems?: {
    getDeleteItem: (context: Line2dContext) => PropertyBarItem;
  };
}

export interface Line2dContext {
  entities: Line2dEntity[];
  app: Line2dApp;
}

export interface PropertyBarItem {
  id: string;
  type: string;
  order: number;
  uiMode: string[];
  disable?: boolean;
  src?: string;
  label: string;
  onClick: () => void;
}

declare const HSCore: {
  Model: {
    Line2d: new (...args: unknown[]) => Line2dEntity;
  };
  Util: {
    Math: {
      Vec2: {
        distance: (from: { x: number; y: number }, to: { x: number; y: number }) => number;
      };
    };
  };
};

declare const HSApp: {
  App: {
    getApp: () => {
      pluginManager: {
        getPlugin: (pluginType: string) => Plugin | null;
      };
    };
  };
  Util: {
    EventTrack: {
      instance: () => EventTracker;
    };
    NCustomizedFeatureModel: {
      isNCustomizedEnv: () => boolean;
    };
    EventGroupEnum: {
      Rightmenu: string;
    };
  };
};

declare const HSFPConstants: {
  PluginType: {
    LeftMenu: string;
  };
  UIMode: {
    layoutDesignMode: string;
  };
  CommandType: {
    NCustomizedFeatureModel: {
      CmdSectionAndElevationCopy: string;
    };
    Sketch2d: {
      ConvertLineToArc: string;
    };
  };
};

declare const PropertyBarControlTypeEnum: {
  imageButton: string;
};

declare const ResourceManager: {
  getString: (key: string) => string;
};

declare const SvgMap: {
  duplicate: string;
  linetoArc: string;
};

interface EventTracker {
  track: (group: string, eventName: string, data: Record<string, unknown>) => void;
}

export const Line2d = {
  name: "Line2d",

  isApplied(entities: unknown[]): boolean {
    return entities.some((entity) => entity instanceof HSCore.Model.Line2d);
  },

  getItems(context: Line2dContext): PropertyBarItem[] {
    const { entities, app } = context;
    const items: PropertyBarItem[] = [];
    const firstEntity = entities[0];
    const eventTracker = HSApp.Util.EventTrack.instance();
    const activeEnvironmentId = app.activeEnvironmentId;
    const isWallCeilingPlatform = app.environmentManager.isWallCeilingPlatformEnv();
    const leftMenuPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.LeftMenu);

    if (leftMenuPlugin?.commonItems) {
      const deleteItem = leftMenuPlugin.commonItems.getDeleteItem;
      if (!firstEntity.isbackground) {
        items.push(deleteItem(context));
      }
    }

    if (HSApp.Util.NCustomizedFeatureModel.isNCustomizedEnv() && entities.length === 1) {
      items.push({
        id: "sectionandelevationcopy",
        type: PropertyBarControlTypeEnum.imageButton,
        order: 151,
        uiMode: [HSFPConstants.UIMode.layoutDesignMode],
        disable: false,
        src: SvgMap.duplicate,
        label: ResourceManager.getString("content_contextmenu_duplicate_title"),
        onClick: () => {
          const cmdManager = app.cmdManager;
          const command = cmdManager.createCommand(
            HSFPConstants.CommandType.NCustomizedFeatureModel.CmdSectionAndElevationCopy,
            [firstEntity]
          );
          cmdManager.execute(command);
        },
      });
    }

    if (
      firstEntity instanceof HSCore.Model.Line2d &&
      isWallCeilingPlatform &&
      !firstEntity.isbackground &&
      entities.length === 1
    ) {
      items.push({
        id: "linetoArc",
        type: PropertyBarControlTypeEnum.imageButton,
        order: 150,
        uiMode: [HSFPConstants.UIMode.layoutDesignMode],
        src: SvgMap.linetoArc,
        label: ResourceManager.getString("content_contextmenu_line2arc"),
        onClick: () => {
          const cmdManager = app.cmdManager;
          const selectedEntities = app.selectionManager.selected();

          if (selectedEntities.length < 1) {
            return;
          }

          const selectedEntity = selectedEntities[0];
          const isValidEntity =
            selectedEntity instanceof HSCore.Model.Line2d ||
            !selectedEntity.isBackground?.();

          if (!isValidEntity) {
            return;
          }

          eventTracker.track(HSApp.Util.EventGroupEnum.Rightmenu, "2Dsketch_line_to_arc_event", {
            IF_env: activeEnvironmentId,
          });

          const arcRadius = HSCore.Util.Math.Vec2.distance(selectedEntity.from, selectedEntity.to) / 10;
          const command = cmdManager.createCommand(
            HSFPConstants.CommandType.Sketch2d.ConvertLineToArc,
            [selectedEntity, arcRadius]
          );
          cmdManager.execute(command);
        },
      });
    }

    return items;
  },
};