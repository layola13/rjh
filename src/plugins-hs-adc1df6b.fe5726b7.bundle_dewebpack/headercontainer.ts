import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import { HeaderItem } from './HeaderItem';

interface HeaderItemData {
  name: string;
  order?: number;
  posType: 'left' | 'right';
  tip?: string;
}

interface HeaderContainerProps {
  items: HeaderItemData[];
}

interface AppParams {
  getParam(key: string): { alias: string } | null;
}

interface LayoutManager {
  register(key: string, element: Element | null): void;
}

interface CommandManager {
  current: {
    type: string;
  } | null;
}

interface EnvironmentManager {
  isWallCeilingPlatformEnv(envId: string): boolean;
}

interface ActiveEnvironment {
  id: string;
}

interface HSApp {
  layoutMgr: LayoutManager;
  appParams: AppParams;
  defaultEnvironmentId: string;
  cmdManager: CommandManager;
  environmentManager: EnvironmentManager;
  activeEnvironment: ActiveEnvironment;
}

interface App {
  getApp(): HSApp;
}

interface PaintPluginHelper {
  Kernel: {
    CustomizedTilesPluginHandler: {
      multiColorMode: boolean;
    };
  };
}

interface Config {
  TENANT: string;
}

interface Constants {
  Environment: {
    TPZZCabinet: string;
    CustomizedPM: string;
  };
  CommandType: {
    CustomizedTiles: string;
  };
}

declare global {
  const HSApp: {
    App: App;
    PaintPluginHelper: PaintPluginHelper;
    Config: Config;
  };
  const HSFPConstants: Constants;
}

export class UI {
  static render(items: HeaderItemData[]): void {
    ReactDOM.render(
      React.createElement(HeaderContainer, { items }),
      document.querySelector('#header')
    );
  }
}

export const HeaderContainer: React.FC<HeaderContainerProps> = ({ items }) => {
  const app = HSApp.App.getApp();
  const sortedItems = items.slice(0).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  useEffect(() => {
    app.layoutMgr.register('pageHeader', document.querySelector('#page-header'));
  }, []);

  const leftItems = sortedItems
    .filter((item) => item.posType === 'left')
    .map((item) =>
      React.createElement(HeaderItem, {
        key: item.name,
        dataModel: item,
        tip: item.tip,
      })
    );

  const rightItems = sortedItems
    .filter((item) => item.posType === 'right')
    .map((item) =>
      React.createElement(HeaderItem, {
        key: item.name,
        dataModel: item,
        tip: item.tip,
      })
    );

  const coupon = app.appParams.getParam('coupon');
  let className = coupon ? coupon.alias : '';

  const currentEnvId = app.activeEnvironment.id;
  const cabinetEnvironments = [HSFPConstants.Environment.TPZZCabinet];

  if (
    currentEnvId === app.defaultEnvironmentId ||
    currentEnvId === HSFPConstants.Environment.CustomizedPM
  ) {
    if (
      !(
        app.cmdManager.current?.type === HSFPConstants.CommandType.CustomizedTiles &&
        HSApp.PaintPluginHelper.Kernel.CustomizedTilesPluginHandler.multiColorMode
      )
    ) {
      className += ' in-default-env';
    }
  } else if (app.environmentManager.isWallCeilingPlatformEnv(currentEnvId)) {
    className += ' customizedFeatureModel-page-header';
  } else if (cabinetEnvironments.includes(currentEnvId)) {
    className += ' customizedCabinet-page-header';
  }

  const largeThreshold = HSApp.Config.TENANT === 'fp' ? 6 : 4;

  return React.createElement(
    'header',
    {
      id: 'page-header',
      className,
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
        className: `operates right ${rightItems.length === largeThreshold ? 'large' : ''}`,
      },
      rightItems
    )
  );
};