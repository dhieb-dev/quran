import { InputSearch, Tabs } from "../components/index";

export const UpperBar = () => {
  const condition = window.location.pathname === "/"
  return (
    <div className="flex justify-between items-center my-3 max-md:flex-col">
      {condition && <Tabs />}
      <InputSearch />
    </div>
  );
};