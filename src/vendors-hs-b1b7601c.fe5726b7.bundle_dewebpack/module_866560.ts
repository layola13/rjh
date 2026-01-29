export interface PerformanceTimestampProvider {
  now(): number;
  delegate?: Performance;
}

export const performanceTimestampProvider: PerformanceTimestampProvider = {
  now(): number {
    return (performanceTimestampProvider.delegate || performance).now();
  },
  delegate: undefined
};