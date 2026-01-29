interface RestoreData {
  roomData: Map<string, RoomData>;
  customizedPMs?: CustomizedPMData;
}

interface RoomData {
  contents: {
    dumps: EntityDump[];
    openingDumps: EntityDump[];
    materialsData: unknown;
    productsMap: Map<string, unknown>;
    statesMap: Map<string, unknown>;
    constraintMap: Map<string, unknown>;
  };
  faceMap: Map<string, FaceData>;
}

interface EntityDump {
  id: string;
  host?: string;
  p?: string[];
  [key: string]: unknown;
}

interface FaceData {
  material: unknown;
  moldings?: Record<string, Molding[]>;
}

interface Molding {
  assignTo(face: HSCore.Model.Face): void;
}

interface CustomizedPMData {
  rootModel: {
    webCADDocument: unknown;
    openDiyDocument(flag: boolean): Promise<void>;
  };
  webCADDocument: unknown;
  insModels: unknown[];
}

interface LoadContext {
  data: Record<string, EntityDump>;
  materialsData: unknown;
  productsMap: Map<string, unknown>;
  entities: Record<string, HSCore.Model.Entity>;
  materials: Map<string, unknown>;
  states: Map<string, unknown>;
  constraints: Map<string, unknown>;
}

export default class RestoreTemplateCommand extends HSApp.Cmd.Command {
  private app: unknown;
  private restoreData: RestoreData;
  private room: HSCore.Model.Room | null;
  private proxyObjectsMap: Map<string, ProxyObjectData>;

  constructor(
    app: unknown,
    restoreData: RestoreData,
    room: HSCore.Model.Room | null,
    proxyObjectsMap: Map<string, ProxyObjectData>
  ) {
    super();
    this.app = app;
    this.restoreData = restoreData;
    this.room = room;
    this.proxyObjectsMap = proxyObjectsMap;
  }

  onExecute(): void {
    if (!this.restoreData || !this.app) {
      return;
    }

    let restoredEntities: HSCore.Model.Entity[] = [];

    if (this.room) {
      this.clearRoom(this.room);
      restoredEntities = restoredEntities.concat(this.restoreRoom(this.room));
    } else {
      this.app.floorplan.forEachRoom((room: HSCore.Model.Room) => {
        this.clearRoom(room);
      });
      this.app.floorplan.forEachRoom((room: HSCore.Model.Room) => {
        restoredEntities = restoredEntities.concat(this.restoreRoom(room));
      });
    }

    const layerEntityMap = new Map<HSCore.Model.Layer, HSCore.Model.Entity[]>();
    restoredEntities.forEach((entity: HSCore.Model.Entity) => {
      const layer = HSCore.Util.Layer.getEntityLayer(entity);
      if (layer) {
        const entities = layerEntityMap.get(layer);
        if (entities) {
          entities.push(entity);
        } else {
          layerEntityMap.set(layer, [entity]);
        }
      }
    });

    for (const [layer, entities] of layerEntityMap) {
      layer.holeBuilder.buildHole(entities.map((entity: HSCore.Model.Entity) => entity.id));
    }

    restoredEntities.forEach((entity: HSCore.Model.Entity) => {
      if (entity instanceof HSCore.Model.Opening && entity.isDoorStoneMaterialEnabled()) {
        const doorStoneFace = entity.getDoorStoneFace();
        if (!doorStoneFace?.material?.mixpaint) {
          return;
        }
        doorStoneFace.material.mixpaint.polygons.forEach((polygon: unknown) => {
          if (polygon.grid instanceof HSCore.Model.PatternGrid) {
            polygon.grid.recomputeTemplate(polygon);
          }
        });
        doorStoneFace.dirtyGeometry();
      }
    });

    this.restoreCustomizedPMModles();
  }

  private clearRoom(room: HSCore.Model.Room): void {
    const session = this.context.transManager.startSession();
    let contents = HSApp.Util.ImportUtil.getContentsInRoom(room);
    const openings = HSApp.Util.ImportUtil.getOpeningsInRoom(room);
    contents = contents.concat(openings);

    const entitiesToDelete: HSCore.Model.Entity[] = [];

    const processEntity = (entity: HSCore.Model.Entity): void => {
      if (entity instanceof HSCore.Model.Group) {
        entity.members.forEach((member: HSCore.Model.Entity) => {
          processEntity(member);
        });
      }

      const proxyObject = entity.getProxyObject();
      if (proxyObject) {
        const undoData = proxyObject.prepareUndoData(entity);
        if (undoData) {
          this.proxyObjectsMap.set(entity.id, undoData);
          proxyObject.removeFromFloorplan(entity);
          undoData.prepareRedo();
          return;
        }
      }
      entitiesToDelete.push(entity);
    };

    contents.forEach((entity: HSCore.Model.Entity) => {
      processEntity(entity);
    });

    HSApp.Util.ImportUtil.deleteProducts(entitiesToDelete);
    session.end();
  }

