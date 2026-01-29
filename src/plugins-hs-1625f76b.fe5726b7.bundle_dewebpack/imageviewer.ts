import { useEffect, useMemo } from 'react';
import React from 'react';
import { Message } from './Message';
import MoodBoardService from './MoodBoardService';

interface ImageViewerProps {
  close: () => void;
  taskId: string;
  subTaskId: string;
}

interface MessageEventData {
  eType: 'closePopup' | 'applyDesign';
}

interface SubmitMoodParseResponse {
  ret?: string[];
}

declare global {
  interface Window {
    HSApp: {
      Config: {
        EZHOME_HOST: string;
      };
      Util: {
        EventTrack: {
          instance: () => EventTracker;
        };
        EventGroupEnum: {
          Catalog: string;
        };
      };
      App: {
        getApp: () => App;
      };
    };
    ResourceManager: {
      getString: (key: string) => string;
    };
    HSFPConstants: {
      PluginType: {
        StartUpAction: string;
      };
    };
  }

  interface EventTracker {
    track: (group: string, event: string) => void;
  }

  interface Plugin {
    executeAction: (action: string, params: Record<string, unknown>) => void;
  }

  interface PluginManager {
    getPlugin: (type: string) => Plugin | null;
  }

  interface App {
    pluginManager: PluginManager;
  }
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ close, taskId, subTaskId }) => {
  const handleMessage = (event: MessageEvent<MessageEventData>): void => {
    if (!event.data) {
      return;
    }

    const eventTracker = window.HSApp.Util.EventTrack.instance();

    switch (event.data.eType) {
      case 'closePopup':
        close();
        eventTracker.track(
          window.HSApp.Util.EventGroupEnum.Catalog,
          'ai_moodboard_viewer_close_event'
        );
        break;
      case 'applyDesign':
        applyDesign();
        eventTracker.track(
          window.HSApp.Util.EventGroupEnum.Catalog,
          'ai_moodboard_apply_event'
        );
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('message', handleMessage, false);
    return () => {
      window.removeEventListener('message', handleMessage, false);
    };
  }, []);

  const viewerUrl = useMemo(() => {
    return `https://${window.HSApp.Config.EZHOME_HOST}/ai-mood-board/viewer?taskId=${taskId}`;
  }, [taskId]);

  const applyDesign = async (): Promise<void> => {
    const response = await MoodBoardService.submitMoodParseModel({ subTaskId });

    if (!response?.ret?.[0].includes('SUCCESS')) {
      if (response?.ret?.[0].includes('FAIL_BIZ_AI_MOOD_BOARD_ROOM_TYPE_NOT_SUPPORT')) {
        Message.error(window.ResourceManager.getString('ai_mood_board_room_type_not_support'));
      } else {
        Message.error(window.ResourceManager.getString('ai.modeler.upload.picture.error.tip'));
      }
      return;
    }

    close();
    
    const plugin = window.HSApp.App.getApp().pluginManager.getPlugin(
      window.HSFPConstants.PluginType.StartUpAction
    );
    
    plugin?.executeAction('applyAIMoodBoard', {
      templateId: subTaskId
    });
  };

  return (
    <div className="image-viewer-content">
      <iframe
        style={{
          width: '100%',
          height: '100%'
        }}
        src={viewerUrl}
      />
    </div>
  );
};