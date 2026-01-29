interface ToolbarConfig {
  excludeItems: string[];
  addItems: unknown[];
  isInDefaultEnv: boolean;
}

const toolbarConfig: ToolbarConfig = {
  excludeItems: [
    "toolbar_viewOptions/toolbar_toggleAuxiliaryLine",
    "toolbar_viewOptions/toolbar_toggleArea",
    "toolbar_viewOptions/toolbar_toggleDimension",
    "toolbar_viewOptions/toolbar_toggleRoomType",
    "toolbar_viewOptions/toolbar_viewOptions_divider2",
    "toolbar_viewOptions/toolBar_toggle2DPrecisionLocationMode",
    "toolbar_viewOptions/toolbar_viewOptions_divider3",
    "toolbar_viewOptions/toolbar_viewOptions_divider4",
    "toolbar_viewOptions/toolbar_viewOptions_divider5",
    "toolbar_viewOptions/toolbar_toggleBackground",
    "toolbar_viewOptions/toolbar_toggleGrid",
    "toolbar_viewOptions/toolbar_toggleNoWallMode",
    "toolbar_viewOptions/toolbar_toggleRoof",
    "toolbar_viewOptions/toolbar_toggleTopCeiling"
  ],
  addItems: [],
  isInDefaultEnv: true
};

export default toolbarConfig;