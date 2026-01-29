import { HSCore } from './635589';
import { replace, duplicate, getDeleteItem } from './230269';
import { SvgMap } from './82652';
import { Utils } from './903596';

interface Entity {
  parent?: Wall;
  topoPathers: Array<{ index: number; isAux: boolean }>;
  type: string;
}

interface Wall {
  getMaster(): unknown;
  getMolding(type: string): Molding[] | undefined;
}

interface Molding {
  topoPathers: Array<{ index: number; isAux: boolean }>;
  type: string;
}

interface PropertyBarItem {
  id?: string;
  type?: PropertyBarControlTypeEnum;
  label?: string;
  src?: string;
  order?: number;
  uiMode?: string[];
  disable?: boolean;
  onClick?: () => void;
}

interface GetItemsParams {
  entities: Entity[];
}

enum PropertyBarControlTypeEnum {
  imageButton = 'imageButton'
}

declare const HSApp: {
  App: {
    getApp(): {
      cmdManager: CommandManager;
      is3DViewActive(): boolean;
      switchPrimaryViewMode(mode: any, options: Record<string, unknown>): void;
      pluginManager: {
        getPlugin(pluginType: string): {
          handler: {
            changeWallMoldingType(entity: Entity): void;
            copyMolding(entity: Entity): void;
          };
        };
      };
    };
  };
  View: {
    ViewModeEnum: {
      OrbitView: string;
    };
  };
};

declare const HSFPConstants: {
  UIMode: {
    layoutDesignMode: string;
  };
  CommandType: {
    CutMolding: string;
    ConnectMolding: string;
  };
  PluginType: {
    WallDecoration: string;
  };
};

declare const ResourceManager: {
  getString(key: string): string;
};

interface CommandManager {
  createCommand(commandType: string, entities: Entity[]): unknown;
  execute(command: unknown): void;
}

function isApplied(entities: unknown[]): boolean {
  return entities.some((entity) => 
    entity instanceof HSCore.Model.Molding
  );
}

function getItems(params: GetItemsParams): PropertyBarItem[] {
  const { entities } = params;
  const entity = entities[0];
  const app = HSApp.App.getApp();
  const { cmdManager } = app;
  const items: PropertyBarItem[] = [];
  const parent = entity.parent;
  const master = parent?.getMaster();

  if (
    !HSCore.Util.Wall.isArcWall(master) &&
    (entity instanceof HSCore.Model.Baseboard || entity instanceof HSCore.Model.Cornice)
  ) {
    const matchingMoldings = (parent.getMolding(entity.type) ?? []).filter(
      (molding) =>
        molding.topoPathers.length > 0 &&
        molding.topoPathers[0].index === entity.topoPathers[0].index &&
        molding.topoPathers[0].isAux === entity.topoPathers[0].isAux
    );

    items.push(
      {
        id: 'splitMoldingButton',
        type: PropertyBarControlTypeEnum.imageButton,
        label: ResourceManager.getString('plugin_leftmenu_molding_cut'),
        src: SvgMap.splitMolding,
        order: 101,
        uiMode: [HSFPConstants.UIMode.layoutDesignMode],
        onClick: (): void => {
          if (!app.is3DViewActive()) {
            app.switchPrimaryViewMode(HSApp.View.ViewModeEnum.OrbitView, {});
          }
          const command = cmdManager.createCommand(HSFPConstants.CommandType.CutMolding, [entity]);
          cmdManager.execute(command);
        }
      },
      {
        id: 'connectMoldingButton',
        type: PropertyBarControlTypeEnum.imageButton,
        label: ResourceManager.getString('plugin_leftmenu_molding_connect'),
        src: SvgMap.connectMolding,
        disable: matchingMoldings.length < 2,
        order: 102,
        uiMode: [HSFPConstants.UIMode.layoutDesignMode],
        onClick: (): void => {
          if (!app.is3DViewActive()) {
            app.switchPrimaryViewMode(HSApp.View.ViewModeEnum.OrbitView, {});
          }
          const command = cmdManager.createCommand(HSFPConstants.CommandType.ConnectMolding, [entity]);
          cmdManager.execute(command);
        }
      }
    );
  }

  return [
    {
      ...replace,
      onClick: (): void => {
        app.pluginManager
          .getPlugin(HSFPConstants.PluginType.WallDecoration)
          .handler.changeWallMoldingType(entity);
      }
    },
    ...items,
    {
      ...duplicate,
      onClick: (): void => {
        Utils.showDuplicateTip();
        app.pluginManager
          .getPlugin(HSFPConstants.PluginType.WallDecoration)
          .handler.copyMolding(entities[0]);
      }
    },
    getDeleteItem(params)
  ];
}

export const molding = {
  name: 'molding',
  isApplied,
  getItems
};