import { render, unmountComponentAtNode } from 'react-dom';
import { createElement, ReactNode } from 'react';
import { toArray } from 'rc-util/lib/Children/toArray';

interface EllipsisConfig {
  rows: number;
  suffix?: string;
}

interface EllipsisResult {
  content: ReactNode;
  text: string;
  ellipsis: boolean;
}

interface MeasureResult {
  finished: boolean;
  reactNode: ReactNode;
}

const INLINE_STYLE: React.CSSProperties = {
  padding: 0,
  margin: 0,
  display: 'inline',
  lineHeight: 'inherit',
};

let measureElement: HTMLDivElement | null = null;

function parseNumericValue(value: string): number {
  if (!value) return 0;
  const match = value.match(/^\d*(\.\d*)?/);
  return match ? Number(match[0]) : 0;
}

function getAllStyles(computedStyle: CSSStyleDeclaration): string {
  return Array.prototype.slice
    .apply(computedStyle)
    .map((property: string) => {
      return `${property}: ${computedStyle.getPropertyValue(property)};`;
    })
    .join('');
}

export default function measureEllipsis(
  targetElement: HTMLElement,
  config: EllipsisConfig,
  content: ReactNode,
  ellipsisNode: ReactNode,
  ellipsisSymbol: string
): EllipsisResult {
  if (!measureElement) {
    measureElement = document.createElement('div');
    measureElement.setAttribute('aria-hidden', 'true');
    document.body.appendChild(measureElement);
  }

  const { rows, suffix = '' } = config;
  const computedStyle = window.getComputedStyle(targetElement);
  const styleString = getAllStyles(computedStyle);

  const lineHeight = parseNumericValue(computedStyle.lineHeight);
  const maxHeight = Math.round(
    lineHeight * (rows + 1) +
      parseNumericValue(computedStyle.paddingTop) +
      parseNumericValue(computedStyle.paddingBottom)
  );

  measureElement.setAttribute('style', styleString);
  measureElement.style.position = 'fixed';
  measureElement.style.left = '0';
  measureElement.style.height = 'auto';
  measureElement.style.minHeight = 'auto';
  measureElement.style.maxHeight = 'auto';
  measureElement.style.top = '-999999px';
  measureElement.style.zIndex = '-1000';
  measureElement.style.textOverflow = 'clip';
  measureElement.style.whiteSpace = 'normal';
  measureElement.style.webkitLineClamp = 'none';

  const childrenArray = toArray(content);
  const mergedChildren: ReactNode[] = [];
  childrenArray.forEach((child) => {
    const lastChild = mergedChildren[mergedChildren.length - 1];
    if (typeof child === 'string' && typeof lastChild === 'string') {
      mergedChildren[mergedChildren.length - 1] += child;
    } else {
      mergedChildren.push(child);
    }
  });

  function isFitContent(): boolean {
    return measureElement!.offsetHeight < maxHeight;
  }

  render(
    createElement(
      'div',
      { style: INLINE_STYLE },
      createElement('span', { style: INLINE_STYLE }, mergedChildren, suffix),
      createElement('span', { style: INLINE_STYLE }, ellipsisNode)
    ),
    measureElement
  );

  if (isFitContent()) {
    unmountComponentAtNode(measureElement);
    return {
      content,
      text: measureElement.innerHTML,
      ellipsis: false,
    };
  }

  const contentNodes = Array.prototype.slice
    .apply(
      measureElement.childNodes[0].childNodes[0].cloneNode(true).childNodes
    )
    .filter((node: Node) => node.nodeType !== Node.COMMENT_NODE);

  const ellipsisNodes = Array.prototype.slice.apply(
    measureElement.childNodes[0].childNodes[1].cloneNode(true).childNodes
  );

  unmountComponentAtNode(measureElement);

  const ellipsisContent: ReactNode[] = [];
  measureElement.innerHTML = '';

  const contentContainer = document.createElement('span');
  measureElement.appendChild(contentContainer);

  const ellipsisTextNode = document.createTextNode(ellipsisSymbol + suffix);

  function insertBeforeEllipsis(node: Node): void {
    contentContainer.insertBefore(node, ellipsisTextNode);
  }

  function binarySearchText(
    textNode: Text,
    text: string,
    start: number = 0,
    end: number = text.length,
    lastMid: number = 0
  ): MeasureResult {
    const mid = Math.floor((start + end) / 2);
    const slicedText = text.slice(0, mid);
    textNode.textContent = slicedText;

    if (start >= end - 1) {
      for (let i = end; i >= start; i -= 1) {
        const currentText = text.slice(0, i);
        textNode.textContent = currentText;

        if (isFitContent() || !currentText) {
          return i === text.length
            ? { finished: false, reactNode: text }
            : { finished: true, reactNode: currentText };
        }
      }
    }

    return isFitContent()
      ? binarySearchText(textNode, text, mid, end, mid)
      : binarySearchText(textNode, text, start, mid, lastMid);
  }

  function measureNode(node: Node, index: number): MeasureResult {
    const nodeType = node.nodeType;

    if (nodeType === Node.ELEMENT_NODE) {
      insertBeforeEllipsis(node);
      if (isFitContent()) {
        return { finished: false, reactNode: mergedChildren[index] };
      } else {
        contentContainer.removeChild(node);
        return { finished: true, reactNode: null };
      }
    }

    if (nodeType === Node.TEXT_NODE) {
      const text = node.textContent || '';
      const textNode = document.createTextNode(text);
      insertBeforeEllipsis(textNode);
      return binarySearchText(textNode, text);
    }

    return { finished: false, reactNode: null };
  }

  contentContainer.appendChild(ellipsisTextNode);
  ellipsisNodes.forEach((node: Node) => {
    measureElement!.appendChild(node);
  });

  contentNodes.some((node: Node, index: number) => {
    const { finished, reactNode } = measureNode(node, index);
    if (reactNode) {
      ellipsisContent.push(reactNode);
    }
    return finished;
  });

  return {
    content: ellipsisContent,
    text: measureElement.innerHTML,
    ellipsis: true,
  };
}