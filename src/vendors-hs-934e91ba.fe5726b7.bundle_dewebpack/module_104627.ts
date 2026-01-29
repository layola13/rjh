import getSlice from './379081';

export default function(collection: any[], count: number): any[] {
  return getSlice(collection, count, "pre");
}