import { RoomTypeEnum } from 'HSCore.Model';
import * as CategoryDefinitions from './CategoryDefinitions';

interface CategoryInfo {
  name: string;
  categoryId: string;
  contentType: string[];
}

interface CategoryGroup {
  categories: CategoryInfo[];
  weight: number;
  minimalCount?: number;
}

interface ContentInfo {
  categoryId: string;
  seekId: string;
  [key: string]: unknown;
}

interface MatchResult {
  contentInfo: ContentInfo;
  matchedGroupName: string;
}

interface RoomMatchResult {
  matchInfo: MatchResult[];
  roomType: string;
  score: number;
}

class RoomTypeRule {
  roomType: string;
  categories: CategoryGroup[];

  constructor(roomType: string, categories: CategoryGroup[]) {
    this.roomType = roomType;
    this.categories = categories;
  }

  matchByCategoryOrContentType(contentInfos: ContentInfo[]): RoomMatchResult {
    const matchInfo: MatchResult[] = [];

    this.categories.forEach((group) => {
      group.categories.some((category) => {
        const { categoryId, name } = category;
        contentInfos.some((contentInfo) => {
          if (categoryId === contentInfo.categoryId) {
            matchInfo.push({
              contentInfo,
              matchedGroupName: name
            });
          }
          return categoryId === contentInfo.categoryId;
        });
      });
    });

    const score = this.categories
      .filter((group) => this._matchGroupByContentInfos(group, contentInfos))
      .reduce((total, group) => total + group.weight, 0);

    return {
      matchInfo,
      roomType: this.roomType,
      score
    };
  }

  private _matchGroupByContentInfos(group: CategoryGroup, contentInfos: ContentInfo[]): boolean {
    return group.categories.some((category) => {
      const { categoryId } = category;
      const matchesCategoryId = (info: ContentInfo): boolean => categoryId === info.categoryId;

      if (group.minimalCount) {
        const countBySeekId = contentInfos
          .filter((info) => matchesCategoryId(info))
          .reduce((counts, info) => {
            const { seekId } = info;
            counts[seekId] = counts[seekId] ? counts[seekId] + 1 : 1;
            return counts;
          }, {} as Record<string, number>);

        return Object.values(countBySeekId).some((count) => count > group.minimalCount!);
      }

      return contentInfos.some((info) => matchesCategoryId(info));
    });
  }
}

