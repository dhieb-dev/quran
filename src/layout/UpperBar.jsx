import { InputSearch, Tabs } from "../components/index";

export const UpperBar = () => {
  const condition = window.location.pathname === "/"
  return (
    <div className="flex justify-between items-center h-16">
      {condition && <Tabs />}
      <InputSearch />
    </div>
  );
};