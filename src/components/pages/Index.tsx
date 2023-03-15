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
            <div className="bg-slate-700 p-6 rounded-md container w-96">
              <h2 className="text-3xl font-bold text-white underline mb-3">
                {data.name}
              </h2>
              <p className="text-white mb-1">{data.description}</p>
              <p className="text-white mb-1">{data.address.street}</p>
              <p className="text-white mb-1 font-bold">
                <span className="mr-3">{data.address.zip}</span>
                {data.address.province}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
