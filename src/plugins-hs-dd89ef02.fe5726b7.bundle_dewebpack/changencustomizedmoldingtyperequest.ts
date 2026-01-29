import { HSCore } from './635589';

export class ChangeNCustomizedMoldingTypeRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _molding: Molding[];
  private readonly _params: MoldingParameters;

  constructor(molding: Molding[], params: MoldingParameters) {
    super();
    this._molding = molding;
    this._params = params;
  }

  onCommit(): void {
    for (const moldingItem of this._molding) {
      const clonedParameters = this.cloneDeep(moldingItem.parameters);
      Object.assign(clonedParameters, this._params);
      moldingItem.parameters = clonedParameters;
      moldingItem.dirtyGeometry();
    }
  }

  canTransactField(): boolean {
    return true;
  }

  private cloneDeep<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    if (obj instanceof Date) {
      return new Date(obj.getTime()) as T;
    }

    if (obj instanceof Array) {
      return obj.map(item => this.cloneDeep(item)) as T;
    }

    if (obj instanceof Object) {
      const clonedObj = {} as T;
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          clonedObj[key] = this.cloneDeep(obj[key]);
        }
      }
      return clonedObj;
    }

    return obj;
  }
}

interface Molding {
  parameters: MoldingParameters;
  dirtyGeometry(): void;
}

interface MoldingParameters {
  [key: string]: unknown;
}