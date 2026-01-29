interface MoldingLabelConfig {
  default: string;
  baseBoard: string;
  mitre: string;
}

interface LabelConfigMap {
  moldingWidth: MoldingLabelConfig;
  moldingHeight: MoldingLabelConfig;
}

interface MoldingOptions {
  faceType?: HSCore.Model.WallFaceType;
  entity: any;
  cmdMgr: any;
  getMoldingParam: (arg1: undefined, arg2: any) => MoldingParam;
  changeWallMoldingType: (entity: any) => void;
  applyToAll: (moldingType: HSCore.Model.MoldingTypeEnum) => void;
  applyToAllRooms: (moldingType: HSCore.Model.MoldingTypeEnum) => void;
  clearToAll: (moldingType: HSCore.Model.MoldingTypeEnum) => void;
  clearToAllRooms: (moldingType: HSCore.Model.MoldingTypeEnum) => void;
}

interface MoldingParam {
  baseboardType?: string;
  gypsum?: string;
  baseboardTexture?: any;
  gypsumTexture?: any;
  baseboardColor?: string;
  gypsumColor?: string;
}

interface PropertyBarConfig {
  isBaseboard?: boolean;
  isCornice?: boolean;
  isMitre?: boolean;
}

interface PropertyBarItem {
  id: string;
  parentId?: string;
  label?: string;
  type: string;
  items?: any[];
  order: number;
  uiMode?: string[];
  data?: any;
  resetItem?: any;
}

interface ValueChangeEvent {
  detail: {
    value: number;
  };
}

