export enum CabinetType {
  BaseNoApplianceWithDoor = "BaseNoApplianceWithDoor",
  BaseNoApplianceWithDrawer = "BaseNoApplianceWithDrawer",
  BaseWithSink = "BaseWithSink",
  BaseWithCooktop = "BaseWithCooktop",
  BaseStraightCorner = "BaseStraightCorner",
  WallCooktop = "WallTwoDoorWithRangeCooktop",
  WallSingleDoor = "WallSingleDoorCabinet",
  WallTwoDoor = "WallTwoDoorCabinet",
  Lightboard = "Lightboard",
  WallTwoDoorCorner = "WallTwoDoorCornerCabinet",
  BaseSingleDoorCorner = "BaseSingleDoorCornerCabinet",
  BaseOven = "BaseCabinetWithOven",
  HighCabinetNormal = "HighCabinetNormalSizeWithAppliance",
  FridgeSingleDoor = "FridgeSingleDoor",
  FridgeDoubleDoor = "FridgeDoubleDoor",
  HighCabinetHalf = "HighCabinetHalfSizeWithAppliance",
  HighCabinetFull = "HighCabinetFullSizeWithAppliance",
  HighCabinetFullTwo = "HighCabinetFullSizeWithTwoAppliance",
  HighCabinetFullNone = "HighCabinetFullSizeWithoutAppliance"
}

export const CabinetDetailType = {
  BaseSingleDoorCabinet: "8ce4ed58-4224-34ef-84b2-4af77db15733",
  BaseSingleDoorWidthSinkCabinet: "0a7794f2-a524-3019-bfe4-47169658fa68",
  BaseSingleDoorWidthCookingCabinet: "fcde1606-1b1f-3c3f-8056-66a5d0c572b6",
  BaseSingleDoorCornerCabinet: "9fd14132-f5da-40ba-854e-c7625f1238dc",
  BaseTwoDoorCabinet: "8fc804dd-3170-3144-ba1d-0d291e67f4ee",
  BaseTwoDoorCornerCabinet: "96b6bf2c-fe6d-3ef1-a07e-bea1e057d215",
  BaseTwoDoorWidthSinkCabinet: "fbb0f4a0-359f-3a3c-830e-3fb43a481d8a",
  BaseTwoDoorWidthCookingCabinet: "0ddc88c9-54e6-3e1f-b459-da55d7a17f11",
  BaseTwoDoorCornerWidthSinkCabinet: "2673390c-1672-37c5-a4ed-fbab535197cc",
  BaseTwoDoorCornerWidthCookingCabinet: "7c6ab9d5-0f24-39f8-88f0-119006d44177",
  BaseSingleDrawerCabinet: "d09e28ec-ab02-3881-9130-2244ac988278",
  BaseTwoDrawerCabinet: "82457864-682f-3c91-812d-38c75727254e",
  BaseThreeDrawerCabinet: "8a4ff8a5-18cb-377b-983c-4161b6a05f0b",
  BaseFourDrawerCabinet: "506e17bc-0bb6-3078-a4a4-6fdf37222233",
  BaseCabinetWithDishWasher: "276a3f67-9a09-3f53-bea3-cd87d8d4e10f",
  BaseCabinetWithOven: "e96fb05c-bde4-35ad-bf22-77233f7e4ec7",
  BaseCabinetWithMicrowaveOven: "200a4f90-91d5-3bb9-a7fd-eb9bd96e6af5",
  BaseStraightCornerCabinet: "33da6b5a-7f90-4615-b876-c359092ce8b5",
  BaseFiveCornerCabinet: "e4ecd13d-a1b6-321d-ade4-124fb23d7160",
  WallSingleCabinet: "4f4beb7d-479c-31ea-ac60-b6043b42702e",
  WallTwoDoorCabinet: "e2e27f8d-6260-347a-bdc7-f31e89a0714b",
  WallSingleDoorOpeningUpCabinet: "8155a97f-3d6d-3af9-989c-aefa95d32152",
  WallDoubleDoorOpeningUpCabinet: "0d2b3f3e-edd0-365d-8dc7-20bdc032eb54",
  WallTwoDoorWithRangeCooktopCabinet: "f68a7788-a7c8-3513-a295-e04a31c5ddb1",
  WallTwoDoorCornerCabinet: "f6428810-bc8e-468f-b87b-e4e25456c1b2",
  WallStraightCornerCabinet: "e6e64fe0-95d9-4635-bf62-f002a315918b",
  WallFiveCornerCabinet: "82d85fad-050c-398b-9ba3-ccdce86d7923",
  HighCabinetHalfSizeWithAppliance: "abc9a552-5600-3ba7-96d4-e098d4aadf13",
  HighCabinetNormalSizeWithAppliance: "b8d2a2df-50dd-3f36-865b-8ff41d7772f6",
  HighCabinetFullSizeWithAppliance: "33235c0d-1204-32f0-9bd5-ef1440a9fe94",
  HighCabinetFullSizeWithTwoAppliance: "fb8b70fa-aa1f-3ece-a748-f67a80432a59",
  HighCabinetFullSizeWithoutAppliance: "b65db994-365b-3ed3-98ae-10544283bb84",
  FridgeSingleDoor: "c96a5061-a4f7-4463-bc70-6ebd578f1189",
  FridgeDoubleDoor: "7ad71445-44b8-4050-affe-1184b27d9514",
  ZipboardI: "1ace54d0-344a-3abe-a92d-8ae737d64e17",
  ZipboardL: "dabecf6a-8a50-3203-b5f6-e4e55e7e651c",
  Lightboard: "79dabeb7-d0d3-34f0-89ec-b195de881711"
} as const;

