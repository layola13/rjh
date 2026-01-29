interface CNamePattern {
  hosts: string[];
  cnamePattern: string;
  count: number;
}

interface CNameConfig {
  cnamePatternMaps: CNamePattern[];
}

const UUID_REGEX = /\b[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}\b/i;

function extractUUID(input: string): string | undefined {
  if (!input) {
    return undefined;
  }

  const match = UUID_REGEX.exec(input);
  return match?.[0];
}

export function getCNameUrl(url: string, offset?: number): string {
  const config: CNameConfig = require('./config'); // Replace with actual config import
  const cnamePatternMaps = config.cnamePatternMaps;

  for (let i = 0; i < cnamePatternMaps.length; i++) {
    const pattern = cnamePatternMaps[i];
    const matchedHost = pattern.hosts.find((host) => url.includes(host));

    if (matchedHost) {
      let index: number;
      const uuid = extractUUID(url);

      if (uuid) {
        const offsetValue = offset ?? 0;
        const uuidPrefix = uuid;
        const hashValue = Number.parseInt(`0x${uuidPrefix.substr(0, 8)}`);
        index = (hashValue + offsetValue) % pattern.count;
      } else {
        index = Math.floor(Math.random() * pattern.count);
      }

      let result = url.replace(matchedHost, pattern.cnamePattern);
      result = result.replace('#index#', String(index));
      return result;
    }
  }

  return url;
}