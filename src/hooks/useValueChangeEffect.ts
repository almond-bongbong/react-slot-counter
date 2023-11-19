import { useCallback, useEffect, useRef } from 'react';

/* eslint-disable-next-line */
function useValueChangeEffect(dependencies: any[]) {
  const dependenciesRef = useRef(dependencies);
  const prevDependencies = useRef<typeof dependencies>(dependenciesRef.current);

  const serialized = dependencies.join(',');
  const serializedDependencies = dependenciesRef.current?.join(',');

  useEffect(() => {
    if (serializedDependencies === serialized) return;

    prevDependencies.current = serializedDependencies?.split(',') || [];
    dependenciesRef.current = serialized.split(',');
  }, [serialized, serializedDependencies]);

  const getPrevDependencies = useCallback(() => prevDependencies.current, []);

  const setPrevDependenciesToSameAsCurrent = useCallback(() => {
    prevDependencies.current = dependenciesRef.current;
  }, []);

  return {
    getPrevDependencies,
    setPrevDependenciesToSameAsCurrent,
  };
}

export default useValueChangeEffect;
