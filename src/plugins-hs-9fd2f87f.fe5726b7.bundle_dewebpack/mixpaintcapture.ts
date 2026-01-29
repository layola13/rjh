interface Layer {
  id: string;
}

interface Point {
  x: number;
  y: number;
}

interface Size {
  x: number;
  y: number;
}

interface LocalBounds {
  width: number;
  height: number;
  left: number;
  bottom: number;
}

interface ScaleState {
  x: number;
  y: number;
}

interface GroupState {
  scale?: ScaleState;
  visible?: boolean;
}

interface PixiGroup {
  scale: {
    x: number;
    y: number;
    set(x: number, y: number): void;
  };
  visible: boolean;
  getLocalBounds(): LocalBounds;
}

interface PixiNode {
  getLocalBounds(): LocalBounds;
}

interface DisplayListItem {
  pixiNode: PixiNode;
  pixiGroups: Record<PixiGroupType, PixiGroup | undefined>;
}

interface PixiRenderer {
  plugins: {
    extract: {
      canvas(target: PixiNode): HTMLCanvasElement;
    };
  };
}

interface PixiContext {
  pixiApp: {
    renderer: PixiRenderer;
  };
}

interface Main2DView {
  displayList: Record<string, DisplayListItem | undefined>;
  pixiContext: PixiContext;
}

enum PixiGroupType {
  Floor = 'Floor',
  Content = 'Content',
  DoorStone = 'DoorStone'
}

interface CaptureResult {
  capture: string;
  modelBox: Box2;
}

class Box2 {
  isValid(): boolean {
    throw new Error('Method not implemented');
  }

  setFromCenterAndSize(center: Point, size: Size): void {
    throw new Error('Method not implemented');
  }

  union(other: Box2): void {
    throw new Error('Method not implemented');
  }

  getSize(): Size {
    throw new Error('Method not implemented');
  }
}

declare namespace HSApp {
  namespace App {
    function getApp(): {
      getMain2DView(): Main2DView | null;
    };
  }

  namespace View {
    namespace SVG {
      const PixiGroupTypeEnum: typeof PixiGroupType;

      namespace Util {
        function CanvasLengthToModel(length: number): number;
        function CanvasPointToModel(point: Point): Point;
      }
    }
  }
}

const INITIAL_CANVAS_SIZE = 256;
const MAX_CANVAS_SIZE = 2048;
const MAX_PIXEL_COUNT = 4194304;
const MIN_SCALE = 1;

export class MixPaintCapture {
  private readonly _layer: Layer;

  constructor(layer: Layer) {
    this._layer = layer;
  }

  /**
   * Captures the specified pixel groups and returns the rendered canvas data URL
   * @param excludedGroups - Array of PixiGroupType to exclude from capture
   * @returns Capture result containing data URL and model bounding box, or undefined
   */
  public getCapture(excludedGroups: PixiGroupType[]): CaptureResult | undefined {
    const main2DView = HSApp.App.getApp().getMain2DView();
    if (!main2DView) {
      return undefined;
    }

    const displayItem = main2DView.displayList[this._layer.id];
    if (!displayItem) {
      return undefined;
    }

    const pixiNode = displayItem.pixiNode;
    const allGroupTypes = [
      PixiGroupType.Floor,
      PixiGroupType.Content,
      PixiGroupType.DoorStone
    ];

    const visibleGroups = allGroupTypes.filter(
      (groupType) => !excludedGroups.includes(groupType)
    );

    if (!pixiNode || visibleGroups.length === allGroupTypes.length) {
      return undefined;
    }

    const modelBox = new Box2();

    allGroupTypes.forEach((groupType) => {
      if (!visibleGroups.includes(groupType)) {
        return;
      }

      const pixiGroup = displayItem.pixiGroups[groupType];
      if (!pixiGroup) {
        return;
      }

      const localBounds = pixiGroup.getLocalBounds();
      if (localBounds.width <= 0 || localBounds.height <= 0) {
        return;
      }

      const modelWidth = HSApp.View.SVG.Util.CanvasLengthToModel(localBounds.width);
      const modelHeight = HSApp.View.SVG.Util.CanvasLengthToModel(localBounds.height);
      const modelPoint = HSApp.View.SVG.Util.CanvasPointToModel({
        x: localBounds.left,
        y: localBounds.bottom
      });

      const groupBox = new Box2();
      groupBox.setFromCenterAndSize(
        {
          x: modelPoint.x + 0.5 * modelWidth,
          y: modelPoint.y + 0.5 * modelHeight
        },
        {
          x: modelWidth,
          y: modelHeight
        }
      );

      modelBox.union(groupBox);
    });

    if (!modelBox.isValid()) {
      return undefined;
    }

    const modelSize = modelBox.getSize();
    const nodeBounds = pixiNode.getLocalBounds();
    const maxModelDimension = Math.max(modelSize.x, modelSize.y);
    const targetCanvasSize = Math.floor(INITIAL_CANVAS_SIZE * maxModelDimension);
    const clampedCanvasSize = Math.min(targetCanvasSize, MAX_CANVAS_SIZE);
    const minNodeDimension = Math.min(nodeBounds.width, nodeBounds.height);
    const baseScale = Math.max(MIN_SCALE, clampedCanvasSize / minNodeDimension);
    const nodePixelCount = nodeBounds.width * nodeBounds.height;
    const maxScaleByPixels = MAX_PIXEL_COUNT / nodePixelCount;
    const devicePixelRatio = window.devicePixelRatio || 1;
    const finalScale = Math.min(baseScale, maxScaleByPixels) / devicePixelRatio;

    const savedStates: (GroupState | undefined)[] = [];

    allGroupTypes.forEach((groupType) => {
      const pixiGroup = displayItem.pixiGroups[groupType];
      if (!pixiGroup) {
        savedStates.push(undefined);
        return;
      }

      const originalScaleX = pixiGroup.scale.x;
      const originalScaleY = pixiGroup.scale.y;
      pixiGroup.scale.set(originalScaleX * finalScale, originalScaleY * finalScale);

      const state: GroupState = {
        scale: {
          x: originalScaleX,
          y: originalScaleY
        }
      };

      if (visibleGroups.includes(groupType)) {
        state.visible = pixiGroup.visible;
        pixiGroup.visible = false;
      }

      savedStates.push(state);
    });

    const canvas = main2DView.pixiContext.pixiApp.renderer.plugins.extract.canvas(pixiNode);

    allGroupTypes.forEach((groupType, index) => {
      const pixiGroup = displayItem.pixiGroups[groupType];
      if (!pixiGroup) {
        return;
      }

      const savedState = savedStates[index];
      if (!savedState) {
        return;
      }

      if (savedState.scale) {
        pixiGroup.scale.set(savedState.scale.x, savedState.scale.y);
      }

      if (savedState.visible !== undefined) {
        pixiGroup.visible = savedState.visible;
      }
    });

    return {
      capture: canvas.toDataURL(),
      modelBox
    };
  }
}