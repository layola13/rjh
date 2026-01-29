import { TimeTaskHandle } from './280069';
import { HSApp } from './518193';
import { LogTriggerType } from './985785';
import BaseLogger from './891833';

interface LogEntry {
  actionType: string;
  params: Record<string, unknown>;
  options: LogOptions;
}

interface LogOptions {
  actionTypeSuffix: string;
  triggerType?: LogTriggerType;
  notSend?: boolean;
  description?: string;
}

interface Main2DView {
  signalZoom?: {
    listen: (callback: () => void) => void;
  };
}

interface EditorContext {
  getMain2DView: () => Main2DView | null | undefined;
}

export default class CanvasPerformanceLogger extends BaseLogger {
  private timeTaskHandle: TimeTaskHandle;

  constructor(context: EditorContext) {
    super(context, BaseLogger);
    this.timeTaskHandle = TimeTaskHandle.getTimeTaskHandle();
    this.canvasZoom(context);
  }

  private canvasZoom(context: EditorContext | null): void {
    let isZooming = false;
    let timeoutHandle: number | undefined;

    const view = context?.getMain2DView();
    view?.signalZoom?.listen(() => {
      if (isZooming) {
        clearTimeout(timeoutHandle);
        timeoutHandle = undefined;
      } else {
        isZooming = true;
        HSApp.Logger.performanceLogger.push(
          'canvas.zoom',
          { description: '2D画布缩放' },
          {
            triggerType: LogTriggerType.START,
            notSend: true,
            actionTypeSuffix: ''
          }
        );
      }

      timeoutHandle = window.setTimeout(() => {
        HSApp.Logger.performanceLogger.push(
          'canvas.zoom',
          { description: '2D画布缩放' },
          {
            triggerType: LogTriggerType.END,
            actionTypeSuffix: ''
          }
        );
        clearTimeout(timeoutHandle);
        timeoutHandle = undefined;
        isZooming = false;
      }, 1000);
    });
  }

  pushLog(entries: LogEntry[] | null | undefined): void {
    entries?.forEach((entry) => {
      entry.options.actionTypeSuffix = '';

      if (entry.options.triggerType === LogTriggerType.START) {
        this.timeTaskHandle.start(entry);
      } else if (entry.options.triggerType === LogTriggerType.END) {
        this.timeTaskHandle.end(entry);
      } else {
        HSApp.Logger.performanceLogger.push(
          entry.actionType,
          entry.params,
          {
            ...entry.options,
            actionTypeSuffix: ''
          }
        );
      }
    });
  }
}