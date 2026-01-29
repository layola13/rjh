interface Entity {
  parent?: Door | Hole | null;
  offset?: number;
  [key: string]: unknown;
}

interface Pocket extends Entity {
  parent?: Door | Hole | null;
}

interface Door extends Entity {
  host?: Wall | null;
}

interface Hole extends Entity {
  host?: Wall | null;
  dirtyGeometry(): void;
}

interface Wall {
  faceList: Face[];
}

interface Face {
  refreshWallMoldings(): void;
  dirtyGeometry(): void;
}

interface Baseboard extends Entity {
  offset: number;
}

interface StateRequest {
  onCommit(args: unknown[]): void;
  onReceive(event: string, value: unknown): boolean;
  getDescription(): string;
  getCategory(): string;
}

namespace HSCore {
  export namespace Model {
    export class Pocket {}
    export class Door {}
    export class Hole {}
    export class Wall {}
    export class Baseboard {}
  }

  export namespace Transaction {
    export namespace Common {
      export class StateRequest {}
    }
  }

  export namespace Util {
    export namespace Face {
      export function removeHoleForMolding(entity: Baseboard): void;
      export function makeHoleForMolding(entity: Baseboard): void;
    }
  }
}

namespace HSFPConstants {
  export enum LogGroupTypes {
    FaceOperation = 'FaceOperation'
  }
}

class LineWidthChangeRequest extends HSCore.Transaction.Common.StateRequest {
  private entity: Entity;
  private fieldName: string;

  constructor(entity: Entity, fieldName: string) {
    super();
    this.entity = entity;
    this.fieldName = fieldName;
  }

  onCommit(): void {
    if (this.entity instanceof HSCore.Model.Pocket && 
        (this.entity.parent instanceof HSCore.Model.Door || 
         this.entity.parent instanceof HSCore.Model.Hole)) {
      
      const parent = this.entity.parent;
      
      if (parent instanceof HSCore.Model.Hole) {
        parent.dirtyGeometry();
      }

      const host = parent.host;
      if (host && host instanceof HSCore.Model.Wall) {
        host.faceList.forEach((face: Face) => {
          face.refreshWallMoldings();
          face.dirtyGeometry();
        });
      }
    }

    const offsetThreshold = 1e-6;
    if (this.entity instanceof HSCore.Model.Baseboard && 
        Math.abs(this.entity.offset) > offsetThreshold) {
      HSCore.Util.Face.removeHoleForMolding(this.entity);
      HSCore.Util.Face.makeHoleForMolding(this.entity);
    }

    super.onCommit([]);
  }

  onReceive(event: string, value: unknown): boolean {
    if (event !== 'change') {
      return super.onReceive(event, value);
    }

    this.entity[this.fieldName] = value;
    return true;
  }

  getDescription(): string {
    return '改变线条大小';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.FaceOperation;
  }
}

export default LineWidthChangeRequest;