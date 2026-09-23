import {useCallback, useState} from 'react';

export const useApi =  <TRequest, TResponse>(apiFn: (payload?:TRequest, signal?: AbortSignal) => Promise<{data: TResponse}> ) => {

const [data, setData] = useState<TResponse | null>(null);
const [load, setLoad] = useState(false);
const [error, setError] = useState<string | null>(null);
            
const execute = useCallback(
  async (payload?: TRequest, signal?:AbortSignal) =>  {
    try {
      setLoad(true);
      const response = await apiFn(payload, signal);
      setData(response.data);
      return response.data;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoad(false);
    }
  },
  [apiFn]
);

return { execute, data, load, error };
}