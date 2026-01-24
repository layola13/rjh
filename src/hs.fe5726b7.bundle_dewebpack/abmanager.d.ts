/**
 * ABManager - A/B Testing Manager
 * Manages A/B test scenarios, bucket assignments, and experiment tracking
 */

/**
 * Scene configuration for A/B testing
 */
export interface ABSceneConfig {
  /** Unique identifier for the A/B test scene */
  scene: string;
  /** Default bucket value if remote fetch fails */
  default: string;
  /** Skip remote fetch and use default value only */
  notFetch?: boolean;
  /** Callback invoked when scene data is loaded */
  onLoad?: (result: ABSceneResult) => void;
}

/**
 * Result of an A/B test scene load
 */
export interface ABSceneResult {
  /** Scene identifier */
  scene: string;
  /** Assigned bucket value */
  bucket: string;
}

/**
 * Manager status during lifecycle
 */
export type ABManagerStatus = 'unload' | 'loading' | 'loaded';

/**
 * Callback function invoked when a scene is loaded
 */
export type SceneLoadCallback = (result: ABSceneResult) => void;

/**
 * ABManager - Singleton manager for A/B testing experiments
 * 
 * Handles registration, loading, and tracking of A/B test scenarios.
 * Manages bucket assignments and provides callbacks for scene load events.
 * 
 * @example
 *