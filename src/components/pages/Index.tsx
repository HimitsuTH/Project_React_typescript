import React, { useState, useMemo, useEffect } from "react";

// import { getCurrentUser } from "@/services/user.service";

import axios from "axios";
import { Skeleton } from "@mui/material";

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
  const [loading, setLoading] = useState<boolean>(true);
 
  const getData = async () => {
    const response = await axios.get(`${import.meta.env.VITE_URL}/shop`);
    // getCurrentUser();

  
    setData(response.data);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  useMemo(() => data, [data]);

  return (
    <div className="grid h-screen place-items-center">
      {loading ? (
        <Skeleton variant="rectangular" className="w-96" height={300} />
      ) : (
        <div className="flex flex-col justify-center place-items-center select-none mt-5">
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
          {/* <Brand /> */}
        </div>
      )}
    </div>
  );
};

export default Index;
