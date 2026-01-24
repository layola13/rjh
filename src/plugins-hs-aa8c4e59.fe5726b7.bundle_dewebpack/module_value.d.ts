/**
 * Module: module_value
 * Original ID: value
 * 
 * Converts an entity and its children into a BOM3 data structure.
 * This function processes a parent entity and maps its children to concealed work tubes.
 */

/**
 * BOM3 data structure containing entity information and associated tubes
 */
interface BOM3Data {
  /** The converted BOM3 entity representation */
  entity: BOM3Entity;
  /** Array of concealed work tubes built from child entities */
  tubes: BOM3TubeData[];
}

/**
 * Entity type representing the input entity structure
 */
interface Entity {
  /** Retrieves child entities */
  getChildren(): Entity[];
}

/**
 * BOM3 entity representation after conversion
 */
interface BOM3Entity {
  // Define specific properties based on your domain model
  [key: string]: unknown;
}

/**
 * Data structure for a concealed work tube
 */
interface BOM3TubeData {
  // Define specific properties based on your domain model
  [key: string]: unknown;
}

/**
 * Context object required for tube construction
 */
interface Context {
  // Define specific properties based on your domain model
  [key: string]: unknown;
}

/**
 * Builds BOM3 data structure from an entity and its children.
 * 
 * @param entity - The parent entity to convert
 * @returns BOM3 data containing the converted entity and its child tubes
 */
function buildBom3Data(this: { context: Context }, entity: Entity): BOM3Data {
  const result: BOM3Data = {
    entity: turnEntityToBom3Entity(entity),
    tubes: []
  };
  
  const children = entity.getChildren();
  
  result.tubes = children.map((childEntity: Entity) => {
    const tube = new B3ConcealedWorkTube(this.context);
    return tube.buildBom3Data(childEntity);
  });
  
  return result;
}

/**
 * Converts a standard entity to BOM3 entity format
 * 
 * @param entity - The entity to convert
 * @returns The converted BOM3 entity
 */
declare function turnEntityToBom3Entity(entity: Entity): BOM3Entity;

/**
 * Class representing a concealed work tube in the BOM3 system
 */
declare class B3ConcealedWorkTube {
  /**
   * Creates a new B3ConcealedWorkTube instance
   * 
   * @param context - The context object required for tube operations
   */
  constructor(context: Context);
  
  /**
   * Builds BOM3 data from an entity
   * 
   * @param entity - The entity to process
   * @returns The processed tube data
   */
  buildBom3Data(entity: Entity): BOM3TubeData;
}