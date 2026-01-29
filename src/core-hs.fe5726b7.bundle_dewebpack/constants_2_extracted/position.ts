export const Position = Object.freeze({
    Center: "center",
    Left: "left",
    Right: "right",
    Middle: "middle",
    Top: "top",
    Bottom: "bottom",
    TopLeft: "topLeft",
    TopRight: "topRight",
    BottomLeft: "bottomLeft",
    BottomRight: "bottomRight",
    TopCenter: "topCenter",
    BottomCenter: "bottomCenter",
    LeftMiddle: "leftMiddle",
    CenterMiddle: "centerMiddle",
    RightMiddle: "rightMiddle"
} as const);

export type Position = typeof Position[keyof typeof Position];