/**
 * POSIX path manipulation utilities
 * Provides methods for working with file and directory paths following POSIX standards
 */

/**
 * Parsed path object representing the components of a file path
 */
export interface ParsedPath {
  /** The root of the path such as '/' */
  root: string;
  /** The full directory path such as '/home/user/dir' */
  dir: string;
  /** The file name including extension 'file.txt' */
  base: string;
  /** The file extension including dot '.txt' */
  ext: string;
  /** The file name without extension 'file' */
  name: string;
}

/**
 * Object for formatting a path from components
 */
export interface FormatInputPathObject {
  /** The root of the path such as '/' */
  root?: string;
  /** The full directory path such as '/home/user/dir' */
  dir?: string;
  /** The file name including extension 'file.txt' */
  base?: string;
  /** The file extension including dot '.txt' */
  ext?: string;
  /** The file name without extension 'file' */
  name?: string;
}

/**
 * POSIX path operations interface
 */
export interface PlatformPath {
  /**
   * Resolves a sequence of paths into an absolute path
   * @param paths - A sequence of paths or path segments
   * @returns The resolved absolute path
   * @example
   * path.resolve('/foo/bar', './baz') // returns '/foo/bar/baz'
   */
  resolve(...paths: string[]): string;

  /**
   * Normalizes a path, resolving '..' and '.' segments
   * @param path - The path to normalize
   * @returns The normalized path
   * @example
   * path.normalize('/foo/bar//baz/asdf/quux/..') // returns '/foo/bar/baz/asdf'
   */
  normalize(path: string): string;

  /**
   * Determines if a path is absolute
   * @param path - The path to test
   * @returns True if the path is absolute, false otherwise
   * @example
   * path.isAbsolute('/foo/bar') // returns true
   */
  isAbsolute(path: string): boolean;

  /**
   * Joins all given path segments together using the platform separator
   * @param paths - A sequence of path segments
   * @returns The joined path
   * @example
   * path.join('/foo', 'bar', 'baz/asdf', 'quux', '..') // returns '/foo/bar/baz/asdf'
   */
  join(...paths: string[]): string;

  /**
   * Solves the relative path from 'from' to 'to'
   * @param from - The source path
   * @param to - The destination path
   * @returns The relative path from 'from' to 'to'
   * @example
   * path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb') // returns '../../impl/bbb'
   */
  relative(from: string, to: string): string;

  /**
   * Returns the directory name of a path
   * @param path - The path to evaluate
   * @returns The directory name
   * @example
   * path.dirname('/foo/bar/baz/asdf/quux.html') // returns '/foo/bar/baz/asdf'
   */
  dirname(path: string): string;

  /**
   * Returns the last portion of a path
   * @param path - The path to evaluate
   * @param ext - An optional file extension to remove
   * @returns The last portion of the path
   * @example
   * path.basename('/foo/bar/baz/asdf/quux.html') // returns 'quux.html'
   * path.basename('/foo/bar/baz/asdf/quux.html', '.html') // returns 'quux'
   */
  basename(path: string, ext?: string): string;

  /**
   * Returns the extension of the path
   * @param path - The path to evaluate
   * @returns The extension (including the dot) or empty string
   * @example
   * path.extname('index.html') // returns '.html'
   */
  extname(path: string): string;

  /**
   * Returns a path string from an object
   * @param pathObject - Object with path components
   * @returns The formatted path string
   * @example
   * path.format({ dir: '/home/user/dir', base: 'file.txt' }) // returns '/home/user/dir/file.txt'
   */
  format(pathObject: FormatInputPathObject): string;

  /**
   * Parses a path string into an object
   * @param path - The path to parse
   * @returns An object with path components
   * @example
   * path.parse('/home/user/dir/file.txt')
   * // returns { root: '/', dir: '/home/user/dir', base: 'file.txt', ext: '.txt', name: 'file' }
   */
  parse(path: string): ParsedPath;

  /**
   * Platform-specific path segment separator ('/' on POSIX)
   */
  readonly sep: '/' | '\\';

  /**
   * Platform-specific path delimiter (':' on POSIX, ';' on Windows)
   */
  readonly delimiter: ':' | ';';

  /**
   * Windows-specific path methods (null on POSIX platforms)
   */
  readonly win32: null | PlatformPath;

  /**
   * POSIX-specific path methods
   */
  readonly posix: PlatformPath;

  /**
   * Internal method for making long paths (no-op on POSIX)
   * @param path - The path to process
   * @returns The processed path
   * @internal
   */
  _makeLong(path: string): string;
}

/**
 * The default POSIX path operations
 */
declare const path: PlatformPath;

export default path;