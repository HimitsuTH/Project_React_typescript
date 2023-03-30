import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LinkPage from "./LinkPage";

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
      setLoading(false);
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
    <div className="">
      {path ? (
        <div className="navbar p-5 justify-end">
          <Link to={"/"} className="text-white ml-2 p-2 rounded-md bg-slate-800">
            back
          </Link>
        </div>
      ) : token ? (
        loading ? (
          <div className="navbar p-5">
            <div className="flex justify-around gap-2">
              <Skeleton variant="rectangular" width={70} height={50} />
              <Skeleton variant="rectangular" width={70} height={50} />
            </div>
            <Skeleton variant="rectangular" width={70} height={50} />
          </div>
        ) : (
          <div className="navbar p-5">
            <LinkPage />
            <div className="flex place-items-center">
              {/* <p className="text-white select-none">{user?.email}</p> */}
              <p className=" text-gray-800 select-none">{user?.name}</p>
              <Link to={"/user"}>
                <EditIcon
                  className="text-gray-800 mx-3 cursor-pointer"
                  sx={{ "&:hover": { color: "#b9bdff" } }}
                />
              </Link>
              <Link
                to={"/login"}
                className="bg-slate-800 p-2 rounded-md text-white" 
                onClick={handleToken}
              >
                Logout
              </Link>
            </div>
          </div>
        )
      ) : (
        <div className="navbar p-5">
          <LinkPage />
          <Link to={"/login"} className="bg-slate-800 p-2 rounded-md text-white">
            sign in
          </Link>
        </div>
      )}
    </div>
  );
};

export default navbar;
