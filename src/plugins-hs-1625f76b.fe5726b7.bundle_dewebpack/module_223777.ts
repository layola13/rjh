enum PropertyBarControlTypeEnum {
  imageButton = 'imageButton',
  divider = 'divider'
}

interface StatusBarData {
  view: any;
  menuItems: MenuItemsCollection;
  selectedEntities: any[];
  selection: any[];
}

interface StatusBarEvent {
  data: StatusBarData;
}

interface MenuItemsCollection {
  xInsertCollection(index: number, items: StatusBarItem[]): void;
}

interface ButtonData {
  src: string;
  tooltip: string;
  onclick: () => void;
}

interface StatusBarItem {
  id?: string;
  type: PropertyBarControlTypeEnum;
  data?: ButtonData;
}

interface App {
  cmdManager: CommandManager;
  is2DView(view: any): boolean;
}

interface CommandManager {
  createCommand(commandType: string, args: any[]): Command;
  execute(command: Command): void;
  complete(): void;
  createCommandsForEntities(entities: any[], commandType: string): Command[];
}

interface Command {}

interface SignalAPIObject {
  signalPopulateStatusBar: string;
  willShowStatusBarItemsForWeb(): boolean;
}

declare const HSCore: {
  Util: {
    SignalHook: new (context: any) => SignalHook;
    Wall: {
      isArcWall(wall: any): boolean;
    };
  };
  Model: {
    Wall: any;
  };
};

declare const HSApp: {
  Util: {
    Entity: {
      isTypeOf(type: any, entities: any[]): boolean;
    };
  };
  App: {
    getApp(): App;
  };
};

declare const HSFPConstants: {
  CommandType: {
    SplitNGWall: string;
    ToArcWall: string;
    DeleteNGWall: string;
    DeleteNGWalls: string;
    HideWall: string;
    Composite: string;
  };
};

declare const ResourceManager: {
  getString(key: string): string;
};

interface SignalHook {
  listen(signal: string, handler: (event: StatusBarEvent) => void): void;
  unlistenAll(): void;
}

class BaseClass {
  protected init_(app: App, signalAPIObject: SignalAPIObject): void {}
  protected uninit_(): void {}
}

export default class WallContextualToolsPlugin extends BaseClass {
  private _app!: App;
  private _signalAPIObject!: SignalAPIObject;
  private _signalHook!: SignalHook;

  protected init_(app: App, signalAPIObject: SignalAPIObject): void {
    this._app = app;
    this._signalAPIObject = signalAPIObject;
    this._signalHook = new HSCore.Util.SignalHook(this);
    this._signalHook.listen(
      signalAPIObject.signalPopulateStatusBar,
      this._onPopulateStatusBar
    );
  }

  protected uninit_(): void {
    this._signalHook.unlistenAll();
  }

  private _onPopulateStatusBar = (event: StatusBarEvent): void => {
    const { view, menuItems, selectedEntities, selection } = event.data;
    const isWallSelected =
      HSApp.Util.Entity.isTypeOf(HSCore.Model.Wall, selectedEntities) ||
      HSApp.Util.Entity.isTypeOf(HSCore.Model.Wall, selectedEntities);

    if (
      selection.length !== 0 &&
      isWallSelected &&
      this._signalAPIObject.willShowStatusBarItemsForWeb()
    ) {
      const entities = selectedEntities.slice(0);
      const statusBarItems =
        entities.length === 1
          ? this._initStatusBarItems(entities[0], view)
          : this._initStatusBarItemsForMultiple(entities, view);
      menuItems.xInsertCollection(0, statusBarItems);
    }
  };

  private _initStatusBarItems(entity: any, view: any): StatusBarItem[] {
    const iconBasePath = 'plugin/contextualtools/res/icons/seperatedIcons/';
    const items: StatusBarItem[] = [];

    if (HSApp.App.getApp().is2DView(view)) {
      if (!HSCore.Util.Wall.isArcWall(entity)) {
        items.push(this._getSplitButtonObj(entity, iconBasePath));
      }
      items.push(this._getToArcWallButtonObj(entity, iconBasePath));
      items.push(this._getDeleteButtonObj(entity, iconBasePath));
      items.push(this._getHideButtonObj(entity, iconBasePath));
      items.push({ type: PropertyBarControlTypeEnum.divider });
    }

    return items;
  }

  private _initStatusBarItemsForMultiple(
    entities: any[],
    view: any
  ): StatusBarItem[] {
    const iconBasePath = 'plugin/contextualtools/res/icons/seperatedIcons/';
    const items: StatusBarItem[] = [];

    items.push(this._getDeletesButtonObj(entities, iconBasePath));
    items.push(this._getHidesButtonObj(entities, iconBasePath));
    items.push({ type: PropertyBarControlTypeEnum.divider });

    return items;
  }

