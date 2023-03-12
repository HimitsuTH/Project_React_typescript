import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";

interface Shop {
  id: number;
  name: string;
  description: string;
  address: {
    zip: string;
    street: string;
    province: string;
  };
}

const Index = () => {
  const [data, setData] = useState<Shop>();
  const getData = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_URL}/shop`
    ).then(res=> {
      setData(res.data)
      console.log(res)
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div>
        {data && (
          <div>
            <h2>{data.name}</h2>
            <p>{data.description}</p>
            <p>{data.address.zip}</p>
            <p>{data.address.street}</p>
            <p>{data.address.province}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
