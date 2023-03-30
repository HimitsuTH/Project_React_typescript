import React, { useState, useEffect } from "react";
import Card from "./Card";
import { Skeleton, Pagination } from "@mui/material";
import { get_headphone } from "@/services/brand.service";
import { headphone } from "@/types/types";

type Props = {};

function CardsDisplay({}: Props) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  //   console.log(currentPage);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<headphone[]>([]);
  const [count, setCount] = useState<number>(0);
  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const getHeadphone = () => {
    get_headphone().then((res) => {
      setData(res.data);
      setCount(Math.ceil(res.data.length / 6));
      setLoading(false);
    });
  };

  useEffect(() => {
    getHeadphone();
  }, [currentPage]);

  // console.log(startIndex, endIndex);
  const handleChange = (e: any, p: number) => {
    setLoading(true);
    setCurrentPage(p);
    // window.location.reload();
  };
  //   console.log(data);
  return (
    <div className="grid h-screen justify-items-center items-center  ">
      {loading ? (
        <div className="grid grid-cols-3 gap-5  m-20  max-lg:grid-cols-1">
          <Skeleton
            variant="rectangular"
            height={250}
            width={300}
            className="mb-5 rounded-md"
          />
          <Skeleton
            variant="rectangular"
            height={250}
            width={300}
            className="mb-5 rounded-md"
          />
          <Skeleton
            variant="rectangular"
            height={250}
            width={300}
            className="mb-5 rounded-md"
          />
          <Skeleton
            variant="rectangular"
            height={250}
            width={300}
            className="mb-5 rounded-md"
          />
          <Skeleton
            variant="rectangular"
            height={250}
            width={300}
            className="mb-5 rounded-md"
          />
          <Skeleton
            variant="rectangular"
            height={250}
            width={300}
            className="mb-5 rounded-md"
          />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-5  m-20  max-lg:grid-cols-1">
          {data &&
            data
              .slice(startIndex, endIndex)
              .map((headphone) => <Card key={headphone.id} {...headphone} />)}
        </div>
      )}
      <Pagination
        count={count}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
    </div>
  );
}

export default CardsDisplay;
