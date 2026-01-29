import { StateRequest } from 'HSCore.Transaction.Common';

interface Entity {
  indent: number;
}

export class ChangeWindowIndentRequest extends StateRequest {
  private readonly _entities: Entity[];
  private readonly _indent: number;

  constructor(entities: Entity[], indent: number) {
    super();
    this._entities = entities;
    this._indent = indent;
  }

  onCommit(): void {
    this._entities.forEach((entity: Entity) => {
      entity.indent = this._indent;
    });
    super.onCommit([]);
  }

  canTransactField(): boolean {
    return true;
  }
}