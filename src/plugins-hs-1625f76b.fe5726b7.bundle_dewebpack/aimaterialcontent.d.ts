/**
 * AI Material Content Module
 * Provides AI-generated content management and market type definitions
 */

/**
 * Market type enumeration for AI generation services
 */
export enum MarketTypeEnum {
  /** Standard AIGC market */
  AIGC = "aigc",
  /** Render AIGC market */
  RENDERAIGC = "render-aigc",
  /** Team AIGC market */
  TEAMAIGC = "team_aigc",
  /** Master AIGC market */
  MASTERAIGC = "render-master-aigc",
}

/**
 * AIGC count data structure
 */
export interface AigcCountData {
  /** Total AIGC count available */
  aigcCount: number;
  /** AIGC cost count */
  aigcCostCount: number;
  /** Free cost count */
  freeCostCount: number;
}

/**
 * AIGC cost ratio details
 */
export interface AigcCostRatio {
  /** AI texture cost ratio */
  aitexture?: string | number;
}

/**
 * AIGC detail count information
 */
export interface AigcDetailCount {
  /** AI texture detail count */
  aitexture?: string | number;
}

/**
 * Fetch AIGC count response data
 */
export interface FetchAigcCountResponse {
  /** Response return status codes */
  ret?: string[];
  /** Response data payload */
  data?: {
    /** Total count of AIGC credits */
    totalCount: number;
    /** AIGC cost ratio breakdown */
    aigcCostRatio?: AigcCostRatio;
    /** AIGC detail count breakdown */
    aigcDetailCount?: AigcDetailCount;
  };
}

/**
 * Props for AIMaterialContent component
 */
export interface AIMaterialContentProps {
  /** Callback to open AI album */
  handleOpenAIAlbum: () => void;
  /** Callback when generation starts */
  startGenerateCallback: () => void;
}

/**
 * AI Material Content Component
 * Manages AI-generated material creation and credit tracking
 * 
 * @param props - Component properties
 * @returns React component for AI material content management
 */
export declare function AIMaterialContent(
  props: AIMaterialContentProps
): React.ReactElement;

/**
 * Event tracking types for AI material interactions
 */
export type AIMaterialEventType =
  | "ai_material_lack_of_credits_clk_event"
  | "ai_material_buy_credit_clk_event"
  | "ai_material_generate_clk_event"
  | "ai_material_upload_image_success_event"
  | "ai_material_upload_image_fail_event"
  | "ai_material_img_upload_clk_event";

/**
 * Buy more trigger event types
 */
export type BuyMoreTriggerEvent = "eAILackOfCreditsClick" | string;