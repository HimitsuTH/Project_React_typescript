import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

import { get_Brand_id } from "@/services/brand.service";

import NotFound from "../NotFound";
import HeadphoneItem from "../../items/headphoneItem";

import IUser from "@/types/Auth";

import AddIcon from "@mui/icons-material/Add";

type Props = {};

type brand = {
  brand: {
    id: string;
    name: string;
  };
  headphone: {
    id: string;
    name: string;
  };
};

const Brand_id = (props: Props) => {
  const { id } = useParams();
  const [data, setData] = useState<brand | any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  //current user
  const user = localStorage.getItem("user");
  const currentUser: IUser = user ? JSON.parse(user) : {};
  const navigate = useNavigate();

  const getBrand = async () => {
    get_Brand_id(id).then(
      (res) => {
        setData(res.data);
        console.log(res);
      },
      (err) => {
        setError(true);
      }
    );
    // console.log(res.data)
    setLoading(false);
  };
  useEffect(() => {
    getBrand();
  }, []);

  return (
    <div className="grid h-screen place-items-center">
      <div className="mx-3 cursor-pointer absolute top-50 right-24 rounded-full grid justify-items-center gap-2">
        {currentUser.role === "admin" && (
          <AddIcon
            className=" mx-3 cursor-pointer rounded-full "
            sx={{
              fontSize: 36,
              background: "#3e3e3e",
              color: "#fff",
              "&:hover": { color: "#7877E6" },
            }}
            onClick={() =>
              navigate("/headphone/add", {
                state: {
                  id: id,
                },
              })
            }
          />
        )}
        <button
          onClick={() => navigate("/brand")}
          className=" mx-3 cursor-pointer  rounded-full"
        >
          Back
        </button>
      </div>
      {error ? (
        <NotFound />
      ) : (
        <>
          {loading ? (
            <div>loading...</div>
          ) : (
            <div className="grid h-screen justify-items-center items-start m-20 ">
              {data && (
                <div className="grid drop-shadow-md">
                  <p className="uppercase bg-slate-50 p-3 rounded-lg select-none text-center font-bold justify-self-center items-start">
                    {data.brand.name}
                  </p>
                  <div className="flex mt-5 flex-col">
                    {data.headphones.map((headphone: any, index: number) => (
                      <HeadphoneItem
                        data={headphone}
                        i={index}
                        key={headphone.id}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Brand_id;
