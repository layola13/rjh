/**
 * AI Material Upload Component - Type Definitions
 * Provides room photo upload, dimension input, and AI generation capabilities
 */

/**
 * Upload result from file upload service
 */
export interface UploadResult {
  /** Upload status */
  status: 'done' | 'uploading' | 'error';
  /** Uploaded file URL */
  url?: string;
  /** Error message if upload failed */
  error?: string;
}

/**
 * Task status update response
 */
export interface TaskStatusResponse {
  data?: {
    /** Whether task completed successfully */
    result: boolean;
    /** First time flag */
    fistFlag: boolean;
    /** Completion flag */
    finishFlag: boolean;
  };
}

/**
 * AIGC identification parameters
 */
export interface AigcIdentifyParams {
  /** Room length in cm (original value / 10) */
  length: number;
  /** Room width in cm (original value / 10) */
  width: number;
  /** Source platform: 2=Web, 3=Android, 4=iOS */
  fromSource: 2 | 3 | 4;
  /** Original uploaded image URL */
  originalImageUrl: string;
}

/**
 * AIGC identification response
 */
export interface AigcIdentifyResponse {
  /** Queue ID for tracking generation task */
  queueId?: string;
  /** Error return codes */
  ret?: string[];
}

/**
 * Cropped image result
 */
export interface CropResult {
  /** Cropped image blob */
  blob: Blob;
  /** Preview URL for cropped image */
  url: string;
}

/**
 * Component props for AI Material Upload
 */
export interface AIMaterialUploadProps {
  /** Whether device is iPad */
  isIPad?: boolean;
  
  /** Language code (e.g., 'zh_CN', 'en_US') */
  lang?: string;
  
  /** Current available AIGC credits */
  aigcCount?: number;
  
  /** Credits required per generation */
  aigcCostCount?: number;
  
  /** Free trial credits remaining */
  freeCostCount?: number;
  
  /** Whether credit count has been fetched */
  hasFetchCount?: boolean;
  
  /** Whether on mobile device */
  isMobile?: boolean;
  
  /** Custom style type class name */
  styleType?: string;
  
  /** Whether user is signed in */
  hasSignin?: boolean;
  
  /** Whether running in Homestyler app */
  isHomestylerApp?: boolean;
  
  /** Whether device is Android */
  isAndroid?: boolean;
  
  /** Parent container class for cropper positioning */
  parentContainerClass?: string;
  
  /** Upload area height in pixels */
  imageUploadHeight?: number;
  
  /**
   * Callback before generate button click
   * @returns true to prevent generation, false/undefined to proceed
   */
  beforeGenerateClick?: () => boolean;
  
  /**
   * Callback when generation starts
   */
  startGenerateCallback?: () => void;
  
  /**
   * Callback when generation succeeds
   * @param queueId - Generation task queue ID
   */
  generateSuccessCallback?: (queueId: string) => void;
  
  /**
   * Callback when task status update succeeds
   */
  updateTaskStatusSuccessCallback?: () => void;
  
  /**
   * Callback for buy more credits action
   * @param source - Optional source identifier (e.g., 'eAILackOfCreditsClick')
   */
  buyMore?: (source?: string) => void;
  
  /**
   * Callback when image upload succeeds
   * @param result - Upload result with URL
   */
  onImageUploadSuccess?: (result: UploadResult) => void;
  
  /**
   * Callback when image upload fails
   * @param error - Error object or upload result
   */
  onImageUploadError?: (error: unknown) => void;
  
  /**
   * Callback when upload input changes
   * @param info - Upload change info from antd Upload component
   */
  onChange?: (info: unknown) => void;
  
  /**
   * iPad app specific image picker handler
   * @returns Selected file blob or null
   */
  handleIPadAPP?: () => Promise<Blob | null>;
}

/**
 * AI Material Upload Component
 * Handles room photo upload, dimension input, and AIGC generation
 */
declare const AIMaterialUpload: React.FC<AIMaterialUploadProps>;

export default AIMaterialUpload;