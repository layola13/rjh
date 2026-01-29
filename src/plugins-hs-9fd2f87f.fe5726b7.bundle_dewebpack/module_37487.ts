interface LightBandParameters {
  flip?: boolean;
  offsetX?: number;
  offsetY?: number;
  width?: number;
  height?: number;
  error?: number;
  parameters?: unknown;
  path?: unknown;
}

interface LightBandEntity {
  getParameters(): LightBandParameters;
  updateMetadata(metadata: unknown, force: boolean): void;
  getUniqueParent(): WebCADParent | null;
  options: unknown;
}

interface WebCADParent {
  webCADDocument: {
    isDuringFastComputation: boolean;
  };
}

interface Content {
  getLightBandEntityById(id: string): LightBandEntity;
}

interface TransactionRequest {
  // Transaction request implementation details
}

interface TransactionManager {
  createRequest(requestType: string, params: unknown[]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface CommandContext {
  transManager: TransactionManager;
}

type ParameterChangeType = 'flip' | 'parameterchangebegin' | 'parameterchanging' | 'parameterchangeend';

declare const HSFPConstants: {
  RequestType: {
    EditCustomizedModelLightBand: string;
  };
};

declare const HSCore: {
  Model: {
    CustomizedModelLightBand: {
      constructMetaData(path: unknown, parameters: unknown, options: unknown): unknown;
    };
  };
};

declare const GeLib: {
  MathUtils: {
    largerOrEqual(value: number, threshold: number, tolerance: number): boolean;
  };
};

declare const _: {
  cloneDeep<T>(value: T): T;
};

declare namespace HSApp.Cmd {
  class Command {
    context: CommandContext;
  }
}

export default class EditCustomizedModelLightBandCommand extends HSApp.Cmd.Command {
  private _content: Content;
  private _lightBandId: string;
  private _requestType: string;
  private _request: TransactionRequest | undefined;

  constructor(content: Content, lightBandId: string) {
    super();
    this._content = content;
    this._lightBandId = lightBandId;
    this._requestType = HSFPConstants.RequestType.EditCustomizedModelLightBand;
    this._request = undefined;
  }

  private _commitRequest(): void {
    if (this._request) {
      this.context.transManager.commit(this._request);
    }
  }

  onExecute(): void {
    // Implementation intentionally empty
  }

  changeParameters(parameters: Partial<LightBandParameters>, changeType: string): void {
    if (!parameters || !changeType) {
      return;
    }

    const lightBandEntity = this._content.getLightBandEntityById(this._lightBandId);
    const currentParams = lightBandEntity.getParameters();

    if (!currentParams || currentParams.error === -1) {
      return;
    }

    const clonedParameters = _.cloneDeep(currentParams.parameters);
    const clonedPath = _.cloneDeep(currentParams.path);
    const options = lightBandEntity.options;
    let shouldUpdate = false;

    if ('flip' in parameters) {
      if ((clonedParameters as LightBandParameters).flip !== parameters.flip) {
        shouldUpdate = true;
      }
      (clonedParameters as LightBandParameters).flip = parameters.flip;
    }

    if ('offsetX' in parameters) {
      const widthDiff = Math.abs(
        ((clonedParameters as LightBandParameters).width ?? 0) - (parameters.width ?? 0)
      );
      if (changeType === 'parameterchangeend' || GeLib.MathUtils.largerOrEqual(widthDiff, 1.4, 0.05)) {
        shouldUpdate = true;
      }
      (clonedParameters as LightBandParameters).offsetX = parameters.offsetX;
    }

    if ('offsetY' in parameters) {
      const heightDiff = Math.abs(
        ((clonedParameters as LightBandParameters).height ?? 0) - (parameters.height ?? 0)
      );
      if (changeType === 'parameterchangeend' || GeLib.MathUtils.largerOrEqual(heightDiff, 0.8, 0.05)) {
        shouldUpdate = true;
      }
      (clonedParameters as LightBandParameters).offsetY = parameters.offsetY;
    }

    if (shouldUpdate) {
      const metadata = HSCore.Model.CustomizedModelLightBand.constructMetaData(
        clonedPath,
        clonedParameters,
        options
      );
      const parent = lightBandEntity.getUniqueParent();
      if (parent) {
        parent.webCADDocument.isDuringFastComputation = changeType === 'parameterchanging';
        lightBandEntity.updateMetadata(metadata, true);
      }
    }
  }

  onReceive(eventType: ParameterChangeType, parameters?: Partial<LightBandParameters>): boolean {
    const transManager = this.context.transManager;

    if (eventType === 'flip') {
      this._request = transManager.createRequest(this._requestType, [this._content, this._lightBandId]);
      this.changeParameters(parameters ?? {}, 'flip');
      this._commitRequest();
    } else if (eventType === 'parameterchangebegin') {
      this._request = transManager.createRequest(this._requestType, [this._content, this._lightBandId]);
    } else if (eventType === 'parameterchanging') {
      this.changeParameters(parameters ?? {}, 'parameterchanging');
    } else if (eventType === 'parameterchangeend') {
      this.changeParameters(parameters ?? {}, 'parameterchangeend');
      this._commitRequest();
    }

    return super.onReceive?.(eventType, parameters) ?? true;
  }
}