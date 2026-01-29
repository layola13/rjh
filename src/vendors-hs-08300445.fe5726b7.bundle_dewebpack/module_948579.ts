import * as zustandCore from './134956';
import { unstable_batchedUpdates } from './554451';
import { setBatch } from './1349';

export const batch = unstable_batchedUpdates;

export * from './134956';

setBatch(unstable_batchedUpdates);