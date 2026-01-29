import { createContext, useContext, Context } from 'react';
import { AwakeTypeEnum } from './AwakeTypeEnum';
import { CardTips } from './CardTips';
import { ImageModal } from './ImageModal';
import { BallonTips } from './BallonTips';
import { showCardTipsBallonTips } from './utils';

export { AwakeTypeEnum };

interface RemindModalConfig {
  name: string;
  Component: React.ComponentType<any>;
  zIndex: number;
  transitionDuration?: number;
  closed?: (params: { theme: any; targetRect: any }) => void;
  noRemind?: (params: { theme: any; targetRect: any }) => void;
  arrowClassName?: string;
  arrowSize?: number;
  checkTeaching?: boolean;
}

type ContentConfigMap = {
  [key in AwakeTypeEnum]?: RemindModalConfig;
};

export const contentConfig: ContentConfigMap = {
  [AwakeTypeEnum.ImageModal]: {
    name: '图片弹框',
    Component: ImageModal,
    zIndex: 2009,
  },
  [AwakeTypeEnum.TitleModal]: {
    name: '文字弹框',
    Component: ImageModal,
    transitionDuration: 320,
    zIndex: 2009,
  },
  [AwakeTypeEnum.CardTips]: {
    name: '卡片提示',
    Component: CardTips,
    closed: (params) => {
      showCardTipsBallonTips({
        theme: params.theme,
        targetRect: params.targetRect,
      });
    },
    noRemind: (params) => {
      showCardTipsBallonTips({
        theme: params.theme,
        targetRect: params.targetRect,
      });
    },
    transitionDuration: 280,
    zIndex: 3001,
  },
  [AwakeTypeEnum.BallonTips]: {
    name: '气泡提示',
    Component: BallonTips,
    arrowClassName: 'ballon-tips-arrow',
    arrowSize: 12,
    transitionDuration: 200,
    zIndex: 3001,
  },
  [AwakeTypeEnum.TeachingModal]: {
    name: '教程弹框',
    checkTeaching: true,
  } as RemindModalConfig,
};

interface RemindModalContextValue {
  // Add specific context properties here based on your requirements
}

export const RemindModalContext: Context<RemindModalContextValue> = createContext<RemindModalContextValue>({});

export function useRemindModalContext(): RemindModalContextValue {
  return useContext(RemindModalContext);
}