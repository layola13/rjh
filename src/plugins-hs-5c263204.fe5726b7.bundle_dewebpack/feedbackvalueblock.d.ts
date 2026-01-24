import { FeedbackBlock } from './FeedbackBlock';

/**
 * Props interface for FeedbackValueBlock component
 */
export interface FeedbackValueBlockProps {
  /**
   * Data value or function that returns a value
   * Can be a static value or a function that computes the value dynamically
   */
  data: unknown | (() => unknown);
}

/**
 * FeedbackValueBlock Component
 * 
 * A specialized feedback block that handles value-based feedback.
 * Extends FeedbackBlock to provide functionality for storing and retrieving
 * feedback data that can be either a static value or computed dynamically.
 * 
 * This component:
 * - Never renders visually (returns null)
 * - Never reports as empty
 * - Stores feedback data that can be retrieved via getValue()
 * 
 * @extends FeedbackBlock
 */
export class FeedbackValueBlock extends FeedbackBlock {
  /**
   * Component props containing the feedback data
   */
  protected props: FeedbackValueBlockProps;

  /**
   * Creates an instance of FeedbackValueBlock
   * 
   * @param props - Component props containing data value or factory function
   */
  constructor(props: FeedbackValueBlockProps) {
    super(props);
  }

  /**
   * Retrieves the feedback value
   * 
   * If props.data is a function, it will be invoked and its return value returned.
   * Otherwise, the data value itself is returned directly.
   * 
   * @returns The feedback value (computed or static)
   */
  public getValue(): unknown {
    const { data } = this.props;
    return typeof data === 'function' ? data() : data;
  }

  /**
   * Checks if the block is empty
   * 
   * @returns Always returns false - this block is never considered empty
   */
  public isEmpty(): boolean {
    return false;
  }

  /**
   * Renders the component
   * 
   * @returns Always returns null - this component has no visual representation
   */
  public render(): null {
    return null;
  }
}