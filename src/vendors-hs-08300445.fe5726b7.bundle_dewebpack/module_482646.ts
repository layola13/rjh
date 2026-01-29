import { useRef, useMemo } from 'react';

interface CacheableOption {
  value: string | number;
  label: string;
  isCacheable?: boolean;
}

/**
 * Custom hook that caches option labels based on their values.
 * If an option is cacheable and has a previously stored label, it uses the cached label.
 * 
 * @param options - Array of options with value, label, and optional isCacheable flag
 * @returns Processed array of options with cached labels where applicable
 */
export default function useCachedOptions(options: CacheableOption[]): CacheableOption[] {
  const previousOptionsRef = useRef<CacheableOption[]>(options);

  return useMemo(() => {
    const labelCache = new Map<string | number, string>();

    previousOptionsRef.current.forEach((option) => {
      const { value, label } = option;
      if (value !== label) {
        labelCache.set(value, label);
      }
    });

    const processedOptions = options.map((option) => {
      const cachedLabel = labelCache.get(option.value);
      
      if (option.isCacheable && cachedLabel) {
        return {
          ...option,
          label: cachedLabel
        };
      }
      
      return option;
    });

    previousOptionsRef.current = processedOptions;
    
    return processedOptions;
  }, [options]);
}