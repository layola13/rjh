import { exportToGlobal } from './polyfill-utils';
import { assign } from './object-assign-polyfill';

exportToGlobal({
  target: "Object",
  stat: true,
  arity: 2,
  forced: Object.assign !== assign
}, {
  assign: assign
});