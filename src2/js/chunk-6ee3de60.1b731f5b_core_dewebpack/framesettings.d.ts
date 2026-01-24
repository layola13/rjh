/**
 * Frame settings management module
 * Handles configuration and operations for frame objects in a CAD/design system
 */

import Flatten from '@flatten-js/core';
import { WallTool } from './WallTool';
import { Utils } from './Utils';
import { EdgeFinder, Direction, FrameUtil } from './FrameUtil';
import {
  Frame,
  WinPolygon,
  TopView,
  Wall,
  SubFrame,
  KfcPolygon,
  Kfc2Polygon,
  Kfc3Polygon,
  Kfc4Polygon,
  HalfKfcPolygon,
  HalfKfc2Polygon
} from './Shapes';

/**
 * View interface representing the main canvas/viewport
 */
interface IView {
  shapeManager: IShapeManager;
  activeLayer: ILayer;
  mometoManager: IMomentoManager;
  refresh(): void;
}

/**
 * Shape manager interface handling all drawable shapes
 */
interface IShapeManager {
  shapem: Frame[];
  couples: Array<{ polygon: { edges: Flatten.Segment[] } }>;
  walls: Wall[];
  subFrames: SubFrame[];
  addWall(wall: Wall): void;
  addSubFrame(frames: Frame[]): void;
}

/**
 * Layer interface for batch rendering operations
 */
interface ILayer {
  batchDraw(): void;
}

/**
 * Memento manager interface for undo/redo functionality
 */
interface IMomentoManager {
  checkPoint(): void;
}

/**
 * Joint way enumeration type
 */
type JointWay = number;

/**
 * Open direction enumeration
 */
type OpenToward = number;

/**
 * Wall generation configuration
 */
interface IWallConfig {
  based: Flatten.Point;
  edge: Flatten.Segment;
  distance: number;
  orientation: number;
}

/**
 * Frame settings controller
 * Provides high-level operations and property accessors for frame manipulation
 */
export class FrameSettings {
  private readonly frame: Frame;
  private readonly view: IView;

  constructor(frame: Frame, view: IView) {
    this.frame = frame;
    this.view = view;
  }

  /**
   * Copy the current frame and paste it to the right of all existing frames
   */
  public copyAndPaste(): void {
    const serialized = this.frame.toJSON();
    const newFrame = new Frame(new WinPolygon(), this.view);
    this.view.shapeManager.shapem.push(newFrame);
    newFrame.deserialize(serialized, this.view);

    // Find rightmost X coordinate
    let maxX = Number.MIN_VALUE;
    this.view.shapeManager.shapem.forEach((frame) => {
      const xMax = frame.polygon.box.xmax;
      if (maxX < xMax) {
        maxX = xMax;
      }
    });

    const currentXMin = newFrame.polygon.box.xmin;
    const offset = Flatten.vector(maxX - currentXMin + 300, 0);
    newFrame.translate(offset);
    newFrame.draw(this.view);
    this.view.activeLayer.batchDraw();
    this.view.mometoManager.checkPoint();
  }

  /**
   * Joint way property - controls how frame edges are joined
   */
  public get jointWay(): JointWay {
    return this.frame.frameManager.getJointWay(0);
  }

  public set jointWay(value: JointWay) {
    this.frame.polygon.edges.forEach((_edge, index) => {
      this.frame.frameManager.ejw[index] = value;
    });
    this.frame.frameManager.recreated(this.frame.polygon, this.view);
    this.view.activeLayer.batchDraw();
    this.view.mometoManager.checkPoint();
  }

  /**
   * Whether the frame is turned/rotated
   */
  public get turned(): boolean {
    return this.frame.turned;
  }

  public set turned(value: boolean) {
    this.frame.turned = value;
    this.frame.updateLabel();
    this.frame.label.draw(this.view);
    this.view.activeLayer.batchDraw();
    this.view.mometoManager.checkPoint();
  }

  /**
   * Whether the top view is hidden
   */
  public get topViewHidden(): boolean {
    return this.frame.topView.hidden;
  }

  public set topViewHidden(value: boolean) {
    this.frame.topView.hidden = value;
    this.frame.topView.updatePoly();
    TopView.optimize(this.view.shapeManager.shapem);
    this.view.mometoManager.checkPoint();
  }

  /**
   * Whether drag/resize operations are locked
   */
  public get lockDragSize(): boolean {
    return this.frame.lockDragSize;
  }

  public set lockDragSize(value: boolean) {
    if (this.frame.lockDragSize !== value) {
      this.frame.lockDragSize = value;
      this.view.mometoManager.checkPoint();
    }
  }

