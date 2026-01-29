export interface LogParams {
  actionType: string;
  description: string;
  clicksRatio?: number;
  triggerType?: string;
}

export interface TrackEventData {
  description: string;
  activeSectionName: string;
  activeSection: string;
  clicksRatio?: number;
}

export interface TrackEventOptions {
  triggerType?: string;
}

export interface UserTrackLogger {
  push(
    actionType: string,
    eventData: TrackEventData,
    options?: TrackEventOptions
  ): void;
}

export interface HSAppInstance {
  userTrackLogger: UserTrackLogger;
}

export interface HSAppUtil {
  EventGroupEnum: {
    Toolbar: string;
    [key: string]: string;
  };
}

declare global {
  const HSApp: {
    App: {
      getApp(): HSAppInstance;
    };
    Util: HSAppUtil;
  };
}

export function log(params: LogParams): void {
  try {
    const { actionType, description, clicksRatio, triggerType } = params;
    
    HSApp.App.getApp().userTrackLogger.push(
      actionType,
      {
        description,
        activeSectionName: '工具栏',
        activeSection: HSApp.Util.EventGroupEnum.Toolbar,
        clicksRatio,
      },
      {
        triggerType,
      }
    );
  } catch (error) {
    // Silent error handling
  }
}

export function logRemind(params: LogParams): void {
  try {
    const { actionType, description, clicksRatio, triggerType } = params;
    
    HSApp.App.getApp().userTrackLogger.push(
      actionType,
      {
        description,
        activeSectionName: '教程唤醒',
        activeSection: 'teaching.remind',
        clicksRatio,
      },
      {
        triggerType,
      }
    );
  } catch (error) {
    // Silent error handling
  }
}