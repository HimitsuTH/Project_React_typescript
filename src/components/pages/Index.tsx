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
  const [loading, setLoading] = useState<boolean>(false);
  const getData = async () => {
    setLoading(true);
    const response = await axios.get(`${import.meta.env.VITE_URL}/shop`);
    setData(response.data);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data && (
            <div>
              <h2 className="text-3xl font-bold">{data.name}</h2>
              <p>{data.description}</p>
              <p>{data.address.zip}</p>
              <p>{data.address.street}</p>
              <p>{data.address.province}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
