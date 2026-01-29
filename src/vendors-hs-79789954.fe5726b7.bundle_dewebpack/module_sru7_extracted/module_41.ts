interface LigatureSubstitution {
  ligGlyph: string;
  components: unknown[];
}

interface LigatureEntry {
  tag: string;
  substitution: LigatureSubstitution;
}

interface GlyphState {
  setState(key: string, value: string | boolean): void;
}

function applyLigatureSubstitution(
  entry: LigatureEntry,
  glyphStates: GlyphState[],
  startIndex: number
): void {
  const firstGlyph = glyphStates[startIndex];
  firstGlyph.setState(entry.tag, entry.substitution.ligGlyph);

  const componentCount = entry.substitution.components.length;
  for (let i = 0; i < componentCount; i++) {
    const currentGlyph = glyphStates[startIndex + i + 1];
    currentGlyph.setState("deleted", true);
  }
}