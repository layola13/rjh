/**
 * Checks if an entity matches the specified opening value(s)
 */
function findDoorByOpening(
  entityName: string,
  equations: Array<{ equation: string }> | undefined,
  openingValues: string | string[]
): boolean {
  if (!equations) return false;

  const openingValuesArray = Array.isArray(openingValues) ? openingValues : [openingValues];
  
  const matchingEquation = equations.find((equationItem) => {
    const normalizedEquation = equationItem.equation.split(" ").join("").toLowerCase();
    const openingPrefix = `${entityName}_opening`.toLowerCase();
    
    return openingValuesArray
      .map((value) => `${openingPrefix}=${value}`)
      .includes(normalizedEquation);
  });

  return !!matchingEquation;
}

/**
 * Gets the parent PAssembly of an entity
 */
function getParentPAssembly(entity: any): HSCore.Model.PAssembly | undefined {
  if (!entity?.parents) return undefined;

  const firstParent = Object.values(entity.parents)[0];
  
  if (firstParent instanceof HSCore.Model.PAssembly) {
    return firstParent;
  }

  if (
    entity._host instanceof HSCore.Model.PAssembly &&
    entity.metadata?.contentType?.isTypeOf(HSCatalog.ContentTypeEnum.ext_CabinetAppliance)
  ) {
    return entity._host;
  }

  if (
    firstParent instanceof HSCore.Model.PContent &&
    Object.values(firstParent.parents)[0] instanceof HSCore.Model.PAssembly
  ) {
    return Object.values(firstParent.parents)[0] as HSCore.Model.PAssembly;
  }

  return undefined;
}

/**
 * Gets the top-level PAssembly in the hierarchy
 */
function getTopPAssembly(entity: any): any | null {
  let topAssembly: any = null;

  if (entity.parents && Object.values(entity.parents)[0] instanceof HSCore.Model.Floorplan) {
    return entity;
  }

  let currentEntity = entity;
  while ((currentEntity = getParentPAssembly(currentEntity))) {
    topAssembly = currentEntity;
  }

  return topAssembly;
}

/**
 * Checks if an entity is a fake door (opening value = 61)
 */
function isFakeDoor(entityName: string, equations: Array<{ equation: string }> | undefined): boolean {
  return findDoorByOpening(entityName, equations, ["61"]);
}

/**
 * Checks if an entity is a door/drawer component
 */
function isDoorOrDrawerComponent(entity: any): boolean {
  return (
    entity?.metadata?.contentType?.isTypeOf([
      HSCatalog.ContentTypeEnum.CabinetDrawer,
      HSCatalog.ContentTypeEnum.CabinetFlipDoor,
      HSCatalog.ContentTypeEnum.CabinetDoor,
      HSCatalog.ContentTypeEnum.DrawerDoor,
      HSCatalog.ContentTypeEnum.DoorCore,
      HSCatalog.ContentTypeEnum.CabinetComponent,
    ]) ?? false
  );
}

/**
 * Checks if an entity is a cabinet decoration panel
 */
function isCabinetDecoPanel(entity: any): boolean {
  return (
    entity instanceof HSCore.Model.Content &&
    entity.contentType?.isTypeOf(HSCatalog.ContentTypeEnum.CabinetDecoPanel)
  );
}

/**
 * Checks if an entity can be "sucked" (selected/snapped)
 */
function isSuckableEntity(wrapper: { entity: any }): boolean {
  const entity = wrapper.entity;
  
  if (!entity) return false;

  const isExcludedType =
    isDoorOrDrawerComponent(entity) ||
    isCabinetDecoPanel(entity) ||
    entity instanceof HSCore.Model.PExtruding ||
    entity instanceof HSCore.Model.PBox ||
    entity instanceof HSCore.Model.PMolding;

  if (isExcludedType) return false;

  return HSApp.PaintPluginHelper.Util.BlockUtil.isSuckableBlock(wrapper);
}

export { findDoorByOpening, getParentPAssembly, getTopPAssembly, isFakeDoor, isSuckableEntity };