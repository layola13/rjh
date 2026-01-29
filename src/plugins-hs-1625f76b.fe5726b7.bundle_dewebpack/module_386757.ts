import HSCore from './HSCore';
import HSApp from './HSApp';
import HSFPConstants from './HSFPConstants';
import ResourceManager from './ResourceManager';
import LiveHint from './LiveHint';
import { ContentPBRMaterialReplaceStyler } from './ContentPBRMaterialReplaceStyler';

interface MaterialData {
  seekId?: string;
  clone(): MaterialData;
}

interface MetadataAttribute {
  id: string;
  values?: Array<{ id: string }>;
}

interface EntityMetadata {
  attributes?: MetadataAttribute[];
}

interface Entity {
  metadata?: EntityMetadata;
  getMaterialList(): Array<[string, MaterialData]>;
  getMaterial(meshName: string): MaterialData | undefined;
}

interface SelectionItem {
  meshName?: string;
}

interface CatalogItem {
  [key: string]: unknown;
}

interface SignalData {
  data?: {
    isShowIndependent?: boolean;
  };
}

interface SelectionChangedEvent {
  [key: string]: unknown;
}

interface CatalogItemClickEvent {
  data: CatalogItem;
}

interface ToolbarItem {
  enable(): void;
  disable(): void;
}

interface Command {
  execute(): void;
}

interface CommandManager {
  current?: Command;
  cancel(): void;
  createCommand(type: string, args: unknown[]): Command | undefined;
  execute(command: Command): void;
  complete(): void;
}

interface SelectionManager {
  signalSelectionChanged: HSCore.Util.Signal;
  unselectAll(): void;
  selected(includeAll: boolean): SelectionItem[];
}

interface ToolbarPlugin {
  addLinkedToolbar(id: string, parent: string, config: unknown): void;
  activateToolbar(id: string): void;
  getItem(name: string, toolbarId: string): ToolbarItem | undefined;
}

interface PluginManager {
  getPlugin(type: string): {
    signalContentMeshSelected: HSCore.Util.Signal;
    enterMaterialBrush(): void;
  };
}

interface App {
  cmdManager: CommandManager;
  selectionManager: SelectionManager;
  pluginManager: PluginManager;
}

interface RightPropertyBarConfig {
  handler: unknown;
  app: App;
  contextualToolsPlugin: unknown;
  catalogPlugin: unknown;
  toolbarPlugin: ToolbarPlugin;
  resizeWidgetPlugin: unknown;
  viewSwitchPlugin: unknown;
}

class RightPropertyBar {
  constructor(config: RightPropertyBarConfig);
  init(entity: Entity): void;
}

const TOOLBAR_RECOVERY_SELECTED_PART_ITEM = 
  'plugin_contentmaterialreplace_toobar_origin_material/plugin_item_recovery_selected_part_material';

export default class ContentMaterialReplaceStyler {
  private readonly _handler: unknown;
  private readonly _app: App;
  private readonly _contextualToolsPlugin: unknown;
  private readonly _catalogPlugin: unknown;
  private readonly _toolbarPlugin: ToolbarPlugin;
  private readonly _resizeWidgetPlugin: unknown;
  private readonly _viewSwitchPlugin: unknown;
  private readonly _toolbarId: string = 'contentmaterialreplace';
  private readonly _signalHook: HSCore.Util.SignalHook;
  private readonly _rightPropertyBar: RightPropertyBar;
  private readonly contentPBRMaterialReplaceStyler: ContentPBRMaterialReplaceStyler;

  public isShow: boolean = true;
  public isMaterialReplaceByDragging: boolean = true;

  private _selectedEntity?: Entity;
  private _oldMaterialdataMap?: Map<string, MaterialData>;
  private _oldRightPropertyBarMap?: unknown;

