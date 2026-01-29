import { HSCore } from './HSCore';

interface Roof {
  id?: string;
}

interface DrawingRegion {
  roofId: string;
}

interface RoofRelation {
  roof: Roof;
  drawingRegion: DrawingRegion;
}

interface UpdateRoofRelationParams {
  relations: RoofRelation[];
}

export class UpdateRoofRelationRequest extends HSCore.Transaction.Common.StateRequest {
  private _params: UpdateRoofRelationParams;

  constructor(params: UpdateRoofRelationParams) {
    super();
    this._params = params;
  }

  onCommit(): void {
    this._params.relations.forEach((relation: RoofRelation) => {
      relation.drawingRegion.roofId = relation.roof.id ?? "";
    });
    
    super.onCommit([]);
  }

  canTransactField(): boolean {
    return true;
  }
}