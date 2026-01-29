import { HSCore, HSConstants } from './types/hscore';
import { AcceptEntity } from './AcceptEntity';
import { Parameter, InstanceData, DataType } from './Parameter';
import { CustomizationParamKey, CustomizationContentType } from './CustomizationTypes';
import { genEntityTypeFromContent, genCategoryDataFromContent } from './EntityUtils';
import { CustomizationEntityFactory } from './CustomizationEntityFactory';

interface StyleInfo {
  seekId?: string;
  category?: string;
  name?: string;
  aliModel?: string;
}

interface MaterialInfo {
  seekId?: string;
  category?: string;
  name?: string;
  aliModel?: string;
}

interface DetailCardInfo {
  style?: StyleInfo;
  material?: MaterialInfo;
}

interface DetailCardChild {
  style?: StyleInfo;
  material?: MaterialInfo;
}

interface DetailCardData {
  info: DetailCardInfo;
  children: DetailCardChild[];
}

interface CategoryData {
  categoryType?: string;
  displayName?: string;
  aliModelId?: string;
  seekId?: string;
  size?: [number, number, number];
}

type ValidateCategoryEnum =
  | 'wallCabinet'
  | 'wallCabinetSub'
  | 'wallCabinetCorner'
  | 'wallCabinetFiveAngle'
  | 'floorCabinet'
  | 'floorCabinetSub'
  | 'floorCabinetCorner'
  | 'floorCabinetFiveAngle'
  | 'counter'
  | 'wardrobeBase'
  | 'wardrobeBaseSub'
  | 'wardrobeTop'
  | 'wardrobeTopSub'
  | 'wardrobeTopCorner'
  | 'wardrobeTopFiveAngle'
  | 'universalBaseCabinet'
  | 'universalBaseCabinetSub'
  | 'universalBaseCabinetCorner'
  | 'universalBaseCabinetFiveAngle'
  | 'universalWallCabinet'
  | 'universalWallCabinetSub'
  | 'universalWallCabinetCorner'
  | 'universalWallCabinetFiveAngle'
  | 'tatami'
  | 'functionCabinet'
  | 'wallPanel'
  | 'romanColumn'
  | 'sealPlate'
  | 'seeLightBoard'
  | 'externalPanel'
  | 'externalFascia'
  | 'coveredDoor'
  | 'cuttedDoorPanel'
  | 'slidingDoorLeaf'
  | 'drawer'
  | 'handle'
  | 'cabinetHandle'
  | 'embeddedHandle'
  | 'basket'
  | 'sink'
  | 'rangeHood'
  | 'cooktop';

export class CustomizationEntity extends AcceptEntity {
  private static readonly _validateCategories: string[] = [
    'f5a57716-b8d0-4bba-a48d-5ac8e938a039',
    '3c61d25c-57db-4c6e-a35c-0c22ae641529',
    'beaf2f70-958b-4271-9285-5c63fde8a9fd',
    'e3a80e3c-ef72-4efc-93da-404614625329',
    '55d38013-f09a-47f0-9d22-dcb3a99b615c',
    '6d68a065-1a16-49e8-a878-4ca1593fd1ff',
    '49fc7610-1137-43ec-998f-a96ad9cd521d',
    '7cbebcf3-6b9d-4876-8aec-18dceb8c6eba',
    '04adb137-fb35-4ee8-89e4-d4e4db91d40b',
    'a185c571-4db9-45be-8653-ba4aab6489f3',
    '8f5ae4c1-4b6f-4f89-a09d-fc481a0765d9',
    '60164d03-b0fa-4310-bb8a-3d981c3e9796',
    '6aafc067-28a4-4bf5-9912-60bdf63bab2f',
    'b7382eff-e09c-40a6-804c-2b1f662b620d',
    '67f6f2b5-2e90-4c64-aa83-218a7cb67c09',
    'dc40c2a4-188e-4a75-93a4-f5c6a6e4b3f5',
    '492bec8e-d912-40ab-ad86-28d471af004e',
    '11bcfb70-bc1f-4252-a056-d5079e30d0a7',
    '922b9d6b-592a-4117-bafe-f4cb4de38590',
    '792e4073-62a6-4f2c-9497-6ef167fd9792',
    '72efcf34-ea1e-4148-902c-9f43178e9a9b',
    '7a1be1af-47f4-4c96-95a5-8ec92b04e7ed',
    'ad0a8ffc-cb3d-4464-b999-55bdc76e2370',
    'e1d32b32-11f4-43fc-a732-b40aebc9d8fb',
    '1d92de0b-4ed4-41e6-a45f-22f8a12ce17b',
    'c03ecf9b-cc5a-42c7-b4e5-d743f7146028',
    '565f8f3a-6b24-4844-ad98-3079dbf5498f',
    '2a2130fb-3877-4477-80c2-8dda561b3497',
    '1e68a6e6-841b-449d-b8d6-892624c17db',
    '2f83f3be-c713-4d19-85a5-44f388f691e8',
    'a25067d4-102e-47ff-b2e8-df0aef0f1dbf',
    'caed8e97-9ff5-4d70-a422-41adae33f856',
    '356d8a1b-95a6-4783-a769-cbd96cfe4667',
    '717d1438-1b68-4c99-9788-53c1343db12b',
    '29d8eba6-08d8-4ed6-bddb-df45e65533f0',
    '71cbb821-760a-48a2-aac4-1fcbf8675b3b',
    '10d79383-6eba-4173-bf8a-d761f53c9e92',
    '70cdc0b7-82c7-469e-af2c-37a2b8f1bd6b',
    'c7ffb766-f2fe-4535-bbae-6a6e7f1cd349',
    '14ca8ed0-2c77-4524-8fa2-44101b29b504',
    '88fe5d97-1894-47bb-bc45-9456b8b96d39',
    '11209418-dcd9-4d42-af5d-f81a26901758',
  ];

