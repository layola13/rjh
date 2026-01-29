interface Layer {
  contentCount: number;
}

interface Room {
  contentsInRoom?: unknown;
  estimatedRoomType?: unknown;
  [key: string]: unknown;
}

interface DesignMeta {
  area: number;
  grossFloorArea?: number;
  contentCount: number;
  layers?: Layer[];
  rooms: Room[];
  windowTypes: string[];
  doorTypes: string[];
  structureTypes: string[];
  largeContentTypes: string[];
  manualLightBasedTemplateName: string[];
  [key: string]: unknown;
}

interface ConvertedDesignMeta extends Omit<DesignMeta, 'area' | 'layers' | 'rooms'> {
  grossFloorArea: number;
  rooms: string;
  windowTypes: string;
  doorTypes: string;
  structureTypes: string;
  largeContentTypes: string;
  manualLightBasedTemplateName: string;
}

type StructureType = 'flue' | 'squareColumn' | 'circleColumn' | 'riser';

const LIGHT_TEMPLATE_NAME_MAP: Record<string, string> = {
  'intelligent-general': '通用雅致',
  'intelligent-day-realistic': '白天写实',
  'intelligent-assembly': '全屋定制',
  'intelligent-night': '夜晚',
  'intelligent-day-chilly-3': '清新',
  'intelligent-day-nature-3': '白天自然3.0',
  'normal-day-outdoor': '户外',
  'normal-empty-3': '空白模板2.0',
  'normal-empty': '空白模板',
  'general': '通用雅致',
  'day-realistic': '白天写实',
  'assembly': '全屋定制',
  'night': '夜晚',
  'day-chilly-3': '清新',
  'day-nature-3': '白天自然3.0',
  'day-outdoor': '户外'
};

function joinWithComma(items: string[]): string {
  return items.join(', ');
}

export function convertDesignMeta(designMeta: DesignMeta): ConvertedDesignMeta {
  const cloned = structuredClone(designMeta) as DesignMeta;

  cloned.grossFloorArea = cloned.area;
  
  const layerContentCount = cloned.layers?.reduce((total, layer) => {
    return total + layer.contentCount;
  }, 0);
  
  cloned.contentCount = layerContentCount ?? cloned.contentCount;

  cloned.rooms.forEach((room) => {
    delete room.contentsInRoom;
    delete room.estimatedRoomType;

    for (const key in room) {
      if (room.hasOwnProperty(key) && typeof room[key] === 'boolean') {
        room[key] = room[key] ? 1 : 0;
      }
    }
  });

  delete cloned.area;
  delete cloned.layers;

  for (const key in cloned) {
    if (cloned.hasOwnProperty(key) && typeof cloned[key] === 'boolean') {
      cloned[key] = cloned[key] ? 1 : 0;
    }
  }

  const result = cloned as unknown as ConvertedDesignMeta;
  result.rooms = JSON.stringify(cloned.rooms);

  const arrayFields: Array<keyof Pick<DesignMeta, 'windowTypes' | 'doorTypes' | 'structureTypes' | 'largeContentTypes' | 'manualLightBasedTemplateName'>> = [
    'windowTypes',
    'doorTypes',
    'structureTypes',
    'largeContentTypes',
    'manualLightBasedTemplateName'
  ];

  arrayFields.forEach((field) => {
    result[field] = joinWithComma(cloned[field] as string[]);
  });

  return result;
}

export function getStructNameOfType(type: string): string {
  switch (type as StructureType) {
    case 'flue':
      return '烟道';
    case 'squareColumn':
      return '方柱';
    case 'circleColumn':
      return '圆柱';
    case 'riser':
      return '包立管';
    default:
      return type;
  }
}

export function lightTemplateNameToChinese(templateName: string): string {
  const chineseName = LIGHT_TEMPLATE_NAME_MAP[templateName];
  return chineseName ?? templateName;
}