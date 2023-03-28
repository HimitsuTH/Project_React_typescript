import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { headphone } from "@/types/types";

import { add_headphone } from "@/services/brand.service";

type Props = {};

function addHeadphone({}: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  //Error
  const [errorName, setErrorName] = useState<string>("");
  const [errorDsc, setErrorDsc] = useState<string>(""); // Dsc => Dscription
  const [errorPrice, setErrorPrice] = useState<string>("");
  const [errorCategory, setErrorCategory] = useState<string>("");
  const [errorStock, setErrorStock] = useState<string>("");

  //router-dom
  const location = useLocation();
  const id = location.state.id;
  const navigate = useNavigate();

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const target = e.target as typeof e.target & {
      name: { value: string };
      description: { value: string };
      price: { value: number };
      category: { value: string };
      stock: { value: number };
    };
    const name = target.name.value; // typechecks!
    const description = target.description.value; // typechecks!
    const price = target.price.value; // typechecks!
    const category = target.category.value; // typechecks!
    const stock = target.stock.value; // typechecks!

    const headphone: headphone = {
      name: name,
      description: description,
      price: price,
      category: category,
      stock: stock,
      brand: id,
    };

    add_headphone(headphone).then(
      (res) => {
        alert(res.data.message);
        setLoading(false);
        navigate(`/brand/${id}`);
      },
      (err) => {
        setErrorName("");
        setErrorPrice("");
        setErrorStock("");
        setErrorDsc("");
        setErrorCategory("");
        const msg = err?.response.data;

        switch (msg.status_code) {
          case 400: {
            setErrorName(msg.message);
            setErrorDsc("");
            break;
          }
          case 422: {
            msg.validation.map((validate: any) => {
              if (validate.param === "name") {
                setErrorName(validate.msg);
              }
              if (validate.param === "description") {
                setErrorDsc(validate.msg);
              }
              if (validate.param === "price") {
                setErrorPrice(validate.msg);
              }
              if (validate.param === "category") {
                setErrorCategory(validate.msg);
              }
              if (validate.param === "stock") {
                setErrorStock(validate.msg);
              }
            });

            break;
          }
          default: {
            setErrorName("");
            setErrorDsc("");
            setErrorPrice("");
            setErrorStock("");
            setErrorCategory("");
            break;
          }
        }
        setLoading(false);
      }
    );
  };
  return (
    <div className="grid  h-screen place-items-center bg-white">
      <form
        className="grid gap-5 p-12 rounded-lg form-grid bg-white bg-opacity-5 max-md:grid-cols-1  "
        onSubmit={submitForm}
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
          <p className="text-red-600 text-sm ">{errorStock && errorStock}</p>
        </div>
        <button
          type="submit"
          className={`bg-slate-400 justify-self-center w-52 col-span-2 max-md:col-auto hover:bg-white transition-all ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {loading ? "loading..." : "Add"}
        </button>
      </form>
      <Link to={`/brand/${id}`} className="bg-slate-100 p-2 rounded-md mt-5">
        Back
      </Link>
    </div>
  );
}

export default addHeadphone;
