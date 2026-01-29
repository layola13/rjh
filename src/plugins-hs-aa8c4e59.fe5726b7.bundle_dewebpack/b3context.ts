import { BomDateBase, groupByStringKey } from './BomDatabase';
import {
  TypePredicate,
  ConcealedWorkPredicate,
  LayerPredicate,
  RoomPredicate,
  FacePredicate,
  WallPredicate,
  SlabPredicate,
  OpeningPredicate,
  ParametricWindowPredicate,
  ParametricOpeningPredicate,
  ContentPredicate,
  NormalMoldingPredicate,
  CustomizedMoldingPredicate,
  NCustomizedMoldingPredicate,
  PavePredicate,
} from './Predicates';
import { ParameterNames } from './ParameterNames';

interface BusinessEntity {
  instance: {
    getParameterValue(paramName: string): string;
  };
}

interface BomData {
  getBusinessEntities(options: { type: string }): BusinessEntity[];
}

function getLayerId(entity: BusinessEntity): string {
  return entity.instance.getParameterValue(ParameterNames.layerId);
}

function getRoomId(entity: BusinessEntity): string {
  return entity.instance.getParameterValue(ParameterNames.roomId);
}

export class B3Context {
  bomData: BomData;
  dbApi?: BomDateBase;
  layers?: BusinessEntity[];
  walls?: BusinessEntity[];
  slabs?: BusinessEntity[];
  slabHoles?: BusinessEntity[];
  layerRooms?: Record<string, BusinessEntity[]>;
  roomFaces?: Record<string, BusinessEntity[]>;
  layerWalls?: Record<string, BusinessEntity[]>;
  layerOpenings?: Record<string, BusinessEntity[]>;
  layerContents?: Record<string, BusinessEntity[]>;
  layerCustomizedPMModels?: Record<string, BusinessEntity[]>;
  roomContents?: Record<string, BusinessEntity[]>;
  roomMoldings?: Record<string, BusinessEntity[]>;
  roomCustomizations?: Record<string, BusinessEntity[]>;
  roomCustomizedModels?: Record<string, BusinessEntity[]>;
  moldings?: BusinessEntity[];
  paves?: BusinessEntity[];
  designEntity?: BusinessEntity;
  concealWork?: Record<string, BusinessEntity[]>;

  constructor(bomData: BomData) {
    this.bomData = bomData;
    this.init();
  }

  private init(): void {
    this.dbApi = new BomDateBase(this.bomData);
    this.getFloorPlanBusinessEntities();
    this.getPaveBusinessEntities();
    this.getDesignInfo();
    this.getConcealedWork();
  }

  private getDesignInfo(): void {
    const designEntities = this.bomData.getBusinessEntities({ type: 'Design' });
    this.designEntity = this.dbApi!.find(designEntities, new TypePredicate('Design'));
  }

  private getConcealedWork(): void {
    const concealedWorkEntities = this.bomData.getBusinessEntities({
      type: 'concealedWork',
    });
    const entities = this.dbApi!.findAll(
      concealedWorkEntities,
      new ConcealedWorkPredicate()
    );
    this.concealWork = groupByStringKey(entities, getLayerId);
  }

  private getFloorPlanBusinessEntities(): void {
    const floorPlanEntities = this.bomData.getBusinessEntities({
      type: 'FloorPlan',
    });

    this.layers = this.dbApi!.findAll(floorPlanEntities, new LayerPredicate());

    const rooms = this.dbApi!.findAll(floorPlanEntities, new RoomPredicate());
    const faces = this.dbApi!.findAll(floorPlanEntities, new FacePredicate());

    this.walls = this.dbApi!.findAll(floorPlanEntities, new WallPredicate());
    this.slabs = this.dbApi!.findAll(floorPlanEntities, new SlabPredicate());

    this.layerRooms = groupByStringKey(rooms, getLayerId);
    this.roomFaces = groupByStringKey(faces, getRoomId);
    this.layerWalls = groupByStringKey(this.walls, getLayerId);

    const openings = this.dbApi!.findAll(
      floorPlanEntities,
      new OpeningPredicate()
        .or(new ParametricWindowPredicate())
        .or(new ParametricOpeningPredicate())
    );

    this.slabHoles = openings.filter(
      (entity) => entity.instance.getParameterValue('type') === 'slabHole'
    );

    const nonSlabHoleOpenings = openings.filter(
      (entity) => entity.instance.getParameterValue('type') !== 'slabHole'
    );

    this.layerOpenings = groupByStringKey(nonSlabHoleOpenings, getLayerId);

    const contents = this.dbApi!.findAll(floorPlanEntities, new ContentPredicate());
    this.layerContents = groupByStringKey(contents, getLayerId);
    this.roomContents = groupByStringKey(contents, getRoomId);

    const customizedPMModels = this.bomData.getBusinessEntities({
      type: 'CustomizedPMModel',
    });
    this.layerCustomizedPMModels = groupByStringKey(customizedPMModels, getLayerId);

    const customizationModels = this.bomData.getBusinessEntities({
      type: 'CustomizationModel',
    });
    this.roomCustomizedModels = groupByStringKey(customizationModels, getRoomId);

    const normalMoldings = this.dbApi!.findAll(
      floorPlanEntities,
      new NormalMoldingPredicate()
    );

    const customizedMoldings = this.dbApi!.findAll(
      customizationModels,
      new CustomizedMoldingPredicate()
        .or(new NormalMoldingPredicate())
        .or(new NCustomizedMoldingPredicate()),
      {
        recursion: true,
        hitStopRecursion: true,
      }
    );

    normalMoldings.push(...customizedMoldings);
    this.moldings = normalMoldings;
    this.roomMoldings = groupByStringKey(normalMoldings, getRoomId);

    const customizations = this.bomData.getBusinessEntities({
      type: 'Customization',
    });
    this.roomCustomizations = groupByStringKey(customizations, getRoomId);
  }

  private getPaveBusinessEntities(): void {
    const paveEntities = this.bomData.getBusinessEntities({ type: 'Pave' });
    this.paves = this.dbApi!.findAll(paveEntities, new PavePredicate());
  }
}