  constructor(config: RightPropertyBarConfig) {
    this._handler = config.handler;
    this._app = config.app;
    this._contextualToolsPlugin = config.contextualToolsPlugin;
    this._catalogPlugin = config.catalogPlugin;
    this._toolbarPlugin = config.toolbarPlugin;
    this._resizeWidgetPlugin = config.resizeWidgetPlugin;
    this._viewSwitchPlugin = config.viewSwitchPlugin;

    this.initToolbar();

    this._signalHook = new HSCore.Util.SignalHook(this);
    this._rightPropertyBar = new RightPropertyBar(config);
    this.contentPBRMaterialReplaceStyler = new ContentPBRMaterialReplaceStyler();
  }

  public enterStyler(): void {
    this.activateToolbar();
    $('.dialogToolbarTips').show();

    const catalogSignalManager = HSApp.Catalog.CatalogSignalManager.getInstance();
    this._signalHook.listen(catalogSignalManager.signalItemClicked, this.onCatalogItemClick);
    this._signalHook.listen(catalogSignalManager.signalIndependentPanelShow, this._onMaterialReplace);
    this._signalHook.listen(this._app.selectionManager.signalSelectionChanged, this._onSelectionChanged);

    this.initRightBar();

    const whitelabelBenefit = adskUser.checkBenefit('whiteLabel', 'oldMaterialReplace');
    const shouldUsePBR = 
      !(whitelabelBenefit?.useful || HSApp.ABManager.getBucket('abROldMaterialReplace') === 'A') &&
      HSApp.Config.TENANT === 'fp';

    if (shouldUsePBR) {
      const attributes = this._selectedEntity?.metadata?.attributes ?? [];
      if (this.isPBRModel(attributes)) {
        this.contentPBRMaterialReplaceStyler.init(this._selectedEntity!);
      }
    }
  }

  public exitStyler(): void {
    $('.dialogToolbarTips').hide();
    this._signalHook.unlistenAll();
    this._oldMaterialdataMap = undefined;
    this.contentPBRMaterialReplaceStyler?.destroy();
  }

  private _setSelectedEntity(entity: Entity): void {
    this._selectedEntity = entity;
    this.recoreStartMaterial();
  }

  private _onMaterialReplace(event: SignalData): void {
    if (event?.data) {
      this.isMaterialReplaceByDragging = !event.data.isShowIndependent;
    }
  }

  private getMaterialMap(entity: Entity): Map<string, MaterialData> {
    const materialMap = new Map<string, MaterialData>();
    entity.getMaterialList().forEach(([key, material]) => {
      materialMap.set(key, material?.clone());
    });
    return materialMap;
  }

  private recoreStartMaterial(): void {
    this._oldMaterialdataMap = this.getMaterialMap(this._selectedEntity!);
  }

  public onCatalogItemClick(event: CatalogItemClickEvent): void {
    const catalogItem = event.data;
    const cmdManager = this._app.cmdManager;

    if (cmdManager.current) {
      cmdManager.cancel();
    }

    if (this.isMaterialReplaceByDragging) {
      this._app.selectionManager.unselectAll();
      const command = cmdManager.createCommand(
        HSFPConstants.CommandType.ContentMaterialMoveReplace,
        [this._selectedEntity, catalogItem, this]
      );
      if (command) {
        cmdManager.execute(command);
      }
    } else {
      const selectedItem = this._app.selectionManager.selected(false)[0];
      if (!selectedItem) {
        const message = ResourceManager.getString('material_replace_no_selected_livehint');
        LiveHint.show(message, 4500, undefined, { canclose: true });
        return;
      }

      const meshName = selectedItem.meshName;
      if (meshName) {
        const materialData = HSCore.Material.Util.getMaterialData(catalogItem);
        this.commit(meshName, materialData);
      }
    }
  }

  private initRightBar(): void {
    this._rightPropertyBar.init(this._selectedEntity!);
  }

  private _onSelectionChanged(event: SelectionChangedEvent): void {
    const selectedItem = this._app.selectionManager.selected(false)[0];
    const hasValidSelection = !!(selectedItem?.meshName);
    
    this.updateToolbarResetItems([TOOLBAR_RECOVERY_SELECTED_PART_ITEM], [hasValidSelection]);

    if (selectedItem) {
      const meshName = selectedItem.meshName;
      if (meshName) {
        const material = this._selectedEntity!.getMaterial(meshName);
        if (material?.seekId) {
          this._app.pluginManager
            .getPlugin(HSFPConstants.PluginType.ContentMaterialReplace)
            .signalContentMeshSelected.dispatch({ seekId: material.seekId });
        }
      }
    }
  }

