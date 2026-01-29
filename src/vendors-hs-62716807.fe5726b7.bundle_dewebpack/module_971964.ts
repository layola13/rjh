import promiseAll from './838317';
import fails from './898139';
import { CONSTRUCTOR } from './128205';

export default CONSTRUCTOR || !fails((e) => {
    promiseAll.all(e).then(void 0, () => {});
});