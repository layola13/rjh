export async function executeSaveOriginExtend(data: unknown): Promise<unknown> {
  return HSApp.Interface.ServiceExtend.executeService("save-design-extend", data);
}

export function registerOnSaveOriginExtend(handler: unknown): void {
  HSApp.Interface.ServiceExtend.registerService("save-design-extend", handler);
}