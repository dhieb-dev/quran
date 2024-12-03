import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async (urlData) => {
      try {
        const res = await fetch(urlData);
        const fetchData = await res.json();
        if (fetchData) {
          setData(fetchData);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };
    getData(url);
  }, [url]);
  return { data, loading, error };
}
