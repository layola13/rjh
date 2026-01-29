import { defaultToolbarHandler } from './defaultToolbarHandler';
import { ToolbarItemType } from './ToolbarItemType';
import { isHXRR } from './utils';
import { 
  default as getDefaultItems, 
  exportJointMenuItems, 
  exportGlobalConstructionItems 
} from './toolbarItems';

interface ToolbarPopover {
  text: string;
  [key: string]: unknown;
}

interface ToolbarItem {
  name: string;
  label?: string;
  tooltip?: string;
  type?: ToolbarItemType;
  visible?: boolean;
  disable?: boolean;
  popover?: ToolbarPopover | string;
  submenu?: ToolbarItem[];
  onclick?: (event: Event) => void;
  onchange?: (event: Event) => void;
  onMouseEnter?: (event: MouseEvent) => void;
  onMouseLeave?: (event: MouseEvent) => void;
}

interface ToolbarParams {
  [key: string]: unknown;
}

interface ResourceManager {
  getString(key: string): string | undefined;
}

interface HSAppConfig {
  TENANT: string;
  VERSION: string;
}

interface HSApp {
  Config: HSAppConfig;
}

declare const ResourceManager: ResourceManager;
declare const HSApp: HSApp;

const HXRR_FILTERED_ITEMS: readonly string[] = [
  'toolBar_new',
  'toolBar_fpCollection',
  'toolBar_load',
  'toolBar_save_as',
  'plugin_bomlist_menu',
  'toolBar_share_case',
  'toolBar_export_pic_with_paint',
  'toolBar_export_pic_color'
];

export class DefaultToolbar {
  constructor(params: ToolbarParams) {
    defaultToolbarHandler.setParams(params);
  }

  public getDefaultToolbarItems(): ToolbarItem[] {
    return this._preProcess(this._setEzhomeItem());
  }

  private _preProcess(items: ToolbarItem[]): ToolbarItem[] {
    if (isHXRR()) {
      this._filterHXRRItems(items);
    }

    const getLocalizedString = (key: string): string => {
      return ResourceManager.getString(key) || key;
    };

    const filteredItems = items.filter(item => !item.disable);

    filteredItems.forEach(item => {
      if (item.tooltip) {
        item.tooltip = getLocalizedString(item.tooltip);
      }

      if (item.label) {
        item.label = getLocalizedString(item.label);
      }

      if (item.popover && typeof item.popover === 'object' && typeof item.popover.text === 'string') {
        item.popover.text = getLocalizedString(item.popover.text);
      }

      if (item.visible !== false) {
        item.visible = true;
      }

      const clickHandler = defaultToolbarHandler[`${item.name}_Click`];
      if (clickHandler && !item.onclick) {
        item.onclick = clickHandler.bind(defaultToolbarHandler);
      }

      const changeHandler = defaultToolbarHandler[`${item.name}_Change`];
      if (changeHandler && !item.onchange) {
        item.onchange = changeHandler.bind(defaultToolbarHandler);
      }

      const mouseEnterHandler = defaultToolbarHandler[`${item.name}_OnMouseEnter`];
      if (mouseEnterHandler && !item.onMouseEnter) {
        item.onMouseEnter = mouseEnterHandler.bind(defaultToolbarHandler);
      }

      const mouseLeaveHandler = defaultToolbarHandler[`${item.name}_OnMouseLeave`];
      if (mouseLeaveHandler && !item.onMouseLeave) {
        item.onMouseLeave = mouseLeaveHandler.bind(defaultToolbarHandler);
      }

      if (item.submenu) {
        if (!item.type) {
          item.type = ToolbarItemType.folder;
        }
        this._preProcess(item.submenu);
      } else if (!item.type) {
        item.type = ToolbarItemType.button;
      }
    });

    return filteredItems;
  }

  private _setEzhomeItem(): ToolbarItem[] {
    const items = getDefaultItems();
    
    const exportIndex = items.findIndex(item => item.name === 'toolBar_export');
    const fileIndex = items.findIndex(item => item.name === 'toolBar_file');

    if (HSApp.Config.TENANT === 'ezhome' && !isHXRR() && exportIndex !== -1) {
      items[exportIndex].submenu = exportJointMenuItems;
    }

    if (HSApp.Config.TENANT === 'fp' && exportIndex !== -1) {
      items[exportIndex].submenu = exportGlobalConstructionItems;
    }

    if (HSApp.Config.VERSION === 'ea' && fileIndex !== -1) {
      items[fileIndex].submenu = items[fileIndex].submenu?.filter(
        item => !['toolBar_share_case', 'toolBar_file_divider2'].includes(item.name)
      );
    }

    return items;
  }

  private _filterHXRRItems(items: ToolbarItem[]): ToolbarItem[] {
    for (let i = items.length - 1; i >= 0; i--) {
      if (items[i].label && HXRR_FILTERED_ITEMS.includes(items[i].label)) {
        items.splice(i, 1);
      } else if (items[i].submenu?.length) {
        this._filterHXRRItems(items[i].submenu!);
      }
    }
    return items;
  }
}