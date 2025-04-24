import { useNavigate } from "react-router";

export const GoBack = ({ nameReciter, setNameReciter }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate(-1);
        if (nameReciter) setNameReciter(null);
      }}
      className="w-6 h-6 rounded-full p-1 bg-blue-200 dark:bg-white/20"
    >
      <span className="block w-3 h-3 -translate-x-1 -rotate-45 border-r-4 border-b-4 border-blue-500 dark:border-red-400"></span>
    </button>
  );
};
