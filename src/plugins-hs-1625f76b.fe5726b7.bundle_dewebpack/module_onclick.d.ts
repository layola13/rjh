/**
 * Module: module_onClick
 * Original ID: onClick
 * 
 * Factory function that creates an onClick event handler for model/channel items.
 * Handles event tracking and navigation based on tenant configuration.
 */

/**
 * Tenant configuration type
 */
type TenantConfig = 'fp' | string;

/**
 * Event tracking group enumeration
 */
enum EventGroupEnum {
  ModelChannel = 'ModelChannel',
  Catalog = 'Catalog'
}

/**
 * Base event data structure
 */
interface BaseEventData {
  /** Item identifier */
  id: string;
  /** Item name or column number */
  name: string;
  [key: string]: unknown;
}

/**
 * Extended event data with topic type
 */
interface EventDataWithTopic extends BaseEventData {
  /** Type of topic */
  topicType: string;
}

/**
 * Extended event data with pool ID (for 'fp' tenant)
 */
interface EventDataWithPool extends EventDataWithTopic {
  /** Pool identifier */
  poolId: string;
}

/**
 * Event tracking parameters for pool click
 */
interface PoolClickTrackParams {
  pool_id: string;
}

/**
 * Event tracking parameters for catalog open
 */
interface CatalogOpenTrackParams {
  sColumnNo: string;
}

/**
 * Event tracker instance interface
 */
interface EventTracker {
  /**
   * Track an event with specified group, name and parameters
   * @param group - Event group classification
   * @param eventName - Specific event name
   * @param params - Event parameters
   */
  track(
    group: EventGroupEnum,
    eventName: string,
    params: PoolClickTrackParams | CatalogOpenTrackParams
  ): void;
}

/**
 * Navigation/action handler type
 */
type ActionHandler = (data: EventDataWithTopic | EventDataWithPool) => void;

/**
 * Application configuration interface
 */
interface AppConfig {
  /** Current tenant identifier */
  TENANT: TenantConfig;
}

/**
 * Utility interface for event tracking
 */
interface EventTrackUtil {
  /**
   * Get singleton instance of event tracker
   */
  instance(): EventTracker;
}

/**
 * Global HSApp namespace
 */
declare const HSApp: {
  Config: AppConfig;
  Util: {
    EventTrack: EventTrackUtil;
    EventGroupEnum: typeof EventGroupEnum;
  };
};

/**
 * Creates an onClick handler that processes click events with tracking
 * 
 * @param topicType - The type of topic for categorization
 * @param actionHandler - Callback function to handle the processed event data
 * @returns Event handler function
 */
export default function createOnClickHandler(
  topicType: string,
  actionHandler: ActionHandler
): (eventData: BaseEventData) => void {
  return function handleClick(eventData: BaseEventData): void {
    const columnName = eventData.name;
    
    // Add topic type to event data
    let processedData: EventDataWithTopic | EventDataWithPool = {
      ...eventData,
      topicType
    };

    // For 'fp' tenant, add pool ID
    if (HSApp.Config.TENANT === 'fp') {
      processedData = {
        ...processedData,
        poolId: eventData.id
      };
    }

    // Track the event
    const tracker = HSApp.Util.EventTrack.instance();
    
    if (HSApp.Config.TENANT === 'fp') {
      // Track pool click event for 'fp' tenant
      tracker.track(
        HSApp.Util.EventGroupEnum.ModelChannel,
        'list_click_event',
        { pool_id: eventData.id }
      );
    } else {
      // Track catalog open event for other tenants
      tracker.track(
        HSApp.Util.EventGroupEnum.Catalog,
        'open_model_column_event',
        { sColumnNo: columnName }
      );
    }

    // Execute the action handler
    actionHandler(processedData);
  };
}