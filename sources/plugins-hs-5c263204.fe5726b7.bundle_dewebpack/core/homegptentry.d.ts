/**
 * HomeGPT Entry Component Type Definitions
 * Provides AI-powered design copilot functionality for home design applications
 */

import type { ReactNode, RefObject } from 'react';

/**
 * Dialogue message structure
 */
export interface DialogueMessage {
  /** Avatar URL for the message sender */
  avatar: string;
  /** Message content text */
  content: string;
  /** Whether this message is from the host/AI */
  isHost: boolean;
  /** Interaction configuration for the message */
  interaction: MessageInteraction;
  /** Message timestamp in milliseconds */
  timestamp: number;
  /** Whether this is a user request */
  isUserReq?: boolean;
  /** Whether to show timestamp */
  isShowtime?: boolean;
  /** Whether this is a temporary message */
  isTemporary?: boolean;
  /** Whether this message is in process */
  isProcess?: boolean;
  /** Whether this message is blocked */
  isBlocked?: boolean;
  /** Whether this message is loading */
  isLoading?: boolean;
  /** Custom component data */
  customedCompData?: CustomComponentData;
}

/**
 * Message interaction configuration
 */
export interface MessageInteraction {
  /** Selection items for user interaction */
  selectionItem?: string[];
  /** Custom component data */
  customComponentData?: CustomComponentData;
  /** Callback when selection is made */
  selectionCallback?: (selection: string) => void;
}

/**
 * Custom component data structure
 */
export interface CustomComponentData {
  /** Component type identifier */
  type: string;
  /** Display text */
  text: string;
  /** Click handler */
  onClick?: () => void;
}

/**
 * Position coordinates
 */
export interface Position {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
}

/**
 * Bounding box constraints for draggable elements
 */
export interface DragBounds {
  /** Left boundary offset */
  left: number;
  /** Top boundary offset */
  top: number;
  /** Right boundary offset */
  right: number;
  /** Bottom boundary offset */
  bottom: number;
}

/**
 * Voice recording status enum
 */
export enum VoiceStatus {
  /** Recording completed */
  Done = 'done',
  /** Currently recording */
  Recording = 'recording',
  /** Translating speech to text */
  Translate = 'translate'
}

/**
 * Arrow display direction enum
 */
export enum ArrowDirection {
  /** No arrow */
  None = 0,
  /** Both arrows */
  Both = 1,
  /** Left arrow only */
  Left = 2,
  /** Right arrow only */
  Right = 3
}

/**
 * Operation type identifiers
 */
export enum OperationId {
  /** General operations */
  Others = 'Others',
  /** Render submission */
  RenderSubmit = 'RenderSubmit',
  /** Undo operation */
  Undo = 'Undo',
  /** Redo operation */
  Redo = 'Redo',
  /** Image to 3D model conversion */
  ImageTo3DModel = 'ImageTo3DModel'
}

/**
 * Dialog dimensions configuration
 */
export interface DialogDimensions {
  /** Dialog width in pixels */
  width: number;
  /** Dialog height in pixels */
  height: number;
  /** Minimum height in pixels */
  minHeight: number;
  /** Input area height in pixels */
  inputHeight: number;
}

/**
 * Floating button configuration
 */
export interface FloatingButtonConfig {
  /** Button width in pixels */
  width: number;
  /** Expanded width in pixels */
  expandWidth: number;
  /** Upload image mode width in pixels */
  uploadImageWidth: number;
  /** Initial right offset in pixels */
  initialRight: number;
  /** Initial bottom offset in pixels */
  initialBottom: number;
}

/**
 * AI chat dialogue request parameters
 */
export interface ChatDialogueRequest {
  /** Request type */
  type: 'AIDesignCopilotMiniV2';
  /** User query text */
  query: string;
  /** Whether request is asynchronous */
  async: boolean;
  /** Input parameters */
  inputs: ChatInputs;
  /** Conversation ID for continuity */
  conversationId: string;
}

/**
 * Chat input parameters
 */
export interface ChatInputs {
  /** Floor plan information */
  floorPlanInfo: unknown;
  /** Language type */
  lang: string;
  /** Display unit system */
  unit: string;
  /** Tenant identifier */
  tenant: string;
  /** Query history */
  historyQuery: string;
  /** Query operation type history */
  historyQueryOpType: string;
}

/**
 * AI chat dialogue response
 */
export interface ChatDialogueResponse {
  /** Response return codes */
  ret: string[];
  /** Response data */
  data?: {
    /** Response message */
    message: string;
    /** Total benefit/credits remaining */
    totalBenefit?: number;
    /** AI model response */
    model?: {
      /** Model message */
      message: string;
      /** Total benefit/credits */
      totalBenefit?: number;
    };
    /** Queue ID for async operations */
    queueId?: string;
  };
  /** AI trace ID for logging */
  AITraceId?: string;
}

/**
 * AIGC benefits information
 */
export interface AIGCBenefits {
  /** Total benefit count */
  totalCount: number;
  /** AI Modeler specific count */
  aiModelerCount: number;
}

/**
 * HomeGPT Entry component props
 */
export interface HomeGPTEntryProps {
  /** Optional custom class name */
  className?: string;
  /** Optional inline styles */
  style?: React.CSSProperties;
}

/**
 * Main HomeGPT Entry component
 * Provides an AI-powered chat interface for home design assistance
 * 
 * Features:
 * - Real-time AI chat dialogue
 * - Voice input support
 * - Drag-and-drop repositioning
 * - Operation suggestions and quick actions
 * - Image to 3D model conversion
 * - Credit/benefit tracking
 * 
 * @returns React functional component
 */
export declare function HomeGPTEntry(props?: HomeGPTEntryProps): JSX.Element;

/**
 * Constants
 */

/** Local storage key for new tooltip visibility */
export declare const NEW_TOOLTIP_KEY: 'home_copilot_new_tooltip';

/** Z-index offset for layering */
export declare const Z_INDEX_OFFSET: 42;

/** Dialog dimension constants (frozen) */
export declare const DIALOG_DIMENSIONS: Readonly<DialogDimensions>;

/** Floating button configuration constants (frozen) */
export declare const FLOATING_CONFIG: Readonly<FloatingButtonConfig>;

/** Default avatar URL */
export declare const DEFAULT_AVATAR_URL: string;

/** Session timeout duration in milliseconds (5 minutes) */
export declare const SESSION_TIMEOUT: 300000;

export default HomeGPTEntry;