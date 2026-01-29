import { forwardRef, useRef, useState, useEffect, useImperativeHandle, ForwardRefRenderFunction, Ref } from 'react';
import { InfiniteLoaderContainer, Loading } from './InfiniteLoader';
import { AIPagePanelId } from './constants';
import { AiMoodboardItem } from './AiMoodboardItem';
import { ApiService } from './ApiService';

interface AiImage {
  taskId: string;
  subTaskId: string;
  traceIds?: Record<string, unknown>;
  [key: string]: unknown;
}

interface AiImageListResponse {
  items: AiImage[];
  total: number;
  traceIds?: Record<string, unknown>;
}

interface QueryParams {
  offset: number;
  limit: number;
  sceneType: number;
}

interface PreConfig {
  sceneType: number;
  [key: string]: unknown;
}

interface AiMoodboardState {
  isLoading: boolean;
  items: AiImage[];
  total: number;
}

interface AiMoodboardPageProps {
  getContainerHeight: () => number;
  getPreConfig?: () => Promise<PreConfig>;
}

export interface AiMoodboardPageHandle {
  getInitData: () => Promise<void>;
}

const DEFAULT_PAGE_SIZE = 20;
const ITEM_HEIGHT = 198;
const ITEM_WIDTH = 244;
const DEFAULT_SCENE_TYPE = 6;

const AiMoodboardPageComponent: ForwardRefRenderFunction<AiMoodboardPageHandle, AiMoodboardPageProps> = (
  { getContainerHeight, getPreConfig },
  ref: Ref<AiMoodboardPageHandle>
) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<AiMoodboardState>({
    isLoading: true,
    items: [],
    total: 0,
  });

  const { isLoading, items, total } = state;

  const configRef = useRef<PreConfig>({
    sceneType: DEFAULT_SCENE_TYPE,
  });

  const [containerHeight, setContainerHeight] = useState<number>(0);

  const queryAiImageList = async (page: number = 1): Promise<AiImageListResponse> => {
    const params: QueryParams = {
      offset: DEFAULT_PAGE_SIZE * (page - 1),
      limit: DEFAULT_PAGE_SIZE,
      ...configRef.current,
    };

    const response = await ApiService.queryAiImageList(params);

    if (response?.ret?.[0]?.includes('SUCCESS') && response.data) {
      const { items = [], traceIds = {} } = response.data;
      
      items.forEach((item: AiImage) => {
        item.traceIds = traceIds;
      });

      return response.data;
    }

    return Promise.reject(response);
  };

  const updateContainerHeight = (): void => {
    const height = getContainerHeight();
    setContainerHeight(height);
  };

  const loadInitialData = async (): Promise<void> => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    const data = await queryAiImageList();
    setState({
      isLoading: false,
      items: data.items ?? [],
      total: data.total ?? 0,
    });
    updateContainerHeight();
  };

  useEffect(() => {
    if (getPreConfig) {
      getPreConfig().then((config) => {
        configRef.current = config;
        loadInitialData();
      });
    } else {
      loadInitialData();
    }
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      getInitData: loadInitialData,
    }),
    []
  );

  const handleGetData = async (page: number): Promise<AiImage[]> => {
    const data = await queryAiImageList(page);
    return data.items ?? [];
  };

  const handleShowViewer = (item: AiImage): void => {
    const app = HSApp.App.getApp();
    const catalogPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.Catalog);
    
    catalogPlugin?.showMoodboardImageViewer({
      taskId: item.taskId,
      subTaskId: item.subTaskId,
    });

    HSApp.Util.EventTrack.instance().track(
      HSApp.Util.EventGroupEnum.Catalog,
      'ai_moodboard_viewer_event'
    );
  };

  const handleNoResultAction = (): void => {
    const app = HSApp.App.getApp();
    const catalogPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.Catalog);
    catalogPlugin?.openPagePanel(AIPagePanelId.AiMoodboard);
  };

  const renderItems = (items: AiImage[]): JSX.Element[] => {
    return items.map((item) => (
      <AiMoodboardItem
        key={`${item.taskId}-${item.subTaskId}`}
        item={item}
        showViewer={() => handleShowViewer(item)}
      />
    ));
  };

  const emptyResultHint = ResourceManager.getString('ai_moodboard_empty_result').replace(
    '{ai}',
    'AI Moodboard'
  );

  return (
    <div className="ai-moodboard-page" ref={containerRef}>
      {containerHeight > 0 ? (
        <InfiniteLoaderContainer
          isLoading={isLoading}
          requestLimit={DEFAULT_PAGE_SIZE}
          items={items}
          itemHeight={ITEM_HEIGHT}
          itemWidth={ITEM_WIDTH}
          getData={handleGetData}
          changeHeight={updateContainerHeight}
          containerHeight={containerHeight}
          total={total}
          noResultHint={emptyResultHint}
          noResultHintAction={handleNoResultAction}
        >
          {renderItems}
        </InfiniteLoaderContainer>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export const AiMoodboardPage = forwardRef(AiMoodboardPageComponent);