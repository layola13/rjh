import { HSCore } from './external-dependencies';

interface Layer {
  beams: Record<string, Beam>;
  structures: Record<string, Structure>;
  walls: Record<string, Wall>;
  openings: Record<string, Opening>;
  parametricOpenings: Record<string, Opening>;
  auxiliaryLines: Record<string, AuxiliaryLine>;
}

interface Scene {
  activeLayer: Layer;
  outdoorLayer?: {
    childrenMap?: {
      floor?: Record<string, Space>;
    };
  };
  forEachLayer(callback: (layer: Layer) => void): void;
}

interface Floorplan {
  scene: Scene;
}

interface TransactionManager {
  startSession(): Session;
  createRequest(requestType: string, params: unknown[]): Request;
  commit(request: Request): void;
}

interface App {
  floorplan: Floorplan;
  transManager: TransactionManager;
}

interface Session {
  commit(): void;
}

interface Request {}

interface Beam {
  instanceOf?(className: string): boolean;
}

interface Structure {
  instanceOf?(className: string): boolean;
}

interface Wall {
  instanceOf?(className: string): boolean;
}

interface Opening {
  instanceOf(className: string): boolean;
}

interface AuxiliaryLine {}

interface Space {
  getMaster(): unknown;
}

declare const HSFPConstants: {
  RequestType: {
    SlabEdit: {
      DeleteLayerSlabHoles: string;
    };
    DeleteAssembly: string;
    DeleteProduct: string;
    DeleteTGWalls: string;
    DeleteBeam: string;
    DeleteStructure: string;
    DeleteUnderlay: string;
    RemoveAuxiliaryLines: string;
    DeleteSpace: string;
  };
  LogGroupTypes: {
    ContentOperation: string;
  };
};

declare const HSConstants: {
  ModelClass: {
    NgGroup: string;
  };
};

export default class ClearViewCommand {
  protected _app!: App;
  private _deleteUnderlay: boolean;
  private _transMgr: TransactionManager;

  constructor(deleteUnderlay: boolean = false) {
    this._deleteUnderlay = deleteUnderlay;
    this._transMgr = this._app.transManager;
  }

  onExecute(): void {
    const session = this._app.transManager.startSession();
    
    super.onExecute?.([]);
    
    this.deleteLayerSlabHoles();
    this.deleteRooms();
    this.deleteUnderlayRequest();
    this.deleteAuxiliaryLineRequest();
    this.deleteOutLayerRequest();
    
    session.commit();
  }

  deleteLayerSlabHoles(): void {
    const requests: Request[] = [];
    
    this._app.floorplan.scene.forEachLayer((layer) => {
      const request = this._transMgr.createRequest(
        HSFPConstants.RequestType.SlabEdit.DeleteLayerSlabHoles,
        [layer]
      );
      requests.push(request);
    });

    const compositeRequest = new HSCore.Transaction.Common.CompositeRequest(requests);
    this._transMgr.commit(compositeRequest);
  }

  deleteRooms(): void {
    this._app.floorplan.scene.forEachLayer((layer) => {
      const beams = Object.values(layer.beams);
      this.deleteBeams(beams);

      const structures = Object.values(layer.structures);
      this.deleteStructures(structures);

      const walls = Object.values(layer.walls);
      const openings: Opening[] = [
        ...Object.values(layer.openings),
        ...Object.values(layer.parametricOpenings)
      ];
      
      this.deleteWalls(layer, walls, openings);
    });
  }

  deleteWalls(layer: Layer, walls: Wall[], openings: Opening[]): void {
    const requests: Request[] = [];
    
    openings.forEach((opening) => {
      const requestType = opening.instanceOf(HSConstants.ModelClass.NgGroup)
        ? HSFPConstants.RequestType.DeleteAssembly
        : HSFPConstants.RequestType.DeleteProduct;
      
      const request = this._transMgr.createRequest(requestType, [opening]);
      requests.push(request);
    });

    const compositeRequest = new HSCore.Transaction.Common.CompositeRequest(requests);
    this._transMgr.commit(compositeRequest);

    const wallsRequest = this._transMgr.createRequest(
      HSFPConstants.RequestType.DeleteTGWalls,
      [walls, layer]
    );
    this._transMgr.commit(wallsRequest);
  }

  deleteBeams(beams: Beam[]): void {
    const requests: Request[] = [];
    
    beams.forEach((beam) => {
      const request = this._transMgr.createRequest(
        HSFPConstants.RequestType.DeleteBeam,
        [beam]
      );
      requests.push(request);
    });

    const compositeRequest = new HSCore.Transaction.Common.CompositeRequest(requests);
    this._transMgr.commit(compositeRequest);
  }

  deleteStructures(structures: Structure[]): void {
    const requests: Request[] = [];
    
    structures.forEach((structure) => {
      const request = this._transMgr.createRequest(
        HSFPConstants.RequestType.DeleteStructure,
        [structure]
      );
      requests.push(request);
    });

    const compositeRequest = new HSCore.Transaction.Common.CompositeRequest(requests);
    this._transMgr.commit(compositeRequest);
  }

  deleteUnderlayRequest(): void {
    if (this._deleteUnderlay) {
      const request = this._transMgr.createRequest(
        HSFPConstants.RequestType.DeleteUnderlay,
        []
      );
      this._transMgr.commit(request);
    }
  }

  deleteAuxiliaryLineRequest(): void {
    const auxiliaryLines = Object.values(
      this._app.floorplan.scene.activeLayer.auxiliaryLines
    );
    
    const request = this._transMgr.createRequest(
      HSFPConstants.RequestType.RemoveAuxiliaryLines,
      [auxiliaryLines]
    );
    this._transMgr.commit(request);
  }

  deleteOutLayerRequest(): void {
    const floorSpaces = Object.values(
      this._app.floorplan.scene.outdoorLayer?.childrenMap?.floor ?? {}
    );

    floorSpaces.forEach((space) => {
      const master = space.getMaster();
      const request = this._transMgr.createRequest(
        HSFPConstants.RequestType.DeleteSpace,
        [master, space]
      );
      this._transMgr.commit(request);
    });
  }

  getDescription(): string {
    return '清空视图';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }

  isInteractive(): boolean {
    return true;
  }
}