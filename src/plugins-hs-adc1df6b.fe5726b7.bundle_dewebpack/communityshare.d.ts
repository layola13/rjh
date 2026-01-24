import React, { useRef, useState, useEffect, RefObject } from 'react';
import { Icons } from './Icons';

/**
 * Props for the CommunityShare component
 */
export interface CommunityShareProps {
  /** Callback function invoked when sharing is completed or dialog is closed */
  onShareFinished: () => void;
  /** The unique identifier of the design to be shared */
  designId: string | number;
}

/**
 * Message event data structure received from the iframe
 */
interface MessageEventData {
  eType: 'publish_join_contest' | 'publish_close' | string;
  eData?: {
    isSuccess?: boolean;
    disableClose?: boolean;
  };
}

/**
 * Custom message event interface
 */
interface CommunityShareMessageEvent extends MessageEvent {
  data: MessageEventData;
}

/**
 * Panel loading utility class for displaying loading indicators
 */
declare class PanelLoading {
  constructor(element: Element | null, options: { ispanelcenter: boolean });
  show(): void;
  hide(): void;
}

/**
 * Global HSApp application interface
 */
declare global {
  const HSApp: {
    App: {
      getApp(): {
        appParams: {
          locale?: string;
        };
      };
    };
    PartnerConfig: {
      USERCENTER_URL: string;
    };
  };
}

/**
 * CommunityShare Component
 * 
 * A React component that displays an iframe for sharing designs to the Homestyler community.
 * Handles communication with the embedded iframe through postMessage API and manages
 * loading states and close interactions.
 * 
 * @param props - Component properties
 * @returns React component rendering a community share dialog
 */
export declare function CommunityShare(props: CommunityShareProps): React.ReactElement;