  private static readonly _validateCategoriesEnum: ValidateCategoryEnum[] = [
    'wallCabinet',
    'wallCabinetSub',
    'wallCabinetCorner',
    'wallCabinetFiveAngle',
    'floorCabinet',
    'floorCabinetSub',
    'floorCabinetCorner',
    'floorCabinetFiveAngle',
    'counter',
    'wardrobeBase',
    'wardrobeBaseSub',
    'wardrobeTop',
    'wardrobeTopSub',
    'wardrobeTopCorner',
    'wardrobeTopFiveAngle',
    'universalBaseCabinet',
    'universalBaseCabinetSub',
    'universalBaseCabinetCorner',
    'universalBaseCabinetFiveAngle',
    'universalWallCabinet',
    'universalWallCabinetSub',
    'universalWallCabinetCorner',
    'universalWallCabinetFiveAngle',
    'tatami',
    'functionCabinet',
    'wallPanel',
    'romanColumn',
    'sealPlate',
    'seeLightBoard',
    'externalPanel',
    'externalFascia',
    'coveredDoor',
    'cuttedDoorPanel',
    'slidingDoorLeaf',
    'drawer',
    'handle',
    'cabinetHandle',
    'embeddedHandle',
    'basket',
    'sink',
    'rangeHood',
    'cooktop',
  ];

  private category?: CategoryData;
  private source?: HSCore.Model.DContent;
  private children: CustomizationEntity[] = [];
  private instance!: InstanceData;

  public accept(content: HSCore.Model.DContent): this {
    super.accept(content);
    this.buildDetailCardData(content);
    return this;
  }

  protected buildEntityData(content: HSCore.Model.DContent): void {
    this.setInstanceData(this.getInstanceData(content));
    this.setType(genEntityTypeFromContent(content));
    this.setCategory(this.getCompleteCategoryData(content));
  }

  private buildDetailCardData(content: HSCore.Model.DContent): void {
    const detailCardData = this.getDetailCardData(content);
    this.instance.addParameter(
      new Parameter(CustomizationParamKey.DetailCardData, detailCardData, DataType.Object)
    );
  }

  private getDetailCardData(content: HSCore.Model.DContent): DetailCardData {
    if (content instanceof HSCore.Model.DMolding) {
      let styleInfo: StyleInfo | undefined;

      for (const child of Object.values(content.children)) {
        if (child instanceof HSCore.Model.DSweep) {
          styleInfo = this.getSAMInfo(child.metadata);
          break;
        }
      }

      return {
        info: {
          style: styleInfo,
          material: this.getMaterial(
            this.instance.parameters.get(CustomizationParamKey.Material)
          ),
        },
        children: [],
      };
    }

    if (content instanceof HSCore.Model.DAssembly && content.isCountertop) {
      const children: DetailCardChild[] = [];

      for (const child of Object.values(content.children)) {
        if (child instanceof HSCore.Model.DSweep) {
          children.push({
            style: this.getSAMInfo(child.metadata),
            material: this.getSAMInfo(child.material.metadata),
          });
        }
      }

      return {
        info: {
          style: {
            category: 'e59186c0-7e0e-4ce7-acf9-fa730a2c594a',
          },
        },
        children,
      };
    }

    const detailCard: DetailCardData = {
      info: {
        style: {
          seekId: content.metadata.seekId,
          category: this.category?.categoryType,
          name: this.category?.displayName,
          aliModel: this.category?.aliModelId,
        },
        material: this.getMaterial(
          this.instance.parameters.get(CustomizationParamKey.Material)
        ),
      },
      children: [],
    };

    this.children.forEach((child) => {
      this.getData(child, detailCard.children);
    });

    return detailCard;
  }

  private getData(entity: CustomizationEntity, childrenArray: DetailCardChild[]): void {
    if (entity instanceof CustomizationEntity) {
      const childData: DetailCardChild = {
        style: {
          seekId: entity.source?.metadata.seekId,
          category: entity.category?.categoryType,
          name: entity.category?.displayName,
          aliModel: entity.category?.aliModelId,
        },
        material: this.getMaterial(
          entity.instance.parameters.get(CustomizationParamKey.Material)
        ),
      };

      childrenArray.push(childData);

      entity.children.forEach((childEntity) => {
        this.getData(childEntity, childrenArray);
      });
    }
  }

