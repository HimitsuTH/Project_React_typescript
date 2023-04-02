import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import IUser from "@/types/Auth";
import { brand } from "@/types/types";

import DeleteIcon from "@mui/icons-material/Delete";

import { delete_Brand } from "@/services/brand.service";

const brandItem = ({ data }: brand | any) => {
  // console.log(data);
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const currentUser: IUser = user ? JSON.parse(user) : {};
  const handleDelete = (id: string) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1 className="text-white">Are you sure?</h1>
            <p className="text-white">You want to delete this brand?</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button onClick={onClose}>No</button>
              <button
                onClick={() => {
                  delete_Brand(id)
                    .then(
                      (res) => {
                        return alert(res.message);
                      },
                      (err) => {
                        return alert(err?.response.data.message);
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
    <div
      className={`p-3 m-2 bg-slate-600 rounded-lg grid place-items-center text-white ${
        currentUser.role == "admin" && "brandItem"
      }`}
      //   currentUser.role == "admin"
      //     ? "p-3 m-2 bg-slate-600 rounded-lg grid place-items-center brandItem"
      //     : "p-3 m-2 bg-slate-600 rounded-lg grid place-items-cente "
      // }
    >
      <Link
        to={`/brand/${data.id}`}
        className="first-letter:uppercase text-md text-center"
      >
        {data.name}
      </Link>
      {currentUser?.role == "admin" && (
        <DeleteIcon
          onClick={() => handleDelete(data.id)}
          className="cursor-pointer text-slate-200"
          sx={{ "&:hover": { color: "#b9bdff" } }}
        />
      )}
    </div>
  );
};

export default brandItem;
