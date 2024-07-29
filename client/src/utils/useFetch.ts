import axios from "axios";
import React, { useEffect } from "react";

interface FetchOption {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: any;
  responseType?:
    | "stream"
    | "arraybuffer"
    | "blob"
    | "document"
    | "json"
    | "text";
  onCompleted?: (data: any) => void;
  onError?: (error: any) => void;
}

interface StateHandle {
  setData: (data: any) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: any) => void;
}

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const useFetch = (url: string, options: FetchOption) => {
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<any>(null);

  useEffect(() => {
    fetchData(url, options, { setData, setLoading, setError });
  }, []);

  return { data, loading, error };
};

const useLazyFetch = (url: string, options: FetchOption) => {
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<any>(null);

  const fetchFunction = async (
    fetchUrl: string = url,
    fetchOptions: FetchOption = options
  ) => {
    setLoading(true);
    setData(null);
    setError(null);

    // If passing new url => use the new one
    const finalUrl: string = fetchUrl || url;

    // Concat the new options with the old options
    const finalOptions: FetchOption = {
      ...options,
      ...fetchOptions,
    };

    fetchData(finalUrl, finalOptions, { setData, setLoading, setError });
  };

  return [fetchFunction, { data, loading, error }] as const;
};

async function fetchData(
  url: string,
  options: FetchOption,
  stateHandle: StateHandle
) {
  const { setData, setLoading, setError }: StateHandle = stateHandle;

  try {
    const response = await axios({
      url,
      ...options,
    });

    setData(response.data);
    options.onCompleted && options.onCompleted(response.data);
  } catch (error) {
    setError(error);
    options.onError && options.onError(error);
  } finally {
    setLoading(false);
  }
}

export { useFetch, useLazyFetch };