  private getMaterial(parameter?: Parameter): MaterialInfo | undefined {
    if (!parameter) return undefined;

    return {
      seekId: parameter.value.category?.seekId,
      category: parameter.value.category?.categoryType,
      name: parameter.value.category?.displayName,
      aliModel: parameter.value.category?.aliModelId,
    };
  }

  private getSAMInfo(metadata?: any): StyleInfo | undefined {
    if (!metadata) return undefined;

    return {
      seekId: metadata.seekId,
      category: metadata.categories[0],
      name: metadata.name,
      aliModel: metadata.aliModelId,
    };
  }

  protected buildChildren(content: HSCore.Model.DContent): void {
    this._createChildRecursively(content);
  }

  private getInstanceData(content: HSCore.Model.DContent): InstanceData {
    const instanceData = new InstanceData(content.id);

    if (this.getParent() || !(content.parent instanceof HSCore.Model.Layer)) {
      return instanceData;
    }

    const room = HSCore.Util.Room.getRoomContentIn(content, content.parent, true);
    if (room) {
      instanceData.addParameter(
        new Parameter(CustomizationParamKey.RoomId, room.id, DataType.String)
      );
    }

    const customizationTypes: ValidateCategoryEnum[] = [];
    content.metadata?.categories.forEach((categoryId: string) => {
      const index = CustomizationEntity._validateCategories.indexOf(categoryId);
      if (index > -1) {
        customizationTypes.push(CustomizationEntity._validateCategoriesEnum[index]);
      }
    });

    instanceData.addParameter(
      new Parameter(
        CustomizationParamKey.CustomizationType,
        customizationTypes,
        DataType.StringArray
      )
    );

    return instanceData;
  }

  private _createChildRecursively(content: HSCore.Model.DContent): void {
    content.forEachChild((child: HSCore.Model.DContent) => {
      const validClasses = [
        HSConstants.ModelClass.DAssembly,
        HSConstants.ModelClass.DExtruding,
        HSConstants.ModelClass.DContent,
        HSConstants.ModelClass.DMolding,
      ];

      if (validClasses.includes(child.Class)) {
        if (this._validatecomponent(child)) {
          const entity = CustomizationEntityFactory.createEntity(child.Class, child);
          if (entity) {
            this.addChild(entity);
          }
        } else {
          child.forEachChild((grandChild: HSCore.Model.DContent) => {
            this._createChildRecursively(grandChild);
          });
        }
      }
    });
  }

  private _validatecomponent(content: HSCore.Model.DContent): boolean {
    if (!content.metadata) return false;

    const validContentTypes = [
      CustomizationContentType.FloorCabinet,
      CustomizationContentType.HightCabinet,
      CustomizationContentType.WallCabinet,
      CustomizationContentType.UpCabinet,
      CustomizationContentType.ProtectWallBoard,
      CustomizationContentType.FrontCloseBoard,
      CustomizationContentType.TopCloseBoard,
      CustomizationContentType.CeilingCloseBoard,
      CustomizationContentType.FrontCloseBoardWithFrame,
      CustomizationContentType.TopCloseBoardBetweenTwo,
      CustomizationContentType.UpCloseBoard,
      CustomizationContentType.TatamiDoor,
      CustomizationContentType.SideHungDoor,
      CustomizationContentType.SlidingDoor,
      CustomizationContentType.SlidingDoorLeaf,
      CustomizationContentType.Drawer_Fascias,
      CustomizationContentType.Func_Drawer,
      CustomizationContentType.CabinetHandleType0,
      CustomizationContentType.Sink,
      CustomizationContentType.RangeCooktop,
      CustomizationContentType.TopLine,
      CustomizationContentType.Skirting,
      CustomizationContentType.LightLine,
    ];

    return (
      content.metadata.contentType.isTypeOf(validContentTypes) ||
      content.metadata.categories.some((categoryId: string) =>
        CustomizationEntity._validateCategories.includes(categoryId)
      )
    );
  }

  private getCompleteCategoryData(content: HSCore.Model.DContent): CategoryData {
    const categoryData = this._getBaseCategoryData(content);
    categoryData.size = [content.XLength, content.YLength, content.ZLength];
    return categoryData;
  }

  private _getBaseCategoryData(content: HSCore.Model.DContent): CategoryData {
    return genCategoryDataFromContent(content);
  }

  private setInstanceData(data: InstanceData): void {
    this.instance = data;
  }

  private setType(type: string): void {
    // Implementation depends on parent class
  }

  private setCategory(category: CategoryData): void {
    this.category = category;
  }

  private getParent(): AcceptEntity | undefined {
    // Implementation depends on parent class
    return undefined;
  }

  private addChild(entity: CustomizationEntity): void {
    this.children.push(entity);
  }
}