  /**
   * Generate walls for a single rectangular frame
   */
  private generateSingleFrameWall(frame: Frame): void {
    if (!frame.polygon.isRectangle()) {
      return;
    }

    const center = frame.polygon.box.center;
    const existingSegments: Flatten.Segment[] = [];

    // Collect all existing segments from other shapes
    this.view.shapeManager.shapem
      .filter((shape) => shape.id !== frame.id)
      .forEach((shape) => {
        shape.polygon.edges.forEach((edge) => {
          if (edge instanceof Flatten.Segment) {
            existingSegments.push(edge);
          }
        });
      });

    this.view.shapeManager.couples.forEach((couple) => {
      couple.polygon.edges.forEach((edge) => {
        if (edge instanceof Flatten.Segment) {
          existingSegments.push(edge);
        }
      });
    });

    let hasBottomWall = false;
    let hasTopWall = false;
    let leftWall: Wall | undefined;
    let rightWall: Wall | undefined;

    frame.polygon.edges.forEach((edge, edgeIndex) => {
      if (!this.isEdgeCoincident(edge, existingSegments)) {
        return;
      }

      const wallConfig: IWallConfig = {
        based: center,
        edge: edge,
        distance: 100,
        orientation: frame.polygon.orientation
      };

      const generatedWall = WallTool.generateWall(
        this.view.shapeManager.walls,
        wallConfig
      );

      if (generatedWall === undefined) {
        if (Utils.isSegHorizontal(wallConfig.edge)) {
          const middleY = wallConfig.edge.middle().y;
          if (middleY < wallConfig.based.y) {
            hasBottomWall = true;
          } else {
            hasTopWall = true;
          }
        }
        return;
      }

      if (Utils.isSegVertical(wallConfig.edge)) {
        const middleX = wallConfig.edge.middle().x;
        if (middleX < wallConfig.based.x) {
          leftWall = generatedWall;
        } else {
          rightWall = generatedWall;
        }
      } else {
        const edgeDirection = EdgeFinder.Instance.findDirection(
          frame.polygon,
          edgeIndex
        );
        if (edgeDirection !== Direction.Up) {
          this.view.shapeManager.addWall(generatedWall);
          const middleY = wallConfig.edge.middle().y;
          if (middleY < wallConfig.based.y) {
            hasBottomWall = true;
          } else {
            hasTopWall = true;
          }
        }
      }
    });

    const BOTTOM_OFFSET = -500;
    const DEFAULT_TOP_OFFSET = 500;

    // Adjust side walls for bottom
    if (hasBottomWall) {
      if (leftWall) {
        leftWall = leftWall.dragEdge(3, Flatten.vector(0, BOTTOM_OFFSET));
      }
      if (rightWall) {
        rightWall = rightWall.dragEdge(1, Flatten.vector(0, BOTTOM_OFFSET));
      }
    }

    let topOffset = DEFAULT_TOP_OFFSET;

    // Adjust side walls for top
    if (hasTopWall) {
      const upEdge = EdgeFinder.Instance.find(
        Direction.Up,
        frame.polygon.edges,
        frame.polygon.orientation
      );

      if (upEdge) {
        const intersectingWall = this.view.shapeManager.walls.find((wall) =>
          wall.polygon.edges.some(
            (edge) => edge.intersect(upEdge).length === 2
          )
        );

        if (intersectingWall) {
          topOffset = intersectingWall.polygon.box.ymax - intersectingWall.box.ymin;
        }
      }

      if (leftWall) {
        leftWall = leftWall.dragEdge(1, Flatten.vector(0, topOffset));
      }
      if (rightWall) {
        rightWall = rightWall.dragEdge(3, Flatten.vector(0, topOffset));
      }
    }

    // Add generated walls to shape manager
    if (leftWall) {
      this.view.shapeManager.addWall(leftWall);
      const addedWall = this.view.shapeManager.walls[
        this.view.shapeManager.walls.length - 1
      ];
      addedWall.dimForHeight.hidden = true;
      addedWall.dimForHeight.updatePoly();
      addedWall.dimForHeight.draw(this.view);
    }

    if (rightWall) {
      this.view.shapeManager.addWall(rightWall);
      const addedWall = this.view.shapeManager.walls[
        this.view.shapeManager.walls.length - 1
      ];
      addedWall.dimForHeight.hidden = true;
      addedWall.dimForHeight.updatePoly();
      addedWall.dimForHeight.draw(this.view);
    }
  }

