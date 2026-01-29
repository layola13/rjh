import isAbsolute from './isAbsolute';
import join from './join';

export default function resolve(basePath: string, targetPath: string): string {
  return basePath && !isAbsolute(targetPath) ? join(basePath, targetPath) : targetPath;
}