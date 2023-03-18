import React, { useState } from "react";

import axios from "axios";
import { Token } from "../Login";
import { useNavigate } from "react-router-dom";

function EditUser() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
//   const [message, setMessage] = useState<string>("");
  const tokenString = localStorage.getItem("token");
  let token: Token | null = tokenString ? JSON.parse(tokenString) : null;

  const alertText = (msg: string) => {
    alert(msg);
    navigate("/", {replace: true})
    window.location.reload();
  };

  const submitUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${token?.access_token}`,
      },
    };
    if (token) {
      const res = await axios
        .put(
          `${import.meta.env.VITE_URL}/user/me`,
          {
            name: userName,
            password: password,
          },
          config
        )
        .then((data) => {
          //   console.log(data.data.message);
          alertText(data.data.message);
          //   setMessage(data.data.message);
          setUserName("");
          setPassword("");
        });
    }
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
