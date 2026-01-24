/**
 * Module: HeaderContainer
 * Original ID: 228419
 * Exports: UI, HeaderContainer
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import { HeaderItem } from './HeaderItem';

/**
 * Represents a header item configuration
 */
interface HeaderItemData {
  /** Unique identifier for the header item */
  name: string;
  /** Display order in the header */
  order?: number;
  /** Position type: left or right side of header */
  posType: 'left' | 'right';
  /** Tooltip text for the item */
  tip?: string;
  /** Additional item properties */
  [key: string]: unknown;
}

/**
 * Props for HeaderContainer component
 */
interface HeaderContainerProps {
  /** Array of header items to render */
  items: HeaderItemData[];
}

/**
 * Application instance interface
 */
interface HSApp {
  layoutMgr: {
    register(name: string, element: Element | null): void;
  };
  appParams: {
    getParam(key: string): { alias: string } | undefined;
  };
  activeEnvironment: {
    id: string;
  };
  defaultEnvironmentId: string;
  cmdManager: {
    current?: {
      type: string;
    };
  };
  environmentManager: {
    isWallCeilingPlatformEnv(envId: string): boolean;
  };
}

/**
 * Global HSApp namespace
 */
declare global {
  const HSApp: {
    App: {
      getApp(): HSApp;
    };
    Config: {
      TENANT: string;
    };
    PaintPluginHelper: {
      Kernel: {
        CustomizedTilesPluginHandler: {
          multiColorMode: boolean;
        };
      };
    };
  };

  const HSFPConstants: {
    Environment: {
      TPZZCabinet: string;
      CustomizedPM: string;
    };
    CommandType: {
      CustomizedTiles: string;
    };
  };
}

/**
 * UI utility class for rendering the header
 */
export class UI {
  /**
   * Renders the header container into the DOM
   * @param items - Array of header items to display
   */
  static render(items: HeaderItemData[]): void {
    ReactDOM.render(
      React.createElement(HeaderContainer, { items }),
      document.querySelector('#header')
    );
  }
}

/**
 * Main header container component
 * Manages layout and rendering of header items based on position and environment
 * @param props - Component props containing header items
 * @returns React header element
 */
export const HeaderContainer: React.FC<HeaderContainerProps> = (props) => {
  const app = HSApp.App.getApp();
  
  // Sort items by order property
  const sortedItems = [...props.items].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0)
  );

  // Register header with layout manager on mount
  useEffect(() => {
    app.layoutMgr.register('pageHeader', document.querySelector('#page-header'));
  }, []);

  // Render left-positioned items
  const leftItems = sortedItems
    .filter((item) => item.posType === 'left')
    .map((item) =>
      React.createElement(HeaderItem, {
        key: item.name,
        dataModel: item,
        tip: item.tip,
      })
    );

  // Render right-positioned items
  const rightItems = sortedItems
    .filter((item) => item.posType === 'right')
    .map((item) =>
      React.createElement(HeaderItem, {
        key: item.name,
        dataModel: item,
        tip: item.tip,
      })
    );

  // Build header class names based on environment
  const couponParam = app.appParams.getParam('coupon');
  let headerClassName = couponParam?.alias ?? '';
  
  const currentEnvironmentId = app.activeEnvironment.id;
  const cabinetEnvironments = [HSFPConstants.Environment.TPZZCabinet];

  if (
    currentEnvironmentId === app.defaultEnvironmentId ||
    currentEnvironmentId === HSFPConstants.Environment.CustomizedPM
  ) {
    const isMultiColorTiles =
      app.cmdManager.current?.type === HSFPConstants.CommandType.CustomizedTiles &&
      HSApp.PaintPluginHelper.Kernel.CustomizedTilesPluginHandler.multiColorMode;
    
    if (!isMultiColorTiles) {
      headerClassName += ' in-default-env';
    }
  } else if (app.environmentManager.isWallCeilingPlatformEnv(currentEnvironmentId)) {
    headerClassName += ' customizedFeatureModel-page-header';
  } else if (cabinetEnvironments.includes(currentEnvironmentId)) {
    headerClassName += ' customizedCabinet-page-header';
  }

  // Determine expected item count based on tenant
  const expectedRightItemCount = HSApp.Config.TENANT === 'fp' ? 6 : 4;
  const rightClassName = `operates right ${
    rightItems.length === expectedRightItemCount ? 'large' : ''
  }`;

  return React.createElement(
    'header',
    {
      id: 'page-header',
      className: headerClassName,
    },
    React.createElement(
      'ul',
      {
        key: 'header-logo',
        className: 'operates',
      },
      leftItems
    ),
    React.createElement(
      'ul',
      {
        key: 'header-right',
        className: rightClassName,
      },
      rightItems
    )
  );
};