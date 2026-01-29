import { useState, useEffect, useRef } from 'react';
import React from 'react';

interface AiMoodboardItemData {
  taskId: string;
  subTaskId: string;
  imageName: string;
  processSchedule: number;
  processStatus: number;
  imageUrl: string;
}

interface AiMoodboardItemProps {
  item: AiMoodboardItemData;
  showViewer: () => void;
  stopPolling?: () => void;
}

interface QueryScheduleResponse {
  ret?: Array<string>;
  data?: {
    imageResultList: Array<{
      processSchedule?: number;
      processStatus?: number;
      imageUrl?: string;
    }>;
  };
  taskId?: string;
}

interface ScheduleResult {
  percent: number;
  status: number;
  coverImageUrl: string;
  taskId: string;
}

interface IconfontViewProps {
  showType: string;
  customStyle?: {
    fontSize?: string;
    color?: string;
  };
  customClass?: string;
  iconOnclick?: () => void;
}

interface IconComponent {
  IconfontView: React.ComponentType<IconfontViewProps>;
}

declare const ResourceManager: {
  getString(key: string): string;
};

declare const IconModule: IconComponent;
declare const ApiService: {
  queryAiMoodboardSchedule(params: { taskId: string; sceneType: number }): Promise<QueryScheduleResponse>;
};

const PROCESS_STATUS = {
  PENDING: 0,
  PROCESSING: 1,
  SUCCESS: 2,
  FAILED: 3,
  ERROR: 4,
  TIMEOUT: 5,
} as const;

const SCENE_TYPE = 6;
const POLL_INTERVAL = 5000;
const COMPLETE_PERCENT = 100;

export const AiMoodboardItem: React.FC<AiMoodboardItemProps> = (props) => {
  const { item, showViewer, stopPolling } = props;

  const [processSchedule, setProcessSchedule] = useState<number>(item.processSchedule);
  const [processStatus, setProcessStatus] = useState<number>(item.processStatus);
  const [imageUrl, setImageUrl] = useState<string>(item.imageUrl);

  const pollingTimerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const isProcessing = [PROCESS_STATUS.PENDING, PROCESS_STATUS.PROCESSING].includes(item.processStatus);
    
    if (isProcessing) {
      startPolling();
    }

    return () => {
      clearPolling();
    };
  }, [item.processStatus]);

  const clearPolling = (): void => {
    clearInterval(pollingTimerRef.current);
  };

  const querySchedule = async (): Promise<ScheduleResult> => {
    const response = await ApiService.queryAiMoodboardSchedule({
      taskId: item.taskId,
      sceneType: SCENE_TYPE,
    });

    const isSuccess = response.ret?.[0]?.includes('SUCCESS');
    
    if (isSuccess && response.data) {
      const imageResult = response.data.imageResultList[0] ?? {};
      const { processSchedule: schedule, processStatus: status, imageUrl: url } = imageResult;

      if (schedule) {
        setProcessSchedule(schedule);
      }

      return {
        percent: schedule ?? 0,
        status: status ?? PROCESS_STATUS.FAILED,
        coverImageUrl: url ?? '',
        taskId: response.taskId ?? '',
      };
    }

    return Promise.reject(response);
  };

  const startPolling = async (): Promise<void> => {
    try {
      const result = await querySchedule();
      const isProcessing = [PROCESS_STATUS.PENDING, PROCESS_STATUS.PROCESSING].includes(result.status);

      if (isProcessing) {
        pollingTimerRef.current = setInterval(async () => {
          try {
            const pollResult = await querySchedule();
            const isComplete = pollResult.status === PROCESS_STATUS.SUCCESS || pollResult.percent === COMPLETE_PERCENT;

            if (isComplete) {
              clearPolling();
              setProcessSchedule(COMPLETE_PERCENT);
              setImageUrl(pollResult.coverImageUrl);
              setProcessStatus(pollResult.status);
              stopPolling?.();
            }
          } catch (error) {
            // Handle polling error
          }
        }, POLL_INTERVAL);
      }
    } catch (error) {
      // Handle initial query error
    }
  };

  const { subTaskId, imageName } = item;

  if (processStatus === PROCESS_STATUS.SUCCESS && imageUrl) {
    return (
      <div className="ai-moodboard-item" key={subTaskId}>
        <div className="ai-moodboard-img-block">
          <img className="ai-moodboard-img" src={imageUrl} alt={imageName} />
          <div className="ai-moodboard-item-mask">
            <IconModule.IconfontView
              showType="hs_xian_sousuo"
              customStyle={{ fontSize: '26px', color: '#fff' }}
              customClass="ai-moodboard-search-icon"
              iconOnclick={showViewer}
            />
          </div>
        </div>
        <p className="ai-moodboard-item-name">{imageName}</p>
      </div>
    );
  }

  const isFailedStatus = [PROCESS_STATUS.FAILED, PROCESS_STATUS.ERROR, PROCESS_STATUS.TIMEOUT].includes(processStatus);
  
  if (isFailedStatus) {
    return (
      <div className="ai-moodboard-item" key={subTaskId}>
        <div className="ai-moodboard-img-block ai-moodboard-failed-item">
          <IconModule.IconfontView
            showType="shibai"
            customStyle={{ fontSize: '36px' }}
            customClass="ai-moodboard-search-icon"
          />
          <div className="failed-text">
            {ResourceManager.getString('render_hdr_process_fail')}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-moodboard-item" key={subTaskId}>
      <div className="ai-moodboard-img-block ai-moodboard-processing-item">
        <div className="processing-percent">
          {processSchedule ? `${processSchedule}%` : ''}
        </div>
        <div className="processing-text">
          {ResourceManager.getString('ai_moodboard_uploading')}
        </div>
      </div>
      <p className="ai-moodboard-item-name">{imageName}</p>
    </div>
  );
};