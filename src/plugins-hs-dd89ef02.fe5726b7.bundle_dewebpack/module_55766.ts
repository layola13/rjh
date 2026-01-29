export function isCustomDoor(e: { customizationContentType: unknown }): boolean {
  const contentType = e.customizationContentType;
  return (
    Array.isArray(contentType) &&
    contentType.some((item: string) => {
      return ["RoomDoor", "roomWindow"].includes(item);
    })
  );
}

export function isHXRR(): boolean {
  return "true" === HSApp.Util.Url.getQueryStrings().hxrr;
}