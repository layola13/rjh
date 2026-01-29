interface Face {
  signalFaceGeometryChanged: Signal;
}

interface Signal {
  listen(callback: () => void): void;
  unlistenAll(): void;
}

interface Layer {
  forEachFace(callback: (face: Face) => void): void;
}

type LayerInput = Layer | Layer[];

declare namespace HSCore.Util.Molding {
  function reAddFaceMolding(face: Face): void;
}

/**
 * Helper class for automatically refitting face moldings when face geometry changes.
 * Implements singleton pattern to ensure single instance across application.
 */
export class FaceMoldingFitHelper {
  private static _instance?: FaceMoldingFitHelper;

  private _changedFaces: Set<Face>;
  private signals: Signal[];

  constructor() {
    this._changedFaces = new Set();
    this.signals = [];
  }

  /**
   * Start listening to face geometry changes for the given layer(s).
   * @param layerInput - Single layer or array of layers to monitor
   */
  startListening(layerInput: LayerInput): void {
    this.stopAllListening();
    this._changedFaces = new Set();

    const layers = Array.isArray(layerInput) ? layerInput : [layerInput];

    layers.forEach((layer) => {
      layer.forEachFace((face) => {
        face.signalFaceGeometryChanged.listen(() => {
          this._changedFaces.add(face);
        });
        this.signals.push(face.signalFaceGeometryChanged);
      });
    });
  }

  /**
   * Apply molding refitting to all changed faces and stop listening.
   */
  autoFit(): void {
    this._changedFaces.forEach((face) => {
      HSCore.Util.Molding.reAddFaceMolding(face);
    });
    this.stopAllListening();
  }

  /**
   * Stop listening to all face geometry change signals.
   */
  stopAllListening(): void {
    this.signals.forEach((signal) => {
      signal.unlistenAll();
    });
    this.signals = [];
  }

  /**
   * Get the singleton instance of FaceMoldingFitHelper.
   * @returns The singleton instance
   */
  static getInstance(): FaceMoldingFitHelper {
    if (!this._instance) {
      this._instance = new FaceMoldingFitHelper();
    }
    return this._instance;
  }
}