  public commit(meshName: string, materialData: MaterialData): void {
    const command = this._app.cmdManager.createCommand(
      HSFPConstants.CommandType.ContentMaterialReplace,
      [this._selectedEntity, meshName, materialData]
    );

    if (command) {
      this._app.cmdManager.execute(command);

      const toolbarItems = [
        'plugin_contentmaterialreplace_toobar_all_recovery',
        'plugin_contentmaterialreplace_toobar_origin_material',
        TOOLBAR_RECOVERY_SELECTED_PART_ITEM
      ];
      this.updateToolbarResetItems(toolbarItems, [true, true]);
    }

    this._app.cmdManager.complete();
  }

  public resetAll(): void {
    const currentMaterialMap = this.getMaterialMap(this._selectedEntity!);

    if (currentMaterialMap.size === this._oldMaterialdataMap!.size) {
      let hasChanges = false;

      for (const [meshName, oldMaterial] of this._oldMaterialdataMap!) {
        const currentMaterial = currentMaterialMap.get(meshName);
        if (!currentMaterial) {
          hasChanges = true;
          break;
        }
        if (oldMaterial.seekId !== currentMaterial.seekId) {
          hasChanges = true;
          break;
        }
      }

      if (!hasChanges) {
        const message = ResourceManager.getString('material_replace_no_changed_livehint');
        LiveHint.show(message, 4500, undefined, { canclose: true });
        return;
      }
    }

    const meshKeys = 
      this._oldMaterialdataMap!.size !== 0 
        ? this._oldMaterialdataMap!.keys() 
        : currentMaterialMap.keys();

    const command = this._app.cmdManager.createCommand(
      HSFPConstants.CommandType.ContentMaterialResetAll,
      [this._selectedEntity, this._oldMaterialdataMap, meshKeys]
    );

    if (command) {
      this._app.cmdManager.execute(command);
      this.updateToolbarResetItems(
        ['plugin_contentmaterialreplace_toobar_all_recovery', 'plugin_contentmaterialreplace_toobar_origin_material'],
        [false, true]
      );
    }

    this._app.cmdManager.complete();
  }

  public resetDefaultMaterial(meshNames?: Iterable<string>): void {
    const emptyMaterialMap = new Map<string, MaterialData>();
    const currentMaterialMap = this.getMaterialMap(this._selectedEntity!);

    if (currentMaterialMap.size === 0) {
      const message = ResourceManager.getString('material_replace_default_material_livehint');
      LiveHint.show(message, 4500, undefined, { canclose: true });
      return;
    }

    const targetMeshNames = meshNames ?? currentMaterialMap.keys();
    const command = this._app.cmdManager.createCommand(
      HSFPConstants.CommandType.ContentMaterialResetAll,
      [this._selectedEntity, emptyMaterialMap, targetMeshNames]
    );

    if (command) {
      this._app.cmdManager.execute(command);
      const updatedMaterialMap = this.getMaterialMap(this._selectedEntity!);
      this.updateToolbarResetItems(
        ['plugin_contentmaterialreplace_toobar_all_recovery', 'plugin_contentmaterialreplace_toobar_origin_material'],
        [true, updatedMaterialMap.size > 0]
      );
    }

    this._app.cmdManager.complete();
  }

  private updateToolbarResetItems(itemNames: string[], enableStates: boolean[]): void {
    itemNames.forEach((itemName, index) => {
      const toolbarItem = this._toolbarPlugin.getItem(itemName, this._toolbarId);
      if (toolbarItem) {
        if (enableStates[index]) {
          toolbarItem.enable();
        } else {
          toolbarItem.disable();
        }
      }
    });
  }

