interface Entity {
  contentType?: {
    isTypeOf(type: string): boolean;
  };
  children?: Record<string, Entity>;
  forEachChild(callback: (child: Entity) => void): void;
  __YLength?: { value: number };
  compute(): void;
}

interface PAssembly extends Entity {
  getStateById(id: string): State | null;
}

interface State {
  __value: number;
}

type FilterCallback = (entity: Entity) => boolean;

export function getEntitiesByContentTypeFromEntities(
  entities: Entity[],
  contentType: string,
  results: Entity[] = [],
  filterCallback: FilterCallback | null = null
): Entity[] {
  entities.forEach((entity) => {
    getEntitiesByContentType(entity, contentType, results, filterCallback);
  });
  return results;
}

export function getEntitiesByContentType(
  entity: Entity,
  contentType: string,
  results: Entity[] = [],
  filterCallback: FilterCallback | null = null
): Entity[] {
  if (entity.contentType?.isTypeOf(contentType)) {
    if (filterCallback) {
      if (filterCallback(entity)) {
        results.push(entity);
      }
    } else {
      results.push(entity);
    }
  } else if (entity.children && Object.values(entity.children).length > 0) {
    entity.forEachChild((child) => {
      getEntitiesByContentType(child, contentType, results, filterCallback);
    });
  }
  return results;
}

export function getValueByPath(path: string[], target: Record<string, any>): any {
  return path.reduce((current, key) => {
    return current?.[key] ?? null;
  }, target as any);
}

export function isChildOf(entity: Entity, contentType: string): boolean {
  return HSCore.Util.Entity.isChildOf(entity, contentType);
}

export function setDoorBoardThickness(
  rootEntity: Entity,
  thickness: number
): void {
  HSCore.Util.Entity.traverseApplyFuncForEntities(rootEntity, (entity: any) => {
    if (entity instanceof HSCore.Model.PAssembly) {
      const state = entity.getStateById("ID_door_thickness");
      if (state) {
        state.__value = thickness;
        entity.compute();
      }
    }
  });

  const swingDoorEntities = getEntitiesByContentTypeFromEntities(
    [rootEntity],
    HSCatalog.ContentTypeEnum.ParamSwingDoor,
    [],
    (entity) => isChildOf(entity, HSCatalog.ContentTypeEnum.ParamDrawer)
  );

  swingDoorEntities.forEach((entity) => {
    if (entity.__YLength) {
      entity.__YLength.value = thickness;
      entity.compute();
    }
  });
}