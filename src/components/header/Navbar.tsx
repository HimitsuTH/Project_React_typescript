import React from "react";

import { Link } from "react-router-dom";

type Props = {
  path: boolean;
};

function navbar({ path }: Props) {
  return (
    <div className="navbar p-2">
      {path ? (
        <Link to={"/"} className="bg-slate-100 p-2 rounded-md">
          back
        </Link>
      ) : (
        <Link to={"/user/login"} className="bg-slate-100 p-2 rounded-md">
          sign in
        </Link>
      )}
    </div>
  );
}

export default navbar;
