import { useState, useEffect, useContext } from "react";
import Context from "../context/Context";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { lang } = useContext(Context);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${url}?language=${lang.locale}`);
        const contentType = response.headers.get("content-type");

        if (!response.ok || !contentType.includes("application/json")) {
          throw new Error("Invalid response or not JSON");
        }

        const json = await response.json();
        setData(json);
      } catch (err) {
        console.error("Fetch error:", err);
        setData(null);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchData();
  }, [url, lang]);

  return { data, loading };
};
