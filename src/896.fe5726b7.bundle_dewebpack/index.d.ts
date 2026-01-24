/**
 * Market type enumeration
 * Defines different types of markets available in the system
 */
export enum MarketType {
  /** Primary market */
  Primary = 'primary',
  /** Secondary market */
  Secondary = 'secondary',
  /** Spot market */
  Spot = 'spot',
  /** Futures market */
  Futures = 'futures',
}

/**
 * Expire time description interface
 * Represents expiration time information
 */
export interface ExpireTimeDesc {
  /** Expiration timestamp in milliseconds */
  timestamp: number;
  /** Human-readable expiration date string */
  dateString: string;
  /** Whether the item has expired */
  isExpired: boolean;
  /** Remaining time in seconds */
  remainingSeconds: number;
}

/**
 * Draggable component props
 */
export interface DraggableProps {
  /** Enable or disable dragging */
  enabled?: boolean;
  /** Drag handle element selector */
  handleSelector?: string;
  /** Callback when drag starts */
  onDragStart?: (event: DragEvent) => void;
  /** Callback when dragging */
  onDrag?: (event: DragEvent) => void;
  /** Callback when drag ends */
  onDragEnd?: (event: DragEvent) => void;
  /** Boundary constraints for dragging */
  bounds?: DraggableBounds;
  /** Z-index when dragging */
  dragZIndex?: number;
}

/**
 * Draggable boundary constraints
 */
export interface DraggableBounds {
  /** Minimum X position */
  left?: number;
  /** Maximum X position */
  right?: number;
  /** Minimum Y position */
  top?: number;
  /** Maximum Y position */
  bottom?: number;
}

/**
 * Draggable component
 */
export class Draggable {
  constructor(props: DraggableProps);
  
  /** Enable dragging */
  enable(): void;
  
  /** Disable dragging */
  disable(): void;
  
  /** Get current position */
  getPosition(): { x: number; y: number };
  
  /** Set position */
  setPosition(x: number, y: number): void;
  
  /** Reset to initial position */
  reset(): void;
  
  /** Destroy draggable instance */
  destroy(): void;
}

/**
 * Renewal button props
 */
export interface RenewalButtonProps {
  /** Button text */
  text?: string;
  /** Button type */
  type?: 'primary' | 'secondary' | 'default';
  /** Button size */
  size?: 'small' | 'medium' | 'large';
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Click event handler */
  onClick?: () => void | Promise<void>;
  /** Expiration date for renewal */
  expirationDate?: Date;
  /** Auto-renew enabled */
  autoRenew?: boolean;
}

/**
 * Renewal button component
 */
export class RenewalButton {
  constructor(props: RenewalButtonProps);
  
  /** Render the button */
  render(): HTMLElement;
  
  /** Update button props */
  update(props: Partial<RenewalButtonProps>): void;
  
  /** Destroy button instance */
  destroy(): void;
}

/**
 * User info item data
 */
export interface UserInfoItem {
  /** User unique identifier */
  userId: string;
  /** User display name */
  username: string;
  /** User email address */
  email: string;
  /** User avatar URL */
  avatarUrl?: string;
  /** User role */
  role: UserRole;
  /** Account creation timestamp */
  createdAt: number;
  /** Last login timestamp */
  lastLoginAt?: number;
  /** User status */
  status: UserStatus;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * User role enumeration
 */
export enum UserRole {
  /** Administrator with full permissions */
  Admin = 'admin',
  /** Regular user */
  User = 'user',
  /** Guest with limited access */
  Guest = 'guest',
  /** Moderator */
  Moderator = 'moderator',
}

/**
 * User status enumeration
 */
export enum UserStatus {
  /** Active user */
  Active = 'active',
  /** Inactive user */
  Inactive = 'inactive',
  /** Suspended user */
  Suspended = 'suspended',
  /** Pending verification */
  Pending = 'pending',
}

/**
 * Event handler function type
 */
export type EventHandler<T = unknown> = (event: T) => void | Promise<void>;

/**
 * Handler configuration
 */
export interface HandlerConfig<T = unknown> {
  /** Event name */
  eventName: string;
  /** Handler function */
  handler: EventHandler<T>;
  /** Handler priority (higher executes first) */
  priority?: number;
  /** Execute only once */
  once?: boolean;
}

/**
 * Event handler manager
 */
export class Handler {
  constructor();
  
  /**
   * Register an event handler
   * @param config - Handler configuration
   * @returns Handler ID for removal
   */
  on<T = unknown>(config: HandlerConfig<T>): string;
  
  /**
   * Register a one-time event handler
   * @param eventName - Event name
   * @param handler - Handler function
   * @returns Handler ID for removal
   */
  once<T = unknown>(eventName: string, handler: EventHandler<T>): string;
  
