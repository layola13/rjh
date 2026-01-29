import { HSCore } from './HSCore';
import { MessageHandler } from './MessageHandler';
import { DIYUtils } from './DIYUtils';

interface CustomizedPMParams {
  rootModel: unknown;
  modelingHost: unknown;
  modelingData: ModelingData;
}

interface ModelingData {
  logs: unknown;
  webCADDocument?: unknown;
  instanceMetas?: unknown;
}

interface DIYResult {
  data: {
    success: boolean;
    newFile: string;
  };
}

interface DIYTestResult {
  webCADDocument: unknown;
  instanceMetas: unknown;
  paveId: number;
}

interface DIYEnvOptions {
  runDIY: boolean;
  logs: unknown;
}

export class CustomizedPMRequest extends HSCore.Transaction.Common.StateRequest {
  private static _diyResolve?: (value: string) => void;
  private static _diyReject?: (reason: string) => void;

  constructor() {
    super();
  }

  static async preCreate(param1: unknown, param2: unknown): Promise<void> {
    const params: CustomizedPMParams = DIYUtils.getCustomizedPMParams(param2, param1);
    const { rootModel, modelingHost, modelingData } = params;
    const messageHandler = MessageHandler.instance();

    const executeDIY = (
      model: unknown,
      host: unknown,
      logs: unknown
    ): Promise<string> => {
      return new Promise((resolve, reject) => {
        this._diyResolve = resolve;
        this._diyReject = reject;
        messageHandler.signalTestFinish.listen(this._getDIYResult, this);
        messageHandler.setModelingHost(model, host, false, {
          runDIY: true,
          logs
        } as DIYEnvOptions);
      });
    };

    const logs = modelingData.logs;
    const resultData = await executeDIY(rootModel, modelingHost, logs);

    try {
      const parsedResult: DIYTestResult = JSON.parse(resultData);
      modelingData.webCADDocument = parsedResult.webCADDocument;
      modelingData.instanceMetas = parsedResult.instanceMetas;
      
      const docManager = HSCore.Doc.getDocManager();
      const activeDoc = docManager.activeDocument;
      const idGenerator = activeDoc.getIdGenerator(HSCore.Util.IDGeneratorType.Pave);
      idGenerator.syncId(parsedResult.paveId);
    } catch (error) {
      console.error(error);
    }
  }

  static async postCreate(): Promise<void> {
    const messageHandler = MessageHandler.instance();
    messageHandler.hideDIYEnv();
    messageHandler.signalTestFinish.unlisten(this._getDIYResult, this);
  }

  private static async _getDIYResult(result: DIYResult): Promise<void> {
    if (result.data.success && this._diyResolve) {
      this._diyResolve(result.data.newFile);
    } else if (this._diyReject) {
      this._diyReject("Diy test: failed");
    }
  }
}