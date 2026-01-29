interface FmpScore {
  score: number;
  t: number;
}

interface FmpRate {
  t: number;
  rate: number;
}

interface PerformanceData {
  fmp?: number;
}

interface RetcodeConfig {
  useFmp?: boolean;
}

interface RetcodeInstance {
  _conf?: RetcodeConfig;
  _startTime: number;
  fmpTimmer: number | null;
  sendPerformance(data?: PerformanceData): void;
  onReady(callback: () => void): void;
}

const MAX_FMP_TIME = 3600000; // 36e5 = 1 hour in milliseconds
const DEBOUNCE_DELAY = 500;
const TIME_THRESHOLD = 1000;

let viewportHeight = window.innerHeight || 0;
let scoreList: FmpScore[] = [];
let mutationObserver: MutationObserver | null = null;
let observingState = 0;

function calculateElementScore(
  element: Element,
  depth: number,
  hasSibling: boolean
): number {
  let score = 0;
  const tagName = element.tagName;

  if (
    tagName !== 'SCRIPT' &&
    tagName !== 'STYLE' &&
    tagName !== 'META' &&
    tagName !== 'HEAD'
  ) {
    const childCount = element.children?.length || 0;

    if (childCount > 0) {
      const children = element.children;
      for (let i = childCount - 1; i >= 0; i--) {
        score += calculateElementScore(children[i], depth + 1, score > 0);
      }
    }

    if (
      score <= 0 &&
      !hasSibling &&
      !(
        element.getBoundingClientRect &&
        element.getBoundingClientRect().top < viewportHeight
      )
    ) {
      return 0;
    }

    score += 1 + 0.5 * depth;
  }

  return score;
}

function sortScoreList(list: FmpScore[]): FmpScore[] {
  for (let i = 1; i < list.length; i++) {
    if (list[i].score < list[i - 1].score) {
      list.splice(i, 1);
      return sortScoreList(list);
    }
  }
  return list;
}

function shouldContinueObserving(startTime: number, timeout: number): boolean {
  const elapsed = Date.now() - startTime;
  const lastScoreTime =
    scoreList?.length > 0 ? scoreList[scoreList.length - 1].t : 0;
  return elapsed <= timeout && elapsed - lastScoreTime <= TIME_THRESHOLD;
}

function recordMutation(startTime: number): void {
  const elapsed = Date.now() - startTime;
  const bodyElement = document.querySelector('body');

  if (bodyElement) {
    let score = 0;
    score += calculateElementScore(bodyElement, 1, false);
    scoreList.push({ score, t: elapsed });
  } else {
    scoreList.push({ score: 0, t: elapsed });
  }
}

export default function initFmpModule(
  prototype: RetcodeInstance,
  windowObject: Window,
  documentObject: Document
): void {
  const utils = require('./utils');

  utils.ext(prototype, {
    /**
     * Initialize First Meaningful Paint observer
     */
    initFmpObserver(timeout: number): MutationObserver | null {
      const instance = this as RetcodeInstance;

      if (!instance._conf?.useFmp) {
        return null;
      }

      if (!window.MutationObserver) {
        utils.warn('[retcode] first meaningful paint can not be retrieved');
        instance.sendPerformance();
        return null;
      }

      utils.on(window, 'beforeunload', () => {
        instance.endObserving(0, true);
      });

      mutationObserver = new MutationObserver(() => {
        recordMutation(instance._startTime);
      });

      mutationObserver.observe(document, {
        childList: true,
        subtree: true,
      });

      observingState = 1;

      instance.onReady(() => {
        instance.endObserving(timeout);
      });

      return mutationObserver;
    },

    /**
     * End FMP observation and calculate final metric
     */
    endObserving(timeout: number, isForced?: boolean): void {
      const instance = this as RetcodeInstance;

      if (!mutationObserver || !observingState) {
        return;
      }

      if (instance.fmpTimmer) {
        clearTimeout(instance.fmpTimmer);
        instance.fmpTimmer = null;
      }

      if (isForced || !shouldContinueObserving(instance._startTime, timeout)) {
        mutationObserver.disconnect();
        observingState = 0;
        scoreList = sortScoreList(scoreList);

        let maxRate: FmpRate | null = null;

        for (let i = 1; i < scoreList.length; i++) {
          if (scoreList[i].t >= scoreList[i - 1].t) {
            const rate = scoreList[i].score - scoreList[i - 1].score;

            if (!maxRate || maxRate.rate <= rate) {
              maxRate = {
                t: scoreList[i].t,
                rate,
              };
            }
          }
        }

        if (maxRate && maxRate.t > 0 && maxRate.t < MAX_FMP_TIME) {
          instance.sendPerformance({ fmp: maxRate.t });
        } else {
          instance.sendPerformance();
        }
      } else {
        instance.fmpTimmer = utils.delay(() => {
          instance.endObserving(timeout);
        }, DEBOUNCE_DELAY) as unknown as number;
      }
    },
  });
}