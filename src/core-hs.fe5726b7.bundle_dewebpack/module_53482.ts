import all from './29391';
import testFunction from './9169';
import { CONSTRUCTOR } from './53735';

export default CONSTRUCTOR || !testFunction((promiseValue) => {
  all(promiseValue).then(void 0, () => {});
});