import { useState, useCallback } from 'react';
import useIsComponentMounted from './useIsComponentMounted';
export default function usetStateSafe <P extends object | boolean>(initialValue:  P) {

  const isComponentMounted = useIsComponentMounted();
  const [state, setState] = useState(initialValue);

  const newSetState = useCallback((value) => {
    if (isComponentMounted.current) {
      setState(value);
    }
  }, []);

  return [state, newSetState] as const;
}