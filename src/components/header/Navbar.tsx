import axios from "axios";
import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { Token } from "@/types/Auth";
import { Skeleton } from "@mui/material";
import IUser from "@/types/Auth";
import { getCurrentUser } from "@/services/user.service";

import EditIcon from "@mui/icons-material/Edit";

type Props = {
  path: boolean;
};

const navbar = ({ path }: Props) => {
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState<boolean>(true);
  const [toggle, setToggle] = useState<boolean>(false);
  const tokenString = localStorage.getItem("user");
  let token: Token | null = tokenString ? JSON.parse(tokenString) : null;
  const now = new Date().getTime();
  const expires_in: number = parseInt(String(token?.expires_in)) || 0;
  const expiryTime = expires_in * 1000;

  if (expiryTime < now) {
    localStorage.removeItem("user");
  }

  const getUser = async () => {
    try {
      getCurrentUser().then((res) => {
        setUser(res.user);
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleToken = async () => {
    localStorage.removeItem("user");
    setUser(undefined);
  };

  return (
    <div className="navbar p-5">
      <ul className="gap-5 flex">
        <Link to={"/"} className="bg-slate-100 p-2 rounded-md">
          Home
        </Link>
        <Link to={"/shop/brand"} className="bg-slate-100 p-2 rounded-md">
          Brand
        </Link>
      </ul>
      {path ? (
        <Link to={"/"} className="bg-slate-100 p-2 rounded-md">
          back
        </Link>
      ) : token ? (
        loading ? (
          <Skeleton variant="rectangular" className="w-60" height={50} />
        ) : (
          <div className="flex place-items-center">
            {/* <p className="text-white select-none">{user?.email}</p> */}
            <p className="text-white select-none">{user?.name}</p>
            <Link
              to={toggle ? "/user" : "/"}
              onClick={() => setToggle(!toggle)}
            >
              <EditIcon
                className="text-white mx-3 cursor-pointer"
                sx={{ "&:hover": { color: "#b9bdff" } }}
              />
            </Link>
            <Link
              to={"/login"}
              className="bg-slate-100 p-2 rounded-md"
              onClick={handleToken}
            >
              Logout
            </Link>
          </div>
        )
      ) : (
        <Link to={"/login"} className="bg-slate-100 p-2 rounded-md">
          sign in
        </Link>
      )}
    </div>
  );
};

export default navbar;
