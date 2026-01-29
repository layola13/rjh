interface HelpbarItem {
  name: string;
  label?: string;
  onclick?: () => void;
  submenu?: HelpbarItem[];
  type?: string;
  disable?: boolean;
}

interface HelpbarParams {
  [key: string]: unknown;
}

class HelpbarItemType {
  static readonly folder = 'folder';
  static readonly button = 'button';
}

class HelpbarService {
  static setParams(params: HelpbarParams): void {
    // Implementation for setting parameters
  }

  static [key: string]: unknown;
}

declare const ResourceManager: {
  getString(key: string): string;
};

function getDefaultHelpbarItemsRaw(): HelpbarItem[] {
  // Implementation for getting default helpbar items
  return [];
}

class HelpbarManager {
  constructor(params: HelpbarParams) {
    HelpbarService.setParams(params);
  }

  getDefaultHelpbarItems(): HelpbarItem[] {
    let items = getDefaultHelpbarItemsRaw();
    
    if (items[0]?.submenu && Array.isArray(items[0].submenu)) {
      items[0].submenu = items[0].submenu.filter((item) => !item.disable);
    }
    
    return this._preProcess(items);
  }

  private _preProcess(items: HelpbarItem[]): HelpbarItem[] {
    items.forEach((item) => {
      if (item.label) {
        item.label = ResourceManager.getString(item.label);
      }

      const clickHandler = HelpbarService[`${item.name}_Click`];
      if (clickHandler && !item.onclick) {
        item.onclick = (clickHandler as () => void).bind(HelpbarService);
      }

      if (item.submenu) {
        if (!item.type) {
          item.type = HelpbarItemType.folder;
        }
        this._preProcess(item.submenu);
      } else if (!item.type) {
        item.type = HelpbarItemType.button;
      }
    });

    return items;
  }
}

export default HelpbarManager;