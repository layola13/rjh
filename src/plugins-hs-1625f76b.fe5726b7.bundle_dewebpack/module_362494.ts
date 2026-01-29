import { HSApp } from './518193';
import { EditModelHandle } from './632037';
import { ReadonlyModelHandle } from './183175';
import { ViewerModelHandle } from './384375';
import { NoPermissionModelHandle } from './93849';

type EditModelType = HSApp.EditStatus.ENUM_EDIT_MODEL;

interface ModelHandleConfig {
  [key: string]: EditModelHandle | ReadonlyModelHandle | ViewerModelHandle | NoPermissionModelHandle;
}

export const config: ModelHandleConfig = {
  [HSApp.EditStatus.ENUM_EDIT_MODEL.EDIT]: new EditModelHandle(),
  [HSApp.EditStatus.ENUM_EDIT_MODEL.READONLY]: new ReadonlyModelHandle(),
  [HSApp.EditStatus.ENUM_EDIT_MODEL.VIEWER]: new ViewerModelHandle(),
  [HSApp.EditStatus.ENUM_EDIT_MODEL.NO_PERMISSION]: new NoPermissionModelHandle()
};