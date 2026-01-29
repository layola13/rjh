import { useState, useEffect, useRef, createElement } from 'react';
import { Modal, Button, Tooltip, IconfontView, Scroll } from './UIComponents';
import { Progress } from './Progress';
import emptyImageUrl from './assets/empty.png';

enum SmartLayoutState {
  Initial = -1,
  Queneing = 0,
  Calculating = 1,
  Success = 2,
  Error = 3,
}

interface LayoutResult {
  id: string;
  name: string;
  imgUrl1: string;
  imgUrl2?: string;
  designJsonUrl: string;
}

interface TaskStatusResponse {
  taskStatus: SmartLayoutState;
  taskStartTime?: number;
  resultList?: LayoutResult[];
  taskDesc?: string;
}

interface DesignInfo {
  designId: string;
  designVersion: string;
}

interface SmartLayoutDialogProps {
  checkCondition: () => boolean;
  MAX_TIME: number;
  getDesignInfo: () => DesignInfo;
  getTaskResult: () => Promise<TaskStatusResponse>;
  submitCallback: () => void;
}

interface MtopResponse<T> {
  ret: string[];
  data: T;
}

const QUEUE_POLLING_INTERVAL = 5000;
const CALCULATION_POLLING_INTERVAL = 5000;
const PROGRESS_INCREMENT_PER_INTERVAL = 5;

