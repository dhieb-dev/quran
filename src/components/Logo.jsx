import { Link } from "react-router-dom";

export function Logo() {
  return (
    <div className="logo w-10 animate-scale will-change-[scale]">
      <Link to="/">
        <img loading="lazy" src={require("../static/images/logo.png")} alt="logo" />
      </Link>
    </div>
  );
}
