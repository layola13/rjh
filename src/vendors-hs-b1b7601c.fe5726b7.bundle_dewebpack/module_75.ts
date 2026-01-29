const NANOSECONDS_PER_SECOND = 1e9;
const NANOSECONDS_TO_MILLISECONDS = 1e6;

interface HRTime {
  (): [number, number];
}

function createHighResolutionTimer(): () => number {
  if (typeof performance !== 'undefined' && performance !== null && performance.now) {
    return (): number => performance.now();
  }

  if (typeof process !== 'undefined' && process !== null && process.hrtime) {
    const hrtime: HRTime = process.hrtime;
    
    const getHighResolutionTime = (): number => {
      const [seconds, nanoseconds] = hrtime();
      return NANOSECONDS_PER_SECOND * seconds + nanoseconds;
    };

    const initialHighResTime = getHighResolutionTime();
    const processUptimeNanoseconds = NANOSECONDS_PER_SECOND * process.uptime();
    const offsetNanoseconds = initialHighResTime - processUptimeNanoseconds;

    return (): number => {
      return (getHighResolutionTime() - offsetNanoseconds) / NANOSECONDS_TO_MILLISECONDS;
    };
  }

  if (Date.now) {
    const startTime = Date.now();
    return (): number => Date.now() - startTime;
  }

  const startTime = new Date().getTime();
  return (): number => new Date().getTime() - startTime;
}

export default createHighResolutionTimer();