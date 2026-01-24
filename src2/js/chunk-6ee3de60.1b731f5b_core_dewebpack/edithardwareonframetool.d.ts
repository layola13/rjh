import { Vector } from './vector';
import { Utils } from './utils';
import { EventType } from './events';
import { EditHardwareTool, ToolType } from './edit-hardware-tool';
import { SlideSash, FoldSash, HardwareShape, Hardware } from './sash';
import { PushableHardwareManager, PushSashHardwareManager, OpenDirection } from './hardware-manager';

/**
 * Tool for editing hardware positions on a frame.
 * Allows moving hardware along edges and synchronizing hardware across matching sashes.
 */
export class EditHardwareOnFrameTool extends EditHardwareTool {
    /** The view instance this tool operates on */
    protected view: View;

    /** The hardware component being edited */
    protected hardware?: Hardware;

    /** The sash containing the hardware */
    protected sash: Sash;

    /** Current cursor/pointer position */
    protected curPt: Vector;

    /** Hardware manager instance */
    protected manager: HardwareManager;

    /**
     * Creates an instance of EditHardwareOnFrameTool.
     * @param toolType - The type of tool (defaults to editHardwareOnFrame)
     * @param view - The view instance to operate on
     */
    constructor(toolType: ToolType = ToolType.editHardwareOnFrame, view: View) {
        super(toolType, view);
        this.view = view;
    }

    /**
     * Determines if the hardware edge can be changed.
     * Edge changing is allowed for:
     * - Standalone sashes
     * - Slide sashes
     * - Fold sashes with lock-shaped hardware
     * @returns True if edge changing is permitted
     */
    protected allowEdgeChanging(): boolean {
        return (
            this.sash.isStandalone ||
            this.sash instanceof SlideSash ||
            (this.sash instanceof FoldSash && 
             this.hardware?.hardwareShape === HardwareShape.Lock)
        );
    }

    /**
     * Executes the hardware editing task.
     * Handles hardware movement along edges, edge switching, and synchronization.
     * @param skipOptimization - If true, skips handle dimension optimization
     */
    protected doTask(skipOptimization: boolean): void {
        if (this.hardware === undefined || this.hardware.edge === undefined) {
            return;
        }

        const edges = this.sash.polygon.edges;
        
        // Determine target edge index (if edge changing is allowed)
        const targetEdgeIndex = this.allowEdgeChanging() 
            ? Utils.indexOfClosestEdge(this.curPt, edges) 
            : undefined;
        
        const edgeHasChanged = targetEdgeIndex !== this.hardware.edgeIndex;
        
        // Get the target edge
        const targetEdge = targetEdgeIndex !== undefined 
            ? edges[targetEdgeIndex] 
            : this.hardware.edge;
        
        if (!targetEdge) {
            return;
        }

        // Project cursor position onto the edge
        const projectionPoint = Utils.projectionOnEdge(this.curPt, targetEdge);
        
        if (!projectionPoint) {
            return;
        }

        // Calculate normalized position along the edge (0 to 1)
        const distanceFromStart = Utils.distanceFromEdgeStart(projectionPoint, targetEdge);
        const normalizedPosition = distanceFromStart / targetEdge.length;

        // Move hardware to new position
        this.hardware.move(normalizedPosition, targetEdgeIndex);

        // Optimize handle dimensions unless skipped
        if (!skipOptimization) {
            this.view.shapeManager.optimizeHandleDim();
        }

        // Reset offset if edge has changed
        if (edgeHasChanged) {
            this.hardware.dimToMid.offset = Vector.zero();
        }

        // Update and redraw hardware
        this.hardware.updatePoly();
        this.hardware.draw(this.view);

        // Handle pushable hardware manager logic
        if (this.manager instanceof PushableHardwareManager) {
            const shouldMatchOpenDirection = 
                this.manager instanceof PushSashHardwareManager 
                    ? this.manager.slide !== OpenDirection.None
                    : this.manager.openDirection !== OpenDirection.None;

            if (shouldMatchOpenDirection) {
                this.manager.matchOpenDirection();
                this.broadcastTopViewChange();
            }
        }

        // Synchronize hardware on matching sashes (unless locks must be same height)
        if (!(this.sash instanceof SlideSash && this.sash.host.locksSameHeight)) {
            this.onHardwareEdited(normalizedPosition, targetEdgeIndex);
        }
    }

    /**
     * Synchronizes hardware position across all matching sashes.
     * Finds sashes with the same polygon ID and updates their matching hardware.
     * @param normalizedPosition - The normalized position along the edge (0 to 1)
     * @param edgeIndex - The target edge index
     */
    protected onHardwareEdited(normalizedPosition: number, edgeIndex?: number): void {
        this.sash.topFrame.sashManager.allSashes
            // Exclude current sash
            .filter(sash => sash !== this.sash)
            // Only include sashes with matching polygon ID
            .filter(sash => sash.polyId.equalTo(this.sash.polyId))
            // Get all hardware from matching sashes
            .flatMap(sash => sash.hardwareManager.hardwares)
            // Only visible hardware
            .filter(hardware => !hardware.hidden)
            // Only hardware with matching shape
            .filter(hardware => hardware.hardwareShape === this.hardware!.hardwareShape)
            // Align and update each matching hardware
            .forEach(hardware => {
                hardware.alignTo(this.hardware!);
                hardware.updatePoly();
                hardware.draw(this.view);
            });
    }

    /**
     * Broadcasts a top view change event to the view's event bus.
     */
    protected broadcastTopViewChange(): void {
        this.view.eventBus.emit({
            type: EventType.top_view_change,
            payload: {
                view: this.view,
                frame: this.hardware!.topFrame
            }
        });
    }
}

/**
 * Represents a view instance in the application
 */
interface View {
    shapeManager: ShapeManager;
    eventBus: EventBus;
}

/**
 * Manages shapes and their dimensions
 */
interface ShapeManager {
    optimizeHandleDim(): void;
}

/**
 * Event bus for broadcasting view changes
 */
interface EventBus {
    emit(event: ViewChangeEvent): void;
}

/**
 * Event emitted when the top view changes
 */
interface ViewChangeEvent {
    type: EventType;
    payload: {
        view: View;
        frame: Frame;
    };
}

/**
 * Represents a sash component
 */
interface Sash {
    isStandalone: boolean;
    polygon: Polygon;
    polyId: PolygonId;
    topFrame: Frame;
    hardwareManager: HardwareManager;
    host: SashHost;
}

/**
 * Container/host for sashes
 */
interface SashHost {
    locksSameHeight: boolean;
}

/**
 * Represents a polygon with edges
 */
interface Polygon {
    edges: Edge[];
}

/**
 * Represents an edge in a polygon
 */
interface Edge {
    length: number;
}

/**
 * Unique identifier for a polygon
 */
interface PolygonId {
    equalTo(other: PolygonId): boolean;
}

/**
 * Represents a frame containing sashes
 */
interface Frame {
    sashManager: SashManager;
}

/**
 * Manages multiple sashes
 */
interface SashManager {
    allSashes: Sash[];
}

/**
 * Manages hardware components
 */
interface HardwareManager {
    hardwares: Hardware[];
}

/**
 * Dimension with offset
 */
interface Dimension {
    offset: Vector;
}