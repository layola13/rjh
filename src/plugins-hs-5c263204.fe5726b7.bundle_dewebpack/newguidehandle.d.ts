/**
 * New user guide system handler
 * Manages step-by-step guide flow with navigation, logging, and rendering
 */

import { Signal } from './signal';
import { getOptions } from './guide-options';
import { Guide } from './guide-component';

/**
 * Guide step configuration
 */
export interface GuideStepOption {
  /** Unique identifier for the step */
  id: string;
  
  /** Tip content to display (static or dynamic) */
  tip: string | (() => GuideStepTip);
  
  /** Called before entering this step */
  pre?: (handle: NewGuideHandle) => Promise<void> | void;
  
  /** Called when leaving this step */
  next?: (handle: NewGuideHandle) => Promise<void> | void;
  
  /** Called when skipping all steps */
  skip?: () => Promise<void> | void;
}

/**
 * Tip content structure
 */
export interface GuideStepTip {
  title?: string;
  content?: string;
  imageUrl?: string;
  learnMoreUrl?: string;
  [key: string]: unknown;
}

/**
 * Guide event log data
 */
export interface GuideLogEvent {
  /** Event type */
  type: 'start' | 'end' | 'skip' | 'action' | 'learnMore';
  
  /** Guide type identifier */
  guideType: 'tip';
  
  /** Additional step information */
  guideOption?: {
    /** Accurate step number (0-indexed) */
    stepAccurateNum: number;
  };
}

/**
 * New user guide handler
 * Orchestrates multi-step onboarding experience with navigation and tracking
 */
export class NewGuideHandle {
  /** Array of guide step configurations */
  private options?: GuideStepOption[];
  
  /** Current step index (0-indexed) */
  private stepNumber: number;
  
  /** Signal emitted on step changes and events */
  public signalStepChange: Signal<GuideLogEvent>;

  constructor() {
    this.stepNumber = 0;
    this.signalStepChange = new HSCore.Util.Signal<GuideLogEvent>();
    
    // Bind methods to preserve context
    this.next = this.next.bind(this);
    this.finishGuide = this.finishGuide.bind(this);
    this.SkipAll = this.SkipAll.bind(this);
    this.onLearMore = this.onLearMore.bind(this);
  }

  /**
   * Initialize and start the guide from step 0
   */
  public startGuide(): void {
    this.options = getOptions();
    this.jumpStep(0);
    this.log({
      type: 'start',
      guideType: 'tip'
    });
  }

  /**
   * Skip all remaining steps and end the guide
   */
  public async SkipAll(): Promise<void> {
    const currentStep = this.options?.[this.stepNumber];
    await currentStep?.skip?.call(currentStep);
    
    this.end();
    this.log({
      type: 'skip',
      guideType: 'tip',
      guideOption: {
        stepAccurateNum: this.stepNumber
      }
    });
  }

  /**
   * Complete the guide normally
   */
  public async finishGuide(): Promise<void> {
    const currentStep = this.options?.[this.stepNumber];
    await currentStep?.next?.call(currentStep, this);
    
    this.end();
    this.log({
      type: 'end',
      guideType: 'tip'
    });
  }

  /**
   * End the guide and clean up
   * Removes guide-related URL parameters and destroys UI
   */
  private async end(): Promise<void> {
    const cleanUrl = HSApp.Util.Url.replaceParamsInUrl({
      guide: undefined,
      guidetype: undefined,
      hasAssetId: undefined
    });
    HSApp.Util.Url.addWindowHistoryState('newGuide', 'newGuide', cleanUrl);
    this.destroyGuideWidget();
  }

  /**
   * Navigate to previous step
   */
  public pre(): void {
    if (this.stepNumber > 0) {
      this.jumpStep(this.stepNumber - 1);
    }
  }

