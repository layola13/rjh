interface App {
  cmdManager: CommandManager;
  secondaryActiveView?: View;
}

interface CommandManager {
  current: unknown;
  cancel(): void;
  createCommand(type: string, args: unknown[]): Command | null;
  execute(command: Command): void;
  complete(): void;
}

interface Command {}

interface View {
  hide(): void;
  show(): void;
}

interface Plugin {
  hide(): void;
  show(): void;
  animateHide(): void;
  animateShow(): void;
  toggleCatalog(visible: boolean): void;
  hideStatusBar(): void;
  showStatusBar(): void;
  beforeEnterEnv(btn: PageHeaderButton, position: string): void;
  afterOuterEnv(): void;
  getItem(name: string, toolbarId: string): ToolbarItem | null;
  addLinkedToolbar(id: string, parent: string, config: ToolbarConfig): void;
  activateToolbar(id: string): void;
}

interface ToolbarItem {
  enable(): void;
  disable(): void;
}

interface ToolbarConfig {
  addItems: Array<[ToolbarItemConfig, string]>;
  includeItems: string[];
}

interface ToolbarItemConfig {
  type: string;
  name: string;
  order: number;
  label?: string;
  icon?: string;
  tooltip?: string;
  onclick?: (item: ToolbarItem) => void;
}

interface MenuPlugin {
  signalPopulateCustomizedItems: Signal;
}

interface CatalogPlugin extends Plugin {
  signalItemClicked: Signal;
}

interface Signal {}

interface SignalData {
  data: {
    defaultItems?: unknown[];
  };
}

interface CatalogItemData {
  data: unknown;
}

interface Entity {
  getMaterialList(): Array<[string, Material | null]>;
}

interface Material {
  seekId: string;
  clone(): Material;
}

interface Handler {
  exitStyler(): void;
  getSelectMeshName(): string | null;
}

interface PageHeaderButton {
  getRenderItem(): React.ReactElement;
}

interface PageHeaderData {
  envName: string;
  secondName: string;
  secondClass: string;
  handleClick(): void;
}

interface RightPropertyBarConfig {
  app: App;
  handler: Handler;
  menuPlugin: MenuPlugin;
  toolbarPlugin: Plugin;
  catalogPlugin: CatalogPlugin;
  pageheaderPlugin: Plugin;
  viewSwitchPlugin: Plugin;
  resizeWidgetPlugin: Plugin;
  contextualToolsPlugin: Plugin;
}

class RightPropertyBar {
  constructor(config: RightPropertyBarConfig) {}
  init(entity: Entity | undefined): void {}
}

class ContentMaterialReplaceStyler {
  private app: App;
  private camera: unknown;
  private session: unknown;
  private context: unknown;
  private auxCanvas: unknown;
  private gizmoManager: unknown;
  private toolbarPlugin: Plugin;
  private catalogPlugin: CatalogPlugin;
  private pageHeaderPlugin: Plugin;
  private viewSwitchPlugin: Plugin;
  private resizeWidgetPlugin: Plugin;
  private contextualToolsPlugin: Plugin;
  private handler: Handler;
  private toolbarId: string;
  private rightPropertyBar: RightPropertyBar;
  private signalHook: unknown;
  private selectedEntity: Entity | undefined;
  private menuPlugin: MenuPlugin;
  private oldMateriaDataMap: Map<string, Material> | undefined;

  constructor(config: RightPropertyBarConfig) {
    this.app = config.app;
    this.handler = config.handler;
    this.menuPlugin = config.menuPlugin;
    this.toolbarPlugin = config.toolbarPlugin;
    this.catalogPlugin = config.catalogPlugin;
    this.pageHeaderPlugin = config.pageheaderPlugin;
    this.viewSwitchPlugin = config.viewSwitchPlugin;
    this.resizeWidgetPlugin = config.resizeWidgetPlugin;
    this.contextualToolsPlugin = config.contextualToolsPlugin;
    this.toolbarId = (window as any).HSFPConstants.Environment.ContentPartMaterialReplace;
    this.selectedEntity = undefined;
    this.oldMateriaDataMap = undefined;
    this.signalHook = new (window as any).HSCore.Util.SignalHook(this);
    this.rightPropertyBar = new RightPropertyBar(config);
    this.initToolbar();
  }

