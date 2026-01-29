import { HSCatalog } from './635589';

interface GroupSpec {
  group: any;
  members: any[];
  parent: any;
}

interface Meta {
  [key: string]: any;
}

export default class GroupTransactionRequest extends HSCore.Transaction.Request {
  private _members: any[];
  private _meta: Meta;
  private _spec!: GroupSpec;

  constructor(members: any[], meta: Meta) {
    super();
    this._members = members;
    this._meta = meta;
  }

  onCommit(): any {
    const activeLayer = HSCore.Doc.getDocManager().activeDocument.scene.activeLayer;
    const group = HSCore.Model.Group.create(this._meta);
    const environmentId = HSApp.App.getApp().environmentManager.getEnvironment().id;

    if (environmentId === 'tpzz' || environmentId === 'tpzz-cabinet') {
      const referenceModel = this.findReferenceModel();
      const finalReference = referenceModel ?? this._members[0];
      group.rotation = finalReference.rotation;
    }

    this._spec = {
      group,
      members: this._members,
      parent: activeLayer
    };

    HSCore.Util.Content.addGroup(this._spec);
    super.onCommit();

    return group;
  }

  onUndo(): void {
    HSCore.Util.Content.removeGroup(this._spec.group);
  }

  onRedo(): void {
    HSCore.Util.Content.addGroup(this._spec);
  }

  getDescription(): string {
    return '模型组合';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.ContentOperation;
  }

  private findReferenceModel(): any | undefined {
    const validModelClasses = [
      HSConstants.ModelClass.DAssembly,
      HSConstants.ModelClass.DExtruding,
      HSConstants.ModelClass.DContent,
      HSConstants.ModelClass.NgGroup
    ];

    const accessoryContentTypes = [
      HSCatalog.ContentTypeEnum.Accessory,
      HSCatalog.ContentTypeEnum.AccessoryCeilingAttached,
      HSCatalog.ContentTypeEnum.AccessoryClothes,
      HSCatalog.ContentTypeEnum.AccessoryFloorBased,
      HSCatalog.ContentTypeEnum.AccessoryOnTopOfOthers,
      HSCatalog.ContentTypeEnum.AccessoryWallAttached
    ];

    let largestModel: any = undefined;
    let maxArea = 0;

    this._members.forEach((member) => {
      if (
        !HSCore.Util.Content.isGenerateModel(member) &&
        !member.contentType.isTypeOf(accessoryContentTypes) &&
        validModelClasses.includes(member.Class)
      ) {
        const outline = member.outline;
        const area = GeLib.PolygonUtils.getArea(outline);
        if (area > maxArea) {
          maxArea = area;
          largestModel = member;
        }
      }
    });

    if (!largestModel) {
      const nonAccessoryMembers = this._members.filter(
        (member) => !member.contentType.isTypeOf(accessoryContentTypes)
      );
      const sortedByArea = nonAccessoryMembers.sort(
        (a, b) => GeLib.PolygonUtils.getArea(b.outline) - GeLib.PolygonUtils.getArea(a.outline)
      );
      largestModel = sortedByArea[0];
    }

    return largestModel;
  }
}