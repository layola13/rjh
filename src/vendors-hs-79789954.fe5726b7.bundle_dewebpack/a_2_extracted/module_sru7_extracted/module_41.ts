interface LigatureSubstitutionData {
  tag: string;
  substitution: {
    ligGlyph: string;
    components: unknown[];
  };
}

interface GlyphState {
  setState(tag: string, value: string | boolean): void;
}

function applyLigatureSubstitution(
  data: LigatureSubstitutionData,
  glyphStates: GlyphState[],
  startIndex: number
): void {
  let currentState = glyphStates[startIndex];
  currentState.setState(data.tag, data.substitution.ligGlyph);
  
  const componentCount = data.substitution.components.length;
  for (let i = 0; i < componentCount; i++) {
    currentState = glyphStates[startIndex + i + 1];
    currentState.setState("deleted", true);
  }
}