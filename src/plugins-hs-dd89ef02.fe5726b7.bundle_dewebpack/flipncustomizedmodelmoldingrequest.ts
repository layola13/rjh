import { HSCore } from './HSCore';

/**
 * Request for flipping and customizing model molding features.
 * Handles molding transformations including horizontal/vertical flips and related coedge manipulations.
 */
export class FlipNCustomizedModelMoldingRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _molding: any;
  private _removedMoldings: any[];

  constructor(molding: any) {
    super();
    this._molding = molding;
    this._removedMoldings = [];
  }

  onCommit(): void {
    const molding = this._molding;
    const parameters = this._molding.parameters;
    const path = molding.path;
    const uniqueParent = this._molding.getUniqueParent();

    if (!parameters || !path || !uniqueParent) {
      super.onCommit([]);
      return;
    }

    const originalPosition = HSApp.Util.NCustomizedFeatureModel.getCoedgesPosition(
      path,
      uniqueParent
    );

    if (originalPosition === 1) {
      super.onCommit([]);
      return;
    }

    const selectionManager = HSApp.App.getApp().selectionManager;
    selectionManager.unselect(this._molding);

    const relatedCoedges = path.map((coedge: any) => this._getRelatedCoedge(coedge));
    const relatedCoedgeTags = relatedCoedges.map((coedge: any) => coedge?.tag);
    relatedCoedgeTags.reverse();

    const newPosition = HSApp.Util.NCustomizedFeatureModel.getCoedgesPosition(
      relatedCoedges,
      uniqueParent
    );

    const overlappedMoldings: any[] = [];
    relatedCoedgeTags.forEach((tag: string | undefined) => {
      if (tag) {
        const relatedMoldings = uniqueParent.findRelatedMoldings(tag);
        overlappedMoldings.push(...relatedMoldings.overlaped);
      }
    });

    overlappedMoldings.forEach((overlappedMolding: any) => {
      HSCore.Util.Content.removeNCustomizedModelMolding(overlappedMolding);
      this._removedMoldings.push(overlappedMolding);
    });

    const clonedParameters = _.cloneDeep(parameters);

    if (newPosition === originalPosition || parameters.contentType === 'baseboard') {
      Object.assign(clonedParameters, {
        pathCoedge3dsTags: relatedCoedgeTags,
        faceTag: undefined
      });
    } else {
      Object.assign(clonedParameters, {
        pathCoedge3dsTags: relatedCoedgeTags,
        faceTag: undefined,
        flipHorizontal: parameters.flipHorizontal,
        flipVertical: !parameters.flipVertical,
        flip: !parameters.flip,
        offsetX:
          originalPosition === 3
            ? parameters.offsetX + parameters.profileHeight
            : parameters.offsetX - parameters.profileHeight
      });
    }

    const clonedMetadata = _.cloneDeep(molding.metadata);
    Object.assign(clonedMetadata, {
      contentTypeStr: molding.metadata.contentType?.getTypeString()
    });

    molding.init(clonedMetadata, clonedParameters);
    molding.dirtyGeometry();
    selectionManager.select(molding);

    super.onCommit([]);
  }

  private _getRelatedCoedge(coedge: any): any | undefined {
    if (!coedge) {
      return undefined;
    }

    const edge = coedge.getEdge();
    return edge?.getCoedge3ds().find((c: any) => c.tag !== coedge.tag);
  }

  onUndo(): void {
    super.onUndo([]);
  }

  onRedo(): void {
    super.onRedo([]);
    this._removedMoldings.forEach((molding: any) => {
      molding.setFlagOn(HSCore.Model.EntityFlagEnum.removed);
    });
  }

  canTransactField(): boolean {
    return true;
  }
}