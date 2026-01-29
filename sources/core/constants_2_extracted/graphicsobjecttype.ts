export const GraphicsObjectType = Object.freeze({
    Mesh: 1,
    Model: 2
} as const);

export type GraphicsObjectType = typeof GraphicsObjectType[keyof typeof GraphicsObjectType];