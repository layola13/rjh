import { $export } from './79227';
import { intersection } from './24187';
import { hasNativeMethod } from './73133';

$export({
  target: "Set",
  proto: true,
  real: true,
  forced: !hasNativeMethod("intersection")
}, {
  intersection
});