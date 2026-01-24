import type { Point } from 'konva/lib/types';
import type { KonvaEventObject } from 'konva/lib/Node';
import type { Tool, ToolType } from './Tool';
import type { View } from './View';
import type { EventBus } from './EventBus';
import type { MomentoManager } from './MomentoManager';

/**
 * Corner joiner robot interface
 * Represents a corner joiner component with configurable profile size
 */
interface CornerJoinerRobot {
  /**
   * Profile size of the corner joiner in millimeters
   */
  profileSize: number;
  
  /**
   * Current size of the corner joiner
   */
  size: number;
  
  /**
   * Resize the corner joiner to the specified size
   * @param size - Target size for the corner joiner
   */
  resize(size: number): void;
}

/**
 * Visual shape representation containing corner joiner attributes
 */
interface VShape {
  attrs: {
    /**
     * Associated corner joiner robot component
     */
    robot: CornerJoinerRobot;
  };
}

/**
 * Event payload for corner joiner face width text editing
 */
interface EditCornerJoinerFaceWidthPayload {
  /**
   * Original Konva event that triggered the edit
   */
  event: KonvaEventObject<Event>;
  
  /**
   * Initial profile size value
   */
  initValue: number;
  
  /**
   * Callback invoked when user confirms the new value
   * @param value - New profile size value
   */
  onConfirm: (value: number) => void;
}

/**
 * Drawing parameters singleton configuration
 */
interface DrawParams {
  /**
   * Whether custom dimension editor is enabled
   */
  customDimEditor?: boolean;
}

/**
 * System parameter configuration
 */
interface SystemParam {
  /**
   * Whether the application is running on a mobile device
   */
  isMobileDevice: boolean;
}

/**
 * View interface with event bus and momento manager
 */
interface ViewWithManagers extends View {
  /**
   * Event bus for application-wide events
   */
  eventBus: EventBus;
  
  /**
   * Momento manager for undo/redo functionality
   */
  mometoManager: MomentoManager;
  
  /**
   * Refresh the view to reflect changes
   */
  refresh(): void;
}

/**
 * Tool for editing corner joiner profile size via double-click text interaction
 * 
 * Allows users to modify the profile size of corner joiner components by
 * double-clicking on the dimension text. Supports both desktop number editor
 * and mobile custom dimension editor workflows.
 */
export declare class EditCornerJoinerProfileSizeTextTool extends Tool {
  /**
   * Reference to the application view
   */
  private readonly view: ViewWithManagers;
  
  /**
   * Previously recorded point position
   */
  private prevPt: Point;
  
  /**
   * Current visual shape being edited
   */
  private vshape: VShape;
  
  /**
   * Get the corner joiner robot associated with the current visual shape
   */
  get cornerJoiner(): CornerJoinerRobot;
  
  /**
   * Creates an instance of EditCornerJoinerProfileSizeTextTool
   * @param view - Application view instance
   */
  constructor(view: ViewWithManagers);
  
  /**
   * Handle double-click event on corner joiner dimension text
   * 
   * Shows appropriate editor (mobile or desktop) based on device type
   * and configuration settings.
   * 
   * @param event - Konva double-click event
   */
  dbclick(event: KonvaEventObject<Event>): void;
  
  /**
   * Emit corner joiner edit event for mobile custom dimension editor
   * 
   * @param event - Original Konva event
   */
  private emitCornerJoiner(event: KonvaEventObject<Event>): void;
  
  /**
   * Confirm and apply new profile size value
   * 
   * Updates the corner joiner if the value changed, triggers resize,
   * creates undo checkpoint, and refreshes the view.
   * 
   * @param newValue - New profile size value in millimeters
   */
  private onConfirm(newValue: number): void;
  
  /**
   * Show number editor dialog for desktop devices
   * 
   * @param event - Konva event for positioning
   * @param initialValue - Current profile size value
   * @param callback - Callback invoked with confirmed value
   */
  private showNumberEditor(
    event: KonvaEventObject<Event>,
    initialValue: number,
    callback: (value: number) => void
  ): void;
}