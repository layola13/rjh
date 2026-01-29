import { useContext, useRef } from 'react';
import { FormContext } from './FormContext';
import { composeRef } from './composeRef';

type NamePath = (string | number)[];

interface RefCache {
  name?: string;
  originRef?: React.Ref<any>;
  ref?: React.Ref<any>;
}

/**
 * Hook to manage form field refs with memoization
 * Combines FormContext itemRef with field-specific refs
 */
export default function useItemRef() {
  const { itemRef } = useContext(FormContext);
  const cache = useRef<RefCache>({});

  return function getItemRef(
    namePath: NamePath,
    fieldRef?: React.Ref<any>
  ): React.Ref<any> | undefined {
    const ref = fieldRef && typeof fieldRef === 'object' ? fieldRef : fieldRef;
    const nameKey = namePath.join('_');

    if (cache.current.name !== nameKey || cache.current.originRef !== ref) {
      cache.current.name = nameKey;
      cache.current.originRef = ref;
      cache.current.ref = composeRef(itemRef(namePath), ref);
    }

    return cache.current.ref;
  };
}