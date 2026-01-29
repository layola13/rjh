import { HSCore } from './HSCore';
import { getDuplicateItem, getLockItem, getHideItem, getDeleteItem } from './menuItems';

interface MenuItem {
  // Define based on your actual menu item structure
  id: string;
  label: string;
  action: () => void;
}

interface ContextMenuModule {
  name: string;
  isApplied: (elements: unknown[]) => boolean;
  getItems: (context: unknown) => MenuItem[];
}

export const NCustomizedParametricStairs: ContextMenuModule = {
  name: "NCustomizedParametricStairs",
  
  isApplied(elements: unknown[]): boolean {
    return elements.some((element): boolean => {
      return element instanceof HSCore.Model.NCustomizedParametricStairs;
    });
  },
  
  getItems(context: unknown): MenuItem[] {
    return [
      getDuplicateItem(context),
      getLockItem(context),
      getHideItem(context),
      getDeleteItem(context)
    ];
  }
};