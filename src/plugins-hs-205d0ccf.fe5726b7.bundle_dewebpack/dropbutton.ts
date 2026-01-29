import { useState, useEffect } from 'react';
import { IconfontView } from './IconfontView';

interface DropButtonItem {
  key: string;
  label: string;
  onMouseDown?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

interface DropButtonProps {
  items: DropButtonItem[];
  isSelected: boolean;
  currentItemKey: string;
}

interface SubItemProps {
  item: DropButtonItem;
  isCurrent: boolean;
  onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const SubItem: React.FC<SubItemProps> = ({ item, isCurrent, onMouseDown }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const classNames = [
    'sub-item',
    isCurrent ? 'current' : '',
    isHovered ? 'hover' : ''
  ];

  return (
    <div
      className={classNames.join(' ')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={onMouseDown}
    >
      <div className={`text-description ${isHovered ? 'hover' : ''}`}>
        {item.label}
      </div>
    </div>
  );
};

export const DropButton: React.FC<DropButtonProps> = ({
  items,
  isSelected,
  currentItemKey
}) => {
  const findItemByKey = (key: string): DropButtonItem | undefined => {
    return items.find(item => item.key === key);
  };

  const [currentItem, setCurrentItem] = useState<DropButtonItem | undefined>(
    findItemByKey(currentItemKey)
  );
  const [isDropdownHovered, setIsDropdownHovered] = useState<boolean>(false);
  const [isCurrentItemHovered, setIsCurrentItemHovered] = useState<boolean>(false);

  useEffect(() => {
    setCurrentItem(findItemByKey(currentItemKey));
  }, [currentItemKey]);

  const getTextDescriptionClass = (): string => {
    let className = 'text-description';
    
    if (isDropdownHovered) {
      className += isCurrentItemHovered ? ' hover' : '';
    } else {
      className += (isSelected || isCurrentItemHovered) ? ' hover' : '';
    }
    
    return className;
  };

  const handleSubItemMouseDown = (
    item: DropButtonItem,
    event: React.MouseEvent<HTMLDivElement>
  ): void => {
    setIsDropdownHovered(false);
    setCurrentItem(item);
    
    setTimeout(() => {
      item.onMouseDown?.(event);
    }, 0);
  };

  const showMultipleItems = items.length > 1;

  return (
    <div
      className={`drop-button ${isSelected ? 'selected' : ''} ${isDropdownHovered ? 'hover' : ''}`}
      onMouseEnter={() => setIsDropdownHovered(true)}
      onMouseLeave={() => setIsDropdownHovered(false)}
    >
      <div
        className={`current-item ${isSelected ? 'selected' : ''} ${isCurrentItemHovered ? 'hover' : ''}`}
        onMouseDown={currentItem?.onMouseDown}
        onMouseEnter={() => setIsCurrentItemHovered(true)}
        onMouseLeave={() => setIsCurrentItemHovered(false)}
      >
        {showMultipleItems && (
          <IconfontView
            customClass="tuozhan"
            showType="hs_xiao_shijiantou_tuozhan"
            customStyle={{ fontSize: '9px' }}
            hoverColor="#396EFE"
            clickColor="#396EFE"
          />
        )}
        <div className={getTextDescriptionClass()}>
          {currentItem?.label}
        </div>
      </div>

      <div className={`sub-items ${isDropdownHovered ? 'show' : ''}`}>
        {items.map(item => {
          if (item === currentItem) {
            return undefined;
          }

          return (
            <SubItem
              key={item.key}
              item={item}
              isCurrent={item === currentItem}
              onMouseDown={(event) => handleSubItemMouseDown(item, event)}
            />
          );
        })}
      </div>
    </div>
  );
};