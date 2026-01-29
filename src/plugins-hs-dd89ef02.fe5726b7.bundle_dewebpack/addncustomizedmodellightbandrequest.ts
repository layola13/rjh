import { HSCore } from './HSCore';

interface LightBandParams {
  pathCoedge3dsTags: string[];
  faceTag?: string;
  flipVertical?: boolean;
  flip?: boolean;
  profileWidth?: number;
  profileHeight?: number;
}

interface RelatedLightBands {
  overlaped: HSCore.Model.NCustomizedModelLightBand[];
  connect: HSCore.Model.NCustomizedModelLightBand[];
}

interface LightBandEntity extends HSCore.Model.Entity {
  parameters?: LightBandParams;
  init(params: LightBandParams): void;
  setFlagOn(flag: HSCore.Model.EntityFlagEnum): void;
  isFlagOn(flag: HSCore.Model.EntityFlagEnum): boolean;
}

interface ParentEntity extends HSCore.Model.Entity {
  breps: unknown[];
  parent?: ParentEntity;
  addChild(entity: LightBandEntity): void;
  findRelatedLightBands(tag: string): RelatedLightBands;
}

export class AddNCustomizedModelLightBandRequest extends HSCore.Transaction.Common.StateRequest {
  parent: ParentEntity;
  params: LightBandParams;
  lightBandEntity?: LightBandEntity;
  private _removedLightBands: LightBandEntity[];

  constructor(parent: ParentEntity, params: LightBandParams) {
    super();
    this.parent = parent;
    this.params = params;
    this._removedLightBands = [];
    this.lightBandEntity = undefined;
  }

  onCommit(): void {
    const { params } = this;
    const { pathCoedge3dsTags } = params;
    const breps = this.parent.breps;
    const overlapedLightBands: LightBandEntity[] = [];
    const connectedLightBands: LightBandEntity[] = [];

    pathCoedge3dsTags.forEach((tag) => {
      const relatedBands = this.parent.findRelatedLightBands(tag);
      overlapedLightBands.push(...relatedBands.overlaped);
      connectedLightBands.push(...relatedBands.connect);
    });

    overlapedLightBands.forEach((lightBand) => {
      HSCore.Util.Content.removeNCustomizedModelLightBand(lightBand);
      this._removedLightBands.push(lightBand);
    });

    if (!params.faceTag) {
      const sweeperHelper = HSCore.Model.SweeperConnectHelper.getInstance();

      connectedLightBands.forEach((lightBand) => {
        if (!lightBand.isFlagOn(HSCore.Model.EntityFlagEnum.removed)) {
          let shouldMerge = true;
          const currentPathTags = params.pathCoedge3dsTags;
          const existingPathTags = lightBand.parameters?.pathCoedge3dsTags;

          if (currentPathTags?.length && existingPathTags?.length) {
            const firstCoedge = sweeperHelper.findCoedgeByTag(currentPathTags[0], breps);
            const lastCoedge = sweeperHelper.findCoedgeByTag(currentPathTags[currentPathTags.length - 1], breps);
            const existingFirstCoedge = sweeperHelper.findCoedgeByTag(existingPathTags[0], breps);
            const existingLastCoedge = sweeperHelper.findCoedgeByTag(existingPathTags[existingPathTags.length - 1], breps);

            if (firstCoedge && lastCoedge && existingFirstCoedge && existingLastCoedge) {
              const lastCurve = lastCoedge.getCurve();
              const existingFirstCurve = existingFirstCoedge.getCurve();
              const existingLastCurve = existingLastCoedge.getCurve();
              const firstCurve = firstCoedge.getCurve();

              if (
                lastCurve.getEndPt().equals(existingFirstCurve.getStartPt()) ||
                (lastCurve.getStartPt().equals(existingFirstCurve.getStartPt()) && lastCurve instanceof HSMath.Arc3d) ||
                (lastCurve.getEndPt().equals(existingFirstCurve.getEndPt()) && existingFirstCurve instanceof HSMath.Arc3d)
              ) {
                currentPathTags.push(...existingPathTags);
              } else if (
                firstCurve.getStartPt().equals(existingLastCurve.getEndPt()) ||
                (lastCurve.getEndPt().equals(existingLastCurve.getEndPt()) && lastCurve instanceof HSMath.Arc3d) ||
                (lastCurve.getStartPt().equals(existingLastCurve.getStartPt()) && existingLastCurve instanceof HSMath.Arc3d)
              ) {
                currentPathTags.unshift(...existingPathTags);
              } else {
                shouldMerge = false;
              }

              if (shouldMerge) {
                HSCore.Util.Content.removeNCustomizedModelLightBand(lightBand);
                this._removedLightBands.push(lightBand);
              }
            }
          }
        }
      });

      if (connectedLightBands.length) {
        const firstConnectedBand = connectedLightBands[0];
        Object.assign(params, {
          flipVertical: firstConnectedBand.parameters?.flipVertical,
          flip: firstConnectedBand.parameters?.flip,
          profileWidth: firstConnectedBand.parameters?.profileWidth,
          profileHeight: firstConnectedBand.parameters?.profileHeight,
        });
      }
    }

    const newLightBand = HSCore.Util.CustomizedModel.createNCustomizedModelLightBand();
    
    if (this.parent instanceof HSCore.Model.NCustomizedModelLightSlot) {
      this.parent.parent?.addChild(newLightBand);
    } else {
      this.parent.addChild(newLightBand);
    }

    newLightBand.init(params);
    this.lightBandEntity = newLightBand;

    super.onCommit();
  }

  onUndo(): void {
    super.onUndo();
    this.lightBandEntity?.setFlagOn(HSCore.Model.EntityFlagEnum.removed);
  }

  onRedo(): void {
    super.onRedo();
    this._removedLightBands.forEach((lightBand) => {
      lightBand.setFlagOn(HSCore.Model.EntityFlagEnum.removed);
    });
  }

  canTransactField(): boolean {
    return true;
  }
}