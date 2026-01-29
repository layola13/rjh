import { useState, useEffect, useRef } from 'react';
import React from 'react';

interface ThreeDViewerProps {
  close: () => void;
  taskId?: string;
  jid?: string;
}

interface MessageEvent {
  data?: {
    eType?: string;
  };
}

interface QueryScheduleResponse {
  taskId: string;
}

interface DataManager {
  queryAiModelerSchedule(params: { jid: string }): Promise<QueryScheduleResponse>;
}

interface BaseApiManager {
  dataManager: DataManager;
}

interface CatalogNamespace {
  BaseApiManager: {
    getInstance(): BaseApiManager;
  };
}

interface ConfigNamespace {
  EZHOME_HOST: string;
}

interface HSAppNamespace {
  Catalog: CatalogNamespace;
  Config: ConfigNamespace;
}

declare global {
  interface Window {
    HSApp: HSAppNamespace;
  }
}

/**
 * 3D Viewer component for displaying AI modeler results
 * @param props - Component properties
 */
export const ThreeDViewer: React.FC<ThreeDViewerProps> = (props) => {
  const { close, taskId: initialTaskId, jid } = props;
  
  const [taskId, setTaskId] = useState<string | undefined>(initialTaskId);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const handleMessage = (event: MessageEvent): void => {
    if (event.data && event.data.eType === 'closePopup') {
      close();
    }
  };

  const queryTaskId = (): void => {
    if (!jid) return;

    const apiManager = window.HSApp.Catalog.BaseApiManager.getInstance();
    apiManager.dataManager
      .queryAiModelerSchedule({ jid })
      .then((response: QueryScheduleResponse) => {
        setTaskId(response.taskId);
      });
  };

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.onload = (): void => {
        setIsLoading(false);
      };
    }

    window.addEventListener('message', handleMessage as EventListener, false);

    return (): void => {
      window.removeEventListener('message', handleMessage as EventListener, false);
    };
  }, [taskId]);

  useEffect(() => {
    if (!taskId) {
      queryTaskId();
    }
  }, []);

  const viewerUrl = taskId
    ? `https://${window.HSApp.Config.EZHOME_HOST}/ai-modeler/viewer?taskId=${taskId}`
    : '';

  return (
    <div className="viewer-content">
      {taskId && (
        <iframe
          ref={iframeRef}
          style={{
            width: '100%',
            height: '100%',
          }}
          src={viewerUrl}
        />
      )}
    </div>
  );
};