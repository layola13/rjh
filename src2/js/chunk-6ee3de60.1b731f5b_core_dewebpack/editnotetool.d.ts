import type { Point, Vector } from 'point-library';
import type { Tool, ToolType } from './tool';
import type { ShapeHelper } from './shape-helper';
import type { Text } from './text';
import type { EventBus, EventType, NoteSettings } from './events';

/**
 * Represents a visual shape with attributes
 */
interface VShape {
  attrs: ShapeAttrs;
}

/**
 * Shape attributes containing robot data
 */
interface ShapeAttrs {
  robot: Note;
  data: {
    poly: Text | unknown;
  };
}

/**
 * Note entity that can be edited and translated
 */
interface Note {
  /** Target point for text-based notes */
  to: Point;
  
  /** The text content of the note */
  text: string;
  
  /**
   * Handles edit event for the note
   * @param newText - Updated text content
   * @param view - The current view instance
   */
  onEdit(newText: string, view: View): void;
  
  /**
   * Translates the note by a vector
   * @param vector - Translation vector
   */
  translate(vector: Vector): void;
  
  /**
   * Updates the internal polygon representation
   */
  updatePoly(): void;
  
  /**
   * Draws the note on the view
   * @param view - The view to render on
   */
  draw(view: View): void;
}

/**
 * Manages undo/redo checkpoints
 */
interface MomentoManager {
  /**
   * Creates a checkpoint for undo/redo functionality
   */
  checkPoint(): void;
}

/**
 * Main view/canvas context
 */
interface View {
  /** Event bus for pub/sub pattern */
  eventBus: EventBus;
  
  /** Undo/redo manager */
  mometoManager: MomentoManager;
  
  /**
   * Refreshes the view
   */
  refresh(): void;
}

/**
 * Konva event object wrapper
 */
interface KonvaEvent {
  /** The shape that triggered the event */
  target: VShape;
  
  /** Original browser event (mouse or touch) */
  evt: MouseEvent | TouchEvent;
}

/**
 * Callback invoked when text editing is complete
 */
type EditorCallback = (newText: string) => void;

/**
 * Tool for editing note annotations
 * Handles double-click editing, dragging, and position updates
 */
declare class EditNoteTool extends Tool {
  /** The current view instance */
  protected readonly view: View;
  
  /** Currently selected visual shape */
  protected vshape?: VShape;
  
  /** Previous point during drag operations */
  protected prevPt: Point;
  
  /**
   * @param view - The view instance to operate on
   */
  constructor(view: View);
  
  /**
   * Gets the attributes of the current shape
   */
  get attrs(): ShapeAttrs;
  
  /**
   * Gets the note object from current shape
   */
  get note(): Note;
  
  /**
   * Gets the polygon/text element from the shape data
   */
  get poly(): Text | unknown;
  
  /**
   * Handles double-click events to show text editor
   * @param event - Konva double-click event
   */
  dbclick(event: KonvaEvent): void;
  
  /**
   * Emits note settings event to the event bus
   */
  protected emitNoteSettings(): void;
  
  /**
   * Handles drag start event
   * @param event - Konva drag start event
   */
  dragstart(event: KonvaEvent): void;
  
  /**
   * Handles drag move event with animation frame optimization
   * @param event - Konva drag move event
   */
  dragmove(event: KonvaEvent): void;
  
  /**
   * Handles mouse/drag completion event
   * @param event - Konva mouse up event
   */
  mousedone(event: KonvaEvent): void;
  
  /**
   * Shows the text editor UI
   * @param pageX - X position on page
   * @param pageY - Y position on page
   * @param currentText - Current text content
   * @param callback - Callback when editing is complete
   */
  protected showEditor(
    pageX: number,
    pageY: number,
    currentText: string,
    callback: EditorCallback
  ): void;
}

export { EditNoteTool };