  private restoreRoom(room: HSCore.Model.Room): HSCore.Model.Entity[] {
    const floorplan = this.app.floorplan;
    const roomData = this.restoreData.roomData.get(room.id);
    const layer = HSCore.Util.Layer.getEntityLayer(room);

    if (!roomData || !layer) {
      return [];
    }

    const dumpMap: Record<string, EntityDump> = {};
    roomData.contents.dumps.forEach((dump: EntityDump) => {
      dumpMap[dump.id] = dump;
    });
    roomData.contents.openingDumps.forEach((dump: EntityDump) => {
      dumpMap[dump.id] = dump;
    });

    const loadContext: LoadContext = {
      data: dumpMap,
      materialsData: roomData.contents.materialsData,
      productsMap: roomData.contents.productsMap,
      entities: {},
      materials: new Map(),
      states: roomData.contents.statesMap,
      constraints: roomData.contents.constraintMap,
    };

    Object.keys(floorplan.entityList).forEach((entityId: string) => {
      const entity = floorplan.entityList[entityId];
      if (
        entity instanceof HSCore.Model.Layer ||
        entity.instanceOf(HSConstants.ModelClass.NgWall) ||
        (entity instanceof HSCore.Model.Face &&
          Object.values(entity.parents).length === 1 &&
          Object.values(entity.parents)[0].instanceOf(HSConstants.ModelClass.NgWall)) ||
        entity instanceof HSCore.Model.Slab
      ) {
        loadContext.entities[entityId] = entity;
        if (!loadContext.data[entityId]) {
          loadContext.data[entityId] = { id: entityId };
        }
      }
    });

    const loadedEntities: Record<string, HSCore.Model.Entity> = {};
    roomData.contents.dumps.forEach((dump: EntityDump) => {
      const entity = HSCore.Model.Entity.loadFromDump(dump, loadContext);
      if (entity) {
        loadedEntities[entity.id] = entity;
      }
    });

    roomData.contents.dumps.forEach((dump: EntityDump) => {
      const entity = loadedEntities[dump.id];
      if (entity instanceof HSCore.Model.Content) {
        let host: HSCore.Model.Entity | undefined;
        if (dump.host) {
          host = floorplan.getEntityById(dump.host) || loadedEntities[dump.host];
        }

        const parents: HSCore.Model.Entity[] = [];
        dump.p?.forEach((parentId: string) => {
          const parent = floorplan.getEntityById(parentId) || loadedEntities[parentId];
          if (parent) {
            parents.push(parent);
          }
        });

        this.addContent(entity, parents, host);

        const proxyData = this.proxyObjectsMap?.get(entity.id);
        if (proxyData) {
          proxyData.undo();
        }
      }
    });

    const faces = HSApp.Util.ImportUtil.getFaces(room);
    if (!faces) {
      return [];
    }

    faces.faces.forEach((face: HSCore.Model.Face) => {
      const faceData = roomData.faceMap.get(face.id);
      if (faceData) {
        this.setFaceMaterialAndMoldings(face, faceData);
      }
    });

    let ceilingData = roomData.faceMap.get(faces.ceiling.id);
    if (ceilingData) {
      this.setFaceMaterialAndMoldings(faces.ceiling, ceilingData);
    }

    const floorData = roomData.faceMap.get(faces.floor.id);
    if (!floorData) {
      return [];
    }

    this.setFaceMaterialAndMoldings(faces.floor, floorData);

    const restoredOpenings: HSCore.Model.Opening[] = [];
    roomData.contents.openingDumps.forEach((dump: EntityDump) => {
      const entity = HSCore.Model.Entity.loadFromDump(dump, loadContext);
      if (entity && entity instanceof HSCore.Model.Opening) {
        let host: HSCore.Model.Entity | undefined;
        const parents: HSCore.Model.Entity[] = [];

        dump.p?.forEach((parentId: string) => {
          const parent = floorplan.getEntityById(parentId);
          if (parent) {
            parents.push(parent);
          }
        });

        if (dump.host) {
          host = floorplan.getEntityById(dump.host);
        }

        layer.addChild(entity);
        this.addContent(entity, parents, host);
        restoredOpenings.push(entity);
      }
    });

    return restoredOpenings;
  }

  private async restoreCustomizedPMModles(): Promise<void> {
    const customizedPMs = this.restoreData.customizedPMs;
    if (!customizedPMs) {
      return;
    }

    customizedPMs.rootModel.webCADDocument = customizedPMs.webCADDocument;
    await customizedPMs.rootModel.openDiyDocument(false);

    customizedPMs.insModels.forEach((insModel: unknown) => {
      HSApp.Util.CustomizedPMModel.addCustomizedPMInstance({
        insModel,
        rootModel: customizedPMs.rootModel,
      });
    });
  }

  private setFaceMaterialAndMoldings(face: HSCore.Model.Face, faceData: FaceData): void {
    face.material = faceData.material;
    face.removeAllMoldings();

    if (faceData.moldings) {
      for (const key in faceData.moldings) {
        faceData.moldings[key].forEach((molding: Molding) => {
          molding.assignTo(face);
          face.addMolding(molding);
        });
      }
    }

    face.dirtyGeometry();
  }

  private addContent(
    content: HSCore.Model.Content,
    parents: HSCore.Model.Entity[],
    host?: HSCore.Model.Entity
  ): void {
    if (host) {
      content.assignTo(host);
    }
    parents.forEach((parent: HSCore.Model.Entity) => {
      parent.addChild(content);
      parent.onEntityDirty();
    });
  }

  getDescription(): string {
    return "一键还原-还原样板间";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.TemplateDesign;
  }
}

interface ProxyObjectData {
  undo(): void;
  prepareRedo(): void;
}