  private _getSplitButtonObj(entity: any, iconBasePath: string): StatusBarItem {
    const iconSrc = `${iconBasePath}splitWall.svg`;
    return {
      id: 'splitButton',
      type: PropertyBarControlTypeEnum.imageButton,
      data: {
        src: iconSrc,
        tooltip: ResourceManager.getString('wall_contextmenu_split_wall_title'),
        onclick: () => {
          const cmdManager = this._app.cmdManager;
          const commandType = HSFPConstants.CommandType.SplitNGWall;
          const command = cmdManager.createCommand(commandType, [entity]);
          cmdManager.execute(command);
        }
      }
    };
  }

  private _getToArcWallButtonObj(entity: any, iconBasePath: string): StatusBarItem {
    const isArcWall = HSCore.Util.Wall.isArcWall(entity);
    const iconSrc = isArcWall
      ? `${iconBasePath}curvedToLinewall.svg`
      : `${iconBasePath}lineToCurvedwall.svg`;
    const tooltip = isArcWall
      ? ResourceManager.getString('wall_contextmenu_to_line_wall_title')
      : ResourceManager.getString('wall_contextmenu_to_arc_wall_title');

    return {
      id: 'toArcWallButton',
      type: PropertyBarControlTypeEnum.imageButton,
      data: {
        src: iconSrc,
        tooltip,
        onclick: () => {
          const cmdManager = this._app.cmdManager;
          const commandType = HSFPConstants.CommandType.ToArcWall;
          const command = cmdManager.createCommand(commandType, [entity]);
          cmdManager.execute(command);
        }
      }
    };
  }

  private _getDeleteButtonObj(entity: any, iconBasePath: string): StatusBarItem {
    const iconSrc = `${iconBasePath}delete.svg`;
    return {
      id: 'deleteButton',
      type: PropertyBarControlTypeEnum.imageButton,
      data: {
        src: iconSrc,
        tooltip: ResourceManager.getString('wall_contextmenu_delete_title'),
        onclick: () => {
          const cmdManager = this._app.cmdManager;
          const commandType = HSFPConstants.CommandType.DeleteNGWall;
          const command = cmdManager.createCommand(commandType, [entity]);
          cmdManager.execute(command);
        }
      }
    };
  }

  private _getDeletesButtonObj(entities: any[], iconBasePath: string): StatusBarItem {
    const iconSrc = `${iconBasePath}delete.svg`;
    return {
      id: 'deleteButton',
      type: PropertyBarControlTypeEnum.imageButton,
      data: {
        src: iconSrc,
        tooltip: ResourceManager.getString('wall_contextmenu_delete_title'),
        onclick: () => {
          const cmdManager = this._app.cmdManager;
          const commandType = HSFPConstants.CommandType.DeleteNGWalls;
          const command = cmdManager.createCommand(commandType, [entities]);
          cmdManager.execute(command);
        }
      }
    };
  }

  private _getHideButtonObj(entity: any, iconBasePath: string): StatusBarItem {
    const iconSrc = `${iconBasePath}hide.svg`;
    return {
      id: 'hideButton',
      type: PropertyBarControlTypeEnum.imageButton,
      data: {
        src: iconSrc,
        tooltip: ResourceManager.getString('wall_contextmenu_display_title_hide'),
        onclick: () => {
          const cmdManager = this._app.cmdManager;
          const commandType = HSFPConstants.CommandType.HideWall;
          const command = cmdManager.createCommand(commandType, [entity]);
          cmdManager.execute(command);
        }
      }
    };
  }

  private _getHidesButtonObj(entities: any[], iconBasePath: string): StatusBarItem {
    const iconSrc = `${iconBasePath}hide.svg`;
    return {
      id: 'hideButton',
      type: PropertyBarControlTypeEnum.imageButton,
      data: {
        src: iconSrc,
        tooltip: ResourceManager.getString('wall_contextmenu_display_title_hide'),
        onclick: () => {
          const cmdManager = this._app.cmdManager;
          const commands = HSApp.App.getApp().cmdManager.createCommandsForEntities(
            entities,
            HSFPConstants.CommandType.HideWall
          );
          const compositeCommand = cmdManager.createCommand(
            HSFPConstants.CommandType.Composite,
            [commands]
          );
          cmdManager.execute(compositeCommand);
          cmdManager.complete();
        }
      }
    };
  }
}