const SmartLayoutDialog: React.FC<SmartLayoutDialogProps> = ({
  checkCondition,
  MAX_TIME,
  getDesignInfo,
  getTaskResult,
  submitCallback,
}) => {
  const [layoutState, setLayoutState] = useState<SmartLayoutState>(SmartLayoutState.Initial);
  const [isConditionValid, setIsConditionValid] = useState<boolean>(true);
  const [progressPercentage, setProgressPercentage] = useState<number>(1);
  const [resultList, setResultList] = useState<LayoutResult[]>([]);
  const [selectedLayoutId, setSelectedLayoutId] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('生成失败');

  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const queuePollingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const calculationPollingTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    initializeDialog();
    return () => {
      if (queuePollingTimerRef.current) {
        clearInterval(queuePollingTimerRef.current);
      }
      if (calculationPollingTimerRef.current) {
        clearInterval(calculationPollingTimerRef.current);
      }
    };
  }, []);

  const initializeDialog = async (): Promise<void> => {
    setIsConditionValid(checkCondition());
    const taskStatus = await getTaskResult();
    const { taskStatus: status, taskStartTime, resultList: results, taskDesc } = taskStatus;

    setLayoutState(status);

    if (status === SmartLayoutState.Success) {
      setResultList(results ?? []);
      setSelectedLayoutId(results?.[0]?.id ?? '');
    } else if (status === SmartLayoutState.Error) {
      if (taskDesc === 'timeout') {
        setErrorMessage(ResourceManager.getString('store_smart_layout_timeout'));
      }
    } else if (status === SmartLayoutState.Calculating) {
      startCalculationPolling(taskStartTime);
    } else if (status === SmartLayoutState.Queneing) {
      startQueuePolling();
    }
  };

  const submitTask = async (): Promise<void> => {
    try {
      const app = HSApp.App.getApp();
      const smartLayoutPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.StoreSmartLayout);
      const handler = smartLayoutPlugin?.getHandler();
      
      const canSave = await handler?.checkSave();
      if (!canSave) {
        return;
      }

      const layerEditPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.LayerEdit);
      const floorplanData = await layerEditPlugin.exportFloorplanModificationData(adskUser.enterpriseId);
      const paramJson = JSON.stringify(floorplanData);

      const { designId, designVersion } = getDesignInfo();

      await NWTK.mtop.StoreSmartLayout.submitTask({
        data: {
          designId,
          designVersion,
          paramJson,
        },
      }).then((response: MtopResponse<unknown>) => {
        if (response?.ret[0].includes('SUCCESS')) {
          return response.data;
        }
        return Promise.reject(response.data);
      });

      submitCallback();
      startQueuePolling();
      setLayoutState(SmartLayoutState.Queneing);
    } catch (error: unknown) {
      const errorData = error as { ret?: string[] };
      const retMessage = errorData?.ret?.[0];
      const message = retMessage?.includes('FAIL_BIZ_ERROR') && retMessage.split('::')[1]
        ? retMessage.split('::')[1]
        : '提交失败';
      setErrorMessage(message);
      setLayoutState(SmartLayoutState.Error);
    }
  };

  const startQueuePolling = (): void => {
    queuePollingTimerRef.current = setInterval(async () => {
      try {
        const taskStatus = await getTaskResult();
        const { taskStatus: status, taskStartTime } = taskStatus ?? {};

        setLayoutState(status);

        if (status !== SmartLayoutState.Queneing) {
          if (queuePollingTimerRef.current) {
            clearInterval(queuePollingTimerRef.current);
          }
          startCalculationPolling(taskStartTime);
        }
      } catch (error) {
        console.error('后端请求失败:', error);
        if (queuePollingTimerRef.current) {
          clearInterval(queuePollingTimerRef.current);
        }
      }
    }, QUEUE_POLLING_INTERVAL);
  };

  const startCalculationPolling = (taskStartTime?: number): void => {
    if (taskStartTime) {
      const progress = calculateProgress(taskStartTime);
      setProgressPercentage(progress);
    }

    calculationPollingTimerRef.current = setInterval(async () => {
      try {
        setProgressPercentage((prev) => Math.min(prev + (PROGRESS_INCREMENT_PER_INTERVAL / MAX_TIME) * 100, 99));

        const taskStatus = await getTaskResult();
        const { taskStatus: status, resultList: results, taskDesc } = taskStatus ?? {};

        setLayoutState(status);

        if (status === SmartLayoutState.Success) {
          setResultList(results ?? []);
          setSelectedLayoutId(results?.[0]?.id ?? '');
          setLayoutState(SmartLayoutState.Success);
          if (calculationPollingTimerRef.current) {
            clearInterval(calculationPollingTimerRef.current);
          }
        } else if (status === SmartLayoutState.Error) {
          if (taskDesc === 'timeout') {
            setErrorMessage(ResourceManager.getString('store_smart_layout_timeout'));
          }
          if (calculationPollingTimerRef.current) {
            clearInterval(calculationPollingTimerRef.current);
          }
        }
      } catch (error) {
        console.error('后端请求失败:', error);
        if (calculationPollingTimerRef.current) {
          clearInterval(calculationPollingTimerRef.current);
        }
      }
    }, CALCULATION_POLLING_INTERVAL);
  };

  const calculateProgress = (startTime: number): number => {
    const elapsedTime = Date.now() - startTime;
    const progress = Math.max((elapsedTime / MAX_TIME) * 100, 1);
    return Math.min(progress, 99);
  };

  const fetchLayoutData = async (url: string): Promise<unknown> => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  };

  const applyLayout = async (designJsonUrl: string): Promise<void> => {
    try {
      const layoutData = await fetchLayoutData(designJsonUrl);
      const app = HSApp.App.getApp();
      const { designId } = getDesignInfo();
      const designMetadata = app.designMetadata;
      const originalDesignName = designMetadata.get('designName') as string;

      await app.openDocument(layoutData, designMetadata, designId);

      app.designMetadata.setValue('designName', originalDesignName);
      app.designMetadata.flush();
    } catch (error) {
      console.error('应用布局失败:', error);
    }
  };

  const handleApplyLayout = async (): Promise<void> => {
    if (!selectedLayoutId) {
      return;
    }

    try {
      const selectedLayout = resultList.find((layout) => layout.id === selectedLayoutId);
      if (selectedLayout) {
        await applyLayout(selectedLayout.designJsonUrl);
        Modal.close('basic');
      }
    } catch (error) {
      console.error('应用布局失败:', error);
    }
  };

  const handleLayoutSelect = (layoutId: string): void => {
    setSelectedLayoutId(layoutId);
  };

  const renderGenerateButton = (buttonText: string, additionalClassName: string = ''): JSX.Element => {
    return (
      <div className="layout-button-container" ref={buttonContainerRef}>
        {isConditionValid ? (
          <Button
            className={`smart-layout-btn normal ${additionalClassName}`}
            onClick={submitTask}
            disabled={false}
            type="primary"
          >
            {buttonText}
          </Button>
        ) : (
          <Tooltip
            placement="bottom"
            title={ResourceManager.getString('store_smart_layout_floorplan_invalid_tips')}
            color="dark"
            getPopupContainer={() => buttonContainerRef.current!}
          >
            <Button className={`smart-layout-btn unable ${additionalClassName}`} type="primary">
              {buttonText}
              <IconfontView showType="hs_shuxingmianban_xiangqing" />
            </Button>
          </Tooltip>
        )}
      </div>
    );
  };

  const renderCompletedState = (): JSX.Element => {
    const selectedLayout = resultList.find((layout) => layout.id === selectedLayoutId);

    return (
      <div className="smart-layout-content completed">
        <div className="completed-container">
          <div className="left-panel">
            <Scroll className="scroll-area" type="simple" showScroll={true}>
              <div className="plans-list">
                {resultList.map((layout) => (
                  <div
                    key={layout.id}
                    className={`plan-item ${selectedLayoutId === layout.id ? 'selected' : ''}`}
                    onClick={() => handleLayoutSelect(layout.id)}
                  >
                    <div className="plan-thumbnail">
                      <img src={layout.imgUrl2 || layout.imgUrl1} alt={layout.name} />
                    </div>
                    <div className="plan-info">
                      <div className="plan-name-container">
                        <div className="plan-name">{layout.name}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Scroll>
          </div>
          <div className="right-panel">
            <div className="preview-image">
              {selectedLayout && (
                <img src={selectedLayout.imgUrl2 || selectedLayout.imgUrl1} alt={selectedLayout.name} />
              )}
            </div>
            <div className="bottom-buttons">
              {renderGenerateButton(ResourceManager.getString('store_smart_layout_regenerate'), 'regenerate-btn')}
              <Button className="apply-btn" type="primary" onClick={handleApplyLayout}>
                应用
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPlaceholderItems = (): JSX.Element[] => {
    return [1, 2, 3].map((index) => <div key={index} className="placeholder-item-large" />);
  };

  const floorProgressPercentage = Math.floor(progressPercentage);

  switch (layoutState) {
    case SmartLayoutState.Queneing:
      return (
        <div className="smart-layout-content calculating error-status">
          <div className="calculating-container">
            <div className="left-panel">
              <div className="placeholder-list">{renderPlaceholderItems()}</div>
            </div>
            <div className="right-panel">
              <div className="progress-section-timeout">
                {ResourceManager.getString('project_render_pendding')}
              </div>
            </div>
          </div>
        </div>
      );

    case SmartLayoutState.Calculating:
      return (
        <div className="smart-layout-content calculating">
          <div className="calculating-container">
            <div className="left-panel">
              <div className="placeholder-list">{renderPlaceholderItems()}</div>
            </div>
            <div className="right-panel">
              <div className="progress-section">
                <div className="progress-section-title">
                  <div className="progress-text">
                    {ResourceManager.getString('store_smart_layout_calculating')}
                  </div>
                  <div className="progress-percentage">{floorProgressPercentage}%</div>
                </div>
                <Progress percent={floorProgressPercentage} showInfo={false} strokeColor="#000" />
                <div className="progress-subtitle">
                  {ResourceManager.getString('store_smart_layout_close')} 预计等待15分钟
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case SmartLayoutState.Error:
      return (
        <div className="smart-layout-content calculating error-status">
          <div className="calculating-container">
            <div className="left-panel">
              <div className="placeholder-list">{renderPlaceholderItems()}</div>
            </div>
            <div className="right-panel">
              <div className="progress-section-timeout">{errorMessage}</div>
            </div>
          </div>
          <div className="bottom-buttons">
            {renderGenerateButton(ResourceManager.getString('store_smart_layout_regenerate'), 'regenerate-btn')}
          </div>
        </div>
      );

    case SmartLayoutState.Success:
      return renderCompletedState();

    default:
      return (
        <div className="smart-layout-content initial">
          <div className="preview-area">
            <div className="preview-placeholder">
              <img src={emptyImageUrl} alt="empty" />
            </div>
          </div>
          <div className="layout-button-section">{renderGenerateButton('生成布局')}</div>
        </div>
      );
  }
};

export const showSmartLayoutDialog = (props: SmartLayoutDialogProps): void => {
  Modal.basic({
    className: 'store-smart-layout-modal',
    title: ResourceManager.getString('store_smart_layout_title'),
    content: createElement(SmartLayoutDialog, props),
    enableCheckbox: false,
    hideCancelButton: true,
    hideOkButton: true,
    showFooter: false,
    containerClassName: 'store-smart-layout-modal-container',
  });
};

export { SmartLayoutState };