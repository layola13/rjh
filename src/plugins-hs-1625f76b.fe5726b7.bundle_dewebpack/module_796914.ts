import { HSCore } from './HSCore';
import { HSApp } from './HSApp';

interface DirtyFloor {
  dirtyGeometry(): void;
}

interface ContentHost {
  getHost(): ContentHost | null;
  forEachFace(callback: (face: Face) => void): void;
  dirtyClipGeometry(): void;
  dirtyFaceMaterials(): void;
}

interface Face {
  dirtyGeometry(): void;
}

interface Content {
  id: string;
  getHost(): ContentHost | null;
  getRefreshFloors?(dirtyFloors: DirtyFloor[]): DirtyFloor[];
  signalValidityChanged?: {
    dispatch(valid: boolean): void;
  };
}

interface Opening extends Content {
  signalValidityChanged: {
    dispatch(valid: boolean): void;
  };
}

interface ParametricOpening extends Content {
  signalValidityChanged: {
    dispatch(valid: boolean): void;
  };
}

interface Layer {
  next: Layer | null;
  holeBuilder: {
    buildHole(contentId: string): void;
  };
  removeChild(content: Content): void;
}

interface OverlapPatchResult {
  update: Map<string, Content>;
  recover: Map<string, Content>;
}

export default class RemoveContentCommand extends HSCore.Transaction.Common.StateRequest {
  private _content: Content;
  private _contentHost: ContentHost | null;
  private _autoBuild: boolean;
  private _dirtyFloors: Set<DirtyFloor>;

  constructor(content: Content, autoBuild: boolean = true) {
    super();
    this._content = content;
    this._contentHost = this._content?.getHost() ?? null;
    this._autoBuild = autoBuild;
    this._dirtyFloors = new Set<DirtyFloor>();
  }

  private _validate(): void {
    if (
      this._content instanceof HSCore.Model.Opening ||
      this._content instanceof HSCore.Model.ParametricOpening
    ) {
      const overlapObjects = HSApp.Util.Layer.calcOverlapObject(this._content);
      const removedLinkedObjects = HSApp.Util.Layer.findRemovedLinkedObject(
        overlapObjects,
        this._content.id
      );
      const patchedObjects = HSApp.Util.Layer.patchOverlapObejct(
        new Map([...overlapObjects, ...removedLinkedObjects])
      );
      const { update, recover } = patchedObjects;

      update.forEach((content) => {
        if (
          content.id !== this._content.id &&
          (content instanceof HSCore.Model.Opening ||
            content instanceof HSCore.Model.ParametricOpening)
        ) {
          content.signalValidityChanged.dispatch(true);
        }
      });

      recover.forEach((content) => {
        if (
          content.id !== this._content.id &&
          (content instanceof HSCore.Model.Opening ||
            content instanceof HSCore.Model.ParametricOpening)
        ) {
          content.signalValidityChanged.dispatch(false);
        }
      });
    }
  }

  onCommit(): void {
    this._validate();

    const entityLayer = HSCore.Util.Layer.getEntityLayer(this._content);
    const affectedLayers: Layer[] = [entityLayer];

    const collectAffectedLayers = (layer: Layer | null): void => {
      if (layer && HSCore.Util.Opening.isOpeningPartialInLayer(this._content, layer)) {
        affectedLayers.push(layer);
        collectAffectedLayers(layer.next);
      }
    };

    collectAffectedLayers(entityLayer.next);

    if (
      this._content instanceof HSCore.Model.Opening &&
      this._content.getRefreshFloors
    ) {
      const refreshedFloors = this._content.getRefreshFloors(
        Array.from(this._dirtyFloors)
      );
      refreshedFloors.forEach((floor) => this._dirtyFloors.add(floor));
    }

    if (
      this._content instanceof HSCore.Model.Opening ||
      this._content instanceof HSCore.Model.ParametricOpening
    ) {
      HSCore.Util.FaceMoldingFitHelper.getInstance().startListening(affectedLayers);
    }

    if (entityLayer instanceof HSCore.Model.Layer) {
      entityLayer.removeChild(this._content);

      if (this._autoBuild) {
        affectedLayers.forEach((layer) => {
          layer.holeBuilder.buildHole(this._content.id);
        });
      }
    }

    if (
      this._content instanceof HSCore.Model.Opening ||
      this._content instanceof HSCore.Model.ParametricOpening
    ) {
      HSCore.Util.FaceMoldingFitHelper.getInstance().autoFit();
    }

    this._dirtyFloors.forEach((floor) => floor.dirtyGeometry());

    if (this._content.getHost() instanceof HSCore.Model.NCustomizedParametricRoof) {
      const roofHost = this._content.getHost() as ContentHost;
      roofHost.dirtyClipGeometry();
      roofHost.dirtyFaceMaterials();
    }

    super.onCommit();
  }

  onUndo(): void {
    super.onUndo();

    this._dirtyFloors.forEach((floor) => floor.dirtyGeometry());

    if (this._content.getHost() instanceof HSCore.Model.NCustomizedParametricRoof) {
      const roofHost = this._content.getHost() as ContentHost;
      roofHost.dirtyClipGeometry();
      roofHost.dirtyFaceMaterials();
    }
  }

  onRedo(): void {
    super.onRedo();

    this._dirtyFloors.forEach((floor) => floor.dirtyGeometry());

    if (this._content.getHost() instanceof HSCore.Model.NCustomizedParametricRoof) {
      const roofHost = this._content.getHost() as ContentHost;
      roofHost.dirtyClipGeometry();
      roofHost.dirtyFaceMaterials();
    }
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return '删除门框结构';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }

  updateHoleAffectedFace(): void {
    if (
      this._content instanceof HSCore.Model.Opening &&
      HSCore.Util.Content.isSlabOpening(this._content)
    ) {
      const host = this._content.getHost() ?? this._contentHost;
      host?.forEachFace((face) => {
        if (
          face instanceof HSCore.Model.Ceiling ||
          face instanceof HSCore.Model.Floor
        ) {
          face.dirtyGeometry();
          HSCore.Paint.PaintsUtil.updateFaceMixpaint(face);
        }
      });
    }
  }
}