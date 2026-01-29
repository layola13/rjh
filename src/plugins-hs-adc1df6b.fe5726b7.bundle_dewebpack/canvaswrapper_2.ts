export class CanvasWrapper {
  private _aux2DCanvas?: any;
  private _aux2DContainer?: HTMLElement;
  private _resizeObserver?: ResizeObserver;
  private _rootLayer?: any;
  private _outdoorLayer?: any;

  constructor(container: HTMLElement) {
    this._aux2DContainer = container;
    const scene = HSApp.App.getApp().floorplan.scene;
    this._rootLayer = scene.rootLayer;
    this._outdoorLayer = scene.outdoorLayer;
  }

  get aux2DCanvas(): any | undefined {
    return this._aux2DCanvas;
  }

  private _isInheritedFromLayer(entity: any, layer: any): boolean {
    const parentsInPath = entity.getParentsInPath();
    return layer && parentsInPath.includes(layer);
  }

  createAux2D(): void {
    if (!this._aux2DContainer || this._aux2DCanvas) {
      return;
    }

    this._aux2DCanvas = new HSApp.View.SVG.AuxCanvas(this._aux2DContainer);

    const isInRootOrOutdoorLayer = (entity: any): boolean => {
      return (
        !!this._isInheritedFromLayer(entity, this._rootLayer) ||
        !!this._isInheritedFromLayer(entity, this._outdoorLayer)
      );
    };

    const canvasConfig = {
      canCreateEntity: (entity: any): boolean => {
        if (
          entity instanceof HSCore.Model.Camera ||
          entity instanceof HSCore.Model.Layer
        ) {
          return true;
        }

        if (entity instanceof HSCore.Model.Wall) {
          return isInRootOrOutdoorLayer(entity);
        }

        if (
          entity instanceof HSCore.Model.Slab ||
          entity instanceof HSCore.Model.Face
        ) {
          if (this._isInheritedFromLayer(entity, this._rootLayer)) {
            return true;
          }
        } else if (
          entity instanceof HSCore.Model.NCustomizedStructure ||
          entity instanceof HSCore.Model.NCustomizedParametricRoof ||
          entity instanceof HSCore.Model.Opening ||
          entity instanceof HSCore.Model.ParametricOpening
        ) {
          if (this._isInheritedFromLayer(entity, this._rootLayer)) {
            return true;
          }
          if (this._isInheritedFromLayer(entity, this._outdoorLayer)) {
            return true;
          }
        }

        return false;
      },
      overrideViewSettings: {
        face: {
          useMixpaint: false,
          style: {
            getStyle: (entity: any, context: any) => {
              return {
                fill: "#EAEBEF",
                opacity: 0.8
              };
            }
          }
        },
        layer: {
          canDraw: (layer: any): boolean => {
            return layer === this._rootLayer || layer === this._outdoorLayer;
          }
        },
        wall: {
          canDraw: isInRootOrOutdoorLayer
        }
      }
    };

    this._aux2DCanvas.setupCanvas(canvasConfig);
    this._aux2DCanvas.activate();
    this._aux2DCanvas.show();
    this._listenResizeObserver();
  }

  private _listenResizeObserver(): void {
    this._resizeObserver = new ResizeObserver((entries) => {
      this.resizeAux2D();
    });
    this._resizeObserver.observe(this._aux2DContainer!);
  }

  destroyAux2D(): void {
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
    this._aux2DCanvas?.clear();
    this._aux2DCanvas = undefined;
    this._aux2DContainer = undefined;
  }

  resizeAux2D(): void {
    if (this._aux2DCanvas) {
      this._aux2DCanvas.onResized();
      this._aux2DCanvas.fit();
    }
  }
}