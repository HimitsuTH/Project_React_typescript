import React, { useState } from "react";
import "@/components/styles/login.css";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineLock } from "react-icons/ai";

interface Login {
  email?: string;
  password?: string;
}

export default function Login() {
  const [email, setEmail] = useState("");

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(`${email}`);
  };

  return (
    <form
      className="flex flex-col items-center justify-center mb-4 bg-slate-500 p-5 rounded-md"
      onSubmit={submitForm} autoComplete="off"
    >
      <h1 className="text-3xl font-bold text-white mb-3">Login</h1>
      <div className="input_card">
        <BiUserCircle className="icon text-5xl" />
        <input
          type="text"
          className="input"
          placeholder="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input_card">
        <AiOutlineLock className="icon text-5xl" />
        <input
          type="password"
          className="input"
          placeholder="password"
          required
        />
      </div>
      <button type="submit" className="m-5 bg-white">
        Sign In
      </button>
    </form>
  );
}
