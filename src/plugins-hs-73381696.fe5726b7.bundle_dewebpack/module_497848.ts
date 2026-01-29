import { HSApp } from './518193';
import BaseClass from './891833';
import defaultImport from './7793';

interface LogEntry {
  name: string;
  params: Record<string, unknown>;
  sendNow?: boolean;
  triggerType?: string;
  enableNotes?: boolean;
  endParamsCallback?: () => void;
  currentTime?: number;
  performanceCurrentTime?: number;
}

export default class LogPusher extends BaseClass {
  constructor(config: unknown) {
    super(config, defaultImport);
  }

  pushLog(logs: LogEntry[] | null | undefined): void {
    if (!logs) {
      return;
    }

    logs.forEach((entry: LogEntry) => {
      HSApp.Logger.userTrackLogger.push(entry.name, entry.params, {
        sendNow: entry.sendNow,
        triggerType: entry.triggerType,
        enableNotes: entry.enableNotes,
        endParamsCallback: entry.endParamsCallback,
        currentTime: entry.currentTime,
        performanceCurrentTime: entry.performanceCurrentTime
      });
    });
  }
}