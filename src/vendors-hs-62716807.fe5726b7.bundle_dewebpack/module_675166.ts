interface SerializableObject {
  [key: string]: unknown;
}

interface Serializer {
  serialize(data: SerializableObject): string;
  warn(message: string): void;
}

function sendBeacon(
  data: SerializableObject | string,
  baseUrl: string,
  serializer: Serializer
): void {
  let serializedData: string;

  if (typeof data === 'object') {
    serializedData = serializer.serialize(data);
  } else {
    serializedData = data;
  }

  const url = baseUrl + serializedData;

  if (
    window?.navigator?.sendBeacon &&
    typeof window.navigator.sendBeacon === 'function'
  ) {
    window.navigator.sendBeacon(url, '&post_res=');
  } else {
    serializer.warn('[arms] navigator.sendBeacon not supported');
  }
}

export default sendBeacon;