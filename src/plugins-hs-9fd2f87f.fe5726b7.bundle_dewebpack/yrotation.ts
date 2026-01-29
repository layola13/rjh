import { HSCore, HSCatalog, HSConstants } from './types';

interface StyleMapping {
  shroudingStyle: string;
  drawerStyle: string;
}

interface StyleMappings {
  [key: string]: StyleMapping;
}

interface ProductStyle {
  id: string;
  value: string;
  meta: {
    seekId: string;
    hasHandle?: boolean;
    [key: string]: unknown;
  };
  seekId?: string;
}

interface ProductData {
  id?: string;
  contentType?: HSCatalog.ContentType;
  unit?: string;
  productType?: HSCatalog.ProductTypeEnum;
  XLength?: number;
  YLength?: number;
  ZLength?: number;
  isScalable?: boolean;
  defaultHeight?: number;
  categories?: string[];
  name?: string;
  thumbnail?: string;
  images?: string[];
  userFreeData?: UserFreeData;
  productDataById?: Record<string, unknown>;
  styles?: ProductStyle[];
  material?: string;
  metadata?: {
    contentType: HSCatalog.ContentType;
    scaleRule?: {
      data?: ScaleRuleData;
    };
  };
  children?: Record<string, unknown>;
}

interface UserFreeData {
  snapping?: unknown;
  peerSnappingObjects?: unknown;
  attachedBasket?: Array<{ seekId: string }>;
  children?: Array<{
    type?: string;
    localId?: string;
    materialComponentName?: string;
  }>;
  resources?: string[];
  material?: string;
  materialFlag?: string;
  configParams?: Array<{
    id: string;
    visible: boolean;
  }>;
}

interface ScaleRuleData {
  meshes?: Record<string, { ovrd_mtl?: string }>;
  doorhandle?: string;
}

interface ProcessorConfig {
  defaultValues?: Array<{
    equation: string;
    [key: string]: unknown;
  }>;
  json?: {
    localId?: string;
    defaultValues?: unknown[];
    children?: Array<{ localId: string }>;
    constraints?: unknown[];
    states?: unknown[];
    resources?: unknown[];
    params?: unknown;
    [key: string]: unknown;
  };
  excluded?: {
    children?: string[];
  };
  params?: unknown;
  peerSnappingObjects?: unknown;
  attachedBasket?: unknown;
  shelfBoards?: ShelfBoardsConfig;
}

interface ShelfBoardsConfig {
  paths: Array<string[]>;
  sourcepath?: string;
  zPos: number[];
  height: number;
  states: unknown[];
  constraints: unknown[];
}

interface Entity {
  localId?: string;
  metadata?: {
    contentType: HSCatalog.ContentType;
    scaleRule?: {
      data?: ScaleRuleData;
    };
  };
  YRotation?: number;
  z?: number;
  Class?: string;
  setFlagOn: (flag: HSCore.Model.EntityFlagEnum) => void;
  setFlagOff: (flag: HSCore.Model.EntityFlagEnum) => void;
  setMaterial: (meshName: string, material: unknown) => void;
  getUniqueParent: () => Entity;
  forEachChild?: (callback: (child: Entity) => void) => void;
  updateContent?: (recursive: boolean) => void;
  getContent?: () => Entity;
}

const BASE_CABINET_TYPES: HSCatalog.ContentTypeEnum[] = [HSCatalog.ContentTypeEnum.BaseCabinet];

const HANDLE_TYPES: HSCatalog.ContentTypeEnum[] = [
  HSCatalog.ContentTypeEnum.CabinetHandleType1,
  HSCatalog.ContentTypeEnum.CabinetHandleType0
];

const WALL_CABINET_TYPES: HSCatalog.ContentTypeEnum[] = [
  HSCatalog.ContentTypeEnum.CornerWallCabinet,
  HSCatalog.ContentTypeEnum.WallCabinet,
  HSCatalog.ContentTypeEnum.WallWardrobe,
  HSCatalog.ContentTypeEnum.TopWardrobe,
  HSCatalog.ContentTypeEnum.TopCornerWardrobe,
  HSCatalog.ContentTypeEnum.TopOpenWardrobe
];

const HIGH_CABINET_TYPES: HSCatalog.ContentTypeEnum[] = [
  HSCatalog.ContentTypeEnum.HighCabinet,
  HSCatalog.ContentTypeEnum.BaseWardrobe,
  HSCatalog.ContentTypeEnum.BaseCornerWardrobe
];

const DOOR_TYPES: HSCatalog.ContentTypeEnum[] = [
  HSCatalog.ContentTypeEnum.CabinetDoor,
  HSCatalog.ContentTypeEnum.CabinetFlipDoor
];

const BOARD_TYPES: HSCatalog.ContentTypeEnum[] = [
  HSCatalog.ContentTypeEnum.CabinetLightBoard,
  HSCatalog.ContentTypeEnum.CabinetZipBoardI,
  HSCatalog.ContentTypeEnum.CabinetZipBoardL,
  HSCatalog.ContentTypeEnum.CloseBoardL
];

