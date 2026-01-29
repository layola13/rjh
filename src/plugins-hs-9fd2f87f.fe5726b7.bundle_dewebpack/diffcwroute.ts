import { HSCore } from './HSCore';

export class DiffCWRoute extends HSCore.Model.Entity {
  type: string | undefined;
  path: any | undefined;
  srcId: string | undefined;
  destId: string | undefined;

  get diameter(): HSCore.Model.CWTubeDiameterEnum {
    let diameter = HSCore.Model.CWTubeDiameterEnum.D25;
    
    if (
      this.type === HSCore.Model.CWStrongElecComp.Type || 
      this.type === HSCore.Model.CWWeakElecComp.Type
    ) {
      diameter = HSCore.Model.CWTubeDiameterEnum.D16;
    }
    
    return diameter;
  }

  setParams(params: {
    type: string;
    path: any;
    srcId: string;
    destId: string;
  }): void {
    this.type = params.type;
    this.path = params.path;
    this.srcId = params.srcId;
    this.destId = params.destId;
  }
}