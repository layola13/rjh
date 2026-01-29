interface LigatureSubstitution {
  ligGlyph: string;
  components: unknown[];
}

interface LigatureEntry {
  tag: string;
  substitution: LigatureSubstitution;
}

interface GlyphState {
  setState(property: string, value: string | boolean): void;
}

function applyLigatureSubstitution(
  entry: LigatureEntry,
  glyphStates: GlyphState[],
  startIndex: number
): void {
  const currentGlyph = glyphStates[startIndex];
  currentGlyph.setState(entry.tag, entry.substitution.ligGlyph);
  
  const componentCount = entry.substitution.components.length;
  for (let i = 0; i < componentCount; i++) {
    const nextGlyph = glyphStates[startIndex + i + 1];
    nextGlyph.setState("deleted", true);
  }
}