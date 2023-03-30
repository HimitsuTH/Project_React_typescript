import React from "react";
import { headphone } from "@/types/types";

function Card({ ...headphone }: headphone) {
  console.log(headphone);
  return (
    <div className="p-10 w-80 bg-slate-300 drop-shadow-md rounded-lg relative select-none ">
      <p className=" font-bold text-center">{headphone.name}</p>
      <p>{headphone.description}</p>
      <p className=" text-blue-700 absolute bottom-0 m-2 right-2">THB {headphone.price} Bath.</p>
    </div>
  );
}

export default Card;
