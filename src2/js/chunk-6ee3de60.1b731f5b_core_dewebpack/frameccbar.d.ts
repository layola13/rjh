/**
 * Represents a frame with serial information
 */
interface Frame {
  /** Unique identifier of the frame */
  id: string;
  /** Serial information for the frame */
  serial: {
    /** Serial text/number */
    text: string;
  };
  /** Manager for sashes associated with this frame */
  sashManager: SashManager;
}

/**
 * Represents a sash or theft item with frame reference
 */
interface SashItem {
  /** Unique identifier of the sash/theft */
  id: string;
  /** Reference to the top frame containing this item */
  topFrame: {
    /** Serial information of the top frame */
    serial: {
      /** Serial text/number */
      text: string;
    };
  };
}

/**
 * Manages sashes and thefts for a frame
 */
interface SashManager {
  /** All sashes associated with the frame */
  allSashes: SashItem[];
  /** Theft records associated with the frame */
  thefts: SashItem[];
}

/**
 * Represents an entry with frame association
 */
interface FrameEntry {
  /** Optional frame identifier */
  frameId?: string;
  /** Serial number of the associated frame (populated by addFrameSerial) */
  frameSerial?: string;
}

/**
 * Manages frame CC bar operations and serial number associations
 */
export declare class FrameCCBar {
  /** Collection of frames managed by this instance */
  private readonly frames: Frame[];

  /**
   * Creates a new FrameCCBar instance
   * @param frames - Array of frames to manage
   */
  constructor(frames: Frame[]);

  /**
   * Adds frame serial numbers to entries based on their frameId references.
   * Searches through frames and their sashes to find matching IDs and populates
   * the frameSerial property. Uses memoization to avoid redundant lookups.
   * 
   * @param entries - Array of entries to populate with frame serial numbers
   */
  addFrameSerial(entries: FrameEntry[]): void;
}