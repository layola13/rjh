export const Flag = {
  isFlagOn: (flags: number, flag: number): boolean => (flags & flag) !== 0,
  
  isFlagOff: (flags: number, flag: number): boolean => (flags & flag) === 0,
  
  setFlagOn: (flags: number, flag: number): number => flags | flag,
  
  setFlagOff: (flags: number, flag: number): number => flags & ~flag
};