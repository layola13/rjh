import { getOptions } from './getOptions';
import { Guide } from './Guide';
import { HSCore } from './HSCore';

interface GuideStepOption {
  id: string;
  tip: (() => TipContent) | TipContent;
  pre?: (handle: NewGuideHandle) => Promise<void> | void;
  next?: (handle: NewGuideHandle) => Promise<void> | void;
  skip?: () => Promise<void> | void;
}

interface TipContent {
  [key: string]: unknown;
}

interface LogEvent {
  type: 'start' | 'skip' | 'end' | 'action' | 'learnMore';
  guideType: 'tip';
  guideOption?: {
    stepAccurateNum: number;
  };
}

declare global {
  interface Window {
    HSApp: {
      Util: {
        Url: {
          replaceParamsInUrl: (params: Record<string, undefined>) => string;
          addWindowHistoryState: (state: string, title: string, url: string) => void;
        };
        EventTrack: {
          instance: () => EventTrackInstance;
        };
        EventGroupEnum: {
          NewUserGuide: string;
        };
      };
    };
    React: typeof React;
    ReactDOM: typeof ReactDOM;
  }
}

interface EventTrackInstance {
  track: (group: string, event: string, params?: Record<string, unknown>) => void;
}

export class NewGuideHandle {
  private options: GuideStepOption[] | undefined;
  private stepNumber: number;
  public signalStepChange: HSCore.Util.Signal<LogEvent>;

  constructor() {
    this.stepNumber = 0;
    this.next = this.next.bind(this);
    this.finishGuide = this.finishGuide.bind(this);
    this.SkipAll = this.SkipAll.bind(this);
    this.onLearMore = this.onLearMore.bind(this);
    this.signalStepChange = new HSCore.Util.Signal<LogEvent>();
  }

  public startGuide(): void {
    this.options = getOptions();
    this.jumpStep(0);
    this.log({
      type: 'start',
      guideType: 'tip'
    });
  }

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

  public async finishGuide(): Promise<void> {
    const currentStep = this.options?.[this.stepNumber];
    await currentStep?.next?.call(currentStep, this);
    
    this.end();
    this.log({
      type: 'end',
      guideType: 'tip'
    });
  }

  private async end(): Promise<void> {
    const newUrl = window.HSApp.Util.Url.replaceParamsInUrl({
      guide: undefined,
      guidetype: undefined,
      hasAssetId: undefined
    });
    window.HSApp.Util.Url.addWindowHistoryState('newGuide', 'newGuide', newUrl);
    this.destroyGuideWidget();
  }

  public pre(): void {
    if (this.stepNumber <= 0) {
      return;
    }
    this.jumpStep(this.stepNumber - 1);
  }

  public next(): Promise<void> | void {
    const maxStepIndex = (this.options?.length ?? 0) - 1;
    if (this.stepNumber >= maxStepIndex) {
      return this.finishGuide();
    }
    return this.jumpStep(this.stepNumber + 1);
  }

  public async jumpStepById(stepId: string): Promise<void> {
    const targetIndex = this.options?.findIndex((option) => option.id === stepId) ?? -1;
    if (targetIndex >= 0) {
      return this.jumpStep(targetIndex);
    }
  }

  public getNowStep(): GuideStepOption | undefined {
    return this.options?.[this.stepNumber];
  }

  public async jumpStep(targetStepNumber: number): Promise<void> {
    const currentStep = this.options?.[this.stepNumber];
    await currentStep?.next?.call(currentStep, this);

    const nextStep = this.options?.[targetStepNumber];
    await nextStep?.pre?.call(nextStep, this);

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

  private log(event: LogEvent): void {
    this.signalStepChange.dispatch(event);

    const eventTracker = window.HSApp.Util.EventTrack.instance();
    const eventGroup = window.HSApp.Util.EventGroupEnum.NewUserGuide;

    switch (event.type) {
      case 'end':
        eventTracker.track(eventGroup, 'finish_new_user_guide_tip_event');
        break;
      case 'skip':
        eventTracker.track(eventGroup, 'skip_all_new_user_guide_tip_event', {
          step: event.guideOption?.stepAccurateNum
        });
        break;
      case 'action':
        eventTracker.track(eventGroup, 'action_new_user_guide_tip_event', {
          step: event.guideOption?.stepAccurateNum
        });
        break;
      case 'learnMore':
        eventTracker.track(eventGroup, 'learn_more_new_user_guide_tip_event', {
          step: event.guideOption?.stepAccurateNum
        });
        break;
    }
  }

  public onLearMore(): void {
    this.log({
      type: 'learnMore',
      guideOption: {
        stepAccurateNum: this.stepNumber
      },
      guideType: 'tip'
    });
  }

  private refreshRender(): void {
    const currentStep = this.options?.[this.stepNumber];
    if (currentStep) {
      this.renderTo(currentStep);
    }
  }

  private renderTo(stepOption: GuideStepOption): void {
    const tipContent: TipContent = typeof stepOption.tip === 'function' 
      ? stepOption.tip() 
      : stepOption.tip;

    const mergedTip = { ...tipContent };

    const guideContainer = document.querySelector('.guideSystem');
    if (guideContainer) {
      window.ReactDOM.render(
        window.React.createElement(Guide, {
          tip: mergedTip,
          stepNumber: this.stepNumber,
          stepTotal: this.options?.length ?? 0,
          onSkipAll: this.SkipAll,
          onNext: this.next,
          onFinish: this.finishGuide,
          onLearnMore: this.onLearMore
        }),
        guideContainer
      );
    }
  }

  private destroyGuideWidget(): void {
    try {
      const guideContainer = document.querySelector('.guideSystem');
      if (guideContainer) {
        window.ReactDOM.unmountComponentAtNode(guideContainer);
      }
    } catch (error) {
      // Silently handle unmount errors
    }
  }
}