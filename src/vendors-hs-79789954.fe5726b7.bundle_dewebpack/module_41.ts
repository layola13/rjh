interface LigatureSubstitutionEvent {
  tag: string;
  substitution: {
    ligGlyph: string;
    components: readonly unknown[];
  };
}

interface GlyphState {
  setState(key: string, value: string | boolean): void;
}

function applyLigatureSubstitution(
  event: LigatureSubstitutionEvent,
  glyphs: readonly GlyphState[],
  startIndex: number
): void {
  let currentGlyph = glyphs[startIndex];
  currentGlyph.setState(event.tag, event.substitution.ligGlyph);
  
  const componentCount = event.substitution.components.length;
  
  for (let i = 0; i < componentCount; i++) {
    currentGlyph = glyphs[startIndex + i + 1];
    currentGlyph.setState("deleted", true);
  }
}