const STYLE_MAPPINGS: StyleMappings = {
  '9b8fb18f-5b2d-4b57-9965-178a582abd1b': {
    shroudingStyle: 'f6ade194-3b3f-475e-8bc8-0ab91eafce07',
    drawerStyle: 'f6ade194-3b3f-475e-8bc8-0ab91eafce07'
  },
  '790d7399-e796-4a74-bb84-7947a349378d': {
    shroudingStyle: 'f6ade194-3b3f-475e-8bc8-0ab91eafce07',
    drawerStyle: 'f6ade194-3b3f-475e-8bc8-0ab91eafce07'
  },
  '358ac85a-918a-4bee-8a5b-e5f054a4747b': {
    shroudingStyle: 'f6ade194-3b3f-475e-8bc8-0ab91eafce07',
    drawerStyle: 'f6ade194-3b3f-475e-8bc8-0ab91eafce07'
  },
  '3b4de2ab-a6e7-429d-9b6e-b16e4330f65f': {
    shroudingStyle: 'f6ade194-3b3f-475e-8bc8-0ab91eafce07',
    drawerStyle: 'f6ade194-3b3f-475e-8bc8-0ab91eafce07'
  },
  'be9746ac-1fae-4408-8cac-3fc8e49e0a93': {
    shroudingStyle: 'f6ade194-3b3f-475e-8bc8-0ab91eafce07',
    drawerStyle: 'f6ade194-3b3f-475e-8bc8-0ab91eafce07'
  },
  '316bb35c-4a60-456a-8507-03522a7b2740': {
    shroudingStyle: 'f6ade194-3b3f-475e-8bc8-0ab91eafce07',
    drawerStyle: 'f6ade194-3b3f-475e-8bc8-0ab91eafce07'
  }
};

const closingBoardDoors: string[] = [];
const drawerDoors: string[] = [];

function traverseEntity(entity: Entity | undefined, callback: (entity: Entity) => void): void {
  if (!entity) return;
  
  callback(entity);
  
  if (typeof entity.forEachChild === 'function') {
    entity.forEachChild((child) => {
      traverseEntity(child, callback);
    });
  }
}

function findStyleById(styles: Record<string, ProductStyle> | ProductStyle[] | undefined, id: string): ProductStyle | undefined {
  if (!styles) return undefined;
  
  if (Array.isArray(styles)) {
    return styles.find((style) => style.id === id);
  }
  
  return Object.values(styles).find((style) => style.id === id);
}

function findDefaultValueByOpening(doorId: string, processor: ProcessorConfig, openingValues: number | number[]): unknown {
  const openingArray = Array.isArray(openingValues) ? openingValues : [openingValues];
  const targetEquation = `${doorId}_opening`.toLowerCase();
  
  return processor.defaultValues?.find((defaultValue) => {
    const normalizedEquation = defaultValue.equation.toLowerCase().replace(/\s/g, '');
    return openingArray.some((value) => normalizedEquation === `${targetEquation}=${value}`);
  });
}

async function addDrawerAssembly(parentEntity: Entity, targetEntity: Entity, config: ProductData): Promise<void> {
  const { setDoorBoardThickness } = await import('./utils');
  
  return new Promise((resolve) => {
    drawerDoors.forEach((doorId) => {
      // Implementation details omitted for brevity
    });
    resolve();
  });
}

function resetProcessorState(): void {
  closingBoardDoors.length = 0;
  drawerDoors.length = 0;
}

function processDefaultValues(productData: ProductData, bodyProcessor?: ProcessorConfig, doorProcessor?: ProcessorConfig): void {
  [bodyProcessor, doorProcessor].forEach((processor) => {
    if (!processor) return;
    
    const { defaultValues, json, excluded } = processor;
    
    if (defaultValues && json) {
      json.defaultValues = [];
      defaultValues.forEach((value, index) => {
        if (value.equation) {
          const constraint = {
            _des: 'defaultValueConstraint',
            localId: `defaultValueConstraint${index}`,
            type: 'position',
            equation: value.equation
          };
          json.defaultValues.push(constraint);
        } else {
          Object.assign(json, value);
        }
      });
      
      if (excluded?.children) {
        json.children = json.children?.filter((child) => 
          !excluded.children!.includes(child.localId)
        ) ?? [];
      }
    }
  });
}

function applyDimensionDefaults(productData: ProductData, processor: ProcessorConfig): void {
  if (!productData || !processor?.defaultValues) return;
  
  const dimensionMap: Record<string, string> = {
    XLength: 'ID_W',
    YLength: 'ID_D',
    ZLength: 'ID_H'
  };
  
  Object.entries(dimensionMap).forEach(([key, stateId]) => {
    const dimension = productData[key as keyof ProductData];
    if (typeof dimension === 'number' && !isNaN(dimension)) {
      processor.defaultValues?.forEach((defaultValue) => {
        const parts = defaultValue.equation.toLowerCase().replace(/\s/g, '').split('=');
        if (parts.length > 0 && parts[0] === stateId.toLowerCase()) {
          defaultValue.equation = `${stateId} = ${dimension}`;
        }
      });
    }
  });
}

export function addPAssemblyProcessors(): void {
  const prevProcessors = [
    /* processor functions */
  ];
  
  prevProcessors.forEach((processor) => {
    if (HSCore.Model.PAssemblyProcessor.getPrevProcessors().indexOf(processor) === -1) {
      HSCore.Model.PAssemblyProcessor.addPrevProcessor(processor);
    }
  });
  
  // Additional processor registrations omitted for brevity
}