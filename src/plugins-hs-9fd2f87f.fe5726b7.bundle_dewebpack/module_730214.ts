interface Content {
  contentType: {
    isTypeOf(type: unknown): boolean;
  };
  x: number;
  y: number;
  z: number;
  XLength: number;
  YLength: number;
  ZLength: number;
  ZRotation: number;
  resize(xLength: number, yLength: number, zLength: number): void;
}

interface State {
  value: number;
}

interface Entity {
  x: number;
  y: number;
  z: number;
  XLength: number;
  YLength: number;
  ZLength: number;
  ZRotation: number;
  contents: Record<string, Content>;
  getStateById(id: string): State | null;
  resize(xLength: number, yLength: number, zLength: number): void;
}

interface GapOffsets {
  top?: number;
  left?: number;
  right?: number;
  back?: number;
}

declare const HSCatalog: {
  ContentTypeEnum: {
    ext_FloorBasedContent: unknown;
  };
};

/**
 * Adjusts the dimensions and position of an entity based on its attached content
 * @param entity - The entity to adjust
 * @param gapOffsets - Optional gap offset values for top, left, right, and back
 */
function adjustEntityWithAttachedContent(entity: Entity, gapOffsets?: GapOffsets): void {
  const contents = Object.values(entity.contents);
  
  if (contents.length !== 1) {
    return;
  }
  
  const content = contents[0];
  
  if (!content.contentType.isTypeOf(HSCatalog.ContentTypeEnum.ext_FloorBasedContent)) {
    return;
  }
  
  const topGapState = entity.getStateById("id_attachcontent_gap_top");
  const leftGapState = entity.getStateById("id_attachcontent_gap_left");
  const rightGapState = entity.getStateById("id_attachcontent_gap_right");
  const backGapState = entity.getStateById("id_attachcontent_gap_back");
  
  if (!topGapState || !leftGapState || !rightGapState || !backGapState) {
    return;
  }
  
  const thicknessState = entity.getStateById("ID_board_thickness");
  const boardThickness = thicknessState?.value ?? 0.02;
  
  if (gapOffsets) {
    if (gapOffsets.hasOwnProperty("top")) {
      topGapState.value = gapOffsets.top!;
    }
    if (gapOffsets.hasOwnProperty("left")) {
      leftGapState.value = gapOffsets.left!;
    }
    if (gapOffsets.hasOwnProperty("right")) {
      rightGapState.value = gapOffsets.right!;
    }
    if (gapOffsets.hasOwnProperty("back")) {
      backGapState.value = gapOffsets.back!;
    }
  }
  
  const newXLength = content.XLength + leftGapState.value + rightGapState.value + 2 * boardThickness;
  const newZLength = content.z + content.ZLength + topGapState.value + boardThickness;
  const newYLength = entity.YLength;
  const yOffset = entity.YLength / 2 - boardThickness - backGapState.value - content.YLength / 2;
  
  entity.resize(newXLength, newYLength, newZLength);
  
  const rotationRadians = Math.PI * content.ZRotation / 180;
  content.x = entity.x + yOffset * Math.sin(rotationRadians);
  content.y = entity.y + yOffset * Math.cos(rotationRadians);
  content.z = 0;
}

export default adjustEntityWithAttachedContent;