  /**
   * Remove an event handler
   * @param handlerId - Handler ID returned from on()
   */
  off(handlerId: string): void;
  
  /**
   * Emit an event
   * @param eventName - Event name
   * @param data - Event data
   */
  emit<T = unknown>(eventName: string, data: T): Promise<void>;
  
  /**
   * Remove all handlers for an event
   * @param eventName - Event name
   */
  removeAll(eventName: string): void;
  
  /** Clear all handlers */
  clear(): void;
}

/**
 * Float button position
 */
export interface FloatButtonPosition {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
}

/**
 * Float button props
 */
export interface FloatButtonProps {
  /** Button icon */
  icon?: string | HTMLElement;
  /** Button tooltip text */
  tooltip?: string;
  /** Initial position */
  position?: FloatButtonPosition;
  /** Button size in pixels */
  size?: number;
  /** Z-index */
  zIndex?: number;
  /** Whether button is draggable */
  draggable?: boolean;
  /** Click event handler */
  onClick?: () => void;
  /** Visible state */
  visible?: boolean;
  /** Button style variant */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

/**
 * Float button component
 * A floating action button that can be positioned anywhere on the screen
 */
export class FloatButton {
  constructor(props: FloatButtonProps);
  
  /** Show the float button */
  show(): void;
  
  /** Hide the float button */
  hide(): void;
  
  /**
   * Update button position
   * @param position - New position
   */
  setPosition(position: FloatButtonPosition): void;
  
  /** Get current position */
  getPosition(): FloatButtonPosition;
  
  /**
   * Update button props
   * @param props - Partial props to update
   */
  update(props: Partial<FloatButtonProps>): void;
  
  /** Destroy the float button */
  destroy(): void;
}

/**
 * Scaleable component props
 */
export interface ScaleableProps {
  /** Minimum scale factor */
  minScale?: number;
  /** Maximum scale factor */
  maxScale?: number;
  /** Initial scale factor */
  initialScale?: number;
  /** Scale step for each zoom action */
  scaleStep?: number;
  /** Enable smooth transitions */
  smooth?: boolean;
  /** Callback when scale changes */
  onScaleChange?: (scale: number) => void;
  /** Center point for scaling */
  centerPoint?: { x: number; y: number };
}

/**
 * Scaleable component
 * Provides zoom and scale functionality for elements
 */
export class Scaleable {
  constructor(element: HTMLElement, props?: ScaleableProps);
  
  /**
   * Set scale factor
   * @param scale - Scale factor (1.0 = 100%)
   */
  setScale(scale: number): void;
  
  /** Get current scale factor */
  getScale(): number;
  
  /**
   * Zoom in by scale step
   */
  zoomIn(): void;
  
  /**
   * Zoom out by scale step
   */
  zoomOut(): void;
  
  /** Reset to initial scale */
  reset(): void;
  
  /**
   * Update scaleable props
   * @param props - Partial props to update
   */
  update(props: Partial<ScaleableProps>): void;
  
  /** Destroy scaleable instance */
  destroy(): void;
}

/**
 * Pricing market data
 */
export interface PricingMarket {
  /** Market unique identifier */
  marketId: string;
  /** Market name */
  marketName: string;
  /** Market type */
  marketType: MarketType;
  /** Current price */
  currentPrice: number;
  /** Price currency code (e.g., 'USD', 'EUR') */
  currency: string;
  /** Price change percentage (24h) */
  priceChange24h: number;
  /** Trading volume (24h) */
  volume24h: number;
  /** Market capitalization */
  marketCap?: number;
  /** Highest price (24h) */
  high24h: number;
  /** Lowest price (24h) */
  low24h: number;
  /** Last update timestamp */
  lastUpdated: number;
  /** Whether market is active */
  isActive: boolean;
}

/**
 * Pricing market service
 * Handles market data retrieval and updates
 */
export class PricingMarketService {
  constructor();
  
  /**
   * Get market data by ID
   * @param marketId - Market identifier
   * @returns Market data or null if not found
   */
  getMarket(marketId: string): Promise<PricingMarket | null>;
  
  /**
   * Get all active markets
   * @returns Array of active markets
   */
  getAllMarkets(): Promise<PricingMarket[]>;
  
  /**
   * Subscribe to market updates
   * @param marketId - Market identifier
   * @param callback - Callback function for updates
   * @returns Unsubscribe function
   */
  subscribe(
    marketId: string,
    callback: (market: PricingMarket) => void
  ): () => void;
  
  /**
   * Update market data
   * @param marketId - Market identifier
   * @param data - Partial market data to update
   */
  updateMarket(
    marketId: string,
    data: Partial<PricingMarket>
  ): Promise<void>;
}