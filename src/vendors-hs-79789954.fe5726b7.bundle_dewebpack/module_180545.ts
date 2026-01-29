import { ConstraintType, RegionType } from './module_288839';
import { HSCatalog } from './module_635589';

interface ContentToContentConstraintRule {
  contentType: string[];
  refContentType: string;
  constraintType: ConstraintType;
}

interface ContentToRegionConstraintRule {
  contentType: string[];
  refRegionType: RegionType;
  constraintType: ConstraintType;
  refContentType?: RegionType;
}

interface RegionToRegionConstraintRule {
  regionType: RegionType;
  refRegionType: RegionType;
  constraintType: ConstraintType;
}

export const contentToContentConstraintRules: ContentToContentConstraintRule[] = [
  {
    contentType: ["night table"],
    refContentType: "bed",
    constraintType: ConstraintType.distanceAsIs
  },
  {
    contentType: ["desk"],
    refContentType: "bed",
    constraintType: ConstraintType.distanceAsIs
  },
  {
    contentType: ["desk lamp"],
    refContentType: "desk",
    constraintType: ConstraintType.distanceAsIs
  },
  {
    contentType: ["desk lamp"],
    refContentType: "night table",
    constraintType: ConstraintType.distanceAsIs
  },
  {
    contentType: ["300 - on top of others"],
    refContentType: "HOST",
    constraintType: ConstraintType.distanceAsIs
  },
  {
    contentType: ["accessory/accessory - on top of others"],
    refContentType: "HOST",
    constraintType: ConstraintType.distanceAsIs
  },
  {
    contentType: ["rug"],
    refContentType: "bed",
    constraintType: ConstraintType.distanceAsIs
  }
];

export const contentToRegionConstraintRules: ContentToRegionConstraintRule[] = [
  {
    contentType: ["bed", "single bed", "king-size bed"],
    refRegionType: RegionType.Bed,
    constraintType: ConstraintType.distanceAsIs
  },
  {
    contentType: ["storage unit"],
    refRegionType: RegionType.Bed,
    constraintType: ConstraintType.distanceAsIs
  },
  {
    contentType: [
      HSCatalog.ContentTypeEnum.TelevisionWallAttached,
      HSCatalog.ContentTypeEnum.TelevisionOnTopOfOthers
    ],
    refRegionType: RegionType.Bed,
    constraintType: ConstraintType.distanceAsIs
  },
  {
    contentType: [HSCatalog.ContentTypeEnum.SingleSeatSofa],
    refContentType: RegionType.Bed,
    constraintType: ConstraintType.distanceAsIs
  },
  {
    contentType: ["desk"],
    refContentType: RegionType.Bed,
    constraintType: ConstraintType.distanceAsIs
  },
  {
    contentType: [HSCatalog.ContentTypeEnum.Dresser],
    refContentType: RegionType.Bed,
    constraintType: ConstraintType.distanceAsIs
  },
  {
    contentType: ["coffee table - round", "coffee table - irregular shape"],
    refContentType: RegionType.Bed,
    constraintType: ConstraintType.distanceAsIs
  },
  {
    contentType: [HSCatalog.ContentTypeEnum.CoffeTable],
    refContentType: RegionType.Bed,
    constraintType: ConstraintType.distanceAsIs
  },
  {
    contentType: [HSCatalog.ContentTypeEnum.Chair, "armchair"],
    refContentType: RegionType.Bed,
    constraintType: ConstraintType.distanceAsIs
  },
  {
    contentType: [
      HSCatalog.ContentTypeEnum.StorageUnit,
      HSCatalog.ContentTypeEnum.Armoire,
      HSCatalog.ContentTypeEnum.FloorBasedKitchenCabinet
    ],
    refContentType: RegionType.Bed,
    constraintType: ConstraintType.distanceAsIs
  },
  {
    contentType: [
      HSCatalog.ContentTypeEnum.MediaUnit,
      HSCatalog.ContentTypeEnum.FloorBasedMediaUnit
    ],
    refContentType: RegionType.Bed,
    constraintType: ConstraintType.distanceAsIs
  },
  {
    contentType: [HSCatalog.ContentTypeEnum.HutchBuffet],
    refContentType: RegionType.Bed,
    constraintType: ConstraintType.distanceAsIs
  },
  {
    contentType: ["side table"],
    refContentType: RegionType.Bed,
    constraintType: ConstraintType.distanceAsIs
  }
];

export const regionToRegionConstraintRules: RegionToRegionConstraintRule[] = [
  {
    regionType: RegionType.Bed,
    refRegionType: RegionType.Bed,
    constraintType: ConstraintType.alignAsIs
  },
  {
    regionType: RegionType.Bed,
    refRegionType: RegionType.Bed,
    constraintType: ConstraintType.alignAsIs
  }
];

export const completionCategoryIdSteps: string[][] = [
  [
    "3fdc70e6-c2b2-41db-bfe9-b43eb3ccdc4a",
    "24670bf9-9c9f-41ae-b190-f5f65eab4ddb",
    "41ac92b5-5f88-46d0-a59a-e1ed31739154",
    "bb8b2c7e-cc9e-4e4e-a208-d76cb1dd6e11",
    "8f58f84c-1424-4aaf-aef5-62ae1da722ab",
    "e5118969-c2ae-494a-b63c-a80b0a6c163d",
    "4909c460-b0f0-4cd1-af59-4898c310f3f5",
    "cc650fc9-02f3-47b0-b86e-1a2430c07059"
  ],
  ["89404b8a-5bb6-42cf-95fa-73c9bfba4c97"],
  ["a4ab1670-3e6f-4585-9f0b-c82554c40b55", "cabb5091-b54f-4fe9-b990-a7ac1b1b2803"],
  ["2dd2368f-a3eb-43c2-8a6b-d585cd19d9a6", "1d3ef10c-d00b-43bb-9925-d2af69d43bb1"],
  [
    "a1804c08-fbdc-4696-9c38-3d3b143c1b02",
    "77dcb397-256e-4d0f-95d1-e1f4b2bf1317",
    "d0c56b1f-c3ff-4ea9-9d66-6091d23a99cc"
  ],
  [
    "dfc5d08b-cd8d-41e0-8f74-13dbb125e321",
    "469c4481-d969-416f-8796-988cc28ca9c3",
    "522df3bb-dbb7-4194-9c32-e2ec1671ce8c"
  ],
  ["0b71b677-e56e-4f5e-8e71-e675ea9a786b", "9e33036f-777c-4ef2-b7ea-e4189f1bf107"],
  ["5c76d84c-aa8c-4bb8-88fc-cbf8da81be71"],
  ["5ad47fd2-b143-4af2-9961-e88a57b4a337"],
  ["9eaee326-16c4-4244-87d5-38e7b57a4e38"],
  [
    "c2dcb449-4729-4cfe-9e38-1fc1453211a5",
    "6b1f9a31-9363-4e63-ae8d-28b5277aebf0",
    "150d721b-609a-436c-be47-bb2cf2bfb30c",
    "5f38bce6-8bd2-4d41-bdbc-e76cbc87d309",
    "30c7fefc-a32e-48e1-9458-dfab61595dc7"
  ]
];