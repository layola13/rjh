interface StyleCache {
  position?: string;
  width?: string;
}

const SCROLLING_CLASS_NAME = 'ant-scrolling-effect';

let cachedStyles: StyleCache = {};

function setBodyStyle(styles: StyleCache): StyleCache {
  const previousStyles: StyleCache = {};
  
  Object.keys(styles).forEach((key) => {
    const styleKey = key as keyof StyleCache;
    const bodyStyle = document.body.style as any;
    previousStyles[styleKey] = bodyStyle[key];
    bodyStyle[key] = styles[styleKey];
  });
  
  return previousStyles;
}

function removeBodyStyle(styles: StyleCache): void {
  Object.keys(styles).forEach((key) => {
    const bodyStyle = document.body.style as any;
    bodyStyle[key] = '';
  });
}

function getScrollbarWidth(): number {
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  outer.style.width = '100px';
  document.body.appendChild(outer);
  
  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);
  
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  
  outer.parentNode?.removeChild(outer);
  
  return scrollbarWidth;
}

export default function toggleScrollingEffect(shouldRemove?: boolean): void {
  const hasScrollbar =
    document.body.scrollHeight >
      (window.innerHeight || document.documentElement.clientHeight) &&
    window.innerWidth > document.body.offsetWidth;

  const classNameRegex = new RegExp(`${SCROLLING_CLASS_NAME}`, 'g');
  const currentClassName = document.body.className;

  if (shouldRemove) {
    if (!classNameRegex.test(currentClassName)) {
      return;
    }
    
    removeBodyStyle(cachedStyles);
    cachedStyles = {};
    document.body.className = currentClassName.replace(classNameRegex, '').trim();
    return;
  }

  if (!hasScrollbar) {
    return;
  }

  const scrollbarWidth = getScrollbarWidth();

  if (scrollbarWidth) {
    cachedStyles = setBodyStyle({
      position: 'relative',
      width: `calc(100% - ${scrollbarWidth}px)`,
    });

    if (!classNameRegex.test(currentClassName)) {
      const newClassName = `${currentClassName} ${SCROLLING_CLASS_NAME}`;
      document.body.className = newClassName.trim();
    }
  }
}