export const RoomTypeRules: RoomTypeRule[] = [
  new RoomTypeRule(RoomTypeEnum.LivingDiningRoom, [
    { categories: CategoryDefinitions.MultiSeatSofa, weight: 100 },
    { categories: CategoryDefinitions.CoffeTable, weight: 10 },
    { categories: CategoryDefinitions.SideTable, weight: 1 },
    { categories: CategoryDefinitions.SingleSeatSofa, weight: 10 },
    { categories: CategoryDefinitions.Stool, weight: 1 },
    { categories: CategoryDefinitions.TVCabinet, weight: 1 },
    { categories: CategoryDefinitions.TVOrProjector, weight: 1 },
    { categories: CategoryDefinitions.SideCabinet, weight: 1 },
    { categories: CategoryDefinitions.Carpet, weight: 1 },
    { categories: CategoryDefinitions.DiningTable, weight: 10 },
    { categories: CategoryDefinitions.DiningChair, weight: 10 },
    { categories: CategoryDefinitions.Buffet, weight: 1 },
    { categories: CategoryDefinitions.Tableware, weight: 1 },
    { categories: CategoryDefinitions.Refrigerator, weight: 1 }
  ]),
  new RoomTypeRule(RoomTypeEnum.LivingRoom, [
    { categories: CategoryDefinitions.MultiSeatSofa, weight: 10 },
    { categories: CategoryDefinitions.CoffeTable, weight: 10 },
    { categories: CategoryDefinitions.SideTable, weight: 1 },
    { categories: CategoryDefinitions.SingleSeatSofa, weight: 10 },
    { categories: CategoryDefinitions.Stool, weight: 1 },
    { categories: CategoryDefinitions.TVCabinet, weight: 1 },
    { categories: CategoryDefinitions.TVOrProjector, weight: 1 },
    { categories: CategoryDefinitions.SideCabinet, weight: 1 },
    { categories: CategoryDefinitions.Carpet, weight: 1 }
  ]),
  new RoomTypeRule(RoomTypeEnum.DiningRoom, [
    { categories: CategoryDefinitions.DiningTable, weight: 10 },
    { categories: CategoryDefinitions.DiningChair, weight: 10 },
    { categories: CategoryDefinitions.Bar, weight: 10 },
    {
      categories: [
        {
          name: '吧椅',
          categoryId: '6f6caf36-5e5d-49d9-ba50-b76aaee86073',
          contentType: ['chair/bar chair']
        }
      ],
      weight: 10
    },
    { categories: CategoryDefinitions.Buffet, weight: 1 },
    { categories: CategoryDefinitions.Chandelier, weight: 1 },
    { categories: CategoryDefinitions.Tableware, weight: 1 },
    { categories: CategoryDefinitions.Refrigerator, weight: 1 },
    { categories: CategoryDefinitions.CoffeeMachine, weight: 1 },
    { categories: CategoryDefinitions.WaterDispenser, weight: 1 }
  ]),
  new RoomTypeRule(RoomTypeEnum.Kitchen, [
    { categories: CategoryDefinitions.KitchenCabinet, weight: 10 },
    { categories: CategoryDefinitions.Sink, weight: 10 },
    { categories: CategoryDefinitions.Faucet, weight: 10 },
    { categories: CategoryDefinitions.Dishwasher, weight: 1 },
    { categories: CategoryDefinitions.Refrigerator, weight: 10 },
    { categories: CategoryDefinitions.GasStove, weight: 10 },
    { categories: CategoryDefinitions.Oven, weight: 1 },
    { categories: CategoryDefinitions.SteamBox, weight: 1 },
    { categories: CategoryDefinitions.Pot, weight: 10 },
    { categories: CategoryDefinitions.KitchenAppliance, weight: 1 }
  ]),
  new RoomTypeRule(RoomTypeEnum.Bathroom, [
    { categories: CategoryDefinitions.BathroomCabinet, weight: 10 },
    { categories: CategoryDefinitions.Toilet, weight: 100 },
    { categories: CategoryDefinitions.ShowerPartition, weight: 10 },
    { categories: CategoryDefinitions.Shower, weight: 10 },
    { categories: CategoryDefinitions.Bathtub, weight: 1 },
    { categories: CategoryDefinitions.TowelRack, weight: 1 }
  ]),
  new RoomTypeRule(RoomTypeEnum.Bedroom, [
    { categories: CategoryDefinitions.Bed, weight: 100 },
    { categories: CategoryDefinitions.BedsideTable, weight: 10 },
    { categories: CategoryDefinitions.DressingTable, weight: 1 },
    { categories: CategoryDefinitions.DressingChair, weight: 1 },
    { categories: CategoryDefinitions.Wardrobe, weight: 1 },
    { categories: CategoryDefinitions.Carpet, weight: 1 },
    { categories: CategoryDefinitions.SingleSeatSofa, weight: 1 },
    { categories: CategoryDefinitions.FloorLamp, weight: 1 },
    { categories: CategoryDefinitions.TableLamp, weight: 1 },
    { categories: CategoryDefinitions.WallLamp, weight: 1 },
    { categories: CategoryDefinitions.Chandelier, weight: 1 }
  ]),
  new RoomTypeRule(RoomTypeEnum.KidsRoom, [
    { categories: CategoryDefinitions.Bed, weight: 100 },
    { categories: CategoryDefinitions.BedsideTable, weight: 10 },
    { categories: CategoryDefinitions.StudyDesk, weight: 10 },
    { categories: CategoryDefinitions.Wardrobe, weight: 1 },
    { categories: CategoryDefinitions.PlushToy, weight: 1 },
    { categories: CategoryDefinitions.SportsEquipment, weight: 1 },
    { categories: CategoryDefinitions.Chandelier, weight: 1 }
  ]),
  new RoomTypeRule(RoomTypeEnum.Library, [
    { categories: CategoryDefinitions.StudyTable, weight: 10 },
    { categories: CategoryDefinitions.Chair, weight: 10 },
    { categories: CategoryDefinitions.Bookcase, weight: 10 },
    { categories: CategoryDefinitions.Book, weight: 10 },
    { categories: CategoryDefinitions.Computer, weight: 1 },
    { categories: CategoryDefinitions.SingleSeatSofa, weight: 1 },
    { categories: CategoryDefinitions.FloorLamp, weight: 1 },
    { categories: CategoryDefinitions.Carpet, weight: 1 }
  ]),
  new RoomTypeRule(RoomTypeEnum.Aisle, [
    { categories: CategoryDefinitions.EntranceDoor, weight: 10 },
    { categories: CategoryDefinitions.ShoeCabinet, weight: 10 },
    { categories: CategoryDefinitions.DesktopOrnament, weight: 1 }
  ]),
  new RoomTypeRule(RoomTypeEnum.Balcony, [
    { categories: CategoryDefinitions.OutdoorFurniture, weight: 1 },
    { categories: CategoryDefinitions.Plant, weight: 10 },
    { categories: CategoryDefinitions.WashingMachine, weight: 10 },
    { categories: CategoryDefinitions.BalconyCabinet, weight: 10 },
    {
      categories: [
        ...CategoryDefinitions.Chair,
        {
          name: '休闲椅',
          categoryId: 'f2c08afc-68c8-42a7-b62c-1b648f87edba',
          contentType: ['chair/chair', 'chair/armchair']
        },
        {
          name: '折叠椅',
          categoryId: '60f05ae9-077f-4b52-905d-31fb5a4d5998',
          contentType: ['chair/chair']
        },
        {
          name: '躺椅',
          categoryId: '1de7612f-f4a9-4d48-9542-a3310a713433',
          contentType: ['chair/chair']
        },
        {
          name: '吊椅',
          categoryId: 'ca5d3593-70ff-4383-b98f-9230fdceae5d',
          contentType: ['chair/chair']
        }
      ],
      weight: 1
    }
  ]),
  new RoomTypeRule(RoomTypeEnum.Outdoors, [
    { categories: CategoryDefinitions.OutdoorFurniture, weight: 10 },
    { categories: CategoryDefinitions.Plant, weight: 10 },
    { categories: CategoryDefinitions.Lawn, weight: 10 },
    { categories: CategoryDefinitions.Pool, weight: 10 }
  ]),
  new RoomTypeRule(RoomTypeEnum.HomeCinema, [
    { categories: CategoryDefinitions.BigScreen, weight: 1 },
    { categories: CategoryDefinitions.Sofa, weight: 1 },
    { categories: CategoryDefinitions.CoffeTable, weight: 1 }
  ]),
  new RoomTypeRule(RoomTypeEnum.Lounge, [
    { categories: CategoryDefinitions.EDeskChair, weight: 10 },
    { categories: CategoryDefinitions.Monitor, weight: 10 },
    { categories: CategoryDefinitions.Computer, weight: 10 },
    { categories: CategoryDefinitions.TrendOrnament, weight: 1 }
  ])
];

