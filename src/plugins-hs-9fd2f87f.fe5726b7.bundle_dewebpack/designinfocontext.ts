import { BomDateBase, groupByStringKey } from './BomDateBase';
import {
  TypePredicate,
  RoomPredicate,
  WallPredicate,
  LayerPredicate,
  FacePredicate,
  ContentPredicate,
  OpeningPredicate,
  ParametricWindowPredicate,
  ParametricOpeningPredicate,
  NormalMoldingPredicate,
  BaseboardPredicate,
  CornicePredicate,
  CustomizedBackgroundWallPredicate,
  CustomizedCeilingPredicate,
  CustomizedPlatformPredicate,
  PavePredicate
} from './Predicates';
import { ExpressionPredicate } from './ExpressionPredicate';
import { contentTypeIsTypeOf } from './ContentTypeUtils';
import { ParameterNames } from './ParameterNames';

interface BusinessEntity {
  instance: {
    getParameterValue(paramName: string): string;
  };
  type: {
    contentType: string;
  };
}

interface BomData {
  getBusinessEntities(filter: { type: string }): BusinessEntity[];
}

function getLayerId(entity: BusinessEntity): string {
  return entity.instance.getParameterValue(ParameterNames.layerId);
}

function getRoomId(entity: BusinessEntity): string {
  return entity.instance.getParameterValue(ParameterNames.roomId);
}

export class DesignInfoContext {
  private bomData: BomData;
  private dbApi: BomDateBase;
  
  public layers: BusinessEntity[] = [];
  public paves: BusinessEntity[] = [];
  public rooms: BusinessEntity[] = [];
  public walls: BusinessEntity[] = [];
  public layerRooms: Map<string, BusinessEntity[]> = new Map();
  public roomFaces: Map<string, BusinessEntity[]> = new Map();
  public contents: BusinessEntity[] = [];
  public openings: BusinessEntity[] = [];
  public customizedBackgroundWall: BusinessEntity[] = [];
  public customizedCeiling: BusinessEntity[] = [];
  public customizedPlatform: BusinessEntity[] = [];
  public customizedEntities: BusinessEntity[] = [];
  public customizedPMEntities: BusinessEntity[] = [];
  public customizationEntities: BusinessEntity[] = [];
  public moldings: BusinessEntity[] = [];
  public cornices: BusinessEntity[] = [];
  public baseboards: BusinessEntity[] = [];
  public designEntity: BusinessEntity | null = null;

  constructor(bomData: BomData) {
    this.bomData = bomData;
    this.dbApi = new BomDateBase(this.bomData);
    this.init();
  }

  private init(): void {
    this.dbApi = new BomDateBase(this.bomData);
    this.getPaveBusinessEntities();
    this.getFloorPlanBusinessEntities();
    this.getDesignInfo();
  }

  private getDesignInfo(): void {
    const designEntities = this.bomData.getBusinessEntities({ type: 'Design' });
    this.designEntity = this.dbApi.find(designEntities, new TypePredicate('Design'));
  }

  private getFloorPlanBusinessEntities(): void {
    const floorPlanEntities = this.bomData.getBusinessEntities({ type: 'FloorPlan' });
    
    this.rooms = this.dbApi.findAll(floorPlanEntities, new RoomPredicate());
    this.walls = this.dbApi.findAll(floorPlanEntities, new WallPredicate());
    this.layers = this.dbApi.findAll(floorPlanEntities, new LayerPredicate());
    
    const roomEntities = this.dbApi.findAll(floorPlanEntities, new RoomPredicate());
    const faceEntities = this.dbApi.findAll(floorPlanEntities, new FacePredicate());
    
    this.contents = this.dbApi.findAll(
      floorPlanEntities,
      new ContentPredicate().and(
        new ExpressionPredicate((entity: BusinessEntity) => 
          contentTypeIsTypeOf(entity.type.contentType, HSCatalog.ContentTypeEnum.ext_CustomizedFurniture)
        ).not()
      )
    );
    
    this.openings = this.dbApi.findAll(
      floorPlanEntities,
      new OpeningPredicate().or(
        new ParametricWindowPredicate().or(new ParametricOpeningPredicate())
      )
    );
    
    this.moldings = this.dbApi.findAll(floorPlanEntities, new NormalMoldingPredicate());
    this.baseboards = this.dbApi.findAll(floorPlanEntities, new BaseboardPredicate());
    this.cornices = this.dbApi.findAll(floorPlanEntities, new CornicePredicate());
    
    this.layerRooms = groupByStringKey(roomEntities, getLayerId);
    this.roomFaces = groupByStringKey(faceEntities, getRoomId);
    
    const customizationModelEntities = this.bomData.getBusinessEntities({ type: 'CustomizationModel' });
    this.customizedEntities = customizationModelEntities;
    this.customizedBackgroundWall = this.dbApi.findAll(customizationModelEntities, new CustomizedBackgroundWallPredicate());
    this.customizedCeiling = this.dbApi.findAll(customizationModelEntities, new CustomizedCeilingPredicate());
    this.customizedPlatform = this.dbApi.findAll(customizationModelEntities, new CustomizedPlatformPredicate());
    
    this.customizedPMEntities = this.bomData.getBusinessEntities({ type: 'CustomizedPMModel' });
    this.customizationEntities = this.bomData.getBusinessEntities({ type: 'Customization' });
  }

  private getPaveBusinessEntities(): void {
    const paveEntities = this.bomData.getBusinessEntities({ type: 'Pave' });
    this.paves = this.dbApi.findAll(paveEntities, new PavePredicate());
  }
}