import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { brand } from "@/types/types";

import DeleteIcon from "@mui/icons-material/Delete";

import { delete_Brand } from "@/services/brand.service";
import { currentUser } from "@/services/user.service";

interface props {}

const brandItem = ({ data }: any | brand) => {
  const navigate = useNavigate();
  const handleDelete = (id: string) => {
   confirmAlert({
     customUI: ({ onClose }) => {
       return (
         <div className="custom-ui">
           <h1 className="text-white">Are you sure?</h1>
           <p className="text-white">You want to delete this file?</p>
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
      className={
        currentUser.role == "admin"
          ? "p-3 m-2 bg-slate-50 rounded-lg grid place-items-center brandItem"
          : "p-3 m-2 bg-slate-50 rounded-lg grid place-items-cente "
      }
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
          className="text-black cursor-pointer"
          sx={{ "&:hover": { color: "#b9bdff" } }}
        />
      )}
    </div>
  );
};

export default brandItem;
