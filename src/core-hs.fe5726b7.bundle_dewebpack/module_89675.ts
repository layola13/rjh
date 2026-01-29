const process = globalThis.process;
const Deno = globalThis.Deno;

const versions = process?.versions || Deno?.version;
const v8Version = versions?.v8;

let engineVersion: number | undefined;

if (v8Version) {
  const versionParts = v8Version.split(".");
  const majorVersion = Number(versionParts[0]);
  const minorVersion = Number(versionParts[1]);

  if (majorVersion > 0 && majorVersion < 4) {
    engineVersion = 1;
  } else {
    engineVersion = Number(versionParts[0] + versionParts[1]);
  }
}

const userAgent = globalThis.navigator?.userAgent;

if (!engineVersion && userAgent) {
  const edgeMatch = userAgent.match(/Edge\/(\d+)/);
  
  if (!edgeMatch || Number(edgeMatch[1]) >= 74) {
    const chromeMatch = userAgent.match(/Chrome\/(\d+)/);
    
    if (chromeMatch) {
      engineVersion = Number(chromeMatch[1]);
    }
  }
}

export default engineVersion;