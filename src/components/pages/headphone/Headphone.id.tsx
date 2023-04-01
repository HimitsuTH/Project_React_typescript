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
            <div key={headphone.id} className="text-center select-none">
              <h1 className=" font-bold text-lg ">{headphone.name}</h1>
              <p>description : {headphone.description}</p>
              <p>category : {headphone.category}</p>
              <p>stock : {headphone.stock}</p>
              <p>price : {headphone.price}</p>
            </div>
          ))}
          <button onClick={() => navigate(-1)}>Back</button>
        </>
      )}
    </div>
  );
}

export default Headphone_id;
