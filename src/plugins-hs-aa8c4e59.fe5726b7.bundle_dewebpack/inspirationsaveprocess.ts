import { HSApp } from './518193';

export class InspirationSaveProcess extends HSApp.Interface.Save.ISaveProcess {
  dumpSync(): unknown {
    return HSApp.App.getApp().floorplan.ext?.inspiration;
  }

  async postDumpAsync(data: unknown): Promise<{ code: string; value: unknown }> {
    return {
      code: 'Success',
      value: data
    };
  }
}