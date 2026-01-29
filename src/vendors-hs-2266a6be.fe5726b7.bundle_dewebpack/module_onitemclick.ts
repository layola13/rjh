interface MenuItem {
  id: string | number;
  level?: number;
  isHide?: boolean;
  onClick?: (item: MenuItem) => void;
}

function onItemClick(item: MenuItem): void {
  I(false);
  
  A.forEach((element: MenuItem) => {
    if (element.isHide === item && element.id === item.id) {
      // Original logic preserved
    }
  });
  
  z(A);
  
  if (item?.level === 1) {
    L(item);
  }
  
  if (item?.onClick) {
    item.onClick(item);
  }
}