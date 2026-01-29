interface CommandManager {
  register(...args: unknown[]): void;
  createCommand(commandType: string, args?: unknown[]): Command;
  execute(command: Command, shouldComplete?: boolean): void;
  complete(): void;
  cancel(): void;
  current: Command | null;
  createCommandsForEntities(entities: Entity[], commandType: string): Command[];
}

interface Command {
  output?: Entity;
}

interface Entity {
  instanceOf(modelClass: string): boolean;
  ungroupable?: boolean;
  flip?: number;
}

interface SelectionManager {
  select(entity: Entity): void;
}

interface App {
  cmdManager: CommandManager;
  selectionManager: SelectionManager;
}

interface Plugin {
  [key: string]: unknown;
}

interface SignalAPIObject {
  signalPopulateStatusBar: string;
  willShowStatusBarItemsForWeb(): boolean;
}

interface PopulateStatusBarEventData {
  selection: unknown[];
  selectedEntities: Entity[];
  menuItems: MenuItemCollection;
}

interface PopulateStatusBarEvent {
  data: PopulateStatusBarEventData;
}

interface MenuItemCollection {
  xInsertCollection(index: number, items: StatusBarItem[]): void;
}

interface StatusBarItemData {
  src?: string;
  tooltip?: string;
  onclick?: () => void;
}

interface StatusBarItem {
  id?: string;
  type: number;
  order: number;
  data?: StatusBarItemData;
}

enum PropertyBarControlTypeEnum {
  imageButton = 1,
  divider = 2
}

declare const HSFPConstants: {
  PluginType: {
    Catalog: string;
  };
  CommandType: {
    SmartReplaceContent: string;
    OpenIndependentPanel: string;
    Duplicate: string;
    DisplayContent: string;
    Composite: string;
    RemoveGroup: string;
    AddGroup: string;
    DeleteSelection: string;
    FlipContent: string;
  };
};

declare const HSCore: {
  Util: {
    SignalHook: new (context: unknown) => SignalHook;
  };
  Model: {
    Content: unknown;
    Obstacle: new () => Entity;
  };
};

declare const HSConstants: {
  ModelClass: {
    NgPAssembly: string;
    NgContent: string;
    NgGroup: string;
    NgCustomizedModel: string;
    NgOpening: string;
  };
};

declare const HSApp: {
  Util: {
    Entity: {
      isTypeOf(modelClass: unknown, entities: Entity[]): boolean;
    };
  };
  App: {
    getApp(): App;
  };
};

declare const ResourceManager: {
  getString(key: string): string;
};

declare const LiveHint: {
  show(message: string, duration: number, callback: () => void): void;
  hide(): void;
};

interface SignalHook {
  listen(signal: string, handler: (event: PopulateStatusBarEvent) => void): void;
  unlistenAll(): void;
}

export default class ContextualToolsPlugin {
  private _app!: App;
  private _cmdMgr!: CommandManager;
  private _signalAPIObject!: SignalAPIObject;
  private _catalogPlugin!: Plugin;
  private _signalHook!: SignalHook;
  private _entities: Entity[] = [];
  private showFlipContentTip?: boolean;

  init_(app: App, signalAPIObject: SignalAPIObject, plugins: Record<string, Plugin>): void {
    this._app = app;
    this._cmdMgr = app.cmdManager;
    this._signalAPIObject = signalAPIObject;
    this._catalogPlugin = plugins[HSFPConstants.PluginType.Catalog];
    this._cmdMgr.register(
      HSFPConstants.CommandType.SmartReplaceContent,
      HSFPConstants.CommandType.OpenIndependentPanel,
      signalAPIObject
    );
    this._signalHook = new HSCore.Util.SignalHook(this);
    this._signalHook.listen(signalAPIObject.signalPopulateStatusBar, this._onPopulateStatusBar);
  }

  uninit_(): void {
    this._signalHook.unlistenAll();
  }

  private _onPopulateStatusBar = (event: PopulateStatusBarEvent): void => {
    const { data } = event;
    const { menuItems, selection, selectedEntities } = data;

    if (
      selection.length !== 0 &&
      HSApp.Util.Entity.isTypeOf(HSCore.Model.Content, selectedEntities) &&
      this._signalAPIObject.willShowStatusBarItemsForWeb()
    ) {
      this._entities = selectedEntities.slice(0);
      const statusBarItems = this._initStatusBarItems(this._entities);
      menuItems.xInsertCollection(0, statusBarItems);
    }
  };

