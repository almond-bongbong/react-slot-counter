import { useCallback, useEffect, useRef } from 'react';

/* eslint-disable-next-line */
function useValueChangeEffect(dependencies: any[]) {
  const dependenciesRef = useRef(dependencies);
  const prevDependencies = useRef<typeof dependencies>(dependenciesRef.current);

  useEffect(() => {
    const prevSerialized = prevDependencies.current?.join(',');
    const serialized = dependencies.join(',');
    const serializedDependencies = dependenciesRef.current?.join(',');

    if (prevSerialized === serialized || serializedDependencies === serialized) return;

    prevDependencies.current = dependenciesRef.current;
    dependenciesRef.current = dependencies;
  });

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
