import { BomDateBase, groupByStringKey } from './BomDatabase';
import { ParameterNames } from './ParameterNames';
import { HSCatalog } from './HSCatalog';
import {
  TypePredicate,
  RoomPredicate,
  LayerPredicate,
  FacePredicate,
  ContentPredicate,
  OpeningPredicate,
  ParametricWindowPredicate,
  ParametricOpeningPredicate,
  NormalMoldingPredicate,
  PavePredicate
} from './Predicates';
import { ExpressionPredicate } from './ExpressionPredicate';
import { contentTypeIsTypeOf } from './ContentTypeUtils';

interface BusinessEntity {
  instance: {
    getParameterValue(paramName: string): string;
  };
  type: {
    contentType: string;
  };
}

interface BomData {
  getBusinessEntities(options: { type: string }): BusinessEntity[];
}

type EntityMap = Map<string, BusinessEntity[]>;

function getLayerId(entity: BusinessEntity): string {
  return entity.instance.getParameterValue(ParameterNames.layerId);
}

function getRoomId(entity: BusinessEntity): string {
  return entity.instance.getParameterValue(ParameterNames.roomId);
}

export class B2Context {
  bomData: BomData;
  metaMap: unknown;
  dbApi!: BomDateBase;
  layers!: BusinessEntity[];
  paves!: BusinessEntity[];
  rooms!: BusinessEntity[];
  layerRooms!: EntityMap;
  roomFaces!: EntityMap;
  contents!: BusinessEntity[];
  openings!: BusinessEntity[];
  customizedEntities!: BusinessEntity[];
  customizationPMEntities!: BusinessEntity[];
  moldings!: BusinessEntity[];
  designEntity!: BusinessEntity | null;

  constructor(bomData: BomData, metaMap: unknown) {
    this.bomData = bomData;
    this.metaMap = metaMap;
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
    this.layers = this.dbApi.findAll(floorPlanEntities, new LayerPredicate());

    const roomEntities = this.dbApi.findAll(floorPlanEntities, new RoomPredicate());
    const faceEntities = this.dbApi.findAll(floorPlanEntities, new FacePredicate());

    this.contents = this.dbApi.findAll(
      floorPlanEntities,
      new ContentPredicate().and(
        new ExpressionPredicate((entity: BusinessEntity) =>
          contentTypeIsTypeOf(
            entity.type.contentType,
            HSCatalog.ContentTypeEnum.ext_CustomizedFurniture
          )
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

    this.layerRooms = groupByStringKey(roomEntities, getLayerId);
    this.roomFaces = groupByStringKey(faceEntities, getRoomId);

    const customizationModelEntities = this.bomData.getBusinessEntities({
      type: 'CustomizationModel'
    });
    this.customizedEntities = customizationModelEntities;

    this.customizationPMEntities = this.bomData.getBusinessEntities({
      type: 'Customization'
    });
  }

  private getPaveBusinessEntities(): void {
    const paveEntities = this.bomData.getBusinessEntities({ type: 'Pave' });
    this.paves = this.dbApi.findAll(paveEntities, new PavePredicate());
  }
}