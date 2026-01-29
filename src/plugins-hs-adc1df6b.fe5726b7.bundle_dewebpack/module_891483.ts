interface Entity {
  isOpened: boolean;
  signalFieldChanged: any;
  canAddPocket(): boolean;
  open(value: number): void;
  close(): void;
  metadata: {
    hasPocket?: boolean;
    extension?: {
      objInfo?: {
        axis?: any;
      };
    };
  };
}

interface App {
  floorplan: {
    contents: Record<string, any>;
  };
  is3DViewActive(): boolean;
}

interface Plugin {
  willShowPropertyBarItemsForWeb(): boolean;
  update(items: PropertyBarSection[]): void;
}

interface SelectionItem {
  entity: Entity;
}

interface StatusBarEventData {
  selection: SelectionItem[];
  rightPropertyItems: {
    xInsertCollection(index: number, items: PropertyBarSection[]): void;
  };
}

interface StatusBarEvent {
  data: StatusBarEventData;
}

interface PropertyBarControl {
  id: string;
  type: string;
  order: number;
  data: any;
}

interface PropertyBarSection {
  label: string;
  items: PropertyBarControl[];
}

interface TweenTarget {
  value: number;
}

declare const HSCore: any;
declare const HSApp: any;
declare const HSFPConstants: any;
declare const ResourceManager: any;
declare const PropertyBarControlTypeEnum: any;
declare const LiveHint: any;
declare const TWEEN: any;

export default class OpenDoorPlugin {
  private _signalHook: any;
  private _openingSignalHook: any;
  private app: App;
  private contextualToolsPlugin: Plugin;
  private entity: Entity;

  public init(context: { app: App }, plugins: Record<string, Plugin>): void {
    this._signalHook = new HSCore.Util.SignalHook(this);
    this._openingSignalHook = new HSCore.Util.SignalHook(this);
    this.app = context.app;
    this.contextualToolsPlugin = plugins[HSFPConstants.PluginType.ContextualTools];
  }

  public uninit(): void {
    this._openingSignalHook.unlistenAll();
    this._signalHook.unlistenAll();
  }

  private _getPropertyBarItems(): PropertyBarSection[] {
    const sections: PropertyBarSection[] = [];
    const isOpened = this.entity.isOpened;
    
    const doorSection: PropertyBarSection = {
      label: ResourceManager.getString("plugin_opendoor_opendoor"),
      items: []
    };

    doorSection.items.push({
      id: "openDoor",
      type: PropertyBarControlTypeEnum.toggleButton,
      order: 150,
      data: {
        value: isOpened,
        onLabel: ResourceManager.getString("plugin_opendoor_open"),
        offLabel: ResourceManager.getString("plugin_opendoor_close"),
        onValueChange: (value: boolean) => {
          if (value) {
            this._onOpenDoor(this.entity);
          } else {
            this._onCloseDoor(this.entity);
          }
        }
      }
    }, {
      id: "applyToAllOpenings",
      type: PropertyBarControlTypeEnum.imgbtn,
      order: 160,
      data: {
        className: "applyBtn",
        icon: "plugin/openingpocket/res/ImgOpeningPocket/applypocket.svg",
        rightlabel: ResourceManager.getString("plugin_opendoor_apply_door_opendoor"),
        onclick: () => {
          if (isOpened) {
            this._onOpenAllDoors();
          } else {
            this._onCloseAllDoors();
          }
        }
      }
    });

    sections.push(doorSection);
    return sections;
  }

  private _updatePropertyBar(): void {
    const items = this._getPropertyBarItems();
    this.contextualToolsPlugin.update(items);
  }

  public onPopulateStatusBar(event: StatusBarEvent): void {
    this._openingSignalHook.unlistenAll();
    
    const eventData = event.data;
    
    if (HSApp.App.getApp().is3DViewActive() && eventData.selection.length === 1) {
      const entities = eventData.selection.map((item) => item.entity);
      const opening = this.entity = entities[0];
      
      if (opening instanceof HSCore.Model.Opening) {
        if (opening.canAddPocket() && this._hasAxis(opening)) {
          if (this.contextualToolsPlugin.willShowPropertyBarItemsForWeb()) {
            const propertyBarItems = this._getPropertyBarItems();
            eventData.rightPropertyItems.xInsertCollection(3, propertyBarItems);
          }
          
          this._openingSignalHook.listen(opening.signalFieldChanged, this._updatePropertyBar);
        }
      }
    }
  }

  private _onOpenDoor(door: Entity): void {
    if (this._hasAxis(door) && !door.isOpened) {
      this._execute(0, 90, door);
    }
  }

  private _onCloseDoor(door: Entity): void {
    if (this._hasAxis(door) && door.isOpened) {
      this._execute(90, 0, door);
    }
  }

  private _onOpenAllDoors(): void {
    const doors = this._collectDoors();
    doors.forEach((door) => {
      this._onOpenDoor(door);
    });
    
    const HINT_DURATION_MS = 8000;
    LiveHint.show(
      ResourceManager.getString("plugin_opendoor_open_all_doors"),
      HINT_DURATION_MS,
      undefined,
      { canclose: true }
    );
  }

  private _onCloseAllDoors(): void {
    const doors = this._collectDoors();
    doors.forEach((door) => {
      this._onCloseDoor(door);
    });
    
    const HINT_DURATION_MS = 8000;
    LiveHint.show(
      ResourceManager.getString("plugin_opendoor_close_all_doors"),
      HINT_DURATION_MS,
      undefined,
      { canclose: true }
    );
  }

  private _collectDoors(): Entity[] {
    const floorplan = HSApp.App.getApp().floorplan;
    const doors: Entity[] = [];
    
    Object.values(floorplan.contents).forEach((entity) => {
      if (entity instanceof HSCore.Model.Door && !entity.metadata.hasPocket) {
        doors.push(entity);
      }
    });
    
    return doors;
  }

  private _execute(startAngle: number, endAngle: number, door: Entity): void {
    const target: TweenTarget = { value: startAngle };
    const ANIMATION_DURATION_MS = 1000;
    
    new TWEEN.Tween(target)
      .to({ value: endAngle }, ANIMATION_DURATION_MS)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(function(this: TweenTarget) {
        door.open(this.value);
        if (endAngle === 0 && this.value === endAngle) {
          door.close();
        }
      })
      .start();
  }

  private _hasAxis(entity: Entity): boolean {
    try {
      if (entity.metadata.extension?.objInfo?.axis) {
        return true;
      }
    } catch (error) {
      return false;
    }
    return false;
  }
}