interface ToolbarConfig {
  excludeItems: string[];
  addItems: unknown[];
  isInDefaultEnv: boolean;
}

const toolbarConfig: ToolbarConfig = {
  excludeItems: [
    "toolbar_viewOptions/toolBar_toggle3DPrecisionLocationMode",
    "toolbar_viewOptions/toolbar_toggleNoWallMode",
    "toolbar_viewOptions/toolbar_toggleRoof",
    "toolbar_viewOptions/toolbar_toggleTopCeiling",
    "toolbar_viewOptions/toolbar_molding"
  ],
  addItems: [],
  isInDefaultEnv: true
};

export default toolbarConfig;