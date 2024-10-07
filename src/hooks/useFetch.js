import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cachedData = sessionStorage.getItem(url);

    if (cachedData) {
      setData(JSON.parse(cachedData));
      setLoading(false);
    } else {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((fetchedData) => {
          setData(fetchedData);
          setLoading(false);
          sessionStorage.setItem(url, JSON.stringify(fetchedData));
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [url]);

  return { data, loading, error };
}