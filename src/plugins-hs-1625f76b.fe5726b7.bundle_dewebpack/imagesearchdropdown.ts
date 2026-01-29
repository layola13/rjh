import React, { useEffect } from 'react';
import { Menu, MenuItem, SubMenu, SmartText, Icons } from './components';

interface Category {
  code: string;
  name: string;
  children?: Category[];
}

interface ImageSearchDropdownProps {
  categoryName: string;
  categoryList: Category[];
  disabledCategories: Category[];
  onCategoryClick: (category: Category) => void;
  selectedMoreCategory: Category | null;
}

export const ImageSearchDropdown: React.FC<ImageSearchDropdownProps> = ({
  categoryName,
  categoryList,
  disabledCategories,
  onCategoryClick,
  selectedMoreCategory
}) => {
  const buildCategoryMenuItems = (categories: Category[]): React.ReactNode[] => {
    const menuItems: React.ReactNode[] = [];

    categories.forEach((category) => {
      const isDisabled = disabledCategories.some(
        (disabled) => disabled.code === category.code
      );

      if (isDisabled) {
        return;
      }

      const isSelected = selectedMoreCategory?.code === category.code;

      if (category.children && category.children.length > 0) {
        menuItems.push(
          <SubMenu
            key={category.code}
            className="image-search-category-dropdown-submenu"
            subItems={buildCategoryMenuItems(category.children)}
            trigger="hover"
          >
            {category.name}
          </SubMenu>
        );
      } else {
        menuItems.push(
          <MenuItem
            key={category.code}
            className={`image-search-category-dropdown-menu-item${isSelected ? ' selected' : ''}`}
            onClick={() => onCategoryClick(category)}
          >
            {category.name}
          </MenuItem>
        );
      }
    });

    return menuItems;
  };

  useEffect(() => {
    const subMenuElements = document.querySelectorAll('.sub-menu-ul');
    
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0 && entry.intersectionRatio < 1) {
          const targetBottom = entry.boundingClientRect.bottom || 0;
          const rootBottom = entry.rootBounds?.bottom || 0;
          const marginTop = rootBottom - targetBottom - 14;
          
          (entry.target as HTMLElement).style.marginTop = `${marginTop}px`;
        }
      });
    });

    subMenuElements.forEach((element) => {
      intersectionObserver.observe(element);
    });

    return () => {
      subMenuElements.forEach((element) => {
        intersectionObserver.unobserve(element);
      });
    };
  }, []);

  const hasSelectedCategory = Boolean(selectedMoreCategory);

  return (
    <Menu
      className="image-search-category-dropdown"
      subItems={buildCategoryMenuItems(categoryList)}
      trigger="click"
      placement="bottomLeft"
    >
      <div
        className={`image-category-name image-category-more${hasSelectedCategory ? ' selected-item' : ''}`}
        onClick={(event) => event.preventDefault()}
      >
        <div className="image-category-more-text">
          <SmartText className="text">{categoryName}</SmartText>
          <div className="image-category-dropdown-button">
            <Icons type="hs_xiao_danjiantou_xia" />
          </div>
        </div>
      </div>
    </Menu>
  );
};