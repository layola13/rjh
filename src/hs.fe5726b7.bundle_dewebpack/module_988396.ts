import ajax from './ajax';
import configure from './configure';
import { createApi } from './api';
import cdn from './cdn';
import url from './url';
import image from './image';

export { ajax, configure, cdn, url, image };

export const api = createApi(ajax);

export default {
  ajax,
  api,
  cdn,
  url,
  configure,
  image
};