interface FilterOptions {
  aria?: boolean;
  data?: boolean;
  attr?: boolean;
}

type Props = Record<string, unknown>;

const HTML_ATTRIBUTES = [
  "accept", "acceptCharset", "accessKey", "action", "allowFullScreen", "allowTransparency",
  "alt", "async", "autoComplete", "autoFocus", "autoPlay", "capture", "cellPadding", "cellSpacing", "challenge",
  "charSet", "checked", "classID", "className", "colSpan", "cols", "content", "contentEditable", "contextMenu",
  "controls", "coords", "crossOrigin", "data", "dateTime", "default", "defer", "dir", "disabled", "download", "draggable",
  "encType", "form", "formAction", "formEncType", "formMethod", "formNoValidate", "formTarget", "frameBorder",
  "headers", "height", "hidden", "high", "href", "hrefLang", "htmlFor", "httpEquiv", "icon", "id", "inputMode", "integrity",
  "is", "keyParams", "keyType", "kind", "label", "lang", "list", "loop", "low", "manifest", "marginHeight", "marginWidth", "max", "maxLength", "media",
  "mediaGroup", "method", "min", "minLength", "multiple", "muted", "name", "noValidate", "nonce", "open",
  "optimum", "pattern", "placeholder", "poster", "preload", "radioGroup", "readOnly", "rel", "required",
  "reversed", "role", "rowSpan", "rows", "sandbox", "scope", "scoped", "scrolling", "seamless", "selected",
  "shape", "size", "sizes", "span", "spellCheck", "src", "srcDoc", "srcLang", "srcSet", "start", "step", "style",
  "summary", "tabIndex", "target", "title", "type", "useMap", "value", "width", "wmode", "wrap",
  "onCopy", "onCut", "onPaste", "onCompositionEnd", "onCompositionStart", "onCompositionUpdate", "onKeyDown",
  "onKeyPress", "onKeyUp", "onFocus", "onBlur", "onChange", "onInput", "onSubmit", "onClick", "onContextMenu", "onDoubleClick",
  "onDrag", "onDragEnd", "onDragEnter", "onDragExit", "onDragLeave", "onDragOver", "onDragStart", "onDrop", "onMouseDown",
  "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseOut", "onMouseOver", "onMouseUp", "onSelect", "onTouchCancel",
  "onTouchEnd", "onTouchMove", "onTouchStart", "onScroll", "onWheel", "onAbort", "onCanPlay", "onCanPlayThrough",
  "onDurationChange", "onEmptied", "onEncrypted", "onEnded", "onError", "onLoadedData", "onLoadedMetadata",
  "onLoadStart", "onPause", "onPlay", "onPlaying", "onProgress", "onRateChange", "onSeeked", "onSeeking", "onStalled", "onSuspend", "onTimeUpdate", "onVolumeChange", "onWaiting", "onLoad", "onError"
];

const ARIA_PREFIX = "aria-";
const DATA_PREFIX = "data-";

function startsWith(value: string, prefix: string): boolean {
  return value.indexOf(prefix) === 0;
}

export default function filterProps(props: Props, options?: boolean | FilterOptions): Props {
  let filterOptions: FilterOptions;

  if (options === false) {
    filterOptions = {
      aria: true,
      data: true,
      attr: true
    };
  } else if (options === true) {
    filterOptions = {
      aria: true
    };
  } else {
    filterOptions = { ...options };
  }

  const result: Props = {};

  Object.keys(props).forEach((key) => {
    const isAriaAttribute = filterOptions.aria && (key === "role" || startsWith(key, ARIA_PREFIX));
    const isDataAttribute = filterOptions.data && startsWith(key, DATA_PREFIX);
    const isHtmlAttribute = filterOptions.attr && HTML_ATTRIBUTES.includes(key);

    if (isAriaAttribute || isDataAttribute || isHtmlAttribute) {
      result[key] = props[key];
    }
  });

  return result;
}