import { HSCore } from './HSCore';

interface LightSlotParams {
  pathCoedge3dsTags: string[];
  faceTag?: string;
  flipVertical?: boolean;
  flip?: boolean;
  aLength?: number;
  bLength?: number;
}

interface LightSlotEntity {
  parameters?: {
    pathCoedge3dsTags: string[];
    flipVertical?: boolean;
    flip?: boolean;
    aLength?: number;
    bLength?: number;
  };
  isFlagOn(flag: HSCore.Model.EntityFlagEnum): boolean;
  setFlagOn(flag: HSCore.Model.EntityFlagEnum): void;
  init(params: LightSlotParams): void;
}

interface RelatedLightSlots {
  overlaped: LightSlotEntity[];
  connect: LightSlotEntity[];
}

interface Coedge {
  getCurve(): Curve;
}

interface Curve {
  getStartPt(): Point;
  getEndPt(): Point;
}

interface Point {
  equals(other: Point): boolean;
}

interface Brep {
  // Define brep structure as needed
}

interface ParentEntity {
  breps: Brep[];
  findRelatedLightSlots(tag: string): RelatedLightSlots;
  addChild(entity: LightSlotEntity): void;
}

export class AddNCustomizedModelLightSlotRequest extends HSCore.Transaction.Common.StateRequest {
  parent: ParentEntity;
  params: LightSlotParams;
  lightSlotEntity: LightSlotEntity | undefined;
  private _removedLightSlots: LightSlotEntity[];

  constructor(parent: ParentEntity, params: LightSlotParams) {
    super();
    this.parent = parent;
    this.params = params;
    this._removedLightSlots = [];
    this.lightSlotEntity = undefined;
  }

  onCommit(): void {
    const params = this.params;
    const pathCoedge3dsTags = this.params.pathCoedge3dsTags;
    const breps = this.parent.breps;
    const overlapedSlots: LightSlotEntity[] = [];
    const connectedSlots: LightSlotEntity[] = [];

    pathCoedge3dsTags.forEach((tag) => {
      const relatedSlots = this.parent.findRelatedLightSlots(tag);
      overlapedSlots.push(...relatedSlots.overlaped);
      connectedSlots.push(...relatedSlots.connect);
    });

    overlapedSlots.forEach((slot) => {
      HSCore.Util.Content.removeNCustomizedModelLightSlot(slot);
      this._removedLightSlots.push(slot);
    });

    if (!params.faceTag) {
      const sweeperHelper = HSCore.Model.SweeperConnectHelper.getInstance();

      if (connectedSlots.length) {
        connectedSlots.forEach((slot) => {
          if (slot && !slot.isFlagOn(HSCore.Model.EntityFlagEnum.removed)) {
            let shouldMerge = true;
            const currentPathTags = params.pathCoedge3dsTags;
            const slotPathTags = slot.parameters?.pathCoedge3dsTags;

            if (currentPathTags?.length && slotPathTags?.length) {
              const currentFirstCoedge = sweeperHelper.findCoedgeByTag(currentPathTags[0], breps);
              const currentLastCoedge = sweeperHelper.findCoedgeByTag(currentPathTags[currentPathTags.length - 1], breps);
              const slotFirstCoedge = sweeperHelper.findCoedgeByTag(slotPathTags[0], breps);
              const slotLastCoedge = sweeperHelper.findCoedgeByTag(slotPathTags[slotPathTags.length - 1], breps);

              if (currentFirstCoedge && currentLastCoedge && slotFirstCoedge && slotLastCoedge) {
                const currentLastCurve = currentLastCoedge.getCurve();
                const slotFirstCurve = slotFirstCoedge.getCurve();
                const currentFirstCurve = currentFirstCoedge.getCurve();
                const slotLastCurve = slotLastCoedge.getCurve();

                if (
                  currentLastCurve.getEndPt().equals(slotFirstCurve.getStartPt()) ||
                  (currentLastCurve.getStartPt().equals(slotFirstCurve.getStartPt()) && currentLastCurve instanceof HSMath.Arc3d) ||
                  (currentLastCurve.getEndPt().equals(slotFirstCurve.getEndPt()) && slotFirstCurve instanceof HSMath.Arc3d)
                ) {
                  currentPathTags.push(...slotPathTags);
                } else if (
                  currentFirstCurve.getStartPt().equals(slotLastCurve.getEndPt()) ||
                  (currentLastCurve.getEndPt().equals(slotLastCurve.getEndPt()) && currentLastCurve instanceof HSMath.Arc3d) ||
                  (currentLastCurve.getStartPt().equals(slotLastCurve.getStartPt()) && slotLastCurve instanceof HSMath.Arc3d)
                ) {
                  currentPathTags.unshift(...slotPathTags);
                } else {
                  shouldMerge = false;
                }

                if (shouldMerge) {
                  HSCore.Util.Content.removeNCustomizedModelLightSlot(slot);
                  this._removedLightSlots.push(slot);
                }
              }
            }
          }
        });

        const firstConnectedSlot = connectedSlots[0];
        if (firstConnectedSlot?.parameters) {
          Object.assign(params, {
            flipVertical: firstConnectedSlot.parameters.flipVertical,
            flip: firstConnectedSlot.parameters.flip,
            aLength: firstConnectedSlot.parameters.aLength,
            bLength: firstConnectedSlot.parameters.bLength,
          });
        }
      }
    }

    const newLightSlot = HSCore.Util.CustomizedModel.createNCustomizedModelLightSlot();
    this.parent.addChild(newLightSlot);
    newLightSlot.init(params);
    this.lightSlotEntity = newLightSlot;

    super.onCommit?.([]);
  }

  onUndo(): void {
    super.onUndo?.([]);
    this.lightSlotEntity?.setFlagOn(HSCore.Model.EntityFlagEnum.removed);
  }

  onRedo(): void {
    super.onRedo?.([]);
    this._removedLightSlots.forEach((slot) => {
      slot.setFlagOn(HSCore.Model.EntityFlagEnum.removed);
    });
  }

  canTransactField(): boolean {
    return true;
  }
}