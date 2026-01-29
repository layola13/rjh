interface LogData {
  description: string;
  argInfo?: Record<string, any>;
  group: string;
  type?: string;
  templateDesignId?: string;
  validOperation?: boolean;
}

interface ApplyLogParams {
  triggerType?: 'start' | 'end' | 'restore';
  templateDesignId?: string;
  isHelpDesign?: boolean;
  applyContentType?: string;
  isWholeHouse?: boolean;
  targetRoomType?: string;
  targetRoomId?: string;
  templateRoomType?: string;
  templateRoomId?: string;
  status?: 'cancel' | 'fail' | 'success';
  useConstraintLayout?: boolean;
}

interface CreateLogParams {
  triggerType: 'start' | 'end';
  createMode?: 'both' | 'onlyWhole' | 'onlySingle';
  wholeDesignId?: string;
  singleRoomDesignIds?: string[];
  status?: 'fail' | 'cancel' | 'success';
}

interface QueryResultItem {
  ret?: string[];
  data?: {
    result: string;
  };
}

interface OriginDataItem {
  roomCount?: number;
}

interface CreateDataParams {
  triggerType: string;
  status?: string;
  queryResult?: QueryResultItem[];
  originData?: OriginDataItem[];
}

interface Room {
  id: string;
  roomType: string;
}

interface CustomizedRoom {
  roomId: string;
  roomType: string;
}

interface StylerTemplate {
  id: string;
  apply: string;
  customizedRoom?: CustomizedRoom;
}

interface TemplateDesignData {
  id: string;
  customizedRoom?: CustomizedRoom;
  contentType: {
    isTypeOf: (type: any) => boolean;
  };
}

interface TrackLoggerRelativeData {
  templateDesignData: TemplateDesignData;
  isHelpDesign: boolean;
}

interface RestoreApplyData {
  trackLoggerRelativeData: TrackLoggerRelativeData;
  targetRoom?: Room;
  extraData?: {
    useConstraintLayout?: boolean;
  };
}

interface StandardApplyData {
  triggerType: string;
  stylerTemplate: StylerTemplate;
  targetRoom?: Room;
  isHelpDesign: boolean;
  isWholeHouse: boolean;
  status?: 'cancel' | 'fail' | 'success';
}

interface LogEventData {
  logType: 'apply' | 'create';
  data: RestoreApplyData | StandardApplyData | CreateDataParams;
}

interface LogEvent {
  data: LogEventData;
}

import { createLogData } from './log-utils';
import { HSCatalog } from './catalog';

function createApplyLog(params: ApplyLogParams): any[] {
  const {
    triggerType = 'start',
    templateDesignId = '',
    isHelpDesign = false,
    applyContentType,
    isWholeHouse = true,
    targetRoomType = '',
    targetRoomId = '',
    templateRoomType = '',
    templateRoomId = '',
    status,
    useConstraintLayout
  } = params;

  let description: string;
  let validOperation: boolean | undefined;

  switch (triggerType) {
    case 'start':
      description = '样板间应用功能状态:开始';
      break;
    case 'end':
      description = '样板间应用功能状态:结束';
      validOperation = true;
      if (status === 'cancel') {
        description = '样板间应用功能状态:取消';
        validOperation = false;
      } else if (status === 'fail') {
        description = '样板间应用功能状态:失败';
        validOperation = false;
      }
      break;
    default:
      description = '样板间应用功能状态:一键还原';
  }

  const logData: LogData = {
    description,
    argInfo: {
      entryType: isHelpDesign ? '帮我设计' : '目录',
      isWholeHouse
    },
    group: HSFPConstants.LogGroupTypes.TemplateDesign,
    type: applyContentType,
    templateDesignId
  };

  if (validOperation !== undefined) {
    logData.validOperation = validOperation;
  }

  if (!isWholeHouse) {
    logData.argInfo!.targetRoomType = targetRoomType;
    logData.argInfo!.targetRoomId = targetRoomId;
    logData.argInfo!.templateRoomId = templateRoomId;
    logData.argInfo!.templateRoomType = templateRoomType;
  }

  if (useConstraintLayout !== undefined) {
    logData.argInfo!.useConstraintLayout = useConstraintLayout;
  }

  return triggerType === 'restore'
    ? [createLogData('templateDesign.Apply', logData, false)]
    : [createLogData('templateDesign.Apply', logData, false, triggerType)];
}

