import React from 'react';
import { DraggableModal } from './DraggableModal';
import { AIPagePanelId } from './AIPagePanelId';
import { MyAiModelerPage } from './MyAiModelerPage';
import { MyAiMoodboardPage } from './MyAiMoodboardPage';

interface EnterpriseFolderResult {
  id: string;
}

interface EnterpriseFoldersResponse {
  result: EnterpriseFolderResult[];
}

interface PreConfig {
  categoryAgg: boolean;
  all: boolean;
  poolIds: string[];
  auditStatusList: number[];
}

interface MyAiPageDraggableProps {
  pageId: AIPagePanelId;
  [key: string]: unknown;
}

interface DraggableModalConfig {
  initialWidth: number;
  initialHeight: number;
  draggable: Record<string, never>;
  bounds: {
    top: number;
  };
}

export const MyAiPageDraggable: React.FC<MyAiPageDraggableProps> = (props) => {
  const { pageId, ...restProps } = props;

  const draggableConfig: DraggableModalConfig = {
    initialWidth: 280,
    initialHeight: document.documentElement.clientHeight - 84,
    draggable: {},
    bounds: {
      top: 0
    }
  };

  const baseApiManager = HSApp.Catalog.BaseApiManager.getInstance();

  const getPreConfigByType = (type: string): Promise<PreConfig> => {
    return baseApiManager.dataManager
      .getEnterpriseFolders({ type })
      .then((response: EnterpriseFoldersResponse) => {
        return {
          categoryAgg: true,
          all: true,
          poolIds: [response.result[0].id],
          auditStatusList: [0, 1, 2]
        };
      });
  };

  return React.createElement(
    DraggableModal,
    draggableConfig,
    pageId === AIPagePanelId.AiMoodboard &&
      React.createElement(MyAiMoodboardPage, restProps),
    pageId === AIPagePanelId.AiModeler &&
      React.createElement(MyAiModelerPage, {
        ...restProps,
        getPreConfig: adskUser.enterpriseId
          ? () => getPreConfigByType('ai')
          : undefined,
        categoryId: '4f0facde-9e79-4df4-9c0c-e337de5bd69f'
      }),
    pageId === AIPagePanelId.AiMaterial &&
      React.createElement(MyAiModelerPage, {
        ...restProps,
        getPreConfig: adskUser.enterpriseId
          ? () => getPreConfigByType('aimaterial')
          : undefined,
        categoryId: '1ce13832-a2b0-4461-a88e-7c740753cd23'
      })
  );
};