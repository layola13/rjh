import { asyncScheduler } from 'rxjs';
import { sample } from 'rxjs/operators';
import { interval } from 'rxjs';

export function sampleTime<T>(period: number, scheduler = asyncScheduler) {
  return sample<T>(interval(period, scheduler));
}