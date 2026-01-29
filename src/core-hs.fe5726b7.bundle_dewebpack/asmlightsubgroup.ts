import { Entity } from './Entity';
import { LightSubGroup_IO, LightSubGroup } from './LightSubGroup';
import { LightTypeEnum } from './LightTypeEnum';
import { LightSubGroupCompareUtil } from './LightSubGroupCompareUtil';
import { Logger } from './Logger';

class AsmLightSubGroup_IO extends LightSubGroup_IO {
  load(entity: AsmLightSubGroup, data: unknown, context: unknown): void {
    super.load(entity, data, context);
    entity.attachRealLight();
    entity.refreshBoundInternal();
    entity.groupInteractionMode = false;
  }
}

class AsmLightSubGroup extends LightSubGroup {
  groupInteractionMode: boolean;
  contentID?: string;
  content?: HSCore.Model.Entity;

  constructor(name: string = "") {
    super(name);
    this.type = LightTypeEnum.AsmSubGroup;
    this.groupInteractionMode = false;
  }

  static create(name: string, shouldUpdate: boolean = true): AsmLightSubGroup {
    const instance = new AsmLightSubGroup();
    Logger.console.assert(false, "Cannot create AsmLightSubGroup directly.");
    return instance;
  }

  static createByAssembly(
    contentId: string,
    members: HSCore.Model.Light[],
    shouldUpdate: boolean = true
  ): AsmLightSubGroup {
    const instance = new AsmLightSubGroup();
    
    members.forEach((member) => {
      instance.addMember(member);
    });

    instance.memberPropertiesConfig = LightSubGroup.createMemberPropertiesConfig(
      instance.memberProxy.type
    );

    if (shouldUpdate) {
      LightSubGroupCompareUtil.updateProperty(
        instance.memberPropertiesConfig,
        instance.toFlatMemberList()
      );
    }

    instance.contentID = contentId;
    instance.attachRealLight();
    return instance;
  }

  attachRealLight(): void {
    if (this.content || !this.contentID) {
      return;
    }

    this.members.forEach((member) => {
      member.attachRealLight();
    });

    const docManager = HSCore.Doc.getDocManager();
    const activeDoc = docManager.activeDocument;
    this.content = activeDoc.getEntityById(this.contentID);
  }

  getIO(): AsmLightSubGroup_IO {
    return AsmLightSubGroup_IO.instance();
  }

  refreshBoundInternal(): void {
    if (this.members.length !== 0) {
      this.attachRealLight();
      if (this.content) {
        this.content.refreshBoundInternal();
        this.boundInternal = this.content.bound;
      }
    } else {
      this.outline = [];
    }
  }

  verify(): boolean {
    this.attachRealLight();
    
    if (!this.content) {
      return false;
    }

    const validMembers = this.members.filter((member) => {
      return (
        member &&
        member.isFlagOff(HSCore.Model.EntityFlagEnum.removed) &&
        member.getUniqueParent() === this.getUniqueParent()
      );
    });

    if (validMembers.length !== this.members.length) {
      this.members = validMembers;
    }

    let isValid = true;

    if (this.members.length < 1) {
      this.setFlagOn(
        HSCore.Model.EntityFlagEnum.removed | HSCore.Model.EntityFlagEnum.hidden,
        false,
        false
      );
      isValid = false;
    }

    return isValid;
  }

  isValid(): boolean {
    return this.members.length > 0;
  }

  getBoundingData(): unknown {
    Logger.logger("HSCore.Model.Light").warning(
      "Bounding not support for physical light."
    );
    return super.getBoundingData();
  }
}

Entity.registerClass(HSConstants.ModelClass.NgAsmLightSubGroup, AsmLightSubGroup);

export { AsmLightSubGroup_IO, AsmLightSubGroup };