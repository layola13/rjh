interface ToolbarItem {
  label?: string;
  tooltip?: string;
  [key: string]: unknown;
}

interface ToolbarConfig {
  addItems: Array<[ToolbarItem, ...unknown[]]>;
  [key: string]: unknown;
}

interface ItemGetter {
  (id: string, defaultId: string, config: ToolbarConfig): void;
}

interface App {
  [key: string]: unknown;
}

const TOOLBAR_IDS = {
  PLANE_TOOLBAR_ID: 'PLANE_TOOLBAR_ID',
  RCP_TOOLBAR_ID: 'RCP_TOOLBAR_ID',
  FIRST_PERSON_3D_TOOLBAR_ID: 'FIRST_PERSON_3D_TOOLBAR_ID',
  ORBIT_VIEW_3D_TOOLBAR_ID: 'ORBIT_VIEW_3D_TOOLBAR_ID',
  ORTH_VIEW_3D_TOOLBAR_ID: 'ORTH_VIEW_3D_TOOLBAR_ID',
  DEFAULT_TOOLBAR_ID: 'DEFAULT_TOOLBAR_ID'
} as const;

declare const ResourceManager: {
  getString(key: string): string;
};

const planeToolbarConfig: ToolbarConfig = { addItems: [] };
const rcpToolbarConfig: ToolbarConfig = { addItems: [] };
const firstPerson3DToolbarConfig: ToolbarConfig = { addItems: [] };
const orbitView3DToolbarConfig: ToolbarConfig = { addItems: [] };
const orthView3DToolbarConfig: ToolbarConfig = { addItems: [] };

function processToolbarConfig(config: ToolbarConfig): ToolbarConfig {
  config.addItems.forEach((item) => {
    const toolbarItem = item[0];
    const localizableFields: Array<keyof Pick<ToolbarItem, 'label' | 'tooltip'>> = ['label', 'tooltip'];
    
    localizableFields.forEach((field) => {
      const value = toolbarItem[field];
      if (value) {
        toolbarItem[field] = ResourceManager.getString(value);
      }
    });
  });
  
  return config;
}

export default class ToolbarInitializer {
  private _app?: App;
  private _itemGetter?: ItemGetter;

  init_(app: App, itemGetter: ItemGetter, getter: unknown): void {
    this._app = app;
    this._itemGetter = getter as ItemGetter;
    
    itemGetter(TOOLBAR_IDS.PLANE_TOOLBAR_ID, TOOLBAR_IDS.DEFAULT_TOOLBAR_ID, processToolbarConfig(planeToolbarConfig));
    itemGetter(TOOLBAR_IDS.RCP_TOOLBAR_ID, TOOLBAR_IDS.DEFAULT_TOOLBAR_ID, processToolbarConfig(rcpToolbarConfig));
    itemGetter(TOOLBAR_IDS.FIRST_PERSON_3D_TOOLBAR_ID, TOOLBAR_IDS.DEFAULT_TOOLBAR_ID, processToolbarConfig(firstPerson3DToolbarConfig));
    itemGetter(TOOLBAR_IDS.ORBIT_VIEW_3D_TOOLBAR_ID, TOOLBAR_IDS.DEFAULT_TOOLBAR_ID, processToolbarConfig(orbitView3DToolbarConfig));
    itemGetter(TOOLBAR_IDS.ORTH_VIEW_3D_TOOLBAR_ID, TOOLBAR_IDS.DEFAULT_TOOLBAR_ID, processToolbarConfig(orthView3DToolbarConfig));
  }
}