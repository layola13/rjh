import React from 'react';

/**
 * Zoomable configuration for the draggable modal
 */
export interface ZoomableConfig {
  /** Whether zoom functionality is enabled */
  used: boolean;
  /** Callback triggered when zoom starts */
  onZoomStart?: () => void;
  /** Callback triggered when zoom ends */
  onZoomEnd?: () => void;
}

/**
 * Modal context value provided to child components
 */
export interface ModalContextValue {
  /** Method to set the modal size */
  setSize: (width: number, height: number, align?: 'left' | 'right') => void;
  /** Method to update zoomable configuration */
  setZoomable: (config: Partial<ZoomableConfig>) => void;
  /** Modal data passed from parent */
  modalData?: unknown;
}

/**
 * Props for the WithModalValue HOC
 */
export interface WithModalValueProps extends ModalContextValue {
  [key: string]: unknown;
}

/**
 * Props for the DraggableModal component
 */
export interface DraggableModalProps {
  /** Initial width of the modal */
  width?: number;
  /** Initial height of the modal */
  height?: number;
  /** Default X position */
  defaultPositionX?: number;
  /** Default Y position */
  defaultPositionY?: number;
  /** Zoomable configuration */
  zoomAble?: Partial<ZoomableConfig>;
  /** Close handler */
  close: () => void;
  /** Additional data passed to modal */
  data?: unknown;
}

/**
 * State for the DraggableModal component
 */
export interface DraggableModalState {
  /** Current width of the modal */
  width: number;
  /** Current height of the modal */
  height: number;
  /** Current zoomable configuration */
  zoomable: ZoomableConfig;
}

/**
 * DOM element with pointer events tracking
 */
interface IframeCancelEvent {
  /** The DOM element */
  dom: HTMLElement;
  /** Original pointer-events CSS value */
  pointerEvents: string;
}

/**
 * Higher-order component that injects modal context values into wrapped component
 * 
 * @template P - Props type of the wrapped component
 * @param Component - React component to be wrapped
 * @returns Enhanced component with modal context injected
 * 
 * @example
 *