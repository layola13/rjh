import { HSCore, HSCatalog } from './HSCore';
import { ContentGroupConstraintObject } from './ContentGroupConstraintObject';

interface ContentWithTag {
  content: HSCore.Model.Content;
  tag: unknown;
}

interface AddContentInfo {
  content: HSCore.Model.Content;
  originTag: unknown;
  children?: AddContentInfo[];
}

export class ContentUtils {
  static async addContentsToFloor(
    constraints: (ContentGroupConstraintObject | AddContentInfo)[]
  ): Promise<ContentWithTag[]> {
    const flattenedContents: AddContentInfo[] = [];
    
    constraints.forEach((constraint) => {
      if (constraint instanceof ContentGroupConstraintObject) {
        constraint.children.forEach((child) => {
          flattenedContents.push(child);
        });
      } else {
        flattenedContents.push(constraint);
      }
    });

    return flattenedContents.map((contentInfo, index) => {
      contentInfo.content.addContentInfo = contentInfo;
      return {
        content: contentInfo.content,
        tag: flattenedContents[index].originTag,
      };
    });
  }

  static getTargetContent(
    entity: HSCore.Model.Content | HSCore.Model.Content[] | HSCore.Model.Group,
    targetList: HSCore.Model.Content[],
    floor: HSCore.Model.Floor
  ): void {
    if (entity instanceof Array) {
      entity.forEach((item) => {
        this.getTargetContent(item, targetList, floor);
      });
    } else if (entity instanceof HSCore.Model.Group) {
      entity.forEachMember((member) => {
        this.getTargetContent(member, targetList, floor);
      });
    } else if (this._isTargetContent(entity, floor)) {
      targetList.push(entity);
    }
  }

  static getTargetContentsOnFloor(floor: HSCore.Model.Floor): HSCore.Model.Content[] {
    const targetContents: HSCore.Model.Content[] = [];
    
    floor.getUniqueParent().forEachContent((content) => {
      ContentUtils.getTargetContent(content, targetContents, floor);
    });

    return targetContents;
  }

  static getAllContentsOnFloor(floor: HSCore.Model.Floor): HSCore.Model.Content[] {
    const allContents: HSCore.Model.Content[] = [];

    floor.getUniqueParent().forEachContent((content) => {
      if (content instanceof Array) {
        content.forEach((item) => {
          if (item instanceof HSCore.Model.Content && item.isContentInRoom(floor)) {
            allContents.push(item);
          }
        });
      } else if (content instanceof HSCore.Model.Group) {
        content.forEachMember((member) => {
          if (member.isContentInRoom(floor)) {
            allContents.push(member);
          }
        });
      } else if (content.isContentInRoom(floor)) {
        allContents.push(content);
      }
    });

    return allContents;
  }

  static removeContentsOnFloor(floor: HSCore.Model.Floor): void {
    const contents = this.getAllContentsOnFloor(floor);
    for (const content of contents) {
      HSCore.Util.Content.removeContent(content);
    }
  }

  static isCeilingAttachedLight(contentType: HSCatalog.ContentType): boolean {
    return contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_CeilingAttachedLighting);
  }

  static isValidCeilingAttached(contentType: HSCatalog.ContentType): boolean {
    const validCeilingAttachedTypes = [
      HSCatalog.ContentTypeEnum.GeneralAttachToCeiling,
      HSCatalog.ContentTypeEnum.AccessoryCeilingAttached,
      HSCatalog.ContentTypeEnum.ApplianceCeilingAttached,
      HSCatalog.ContentTypeEnum.BathroomAccessoryCeilingAttached,
      HSCatalog.ContentTypeEnum.BathroomHeater,
      HSCatalog.ContentTypeEnum.CeilingAttachedShowerHead,
      HSCatalog.ContentTypeEnum.CeilingAttachedStorageUnit,
      ...HSCatalog.ContentTypeEnum.ext_CeilingAttachedLighting,
    ];

    return contentType.isTypeOf(validCeilingAttachedTypes);
  }

  private static _isTargetContent(
    content: HSCore.Model.Content,
    floor: HSCore.Model.Floor
  ): boolean {
    if (content.isFlagOff(HSCore.Model.EntityFlagEnum.removed) === false) {
      return false;
    }

    if (content.isFlagOn(HSCore.Model.EntityFlagEnum.hidden)) {
      return false;
    }

    if (!content.contentType) {
      return false;
    }

    if (
      content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_CeilingAttached) &&
      !ContentUtils.isValidCeilingAttached(content.contentType)
    ) {
      return false;
    }

    if (content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.CustomizedPersonalizedModel)) {
      return false;
    }

    if (
      content instanceof HSCore.Model.Opening ||
      content instanceof HSCore.Model.CornerWindow ||
      content instanceof HSCore.Model.Door ||
      content instanceof HSCore.Model.Window ||
      content instanceof HSCore.Model.BayWindow ||
      content instanceof HSCore.Model.CornerFlatWindow ||
      content instanceof HSCore.Model.POrdinaryWindow ||
      content instanceof HSCore.Model.ParametricOpening
    ) {
      return false;
    }

    if (!content.isContentInRoom(floor)) {
      return false;
    }

    if (content instanceof HSCore.Model.Group) {
      return false;
    }

    if (this._isParametricContent(content)) {
      return false;
    }

    if (!this.isContentInCategoryWhitelist(content, floor.roomType)) {
      return false;
    }

    return true;
  }

  static isContentInCategoryWhitelist(
    content: HSCore.Model.Content,
    roomType: unknown
  ): boolean {
    return true;
  }

  private static _isParametricContent(content: HSCore.Model.Content): boolean {
    return (
      content instanceof HSCore.Model.NCustomizedStructure ||
      content instanceof HSCore.Model.PAssembly ||
      content instanceof HSCore.Model.DAssembly ||
      content instanceof HSCore.Model.DExtruding ||
      content instanceof HSCore.Model.DMolding ||
      content instanceof HSCore.Model.MeshContent ||
      content instanceof HSCore.Model.WaterJetTile ||
      content instanceof HSCore.Model.ParametricContentBase ||
      content instanceof HSCore.Model.CustomizedModel ||
      content instanceof HSCore.Model.NCustomizedFeatureModel ||
      content instanceof HSCore.Model.NCustomizedBeam ||
      content instanceof HSCore.Model.ParametricModelContent ||
      content instanceof HSCore.Model.Obstacle
    );
  }

  static async copyContent<T extends HSCore.Model.Content>(content: T): Promise<T> {
    return content;
  }
}