  /**
   * Navigate to next step or finish if on last step
   */
  public next(): Promise<void> | void {
    const totalSteps = this.options?.length ?? 0;
    
    if (this.stepNumber >= totalSteps - 1) {
      return this.finishGuide();
    }
    
    return this.jumpStep(this.stepNumber + 1);
  }

  /**
   * Jump to a specific step by ID
   * @param stepId - Unique step identifier
   */
  public async jumpStepById(stepId: string): Promise<void> {
    const targetIndex = this.options?.findIndex((step) => step.id === stepId) ?? -1;
    
    if (targetIndex >= 0) {
      return this.jumpStep(targetIndex);
    }
  }

  /**
   * Get current step configuration
   */
  public getNowStep(): GuideStepOption | undefined {
    return this.options?.[this.stepNumber];
  }

  /**
   * Jump to specific step by index
   * @param targetStepNumber - Target step index (0-indexed)
   */
  public async jumpStep(targetStepNumber: number): Promise<void> {
    // Call current step's next hook
    const currentStep = this.options?.[this.stepNumber];
    await currentStep?.next?.call(currentStep, this);
    
    // Call target step's pre hook
    const targetStep = this.options?.[targetStepNumber];
    await targetStep?.pre?.call(targetStep, this);
    
    this.stepNumber = targetStepNumber;
    this.refreshRender();
    
    this.log({
      type: 'action',
      guideOption: {
        stepAccurateNum: targetStepNumber
      },
      guideType: 'tip'
    });
  }

  /**
   * Log guide event and track analytics
   * @param event - Guide event data
   */
  private log(event: GuideLogEvent): void {
    this.signalStepChange.dispatch(event);
    
    const tracker = HSApp.Util.EventTrack.instance();
    const eventGroup = HSApp.Util.EventGroupEnum.NewUserGuide;
    
    switch (event.type) {
      case 'end':
        tracker.track(eventGroup, 'finish_new_user_guide_tip_event');
        break;
        
      case 'skip':
        tracker.track(eventGroup, 'skip_all_new_user_guide_tip_event', {
          step: event.guideOption?.stepAccurateNum
        });
        break;
        
      case 'action':
        tracker.track(eventGroup, 'action_new_user_guide_tip_event', {
          step: event.guideOption?.stepAccurateNum
        });
        break;
        
      case 'learnMore':
        tracker.track(eventGroup, 'learn_more_new_user_guide_tip_event', {
          step: event.guideOption?.stepAccurateNum
        });
        break;
    }
  }

  /**
   * Handle "Learn More" action
   */
  public onLearMore(): void {
    this.log({
      type: 'learnMore',
      guideOption: {
        stepAccurateNum: this.stepNumber
      },
      guideType: 'tip'
    });
  }

  /**
   * Re-render current step
   */
  private refreshRender(): void {
    const currentStep = this.options?.[this.stepNumber];
    if (currentStep) {
      this.renderTo(currentStep);
    }
  }

  /**
   * Render guide UI for specific step
   * @param stepOption - Step configuration to render
   */
  private renderTo(stepOption: GuideStepOption): void {
    const tipContent = typeof stepOption.tip === 'function' 
      ? stepOption.tip() 
      : stepOption.tip;
    
    const mergedTip: GuideStepTip = { ...tipContent };
    
    const containerElement = document.querySelector('.guideSystem');
    
    if (containerElement) {
      ReactDOM.render(
        React.createElement(Guide, {
          tip: mergedTip,
          stepNumber: this.stepNumber,
          stepTotal: this.options?.length ?? 0,
          onSkipAll: this.SkipAll,
          onNext: this.next,
          onFinish: this.finishGuide,
          onLearnMore: this.onLearMore
        }),
        containerElement
      );
    }
  }

  /**
   * Unmount and destroy guide widget
   */
  private destroyGuideWidget(): void {
    try {
      const containerElement = document.querySelector('.guideSystem');
      if (containerElement) {
        ReactDOM.unmountComponentAtNode(containerElement);
      }
    } catch (error) {
      // Silently handle unmount errors
    }
  }
}