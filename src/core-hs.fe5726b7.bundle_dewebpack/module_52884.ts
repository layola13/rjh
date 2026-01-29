import { setMethod } from './set-polyfill-utils';
import { symmetricDifferenceImplementation } from './symmetric-difference-impl';
import { hasNativeSetMethod } from './native-set-method-check';

setMethod({
  target: "Set",
  proto: true,
  real: true,
  forced: !hasNativeSetMethod("symmetricDifference")
}, {
  symmetricDifference: symmetricDifferenceImplementation
});