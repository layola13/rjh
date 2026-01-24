/**
 * Character render module
 * Wraps child elements with a titled container component
 */

import React, { ReactElement, ReactNode } from 'react';

/**
 * Default title wrapper component (assumed from s.default)
 */
interface TitleWrapperProps {
  title: string;
  children: ReactNode;
}

declare const TitleWrapper: React.ComponentType<TitleWrapperProps>;

/**
 * Character data structure containing titles
 */
interface CharacterData {
  [index: number]: string;
}

/**
 * Props for the character render function
 */
interface CharacterRenderParams {
  /** The child element to render */
  element: ReactElement;
  /** Configuration object */
  config: {
    /** Index to lookup in character data */
    index: number;
  };
}

/**
 * Renders a character element, optionally wrapping it with a title component
 * 
 * @param element - The React element to render
 * @param config - Configuration containing the character index
 * @param characterData - Optional array/object of character titles
 * @returns The element, wrapped with title if character data exists
 */
function renderCharacter(
  element: ReactElement,
  config: { index: number },
  characterData?: CharacterData | null
): ReactElement {
  const targetIndex = config.index;
  
  return characterData
    ? React.createElement(TitleWrapper, {
        title: characterData[targetIndex]
      }, element)
    : element;
}

export { renderCharacter, CharacterRenderParams, CharacterData };
export default renderCharacter;