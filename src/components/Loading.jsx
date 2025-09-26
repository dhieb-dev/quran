export const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white/90 dark:bg-black/80 grid place-content-center">
      <div className="w-14 h-14 rounded-full border-8 border-blue-300 dark:border-blue-600 border-b-transparent dark:border-b-transparent animate-spin"></div>
    </div>
  );
};
