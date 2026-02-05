// @ts-nocheck
import { parseParams } from './parseParams';
import { HistoryMsgManager } from './HistoryMsgManager';
import * as Operations from './operations';

interface OperationMessage {
  operationType: string;
  reply: string;
  priority: number;
  required?: boolean;
  params?: {
    modifyQuery?: string;
  };
}

interface OperationTask {
  op: IOperation;
  msg: OperationMessage;
}

type OperationStatus = 'success' | 'fail';

type SuccessCallback = (message: OperationMessage) => void;
type FinishCallback = (
  isComplete: boolean,
  status: OperationStatus,
  message: OperationMessage,
  extraData?: OperationMessage
) => void;
type ProcessCallback = (message: OperationMessage) => void;
type SelectCallback = (...args: unknown[]) => void;

interface IOperation {
  execute(
    message: OperationMessage,
    onBegin: SuccessCallback,
    onEnd: (status: OperationStatus, message: OperationMessage, extraData?: OperationMessage) => void,
    onSelect: SelectCallback,
    onProcess: ProcessCallback
  ): void;
}

interface IOperationConstructor {
  new (): IOperation;
  getId(): string;
  createMockMessage(): OperationMessage | OperationMessage[];
}

class MessageManager {
  private opNameTable: Map<string, string>;
  private opTaskQueue: OperationTask[];
  private _scb?: SuccessCallback;
  private _fcb?: FinishCallback;
  private _pcb?: ProcessCallback;
  private _selCb?: SelectCallback;
  private _hisMsgMgr: HistoryMsgManager;

  constructor() {
    this.opNameTable = new Map();
    this.opTaskQueue = [];
    this._scb = undefined;
    this._fcb = undefined;
    this._pcb = undefined;
    this._selCb = undefined;
    this._hisMsgMgr = HistoryMsgManager.getInstance();

    const operationKeys = Object.keys(Operations);
    operationKeys.forEach((key) => {
      const OperationClass = (Operations as Record<string, IOperationConstructor>)[key];
      const operationId = OperationClass.getId();

      if (this.opNameTable.has(operationId)) {
        console.error(`Duplicated HomeGPT operation: ${operationId}`);
      }

      this.opNameTable.set(operationId, key);
    });
  }

  private _createOperation(operationType: string): IOperation | undefined {
    const operationName = this.opNameTable.get(operationType);
    if (operationName) {
      const OperationClass = (Operations as Record<string, IOperationConstructor>)[operationName];
      return new OperationClass();
    }
    return undefined;
  }

  private _createMockOperationMessage(operationType: string): OperationMessage | OperationMessage[] | undefined {
    const operationName = this.opNameTable.get(operationType);
    if (operationName) {
      const OperationClass = (Operations as Record<string, IOperationConstructor>)[operationName];
      return OperationClass.createMockMessage();
    }
    return undefined;
  }

  private _OnOperationBegin(message: OperationMessage): void {
    this._scb?.(message);
  }

  private _OnOperationProcess(message: OperationMessage): void {
    this._pcb?.(message);
  }

  private _OnOperationEnd(status: OperationStatus, message: OperationMessage, extraData?: OperationMessage): void {
    if (this._fcb) {
      if (extraData?.required && status === 'fail') {
        this._fcb(true, status, message, extraData);
        this._clearRunningOp();
      } else {
        this._fcb(this.opTaskQueue.length === 0, status, message, extraData);
      }
    }

    this._runningOpTask();
  }

  private _clearRunningOp(): void {
    this.opTaskQueue.length = 0;
    this._scb = undefined;
    this._fcb = undefined;
    this._pcb = undefined;
    this._selCb = undefined;
  }

  private _runningOpTask(): void {
    if (this.opTaskQueue.length > 0) {
      const task = this.opTaskQueue.shift();
      if (task) {
        task.op.execute(
          task.msg,
          this._OnOperationBegin.bind(this),
          this._OnOperationEnd.bind(this),
          this._selCb!.bind(this),
          this._OnOperationProcess.bind(this)
        );
      }
    } else {
      this._clearRunningOp();
    }
  }

  public execute(
    message: OperationMessage,
    onSuccess: SuccessCallback,
    onFinish: FinishCallback,
    onSelect: SelectCallback,
    onProcess: ProcessCallback
  ): boolean {
    if (this.opTaskQueue.length > 0) {
      return false;
    }

    this._scb = onSuccess;
    this._fcb = onFinish;
    this._pcb = onProcess;
    this._selCb = onSelect;

    const parsedParams = parseParams(message);

    if (!parsedParams) {
      this._OnOperationEnd('fail', message);
      return false;
    }

    if (Array.isArray(parsedParams)) {
      for (let i = 0; i < parsedParams.length; ++i) {
        const operationMsg = parsedParams[i];
        const operation = this._createOperation(operationMsg.operationType);

        if (!operation) {
          this.opTaskQueue.length = 0;
          this._OnOperationEnd('fail', operationMsg.reply, operationMsg);
          break;
        }

        this.opTaskQueue.push({
          op: operation,
          msg: operationMsg,
        });
      }
    } else {
      this._hisMsgMgr.setHistoryMsg('historyQuery', parsedParams.params?.modifyQuery);
      this._hisMsgMgr.setHistoryMsg('historyQueryOpType', parsedParams.operationType);

      const operation = this._createOperation(parsedParams.operationType);

      if (!operation) {
        this._OnOperationEnd('fail', parsedParams.reply, parsedParams);
        return false;
      }

      this.opTaskQueue.push({
        op: operation,
        msg: parsedParams,
      });
    }

    this.opTaskQueue.sort((a, b) => a.msg.priority - b.msg.priority);
    this._runningOpTask();

    return true;
  }

  public testOperation(
    operationType: string,
    onSuccess: SuccessCallback,
    onFinish: FinishCallback,
    onSelect: SelectCallback,
    onProcess: ProcessCallback
  ): boolean {
    if (this.opTaskQueue.length > 0) {
      return false;
    }

    this._scb = onSuccess;
    this._fcb = onFinish;
    this._pcb = onProcess;
    this._selCb = onSelect;

    const mockMessage = this._createMockOperationMessage(operationType);

    if (!mockMessage) {
      this._OnOperationEnd('fail', 'test failed');
      return false;
    }

    if (Array.isArray(mockMessage)) {
      for (let i = 0; i < mockMessage.length; ++i) {
        const operationMsg = mockMessage[i];
        const operation = this._createOperation(operationMsg.operationType);

        if (!operation) {
          this.opTaskQueue.length = 0;
          this._OnOperationEnd('fail', operationMsg.reply, operationMsg);
          break;
        }

        this.opTaskQueue.push({
          op: operation,
          msg: operationMsg,
        });
      }
    } else {
      const operation = this._createOperation(mockMessage.operationType);

      if (!operation) {
        this._OnOperationEnd('fail', mockMessage.reply, mockMessage);
        return false;
      }

      this.opTaskQueue.push({
        op: operation,
        msg: mockMessage,
      });
    }

    this.opTaskQueue.sort((a, b) => a.msg.priority - b.msg.priority);
    this._runningOpTask();

    return true;
  }
}

export const MessageMgr = new MessageManager();