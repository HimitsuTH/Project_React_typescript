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
    <div className="grid  h-screen place-items-center bg-white">
      <form
        className="grid gap-5 p-12 rounded-lg form-grid bg-white bg-opacity-5 max-md:grid-cols-1  "
        // onSubmit={submitForm}
      >
        <div>
          <TextField
            id="outlined-basic"
            // required
            label="Name"
            variant="outlined"
            name="name"
            inputProps={{
              style: { color: "#333", width: "100%" },
            }}
            InputLabelProps={{
              style: { color: "#333" },
            }}
          />
          <p className="text-red-600 text-sm text-center ">
            {errorName && errorName}
          </p>
        </div>
        <div>
          <TextField
            id="filled-basic"
            label="Description"
            variant="outlined"
            name="description"
            inputProps={{
              style: { color: "#333", width: "100%" },
            }}
            InputLabelProps={{
              style: { color: "#333" },
            }}
          />
          <p className="text-red-600 text-sm text-center">
            {errorDsc && errorDsc}
          </p>
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
              style: { color: "#333", width: "100%" },
            }}
            InputLabelProps={{
              style: { color: "#333" },
            }}
          />
          <p className="text-red-600 text-sm text-center">
            {errorPrice && errorPrice}
          </p>
        </div>
        <div>
          <TextField
            id="filled-basic"
            label="Category"
            variant="outlined"
            name="category"
            inputProps={{ style: { color: "#333" } }}
            InputLabelProps={{
              style: { color: "#333" },
            }}
          />
          <p className="text-red-600 text-sm text-center">
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
              style: { color: "#333" },
            }}
            InputLabelProps={{
              style: { color: "#333" },
            }}
          />
          <p className="text-red-600 text-sm text-center">
            {errorStock && errorStock}
          </p>
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
