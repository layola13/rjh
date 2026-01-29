import { HSCore } from './HSCore';
import { SvgMap } from './SvgMap';

interface GetItemsParams {
  entities: HSCore.Model.Face2d[];
  app: any;
}

interface MenuItem {
  id?: string;
  type?: PropertyBarControlTypeEnum;
  order: number;
  uiMode: string[];
  disable?: boolean;
  src?: string;
  label: string;
  onClick?: (event?: MouseEvent) => void;
  hotkey?: {
    win: string;
    mac: string;
  };
  registerHotkey?: boolean;
  children?: MenuItem[];
}

interface Position {
  x: number;
  y: number;
}

interface CommandOptions {
  position: Position;
}

export const Face2d = {
  name: "Face2d",

  isApplied(entities: any[]): boolean {
    return entities.some((entity) => entity instanceof HSCore.Model.Face2d);
  },

  getItems(params: GetItemsParams): MenuItem[] {
    const { entities, app } = params;
    const items: MenuItem[] = [];
    const firstEntity = entities[0];
    const eventTracker = HSApp.Util.EventTrack.instance();
    const activeEnvironmentId = app.activeEnvironmentId;
    const leftMenuPlugin = HSApp.App.getApp().pluginManager.getPlugin(
      HSFPConstants.PluginType.LeftMenu
    );

    if (leftMenuPlugin?.commonItems) {
      const deleteItem = leftMenuPlugin.commonItems.getDeleteItem;
      if (entities.length !== 1 || !firstEntity.isBackground()) {
        items.push(deleteItem(params));
      }
    }

    items.push({
      id: "ceilingOffset",
      type: PropertyBarControlTypeEnum.imageButton,
      order: 100,
      uiMode: [HSFPConstants.UIMode.layoutDesignMode],
      disable: entities && entities.length > 1,
      src: SvgMap.offsetRegionSvg,
      label: ResourceManager.getString("mixpaint_leftmenu_offset"),
      onClick: () => {
        const commandManager = app.cmdManager;
        if (entities.length < 1) {
          return;
        }

        eventTracker.track(
          HSApp.Util.EventGroupEnum.Rightmenu,
          "2Dsketch_2D_offset_event",
          { IF_env: activeEnvironmentId }
        );

        const command = commandManager.createCommand(
          HSFPConstants.CommandType.Sketch2d.OffsetTool,
          [firstEntity]
        );
        commandManager.execute(command);
      }
    });

    items.push({
      label: ResourceManager.getString("toolBar_edit_duplicate"),
      id: "duplacate",
      src: SvgMap.duplicate,
      order: 140,
      uiMode: [HSFPConstants.UIMode.layoutDesignMode],
      disable: entities.length === 1 && firstEntity.isBackground(),
      hotkey: {
        win: "ctrl+c",
        mac: "meta+c"
      },
      registerHotkey: true,
      onClick: (event?: MouseEvent) => {
        eventTracker.track(
          HSApp.Util.EventGroupEnum.Rightmenu,
          "toolBar_edit_duplicate_event"
        );

        const appInstance = HSApp.App.getApp();
        const active3DView = appInstance.getActive3DView();

        if (
          document.activeElement === active3DView.context.domElement ||
          appInstance.is2DViewActive() ||
          active3DView.context.domElement.focus()
        ) {
          if (firstEntity instanceof HSCore.Model.Face2d) {
            eventTracker.track(
              HSApp.Util.EventGroupEnum.Rightmenu,
              "2Dsketch_copy_region_event",
              { IF_env: activeEnvironmentId }
            );

            const commandManager = appInstance.cmdManager;
            const options: CommandOptions = {
              position: {
                x: event?.clientX ?? 0,
                y: event?.clientY ?? 0
              }
            };

            const command = commandManager.createCommand(
              HSFPConstants.CommandType.Sketch2d.CopyFaces,
              [entities, "leftmenu", options]
            );
            commandManager.execute(command);
          }
        }
      }
    });

    items.push({
      label: ResourceManager.getString("toolBar_edit_array"),
      id: "array",
      src: SvgMap.array,
      order: 141,
      uiMode: [HSFPConstants.UIMode.layoutDesignMode],
      disable: entities.length === 1 && firstEntity.isBackground(),
      children: [
        {
          label: ResourceManager.getString("toolBar_linear_array"),
          order: 0,
          uiMode: [],
          onClick: (event?: MouseEvent) => {
            const commandManager = HSApp.App.getApp().cmdManager;
            const options: CommandOptions = {
              position: {
                x: event?.clientX ?? 0,
                y: event?.clientY ?? 0
              }
            };

            const command = commandManager.createCommand(
              HSFPConstants.CommandType.Sketch2d.LinearArray,
              [entities, options]
            );
            commandManager.execute(command);

            eventTracker.track(
              HSApp.Util.EventGroupEnum.Rightmenu,
              "2Dsketch_2D_array_event",
              {
                obj: ResourceManager.getString("mixpaint_paveBrickRegion"),
                env: activeEnvironmentId
              }
            );
          }
        },
        {
          label: ResourceManager.getString("toolBar_axial_array"),
          order: 0,
          uiMode: [],
          onClick: (event?: MouseEvent) => {
            const commandManager = HSApp.App.getApp().cmdManager;
            const options: CommandOptions = {
              position: {
                x: event?.clientX ?? 0,
                y: event?.clientY ?? 0
              }
            };

            const command = commandManager.createCommand(
              HSFPConstants.CommandType.Sketch2d.AxialArray,
              [entities, options]
            );
            commandManager.execute(command);

            eventTracker.track(
              HSApp.Util.EventGroupEnum.Rightmenu,
              "2Dsketch_2D_axialarray_event",
              {
                obj: ResourceManager.getString("mixpaint_paveBrickRegion"),
                env: activeEnvironmentId
              }
            );
          }
        }
      ]
    });

    return items;
  }
};