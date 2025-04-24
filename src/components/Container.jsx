export const Container = ({ children, styles }) => {
  return (
    <div className={`container md:w-[1100px] mx-auto p-4 ${styles}`}>
      {children}
    </div>
  );
};
