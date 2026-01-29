import { default as baseGet } from './baseGet';

const nativeCreate = baseGet(Object, "create");

export default nativeCreate;