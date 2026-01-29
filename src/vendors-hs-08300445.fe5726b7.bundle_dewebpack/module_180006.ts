interface VendorPrefixMap {
  [key: string]: string;
}

interface EventNameMap {
  animationend: VendorPrefixMap;
  transitionend: VendorPrefixMap;
}

interface TransitionNameObject {
  [key: string]: string;
}

const cachedEventNames: Partial<Record<string, string>> = {};

function createVendorPrefixMap(event: string, nativeEvent: string): VendorPrefixMap {
  const prefixMap: VendorPrefixMap = {};
  prefixMap[event.toLowerCase()] = nativeEvent.toLowerCase();
  prefixMap[`Webkit${event}`] = `webkit${nativeEvent}`;
  prefixMap[`Moz${event}`] = `moz${nativeEvent}`;
  prefixMap[`ms${event}`] = `MS${nativeEvent}`;
  prefixMap[`O${event}`] = `o${nativeEvent.toLowerCase()}`;
  return prefixMap;
}

function getVendorPrefixes(isClient: boolean, globalContext: Window | Record<string, never>): EventNameMap {
  const eventNameMap: EventNameMap = {
    animationend: createVendorPrefixMap("Animation", "AnimationEnd"),
    transitionend: createVendorPrefixMap("Transition", "TransitionEnd")
  };

  if (isClient) {
    if (!("AnimationEvent" in globalContext)) {
      delete eventNameMap.animationend.animation;
    }
    if (!("TransitionEvent" in globalContext)) {
      delete eventNameMap.transitionend.transition;
    }
  }

  return eventNameMap;
}

function isClientSide(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

const vendorPrefixedEvents = getVendorPrefixes(
  isClientSide(),
  typeof window !== "undefined" ? window : {}
);

const styleProperties: Partial<CSSStyleDeclaration> = isClientSide()
  ? document.createElement("div").style
  : {};

function getVendorPrefixedEventName(eventName: keyof EventNameMap): string {
  if (cachedEventNames[eventName]) {
    return cachedEventNames[eventName]!;
  }

  const eventMap = vendorPrefixedEvents[eventName];
  if (!eventMap) {
    return "";
  }

  const prefixKeys = Object.keys(eventMap);
  for (const prefixKey of prefixKeys) {
    if (
      Object.prototype.hasOwnProperty.call(eventMap, prefixKey) &&
      prefixKey in styleProperties
    ) {
      cachedEventNames[eventName] = eventMap[prefixKey];
      return cachedEventNames[eventName]!;
    }
  }

  return "";
}

const animationEndName = getVendorPrefixedEventName("animationend") || "animationend";
const transitionEndName = getVendorPrefixedEventName("transitionend") || "transitionend";
const supportTransition = Boolean(animationEndName && transitionEndName);

/**
 * Get transition class name based on prefix and type
 */
function getTransitionName(
  transitionPrefix: string | TransitionNameObject | null | undefined,
  transitionType: string
): string | null {
  if (!transitionPrefix) {
    return null;
  }

  if (typeof transitionPrefix === "object") {
    const camelCaseType = transitionType.replace(/-\w/g, (match: string) => {
      return match[1].toUpperCase();
    });
    return transitionPrefix[camelCaseType];
  }

  return `${transitionPrefix}-${transitionType}`;
}

export { animationEndName, transitionEndName, supportTransition, getTransitionName, getVendorPrefixedEventName, getVendorPrefixes };