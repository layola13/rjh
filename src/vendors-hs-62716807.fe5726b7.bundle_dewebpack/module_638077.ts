const processGlobal = globalThis.process;
const denoGlobal = globalThis.Deno;

const versions = (processGlobal?.versions) || (denoGlobal?.version);
const v8Version = versions?.v8;

let engineVersion: number | undefined;

if (v8Version) {
  const versionParts = v8Version.split(".");
  const majorVersion = parseInt(versionParts[0], 10);
  const minorVersion = parseInt(versionParts[1], 10);
  
  engineVersion = majorVersion > 0 && majorVersion < 4 
    ? 1 
    : majorVersion * 10 + minorVersion;
}

if (!engineVersion && typeof navigator !== 'undefined' && navigator.userAgent) {
  const userAgent = navigator.userAgent;
  let match = userAgent.match(/Edge\/(\d+)/);
  
  if (!match || parseInt(match[1], 10) >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) {
      engineVersion = parseInt(match[1], 10);
    }
  }
}

export default engineVersion;