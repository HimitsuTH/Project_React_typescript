import React, { useState } from "react";

import { TextField } from "@mui/material";
import { useNavigate, useLocation, Link } from "react-router-dom";

type Props = {};

function updateHeadphone({}: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  //Error
  const [errorName, setErrorName] = useState<string>("");
  const [errorDsc, setErrorDsc] = useState<string>(""); // Dsc => Dscription
  const [errorPrice, setErrorPrice] = useState<string>("");
  const [errorCategory, setErrorCategory] = useState<string>("");
  const [errorStock, setErrorStock] = useState<string>("");

  const location = useLocation();
//   console.log(location)
//   const id = location.state.id;
  const navigate = useNavigate();

  return (
    <div className="grid  h-screen place-items-center ">
      <form
        className="grid gap-8 p-12 rounded-lg form-grid  max-md:grid-cols-1 "
        // onSubmit={}
      >
        <div>
          <TextField
            id="outlined-basic"
            // required
            label="Name"
            variant="outlined"
            name="name"
            inputProps={{
              style: { color: "#eee", width: "100%" },
            }}
            InputLabelProps={{
              style: { color: "white" },
            }}
          />
          <p className="text-red-600 text-sm">{errorName && errorName}</p>
        </div>
        <div>
          <TextField
            id="filled-basic"
            label="Description"
            variant="outlined"
            name="description"
            inputProps={{
              style: { color: "#eee", width: "100%" },
            }}
            InputLabelProps={{
              style: { color: "white" },
            }}
          />
          <p className="text-red-600 text-sm">{errorDsc && errorDsc}</p>
        </div>
        <div className="grid">
          <TextField
            id="filled-basic"
            type="number"
            label="Price"
            variant="outlined"
            name="price"
            InputProps={{
              inputProps: {
                max: 999,
                min: 0,
              },
              style: { color: "#eee", width: "100%" },
            }}
            InputLabelProps={{
              style: { color: "white" },
            }}
          />
          <p className="text-red-600 text-sm">{errorPrice && errorPrice}</p>
        </div>
        <div>
          <TextField
            id="filled-basic"
            label="Category"
            variant="outlined"
            name="category"
            inputProps={{ style: { color: "#eee" } }}
            InputLabelProps={{
              style: { color: "white" },
            }}
          />
          <p className="text-red-600 text-sm">
            {errorCategory && errorCategory}
          </p>
        </div>
        <div className=" max-md:col-auto grid ">
          <TextField
            id="filled-basic"
            type="number"
            label="Stock"
            variant="outlined"
            name="stock"
            InputProps={{
              inputProps: {
                max: 999,
                min: 0,
              },
              style: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "white" },
            }}
          />
          <p className="text-red-600 text-sm">{errorStock && errorStock}</p>
        </div>
        <button
          type="submit"
          className={`bg-slate-400 justify-self-center w-52 col-span-2 max-md:col-auto hover:bg-white transition-all ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {loading ? "loading..." : "update"}
        </button>
      </form>
      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
      
   
  );
}

export default updateHeadphone;
