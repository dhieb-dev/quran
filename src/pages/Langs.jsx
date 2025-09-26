import { useContext } from "react";
import { useFetch } from "../hooks/index";
import Context from "../context/Context";
import { GoBack, Loading } from "../components";
import { useNavigate } from "react-router";
export const Langs = () => {
  const { setLang } = useContext(Context);
  const { data, loading } = useFetch(
    "https://www.mp3quran.net/api/v3/languages"
  );
  const navigate = useNavigate();
  return (
    <div className="langs">
      <div className="flex space-x-2 space-x-reverse">
        <GoBack onclick={() => navigate(-1)} />
        <h2>اللغات</h2>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <ul className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {data?.language.map((lang) => (
            <li
              key={lang.native}
              className="py-1 px-2 rounded hover:bg-white hover:dark:bg-black cursor-pointer"
              onClick={() => {
                setLang({ native: lang.native, locale: lang.locale });
                navigate(-1);
              }}
            >
              {lang.native}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
