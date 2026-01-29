export function dataURItoBlob(dataURI: string): Blob {
  const base64Data = window.atob(dataURI.split(", ")[1]);
  const mimeType = dataURI.split(", ")[0].split(":")[1].split(";")[0];
  const buffer = new ArrayBuffer(base64Data.length);
  const uint8Array = new Uint8Array(buffer);
  
  for (let i = 0; i < base64Data.length; i += 1) {
    uint8Array[i] = base64Data.charCodeAt(i);
  }
  
  try {
    return new Blob([buffer], { type: mimeType });
  } catch (error) {
    const blobBuilder = new (
      (window as any).WebKitBlobBuilder || 
      (window as any).MozBlobBuilder
    )();
    blobBuilder.append(buffer);
    return blobBuilder.getBlob(mimeType);
  }
}

export class Util {
  /**
   * Converts a floor number to a localized floor name
   * @param floorNumber - The floor number (negative for basement levels)
   * @returns Formatted floor name string
   */
  static floorNumberToName(floorNumber: number): string {
    const prefix = floorNumber < 0 
      ? ResourceManager.getString("active_layer_basement_prefix") 
      : ResourceManager.getString("active_layer_floor_prefix");
    
    const suffix = floorNumber < 0 
      ? ResourceManager.getString("active_layer_basement_suffix") 
      : ResourceManager.getString("active_layer_floor_suffix");
    
    return `${prefix}${Math.abs(floorNumber)}${suffix}`;
  }

  /**
   * Converts a floor name string to a floor number
   * @param floorName - The floor name string (e.g., "F3" or "B2")
   * @returns The floor number (negative for basement levels)
   */
  static floorNameToNumber(floorName: string): number {
    const numberMatch = floorName.match(/\d+/) ?? [];
    const numberPart = numberMatch[0];
    
    const typeMatch = floorName.match(/[BF]/) ?? [];
    const floorType = typeMatch[0];
    
    switch (floorType) {
      case "F":
        return parseInt(numberPart);
      case "B":
        return -Math.abs(parseInt(numberPart));
      default:
        return 0;
    }
  }
}