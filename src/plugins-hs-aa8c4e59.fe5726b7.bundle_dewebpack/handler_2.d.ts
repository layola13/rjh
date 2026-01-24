/**
 * AIDA (AI Design Assistant) Handler
 * Manages the lifecycle and interactions of the AIDA component in the UI
 */

import type React from 'react';
import type { AIDA } from './AIDA';

/**
 * Source type for tracking where AIDA was opened from
 */
type AIDAOpenSource = string;

/**
 * Reference type for AIDA component instance
 */
interface AIDAComponentRef {
  show(): void;
  hide(): void;
}

/**
 * Global HSApp utility interfaces
 */
interface HSAppConfig {
  AIDA_URL: string;
}

interface HSAppUrlUtil {
  addParam(url: string, key: string, value: string): string;
  getQueryStrings(): Record<string, string>;
}

interface HSAppEventTrack {
  instance(): HSAppEventTrack;
  track(group: unknown, eventName: string, data: Record<string, unknown>): void;
}

interface HSAppUtil {
  Url: HSAppUrlUtil;
  EventTrack: HSAppEventTrack;
  EventGroupEnum: {
    Pageheader: unknown;
  };
}

interface HSApp {
  Config: HSAppConfig;
  Util: HSAppUtil;
}

/**
 * Global user object interface
 */
interface AdskUser {
  isEnterprise: boolean;
}

declare global {
  const HSApp: HSApp;
  const adskUser: AdskUser;
}

/**
 * Handler class for managing AIDA (AI Design Assistant) component
 * Responsible for initializing, showing, hiding, and opening the AIDA interface
 */
export declare class Handler {
  /**
   * React ref to the AIDA component instance
   */
  private readonly aidaRef: React.RefObject<AIDAComponentRef>;

  /**
   * Initialize the AIDA container and render the component
   * Creates a new container div if one doesn't exist and mounts the AIDA React component
   */
  init(): void;

  /**
   * Check if AIDA can be shown based on user permissions
   * @returns true if the user is not an enterprise user, false otherwise
   */
  canShow(): boolean;

  /**
   * Show the AIDA entry point in the UI
   * Only displays if canShow() returns true
   */
  showAIDAEntry(): void;

  /**
   * Hide the AIDA entry point from the UI
   */
  hideAIDAEntry(): void;

  /**
   * Open AIDA in a new browser tab with appropriate URL parameters
   * @param source - The source identifier for tracking where AIDA was opened from
   */
  openAIDA(source: AIDAOpenSource): void;
}