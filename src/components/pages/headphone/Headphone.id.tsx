import React, { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { headphone } from "@/types/types";
import { id_headphone } from "@/services/brand.service";

type Props = {};

function Headphone_id({}: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<headphone[]>([]);
  const getHeadphone = () => {
    id_headphone(id).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    getHeadphone();
  }, []);
  return (
    <div className="grid h-screen place-items-center">
      {loading ? (
        <div>loading...</div>
      ) : (
        <>
          {data?.map((headphone) => (
            <div
              key={headphone.id}
              className=" select-none bg-slate-200 w-96 p-5 rounded-xl"
            >
              <h1 className=" font-bold text-lg text-center">{headphone.name}</h1>
              <p>
                <span className=" font-bold">description : </span>
                {headphone.description}
              </p>
              <p>
                <span className=" font-bold">category : </span>
                {headphone.category}
              </p>
              <p>
                <span className=" font-bold">stock : </span>
                {headphone.stock}
              </p>
              <p>
                <span className=" font-bold">price : </span>
                {headphone.price}
              </p>
              <p>
                <span className=" font-bold">warranty : </span>
                {headphone.warranty}
              </p>
            </div>
          ))}
          <button onClick={() => navigate(-1)}>Back</button>
        </>
      )}
    </div>
  );
}

export default Headphone_id;
