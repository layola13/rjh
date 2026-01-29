import assign from './807083';
import createWrapper from './478440';

const wrappedAssign = createWrapper((target: any, ...sources: any[]) => {
  assign(target, ...sources);
});

export default wrappedAssign;