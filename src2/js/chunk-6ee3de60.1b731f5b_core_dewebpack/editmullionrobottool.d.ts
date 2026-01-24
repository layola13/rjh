import { Point, Vector } from './geometry';
import { Tool, ToolType } from './tool';
import { EventType } from './events';
import { ShapeHelper, Utils } from './utils';
import { ShapeActor } from './shape-actor';
import { EditSplitterTool } from './edit-splitter-tool';

/**
 * Robot data associated with mullion shapes
 */
interface RobotData {
  /** Center point of the robot */
  cpt: Point;
  /** Reference point for rotation */
  pt: Point;
  /** Whether this is an arc-based robot */
  arc: boolean;
  /** Index of the inner edge */
  innerEdgeIndex: number;
  /** Index of the current element */
  idx: number;
}

/**
 * Robot interface for mullion manipulation
 */
interface MullionRobot {
  /** Model manager containing bars data */
  mm: {
    bars: Array<{
      /** Parent frame reference */
      parent?: unknown;
      /** Top frame for dimension handling */
      topFrame?: unknown;
    }>;
  };
  /**
   * Drag operation handler
   * @param deltaOrAngle - Position delta vector or rotation angle
   * @param index - Bar index
   * @param edgeIndex - Inner edge index
   * @param point - Reference point
   * @param vector - Movement vector
   * @param apply - Whether to apply changes immediately
   */
  drag(
    deltaOrAngle: Vector | number,
    index: number,
    edgeIndex: number,
    point: Point,
    vector: Vector,
    apply: boolean
  ): void;
  /** Hide robot visual feedback */
  hide(): void;
}

/**
 * Visual shape representation with robot attributes
 */
interface VShape {
  attrs: {
    /** Associated robot controller */
    robot?: MullionRobot;
    /** Robot-specific data */
    robData: RobotData;
  };
}

/**
 * Drag event from the canvas
 */
interface DragEvent {
  /** The shape being dragged */
  target: VShape;
}

/**
 * View interface with event bus and memento management
 */
interface View {
  /** Event bus for publishing drag events */
  eventBus: {
    emit(event: { type: EventType; payload: { moving: boolean } }): void;
  };
  /** Memento manager for undo/redo functionality */
  mometoManager: {
    /** Create a checkpoint for state restoration */
    checkPoint(): void;
  };
}

/**
 * Tool for editing mullion positions using robot-based manipulation.
 * Supports both linear and arc-based mullion movements with angle snapping.
 */
export class EditMullionRobotTool extends Tool {
  /** The view this tool operates on */
  private readonly view: View;
  /** Previous mouse position for delta calculation */
  private prevPt: Point;
  /** Angular offset for rotation operations */
  private offag: number;
  /** Currently manipulated visual shape */
  private vshape?: VShape;

  /**
   * Creates a new EditMullionRobotTool instance
   * @param view - The view to attach this tool to
   */
  constructor(view: View) {
    super(ToolType.editMullionRobot, view);
    this.view = view;
    this.prevPt = new Point();
    this.offag = 0;
  }

  /**
   * Handle drag start event
   * @param event - Drag start event containing target shape
   */
  dragstart(event: DragEvent): void {
    super.dragstart(event);
    this.prevPt = this.curPt;
    this.vshape = event.target;

    const robData = this.vshape.attrs.robData;
    
    // Calculate initial angular offset for non-arc robots
    if (!robData.arc) {
      const refVector = Vector.from(robData.cpt, robData.pt).normalize();
      const curVector = Vector.from(robData.cpt, this.curPt).normalize();
      this.offag = Math.atan2(refVector.cross(curVector), refVector.dot(curVector));
    }
  }

  /**
   * Handle drag move event with animation frame throttling
   * @param event - Drag move event
   */
  dragmove(event: DragEvent): void {
    super.dragmove(event);
    
    if (this.vshape !== undefined) {
      requestAnimationFrame(() => {
        this.doTask();
      });
    }
  }

  /**
   * Handle drag completion event
   * @param event - Mouse done event
   */
  mousedone(event: DragEvent): void {
    if (this.vshape !== undefined) {
      this.doTask(true);
      this.view.mometoManager.checkPoint();
      ShapeHelper.restoreShapeMatrix(this.vshape);
      this.vshape = undefined;
      ShapeActor.emitStructureChanged(this.view);
    }
    
    super.mousedone(event);
  }

  /**
   * Execute the drag task, either previewing or committing changes
   * @param commit - Whether to commit changes (true) or preview (false)
   */
  private doTask(commit: boolean = false): void {
    if (this.vshape === undefined) return;

    const currentPoint = this.curPt;
    const deltaVector = Vector.from(this.prevPt, currentPoint);
    const robot = this.vshape.attrs.robot;

    if (robot === undefined) return;

    const robData = this.vshape.attrs.robData;
    const isArc = robData.arc;
    const edgeIndex = robData.innerEdgeIndex;
    const barIndex = robData.idx;

    if (isArc) {
      // Arc-based drag: move by delta vector
      robot.drag(deltaVector, barIndex, edgeIndex, new Point(), new Vector(), !commit);
    } else {
      // Rotation-based drag: calculate angle change
      const centerPoint = robData.cpt;
      const currentSlope = Vector.from(centerPoint, this.curPt).slope;
      const previousSlope = Vector.from(centerPoint, this.prevPt).slope;

      // Apply angle snapping
      const snappedAngle = this.showSnap(centerPoint, commit);
      let finalSlope = currentSlope;

      if (commit && snappedAngle !== undefined) {
        finalSlope = snappedAngle + this.offag;
        const distance = centerPoint.distanceTo(this.curPt)[0];
        const snappedPoint = Utils.slopeDirPt(centerPoint, distance, snappedAngle);
        deltaVector.set(Vector.from(this.prevPt, snappedPoint));
        robot.hide();
      }

      const angleDelta = finalSlope - previousSlope;
      robot.drag(angleDelta, barIndex, edgeIndex, this.prevPt, deltaVector, !commit);
    }

    this.prevPt = currentPoint;

    // Update extra dimensions if bar has parent
    const bar = robot.mm.bars[barIndex];
    if (bar?.parent) {
      EditSplitterTool.handleExtraDim(bar.topFrame, this.view);
    }

    // Emit drag event
    this.view.eventBus.emit({
      type: EventType.drag_finished,
      payload: { moving: commit }
    });
  }

  /**
   * Show angle snap guides or return snapped angle
   * @param centerPoint - Center point of rotation
   * @param returnAngle - Whether to return angle (true) or display snap (false)
   * @returns Snapped angle if within threshold, undefined otherwise
   */
  private showSnap(centerPoint: Point, returnAngle: boolean): number | undefined {
    /** Convert degrees to radians */
    const degreesToRadians = (degrees: number): number => degrees * Math.PI / 180;

    this.hideSnaps();

    const currentSlope = Vector.from(centerPoint, this.curPt).slope;
    const snapAngles = [0, 45, 90, 135, 180, 225, 270, 315].map(degreesToRadians);
    const snapThreshold = degreesToRadians(5);

    // Find nearest snap angle within threshold
    const snappedAngle = snapAngles.find(angle => Math.abs(angle - currentSlope) < snapThreshold);

    if (snappedAngle !== undefined) {
      if (returnAngle) {
        return snappedAngle;
      }

      // Display snap guide
      const distance = centerPoint.distanceTo(this.curPt)[0];
      const snapPoint = Utils.slopeDirPt(centerPoint, distance, snappedAngle);
      this.displaySnap(centerPoint, snapPoint);
    }

    return undefined;
  }
}