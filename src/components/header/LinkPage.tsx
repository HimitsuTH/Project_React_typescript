import React from 'react'
import { Link } from 'react-router-dom';

type Props = {}

function LinkPage({}: Props) {
  return (
    <ul className="gap-5 flex">
      <Link replace to={"/"} className="bg-slate-100 p-2 rounded-md">
        Home
      </Link>
      <Link replace to={"/brand"} className="bg-slate-100 p-2 rounded-md">
        Brand
      </Link>
    </ul>
  );
}

export default LinkPage