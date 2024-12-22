import { Link } from "react-router-dom";

export function Logo() {
  return (
    <div className="logo w-10">
      <Link to="/">
        <img src={require("../static/images/logo.png")} alt="logo" />
      </Link>
    </div>
  );
}
