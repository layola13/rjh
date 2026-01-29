import { BaseObject } from './base-object';
import { Model } from './model';

/**
 * Represents a tree structure for managing concealed work tubes and nodes in the system.
 * This class handles the initialization and management of view models for concealed work tubes
 * and nodes that contain junction boxes.
 */
export declare class ConcealedWorkTubeTree extends BaseObject {
  /**
   * Initializes the tree by iterating through all child entities.
   * Creates view models for ConcealedWorkTube entities and ConcealedWorkNode entities
   * that have a device component with junction box content.
   */
  onInit(): void;

  /**
   * Event handler called when a child entity is added to the tree.
   * Creates a view model for the added entity if it meets the criteria
   * (is a ConcealedWorkNode with a junction box that hasn't been processed yet).
   * 
   * @param event - The event object containing the added entity data
   */
  onChildAdded(event: ChildAddedEvent): void;

  /**
   * Determines if the given content represents a junction box.
   * A content is considered a junction box if it's a lighting, switch, or socket type,
   * excluding cabinet lighting, desk lamp, and floor lamp types.
   * 
   * @param content - The content object to check
   * @returns True if the content represents a junction box, false otherwise
   */
  private _hasJunctionBox(content: Content): boolean;

  /**
   * Creates a view model for the given entity.
   * 
   * @param entity - The entity for which to create a view model
   */
  protected createViewModel(entity: Model.ConcealedWorkTube | Model.ConcealedWorkNode): void;

  /**
   * Collection of child nodes in the tree.
   */
  protected childNodes?: Map<unknown, ChildNodeViewModel>;

  /**
   * The root entity of the tree.
   */
  protected entity: Entity;
}

/**
 * Represents an event triggered when a child is added.
 */
interface ChildAddedEvent {
  data: {
    entity?: Model.ConcealedWorkTube | Model.ConcealedWorkNode;
  };
}

/**
 * Represents a view model for a child node.
 */
interface ChildNodeViewModel {
  entity: Model.ConcealedWorkTube | Model.ConcealedWorkNode;
}

/**
 * Represents an entity in the system that can have child entities.
 */
interface Entity {
  /**
   * Iterates through each child entity.
   * 
   * @param callback - Function to call for each child entity
   */
  forEachChild(callback: (child: Model.ConcealedWorkTube | Model.ConcealedWorkNode) => void): void;
}

/**
 * Represents content associated with a device component.
 */
interface Content {
  /**
   * The type of the content.
   */
  contentType: ContentType;
}

/**
 * Represents a content type with type checking capabilities.
 */
interface ContentType {
  /**
   * Checks if this content type is one of the specified types.
   * 
   * @param types - Single type or array of types to check against
   * @returns True if this content type matches any of the specified types
   */
  isTypeOf(types: HSCatalog.ContentTypeEnum | HSCatalog.ContentTypeEnum[]): boolean;
}

/**
 * Catalog namespace containing content type enumerations.
 */
declare namespace HSCatalog {
  /**
   * Enumeration of content types supported by the system.
   */
  enum ContentTypeEnum {
    /** Cabinet lighting fixtures */
    CabinetLighting = 'CabinetLighting',
    /** Desk lamp fixtures */
    DeskLamp = 'DeskLamp',
    /** Floor lamp fixtures */
    FloorLamp = 'FloorLamp',
    /** General lighting fixtures */
    Lighting = 'Lighting',
    /** Electrical switches */
    Switch = 'Switch',
    /** Electrical sockets */
    Socket = 'Socket'
  }
}

declare namespace Model {
  /**
   * Represents a concealed work tube entity in the system.
   */
  export class ConcealedWorkTube {
    // Implementation details
  }

  /**
   * Represents a concealed work node entity in the system.
   */
  export class ConcealedWorkNode {
    /**
     * Retrieves a component of the specified type attached to this node.
     * 
     * @param componentType - The type of component to retrieve
     * @returns The component if found, undefined otherwise
     */
    getComponent<T>(componentType: symbol): T | undefined;
  }

  /**
   * Component that stores device-related information for concealed work nodes.
   */
  export class CWDeviceComp {
    /**
     * Symbol identifier for the component type.
     */
    static readonly Type: symbol;

    /**
     * The content associated with this device component.
     */
    content?: Content;
  }
}