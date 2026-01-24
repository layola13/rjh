import { Tool, ToolType } from './Tool';
import type { View } from './View';
import type { Point } from './Point';

/**
 * Note tool for adding annotations to the view.
 * Allows users to click/tap on the canvas to create text notes at specific positions.
 */
export class NoteTool extends Tool {
  /** Reference to the main view instance */
  private view: View;
  
  /** Current point where the note will be placed */
  private curPt?: Point;

  /**
   * Creates a new NoteTool instance.
   * @param view - The view instance this tool operates on
   */
  constructor(view: View) {
    super(ToolType.note, view);
    this.view = view;
  }

  /**
   * Handles mouse up / touch end events to create a note at the interaction point.
   * Extracts coordinates from either MouseEvent or TouchEvent and displays the note editor.
   * @param event - Mouse or touch event containing position data
   */
  mouseup(event: MouseEvent | TouchEvent): void {
    super.mouseup(event);

    let pageX: number;
    let pageY: number;

    // Check if TouchEvent is supported in the browser
    if (typeof window.TouchEvent === 'undefined') {
      // Browser doesn't support TouchEvent - treat as mouse event
      const mouseOrTouch = event instanceof MouseEvent 
        ? event 
        : (event as TouchEvent).changedTouches[0];
      pageX = mouseOrTouch.pageX;
      pageY = mouseOrTouch.pageY;
    } else {
      // Browser supports TouchEvent - handle accordingly
      const touchOrMouse = event instanceof TouchEvent 
        ? event.changedTouches[0] 
        : event;
      pageX = touchOrMouse.pageX;
      pageY = touchOrMouse.pageY;
    }

    // Show the note editor at the interaction point
    this.showEditor(pageX, pageY, '', (noteContent: string) => {
      // Add the note to the shape manager at the current point
      this.view.shapeManager.addNote(noteContent, this.curPt);
      
      // Create a checkpoint in the memento manager for undo/redo
      this.view.mometoManager.checkPoint();
      
      // Release the tool after note creation
      this.view.toolManager.releaseTool();
    });
  }

  /**
   * Shows the note editor at the specified coordinates.
   * @param x - X coordinate for the editor
   * @param y - Y coordinate for the editor
   * @param initialContent - Initial text content for the note
   * @param onSave - Callback invoked when the note is saved
   */
  protected showEditor(
    x: number, 
    y: number, 
    initialContent: string, 
    onSave: (content: string) => void
  ): void {
    // Implementation inherited from base Tool class or to be implemented
  }
}