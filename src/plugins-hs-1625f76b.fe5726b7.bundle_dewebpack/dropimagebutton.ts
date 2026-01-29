import React, { useState, useMemo, useEffect } from 'react';
import { IconfontView } from './IconfontView';
import newIconImage from './assets/new-icon.png';

interface BuyVipConfig {
  icon: string;
}

interface FreeTrialConfig {
  text: string;
}

interface DropImageItem {
  label: string;
  icon: string;
  iconHover?: string;
  onMouseDown?: (event: React.MouseEvent<HTMLDivElement>) => void;
  showNewCallBack?: () => boolean;
  buyVip?: BuyVipConfig;
  buyVipClick?: () => void;
  freeTrial?: FreeTrialConfig;
  freeTrialClick?: (isCurrentItem: boolean) => void;
  hotkey?: string;
  registerHotkey?: boolean;
}

interface DropImageButtonProps {
  label?: string;
  items: DropImageItem[];
  dropLocation?: 'left' | 'right';
  showNewCallBack?: () => boolean;
  currentFreeTrial?: FreeTrialConfig;
}

export function DropImageButton(props: DropImageButtonProps): JSX.Element {
  const {
    label,
    items,
    dropLocation = 'left',
    showNewCallBack,
    currentFreeTrial
  } = props;

  const [currentItem, setCurrentItem] = useState<DropImageItem>(items[0]);
  const [selectedItem, setSelectedItem] = useState<DropImageItem | undefined>();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const currentIcon = useMemo(() => {
    return isHovered && currentItem.iconHover || currentItem.icon;
  }, [isHovered, currentItem.icon, currentItem.iconHover]);

  const shouldShowNewIcon = showNewCallBack?.() || items.some(item => 
    item.showNewCallBack?.()
  );

  const handleMouseEnter = (): void => {
    setIsHovered(true);
  };

  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };

  const handleFreeTrialClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation();
    currentItem.freeTrialClick?.(true);
  };

  const handleFreeTrialMouseDown = (event: React.MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation();
  };

  return (
    <div
      className={`drop-image-button ${isHovered ? 'hover' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {shouldShowNewIcon && (
        <div className="catalog-image-new-icon">
          <img src={newIconImage} />
        </div>
      )}

      {currentFreeTrial && (
        <div
          className="freeTrailCurrentItem"
          onMouseDown={handleFreeTrialMouseDown}
          onClick={handleFreeTrialClick}
        >
          {currentFreeTrial.text}
        </div>
      )}

      <div
        className={`current-item ${isHovered ? 'hover' : ''}`}
        onMouseDown={currentItem.onMouseDown}
      >
        {currentItem.buyVip && (
          <BuyVipButton
            icon={currentItem.buyVip.icon}
            onClick={currentItem.buyVipClick}
          />
        )}

        <div className="icon-wrapper">
          <IconfontView
            showType={currentIcon}
            customStyle={{ fontSize: '44px' }}
          />
          <IconfontView
            customClass="tuozhan"
            showType="hs_xiao_shijiantou_tuozhan"
            customStyle={{ fontSize: '9px' }}
            hoverColor="#396EFE"
            clickColor="#396EFE"
          />
        </div>

        <div className="text-description">
          {!selectedItem && label ? label : currentItem.label}
        </div>
      </div>

      <div className={`sub-items ${isHovered ? 'show' : ''} ${dropLocation}`}>
        {items.map(item => (
          <SubItem
            key={item.label}
            item={item}
            isCurrent={currentItem === item}
            showNewCallBack={item.showNewCallBack}
            onMouseDown={(event) => {
              setCurrentItem(item);
              setSelectedItem(item);
              setTimeout(() => {
                item.onMouseDown?.(event);
              }, 0);
            }}
          />
        ))}
      </div>
    </div>
  );
}

interface SubItemProps {
  item: DropImageItem;
  isCurrent: boolean;
  onMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
  showNewCallBack?: () => boolean;
}

function SubItem(props: SubItemProps): JSX.Element {
  const { item, isCurrent, onMouseDown, showNewCallBack } = props;
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const classNames = [
    'sub-item',
    isCurrent ? 'current' : '',
    isHovered ? 'hover' : ''
  ];

  const iconType = useMemo(() => {
    return isCurrent && item.iconHover || item.icon;
  }, [isCurrent, item.icon, item.iconHover]);

  const { hotkey, registerHotkey } = item;

  useEffect(() => {
    if (hotkey && registerHotkey) {
      HSApp.App.getApp().hotkey.registerHotkey(hotkey, onMouseDown);
    }
  }, []);

  const handleMouseEnter = (): void => {
    setIsHovered(true);
  };

  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };

  const handleFreeTrialMouseDown = (event: React.MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation();
  };

  const handleFreeTrialClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation();
    item.freeTrialClick?.(false);
    onMouseDown(event);
  };

  return (
    <div
      className={classNames.join(' ')}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={onMouseDown}
    >
      {showNewCallBack?.() && (
        <div className="catalog-image-new-icon">
          <img src={newIconImage} />
        </div>
      )}

      <IconfontView
        showType={iconType}
        customClass="icon"
        customStyle={{ fontSize: '26px' }}
      />

      <div
        className={`text-description ${item.freeTrial ? 'by-column' : ''} ${item.buyVip ? 'by-row' : ''}`}
      >
        <div>{item.label}</div>

        {item.freeTrial && (
          <div
            className="freeTrailSubItem"
            onMouseDown={handleFreeTrialMouseDown}
            onClick={handleFreeTrialClick}
          >
            {item.freeTrial.text}
          </div>
        )}

        {item.buyVip && (
          <BuyVipButton
            icon={item.buyVip.icon}
            onClick={item.buyVipClick}
          />
        )}
      </div>

      {hotkey && (
        <div className="hotkey">
          {HSApp.Util.Hotkey.getHotkeyDisplayString(hotkey)}
        </div>
      )}
    </div>
  );
}

interface BuyVipButtonProps {
  icon: string;
  onClick?: () => void;
}

function BuyVipButton(props: BuyVipButtonProps): JSX.Element {
  const { icon, onClick } = props;

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation();
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation();
    onClick?.();
  };

  return (
    <div
      className="buyVip"
      onMouseDown={handleMouseDown}
      onClick={handleClick}
    >
      <img src={icon} />
    </div>
  );
}