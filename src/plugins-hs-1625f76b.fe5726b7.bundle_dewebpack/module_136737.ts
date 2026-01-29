import { HSCore } from './635589';
import { HSFPConstants } from './constants';
import { ResourceManager } from './resource-manager';
import noChoiceIcon from './898651';
import defaultTexture from './943576';

interface Handler {
  getSelectMeshName(): string | undefined;
  setSelectMeshName(name: string): void;
  getContentPartIds(): string[];
  getContentPartsData(): ContentPartData[] | undefined;
  changeSelectPart(partId: string | undefined): void;
  getMaterialList(params: Record<string, unknown>): Promise<void>;
  getCurrMaterialList(): unknown[];
  getFolderTreeList(): unknown[];
}

interface ContentPartData {
  modelPartId: string;
  modelPartName: string;
}

interface CatalogPlugin {
  closeIndependent(): void;
  openIndependentPanel(config: CatalogPanelConfig, id: string): void;
}

interface CatalogPanelConfig {
  mydata: {
    modelSearchFilter: {
      sceneType: number;
    };
    types: number;
  };
  isKeepCategory: boolean;
  notFilter: boolean;
  uiControl: {
    type: string;
  };
  supportEnterpriseCategory: boolean;
  excludeType: number;
  sceneType: number;
  isSimplify: boolean;
  isShowSearchBox: boolean;
  contentData: unknown[];
  searchBoxFunc: (params: Record<string, unknown>) => Promise<void>;
  folderTreeList: unknown[];
  showFolder: boolean;
}

interface RightPropertyBarPlugin {
  signalPopulatePropertyBar: unknown;
}

interface CommandManager {
  current?: Command;
  receive(message: CommandMessage): void;
  createCommand(type: string, params: unknown[]): Command;
  execute(command: Command): void;
  complete(command?: Command): void;
  cancel(): void;
}

interface Command {
  type: string;
  showGizmo?: boolean;
}

interface CommandMessage {
  msg: string;
  data: {
    rotation: number;
    percentOffsetX: number;
    percentOffsetY: number;
    scalingTileSize_x: number;
    scalingTileSize_y: number;
  };
}

interface Entity {
  getMaterial(meshName: string): Material | undefined;
}

interface Material {
  name?: string;
  textureURI?: string;
  scalingTileSize_x: number;
  scalingTileSize_y: number;
  rotation: number;
  percentOffsetX: number;
  percentOffsetY: number;
  colorMode: number;
  blendColor?: string;
  clone(): Material;
}

interface PropertyBarEvent {
  data: PropertyBarItem[];
}

interface PropertyBarItem {
  id?: string;
  type: string;
  label?: string;
  enableDetailsInfo?: boolean;
  items?: PropertyBarItem[];
  order?: number;
  className?: string;
  parentId?: string;
  data?: unknown;
}

interface ResetAllParams {
  scalingTileSize_x: number;
  scalingTileSize_y: number;
  rotation: number;
  percentOffsetX: number;
  percentOffsetY: number;
}

interface ScaleMessage {
  data: {
    scalingTileSize_x?: number;
    scalingTileSize_y?: number;
  };
}

interface ConstructorParams {
  handler: Handler;
  catalogPlugin: CatalogPlugin;
  rightPropertyBarPlugin: RightPropertyBarPlugin;
}

interface MaterialPropertyParam {
  blendRadioOnCheck: (value: unknown) => void;
  wallpaperOnClick: () => Promise<void>;
  colorModeOnClick: () => void;
  colorOnValueChange: (color: string) => void;
}

interface FaceMaterialPropertyBarConfig {
  entity: Entity;
  material: Material;
  secondNodeId: string;
  propertyParam: {
    material: MaterialPropertyParam;
  };
}

export default class ContentPartMaterialController {
  private lock: boolean = false;
  private handler: Handler;
  private cmdMgr: CommandManager;
  private entity!: Entity;
  private catalogPlugin: CatalogPlugin;
  private rightPropertyBarPlugin: RightPropertyBarPlugin;
  private signalHook: HSCore.Util.SignalHook;
  private cmd?: Command;

  constructor(params: ConstructorParams) {
    this.handler = params.handler;
    this.catalogPlugin = params.catalogPlugin;
    this.cmdMgr = HSApp.App.getApp().cmdManager;
    this.rightPropertyBarPlugin = params.rightPropertyBarPlugin;
    this.signalHook = new HSCore.Util.SignalHook(this);
  }

  public init(entity: Entity): void {
    this.entity = entity;
    this.signalHook.listen(
      this.rightPropertyBarPlugin.signalPopulatePropertyBar,
      this.onPopulateRightPropertyBarV2.bind(this)
    );
  }

