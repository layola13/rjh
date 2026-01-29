import { performanceDateNow } from './module_428';

interface CollectorContext {
  currentTime?: number;
  performanceCurrentTime?: number;
}

interface CollectorResult {
  currentTime: number;
  performanceCurrentTime: number;
}

function currentTimeCollector(
  firstParam: unknown,
  secondParam: unknown,
  context: CollectorContext
): CollectorResult {
  return {
    currentTime: context.currentTime ?? Date.now(),
    performanceCurrentTime: context.performanceCurrentTime ?? performanceDateNow()
  };
}

currentTimeCollector.collecterName = "currentTime";
currentTimeCollector.dataExtend = true;

export default currentTimeCollector;