import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (url) {
      const getData = async (url) => {
        const res = await fetch(url);
        const fetchData = await res.json();
        if (fetchData) {
          setData(fetchData);
          setLoading(false);
        }
      };
      try {
        getData(url);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  },[url]);
  return { data, loading };
}
