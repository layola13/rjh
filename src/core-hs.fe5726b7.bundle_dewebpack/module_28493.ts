import classof from './classof';

const isProcess: boolean = typeof process !== 'undefined' && classof(process) === 'process';

export default isProcess;