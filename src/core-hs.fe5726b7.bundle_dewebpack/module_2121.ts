import defineIteratorMethod from './module_79227';
import mapImplementation from './module_69448';

defineIteratorMethod({
  target: "Iterator",
  proto: true,
  real: true
}, {
  map: mapImplementation
});