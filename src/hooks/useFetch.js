import { useState, useEffect } from "react";
export const useFetch = (endpoints) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      const url = `https://www.mp3quran.net/api/v3/${endpoints}`
      fetch(url)
        .then(res => res.json())
        .then(data => {
          setData(data);
          setTimeout(() => setLoading(false), 500);
        });
    } catch (err) {
      console.log(err);
    }
  }, [endpoints]);
  return { data, loading };
};
