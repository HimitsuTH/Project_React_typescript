import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

//@Mui 
import { Skeleton } from "@mui/material";


//Types
import { Token } from "@/types/Auth";
import IUser from "@/types/Auth";

//@services
import { getCurrentUser } from "@/services/user.service";

//@User edit page
import EditIcon from "@mui/icons-material/Edit";

type Props = {
  path: boolean;
};

const navbar = ({ path }: Props) => {
  const [user, setUser] = useState<IUser>();
  const [loading, setLoading] = useState<boolean>(true);
  const [toggle, setToggle] = useState<boolean>(false);

  const navigate = useNavigate();

  const tokenString = localStorage.getItem("token");
  let token: Token | null = tokenString ? JSON.parse(tokenString) : null;

  // set expires_in token
  const now = new Date().getTime();
  const expires_in: number = parseInt(String(token?.expires_in)) || 0;
  const expiryTime = expires_in * 1000;

  if (expiryTime < now) {
    localStorage.removeItem("token");
  }

  const getUser = async () => {
    try {
      if (token) {
        getCurrentUser().then((res) => {
          setUser(res.user);
          setLoading(false);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleToken = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(undefined);
  };

  return (
    <div className="navbar p-5">
      {loading ? (
        <div className="gap-5 flex">
          <Skeleton variant="rectangular" width={50} height={40} />
          <Skeleton variant="rectangular" width={50} height={40} />
        </div>
      ) : (
        <ul className="gap-5 flex">
          <Link to={"/"} className="bg-slate-100 p-2 rounded-md">
            Home
          </Link>
          <Link
            to={"/brand"}
            className="bg-slate-100 p-2 rounded-md"
            onClick={() => {
              if (user) {
                navigate("/brand", { replace: true });
                window.location.reload();
              }
            }}
          >
            Brand
          </Link>
        </ul>
      )}
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
