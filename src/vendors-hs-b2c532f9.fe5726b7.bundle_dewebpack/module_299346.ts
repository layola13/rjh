interface PathObject {
  root: string;
  dir: string;
  base: string;
  ext: string;
  name: string;
}

const CHAR_CODE_FORWARD_SLASH = 47;
const CHAR_CODE_DOT = 46;

function validatePath(path: unknown): asserts path is string {
  if (typeof path !== "string") {
    throw new TypeError(`Path must be a string. Received ${JSON.stringify(path)}`);
  }
}

function normalizeStringPosix(path: string, allowAboveRoot: boolean): string {
  let result = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let charCode: number;

  for (let i = 0; i <= path.length; ++i) {
    if (i < path.length) {
      charCode = path.charCodeAt(i);
    } else {
      if (charCode === CHAR_CODE_FORWARD_SLASH) break;
      charCode = CHAR_CODE_FORWARD_SLASH;
    }

    if (charCode === CHAR_CODE_FORWARD_SLASH) {
      if (lastSlash === i - 1 || dots === 1) {
        // Skip empty or single dot segments
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (
          result.length < 2 ||
          lastSegmentLength !== 2 ||
          result.charCodeAt(result.length - 1) !== CHAR_CODE_DOT ||
          result.charCodeAt(result.length - 2) !== CHAR_CODE_DOT
        ) {
          if (result.length > 2) {
            const lastSlashIndex = result.lastIndexOf("/");
            if (lastSlashIndex !== result.length - 1) {
              if (lastSlashIndex === -1) {
                result = "";
                lastSegmentLength = 0;
              } else {
                result = result.slice(0, lastSlashIndex);
                lastSegmentLength = result.length - 1 - result.lastIndexOf("/");
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (result.length === 2 || result.length === 1) {
            result = "";
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          result += result.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (result.length > 0) {
          result += "/" + path.slice(lastSlash + 1, i);
        } else {
          result = path.slice(lastSlash + 1, i);
        }
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (charCode === CHAR_CODE_DOT && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return result;
}

function getTypeOf(value: unknown): string {
  if (value === null) return "object";
  return typeof value;
}

const posixPath = {
  resolve(...pathSegments: string[]): string {
    let resolvedPath = "";
    let resolvedAbsolute = false;
    let currentWorkingDirectory: string | undefined;

    for (let i = pathSegments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      let segment: string;
      if (i >= 0) {
        segment = pathSegments[i];
      } else {
        if (currentWorkingDirectory === undefined) {
          currentWorkingDirectory = process.cwd();
        }
        segment = currentWorkingDirectory;
      }

      validatePath(segment);

      if (segment.length === 0) {
        continue;
      }

      resolvedPath = segment + "/" + resolvedPath;
      resolvedAbsolute = segment.charCodeAt(0) === CHAR_CODE_FORWARD_SLASH;
    }

    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      return resolvedPath.length > 0 ? "/" + resolvedPath : "/";
    } else {
      return resolvedPath.length > 0 ? resolvedPath : ".";
    }
  },

  normalize(path: string): string {
    validatePath(path);

    if (path.length === 0) return ".";

    const isAbsolute = path.charCodeAt(0) === CHAR_CODE_FORWARD_SLASH;
    const trailingSeparator = path.charCodeAt(path.length - 1) === CHAR_CODE_FORWARD_SLASH;

    let normalizedPath = normalizeStringPosix(path, !isAbsolute);

    if (normalizedPath.length === 0 && !isAbsolute) {
      normalizedPath = ".";
    }
    if (normalizedPath.length > 0 && trailingSeparator) {
      normalizedPath += "/";
    }

    return isAbsolute ? "/" + normalizedPath : normalizedPath;
  },

  isAbsolute(path: string): boolean {
    validatePath(path);
    return path.length > 0 && path.charCodeAt(0) === CHAR_CODE_FORWARD_SLASH;
  },

  join(...pathSegments: string[]): string {
    if (pathSegments.length === 0) return ".";

    let joined: string | undefined;
    for (let i = 0; i < pathSegments.length; ++i) {
      const segment = pathSegments[i];
      validatePath(segment);
      if (segment.length > 0) {
        if (joined === undefined) {
          joined = segment;
        } else {
          joined += "/" + segment;
        }
      }
    }

    return joined === undefined ? "." : posixPath.normalize(joined);
  },

  relative(from: string, to: string): string {
    validatePath(from);
    validatePath(to);

    if (from === to) return "";

    from = posixPath.resolve(from);
    to = posixPath.resolve(to);

    if (from === to) return "";

    let fromStart = 1;
    while (fromStart < from.length && from.charCodeAt(fromStart) === CHAR_CODE_FORWARD_SLASH) {
      ++fromStart;
    }
    const fromEnd = from.length;
    const fromLength = fromEnd - fromStart;

    let toStart = 1;
    while (toStart < to.length && to.charCodeAt(toStart) === CHAR_CODE_FORWARD_SLASH) {
      ++toStart;
    }
    const toEnd = to.length;
    const toLength = toEnd - toStart;

    const minLength = fromLength < toLength ? fromLength : toLength;
    let lastCommonSeparator = -1;
    let i = 0;

    for (; i <= minLength; ++i) {
      if (i === minLength) {
        if (toLength > minLength) {
          if (to.charCodeAt(toStart + i) === CHAR_CODE_FORWARD_SLASH) {
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            return to.slice(toStart + i);
          }
        } else if (fromLength > minLength) {
          if (from.charCodeAt(fromStart + i) === CHAR_CODE_FORWARD_SLASH) {
            lastCommonSeparator = i;
          } else if (i === 0) {
            lastCommonSeparator = 0;
          }
        }
        break;
      }

      const fromCode = from.charCodeAt(fromStart + i);
      const toCode = to.charCodeAt(toStart + i);

      if (fromCode !== toCode) break;
      if (fromCode === CHAR_CODE_FORWARD_SLASH) {
        lastCommonSeparator = i;
      }
    }

    let out = "";
    for (i = fromStart + lastCommonSeparator + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === CHAR_CODE_FORWARD_SLASH) {
        out += out.length === 0 ? ".." : "/..";
      }
    }

    return out.length > 0
      ? out + to.slice(toStart + lastCommonSeparator)
      : (toStart += lastCommonSeparator,
        to.charCodeAt(toStart) === CHAR_CODE_FORWARD_SLASH && ++toStart,
        to.slice(toStart));
  },

  _makeLong(path: string): string {
    return path;
  },

  dirname(path: string): string {
    validatePath(path);
    if (path.length === 0) return ".";

    const hasRoot = path.charCodeAt(0) === CHAR_CODE_FORWARD_SLASH;
    let end = -1;
    let matchedSlash = true;

    for (let i = path.length - 1; i >= 1; --i) {
      if (path.charCodeAt(i) === CHAR_CODE_FORWARD_SLASH) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
        matchedSlash = false;
      }
    }

    if (end === -1) {
      return hasRoot ? "/" : ".";
    }
    if (hasRoot && end === 1) {
      return "//";
    }
    return path.slice(0, end);
  },

  basename(path: string, ext?: string): string {
    if (ext !== undefined && typeof ext !== "string") {
      throw new TypeError('"ext" argument must be a string');
    }
    validatePath(path);

    let start = 0;
    let end = -1;
    let matchedSlash = true;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) {
        return "";
      }
      let extIndex = ext.length - 1;
      let firstNonSlashEnd = -1;

      for (let i = path.length - 1; i >= 0; --i) {
        const charCode = path.charCodeAt(i);
        if (charCode === CHAR_CODE_FORWARD_SLASH) {
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else {
          if (firstNonSlashEnd === -1) {
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIndex >= 0) {
            if (charCode === ext.charCodeAt(extIndex)) {
              if (--extIndex === -1) {
                end = i;
              }
            } else {
              extIndex = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) {
        end = firstNonSlashEnd;
      } else if (end === -1) {
        end = path.length;
      }
      return path.slice(start, end);
    } else {
      for (let i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === CHAR_CODE_FORWARD_SLASH) {
          if (!matchedSlash) {
            start = i + 1;
            break;
          }
        } else if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
      }

      return end === -1 ? "" : path.slice(start, end);
    }
  },

  extname(path: string): string {
    validatePath(path);
    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let preDotState = 0;

    for (let i = path.length - 1; i >= 0; --i) {
      const charCode = path.charCodeAt(i);
      if (charCode !== CHAR_CODE_FORWARD_SLASH) {
        if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
        if (charCode === CHAR_CODE_DOT) {
          if (startDot === -1) {
            startDot = i;
          } else if (preDotState !== 1) {
            preDotState = 1;
          }
        } else if (startDot !== -1) {
          preDotState = -1;
        }
      } else if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
    }

    if (
      startDot === -1 ||
      end === -1 ||
      preDotState === 0 ||
      (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)
    ) {
      return "";
    }
    return path.slice(startDot, end);
  },

  format(pathObject: PathObject): string {
    if (pathObject === null || getTypeOf(pathObject) !== "object") {
      throw new TypeError(
        `The "pathObject" argument must be of type Object. Received type ${getTypeOf(pathObject)}`
      );
    }

    const dir = pathObject.dir || pathObject.root;
    const base = pathObject.base || (pathObject.name || "") + (pathObject.ext || "");
    if (!dir) {
      return base;
    }
    return dir === pathObject.root ? dir + base : dir + "/" + base;
  },

  parse(path: string): PathObject {
    validatePath(path);

    const result: PathObject = {
      root: "",
      dir: "",
      base: "",
      ext: "",
      name: ""
    };

    if (path.length === 0) return result;

    const isAbsolute = path.charCodeAt(0) === CHAR_CODE_FORWARD_SLASH;
    let start: number;
    if (isAbsolute) {
      result.root = "/";
      start = 1;
    } else {
      start = 0;
    }

    let startDot = -1;
    let startPart = 0;
    let end = -1;
    let matchedSlash = true;
    let i = path.length - 1;
    let preDotState = 0;

    for (; i >= start; --i) {
      const charCode = path.charCodeAt(i);
      if (charCode !== CHAR_CODE_FORWARD_SLASH) {
        if (end === -1) {
          matchedSlash = false;
          end = i + 1;
        }
        if (charCode === CHAR_CODE_DOT) {
          if (startDot === -1) {
            startDot = i;
          } else if (preDotState !== 1) {
            preDotState = 1;
          }
        } else if (startDot !== -1) {
          preDotState = -1;
        }
      } else if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
    }

    if (
      startDot === -1 ||
      end === -1 ||
      preDotState === 0 ||
      (preDotState === 1 && startDot === end - 1 && startDot === startPart + 1)
    ) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) {
          result.base = result.name = path.slice(1, end);
        } else {
          result.base = result.name = path.slice(startPart, end);
        }
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        result.name = path.slice(1, startDot);
        result.base = path.slice(1, end);
      } else {
        result.name = path.slice(startPart, startDot);
        result.base = path.slice(startPart, end);
      }
      result.ext = path.slice(startDot, end);
    }

    if (startPart > 0) {
      result.dir = path.slice(0, startPart - 1);
    } else if (isAbsolute) {
      result.dir = "/";
    }

    return result;
  },

  sep: "/",
  delimiter: ":",
  win32: null,
  posix: null as unknown
};

posixPath.posix = posixPath;

export = posixPath;