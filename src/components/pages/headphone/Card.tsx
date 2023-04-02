import React from "react";
import { Link, useNavigate } from "react-router-dom";

import IUser from "@/types/Auth";
import { headphone } from "@/types/types";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { delete_Headphone } from "@/services/brand.service";
import DeleteIcon from "@mui/icons-material/Delete";

import EditIcon from "@mui/icons-material/Edit";

function Card({ ...headphone }: headphone) {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const currentUser: IUser = user ? JSON.parse(user) : {};
  const handleDelete = (id: string) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1 className="text-white">Are you sure?</h1>
            <p className="text-white">You want to delete this headphone?</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button onClick={onClose}>No</button>
              <button
                onClick={() => {
                  delete_Headphone(headphone.id)
                    .then(
                      (res) => {
                        // console.log(res);
                        alert(res.data.message);
                      },
                      (err) => {
                        alert(err.response.data.message);
                      }
                    )
                    .then(() => navigate(0));
                }}
              >
                Yes, Delete it!
              </button>
            </div>
          </div>
        );
      },
    });
  };
  return (
    <div className="p-8 w-80 bg-slate-300 drop-shadow-md rounded-lg relative h-64 max-xl:w-64">
      <div
        className=" h-full cursor-pointer"
        onClick={() => navigate(`/headphone/${headphone.id}`)}
      >
        <p className=" font-bold text-center">{headphone.name}</p>
        <p>{headphone.description}</p>
      </div>
      <p className=" text-blue-700 absolute bottom-0 m-2 right-2 select-none">
        THB {headphone.price.toLocaleString()} Bath.
      </p>
      {currentUser?.role == "admin" && (
        <div className="flex absolute top-0 m-3 right-1">
          <Link to={`/headphone/${headphone.id}/update`} className="flex">
            <EditIcon
              className="cursor-pointer text-slate-500 "
              sx={{ "&:hover": { color: "#7877E6" } }}
            />
          </Link>
          <DeleteIcon
            onClick={() => handleDelete(headphone.id)}
            className="cursor-pointer text-slate-500 "
            sx={{ "&:hover": { color: "#7877E6" } }}
          />
        </div>
      )}
    </div>
  );
}

export default Card;
