import React, { useState, useEffect } from "react";
import Card from "./Card";
import { Skeleton, Pagination } from "@mui/material";
import { get_headphone, get_Page } from "@/services/brand.service";
import { headphone } from "@/types/types";

type Props = {};

function CardsDisplay({}: Props) {
  const [currentPage, setCurrentPage] = useState<number>(0);

  //   console.log(currentPage);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<headphone[]>([]);

  const [count, setCount] = useState<number>(0);

  const getHeadphone = () => {
    get_Page(currentPage).then((res) => setData(res.data));
    get_headphone().then((res) => {
      setCount(Math.ceil(res.data.length / 6));
      setLoading(false);
    });
  };

  useEffect(() => {
    getHeadphone();
  }, [currentPage]);

//   console.log(data);
  const handleChange = (e: any, p: number) => {
    setLoading(true);
    if (p == 1) {
      setCurrentPage(0);
    } else {
      setCurrentPage(p - 1);
    }
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
          {data.map((headphone) => (
            <Card key={headphone.id} {...headphone} />
          ))}
        </div>
      )}
      <Pagination
        count={count}
        variant="outlined"
        shape="rounded"
        onChange={(e, p) => handleChange(e, p)}
      />
    </div>
  );
}

export default CardsDisplay;
