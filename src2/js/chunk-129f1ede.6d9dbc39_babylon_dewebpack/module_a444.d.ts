/**
 * Canvas event bus subscription and file upload utilities
 * @module EventBusHandlers
 */

import { EventType } from './event-types';

/**
 * Event payload structure for canvas events
 */
interface EventPayload<T = unknown> {
  payload: T;
  event?: MouseEvent | TouchEvent;
  initValue?: number | string;
}

/**
 * Canvas instance with event bus
 */
interface Canvas {
  eventBus: {
    select: <T = unknown>(eventType: EventType) => {
      subscribe: (handler: (event: EventPayload<T>) => void) => void;
    };
  };
  shapeManager: {
    brickColor: string;
  };
}

/**
 * Right card component reference structure
 */
interface RightCardRef {
  changeTab: (tabName: string) => void;
  $refs: {
    outer_frame?: OuterFrameRef;
    mullion?: MullionRef;
    window?: WindowRef;
    other?: OtherRef;
    glass?: GlassRef;
    text?: TextRef;
  };
}

/**
 * Outer frame component reference
 */
interface OuterFrameRef {
  action: string;
  payload: unknown;
}

/**
 * Mullion component reference
 */
interface MullionRef {
  action: string;
  payload: unknown;
}

/**
 * Window component reference
 */
interface WindowRef {
  action: string;
  payload: unknown;
  payload_origin: unknown;
  is_single: boolean;
}

/**
 * Other component reference
 */
interface OtherRef {
  action: string;
  payload: unknown;
  brickColor?: string;
}

/**
 * Glass component reference
 */
interface GlassRef {
  action: string;
  payload: unknown;
  resetDecorationBarCount: () => void;
}

/**
 * Text component reference
 */
interface TextRef {
  payload: unknown;
}

/**
 * Vue component context with refs
 */
interface ComponentContext {
  canvas: Canvas;
  $refs: {
    right_card: RightCardRef;
  };
  copy_event?: unknown;
  bus: {
    $emit: (eventName: string, payload: unknown) => void;
  };
  eventPayload?: EventPayload;
  initValue?: number | string;
  overlay?: boolean;
  calcPosition?: MouseEvent | Touch;
  editType?: string;
}

/**
 * Axios response structure
 */
interface AxiosResponse<T = unknown> {
  data: T;
}

/**
 * Upload response structure
 */
interface UploadResponse {
  code: number;
  [key: string]: unknown;
}

/**
 * Component instance with axios
 */
interface ComponentWithAxios {
  $axios: {
    post: <T = unknown>(url: string, data: FormData) => Promise<AxiosResponse<T>>;
  };
}

/**
 * Initializes all event bus subscriptions for canvas interactions.
 * Handles frame settings, sash settings, decoration bars, and dimension editing.
 * 
 * @this {ComponentContext} Vue component instance with canvas and refs
 */
export function initializeEventBusSubscriptions(this: ComponentContext): void;

/**
 * Uploads a file to the server.
 * 
 * @this {ComponentWithAxios} Component instance with axios
 * @param {File} file - The file to upload
 * @returns {Promise<UploadResponse>} Upload response with code and data
 */
export function uploadFile(this: ComponentWithAxios, file: File): Promise<UploadResponse>;