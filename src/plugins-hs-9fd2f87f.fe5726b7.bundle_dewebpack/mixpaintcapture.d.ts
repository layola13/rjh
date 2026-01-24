/**
 * Module: MixPaintCapture
 * Provides functionality to capture mixed paint layers from a 2D view
 * Original ID: 812962
 */

import { Box2 } from './Box2';
import { HSApp } from './HSApp';

/**
 * Enum defining the types of Pixi groups that can be rendered
 */
type PixiGroupType = 'Floor' | 'Content' | 'DoorStone';

/**
 * Represents a point in 2D space
 */
interface Point2D {
  x: number;
  y: number;
}

/**
 * Represents scale transformation values
 */
interface Scale {
  x: number;
  y: number;
}

/**
 * Stores the original state of a Pixi group before transformation
 */
interface PixiGroupState {
  scale?: Scale;
  visible?: boolean;
}

/**
 * Represents local bounds of a renderable object
 */
interface LocalBounds {
  width: number;
  height: number;
  left: number;
  bottom: number;
}

/**
 * Pixi group containing renderable display objects
 */
interface PixiGroup {
  scale: {
    x: number;
    y: number;
    set(x: number, y: number): void;
  };
  visible: boolean;
  getLocalBounds(): LocalBounds;
}

/**
 * Pixi node container with renderable groups
 */
interface PixiNode {
  getLocalBounds(): LocalBounds;
}

/**
 * Display list item containing Pixi rendering structures
 */
interface DisplayListItem {
  pixiNode: PixiNode;
  pixiGroups: Record<PixiGroupType, PixiGroup | undefined>;
}

/**
 * Pixi renderer plugins for extracting canvas data
 */
interface PixiRenderer {
  plugins: {
    extract: {
      canvas(target: PixiNode): HTMLCanvasElement;
    };
  };
}

/**
 * Pixi context containing the application and renderer
 */
interface PixiContext {
  pixiApp: {
    renderer: PixiRenderer;
  };
}

/**
 * Main 2D view containing display list and rendering context
 */
interface Main2DView {
  displayList: Record<string, DisplayListItem | undefined>;
  pixiContext: PixiContext;
}

/**
 * Layer entity with unique identifier
 */
interface Layer {
  id: string;
}

/**
 * Result of a capture operation
 */
interface CaptureResult {
  /** Base64-encoded PNG image data URL */
  capture: string;
  /** Bounding box in model coordinates */
  modelBox: Box2;
}

/**
 * Maximum texture size in pixels
 */
const MAX_TEXTURE_SIZE = 2048;

/**
 * Minimum base resolution for capture
 */
const BASE_RESOLUTION = 256;

/**
 * Maximum pixel count to prevent memory overflow
 */
const MAX_PIXEL_COUNT = 4194304;

/**
 * MixPaintCapture class handles capturing rendered paint layers
 * from a 2D view with selective group visibility
 */
export class MixPaintCapture {
  private readonly _layer: Layer;

  /**
   * Creates a new MixPaintCapture instance
   * @param layer - The layer to capture from
   */
  constructor(layer: Layer) {
    this._layer = layer;
  }

  /**
   * Captures a rendering of the layer with specified groups excluded
   * @param excludeGroups - Array of group types to exclude from the capture
   * @returns Capture result containing image data and model bounds, or undefined if capture fails
   */
  public getCapture(excludeGroups: PixiGroupType[]): CaptureResult | undefined {
    const main2DView = HSApp.App.getApp().getMain2DView();
    if (!main2DView) {
      return undefined;
    }

    const displayListItem = main2DView.displayList[this._layer.id];
    if (!displayListItem) {
      return undefined;
    }

    const pixiNode = displayListItem.pixiNode;
    const groupTypes: PixiGroupType[] = ['Floor', 'Content', 'DoorStone'];
    const visibleGroups = groupTypes.filter(type => !excludeGroups.includes(type));

    if (!pixiNode || visibleGroups.length === 0) {
      return undefined;
    }

    // Calculate bounding box of visible groups
    const modelBox = new Box2();
    groupTypes.forEach(groupType => {
      if (!visibleGroups.includes(groupType)) {
        return;
      }

      const pixiGroup = displayListItem.pixiGroups[groupType];
      if (!pixiGroup) {
        return;
      }

      const localBounds = pixiGroup.getLocalBounds();
      if (localBounds.width <= 0 || localBounds.height <= 0) {
        return;
      }

      const modelWidth = HSApp.View.SVG.Util.CanvasLengthToModel(localBounds.width);
      const modelHeight = HSApp.View.SVG.Util.CanvasLengthToModel(localBounds.height);
      const modelBottomLeft = HSApp.View.SVG.Util.CanvasPointToModel({
        x: localBounds.left,
        y: localBounds.bottom
      });

      const groupBox = new Box2();
      groupBox.setFromCenterAndSize(
        {
          x: modelBottomLeft.x + 0.5 * modelWidth,
          y: modelBottomLeft.y + 0.5 * modelHeight
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

    // Calculate optimal scale factor for capture
    const modelSize = modelBox.getSize();
    const nodeBounds = pixiNode.getLocalBounds();
    const targetResolution = Math.floor(
      Math.max(BASE_RESOLUTION * modelSize.x, BASE_RESOLUTION * modelSize.y)
    );
    const clampedResolution = Math.min(targetResolution, MAX_TEXTURE_SIZE);
    const baseScale = Math.max(1, clampedResolution / Math.min(nodeBounds.width, nodeBounds.height));
    const memoryScale = MAX_PIXEL_COUNT / (nodeBounds.width * nodeBounds.height);
    const devicePixelRatio = window.devicePixelRatio ?? 1;
    const finalScale = Math.min(baseScale, memoryScale) / devicePixelRatio;

    // Save original states and apply transformations
    const originalStates: (PixiGroupState | undefined)[] = [];
    groupTypes.forEach(groupType => {
      const pixiGroup = displayListItem.pixiGroups[groupType];
      if (!pixiGroup) {
        originalStates.push(undefined);
        return;
      }

      const originalScaleX = pixiGroup.scale.x;
      const originalScaleY = pixiGroup.scale.y;
      pixiGroup.scale.set(originalScaleX * finalScale, originalScaleY * finalScale);

      const state: PixiGroupState = {
        scale: {
          x: originalScaleX,
          y: originalScaleY
        }
      };

      if (excludeGroups.includes(groupType)) {
        state.visible = pixiGroup.visible;
        pixiGroup.visible = false;
      }

      originalStates.push(state);
    });

    // Perform the capture
    const canvas = main2DView.pixiContext.pixiApp.renderer.plugins.extract.canvas(pixiNode);

    // Restore original states
    groupTypes.forEach((groupType, index) => {
      const pixiGroup = displayListItem.pixiGroups[groupType];
      if (!pixiGroup) {
        return;
      }

      const state = originalStates[index];
      if (!state) {
        return;
      }

      if (state.scale) {
        pixiGroup.scale.set(state.scale.x, state.scale.y);
      }

      if (state.visible !== undefined) {
        pixiGroup.visible = state.visible;
      }
    });

    return {
      capture: canvas.toDataURL(),
      modelBox
    };
  }
}