  /**
   * Check if an edge coincides with any existing segments
   */
  private isEdgeCoincident(
    edge: Flatten.Segment,
    segments: Flatten.Segment[]
  ): boolean {
    for (const segment of segments) {
      if (Utils.segCoincide(edge, segment)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Generate walls for the current frame and connected components
   */
  public generateWall(): void {
    const connectedFrames = new FrameUtil(this.view)
      .getFrameConnectedComponents(this.frame)
      .filter((component) => component instanceof Frame);

    connectedFrames.push(this.frame);

    connectedFrames.forEach((frame) => {
      this.generateSingleFrameWall(frame);
    });

    this.view.mometoManager.checkPoint();
  }

  /**
   * Whether the frame polygon is a rectangle
   */
  public get isRectangle(): boolean {
    return this.frame.polygon.isRectangle();
  }

  /**
   * Whether the frame uses a KFC polygon type
   */
  public get isKfcPoly(): boolean {
    return this.frame.polygon instanceof KfcPolygon;
  }

  /**
   * Bottom inner dimension for KFC polygons
   */
  public get bottomInnerDim(): number | false {
    return (
      this.frame.polygon instanceof KfcPolygon &&
      this.frame.polygon.bottomInnerDim
    );
  }

  public set bottomInnerDim(value: number) {
    if (
      this.frame.polygon instanceof KfcPolygon &&
      this.frame.polygon.bottomInnerDim !== value
    ) {
      this.frame.polygon.bottomInnerDim = value;
      this.frame.updatePoly();
      this.frame.draw(this.frame.view);
      this.view.refresh();
      this.view.mometoManager.checkPoint();
    }
  }

  /**
   * Equal split ratios as a dash-separated string (e.g., "1-2-1")
   */
  public get equalSplitRatios(): string {
    return this.frame.equalSplitRatios.join('-');
  }

  public set equalSplitRatios(value: string) {
    const ratios = value.split('-').map((ratio) => parseFloat(ratio));
    const hasNaN = ratios.some((ratio) => isNaN(ratio));

    this.frame.equalSplitRatios = hasNaN ? [] : ratios;
    this.frame.updatePoly();
    this.frame.hideAssist();
    this.frame.draw(this.view);
    this.view.refresh();
    this.view.mometoManager.checkPoint();
  }

  /**
   * Opening direction of the frame
   */
  public get openToward(): OpenToward {
    return this.frame.openToward;
  }

  public set openToward(value: OpenToward) {
    this.frame.openToward = value;
    this.view.mometoManager.checkPoint();
  }

  /**
   * Whether a sub-frame has been added to this frame
   */
  public get subFrameAdded(): boolean {
    return !!SubFrame.findBy(this.frame);
  }

  public set subFrameAdded(value: boolean) {
    const existingSubFrame = SubFrame.findBy(this.frame);

    if (value) {
      if (existingSubFrame) {
        return;
      }

      const connectedComponents = new FrameUtil(this.view)
        .getFrameConnectedComponents(this.frame)
        .filter((component) => !(component instanceof Wall));

      this.view.shapeManager.addSubFrame([this.frame, ...connectedComponents]);
    } else {
      if (!existingSubFrame) {
        return;
      }

      existingSubFrame.clear();
      const index = this.view.shapeManager.subFrames.findIndex(
        (subFrame) => subFrame === existingSubFrame
      );
      this.view.shapeManager.subFrames.splice(index, 1);
    }
  }

  /**
   * Frame profile width
   */
  public get width(): number {
    return this.frame.profileSizeManager.frame;
  }

  public set width(value: number) {
    const sizeManager = this.frame.profileSizeManager;
    if (sizeManager.frame !== value) {
      sizeManager.frame = value;
      this.frame.updatePoly();
      this.frame.hideAssist();
      this.frame.draw(this.view);
      this.view.refresh();
      this.view.mometoManager.checkPoint();
    }
  }

  /**
   * Whether resetting virtual bars is allowed for this frame type
   */
  public get allowResetBarsVirtual(): boolean {
    const polygon = this.frame.polygon;
    const isSpecialPolygon =
      polygon instanceof KfcPolygon ||
      polygon instanceof Kfc2Polygon ||
      polygon instanceof Kfc3Polygon ||
      polygon instanceof Kfc4Polygon ||
      polygon instanceof HalfKfcPolygon ||
      polygon instanceof HalfKfc2Polygon;

    return !isSpecialPolygon && this.frame.frameManager._virtuals.length > 0;
  }

  /**
   * Reset all virtual bars in the frame
   */
  public resetBarsVirtual(): void {
    this.frame.frameManager._virtuals = [];
    this.frame.updateFrame();
    this.frame.draw(this.view);
    this.view.activeLayer.batchDraw();
    this.view.mometoManager.checkPoint();
  }
}