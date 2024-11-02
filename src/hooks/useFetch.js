import { useState, useEffect, useContext } from "react";
import { Context } from "../context/Context";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentLang } = useContext(Context)

  useEffect(() => {

    const getData = async (urlData) => {
      try {
        const res = await fetch(urlData)
        const fetchData = await res.json()
        if (fetchData) {
          setData(fetchData)
          setLoading(false)
        }
      } catch (error) {
        setLoading(false)
        setError(error)
      }
    }
    getData(url)
  }, [url, currentLang]);
  return { data, loading, error };
}