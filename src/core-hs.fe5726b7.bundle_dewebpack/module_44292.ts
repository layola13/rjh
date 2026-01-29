import * as RegisterManagerModule from './RegisterManager';

export * from './RegisterManager';

export function initMetaManager(): void {
  RegisterManagerModule.RegisterManager.registerHSConstants(HSConstants);
  RegisterManagerModule.RegisterManager.registerLog(log);
  RegisterManagerModule.RegisterManager.registerNWTK(NWTK);
}