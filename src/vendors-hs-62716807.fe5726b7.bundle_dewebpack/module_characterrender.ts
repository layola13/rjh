interface CharacterRenderProps {
  title: string;
}

function characterRender(
  element: React.ReactElement,
  context: { index: number }
): React.ReactElement {
  const index = context.index;
  
  return r 
    ? React.createElement<CharacterRenderProps>(s.default, { title: r[index] }, element)
    : element;
}