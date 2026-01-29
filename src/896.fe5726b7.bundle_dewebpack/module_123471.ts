import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { UserInfoItem } from './UserInfoItem';
import { FloatButton } from './FloatButton';
import { Draggable } from './Draggable';
import { PricingMarket } from './PricingMarket';
import { MarketTypeEnum } from './MarketTypeEnum';

interface UserVipInfo {
  // Add specific properties based on your UserVipInfo structure
  [key: string]: unknown;
}

interface Position {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  isExpand?: boolean;
}

interface PositionConfig {
  [environmentId: string]: Position;
}

interface FloatButtonComponentProps {
  onClick: (type: MarketTypeEnum, sourcePage: string) => void;
  userVipInfo: UserVipInfo;
}

interface MarketModalOptions {
  [key: string]: unknown;
}

const POSITION_CONFIG: PositionConfig = {
  default: {
    bottom: 20,
    left: 20
  },
  render: {
    left: 260,
    top: 60,
    isExpand: true
  }
};

export function getUserInfoItem(
  userVipInfo: UserVipInfo,
  onClick: (type: MarketTypeEnum, sourcePage: string) => void
): React.ReactElement {
  return React.createElement(UserInfoItem, {
    userVipInfo,
    onClick
  });
}

export function renderFloatButton(
  userVipInfo: UserVipInfo,
  onClick: (type: MarketTypeEnum, sourcePage: string) => void
): void {
  let container = document.querySelector('.user-info-float-wrapper') as HTMLElement | null;
  
  if (!container) {
    container = document.createElement('div');
    container.className = 'user-info-float-wrapper';
    document.body.appendChild(container);
  }
  
  ReactDOM.render(
    React.createElement(FloatButtonComponent, {
      userVipInfo,
      onClick
    }),
    container
  );
}

export function renderMarketModal(
  type: MarketTypeEnum,
  sourcePage: string,
  options?: MarketModalOptions
): void {
  const app = HSApp.App.getApp();
  const guidePlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.Guide);
  
  if (guidePlugin?.showGuide()) {
    return;
  }
  
  let container = document.querySelector('.ezhome-pricing-modal') as HTMLElement | null;
  
  if (!container) {
    container = document.createElement('div');
    container.className = 'ezhome-pricing-modal';
    document.body.appendChild(container);
  }
  
  ReactDOM.render(
    React.createElement(PricingMarket, {
      type,
      sourcePage,
      ...options
    }),
    container
  );
}

export function unmountMarketModal(): void {
  const container = document.querySelector('.ezhome-pricing-modal') as HTMLElement | null;
  
  if (container) {
    ReactDOM.unmountComponentAtNode(container);
  }
}

function FloatButtonComponent(props: FloatButtonComponentProps): React.ReactElement {
  const { onClick, userVipInfo } = props;
  const app = HSApp.App.getApp();
  
  const [activeEnvironmentId, setActiveEnvironmentId] = useState<string>(() => {
    return app.activeEnvironmentId;
  });
  
  const [savedPositions, setSavedPositions] = useState<Record<string, Position>>({});
  
  useEffect(() => {
    function handleEnvironmentChange(): void {
      setActiveEnvironmentId(app.activeEnvironmentId);
    }
    
    app.environmentManager.signalEnvironmentActivated.listen(handleEnvironmentChange);
    
    return () => {
      app.environmentManager.signalEnvironmentActivated.unlisten(handleEnvironmentChange);
    };
  }, []);
  
  const defaultPosition = useMemo(() => {
    const config = POSITION_CONFIG[activeEnvironmentId] ?? POSITION_CONFIG.default;
    return {
      left: config.left,
      right: config.right,
      top: config.top,
      bottom: config.bottom
    };
  }, [activeEnvironmentId]);
  
  const isExpand = useMemo(() => {
    const config = POSITION_CONFIG[activeEnvironmentId] ?? POSITION_CONFIG.default;
    return config.isExpand ?? false;
  }, [activeEnvironmentId]);
  
  const currentPosition = useMemo(() => {
    return savedPositions[activeEnvironmentId];
  }, [activeEnvironmentId, savedPositions]);
  
  function handlePositionChange(newPosition: Position): void {
    const updatedPositions = {
      ...savedPositions,
      [activeEnvironmentId]: newPosition
    };
    setSavedPositions(updatedPositions);
  }
  
  function handleClick(): void {
    onClick(MarketTypeEnum.Member, `user_vip_float_${activeEnvironmentId}`);
  }
  
  return React.createElement(Draggable, {
    className: 'user-info-float-drag',
    onClick: handleClick,
    defaultPosition: currentPosition,
    onPositionChange: handlePositionChange,
    style: defaultPosition
  }, React.createElement(FloatButton, {
    userVipInfo,
    isExpand
  }));
}