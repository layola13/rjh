interface Layer {
  getUniqueParent(): {
    getActualLayersOnGround(): Layer[];
  };
}

interface Entity {
  getParentsInPath(): Layer[];
}

interface Wall extends Entity {
  wallType: WallType;
  isLoadBearing: boolean;
}

enum WallType {
  generic = 'generic'
}

interface StyleResult {
  fill?: string;
  stroke?: string;
  opacity?: number;
}

interface ViewSettings {
  face: {
    useMixpaint: boolean;
    style: {
      getStyle: (entity: unknown, context: unknown) => StyleResult;
    };
  };
  layer: {
    canDraw: (layer: Layer) => boolean;
  };
  wall: {
    canDraw: (wall: Wall) => boolean;
    style: {
      getStyle: (wall: Wall) => StyleResult | undefined;
    };
  };
}

interface AuxCanvas {
  setupCanvas(settings: ViewSettings): void;
  activate(): void;
  show(): void;
  clear(): void;
  onResized(): void;
  fit(): void;
}

declare namespace HSApp.View.SVG {
  class AuxCanvas {
    constructor(container: HTMLElement);
    setupCanvas(settings: ViewSettings): void;
    activate(): void;
    show(): void;
    clear(): void;
    onResized(): void;
    fit(): void;
  }
}

declare namespace HSCore.Model {
  class Camera {}
  class Layer {}
  class Wall {
    wallType: WallType;
    isLoadBearing: boolean;
    getParentsInPath(): Layer[];
  }
  class Slab {
    getParentsInPath(): Layer[];
  }
  class Face {
    getParentsInPath(): Layer[];
  }
  class NCustomizedStructure {
    getParentsInPath(): Layer[];
  }
  class NCustomizedParametricRoof {
    getParentsInPath(): Layer[];
  }
  class Opening {
    getParentsInPath(): Layer[];
  }
  class ParametricOpening {
    getParentsInPath(): Layer[];
  }
  enum WallTypeEnum {
    generic = 'generic'
  }
}

export class CanvasWrapper {
  private _aux2DCanvas?: AuxCanvas;
  private _aux2DContainer?: HTMLElement;
  private _resizeObserver?: ResizeObserver;
  private _layer?: Layer;
  private _belowLayers?: Layer[];

  constructor(container: HTMLElement, layer: Layer) {
    this._aux2DContainer = container;
    this.updatelayer(layer);
  }

  get aux2DCanvas(): AuxCanvas | undefined {
    return this._aux2DCanvas;
  }

  updatelayer(layer: Layer): void {
    this._layer = layer;
    this._belowLayers = this._getBelowLayersInOrder(this._layer, 2);
  }

  private _getBelowLayersInOrder(layer: Layer, count: number): Layer[] | undefined {
    const allLayers = layer.getUniqueParent().getActualLayersOnGround();
    const currentIndex = allLayers.indexOf(layer);

    if (currentIndex > -1) {
      const startIndex = Math.max(0, currentIndex - count);
      return allLayers.slice(startIndex, currentIndex);
    }

    return undefined;
  }

  private _isInheritedFromLayer(entity: Entity, targetLayer?: Layer): boolean {
    const parents = entity.getParentsInPath();
    return targetLayer ? parents.includes(targetLayer) : false;
  }

  createAux2D(): void {
    if (!this._aux2DContainer || this._aux2DCanvas) {
      return;
    }

    this._aux2DCanvas = new HSApp.View.SVG.AuxCanvas(this._aux2DContainer);

    const canDrawWall = (wall: Wall): boolean => {
      return (
        !!this._isInheritedFromLayer(wall, this._layer) ||
        (this._belowLayers?.some(belowLayer =>
          this._isInheritedFromLayer(wall, belowLayer)
        ) ?? false)
      );
    };

    const viewSettings: ViewSettings = {
      canCreateEntity: (entity: unknown): boolean => {
        if (
          entity instanceof HSCore.Model.Camera ||
          entity instanceof HSCore.Model.Layer
        ) {
          return true;
        }

        if (entity instanceof HSCore.Model.Wall) {
          return canDrawWall(entity);
        }

        if (
          entity instanceof HSCore.Model.Slab ||
          entity instanceof HSCore.Model.Face ||
          entity instanceof HSCore.Model.NCustomizedStructure ||
          entity instanceof HSCore.Model.NCustomizedParametricRoof ||
          entity instanceof HSCore.Model.Opening ||
          entity instanceof HSCore.Model.ParametricOpening
        ) {
          return this._isInheritedFromLayer(entity, this._layer);
        }

        return false;
      },
      overrideViewSettings: {
        face: {
          useMixpaint: false,
          style: {
            getStyle: (_entity: unknown, _context: unknown): StyleResult => {
              return {
                fill: '#EAEBEF',
                opacity: 0.8
              };
            }
          }
        },
        layer: {
          canDraw: (layer: Layer): boolean => {
            return (
              layer === this._layer ||
              (this._belowLayers?.includes(layer) ?? false)
            );
          }
        },
        wall: {
          canDraw: canDrawWall,
          style: {
            getStyle: (wall: Wall): StyleResult | undefined => {
              let style: StyleResult | undefined = undefined;

              if (wall.wallType === HSCore.Model.WallTypeEnum.generic) {
                if (wall.isLoadBearing) {
                  if (this._isInheritedFromLayer(wall, this._layer)) {
                    style = {
                      fill: '#838486',
                      stroke: '#838486'
                    };
                  } else if (
                    this._isInheritedFromLayer(wall, this._belowLayers?.[1])
                  ) {
                    style = {
                      fill: '#AAACAF',
                      stroke: '#AAACAF'
                    };
                  } else if (
                    this._isInheritedFromLayer(wall, this._belowLayers?.[0])
                  ) {
                    style = {
                      fill: '#D3D5D9',
                      stroke: '#ABACB2'
                    };
                  }
                } else {
                  if (this._isInheritedFromLayer(wall, this._layer)) {
                    style = {
                      fill: '#D4D5DA',
                      stroke: '#818288'
                    };
                  } else if (
                    this._isInheritedFromLayer(wall, this._belowLayers?.[1])
                  ) {
                    style = {
                      fill: '#DDDEE3',
                      stroke: '#ABACB2'
                    };
                  } else if (
                    this._isInheritedFromLayer(wall, this._belowLayers?.[0])
                  ) {
                    style = {
                      fill: '#E4E6EC',
                      stroke: '#BFC1C6'
                    };
                  }
                }
              }

              return style;
            }
          }
        }
      }
    };

    this._aux2DCanvas.setupCanvas(viewSettings);
    this._aux2DCanvas.activate();
    this._aux2DCanvas.show();
    this._listenResizeObserver();
  }

  private _listenResizeObserver(): void {
    this._resizeObserver = new ResizeObserver(() => {
      this.resizeAux2D();
    });

    if (this._aux2DContainer) {
      this._resizeObserver.observe(this._aux2DContainer);
    }
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