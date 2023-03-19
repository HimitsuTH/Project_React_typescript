import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { updateUser } from "@/services/user.service";

function EditUser() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const alertText = (msg: string) => {
    alert(msg);
    navigate("/", { replace: true });
    window.location.reload();
  };

  const submitUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUser(userName, password).then((res) => {
      const data = JSON.parse(res);
      alertText(data.message);
    });

    //   setMessage(data.data.message);
    setUserName("");
    setPassword("");
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
