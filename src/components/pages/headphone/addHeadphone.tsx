import React, { useState, useEffect } from "react";
import { TextField, Select, MenuItem } from "@mui/material";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { headphone, brand } from "@/types/types";
import { get_Brand } from "@/services/brand.service";

import { add_headphone } from "@/services/brand.service";

type Props = {};

function addHeadphone({}: Props) {
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [brands, setBrands] = useState<brand[]>([]);
  const brand = brands.filter((brand) => brand.name === selectedOption);

  //Error
  const [errorName, setErrorName] = useState<string>("");
  const [errorDsc, setErrorDsc] = useState<string>(""); // Dsc => Dscription
  const [errorPrice, setErrorPrice] = useState<string>("");
  const [errorCategory, setErrorCategory] = useState<string>("");
  const [errorStock, setErrorStock] = useState<string>("");

  //router-dom
  const location = useLocation();
 
  const navigate = useNavigate();

  //@get brand for select option
  const getBrand = () => {
    get_Brand().then((res) => {
      setBrands(res);
      console.log(id);
      const test = id && res.filter((res: brand) => res.id == id);
      console.log(test && test[0]);
      const select = test ? test[0].name : res[0].name;
      setSelectedOption(select);
    });

    setLoading(false);
  };

  useEffect(() => {
    getBrand();
  }, []);

  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value as string);
    // const brand = brands.filter(brand => brand.name === selectedOption)
    // console.log(brand[0].id)
  };
  //Headle submit form
  let id = location.state?.id;
  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setButtonLoading(true);

    const target = e.target as typeof e.target & {
      name: { value: string };
      description: { value: string };
      price: { value: number };
      category: { value: string };
      stock: { value: number };
      warranty: { value: string };
    };
    const name = target.name.value; // typechecks!
    const description = target.description.value; // typechecks!
    const price = target.price.value; // typechecks!
    const category = target.category.value; // typechecks!
    const stock = target.stock.value; // typechecks!
    const warranty = target.warranty.value; // typechecks!

    const headphone: headphone = {
      name: name,
      description: description,
      price: price,
      category: category,
      stock: stock,
      brand: brand[0].id || id,
      warranty: warranty,
    };

    add_headphone(headphone).then(
      (res) => {
        alert(res.data.message);
        setButtonLoading(false);
        navigate(`/headphone`);
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
        setButtonLoading(false);
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
        <div>
          <TextField
            id="filled-basic"
            label="Warranty"
            variant="outlined"
            name="warranty"
            inputProps={{ style: { color: "#333" } }}
            InputLabelProps={{
              style: { color: "#333" },
            }}
          />
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
        <div>
          <Select value={selectedOption} onChange={handleSelectChange}>
            {brands.map((brand) => (
              <MenuItem key={brand.id} value={brand.name}>
                {brand.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <button
          type="submit"
          className={`bg-slate-400 justify-self-center w-52 col-span-2 max-md:col-auto hover:bg-white transition-all ${
            buttonLoading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {buttonLoading ? "loading..." : "Add"}
        </button>
      </form>
      <button onClick={() => navigate("/headphone")}>Back</button>
    </div>
  );
}

export default addHeadphone;
