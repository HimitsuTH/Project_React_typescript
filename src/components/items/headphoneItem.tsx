import React from "react";
import { Link } from "react-router-dom";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { delete_Headphone } from "@/services/brand.service";
import DeleteIcon from "@mui/icons-material/Delete";

import EditIcon from "@mui/icons-material/Edit";

import IUser from "@/types/Auth";
import { headphone } from "@/types/types";

type Props = {
  data: headphone;
  i: number;
};

function headphoneItem({ data, i }: Props) {
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
                  delete_Headphone(data.id)
                    .then(
                      (res) => {
                        console.log(res);
                        alert(res.data.message);
                      },
                      (err) => {
                        alert(err.response.data.message);
                      }
                    )
                    .then(() => window.location.reload());
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
      className="m-2 bg-slate-50 cursor-pointer flex gap-2 p-3 rounded-lg "
      key={data.id}
    >
      <div className="flex gap-2 flex-1">
        <p>{i + 1}. </p>
        <p>{data.name}</p>
        <p>{data.price} bath.</p>
      </div>
      {currentUser?.role == "admin" && (
        <>
          <Link to={"/headphone/update"} className="flex">
            <EditIcon
              className="cursor-pointer text-slate-500 "
              sx={{ "&:hover": { color: "#b9bdff" } }}
            />
          </Link>
          <DeleteIcon
            onClick={() => handleDelete(data.id)}
            className="cursor-pointer text-slate-500 "
            sx={{ "&:hover": { color: "#b9bdff" } }}
          />
        </>
      )}
    </div>
  );
}

export default headphoneItem;
