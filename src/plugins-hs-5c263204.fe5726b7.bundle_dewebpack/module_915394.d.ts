/**
 * Mirror Modal Component Type Definitions
 * 
 * A React component that displays a confirmation modal for executing mirror/rotation requests
 * in the underlay image plugin system.
 */

import React from 'react';

/**
 * Information object containing mirror/rotation operation details
 */
export interface MirrorInfo {
  /** Operation type (mirror, rotate, etc.) */
  operationType?: string;
  /** Target room or element identifier */
  targetId?: string;
  /** Additional operation parameters */
  params?: Record<string, unknown>;
}

/**
 * Props for the MirrorPopModal component
 */
export interface MirrorPopModalProps {
  /** Mirror operation information to be executed */
  mirrorInfo: MirrorInfo;
}

/**
 * State for the MirrorPopModal component
 */
export interface MirrorPopModalState {
  /** Whether the modal is closed/hidden */
  close: boolean;
}

/**
 * Modal component for confirming mirror/rotation operations on rooms
 * 
 * Displays a confirmation dialog with title, description, and action buttons.
 * Integrates with HSApp command manager to execute or cancel requests.
 * 
 * @example
 *