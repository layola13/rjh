/**
 * UI Module for Teaching Ability Plugin
 * Manages modal dialogs and reminder overlays with React rendering
 */

import { Signal } from './signal-types';
import React from 'react';

/**
 * Button theme options for teaching ability button
 */
export type ButtonTheme = 'teaching-light' | 'teaching-dark';

/**
 * Position and dimensions of a DOM element
 */
export interface DOMRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Button reference types for positioning modals
 */
export type ButtonReference = string | HTMLElement | DOMRect;

/**
 * Page configuration with optional zoom capability
 */
export interface PageConfig {
  name: string;
  data: unknown;
}

/**
 * Page drag configuration returned by utility
 */
export interface PageDragConfig {
  pageSize?: {
    width: number;
    height: number;
  };
  zoomable?: boolean;
}

/**
 * Options for displaying a modal
 */
export interface ShowModelOptions {
  /** Reference to button element for positioning */
  button?: ButtonReference;
  /** Theme for the modal */
  theme?: ButtonTheme;
  /** Data to display in the modal */
  data: {
    showPage?: PageConfig;
    [key: string]: unknown;
  };
}

/**
 * Options for teaching ability button component
 */
export interface TeachingAbilityButtonOptions {
  /** Visual theme of the button */
  buttonTheme?: ButtonTheme;
  /** Callback when button is clicked */
  showModel?: (params: { button: HTMLElement | null }) => void;
  /** Additional CSS class name */
  className?: string;
}

/**
 * Reminder content type configuration
 */
export interface RemindContentConfig {
  zIndex?: number;
  [key: string]: unknown;
}

/**
 * Options for displaying a reminder overlay
 */
export interface ShowRemindOptions {
  /** Unique key for the reminder */
  key: string;
  /** Type of reminder content */
  type: string;
  [key: string]: unknown;
}

/**
 * Signal payload when showing a modal
 */
export interface ShowModelSignalPayload {
  [key: string]: unknown;
}

/**
 * Global signal for showing model events
 */
export declare const signalShowModel: Signal<ShowModelSignalPayload>;

/**
 * Main UI controller class for teaching ability plugin
 * Manages modal dialogs, reminders, and React component rendering
 */
export declare class UI {
  /** Container DOM element for modal dialogs */
  private containerDom?: HTMLDivElement;
  
  /** Container DOM element for reminder overlays */
  private remindContainerDom?: HTMLDivElement;
  
  /** Current reminder key */
  private remindKey?: string;
  
  /** Signal instance for model show events */
  public signalShowModel: Signal<ShowModelSignalPayload>;

  constructor();

  /**
   * Initialize UI containers by creating DOM elements
   * Appends containers to #plugin-container element
   */
  init(): void;

  /**
   * Create a TeachingAbilityButton React component
   * @param options - Button configuration options
   * @returns React element for the button
   */
  getTeachingAbilityButton(options: TeachingAbilityButtonOptions): React.ReactElement;

  /**
   * Display a modal dialog with teaching content
   * Calculates position based on button reference and renders modal
   * @param options - Modal configuration and data
   */
  showModel(options: ShowModelOptions): void;

  /**
   * Display a reminder overlay notification
   * @param options - Reminder configuration including key and type
   */
  showRemind(options: ShowRemindOptions): void;

  /**
   * Close and unmount the current reminder overlay
   */
  closeRemind(): void;

  /**
   * Close and unmount the current modal dialog
   */
  closeModel(): void;
}