interface Position {
  x: number;
  y: number;
  z: number;
}

interface Dimensions {
  XLength?: number;
  YLength?: number;
  ZLength?: number;
}

interface StateValues {
  [key: string]: unknown;
}

type CabinetDetailTypeMap = typeof CabinetDetailType;

const CABINET_DETAIL_TYPE_MAPPING: string[][][] = [
  [
    [
      CabinetDetailType.BaseSingleDoorCabinet,
      CabinetDetailType.BaseTwoDoorCabinet,
      CabinetDetailType.BaseTwoDoorCornerCabinet
    ],
    [
      CabinetDetailType.BaseSingleDrawerCabinet,
      CabinetDetailType.BaseTwoDrawerCabinet,
      CabinetDetailType.BaseThreeDrawerCabinet,
      CabinetDetailType.BaseFourDrawerCabinet
    ],
    [
      CabinetDetailType.BaseSingleDoorWidthSinkCabinet,
      CabinetDetailType.BaseTwoDoorWidthSinkCabinet,
      CabinetDetailType.BaseTwoDoorCornerWidthSinkCabinet
    ],
    [
      CabinetDetailType.BaseSingleDoorWidthCookingCabinet,
      CabinetDetailType.BaseTwoDoorWidthCookingCabinet,
      CabinetDetailType.BaseTwoDoorCornerWidthCookingCabinet
    ],
    [
      CabinetDetailType.BaseStraightCornerCabinet,
      CabinetDetailType.BaseSingleDoorCornerCabinet
    ],
    [CabinetDetailType.WallTwoDoorWithRangeCooktopCabinet],
    [
      CabinetDetailType.WallSingleCabinet,
      CabinetDetailType.WallTwoDoorCabinet,
      CabinetDetailType.WallTwoDoorCornerCabinet
    ],
    [CabinetDetailType.Lightboard],
    [
      CabinetDetailType.BaseCabinetWithDishWasher,
      CabinetDetailType.BaseCabinetWithOven
    ],
    [
      CabinetDetailType.HighCabinetHalfSizeWithAppliance,
      CabinetDetailType.HighCabinetNormalSizeWithAppliance,
      CabinetDetailType.HighCabinetFullSizeWithAppliance,
      CabinetDetailType.HighCabinetFullSizeWithTwoAppliance,
      CabinetDetailType.HighCabinetFullSizeWithoutAppliance
    ],
    [CabinetDetailType.FridgeSingleDoor, CabinetDetailType.FridgeDoubleDoor]
  ]
];

