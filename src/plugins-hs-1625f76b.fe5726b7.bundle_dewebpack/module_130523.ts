import { HSApp } from './518193';
import { HSCore } from './635589';

export default class ApplyParamsToAllOpeningsCommand extends HSApp.Cmd.Command {
  private templateEntity: any;
  private entities: any[];
  private transMgr: any;

  constructor(templateEntity: any) {
    super();
    this.templateEntity = templateEntity;
    this.entities = [];
    this.transMgr = HSApp.App.getApp().transManager;
  }

  onExecute(): void {
    if (Array.isArray(this.entities) && this.templateEntity) {
      this.entities = this._getAllOpeningsExcludeSelf();
      const request = this.transMgr.createRequest(
        HSFPConstants.RequestType.ApplyParamsToAllOpeningRequest,
        [this.templateEntity, this.entities]
      );
      this.transMgr.commit(request);
    }
  }

  private _getAllOpeningsExcludeSelf(): any[] {
    const openings: any[] = [];
    
    HSApp.App.getApp().floorplan.scene.forEachLayer((layer: any) => {
      layer.forEachOpening((opening: any) => {
        const isTemplateSelf = opening.id === this.templateEntity.id;
        const isDifferentSeekId = opening.seekId !== this.templateEntity.seekId;
        const isHiddenOrRemoved = opening.isFlagOn(
          HSCore.Model.EntityFlagEnum.hidden | HSCore.Model.EntityFlagEnum.removed
        );
        
        if (!isTemplateSelf && !isDifferentSeekId && !isHiddenOrRemoved) {
          openings.push(opening);
        }
      });
    });
    
    return openings;
  }

  canUndoRedo(): boolean {
    return true;
  }

  getDescription(): string {
    return "应用离地高度到所有Opening";
  }
}