export const IndustrialDecoRules: RoomTypeRule[] = [
  new RoomTypeRule('办公空间', [
    { categories: CategoryDefinitions.OfficeDesk, weight: 10, minimalCount: 4 }
  ]),
  new RoomTypeRule('餐饮空间', [
    { categories: CategoryDefinitions.DiningTable, weight: 10, minimalCount: 5 },
    { categories: CategoryDefinitions.DiningChair, weight: 10, minimalCount: 10 },
    { categories: CategoryDefinitions.CashierDesk, weight: 1 },
    { categories: CategoryDefinitions.Bar, weight: 1 }
  ]),
  new RoomTypeRule('体育空间', [
    { categories: CategoryDefinitions.FitnessEquipment, weight: 10, minimalCount: 6 }
  ]),
  new RoomTypeRule('会议室', [
    { categories: CategoryDefinitions.OfficeDesk, weight: 10, minimalCount: 6 }
  ]),
  new RoomTypeRule('门头', [
    { categories: CategoryDefinitions.OutdoorFurniture, weight: 1 },
    { categories: CategoryDefinitions.Plant, weight: 1 }
  ]),
  new RoomTypeRule('教育空间', [
    { categories: CategoryDefinitions.StudyTable, weight: 1 },
    { categories: CategoryDefinitions.Chair, weight: 1, minimalCount: 10 },
    { categories: CategoryDefinitions.Bookcase, weight: 1 },
    { categories: CategoryDefinitions.Book, weight: 1 }
  ])
];

export const RoomTypeRulesDict: Record<string, RoomTypeRule> = RoomTypeRules.reduce(
  (dict, rule) => {
    dict[rule.roomType] = rule;
    return dict;
  },
  {} as Record<string, RoomTypeRule>
);