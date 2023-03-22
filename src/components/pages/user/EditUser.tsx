import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { updateUser } from "@/services/user.service";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function EditUser() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const submitUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1 className="text-white">Are you sure?</h1>
            <p className="text-white">You want to update profile?</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button onClick={onClose}>No</button>
              <button
                onClick={() => {
                  updateUser(userName, password)
                    .then(
                      (res) => {
                        const data = JSON.parse(res);
                        console.log(res);
                        return alert(data.message);
                      },
                      (err) => {
                        console.log(err);
                        return alert(err?.response.data.message);
                      }
                    )
                    .then(() => {
                      setUserName("");
                      setPassword("");
                      navigate("/", { replace: true });
                      window.location.reload();
                    });
                }}
              >
                Yes
              </button>
            </div>
          </div>
        );
      },
    });
  };

  return (
    <div className="grid h-screen place-items-center">
      <form className="grid gap-4" onSubmit={submitUpdate} method="PUT">
        <input
          type="text"
          placeholder="name"
          className="p-2"
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setUserName(e.target.value)
          }
        />
        <input
          type="password"
          placeholder="password"
          className="p-2"
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setPassword(e.target.value)
          }
        />

        <button>Update</button>
      </form>
    </div>
  );
}

export default EditUser;
