import { FillersTool } from './FillersTool';
import { ShapeType } from './ShapeType';

/**
 * Filler panel tool for creating and managing panel-type fillers.
 * Extends the base FillersTool to provide panel-specific functionality.
 */
export class FillerPanelTool extends FillersTool {
  /**
   * Changes the filler type to a panel and redraws it.
   * 
   * @param context - The context object that handles filler type changes
   * @param fillerId - The identifier of the filler to be changed
   */
  changeFillerType(context: any, fillerId: string | number): void {
    const filler = context.changeFillerType(fillerId, ShapeType.Panel);
    
    if (filler) {
      filler.draw(this.view);
    }
  }
}