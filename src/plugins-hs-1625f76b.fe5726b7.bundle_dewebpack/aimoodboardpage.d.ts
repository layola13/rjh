import React, { forwardRef, useRef, useState, useEffect, useImperativeHandle } from 'react';
import InfiniteLoaderContainer from './InfiniteLoaderContainer';
import Loading from './Loading';
import { AiMoodboardItem } from './AiMoodboardItem';
import { AIPagePanelId } from './constants';
import apiService from './apiService';

/**
 * AI Moodboard 配置接口
 */
interface AiMoodboardConfig {
  sceneType: number;
  offset?: number;
  limit?: number;
}

/**
 * AI Moodboard 项目数据结构
 */
interface AiMoodboardItemData {
  taskId: string;
  subTaskId: string;
  traceIds?: Record<string, unknown>;
  [key: string]: unknown;
}

/**
 * API 查询响应结构
 */
interface QueryResponse {
  ret?: string[];
  data?: {
    items?: AiMoodboardItemData[];
    total?: number;
    traceIds?: Record<string, unknown>;
  };
}

/**
 * 组件状态接口
 */
interface MoodboardState {
  isLoading: boolean;
  items: AiMoodboardItemData[];
  total: number;
}

/**
 * 组件 Props 接口
 */
interface AiMoodboardPageProps {
  /** 获取容器高度的函数 */
  getContainerHeight: () => number;
  /** 获取预配置的异步函数 */
  getPreConfig?: () => Promise<AiMoodboardConfig>;
}

/**
 * 组件暴露的方法接口
 */
export interface AiMoodboardPageHandle {
  /** 获取初始数据 */
  getInitData: () => Promise<void>;
}

/** 每页加载的数据条数 */
const ITEMS_PER_PAGE = 20;

/** 每个项目的高度（像素） */
const ITEM_HEIGHT = 198;

/** 每个项目的宽度（像素） */
const ITEM_WIDTH = 244;

/** 默认场景类型 */
const DEFAULT_SCENE_TYPE = 6;

/**
 * AI Moodboard 页面组件
 * 
 * 提供 AI 生成的情绪板图片列表展示，支持无限滚动加载
 */
export const AiMoodboardPage = forwardRef<AiMoodboardPageHandle, AiMoodboardPageProps>(
  ({ getContainerHeight, getPreConfig }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    
    const [state, setState] = useState<MoodboardState>({
      isLoading: true,
      items: [],
      total: 0,
    });

    const configRef = useRef<AiMoodboardConfig>({
      sceneType: DEFAULT_SCENE_TYPE,
    });

    const [containerHeight, setContainerHeight] = useState<number>(0);

    /**
     * 查询 AI 图片列表
     * @param page - 页码（从1开始）
     * @returns Promise<QueryResponse['data']>
     */
    const queryAiImageList = async (page: number = 1): Promise<QueryResponse['data']> => {
      const queryParams: AiMoodboardConfig = {
        ...configRef.current,
        offset: ITEMS_PER_PAGE * (page - 1),
        limit: ITEMS_PER_PAGE,
      };

      const response = await apiService.queryAiImageList(queryParams);
      
      if (
        response?.ret?.[0]?.includes('SUCCESS') &&
        response.data
      ) {
        const { items = [], traceIds = {} } = response.data;
        
        // 为每个项目添加 traceIds
        items.forEach((item) => {
          item.traceIds = traceIds;
        });

        return response.data;
      }

      return Promise.reject(response);
    };

    /**
     * 更新容器高度
     */
    const updateContainerHeight = (): void => {
      const height = getContainerHeight();
      setContainerHeight(height);
    };

    /**
     * 初始化数据加载
     */
    const initializeData = async (): Promise<void> => {
      setState((prevState) => ({
        ...prevState,
        isLoading: true,
      }));

      const data = await queryAiImageList();
      
      setState({
        isLoading: false,
        items: data?.items ?? [],
        total: data?.total ?? 0,
      });

      updateContainerHeight();
    };

    /**
     * 显示图片查看器
     * @param item - 要查看的图片项
     */
    const showImageViewer = (item: AiMoodboardItemData): void => {
      const app = HSApp.App.getApp();
      const catalogPlugin = app.pluginManager.getPlugin(
        HSFPConstants.PluginType.Catalog
      );

      catalogPlugin?.showMoodboardImageViewer({
        taskId: item.taskId,
        subTaskId: item.subTaskId,
      });

      HSApp.Util.EventTrack.instance().track(
        HSApp.Util.EventGroupEnum.Catalog,
        'ai_moodboard_viewer_event'
      );
    };

    /**
     * 处理无结果时的操作
     */
    const handleNoResultAction = (): void => {
      const app = HSApp.App.getApp();
      const catalogPlugin = app.pluginManager.getPlugin(
        HSFPConstants.PluginType.Catalog
      );

      catalogPlugin?.openPagePanel(AIPagePanelId.AiMoodboard);
    };

    /**
     * 加载更多数据
     * @param page - 页码
     * @returns Promise<AiMoodboardItemData[]>
     */
    const loadMoreData = async (page: number): Promise<AiMoodboardItemData[]> => {
      const data = await queryAiImageList(page);
      return data?.items ?? [];
    };

    // 初始化加载
    useEffect(() => {
      const initialize = async () => {
        if (getPreConfig) {
          const config = await getPreConfig();
          configRef.current = config;
        }
        await initializeData();
      };

      initialize();
    }, []);

    // 暴露方法给父组件
    useImperativeHandle(
      ref,
      () => ({
        getInitData: initializeData,
      }),
      []
    );

    const emptyResultMessage = ResourceManager.getString('ai_moodboard_empty_result').replace(
      '{ai}',
      'AI Moodboard'
    );

    return (
      <div className="ai-moodboard-page" ref={containerRef}>
        {containerHeight > 0 ? (
          <InfiniteLoaderContainer
            isLoading={state.isLoading}
            requestLimit={ITEMS_PER_PAGE}
            items={state.items}
            itemHeight={ITEM_HEIGHT}
            itemWidth={ITEM_WIDTH}
            getData={loadMoreData}
            changeHeight={updateContainerHeight}
            containerHeight={containerHeight}
            total={state.total}
            noResultHint={emptyResultMessage}
            noResultHintAction={handleNoResultAction}
          >
            {(items: AiMoodboardItemData[]) =>
              items.map((item) => (
                <AiMoodboardItem
                  key={`${item.taskId}-${item.subTaskId}`}
                  item={item}
                  showViewer={() => showImageViewer(item)}
                />
              ))
            }
          </InfiniteLoaderContainer>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
);

AiMoodboardPage.displayName = 'AiMoodboardPage';