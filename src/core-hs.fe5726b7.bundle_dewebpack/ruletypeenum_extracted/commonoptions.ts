export enum ContentTypeEnum {
  Chair = "chair",
  CoffeTable = "coffee table",
  SingleSeatSofa = "single seat sofa",
  DoubleSeatSofa = "double seat sofa",
  MultiSeatSofa = "multi seat sofa",
  Sofa = "sofa",
  LeftCornerSofa = "left corner sofa",
  RightCornerSofa = "right corner sofa",
  DiningTable = "dining table",
  DiningTableRound = "dining table round",
  DiningTableSet = "dining table set",
  DiningTableSquare = "dining table square",
  Table = "table",
  Bed = "bed",
  FloorBasedCabinet = "floor based cabinet",
  FloorBasedSingleBasinWithCabinet = "floor based single basin with cabinet",
  FloorBasedDoubleBasinWithCabinet = "floor based double basin with cabinet",
  SingleVanityWallAttached = "single vanity wall attached",
  Cabinet = "cabinet",
  StorageUnit = "storage unit",
  FloorBasedStorageUnit = "floor based storage unit",
  Armoire = "armoire",
  CorneredBath = "cornered bath",
  ArtWallAttached = "art wall attached",
  FloorBasedMediaUnit = "floor based media unit",
  WallAttachedMediaUnit = "wall attached media unit",
  FloorBasedToilet = "floor based toilet",
  Downlight = "downlight",
  CeilingLight = "ceiling light",
  PendantLight = "pendant light",
  Chandelier = "chandelier",
  BathroomHeaterWithLight = "bathroom heater with light"
}

interface RuleConfigItem {
  contentTypes: string[];
  categories: string[];
}

interface RuleConfigDefinition {
  singleSeat: RuleConfigItem;
  multipleSeat: RuleConfigItem;
  cornerSofa: RuleConfigItem;
  diningTable: RuleConfigItem;
  bed: RuleConfigItem;
  bathroomCabinet: RuleConfigItem;
  cabinet: RuleConfigItem;
  decorativePicture: RuleConfigItem;
  tvCabinet: RuleConfigItem;
  toilet: RuleConfigItem;
  downLight: RuleConfigItem;
}

interface CommonOptionsDefinition {
  defaultHeight: number;
  defaultGapToCeiling: number;
}

export const RuleConfig: RuleConfigDefinition = {
  singleSeat: {
    contentTypes: [
      ContentTypeEnum.Chair,
      ContentTypeEnum.CoffeTable,
      "console table",
      "side table",
      "freestanding bath"
    ],
    categories: []
  },
  multipleSeat: {
    contentTypes: [
      ContentTypeEnum.SingleSeatSofa,
      ContentTypeEnum.DoubleSeatSofa,
      ContentTypeEnum.MultiSeatSofa,
      ContentTypeEnum.Sofa
    ],
    categories: []
  },
  cornerSofa: {
    contentTypes: [
      ContentTypeEnum.LeftCornerSofa,
      ContentTypeEnum.RightCornerSofa,
      ContentTypeEnum.Sofa
    ],
    categories: ["58b818d4-2750-4ed9-bcde-59fb7c351769"]
  },
  diningTable: {
    contentTypes: [
      ContentTypeEnum.DiningTable,
      ContentTypeEnum.DiningTableRound,
      ContentTypeEnum.DiningTableSet,
      ContentTypeEnum.DiningTableSquare,
      ContentTypeEnum.Table,
      ContentTypeEnum.DiningTableRound
    ],
    categories: []
  },
  bed: {
    contentTypes: [ContentTypeEnum.Bed],
    categories: []
  },
  bathroomCabinet: {
    contentTypes: [
      ContentTypeEnum.FloorBasedCabinet,
      ContentTypeEnum.FloorBasedSingleBasinWithCabinet,
      ContentTypeEnum.FloorBasedDoubleBasinWithCabinet,
      ContentTypeEnum.SingleVanityWallAttached
    ],
    categories: [
      "64880d8a-9a44-4d0e-b704-e29903b718da",
      "87de0e2d-8542-4f5d-bb37-5726dbee695b"
    ]
  },
  cabinet: {
    contentTypes: [
      ContentTypeEnum.Cabinet,
      ContentTypeEnum.StorageUnit,
      ContentTypeEnum.FloorBasedStorageUnit,
      ContentTypeEnum.Table,
      ContentTypeEnum.Armoire,
      ContentTypeEnum.CorneredBath,
      "armoire - L shaped"
    ],
    categories: [
      "2dd2368f-a3eb-43c2-8a6b-d585cd19d9a6",
      "0b71b677-e56e-4f5e-8e71-e675ea9a786b",
      "9e33036f-777c-4ef2-b7ea-e4189f1bf107",
      "14d0d6c8-6857-4bbf-8c4a-26bf6c25c968",
      "469c4481-d969-416f-8796-988cc28ca9c3",
      "41115241-95b4-4805-8c82-b1651990407b",
      "ca571dee-a41f-4289-a191-25007d4d5c37",
      "f82c8374-c11d-4b50-b812-f636840ae94c"
    ]
  },
  decorativePicture: {
    contentTypes: [
      ContentTypeEnum.ArtWallAttached,
      "300 - on top of others"
    ],
    categories: [
      "85278e9e-3e38-4070-a0a3-6a798ae51b7a",
      "8b070666-d82f-4aba-ac88-a4be3f28d619"
    ]
  },
  tvCabinet: {
    contentTypes: [
      ContentTypeEnum.FloorBasedMediaUnit,
      ContentTypeEnum.FloorBasedCabinet,
      ContentTypeEnum.WallAttachedMediaUnit
    ],
    categories: [
      "a1804c08-fbdc-4696-9c38-3d3b143c1b02",
      "9f0da783-f057-4d87-aba8-7b738d2dbcd0"
    ]
  },
  toilet: {
    contentTypes: [ContentTypeEnum.FloorBasedToilet],
    categories: []
  },
  downLight: {
    contentTypes: [
      ContentTypeEnum.Downlight,
      ContentTypeEnum.CeilingLight,
      ContentTypeEnum.PendantLight,
      ContentTypeEnum.Chandelier,
      ContentTypeEnum.BathroomHeaterWithLight
    ],
    categories: [
      "2374eec6-a564-4f13-ba49-df54fe5b01f5",
      "e7a0801e-7abd-4634-b3bc-8777342d124e",
      "07df1dad-f651-457d-9595-130131ac3906"
    ]
  }
};

export const CommonOptions: CommonOptionsDefinition = {
  defaultHeight: 2.5,
  defaultGapToCeiling: 0.1
};