function buildCreateLog(params: CreateLogParams): any[] {
  const { triggerType, createMode, wholeDesignId, singleRoomDesignIds, status } = params;

  let description: string;
  let validOperation: boolean | undefined;

  if (triggerType === 'start') {
    description = '样板间创建功能状态:开始';
  } else {
    description = '样板间创建功能状态:结束';
    validOperation = true;
    if (status === 'fail') {
      description = '样板间创建功能状态:失败';
      validOperation = false;
    } else if (status === 'cancel') {
      description = '样板间创建功能状态:取消';
      validOperation = false;
    }
  }

  const logData: LogData = {
    description,
    group: HSFPConstants.LogGroupTypes.TemplateDesign
  };

  if (createMode) {
    logData.type = createMode;
  }

  if (wholeDesignId || singleRoomDesignIds) {
    const argInfo: Record<string, any> = {};
    if (wholeDesignId) {
      argInfo.wholeDesignId = wholeDesignId;
    }
    if (singleRoomDesignIds) {
      argInfo.singleRoomDesignIds = singleRoomDesignIds;
    }
    logData.argInfo = argInfo;
  }

  if (validOperation !== undefined) {
    logData.validOperation = validOperation;
  }

  return [createLogData('templateDesign.Create', logData, false, triggerType)];
}

function processCreateLog(params: CreateDataParams): any[] {
  const { triggerType, status, queryResult, originData } = params;

  const processedParams: CreateLogParams = {
    triggerType: triggerType as 'start' | 'end'
  };

  if (triggerType === 'end') {
    processedParams.status = status;

    if (queryResult?.[0]?.ret?.[0]?.includes('SUCCESS')) {
      if (status === 'success') {
        let hasRoomCount = false;
        let hasOther = false;
        const designIds: string[] = [];

        queryResult.forEach((item) => {
          designIds.push(item.data!.result);
        });

        originData?.forEach((item) => {
          if (item.roomCount !== undefined) {
            hasRoomCount = true;
          } else {
            hasOther = true;
          }
        });

        if (hasRoomCount && hasOther) {
          processedParams.createMode = 'both';
          processedParams.wholeDesignId = designIds.shift();
          processedParams.singleRoomDesignIds = designIds;
        } else if (hasRoomCount) {
          processedParams.createMode = 'onlyWhole';
          processedParams.wholeDesignId = designIds.shift();
        } else {
          processedParams.createMode = 'onlySingle';
          processedParams.singleRoomDesignIds = designIds;
        }
      }
    } else {
      processedParams.status = 'fail';
    }
  }

  return buildCreateLog(processedParams);
}

function handleRestoreApply(data: RestoreApplyData): any[] {
  const { trackLoggerRelativeData, targetRoom, extraData } = data;
  const { templateDesignData } = trackLoggerRelativeData;
  const { customizedRoom } = templateDesignData;

  const params: ApplyLogParams = {
    triggerType: 'restore',
    templateDesignId: templateDesignData.id,
    isHelpDesign: trackLoggerRelativeData.isHelpDesign,
    applyContentType: 'restore',
    isWholeHouse: !!templateDesignData.contentType.isTypeOf(HSCatalog.ContentTypeEnum.FullRoom)
  };

  if (targetRoom) {
    params.targetRoomId = targetRoom.id;
    params.targetRoomType = targetRoom.roomType;
  }

  if (customizedRoom) {
    params.templateRoomId = customizedRoom.roomId;
    params.templateRoomType = customizedRoom.roomType;
  }

  if (extraData) {
    params.useConstraintLayout = extraData.useConstraintLayout;
  }

  return createApplyLog(params);
}

function handleStandardApply(data: StandardApplyData): any[] {
  const { triggerType, stylerTemplate, targetRoom, isHelpDesign, isWholeHouse, status } = data;

  const params: ApplyLogParams = {
    triggerType: triggerType as 'start' | 'end' | 'restore',
    templateDesignId: stylerTemplate.id,
    isHelpDesign,
    applyContentType: stylerTemplate.apply,
    isWholeHouse,
    status
  };

  if (targetRoom) {
    params.targetRoomId = targetRoom.id;
    params.targetRoomType = targetRoom.roomType;
  }

  const customizedRoom = stylerTemplate.customizedRoom;
  if (customizedRoom) {
    params.templateRoomId = customizedRoom.roomId;
    params.templateRoomType = customizedRoom.roomType;
  }

  return createApplyLog(params);
}

export default [
  {
    getListenSignal(): any {
      return HSApp.App.getApp()
        .pluginManager.getPlugin(HSFPConstants.PluginType.Autostyler)
        .signalTemplateDesignToLog;
    },
    listen(event: LogEvent): any[] | undefined {
      try {
        const eventData = event.data;

        if (eventData.logType === 'apply') {
          const applyData = eventData.data as RestoreApplyData | StandardApplyData;
          if ('trackLoggerRelativeData' in applyData) {
            return handleRestoreApply(applyData);
          } else {
            return handleStandardApply(applyData);
          }
        }

        if (eventData.logType === 'create') {
          return processCreateLog(eventData.data as CreateDataParams);
        }
      } catch (error) {
        // Silent error handling
      }
    }
  }
];