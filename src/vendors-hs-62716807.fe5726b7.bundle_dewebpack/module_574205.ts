import { createContext } from 'react';

interface MenuContextValue {
  inlineCollapsed: boolean;
}

const MenuContext = createContext<MenuContextValue>({
  inlineCollapsed: false
});

export default MenuContext;