const DEFAULT_CABINET_DETAIL_TYPE = "8fc804dd-3170-3144-ba1d-0d291e67f4ee";
const SIZE_THRESHOLD = 0.8;
const DEFAULT_X_LENGTH = 0.9;

function getDetailTypeByTypeAndSize(
  cabinetType: CabinetType,
  dimensions?: Dimensions
): string {
  const xLength = dimensions?.XLength ?? DEFAULT_X_LENGTH;
  const sizeIndex = GeLib.MathUtils.smaller(xLength, SIZE_THRESHOLD) ? 0 : 1;

  let detailType: string;

  switch (cabinetType) {
    case CabinetType.BaseNoApplianceWithDoor:
      detailType = CABINET_DETAIL_TYPE_MAPPING[0][0][sizeIndex];
      break;
    case CabinetType.BaseNoApplianceWithDrawer:
      detailType = CABINET_DETAIL_TYPE_MAPPING[0][1][3];
      break;
    case CabinetType.BaseWithSink:
      detailType = CABINET_DETAIL_TYPE_MAPPING[0][2][sizeIndex];
      break;
    case CabinetType.BaseWithCooktop:
      detailType = CABINET_DETAIL_TYPE_MAPPING[0][3][sizeIndex];
      break;
    case CabinetType.BaseStraightCorner:
      detailType = CABINET_DETAIL_TYPE_MAPPING[0][4][0];
      break;
    case CabinetType.BaseSingleDoorCorner:
      detailType = CABINET_DETAIL_TYPE_MAPPING[0][4][1];
      break;
    case CabinetType.WallCooktop:
      detailType = CABINET_DETAIL_TYPE_MAPPING[0][5][0];
      break;
    case CabinetType.WallSingleDoor:
      detailType = CABINET_DETAIL_TYPE_MAPPING[0][6][0];
      break;
    case CabinetType.WallTwoDoor:
      detailType = CABINET_DETAIL_TYPE_MAPPING[0][6][1];
      break;
    case CabinetType.Lightboard:
      detailType = CABINET_DETAIL_TYPE_MAPPING[0][7][0];
      break;
    case CabinetType.WallTwoDoorCorner:
      detailType = CABINET_DETAIL_TYPE_MAPPING[0][6][2];
      break;
    case CabinetType.BaseOven:
      detailType = CABINET_DETAIL_TYPE_MAPPING[0][8][1];
      break;
    case CabinetType.HighCabinetNormal:
      detailType = CABINET_DETAIL_TYPE_MAPPING[0][9][1];
      break;
    case CabinetType.HighCabinetFull:
      detailType = CABINET_DETAIL_TYPE_MAPPING[0][9][2];
      break;
    case CabinetType.HighCabinetHalf:
      detailType = CABINET_DETAIL_TYPE_MAPPING[0][9][0];
      break;
    case CabinetType.HighCabinetFullTwo:
      detailType = CABINET_DETAIL_TYPE_MAPPING[0][9][3];
      break;
    case CabinetType.HighCabinetFullNone:
      detailType = CABINET_DETAIL_TYPE_MAPPING[0][9][4];
      break;
    case CabinetType.FridgeSingleDoor:
      detailType = CABINET_DETAIL_TYPE_MAPPING[0][10][0];
      break;
    case CabinetType.FridgeDoubleDoor:
      detailType = CABINET_DETAIL_TYPE_MAPPING[0][10][1];
      break;
    default:
      detailType = CABINET_DETAIL_TYPE_MAPPING[0][0][sizeIndex];
  }

  return detailType;
}

