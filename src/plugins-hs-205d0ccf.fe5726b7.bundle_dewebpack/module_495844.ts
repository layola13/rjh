import { HSCore } from './path-to-hscore';

interface AppParams {
  env?: string;
}

interface App {
  appParams?: AppParams;
}

interface HSApp {
  App: {
    getApp(): App;
  };
}

declare global {
  interface Window {
    publishVersion: string;
    HSApp: HSApp;
  }
}

export function getDomain(): string {
  const app = window.HSApp.App.getApp();
  return app.appParams?.env ?? 'default';
}

export function getMagic(): unknown {
  return HSCore.Doc.FloorplanMeta.magic;
}

export function getVersion(): string {
  return window.publishVersion;
}