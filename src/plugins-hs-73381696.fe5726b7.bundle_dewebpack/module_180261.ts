import { LogTriggerType } from './375717';

interface SignalData {
  data: unknown;
}

interface ActionLog {
  actionType: string;
  options: {
    triggerType: LogTriggerType;
    notSend?: boolean;
  };
  params: {
    description: string;
    group: string;
    groupName: string;
  };
}

interface Main2DView {
  signalCanvasMoveStart?: unknown;
  signalCanvasMoveEnd?: unknown;
}

interface ViewContext {
  getMain2DView(): Main2DView | null | undefined;
}

interface LogListener {
  getListenSignal(context: ViewContext): unknown;
  listen(signal: SignalData): ActionLog[];
}

const canvasListeners: LogListener[] = [
  {
    getListenSignal(context: ViewContext): unknown {
      const view = context.getMain2DView();
      return view?.signalCanvasMoveStart;
    },
    listen(signal: SignalData): ActionLog[] {
      return [
        {
          actionType: 'canvas.move',
          options: {
            triggerType: LogTriggerType.START,
            notSend: true,
          },
          params: {
            description: '2D画布移动',
            group: 'canvas.move',
            groupName: '2D画布移动',
          },
        },
      ];
    },
  },
  {
    getListenSignal(context: ViewContext): unknown {
      const view = context.getMain2DView();
      return view?.signalCanvasMoveEnd;
    },
    listen(signal: SignalData): ActionLog[] {
      return [
        {
          actionType: 'canvas.move',
          options: {
            triggerType: LogTriggerType.END,
          },
          params: {
            description: '2D画布移动',
            group: 'canvas.move',
            groupName: '2D画布移动',
          },
        },
      ];
    },
  },
];

export default canvasListeners;