  private onPopulateRightPropertyBarV2(event: PropertyBarEvent): void {
    if (HSApp.App.getApp().activeEnvironmentId === HSFPConstants.Environment.ContentPartMaterialReplace) {
      const selected = HSApp.App.getApp().selectionManager.selected(false);
      const meshName = selected?.[0]?.meshName ?? this.handler.getSelectMeshName();
      const contentPartIds = this.handler.getContentPartIds();

      if (!meshName || !contentPartIds.includes(meshName)) {
        event.data.push({
          type: HSFPConstants.PropertyBarType.PropertyBar,
          label: ResourceManager.getString('plugin_right_propertybar_attribute_bar'),
          enableDetailsInfo: true
        });
        this.setNoChoiceItems(event.data);
        return;
      }

      event.data.length = 0;
      this.handler.setSelectMeshName(meshName);

      const material = this.entity.getMaterial(meshName);
      event.data.push(
        {
          type: HSFPConstants.PropertyBarType.PropertyBar,
          label: material?.name ?? ResourceManager.getString('plugin_right_propertybar_attribute_bar'),
          enableDetailsInfo: true
        },
        {
          id: 'face-style-setting',
          label: ResourceManager.getString('plugin_propertybar_style_setting'),
          type: HSFPConstants.PropertyBarType.FirstLevelNode,
          items: [],
          order: 20,
          className: 'face-style-setting'
        }
      );

      const partPropertyItems = this.getPartPropertyItems();
      event.data.push(partPropertyItems);

      const sizeCardItems = this.initPropertyBarSizeCardItemsV2(meshName);
      if (sizeCardItems.length) {
        event.data.push(...sizeCardItems);
      }
    }
  }

  private getPartPropertyItems(): PropertyBarItem {
    const contentPartsData = this.handler.getContentPartsData();
    const options = contentPartsData?.map((part) => ({
      id: part?.modelPartId,
      label: part?.modelPartName
    }));

    return {
      id: 'partreplace',
      type: HSFPConstants.PropertyBarType.DropdownList,
      parentId: 'face-style-setting',
      order: 190,
      data: {
        options,
        defaultKey: this.handler.getSelectMeshName(),
        title: ResourceManager.getString('content_partreplace_select'),
        onChange: (selectedId: string) => {
          const selectedPart = contentPartsData?.find((part) => selectedId === part.modelPartId);
          this.handler.changeSelectPart(selectedPart?.modelPartId);
        }
      }
    };
  }

  private setNoChoiceItems(items: PropertyBarItem[]): void {
    const firstLevelNode: PropertyBarItem = {
      id: 'parameter-setting-first-level',
      label: ResourceManager.getString('plugin_propertybar_parameter_setting'),
      type: HSFPConstants.PropertyBarType.FirstLevelNode,
      items: [],
      order: 1,
      className: 'parameter-setting-first-level'
    };
    items.push(firstLevelNode);

    const hint = ResourceManager.getString('plugin_right_propertybar_none_select');
    const noChoiceItem: PropertyBarItem = {
      id: 'noneChoice',
      parentId: 'parameter-setting-first-level',
      type: HSFPConstants.PropertyBarType.NoChoice,
      order: 10,
      data: {
        src: noChoiceIcon,
        hint,
        className: 'noneChoice'
      }
    };
    items.push(noChoiceItem);
  }

  private createEditMaterialCmdFunc(): void {
    if (this.cmdMgr.current) {
      if (this.cmdMgr.current.type === HSFPConstants.CommandType.CmdContentMaterialChangeUV) {
        return;
      }
      this.cmdMgr.cancel();
    }

    const meshName = this.handler.getSelectMeshName()!;
    this.cmd = this.cmdMgr.createCommand(HSFPConstants.CommandType.CmdContentMaterialChangeUV, [
      this.entity,
      meshName
    ]);
    this.cmd.showGizmo = false;
    this.cmdMgr.execute(this.cmd);
  }

  private endEditMaterialCmd(): void {
    this.cmdMgr.complete(this.cmd);
  }

  public resetAll(params: ResetAllParams, meshName: string): void {
    const { scalingTileSize_x, scalingTileSize_y, rotation, percentOffsetX, percentOffsetY } = params;

    if (!this.entity.getMaterial(meshName)) {
      return;
    }

    this.createEditMaterialCmdFunc();
    this.cmdMgr.receive({
      msg: 'changeUV',
      data: {
        rotation,
        percentOffsetX,
        percentOffsetY,
        scalingTileSize_x,
        scalingTileSize_y
      }
    });
    this.endEditMaterialCmd();
  }

  public toggleLock(): void {
    this.lock = !this.lock;
    HSApp.App.getApp().signalContextualtoolRefresh.dispatch();
  }

