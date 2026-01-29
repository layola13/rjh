export const CabinetMoldingEnum = HSCatalog.CabinetMoldingEnum;

export const CustomizedCabinetPartEnum = {
    Body: "body",
    Door: "door",
    Handle: "handle",
    Attachment: "attachment"
} as const;

export const CustomizedCabinetSurfaceTypeEnum = {
    CounterTop: "countertop",
    Backsplash: "backsplash",
    TopLine: "topLine",
    ToeKick: "toeKick"
} as const;

export const CustomizedCabinetComponentEnum = {
    Body: "cbnt_body"
} as const;

export const CustomizedCabinetHandleOrientation = {
    Horizontal: "horizontal",
    Vertical: "vertical"
} as const;

export type CustomizedCabinetPart = typeof CustomizedCabinetPartEnum[keyof typeof CustomizedCabinetPartEnum];
export type CustomizedCabinetSurfaceType = typeof CustomizedCabinetSurfaceTypeEnum[keyof typeof CustomizedCabinetSurfaceTypeEnum];
export type CustomizedCabinetComponent = typeof CustomizedCabinetComponentEnum[keyof typeof CustomizedCabinetComponentEnum];
export type CustomizedCabinetHandleOrientationType = typeof CustomizedCabinetHandleOrientation[keyof typeof CustomizedCabinetHandleOrientation];