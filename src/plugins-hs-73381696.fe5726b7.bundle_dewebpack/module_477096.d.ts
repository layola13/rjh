/**
 * Door and assembly utility functions for HSCore entities
 */

/**
 * Checks if an entity is a fake door based on opening equation
 * @param entityName - The name of the entity to check
 * @param equationList - List of equations to search through
 * @returns True if the entity is a fake door (opening = 61)
 */
export function isFakeDoor(entityName: string, equationList?: Array<{ equation: string }>): boolean;

/**
 * Finds a door by its opening value
 * @param entityName - The name of the entity
 * @param equationList - List of equations containing opening information
 * @param openingValues - Single opening value or array of opening values to match
 * @returns True if a matching door is found
 */
export function findDoorByOpening(
  entityName: string,
  equationList?: Array<{ equation: string }>,
  openingValues?: string | string[]
): boolean;

/**
 * Gets the parent PAssembly of an entity
 * @param entity - The entity to get the parent from
 * @returns The parent PAssembly or undefined if not found
 */
export function getParentPAssembly(
  entity: HSCore.Model.Entity & {
    parents?: Record<string, HSCore.Model.Entity>;
    _host?: HSCore.Model.PAssembly;
    metadata?: { contentType?: HSCatalog.ContentType };
  }
): HSCore.Model.PAssembly | undefined;

/**
 * Gets the top-level PAssembly in the hierarchy
 * @param entity - The entity to traverse from
 * @returns The top-most PAssembly in the parent chain, or the entity itself if parent is Floorplan
 */
export function getTopPAssembly(
  entity: HSCore.Model.Entity & {
    parents?: Record<string, HSCore.Model.Entity>;
  }
): HSCore.Model.PAssembly | null;

/**
 * Determines if an entity can be "sucked" (selected/snapped) based on its type and properties
 * @param context - Context object containing the entity to check
 * @returns True if the entity is suckable (not a door/drawer component, deco panel, or specific geometry types, and passes block check)
 */
export function isSuckableEntity(context: {
  entity?: HSCore.Model.Entity & {
    metadata?: {
      contentType?: HSCatalog.ContentType;
    };
    contentType?: HSCatalog.ContentType;
  };
}): boolean;