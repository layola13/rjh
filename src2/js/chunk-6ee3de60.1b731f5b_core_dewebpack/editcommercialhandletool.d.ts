import { EditHardwareOnFrameTool, ToolType } from './EditHardwareOnFrameToolModule';
import type { View } from './ViewTypes';
import type { Hardware } from './HardwareTypes';
import type { Sash } from './SashTypes';

/**
 * Tool for editing commercial door/window handles in the editor.
 * Extends the base hardware editing functionality with specific behavior for commercial handles.
 */
export class EditCommercialHandleTool extends EditHardwareOnFrameTool {
  /**
   * Reference to the view instance where the tool operates.
   */
  protected view: View;

  /**
   * The sash component that contains the hardware being edited.
   */
  protected sash: Sash;

  /**
   * Creates a new EditCommercialHandleTool instance.
   * 
   * @param view - The view instance where the tool will operate
   */
  constructor(view: View) {
    super(ToolType.editCommercialHandle, view);
    this.view = view;
  }

  /**
   * Callback triggered when hardware editing is completed.
   * Updates the hardware indicator polygon and redraws it in the view.
   * 
   * @param hardware - The hardware component that was edited
   * @param sash - The sash component containing the edited hardware
   */
  protected onHardwareEdited(hardware: Hardware, sash: Sash): void {
    super.onHardwareEdited(hardware, sash);
    
    const hardwareManager = this.sash.hardwareManager;
    hardwareManager.indicator.updatePoly();
    hardwareManager.indicator.draw(this.view);
  }
}