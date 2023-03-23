import React, { useState } from "react";
import { TextField } from "@mui/material";
import { addBrand } from "@/services/brand.service";
import { useNavigate } from "react-router-dom";

type Props = {};

const AddBrand = ({}: Props) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const target = e.target as typeof e.target & {
      name: { value: string };
      description: { value: string };
    };
    const name = target.name.value; // typechecks!
    const description = target.description.value; // typechecks!

    console.log("name :" + name + "des : " + description);

    addBrand(name, description).then(
      (res) => {
        alert(res.data.message);
        setLoading(false);
        navigate("/brand", { replace: true });
      },
      (err) => {
        const msg = err?.response.data;
           setLoading(false);
        setErrorMessage(msg);
      }
    );
  };

  console.log(errorMessage);

  return (
    <div className="grid h-screen place-items-center">
      <form className="grid gap-3" onSubmit={submitForm}>
        <TextField
          id="outlined-basic"
          // required
          label="Name"
          variant="outlined"
          name="name"
          inputProps={{ style: { color: "#eee" } }}
          InputLabelProps={{
            style: { color: "white" },
          }}
        />
        <TextField
          id="filled-basic"
          label="Description"
          variant="outlined"
          name="description"
          inputProps={{ style: { color: "#eee" } }}
          InputLabelProps={{
            style: { color: "white" },
          }}
        />
        <button
          type="submit"
          className={`bg-slate-400 hover:bg-white transition-all ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {loading ? "loading..." : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddBrand;
