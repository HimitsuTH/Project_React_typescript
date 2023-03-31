import React, { useState, useEffect } from "react";

import { id_headphone, update_headphone } from "@/services/brand.service";
import { TextField } from "@mui/material";
import { useNavigate, useLocation, Link, useParams } from "react-router-dom";

type Props = {};

function updateHeadphone({}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();

  const [name, setName] = useState<string>("");
  const [headphoneID, setHeadphoneID] = useState<string>("");
  const [brand_id, setBrand_id] = useState<string>("");
  const [dsc, setDsc] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [stock, setStock] = useState<string>("");

  //Error
  const [errorName, setErrorName] = useState<string>("");
  const [errorDsc, setErrorDsc] = useState<string>(""); // Dsc => Dscription
  const [errorPrice, setErrorPrice] = useState<string>("");
  const [errorCategory, setErrorCategory] = useState<string>("");
  const [errorStock, setErrorStock] = useState<string>("");

  const navigate = useNavigate();

  const get_headphone = () => {
    id_headphone(id).then((res) => {
      const data = res.data[0];
      // console.log(data);
      setName(data.name);
      setHeadphoneID(data.id);
      setBrand_id(data.brand_id);
      setDsc(data.description);
      setCategory(data.category);
      setPrice(data.price);
      setStock(data.stock);
    });
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    const headphone = {
      id: headphoneID,
      name: name,
      description: dsc,
      category: category,
      price: price,
      stock: stock,
    };
    update_headphone(headphone).then((res) => {
      alert(res.message);
      navigate((-1));
    });
  };

  useEffect(() => {
    get_headphone();
  }, [id]);

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
            onChange={(e) => setName(e.target.value)}
            value={name}
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
            onChange={(e) => setDsc(e.target.value)}
            value={dsc}
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
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            InputProps={{
              inputProps: {
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
            onChange={(e) => setCategory(e.target.value)}
            value={category}
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
            onChange={(e) => setStock(e.target.value)}
            value={stock}
            InputProps={{
              inputProps: {
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
      <button onClick={() => navigate((-1))}>Go back</button>
    </div>
  );
}

export default updateHeadphone;
