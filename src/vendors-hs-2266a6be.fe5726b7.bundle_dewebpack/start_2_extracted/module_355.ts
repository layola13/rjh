import { performanceDateNow } from './module_428';

interface CurrentTimeData {
  currentTime: number;
  performanceCurrentTime: number;
}

interface CollectorContext {
  currentTime?: number;
  performanceCurrentTime?: number;
}

interface CurrentTimeCollector {
  (target: unknown, extraData: unknown, context: CollectorContext): CurrentTimeData;
  collecterName: string;
  dataExtend: boolean;
}

const currentTimeCollector: CurrentTimeCollector = (
  target: unknown,
  extraData: unknown,
  context: CollectorContext
): CurrentTimeData => {
  return {
    currentTime: context.currentTime ?? Date.now(),
    performanceCurrentTime: context.performanceCurrentTime ?? performanceDateNow()
  };
};

currentTimeCollector.collecterName = 'currentTime';
currentTimeCollector.dataExtend = true;

export default currentTimeCollector;