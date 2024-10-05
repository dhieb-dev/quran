import { useState, useEffect } from "react";
export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      fetch(url)
        .then(res => res.json())
        .then(data => {
          setData(data)
          setLoading(false)
        })
    } catch (error) {
      console.log(error)
    }
  }, [url, loading]);
  return { data, loading };
};