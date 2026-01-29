import { HSCore } from './path/to/HSCore';
import { HSApp } from './path/to/HSApp';
import { HSConstants } from './path/to/HSConstants';

interface SVGAttributes {
  left: number;
  top: number;
  width: number;
  height: number;
  rotation: number;
}

interface Entity {
  rotation: number;
  isFlagOn(flag: number): boolean;
  instanceOf(modelClass: string): boolean;
  members?: Entity[];
}

interface GroupEntity extends Entity {
  members: Entity[];
}

/**
 * Recursively collects SVG attributes from content entities
 * @param contents - Array of entities to process
 * @returns Array of SVG attribute objects
 */
export function getContentsSVGAttributes(contents: Entity[]): SVGAttributes[] {
  return contents.reduce((result: SVGAttributes[], entity: Entity) => {
    let attributes: SVGAttributes;

    if (HSCore.Util.Content.isGenerateModel(entity)) {
      return result;
    }

    if (
      !entity ||
      entity.isFlagOn(HSCore.Model.EntityFlagEnum.removed) ||
      entity.isFlagOn(HSCore.Model.EntityFlagEnum.hidden)
    ) {
      attributes = {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        rotation: 0
      };
    } else {
      const contentBound = HSApp.View.SVG.Util.buildSVGContentBound(entity);
      const clipBound = HSApp.View.SVG.Util.buildSVGContentClipBound(entity);

      attributes = clipBound
        ? { ...clipBound, rotation: entity.rotation }
        : contentBound;
    }

    result.push(attributes);

    if (entity.instanceOf(HSConstants.ModelClass.NgGroup)) {
      const groupEntity = entity as GroupEntity;
      result = result.concat(getContentsSVGAttributes(groupEntity.members));
    }

    return result;
  }, []);
}