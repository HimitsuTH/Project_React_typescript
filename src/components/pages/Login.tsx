import React, { useState } from "react";
import "@/components/styles/login.css";

import { useNavigate } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineLock } from "react-icons/ai";
import { login } from "@/services/auth.service";

export interface Login {
  email?: string;
  password?: string;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const navigate = useNavigate();

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    login(email, password).then(
      () => {
        setErrorPassword("");
        setErrorEmail("");
        setEmail("");
        setPassword("");
        navigate("/", { replace: true });
        window.location.reload();
      },
      (err) => {
        const msg = err?.response.data;

        setErrorEmail("");
        setErrorPassword("");
        switch (msg.status_code) {
          case 401: {
            setErrorPassword(msg.message);
            break;
          }
          case 404: {
            setErrorEmail(msg.message);
            break;
          }
          case 422: {
            msg.validation.map((validate: any) => {
              if (validate.param === "email") {
                setErrorEmail(validate.msg);
              }
              if (validate.param === "password") {
                setErrorPassword(validate.msg);
              }
            });

            break;
          }
          default: {
            setErrorPassword("");
            setErrorEmail("");
            break;
          }
        }
      }
    );
  };

  return (
    <div className="grid h-screen place-items-center">
      <form
        className="flex flex-col items-center justify-center mb-4 bg-slate-700 p-6 rounded-md container w-96"
        onSubmit={submitForm}
        autoComplete="off"
        method="POST"
      >
        <h1 className="text-3xl font-bold text-white mb-3">Login</h1>
        <div className="input_card">
          <BiUserCircle className="icon text-5xl" />
          <input
            type="text"
            className="input"
            placeholder="email"
            // required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {errorEmail && <p className="text-red-500 m-1">{errorEmail}</p>}
        <div className="input_card">
          <AiOutlineLock className="icon text-5xl" />
          <input
            type="password"
            className="input"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorPassword && <p className="text-red-500 m-1">{errorPassword}</p>}
        <button type="submit" className="m-5 bg-white">
          Sign In
        </button>
      </form>
    </div>
  );
}
