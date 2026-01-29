import { HSCore } from './HSCore';

export class RemoveAuxiliaryLinesRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _entitys: Array<{ remove: () => void } | null | undefined>;

  constructor(entitys: Array<{ remove: () => void } | null | undefined>) {
    super();
    this._entitys = entitys;
  }

  onCommit(): unknown[] {
    this._entitys.forEach((entity) => {
      entity?.remove();
    });
    
    return super.onCommit([]);
  }
}