export enum PolyFillType {
  EvenOdd = "evenOdd",
  NonZero = "nonZero",
  Positive = "positive",
  Negative = "negative"
}

export enum ClipType {
  Intersection = "intersection",
  Union = "union",
  Difference = "difference",
  Xor = "xor"
}

export enum PolyType {
  Subject = "subject",
  Clip = "clip"
}

export enum JoinType {
  Square = "square",
  Round = "round",
  Miter = "miter"
}

export enum EndType {
  ClosedPolygon = "closedPolygon",
  ClosedLine = "closedLine",
  OpenButt = "openButt",
  OpenSquare = "openSquare",
  OpenRound = "openRound"
}

export enum PointInPolygonResult {
  Outside = 0,
  Inside = 1,
  OnBoundary = -1
}

export enum NativeClipperLibRequestedFormat {
  WasmWithAsmJsFallback = "wasmWithAsmJsFallback",
  WasmOnly = "wasmOnly",
  AsmJsOnly = "asmJsOnly"
}

export enum NativeClipperLibLoadedFormat {
  Wasm = "wasm",
  AsmJs = "asmJs"
}