function createCabinetInternal(
  seekId: string,
  position: Partial<Position>,
  dimensions?: Dimensions,
  rotation?: number,
  styles?: unknown,
  stateValues?: StateValues,
  parentId?: unknown
): Promise<unknown> {
  const finalPosition: Position = {
    x: 0,
    y: 0,
    z: 0,
    ...position
  };

  const finalRotation = rotation ?? 0;
  const app = HSApp.App.getApp();
  const catalogManager = app.catalogManager;

  const createProduct = (product: any, metaById?: any): unknown => {
    const transManager = app.transManager;
    const request = transManager.createRequest(
      HSFPConstants.RequestType.AddProduct,
      [
        product,
        finalPosition,
        finalRotation,
        null,
        parentId,
        undefined,
        metaById ? { metaById } : undefined
      ]
    );

    transManager.commit(request);

    const result = request.result;
    const finalDimensions: Dimensions = {
      XLength: result.__XLength.__value,
      YLength: result.__YLength.__value,
      ZLength: result.__ZLength.__value,
      ...dimensions
    };

    result.resize(
      finalDimensions.XLength,
      finalDimensions.YLength,
      finalDimensions.ZLength
    );

    if (stateValues) {
      Object.keys(stateValues).forEach((stateId: string) => {
        let state = result.getStateById(stateId);

        if (state) {
          state.value = stateValues[stateId];
        } else {
          const doorAssembly = result.getChild("doorAssembly");

          if (doorAssembly) {
            const content = doorAssembly._content;
            state = content.getStateById(stateId);

            if (state) {
              state.value = stateValues[stateId];
              content.compute();
            } else {
              console.error(
                `state ${stateId} was not found on passembly ${result.ID}`
              );
            }
          }
        }
      });

      if (typeof result.compute === "function") {
        result.compute();
      }
    }

    return result;
  };

  return catalogManager
    .getProductBySeekId(seekId)
    .then((product: any) => {
      if (styles) {
        product.styles = styles;
      }

      if (
        (product.productType === HSCatalog.ProductTypeEnum.PAssembly ||
          product.productType === HSCatalog.ProductTypeEnum.PAssemblyPackage) &&
        product.userFreeData?.assemblies?.[0]?.peerSnappingObjects
      ) {
        const peerSeekIds = product.userFreeData.assemblies[0].peerSnappingObjects.map(
          (obj: any) => obj.seekId ?? obj
        );

        HSApp.App.getApp()
          .catalogManager.getProductsBySeekIds(peerSeekIds)
          .then((metaProducts: any) => {
            createProduct(product, metaProducts);
          });
      } else {
        createProduct(product);
      }
    })
    .catch((error: unknown) => {
      // Error handling can be implemented here if needed
    });
}

export function createCabinetByDetailType(
  detailType: string,
  position: Partial<Position>,
  dimensions?: Dimensions,
  rotation?: number,
  styles?: unknown,
  stateValues?: StateValues
): Promise<unknown> {
  const seekId = (CabinetDetailType as CabinetDetailTypeMap)[detailType as keyof CabinetDetailTypeMap] ?? DEFAULT_CABINET_DETAIL_TYPE;
  return createCabinetInternal(
    seekId,
    position,
    dimensions,
    rotation,
    styles,
    stateValues
  );
}

export function createCabinetByTypeAndSize(
  cabinetType: CabinetType,
  position: Partial<Position>,
  dimensions?: Dimensions,
  rotation?: number,
  styles?: unknown,
  stateValues?: StateValues,
  parentId?: unknown
): Promise<unknown> {
  const detailType = getDetailTypeByTypeAndSize(cabinetType, dimensions);
  return createCabinetInternal(
    detailType,
    position,
    dimensions,
    rotation,
    styles,
    stateValues,
    parentId
  );
}