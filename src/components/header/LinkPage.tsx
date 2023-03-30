import React from 'react'
import { Link } from 'react-router-dom';

type Props = {}

function LinkPage({}: Props) {
  return (
    <ul className="gap-5 flex">
      <Link replace to={"/"} className=" bg-slate-800 p-2 rounded-md text-white">
        Home
      </Link>
      <Link replace to={"/brand"} className="bg-slate-800 p-2 rounded-md text-white">
        Brand
      </Link>
      <Link replace to={"/headphone"} className="bg-slate-800 p-2 rounded-md text-white">
        Headphone
      </Link>
    </ul>
  );
}

export default LinkPage