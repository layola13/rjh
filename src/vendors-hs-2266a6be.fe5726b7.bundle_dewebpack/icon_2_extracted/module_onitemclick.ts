interface MenuItem {
  id: string | number;
  level: number;
  isHide: boolean;
  onClick?: (item: MenuItem) => void;
}

function onItemClick(item: MenuItem): void {
  I(false);
  
  A.forEach((menuItem: MenuItem) => {
    if (menuItem.isHide === item && menuItem.id === item.id) {
      // Logic when menu item matches
    }
  });
  
  z(A);
  
  if (item.level === 1) {
    L(item);
  }
  
  if (item?.onClick) {
    item.onClick(item);
  }
}