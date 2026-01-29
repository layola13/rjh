const NANOSECONDS_PER_SECOND = 1e9;
const NANOSECONDS_TO_MILLISECONDS = 1e6;

let baseTime: number;
let getHighResolutionTime: () => number;

if (typeof performance !== "undefined" && performance !== null && performance.now) {
  getHighResolutionTime = (): number => {
    return performance.now();
  };
} else if (typeof process !== "undefined" && process !== null && process.hrtime) {
  const hrtime = process.hrtime;
  
  const getCurrentTimeInNanoseconds = (): number => {
    const [seconds, nanoseconds] = hrtime();
    return NANOSECONDS_PER_SECOND * seconds + nanoseconds;
  };
  
  const initialTime = getCurrentTimeInNanoseconds();
  const processUptime = NANOSECONDS_PER_SECOND * process.uptime();
  baseTime = initialTime - processUptime;
  
  getHighResolutionTime = (): number => {
    return (getCurrentTimeInNanoseconds() - baseTime) / NANOSECONDS_TO_MILLISECONDS;
  };
} else if (Date.now) {
  baseTime = Date.now();
  
  getHighResolutionTime = (): number => {
    return Date.now() - baseTime;
  };
} else {
  baseTime = new Date().getTime();
  
  getHighResolutionTime = (): number => {
    return new Date().getTime() - baseTime;
  };
}

export default getHighResolutionTime;