  enterStyler(): void {
    this.hideUIView();
    this.activateToolbar();
    this.rightPropertyBar.init(this.selectedEntity);
    this.pageHeaderPlugin.beforeEnterEnv(this.getPageHeaderCompleteBtn(), "left");
    (this.signalHook as any)
      .listen(this.catalogPlugin.signalItemClicked, this.onCatalogItemClick)
      .listen(this.menuPlugin.signalPopulateCustomizedItems, this.onPopulateLeftMenu);
  }

  exitStyler(): void {
    this.showUIView();
    this.pageHeaderPlugin.afterOuterEnv();
    (this.signalHook as any).unlistenAll();
    this.oldMateriaDataMap = undefined;
  }

  hideUIView(): void {
    ($(".dialogToolbarTips") as any).show();
    this.viewSwitchPlugin.hide();
    this.resizeWidgetPlugin.animateHide();
    this.app.secondaryActiveView?.hide();
    this.contextualToolsPlugin.hideStatusBar();
    this.catalogPlugin.toggleCatalog(false);
  }

  showUIView(): void {
    this.viewSwitchPlugin.show();
    this.app.secondaryActiveView?.show();
    this.resizeWidgetPlugin.animateShow();
    this.contextualToolsPlugin.showStatusBar();
    this.catalogPlugin.toggleCatalog(true);
    ($(".dialogToolbarTips") as any).hide();
  }

  setSelectedEntity(entity: Entity): void {
    this.selectedEntity = entity;
    this.recordStartMaterial();
  }

  onPopulateLeftMenu(event: SignalData): void {
    event.data.defaultItems = [];
  }

  getMaterialMap(entity: Entity): Map<string, Material> {
    const materialMap = new Map<string, Material>();
    entity.getMaterialList().forEach(([meshName, material]) => {
      materialMap.set(meshName, material?.clone() as Material);
    });
    return materialMap;
  }

  recordStartMaterial(): void {
    if (!this.selectedEntity) return;
    this.oldMateriaDataMap = this.getMaterialMap(this.selectedEntity);
  }

  onCatalogItemClick(event: CatalogItemData): void {
    const itemData = event.data;
    const cmdManager = this.app.cmdManager;
    if (cmdManager.current) {
      cmdManager.cancel();
    }
    const selectedMeshName = this.handler.getSelectMeshName();
    if (selectedMeshName) {
      const materialData = (window as any).HSCore.Material.Util.getMaterialData(itemData);
      this.commit(selectedMeshName, materialData);
    } else {
      const hintMessage = (window as any).ResourceManager.getString("material_replace_no_selected_livehint");
      (window as any).LiveHint.show(hintMessage, 3500, undefined, { canclose: true });
    }
  }

  commit(meshName: string, materialData: unknown): void {
    const command = this.app.cmdManager.createCommand(
      (window as any).HSFPConstants.CommandType.ContentMaterialReplace,
      [this.selectedEntity, meshName, materialData]
    );
    if (command) {
      this.app.cmdManager.execute(command);
      this.updateToolbarResetItems(["plugin_contentmaterialreplace_toobar_all_recovery"], [true]);
    }
    this.app.cmdManager.complete();
  }