export function getMoldingItemsV2(
  face: any,
  config: PropertyBarConfig,
  options: MoldingOptions
): PropertyBarItem[] {
  if (face) {
    const master = face.getMaster();
    
    if (
      !(master instanceof HSCore.Model.Wall ||
        master instanceof HSCore.Model.NCustomizedStructure ||
        master instanceof HSCore.Model.NCustomizedBeam)
    ) {
      return [];
    }
    
    options.faceType = master.getFaceType(face);
    const faceType = options.faceType;
    
    const validFaceTypes = [
      HSCore.Model.WallFaceType.left,
      HSCore.Model.WallFaceType.right,
      HSCore.Model.WallFaceType.front,
      HSCore.Model.WallFaceType.back
    ];
    
    if (!validFaceTypes.includes(faceType)) {
      return [];
    }
  }
  
  const entity = options.entity;
  const items: PropertyBarItem[] = [];
  const moldingParam = options.getMoldingParam(undefined, entity);
  
  items.push(
    {
      id: "wallline-first-level-parameter",
      label: ResourceManager.getString("plugin_propertybar_parameter_setting"),
      type: HSFPConstants.PropertyBarType.FirstLevelNode,
      items: [],
      order: 1,
      uiMode: [HSFPConstants.UIMode.layoutDesignMode]
    },
    {
      id: "wallline-first-level-style",
      label: ResourceManager.getString("plugin_propertybar_style_setting"),
      type: HSFPConstants.PropertyBarType.FirstLevelNode,
      items: [],
      order: 2
    }
  );
  
  items.push(
    {
      id: "wallline-base-property",
      parentId: "wallline-first-level-parameter",
      label: ResourceManager.getString("plugin_propertybar_base_property"),
      type: HSFPConstants.PropertyBarType.SecondLevelNode,
      items: [],
      resetItem: {
        text: ResourceManager.getString("plugin_scalecontent_recover"),
        onResetClick: () => {
          const app = HSApp.App.getApp();
          const commandManager = app.cmdManager;
          const resetCommand = commandManager.createCommand(
            HSFPConstants.CommandType.ResetWallMolding,
            [entity]
          );
          commandManager.execute(resetCommand);
          commandManager.receive("changeWidth", entity.XLength);
          commandManager.receive("changeHeight", entity.YLength);
          commandManager.complete();
        }
      },
      order: 1,
      uiMode: [HSFPConstants.UIMode.layoutDesignMode]
    },
    {
      id: "wallline-base-property-width",
      parentId: "wallline-base-property",
      type: HSFPConstants.PropertyBarType.SliderInput,
      order: 240,
      uiMode: [HSFPConstants.UIMode.layoutDesignMode],
      data: {
        label: getMoldingLabel(config, "moldingWidth"),
        options: {
          rules: {
            range: {
              min: HSConstants.Constants.DEFAULT_MOLDING_PARAM.MIN_HEIGHT,
              max: HSConstants.Constants.DEFAULT_MOLDING_PARAM.MAX_HEIGHT
            },
            positiveOnly: true
          },
          includeUnit: true,
          readOnly: false
        },
        value: entity.thickness,
        onValueChangeStart: () => {
          executeCmd(options.cmdMgr, HSFPConstants.CommandType.ChangeMoldingWidth, entity);
        },
        onValueChange: (event: ValueChangeEvent) => {
          options.cmdMgr.receive("changeWidth", event.detail.value);
        },
        onValueChangeEnd: () => {
          options.cmdMgr.complete();
        }
      }
    },
    {
      id: "wallline-base-property-height",
      parentId: "wallline-base-property",
      type: HSFPConstants.PropertyBarType.SliderInput,
      order: 260,
      uiMode: [HSFPConstants.UIMode.layoutDesignMode],
      data: {
        label: getMoldingLabel(config, "moldingHeight"),
        options: {
          rules: {
            range: {
              min: HSConstants.Constants.DEFAULT_MOLDING_PARAM.MIN_HEIGHT,
              max: HSConstants.Constants.DEFAULT_MOLDING_PARAM.MAX_HEIGHT
            },
            positiveOnly: true
          },
          includeUnit: true,
          readOnly: false
        },
        value: entity.height,
        onValueChangeStart: () => {
          executeCmd(options.cmdMgr, HSFPConstants.CommandType.ChangeMoldingHeight, entity);
        },
        onValueChange: (event: ValueChangeEvent) => {
          options.cmdMgr.receive("changeHeight", event.detail.value);
        },
        onValueChangeEnd: () => {
          options.cmdMgr.complete();
        }
      }
    }
  );
  
  if (config.isCornice) {
    items.push({
      id: "applyCorniceToAllWalls",
      parentId: "wallline-base-property",
      type: HSFPConstants.PropertyBarType.Button,
      order: 270,
      uiMode: [HSFPConstants.UIMode.layoutDesignMode],
      data: {
        text: ResourceManager.getString("plugin_wallstyle_applyAll_cornice"),
        onClick: (event: Event) => {
          options.applyToAll(HSCore.Model.MoldingTypeEnum.Cornice);
          event?.stopPropagation();
        }
      }
    });
  }
  
  if (config.isBaseboard) {
    items.push(
      {
        id: "baseboardActions-apply",
        type: HSFPConstants.PropertyBarType.MultiSelectButton,
        parentId: "wallline-base-property",
        order: 271,
        data: {
          type: 1,
          theme: "normal",
          placement: "top",
          list: [
            {
              id: "applyBaseboardToAllWalls",
              label: ResourceManager.getString("plugin_wallstyle_applyAll_cur_room_baseboard"),
              level: 1,
              order: 1,
              onClick: () => {
                options.applyToAll(HSCore.Model.MoldingTypeEnum.Baseboard);
              }
            },
            {
              id: "applyBaseboardToAllRoomWalls",
              label: ResourceManager.getString("plugin_wallstyle_applyAll_all_room_baseboard"),
              level: 1,
              order: 2,
              onClick: () => {
                options.applyToAllRooms(HSCore.Model.MoldingTypeEnum.Baseboard);
              }
            }
          ]
        }
      },
      {
        id: "baseboardActions-clear",
        type: HSFPConstants.PropertyBarType.MultiSelectButton,
        parentId: "wallline-base-property",
        order: 272,
        data: {
          type: 1,
          theme: "normal",
          placement: "top",
          list: [
            {
              id: "clearBaseboardToAllWalls",
              label: ResourceManager.getString("plugin_wallstyle_clearAll_cur_room_baseboard"),
              level: 1,
              order: 1,
              onClick: () => {
                options.clearToAll(HSCore.Model.MoldingTypeEnum.Baseboard);
              }
            },
            {
              id: "clearBaseboardToAllRoomWalls",
              label: ResourceManager.getString("plugin_wallstyle_clearAll_all_room_baseboard"),
              level: 1,
              order: 2,
              onClick: () => {
                options.clearToAllRooms(HSCore.Model.MoldingTypeEnum.Baseboard);
              }
            }
          ]
        }
      },
      {
        id: "wallline-base-installation-style",
        parentId: "wallline-base-style",
        type: HSFPConstants.PropertyBarType.RadioButton,
        label: ResourceManager.getString("customized_products_generate_draw_install_type"),
        order: 5,
        data: {
          label: ResourceManager.getString("customized_products_generate_draw_install_type"),
          defaultValue: entity.offset > 0 ? "plugin_wallstyle_embedded" : "plugin_wallstyle_protrude",
          values: ["plugin_wallstyle_protrude", "plugin_wallstyle_embedded"],
          disabled: false,
          onChange: (event: { detail: { value: string } }) => {
            const offsetValue = event.detail.value === "plugin_wallstyle_embedded" 
              ? entity.thickness 
              : 0;
            executeCmd(
              options.cmdMgr,
              HSFPConstants.CommandType.ChangeMoldingOffset,
              options.entity,
              entity
            );
            options.cmdMgr.receive("changeOffset", offsetValue);
            options.cmdMgr.complete();
          }
        }
      }
    );
  }
  
  items.push(
    {
      id: "wallline-base-style",
      parentId: "wallline-first-level-style",
      label: ResourceManager.getString("plugin_propertybar_base_style"),
      type: HSFPConstants.PropertyBarType.SecondLevelNode,
      items: [],
      order: 1
    },
    {
      id: "wallline-base-style-style",
      parentId: "wallline-base-style",
      type: HSFPConstants.PropertyBarType.ThirdLevelNode,
      label: ResourceManager.getString("plugin_customizedcabinet_style"),
      order: 10,
      items: [
        {
          id: "wallline-base-style-style-imageButton",
          parentId: "wallline-base-style-style",
          type: HSFPConstants.PropertyBarType.ImageButton,
          order: 1,
          data: {
            src: config.isBaseboard ? moldingParam.baseboardType : moldingParam.gypsum,
            meta: entity.metadata,
            onClick: () => {
              options.changeWallMoldingType(entity);
            }
          }
        }
      ]
    },
    {
      id: "wallline-base-style-material",
      parentId: "wallline-base-style",
      type: HSFPConstants.PropertyBarType.ThirdLevelNode,
      label: ResourceManager.getString("plugin_customizedcabinet_material"),
      order: 20,
      items: [
        {
          id: "wallline-base-style-material-imageButton",
          parentId: "wallline-base-style-material",
          type: HSFPConstants.PropertyBarType.ImageButton,
          order: 1,
          data: {
            asyncParam: config.isBaseboard ? moldingParam.baseboardTexture : moldingParam.gypsumTexture,
            color: config.isBaseboard ? moldingParam.baseboardColor : moldingParam.gypsumColor,
            seekId: entity.getMaterial().seekId,
            onClick: () => {
              options.cmdMgr.cancel();
              const moldingType = config.isBaseboard
                ? HSCore.Model.MoldingTypeEnum.Baseboard
                : HSCore.Model.MoldingTypeEnum.Cornice;
              executeCmd(
                options.cmdMgr,
                HSFPConstants.CommandType.ChangeFaceMoldingTexture,
                face,
                options.faceType,
                moldingType,
                entity
              );
            },
            disableIcon: false,
            icon: "hs_shuxingmianban_xuanzhuan45",
            onIconClick: () => {
              const commandManager = HSApp.App.getApp().cmdManager;
              const rotateCommand = commandManager.createCommand(
                HSFPConstants.CommandType.RotateMoldingTexture,
                [entity]
              );
              commandManager.execute(rotateCommand);
              commandManager.complete(rotateCommand);
            },
            jid: entity?.seekId ?? null,
            materialId: entity?.material?.seekId ?? null,
            categoryId: entity?.metadata?.categories?.[0] ?? null
          }
        }
      ]
    }
  );
  
  return items;
}

const LABEL_CONFIG_MAP: LabelConfigMap = {
  moldingWidth: {
    default: "plugin_right_propertybar_walldecoration_molding_width",
    baseBoard: "plugin_right_propertybar_walldecoration_molding_thickness",
    mitre: "plugin_walldecoration_molding_width_title_1"
  },
  moldingHeight: {
    default: "plugin_right_propertybar_walldecoration_molding_height",
    baseBoard: "plugin_right_propertybar_walldecoration_molding_height",
    mitre: "plugin_walldecoration_molding_width_title_2"
  }
};

function getMoldingLabel(config: PropertyBarConfig, labelType: keyof LabelConfigMap): string {
  const labelConfig = LABEL_CONFIG_MAP[labelType];
  let labelKey = labelConfig.default;
  
  if (config.isBaseboard) {
    labelKey = labelConfig.baseBoard;
  }
  
  if (config.isMitre) {
    labelKey = labelConfig.mitre;
  }
  
  return ResourceManager.getString(labelKey);
}