export const SlabUtil = {
  getUnclosedPath: <T>(path: T[] | T): T[] | T => {
    if (!Array.isArray(path) || path.length < 3) {
      return path;
    }
    
    return path[0] === path[path.length - 1] 
      ? path.slice(0, -1) 
      : path;
  }
};