  public buildScaleDataFunc(message: ScaleMessage, meshName: string): ScaleMessage {
    if (!this.lock) {
      return message;
    }

    const material = this.entity.getMaterial(meshName)!;
    const aspectRatio = material.scalingTileSize_x / material.scalingTileSize_y;
    const { scalingTileSize_x, scalingTileSize_y } = message.data;

    const MIN_SCALE = 0.1;
    const MAX_SCALE = 10;

    if (scalingTileSize_x !== undefined) {
      let newX = scalingTileSize_x;
      let newY = scalingTileSize_x / aspectRatio;

      if (newY > MAX_SCALE) {
        newY = MAX_SCALE;
        newX = newY * aspectRatio;
      } else if (newY <= MIN_SCALE) {
        newY = MIN_SCALE;
        newX = newY * aspectRatio;
      }

      message.data.scalingTileSize_x = newX;
      message.data.scalingTileSize_y = newY;
    } else if (scalingTileSize_y !== undefined) {
      let newY = scalingTileSize_y;
      let newX = scalingTileSize_y * aspectRatio;

      if (newX > MAX_SCALE) {
        newX = MAX_SCALE;
        newY = newX / aspectRatio;
      } else if (newX <= MIN_SCALE) {
        newX = MIN_SCALE;
        newY = newX / aspectRatio;
      }

      message.data.scalingTileSize_x = newX;
      message.data.scalingTileSize_y = newY;
    }

    return message;
  }

  private initPropertyBarSizeCardItemsV2(meshName: string): PropertyBarItem[] {
    const rootNode: PropertyBarItem = {
      id: 'sizecard',
      label: '',
      items: []
    };

    let material = this.entity.getMaterial(meshName);
    if (!material) {
      material = new HSCore.Material.Material();
      material.textureURI = defaultTexture;
    }

    const app = HSApp.App.getApp();

    const replaceMaterial = (newMaterial: Material): void => {
      const command = this.cmdMgr.createCommand(HSFPConstants.CommandType.ContentMaterialReplace, [
        this.entity,
        meshName,
        newMaterial
      ]);

      if (command) {
        this.cmdMgr.execute(command);
        this.cmdMgr.complete();
        app.signalContextualtoolRefresh.dispatch({ forceUpdate: true });
        app.signalPropertyBarRefresh.dispatch();
      }
    };

    const materialPropertyParam: MaterialPropertyParam = {
      blendRadioOnCheck: (value: unknown) => {
        const colorMode = HSApp.Util.ColorModeUtil.getColorModeCheckBoxValue(value);
        const clonedMaterial = material!.clone();
        clonedMaterial.colorMode = colorMode;
        replaceMaterial(clonedMaterial);
      },

      wallpaperOnClick: async () => {
        await this.handler.getMaterialList({});
        const currMaterialList = this.handler.getCurrMaterialList();
        const folderTreeList = this.handler.getFolderTreeList();

        const config: CatalogPanelConfig = {
          mydata: {
            modelSearchFilter: {
              sceneType: HSApp.Catalog.DataConfig.SceneType.Material
            },
            types: HSCore.HSCatalog.CategoryTypeEnum.SC_Cornice_Material
          },
          isKeepCategory: false,
          notFilter: true,
          uiControl: {
            type: 'pickMaterial'
          },
          supportEnterpriseCategory: true,
          excludeType: HSCore.HSCatalog.CategoryTypeEnum.ext_mixpaint_material_exclude,
          sceneType: HSApp.Catalog.DataConfig.SceneType.Material,
          isSimplify: true,
          isShowSearchBox: true,
          contentData: currMaterialList,
          searchBoxFunc: (params: Record<string, unknown>) => this.handler.getMaterialList(params),
          folderTreeList,
          showFolder: true
        };

        this.catalogPlugin.closeIndependent();
        this.catalogPlugin.openIndependentPanel(config, '20a3b3c7-e75c-4b34-ba02-aa9c0446d2dd');
      },

      colorModeOnClick: () => {
        const newColorMode = HSCore.Material.Util.isUseBlendOfMaterial(material!)
          ? HSCore.Material.ColorModeEnum.texture
          : HSCore.Material.ColorModeEnum.blend;
        const clonedMaterial = material!.clone();
        clonedMaterial.colorMode = newColorMode;
        replaceMaterial(clonedMaterial);
      },

      colorOnValueChange: (color: string) => {
        const blendColorMode = HSCore.Material.ColorModeEnum.blend;
        const clonedMaterial = material!.clone();
        clonedMaterial.colorMode = blendColorMode;
        clonedMaterial.blendColor = color;
        replaceMaterial(clonedMaterial);
      }
    };

    const faceMaterialConfig: FaceMaterialPropertyBarConfig = {
      entity: this.entity,
      material,
      secondNodeId: 'face-style-setting-color-con',
      propertyParam: {
        material: materialPropertyParam
      }
    };

    const facePropertyBarItems = HSApp.PaintPluginHelper.Pave.MixPaintPluginHelper.getFaceMaterialPropertyBarItems(
      faceMaterialConfig
    );

    const secondLevelNode: PropertyBarItem = {
      id: 'face-style-setting-color-con',
      parentId: 'face-style-setting',
      label: ResourceManager.getString('plugin_right_propertybar_material'),
      order: 200,
      type: HSFPConstants.PropertyBarType.SecondLevelNode,
      items: facePropertyBarItems
    };

    rootNode.items!.push(secondLevelNode);
    return rootNode.items!;
  }
}