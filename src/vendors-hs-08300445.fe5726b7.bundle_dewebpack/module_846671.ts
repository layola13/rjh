export default function<T, R>(array: T[], reducer: (accumulator: R, current: T) => R): R {
  return array.reduce((accumulator: R, current: T): R => {
    return reducer(accumulator, current);
  }, {} as R);
}