import { HSApp } from './518193';

interface ConfigItem {
  exclude?: string[];
  include?: string[];
}

interface ModeConfig {
  plugin?: ConfigItem;
  toolbar?: { item: ConfigItem };
  catalog?: { item: ConfigItem };
  leftMenu?: ConfigItem & { item: ConfigItem };
  propertyBar?: { item: ConfigItem };
  pageheader?: { item: ConfigItem };
  autoSave?: { time: number };
  resizeWidget?: { isFold: boolean };
  [key: string]: unknown;
}

interface UIConfigMap {
  [HSApp.LayoutMode.LayoutModeEnum.onlyFloorPlan]: ModeConfig;
  kanfang: ModeConfig;
  tianmaohaofang: ModeConfig;
  houseme: ModeConfig;
  apple: ModeConfig;
}

const AUTO_SAVE_DEFAULT_TIME = 10;
const AUTO_SAVE_FAST_TIME = 5;

const baseConfig: ModeConfig = {
  [HSApp.LayoutMode.ConfigKey.plugin]: {
    exclude: [
      HSFPConstants.PluginType.NCustomizedFeatureModel,
      HSFPConstants.PluginType.ContentMaterialReplace,
      'hsw.brand.ezhome.feedback.Plugin',
      'hsw.plugin.CadEditor.Plugin',
      HSFPConstants.PluginType.Guide
    ]
  },
  [HSApp.LayoutMode.ConfigKey.toolbar]: {
    item: {
      exclude: [
        'toolBar_save',
        'toolBar_file',
        'toolbar_viewOptions/toolbar_viewOptionsModel',
        'toolbar_viewOptions/toolbar_toggleNoWallMode',
        'toolbar_viewOptions/toolBar_toggle2DPrecisionLocationMode',
        'toolbar_viewOptions/toolBar_toggle3DPrecisionLocationMode',
        'toolbar_viewOptions/toolbar_toggleBackground',
        'toolbar_viewOptions/toolbar_toggleGrid',
        'toolbar_viewOptions/toolbar_toggleFurniture',
        'toolbar_viewOptions/toolbar_toggleHardModelling',
        'toolbar_viewOptions/toolbar_toggleCustomizedFurniture_folder',
        'toolbar_viewOptions/toolbar_toggleWaterAndElec',
        'toolbar_viewOptions/toolbar_toggleDIY2',
        'toolbar_viewOptions/toolbar_molding',
        'toolbar_viewOptions/toolbar_assistant_divider1',
        'toolbar_viewOptions/toolbar_viewOptions_divider1',
        'toolBar_assistant/toolBar_material_brush',
        'toolBar_assistant/toolBar_auto_recommend',
        'toolBar_snapshot_render',
        'toolBar_view_render_results',
        'toolBar_export',
        'toolBar_ai_tools',
        'toolBar_root_divider2'
      ]
    }
  },
  [HSApp.LayoutMode.ConfigKey.catalog]: {
    item: {
      include: ['draw']
    }
  },
  [HSApp.LayoutMode.ConfigKey.leftMenu]: {
    exclude: [HSConstants.ModelClass.NgFace],
    item: {
      exclude: [
        'replace',
        'hide',
        'replacematerial',
        'clearmaterial',
        'applystyle',
        'newFaceGroupButton',
        'faceGroupButton',
        'duplicateMaterial',
        'appliedToRoom',
        'walldecorationAdvanced',
        'favButton',
        'uploadGroupButton',
        'uploadProductButton',
        'recommend'
      ]
    }
  },
  [HSApp.LayoutMode.ConfigKey.propertyBar]: {
    item: {
      include: ['参数设置']
    }
  },
  pageheader: {
    item: {
      exclude: ['TeachingAbilityButton', 'loginStatus', 'fullscreen', 'privacy']
    }
  },
  autoSave: {
    time: AUTO_SAVE_DEFAULT_TIME
  }
};

const tianmaohaofangConfig: ModeConfig = {
  ...baseConfig
};

const kanfangConfig: ModeConfig = {
  ...baseConfig,
  [HSApp.LayoutMode.ConfigKey.toolbar]: {
    item: {
      exclude: [
        'toolBar_file',
        'toolBar_clear',
        'toolBar_root_divider1',
        'toolBar_construction',
        'toolbar_viewOptions',
        'toolBar_root_divider2',
        'toolBar_assistant',
        'toolBar_snapshot_render',
        'toolBar_view_render_results',
        'toolBar_export',
        'toolBar_spark_pic'
      ]
    }
  },
  resizeWidget: {
    isFold: true
  },
  [HSApp.LayoutMode.ConfigKey.propertyBar]: {
    item: {
      include: ['参数设置']
    }
  },
  autoSave: {
    time: AUTO_SAVE_FAST_TIME
  }
};

const housemeConfig: ModeConfig = {
  ...baseConfig,
  [HSApp.LayoutMode.ConfigKey.toolbar]: {
    item: {
      exclude: [
        'toolBar_file',
        'toolbar_viewOptions/toolbar_viewOptionsModel',
        'toolbar_viewOptions/toolbar_toggleNoWallMode',
        'toolbar_viewOptions/toolBar_toggle2DPrecisionLocationMode',
        'toolbar_viewOptions/toolBar_toggle3DPrecisionLocationMode',
        'toolbar_viewOptions/toolbar_toggleBackground',
        'toolbar_viewOptions/toolbar_toggleGrid',
        'toolbar_viewOptions/toolbar_toggleFurniture',
        'toolbar_viewOptions/toolbar_toggleHardModelling',
        'toolbar_viewOptions/toolbar_toggleCustomizedFurniture_folder',
        'toolbar_viewOptions/toolbar_toggleWaterAndElec',
        'toolbar_viewOptions/toolbar_toggleDIY2',
        'toolbar_viewOptions/toolbar_molding',
        'toolbar_viewOptions/toolbar_assistant_divider1',
        'toolbar_viewOptions/toolbar_viewOptions_divider1',
        'toolBar_assistant/toolBar_material_brush',
        'toolBar_assistant/toolBar_auto_recommend',
        'toolBar_snapshot_render',
        'toolBar_view_render_results',
        'toolBar_export',
        'toolBar_ai_tools',
        'toolBar_root_divider2'
      ]
    }
  },
  [HSApp.LayoutMode.ConfigKey.propertyBar]: {
    item: {}
  }
};

const appleConfig: ModeConfig = {
  [HSApp.LayoutMode.ConfigKey.catalog]: {
    item: {
      include: ['draw', 'enterpriseModelLibrary', 'myModelLibrary']
    }
  }
};

export const UIConfig: UIConfigMap = {
  [HSApp.LayoutMode.LayoutModeEnum.onlyFloorPlan]: baseConfig,
  kanfang: kanfangConfig,
  tianmaohaofang: tianmaohaofangConfig,
  houseme: housemeConfig,
  apple: appleConfig
};