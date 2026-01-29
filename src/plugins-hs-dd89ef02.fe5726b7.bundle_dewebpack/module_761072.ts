export interface LogParams {
  actionType: string;
  description: string;
  clicksRatio: number;
  triggerType: string;
}

export function log(params: LogParams): void {
  try {
    const { actionType, description, clicksRatio, triggerType } = params;
    
    HSApp.App.getApp().userTrackLogger.push(
      actionType,
      {
        description,
        activeSection: HSApp.Util.EventGroupEnum.Pageheader,
        activeSectionName: "顶部通栏",
        clicksRatio
      },
      {
        triggerType
      }
    );
  } catch (error) {
    // Silent error handling
  }
}