  private initToolbar(): void {
    const toolbarConfig = {
      addItems: [
        [{ name: 'plugin_layeredit_toolbar_divider_1', type: 'divider', order: 101 }, ''],
        [{ type: 'divider', name: 'toolbar_content_styler_divider_2', order: 250 }, ''],
        [
          {
            type: 'button',
            label: ResourceManager.getString('plugin_contentmaterialreplace_toobar_all_recovery'),
            name: 'plugin_contentmaterialreplace_toobar_all_recovery',
            icon: 'hs_toolbar_quanbuhuifu',
            tooltip: ResourceManager.getString('plugin_contentmaterialreplace_toobar_all_recovery'),
            order: 500,
            onclick: () => {
              this.resetAll();
            }
          },
          ''
        ],
        [
          {
            type: 'folder',
            label: ResourceManager.getString('plugin_contentmaterialreplace_toobar_origin_material'),
            name: 'plugin_contentmaterialreplace_toobar_origin_material',
            icon: 'hs_toolbar_chushisucai',
            order: 550,
            submenu: [
              {
                type: 'button',
                label: ResourceManager.getString('plugin_item_recovery_all_material'),
                name: 'plugin_item_recovery_all_material',
                onclick: () => {
                  this.resetDefaultMaterial();
                }
              },
              {
                type: 'button',
                label: ResourceManager.getString('plugin_item_recovery_selected_part_material'),
                name: 'plugin_item_recovery_selected_part_material',
                onclick: () => {
                  const selectedItem = this._app.selectionManager.selected(false)[0];
                  if (selectedItem?.meshName) {
                    this.resetDefaultMaterial([selectedItem.meshName]);
                  }
                }
              }
            ]
          },
          ''
        ],
        [
          {
            type: 'button',
            label: ResourceManager.getString('toolBar_material_brush'),
            name: 'toolBar_material_brush',
            icon: 'hs_toolbar_caizhishua',
            tooltip: ResourceManager.getString('toolBar_material_brush'),
            order: 600,
            command: HSFPConstants.CommandType.MaterialBrush,
            hotkey: {
              win: ['b', 'ctrl+b'],
              mac: ['b', 'meta+b']
            },
            onclick: () => {
              HSApp.App.getApp().pluginManager
                .getPlugin(HSFPConstants.PluginType.MaterialBrush)
                .enterMaterialBrush();
            }
          },
          ''
        ]
      ],
      includeItems: ['toolBar_undo', 'toolBar_redo']
    };

    this._toolbarPlugin.addLinkedToolbar(this._toolbarId, 'default', toolbarConfig);
  }

  public showRightBar(): void {
    this.isShow = true;
  }

  public hideRightBar(): void {
    this.isShow = false;
  }

  public activateToolbar(): void {
    this._toolbarPlugin.activateToolbar(this._toolbarId);

    const enableStates: boolean[] = [false, true, false];

    if (this._oldMaterialdataMap!.size === 0) {
      enableStates[1] = false;
    }

    const selectedItem = this._app.selectionManager.selected(false)[0];
    if (selectedItem?.meshName) {
      enableStates[2] = true;
    }

    this.updateToolbarResetItems(
      [
        'plugin_contentmaterialreplace_toobar_all_recovery',
        'plugin_contentmaterialreplace_toobar_origin_material',
        TOOLBAR_RECOVERY_SELECTED_PART_ITEM
      ],
      enableStates
    );
  }

  private isPBRModel(attributes: MetadataAttribute[]): boolean {
    const gltfAttribute = attributes.find(attr => attr.id === 'attr-gltf-app-status');

    if (gltfAttribute) {
      const hasActiveGltf = gltfAttribute.values?.find(
        value => value.id === 'attr-gltf-app-status-active'
      );

      if (hasActiveGltf) {
        const mdlAttribute = attributes.find(attr => attr.id === 'attr-mdl-app-status');
        if (mdlAttribute) {
          const hasActiveMdl = mdlAttribute.values?.find(
            value => value.id === 'attr-mdl-app-status-active'
          );
          if (hasActiveMdl) {
            return true;
          }
        }
      }
    }

    return false;
  }
}