export const ExtraordinarySketch2dTypes = {
  ExAddSplitPoint: "hsw.plugin.extraordinarySketch2d.req.AddSplitPoint",
  ExDrawLines: "hsw.plugin.extraordinarySketch2d.req.DrawLines",
  ExDrawRectangle: "hsw.plugin.extraordinarySketch2d.req.DrawRectangle",
  ExDrawCircle: "hsw.plugin.extraordinarySketch2d.req.DrawCircle",
  ExDrawRegularPolygon: "hsw.plugin.extraordinarySketch2d.req.DrawRegularPolygon",
  ExConvertLineToArc: "hsw.plugin.extraordinarySketch2d.req.ConvertLineToArc"
} as const;

Object.freeze(ExtraordinarySketch2dTypes);

export type ExtraordinarySketch2dTypesKeys = keyof typeof ExtraordinarySketch2dTypes;
export type ExtraordinarySketch2dTypesValues = typeof ExtraordinarySketch2dTypes[ExtraordinarySketch2dTypesKeys];