  private _initStatusBarItems(entities: Entity[]): StatusBarItem[] {
    const ICON_BASE_PATH = "plugin/contextualtools/res/icons/seperatedIcons/";
    const ICON_DUPLICATE = `${ICON_BASE_PATH}duplicate.svg`;
    const ICON_HIDE = `${ICON_BASE_PATH}hide.svg`;
    const ICON_DELETE = `${ICON_BASE_PATH}delete.svg`;
    const ICON_GROUP = `${ICON_BASE_PATH}group.svg`;
    const ICON_UNGROUP = `${ICON_BASE_PATH}ungroup.svg`;
    const ICON_REPLACE = `${ICON_BASE_PATH}replace.svg`;
    const ICON_REFLECT = `${ICON_BASE_PATH}reflect.svg`;

    const hasMultipleEntities = entities.length > 1;
    const items: StatusBarItem[] = [];

    if (entities.some(entity => entity.instanceOf(HSConstants.ModelClass.NgPAssembly))) {
      return items;
    }

    if (hasMultipleEntities) {
      const allAreContent = this._entities.every(entity =>
        entity.instanceOf(HSConstants.ModelClass.NgContent)
      );

      if (allAreContent) {
        items.push({
          id: "groupButton",
          type: PropertyBarControlTypeEnum.imageButton,
          order: 320,
          data: {
            src: ICON_GROUP,
            tooltip: ResourceManager.getString("group_contextmenu_group_title"),
            onclick: () => this._onGroupBtnClk()
          }
        });
      }
    } else {
      const entity = entities[0];
      const isGroup = entity.instanceOf(HSConstants.ModelClass.NgGroup);

      if (
        !isGroup &&
        !entity.instanceOf(HSConstants.ModelClass.NgCustomizedModel) &&
        !entity.instanceOf(HSConstants.ModelClass.NgOpening)
      ) {
        items.push({
          id: "flipContentButton",
          type: PropertyBarControlTypeEnum.imageButton,
          order: 315,
          data: {
            src: ICON_REFLECT,
            tooltip: ResourceManager.getString("content_contextmenu_flipcontent_title"),
            onclick: () => this._onFlipContentBtnClk()
          }
        });
      }

      if (isGroup && entity.ungroupable) {
        items.push({
          id: "ungroupButton",
          type: PropertyBarControlTypeEnum.imageButton,
          order: 320,
          data: {
            src: ICON_UNGROUP,
            tooltip: ResourceManager.getString("group_contextmenu_ungroup_title"),
            onclick: () => this._onUngroupBtnClk()
          }
        });
      }

      if (
        entity instanceof HSCore.Model.Obstacle ||
        !entity.instanceOf(HSConstants.ModelClass.NgCustomizedModel)
      ) {
        items.push({
          id: "replaceButton",
          type: PropertyBarControlTypeEnum.imageButton,
          order: 330,
          data: {
            src: ICON_REPLACE,
            tooltip: ResourceManager.getString("group_contextmenu_replease_title"),
            onclick: () => this._onReplaceBtnClk()
          }
        });
      }
    }

    items.push({
      id: "deleteButton",
      type: PropertyBarControlTypeEnum.imageButton,
      order: 340,
      data: {
        src: ICON_DELETE,
        tooltip: ResourceManager.getString("content_contextmenu_dete_title"),
        onclick: () => this._onDeleteBtnClk()
      }
    });

    items.push({
      id: "duplicateButton",
      type: PropertyBarControlTypeEnum.imageButton,
      order: 310,
      data: {
        src: ICON_DUPLICATE,
        tooltip: ResourceManager.getString("content_contextmenu_duplicate_title"),
        onclick: () => this._onDuplicateBtnClk()
      }
    });

    const hasGroupEntity = entities.some(entity =>
      entity.instanceOf(HSConstants.ModelClass.NgGroup)
    );

    if (!hasGroupEntity) {
      items.push({
        id: "hideButton",
        type: PropertyBarControlTypeEnum.imageButton,
        order: 350,
        data: {
          src: ICON_HIDE,
          tooltip: ResourceManager.getString("content_contextmenu_display_title_hide"),
          onclick: () => this._onHideBtnClk()
        }
      });
    }

    items.push({
      type: PropertyBarControlTypeEnum.divider,
      order: 360
    });

    return items;
  }

  private _onDuplicateBtnClk(): void {
    const command = this._cmdMgr.createCommand(HSFPConstants.CommandType.Duplicate, [{}]);
    this._cmdMgr.execute(command);
  }

  private _onHideBtnClk(): void {
    const commands = HSApp.App.getApp().cmdManager.createCommandsForEntities(
      this._entities,
      HSFPConstants.CommandType.DisplayContent
    );
    const compositeCommand = this._cmdMgr.createCommand(
      HSFPConstants.CommandType.Composite,
      [commands]
    );
    this._cmdMgr.execute(compositeCommand, false);
    this._cmdMgr.complete();
  }

  private _onUngroupBtnClk(): void {
    const entity = this._entities[0];
    if (entity?.instanceOf(HSConstants.ModelClass.NgGroup)) {
      const command = this._cmdMgr.createCommand(HSFPConstants.CommandType.RemoveGroup, [entity]);
      this._cmdMgr.execute(command);
    }
  }

  private _onGroupBtnClk(): void {
    const selectionManager = this._app.selectionManager;
    const entities = this._entities;

    if (entities.length <= 1) {
      return;
    }

    const command = this._cmdMgr.createCommand(HSFPConstants.CommandType.AddGroup, [entities]);
    this._cmdMgr.execute(command);

    const output = command.output;
    if (output) {
      selectionManager.select(output);
    }
  }

  private _onDeleteBtnClk(): void {
    const command = this._cmdMgr.createCommand(HSFPConstants.CommandType.DeleteSelection);
    this._cmdMgr.execute(command);
  }

  private _onReplaceBtnClk(): void {
    if (this._cmdMgr.current) {
      this._cmdMgr.cancel();
    }

    const entity = this._entities[0];
    const command = this._cmdMgr.createCommand(HSFPConstants.CommandType.SmartReplaceContent, [
      entity
    ]);
    this._cmdMgr.execute(command);
  }

  private _onFlipContentBtnClk(): void {
    if (this._cmdMgr.current) {
      this._cmdMgr.cancel();
    }

    const entity = this._entities[0];
    const command = this._cmdMgr.createCommand(HSFPConstants.CommandType.FlipContent, [entity]);
    this._cmdMgr.execute(command);

    const LIVE_HINT_DURATION = 3000;
    const hintMessage = ResourceManager.getString("content_contextmenu_flipcontent_livehint");

    if (this.showFlipContentTip === undefined) {
      this.showFlipContentTip = true;
    }

    if (this.showFlipContentTip && entity.flip === 1) {
      LiveHint.show(hintMessage, LIVE_HINT_DURATION, () => {
        LiveHint.hide();
        this.showFlipContentTip = false;
      });
    }
  }
}