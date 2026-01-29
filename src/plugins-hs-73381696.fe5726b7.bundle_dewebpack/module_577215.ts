import { performanceDateNow } from './performance-utils';

interface Environment {
  getClickRatioData?: (env: Environment) => ClickRatioData | undefined;
  environmentId?: string;
  currentTime?: number;
  performanceCurrentTime?: number;
}

interface ClickRatioData {
  id: string;
  name: string;
}

interface ComputerLogInput {
  newEnvironmentId?: string;
  oldEnvironmentId?: string;
  env?: Environment;
  oldEnv?: Environment;
  lastEnviroment?: Environment;
}

interface LogParams {
  description: string;
  activeEnvironmentId?: string;
  activeEnvironmentName?: string;
  activeSectionName?: string;
  activeSection?: string;
  clicksRatio?: ClickRatioData;
}

interface LogData {
  name: string;
  params: LogParams;
  sendNow: boolean;
  triggerType: 'start' | 'end';
  enableNotes: boolean;
  endParamsCallback?: () => Partial<LogParams>;
  currentTime: number;
  performanceCurrentTime: number;
}

interface ComputerLogHandler {
  test: (input: ComputerLogInput) => boolean;
  getLogDataList: (input: ComputerLogInput) => LogData[];
}

declare const HSFPConstants: {
  Environment: {
    Empty: string;
  };
  EnvironmentName: Record<string, { name: string }>;
};

function getEnvironmentName(environmentId: string): string {
  return HSFPConstants.EnvironmentName[environmentId]?.name ?? environmentId;
}

export const computerLogList: ComputerLogHandler[] = [
  {
    test: (input: ComputerLogInput): boolean => {
      const { newEnvironmentId, oldEnvironmentId } = input;
      const emptyEnv = HSFPConstants.Environment.Empty;
      
      if (!newEnvironmentId || newEnvironmentId === emptyEnv) {
        return false;
      }
      if (!oldEnvironmentId || oldEnvironmentId === emptyEnv) {
        return false;
      }
      
      return true;
    },

    getLogDataList: (input: ComputerLogInput): LogData[] => {
      const { newEnvironmentId, oldEnvironmentId, env, oldEnv } = input;
      const logDataList: LogData[] = [];
      
      const newClickRatio = env?.getClickRatioData?.(env);
      const oldClickRatio = oldEnv?.getClickRatioData?.(oldEnv);
      
      if (oldEnvironmentId) {
        const oldEnvName = getEnvironmentName(oldEnvironmentId);
        const exitDescription = `退出${oldEnvName}环境`;
        
        logDataList.push({
          name: `${oldEnvironmentId}.env`,
          params: {
            description: exitDescription,
            activeEnvironmentId: oldEnvironmentId,
            activeEnvironmentName: oldEnvName,
            activeSectionName: '切换环境',
            activeSection: 'switchenv',
            clicksRatio: oldClickRatio
              ? {
                  id: `exit-${oldClickRatio.id}`,
                  name: `退出-${oldClickRatio.name}`
                }
              : {
                  id: `exit-${oldEnvironmentId}.env`,
                  name: exitDescription
                }
          },
          sendNow: true,
          triggerType: 'end',
          enableNotes: true,
          currentTime: Date.now(),
          performanceCurrentTime: performanceDateNow()
        });
      }
      
      if (newEnvironmentId) {
        const newEnvName = getEnvironmentName(newEnvironmentId);
        const enterDescription = `进入${newEnvName}环境`;
        
        logDataList.push({
          name: `${newEnvironmentId}.env`,
          params: {
            description: enterDescription,
            activeSectionName: '切换环境',
            activeSection: 'switchenv',
            clicksRatio: newClickRatio
              ? {
                  id: `enter-${newClickRatio.id}`,
                  name: `进入-${newClickRatio.name}`
                }
              : {
                  id: `enter-${newEnvironmentId}.env`,
                  name: enterDescription
                }
          },
          sendNow: false,
          triggerType: 'start',
          enableNotes: true,
          endParamsCallback: () => ({
            description: `退出${getEnvironmentName(newEnvironmentId)}环境`
          }),
          currentTime: Date.now(),
          performanceCurrentTime: performanceDateNow()
        });
      }
      
      return logDataList;
    }
  },
  {
    test: (input: ComputerLogInput): boolean => {
      const { newEnvironmentId, oldEnvironmentId, lastEnviroment } = input;
      const emptyEnv = HSFPConstants.Environment.Empty;
      
      if (!newEnvironmentId || newEnvironmentId === emptyEnv) {
        return false;
      }
      if (oldEnvironmentId !== emptyEnv) {
        return false;
      }
      if (!lastEnviroment || lastEnviroment.environmentId === emptyEnv) {
        return false;
      }
      if (newEnvironmentId === lastEnviroment.environmentId) {
        return false;
      }
      
      return true;
    },

    getLogDataList: (input: ComputerLogInput): LogData[] => {
      const { newEnvironmentId, lastEnviroment } = input;
      const logDataList: LogData[] = [];
      
      if (lastEnviroment?.environmentId) {
        const lastEnvName = getEnvironmentName(lastEnviroment.environmentId);
        const exitDescription = `退出${lastEnvName}环境`;
        
        logDataList.push({
          name: `${lastEnviroment.environmentId}.env`,
          params: {
            description: exitDescription,
            activeEnvironmentId: lastEnviroment.environmentId,
            activeEnvironmentName: lastEnvName
          },
          sendNow: true,
          triggerType: 'end',
          enableNotes: true,
          currentTime: lastEnviroment.currentTime ?? Date.now(),
          performanceCurrentTime: lastEnviroment.performanceCurrentTime ?? performanceDateNow()
        });
      }
      
      if (newEnvironmentId) {
        const newEnvName = getEnvironmentName(newEnvironmentId);
        const enterDescription = `进入${newEnvName}环境`;
        
        logDataList.push({
          name: `${newEnvironmentId}.env`,
          params: {
            description: enterDescription
          },
          sendNow: false,
          triggerType: 'start',
          enableNotes: true,
          endParamsCallback: () => ({
            description: `退出${getEnvironmentName(newEnvironmentId)}环境`
          }),
          currentTime: Date.now(),
          performanceCurrentTime: performanceDateNow()
        });
      }
      
      return logDataList;
    }
  }
];