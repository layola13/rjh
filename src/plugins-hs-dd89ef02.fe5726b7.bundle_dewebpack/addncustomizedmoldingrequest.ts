import { HSCore } from './HSCore';
import HSMath from './HSMath';
import HSApp from './HSApp';

interface MoldingParameters {
  seekId?: string;
  pathCoedge3dsTags?: number[];
  faceTag?: number;
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  flip?: boolean;
  offsetX?: number;
  offsetY?: number;
  materialData?: unknown;
  texture?: unknown;
  normalTexture?: unknown;
  normalTextureHigh?: unknown;
  profileWidth?: number;
  profileHeight?: number;
}

interface ProfileMetabase {
  profile: {
    contentType: {
      getTypeString(): string;
    };
    [key: string]: unknown;
  };
}

interface RelatedMoldings {
  overlaped: HSCore.Model.NCustomizedModelMolding[];
  connect: HSCore.Model.NCustomizedModelMolding[];
}

interface ParentEntity extends HSCore.Model.Entity {
  breps: unknown[];
  findRelatedMoldings(tag: number): RelatedMoldings;
  addChild(entity: HSCore.Model.NCustomizedModelMolding): void;
}

interface NCustomizedModelLightSlot extends ParentEntity {
  parent: ParentEntity;
}

export class AddNCustomizedMoldingRequest extends HSCore.Transaction.Common.StateRequest {
  parent: ParentEntity | NCustomizedModelLightSlot;
  metabase: ProfileMetabase;
  params: MoldingParameters;
  moldingEntity: HSCore.Model.NCustomizedModelMolding | undefined;
  private _removedMoldings: HSCore.Model.NCustomizedModelMolding[];

  constructor(
    parent: ParentEntity | NCustomizedModelLightSlot,
    metabase: ProfileMetabase,
    params: MoldingParameters
  ) {
    super();
    this.parent = parent;
    this.metabase = metabase;
    this.params = params;
    this._removedMoldings = [];
    this.moldingEntity = undefined;
  }

  onCommit(): void {
    const { params } = this;
    const { pathCoedge3dsTags } = params;
    const breps = this.parent.breps;
    const overlapedMoldings: HSCore.Model.NCustomizedModelMolding[] = [];
    const connectedMoldings: HSCore.Model.NCustomizedModelMolding[] = [];

    if (pathCoedge3dsTags != null) {
      pathCoedge3dsTags.forEach((tag) => {
        const relatedMoldings = this.parent.findRelatedMoldings(tag);
        overlapedMoldings.push(...relatedMoldings.overlaped);
        connectedMoldings.push(...relatedMoldings.connect);
      });
    }

    overlapedMoldings.forEach((molding) => {
      HSCore.Util.Content.removeNCustomizedModelMolding(molding);
      this._removedMoldings.push(molding);
    });

    if (!params.faceTag) {
      const matchingMoldings = connectedMoldings.filter((molding) => {
        return molding?.parameters?.seekId === this.params.seekId;
      });

      const sweeperHelper = HSCore.Model.SweeperConnectHelper.getInstance();

      if (matchingMoldings.length > 0) {
        matchingMoldings.forEach((molding) => {
          if (molding && !molding.isFlagOn(HSCore.Model.EntityFlagEnum.removed)) {
            let shouldMerge = true;
            const currentCoedgeTags = params.pathCoedge3dsTags;
            const moldingCoedgeTags = molding.parameters?.pathCoedge3dsTags;

            for (const pathSegment of molding.path) {
              const relatedCoedge = HSApp.Util.NCustomizedFeatureModel.getRelatedCoedge(pathSegment);
              if (relatedCoedge && currentCoedgeTags?.includes(relatedCoedge.tag)) {
                shouldMerge = false;
                return;
              }
            }

            if (currentCoedgeTags?.length && moldingCoedgeTags?.length) {
              const currentStart = sweeperHelper.findCoedgeByTag(currentCoedgeTags[0], breps);
              const currentEnd = sweeperHelper.findCoedgeByTag(
                currentCoedgeTags[currentCoedgeTags.length - 1],
                breps
              );
              const moldingStart = sweeperHelper.findCoedgeByTag(moldingCoedgeTags[0], breps);
              const moldingEnd = sweeperHelper.findCoedgeByTag(
                moldingCoedgeTags[moldingCoedgeTags.length - 1],
                breps
              );

              if (currentStart && currentEnd && moldingStart && moldingEnd) {
                const canAppend =
                  currentEnd.getCurve().getEndPt().equals(moldingStart.getCurve().getStartPt()) ||
                  (currentEnd.getCurve().getStartPt().equals(moldingStart.getCurve().getStartPt()) &&
                    currentEnd.getCurve() instanceof HSMath.Arc3d) ||
                  (currentEnd.getCurve().getEndPt().equals(moldingStart.getCurve().getEndPt()) &&
                    moldingStart.getCurve() instanceof HSMath.Arc3d);

                const canPrepend =
                  currentStart.getCurve().getStartPt().equals(moldingEnd.getCurve().getEndPt()) ||
                  (currentEnd.getCurve().getEndPt().equals(moldingEnd.getCurve().getEndPt()) &&
                    currentEnd.getCurve() instanceof HSMath.Arc3d) ||
                  (currentEnd.getCurve().getStartPt().equals(moldingEnd.getCurve().getStartPt()) &&
                    moldingEnd.getCurve() instanceof HSMath.Arc3d);

                if (canAppend) {
                  currentCoedgeTags.push(...moldingCoedgeTags);
                } else if (canPrepend) {
                  currentCoedgeTags.unshift(...moldingCoedgeTags);
                } else {
                  shouldMerge = false;
                }

                if (shouldMerge) {
                  HSCore.Util.Content.removeNCustomizedModelMolding(molding);
                  this._removedMoldings.push(molding);
                }
              }
            }
          }
        });
      }

      if (matchingMoldings.length > 0) {
        const firstMatching = matchingMoldings[0];
        Object.assign(params, {
          flipHorizontal: firstMatching.flipHorizontal,
          flipVertical: firstMatching.flipVertical,
          flip: firstMatching.flip,
          offsetX: firstMatching.offsetX,
          offsetY: firstMatching.offsetY,
          materialData: firstMatching.materialData,
          texture: firstMatching.texture,
          normalTexture: firstMatching.normalTexture,
          normalTextureHigh: firstMatching.normalTextureHigh,
          profileWidth: firstMatching.profileWidth,
          profileHeight: firstMatching.profileHeight,
        });
      }
    }

    const newMolding = HSCore.Util.CustomizedModel.createNCustomizedModelMolding();

    if (this.parent instanceof HSCore.Model.NCustomizedModelLightSlot) {
      this.parent.parent.addChild(newMolding);
    } else {
      this.parent.addChild(newMolding);
    }

    const profileData = {
      ...this.metabase.profile,
      contentTypeStr: this.metabase.profile.contentType.getTypeString(),
    };

    newMolding.init(profileData, params);
    this.moldingEntity = newMolding;

    super.onCommit();
  }

  onUndo(): void {
    super.onUndo();
    this.moldingEntity?.setFlagOn(HSCore.Model.EntityFlagEnum.removed);
  }

  onRedo(): void {
    super.onRedo();
    this._removedMoldings.forEach((molding) => {
      molding.setFlagOn(HSCore.Model.EntityFlagEnum.removed);
    });
  }

  canTransactField(): boolean {
    return true;
  }
}