  resetAll(): void {
    if (!this.selectedEntity || !this.oldMateriaDataMap) return;

    const currentMaterialMap = this.getMaterialMap(this.selectedEntity);
    if (currentMaterialMap.size === this.oldMateriaDataMap.size) {
      let hasNoChanges = true;
      for (const [meshName, oldMaterial] of this.oldMateriaDataMap) {
        const currentMaterial = currentMaterialMap.get(meshName);
        if (!currentMaterial) {
          hasNoChanges = false;
          break;
        }
        if (oldMaterial.seekId !== currentMaterial.seekId) {
          hasNoChanges = false;
          break;
        }
      }
      if (hasNoChanges) {
        const hintMessage = (window as any).ResourceManager.getString("material_replace_no_changed_livehint");
        (window as any).LiveHint.show(hintMessage, 4500, undefined, { canclose: true });
        return;
      }
    }

    const meshNames = this.oldMateriaDataMap.size !== 0 
      ? this.oldMateriaDataMap.keys() 
      : currentMaterialMap.keys();
    const command = this.app.cmdManager.createCommand(
      (window as any).HSFPConstants.CommandType.ContentMaterialResetAll,
      [this.selectedEntity, this.oldMateriaDataMap, meshNames]
    );
    if (command) {
      this.app.cmdManager.execute(command);
      this.updateToolbarResetItems(["plugin_contentmaterialreplace_toobar_all_recovery"], [false]);
    }
    this.app.cmdManager.complete();
  }

  resetDefaultMaterial(meshNames?: Iterable<string>): void {
    if (!this.selectedEntity) return;

    const emptyMaterialMap = new Map<string, Material>();
    const currentMaterialMap = this.getMaterialMap(this.selectedEntity);
    if (currentMaterialMap.size !== 0) {
      const targetMeshNames = meshNames || currentMaterialMap.keys();
      const command = this.app.cmdManager.createCommand(
        (window as any).HSFPConstants.CommandType.ContentMaterialResetAll,
        [this.selectedEntity, emptyMaterialMap, targetMeshNames]
      );
      if (command) {
        this.app.cmdManager.execute(command);
        this.updateToolbarResetItems(["plugin_contentmaterialreplace_toobar_all_recovery"], [false]);
      }
      this.app.cmdManager.complete();
    } else {
      const hintMessage = (window as any).ResourceManager.getString("material_replace_default_material_livehint");
      (window as any).LiveHint.show(hintMessage, 4500, undefined, { canclose: true });
    }
  }

  updateToolbarResetItems(itemNames: string[], enabledStates: boolean[]): void {
    itemNames.forEach((itemName, index) => {
      const toolbarItem = this.toolbarPlugin.getItem(itemName, this.toolbarId);
      if (toolbarItem) {
        if (enabledStates[index]) {
          toolbarItem.enable();
        } else {
          toolbarItem.disable();
        }
      }
    });
  }

  initToolbar(): void {
    const toolbarConfig: ToolbarConfig = {
      addItems: [
        [
          {
            type: "divider",
            name: "toolbar_content_styler_divider_2",
            order: 250
          },
          ""
        ],
        [
          {
            type: "button",
            label: (window as any).ResourceManager.getString("plugin_contentmaterialreplace_toobar_all_recovery"),
            name: "plugin_contentmaterialreplace_toobar_all_recovery",
            icon: "hs_toolbar_quanbuhuifu",
            tooltip: (window as any).ResourceManager.getString("plugin_contentmaterialreplace_toobar_all_recovery"),
            order: 500,
            onclick: () => {
              this.resetAll();
            }
          },
          ""
        ]
      ],
      includeItems: ["toolBar_undo", "toolBar_redo"]
    };
    this.toolbarPlugin.addLinkedToolbar(this.toolbarId, "default", toolbarConfig);
  }

  activateToolbar(): void {
    this.toolbarPlugin.activateToolbar(this.toolbarId);
    this.updateToolbarResetItems(["plugin_contentmaterialreplace_toobar_all_recovery"], [false]);
  }

  getPageHeaderCompleteBtn(): PageHeaderButton {
    const PageHeaderComponent = (window as any).PageHeaderComponent;
    const buttonData: PageHeaderData = {
      envName: (window as any).ResourceManager.getString("content_contextmenu_part_material_replace_done"),
      secondName: (window as any).ResourceManager.getString("content_contextmenu_part_material_replace_done_second_name"),
      secondClass: "customized_second_name",
      handleClick: () => {
        this.handler.exitStyler();
      }
    };
    return {
      getRenderItem: () => {
        return (window as any).React.createElement(PageHeaderComponent, { data: buttonData }, " ");
      }
    };
  }
}

export default function createContentMaterialReplaceStyler(): typeof ContentMaterialReplaceStyler {
  return ContentMaterialReplaceStyler;
}